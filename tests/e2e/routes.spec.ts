import { expect, test } from "@playwright/test";
import { horizontalOverflow, sitemapPaths, watchErrors } from "./helpers";

test("sitemap lists every required route", async ({ page }) => {
  const paths = await sitemapPaths(page);
  for (const required of ["/", "/about", "/services", "/industries", "/technology", "/work", "/insights", "/careers", "/contact", "/privacy", "/terms"]) {
    expect(paths).toContain(required);
  }
  expect(paths.filter((p) => p.startsWith("/services/"))).toHaveLength(10);
});

test("every sitemap route renders with one h1, a title, no console errors and no CSP violations", async ({ page }) => {
  test.setTimeout(180_000);
  await page.addInitScript(() => {
    const w = window as unknown as { __csp: string[] };
    w.__csp = [];
    document.addEventListener("securitypolicyviolation", (e) => w.__csp.push(`${e.violatedDirective} ${e.blockedURI}`));
  });
  const paths = await sitemapPaths(page);
  for (const path of paths) {
    const errors = watchErrors(page);
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(200);
    await expect(page.locator("h1"), path).toHaveCount(1);
    expect(await page.title(), path).toMatch(/Inferra/);
    expect(await page.locator('meta[name="description"]').getAttribute("content"), path).toBeTruthy();
    expect(errors, path).toEqual([]);
    await page.waitForLoadState("networkidle");
    expect(await page.evaluate(() => (window as unknown as { __csp: string[] }).__csp), path).toEqual([]);
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
  }
});

test("unknown routes show the custom 404 page", async ({ page }) => {
  const res = await page.goto("/this-route-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("isn't part of the system");
  await expect(page.getByRole("link", { name: /home/i }).first()).toBeVisible();
});

test("unknown dynamic slugs return 404", async ({ page }) => {
  for (const path of ["/services/not-a-service", "/work/not-a-project", "/insights/not-an-article", "/industries/not-an-industry"]) {
    const res = await page.goto(path);
    expect(res?.status(), path).toBe(404);
  }
});

test("robots, manifest and security headers", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  // Indexing is disabled unless SITE_INDEXING=enabled on production.
  expect(await robots.text()).toMatch(/Disallow: \//);

  const home = await request.get("/");
  const h = home.headers();
  expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(h["x-content-type-options"]).toBe("nosniff");
  expect(h["x-robots-tag"]).toBe("noindex, nofollow");
  expect(h["x-powered-by"]).toBeUndefined();

  expect((await request.get("/manifest.webmanifest")).status()).toBe(200);
  expect((await request.get("/opengraph-image")).headers()["content-type"]).toContain("image/png");
});

test("pages include structured data", async ({ page }) => {
  await page.goto("/services/ai-llm-engineering");
  const blocks = await page.locator('script[type="application/ld+json"]').allTextContents();
  const types = blocks.flatMap((b) => {
    const data = JSON.parse(b);
    return (Array.isArray(data) ? data : [data]).map((d) => d["@type"]);
  });
  expect(types).toEqual(expect.arrayContaining(["Organization", "Service", "BreadcrumbList"]));
});

for (const width of [360, 390, 768, 1024, 1440, 1920]) {
  test(`no horizontal overflow at ${width}px`, async ({ page }) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/services", "/services/sap-basis", "/work/ai-knowledge-assistant", "/insights/production-readiness-checklist", "/contact", "/about", "/technology"]) {
      await page.goto(path);
      expect(await horizontalOverflow(page), `${path} @ ${width}`).toBeLessThanOrEqual(0);
    }
  });
}
