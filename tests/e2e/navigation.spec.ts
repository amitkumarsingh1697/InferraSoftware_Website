import { expect, test } from "@playwright/test";

test("desktop services menu opens, closes with Escape and navigates", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  const trigger = nav.getByRole("button", { name: "Services" });
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();

  await trigger.click();
  await nav.getByRole("link", { name: "SAP & BASIS", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/sap-basis$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/SAP/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});

test("primary links reach their pages", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary" });
  for (const [name, path] of [["About", "/about"], ["Industries", "/industries"], ["Work", "/work"], ["Insights", "/insights"]] as const) {
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(nav.getByRole("link", { name, exact: true })).toHaveAttribute("aria-current", "page");
  }
});

test("skip link moves focus to the main content", async ({ page }) => {
  await page.goto("/about");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip to/i });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("mobile menu opens as a dialog and navigates @mobile", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Site menu" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Services" }).click();
  await dialog.getByRole("link", { name: "LLM Evaluation", exact: true }).click();
  await expect(page).toHaveURL(/\/services\/llm-evaluation$/);
  await expect(dialog).toBeHidden();

  await page.getByRole("button", { name: "Open menu" }).click();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("phone links use the confirmed number", async ({ page }) => {
  await page.goto("/contact");
  const tel = page.locator('a[href^="tel:"]');
  expect(await tel.count()).toBeGreaterThan(0);
  for (const href of await tel.evaluateAll((els) => els.map((e) => e.getAttribute("href")))) {
    expect(href).toBe("tel:+919891855259");
  }
});

test("demonstrator projects are clearly labelled", async ({ page }) => {
  await page.goto("/work");
  await expect(page.getByText(/demonstrator/i).first()).toBeVisible();
  await page.goto("/work/legacy-java-modernization");
  await expect(page.getByText(/not a client engagement|demonstrator/i).first()).toBeVisible();
});

test("article pages render a table of contents that links to headings", async ({ page }) => {
  await page.goto("/insights/production-readiness-checklist");
  const toc = page.getByRole("navigation", { name: /contents/i });
  await toc.getByRole("link", { name: "Observability" }).click();
  await expect(page).toHaveURL(/#observability$/);
  await expect(page.locator("#observability")).toBeInViewport();
});

test("internal links resolve (crawl)", async ({ request }) => {
  test.setTimeout(180_000);
  const seen = new Set<string>();
  const queue = ["/"];
  const broken: string[] = [];
  while (queue.length) {
    const path = queue.shift()!;
    if (seen.has(path)) continue;
    seen.add(path);
    const res = await request.get(path);
    if (res.status() !== 200) {
      broken.push(`${path} -> ${res.status()}`);
      continue;
    }
    if (!(res.headers()["content-type"] ?? "").includes("text/html")) continue;
    const html = await res.text();
    for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const href = m[1];
      if (href.startsWith("/_next") || seen.has(href)) continue;
      queue.push(href);
    }
  }
  expect(broken).toEqual([]);
  expect(seen.size).toBeGreaterThan(30);
});
