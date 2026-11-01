import { expect, test } from "@playwright/test";

test("3D scene loads behind the homepage without errors when forced on", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/?scene=on");
  const canvas = page.locator("canvas");
  await expect(canvas).toHaveCount(1, { timeout: 20_000 });
  // Decorative only: hidden from assistive technology and never intercepts clicks.
  await expect(page.locator("div[aria-hidden]").filter({ has: canvas }).first()).toHaveClass(/pointer-events-none/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});

test("automated browsers get the static backdrop instead of WebGL", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1500);
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("every homepage chapter declares a scene stop", async ({ page }) => {
  await page.goto("/");
  const stops = await page.locator("[data-scene]").evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.scene));
  expect(stops).toEqual(["hero", "credibility", "capabilities", "services", "approach", "work", "team", "technology", "insights", "closing"]);
});
