import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = ["/", "/about", "/services", "/services/agentic-ai-automation", "/industries/financial-services", "/technology", "/work", "/work/agentic-workflow-approvals", "/insights", "/insights/production-readiness-checklist", "/careers", "/contact", "/privacy", "/this-page-does-not-exist"];

for (const path of pages) {
  test(`no WCAG 2.2 AA violations on ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(", ")}`);
    expect(summary).toEqual([]);
  });
}

test("contact form errors are accessible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Continue" }).click();
  const results = await new AxeBuilder({ page }).include("form").analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
