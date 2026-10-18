import { expect, test, type Page } from "@playwright/test";

async function fillStepOne(page: Page) {
  await page.locator("#f-fullName").fill("Test Person");
  await page.locator("#f-email").fill("test@example.com");
  await page.locator("#f-company").fill("Example Ltd");
  await page.locator("#f-region").selectOption("United Kingdom");
  await page.locator("#f-message").fill("We need a reliable ingestion pipeline for partner data feeds and reporting.");
  await page.getByRole("button", { name: "Continue" }).click();
}

async function fillStepTwo(page: Page) {
  await page.locator("#f-service").selectOption("cloud-data-engineering");
  await page.locator("#f-projectType").selectOption("data-cloud");
  await page.locator("#f-engagementModel").selectOption("project");
  await page.locator("#f-referral").selectOption("search");
  await page.getByRole("checkbox").check();
}

test("step one shows an error summary and inline errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Continue" }).click();
  const summary = page.locator("form").getByRole("alert");
  await expect(summary).toBeFocused();
  await expect(summary).toContainText("Full name");
  await expect(summary).toContainText("Message");
  await expect(page.locator("#f-email")).toHaveAttribute("aria-invalid", "true");
  // Step two fields are not validated yet.
  await expect(summary).not.toContainText("Service of interest");
});

test("step two validates required fields and consent", async ({ page }) => {
  await page.goto("/contact");
  await fillStepOne(page);
  await expect(page.getByRole("heading", { name: /your project|about the work|project/i }).first()).toBeVisible();
  await page.getByRole("button", { name: "Send enquiry" }).click();
  const summary = page.locator("form").getByRole("alert");
  await expect(summary).toContainText("Privacy consent");
  await expect(summary).toContainText("Service of interest");
});

test("successful submission shows confirmation", async ({ page }) => {
  let body: Record<string, unknown> = {};
  await page.route("/api/enquiry", async (route) => {
    body = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, id: "INF-TEST1234" }) });
  });
  await page.goto("/contact?utm_source=newsletter&utm_campaign=launch");
  await fillStepOne(page);
  await fillStepTwo(page);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  await expect(page.getByRole("heading", { name: /Thank you/ })).toBeVisible();
  await expect(page.getByText("INF-TEST1234")).toBeVisible();
  expect(body.email).toBe("test@example.com");
  expect(body.consent).toBe(true);
  expect(body.website).toBe("");
  expect(typeof body.startedAt).toBe("number");
  expect(body.attribution).toMatchObject({ utm_source: "newsletter", utm_campaign: "launch" });
});

test("delivery failure keeps the message and offers alternatives", async ({ page }) => {
  await page.route("/api/enquiry", (route) =>
    route.fulfill({ status: 502, contentType: "application/json", body: JSON.stringify({ ok: false, error: "delivery_failed" }) }),
  );
  await page.goto("/contact");
  await fillStepOne(page);
  await fillStepTwo(page);
  await page.getByRole("button", { name: "Send enquiry" }).click();
  const alert = page.locator("form").getByRole("alert");
  await expect(alert).toContainText("couldn't send your enquiry");
  await expect(alert.locator('a[href="tel:+919891855259"]')).toBeVisible();
  // The message lives in step one; going back shows it is still there.
  await page.getByRole("button", { name: "Back" }).click();
  await expect(page.locator("#f-message")).toHaveValue(/ingestion pipeline/);
});

test("partnership links pre-select the partnership enquiry type", async ({ page }) => {
  await page.goto("/contact?type=partnership");
  await expect(page.getByRole("radio", { name: /partnership/i })).toBeChecked();
});

test("service links pre-select the service", async ({ page }) => {
  await page.goto("/contact?service=sap-basis");
  await fillStepOne(page);
  await expect(page.locator("#f-service")).toHaveValue("sap-basis");
});

test("careers enquiries hide project-only fields", async ({ page }) => {
  await page.goto("/contact?type=careers");
  await page.locator("#f-fullName").fill("Test Person");
  await page.locator("#f-email").fill("test@example.com");
  await page.locator("#f-region").selectOption("India");
  await page.locator("#f-message").fill("Backend engineer with five years of Java and Spring experience.");
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.locator("#f-service")).toHaveCount(0);
  await expect(page.locator("#f-portfolioUrl")).toBeVisible();
});

