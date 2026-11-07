import { expect, test } from "@playwright/test";

test("work filters are kept in the URL and restored from it", async ({ page }) => {
  await page.goto("/work");
  const chips = page.getByRole("group", { name: "Filter by service" }).getByRole("button");
  const second = chips.nth(1);
  const label = (await second.textContent())?.trim() ?? "";
  await second.click();
  await expect(second).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/\/work\?service=[a-z0-9-]+$/);
  const shared = page.url();

  // Opening the shared link shows the same filtered view.
  await page.goto(shared);
  await expect(page.getByRole("button", { name: label, exact: true })).toHaveAttribute("aria-pressed", "true");

  // "All" clears the parameter.
  await chips.first().click();
  await expect(page).toHaveURL(/\/work$/);
});

test("insights topic filter uses the topic parameter", async ({ page }) => {
  await page.goto("/insights");
  const chips = page.getByRole("group", { name: "Filter by topic" }).getByRole("button");
  await chips.nth(1).click();
  await expect(page).toHaveURL(/\/insights\?topic=[a-z0-9-]+$/);
});

test("an unknown filter value falls back to showing everything", async ({ page }) => {
  await page.goto("/work?service=not-a-real-service");
  await expect(page.getByRole("button", { name: "All", exact: true })).toHaveAttribute("aria-pressed", "true");
});