test.describe("enquiry API", () => {
  const headers = (ip: string) => ({ "content-type": "application/json", "x-forwarded-for": ip });

  test("rejects invalid input with field errors", async ({ request }) => {
    const res = await request.post("/api/enquiry", { headers: headers("10.0.0.1"), data: { email: "bad" } });
    expect(res.status()).toBe(422);
    const json = await res.json();
    expect(json.error).toBe("validation");
    expect(json.fields.email).toBeTruthy();
  });

  test("reports unconfigured delivery honestly", async ({ request }) => {
    const res = await request.post("/api/enquiry", {
      headers: headers("10.0.0.2"),
      data: {
        fullName: "Test Person",
        email: "api-test@example.com",
        company: "Example Ltd",
        region: "India",
        service: "not-sure",
        projectType: "other",
        engagementModel: "not-sure",
        referral: "other",
        message: "Automated end-to-end test message, please ignore.",
        consent: true,
        startedAt: Date.now() - 60_000,
      },
    });
    expect(res.status()).toBe(503);
    expect((await res.json()).error).toBe("delivery_unconfigured");
  });

  test("silently accepts honeypot submissions without delivering", async ({ request }) => {
    const res = await request.post("/api/enquiry", {
      headers: headers("10.0.0.3"),
      data: {
        fullName: "Bot",
        email: "bot@example.com",
        company: "Bots",
        region: "Other",
        service: "not-sure",
        projectType: "other",
        engagementModel: "not-sure",
        referral: "other",
        message: "Buy cheap things now from our website please.",
        consent: true,
        website: "https://spam.example",
      },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).id).toBe("received");
  });

  test("rejects cross-origin posts and GET", async ({ request }) => {
    const res = await request.post("/api/enquiry", { headers: { ...headers("10.0.0.4"), origin: "https://evil.example" }, data: {} });
    expect(res.status()).toBe(403);
    expect((await request.get("/api/enquiry")).status()).toBe(405);
  });

  test("rate limits bursts from one source", async ({ request }) => {
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) {
      statuses.push((await request.post("/api/enquiry", { headers: headers("10.0.0.99"), data: {} })).status());
    }
    expect(statuses.slice(0, 5).every((s) => s === 422)).toBe(true);
    expect(statuses.at(-1)).toBe(429);
  });
});

test("after sending, the enquiry ID is shown and the form resets for a new enquiry", async ({ page, isMobile }) => {
  await page.route("/api/enquiry", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, id: "INF-RESET123" }) }),
  );
  const send = async () => {
    await fillStepOne(page);
    await fillStepTwo(page);
    await page.getByRole("button", { name: "Send enquiry" }).click();
    await expect(page.getByTestId("enquiry-id")).toHaveText("INF-RESET123");
  };
  const freshForm = async () => {
    await expect(page.locator("#f-fullName")).toHaveValue("");
    await expect(page.getByTestId("enquiry-id")).toHaveCount(0);
  };

  await page.goto("/contact");
  await send();
  // "Send another enquiry" starts over.
  await page.getByRole("button", { name: "Send another enquiry" }).click();
  await freshForm();

  // Leaving the page and coming back shows a new form.
  await send();
  await page.goto("/about");
  await page.goBack();
  await freshForm();

  // Clicking a link to the contact page while on it shows a new form.
  if (!isMobile) {
    await send();
    await page.getByRole("banner").getByRole("link", { name: "Discuss a Project" }).click();
    await freshForm();
    // Let the same-page navigation finish before typing again.
    await page.waitForLoadState("networkidle");

    // Client-side navigation away and back also resets.
    await send();
    await page.getByRole("banner").getByRole("link", { name: "About", exact: true }).click();
    await expect(page).toHaveURL(/\/about$/);
    await page.getByRole("banner").getByRole("link", { name: "Discuss a Project" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    await freshForm();
  }
});
