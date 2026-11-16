import { expect, test } from "@playwright/test";
import { horizontalOverflow, watchErrors } from "./helpers";

// Runs in the phone and tablet projects (and the opt-in iPhone/iPad WebKit
// projects), each with its real user agent, touch and pixel ratio.
const pages = ["/", "/services", "/work", "/insights", "/about", "/contact"];

for (const path of pages) {
  test(`${path} loads styled and fits the screen @mobile`, async ({ page, isMobile }) => {
    test.skip(!isMobile, "phones and tablets only");
    const errors = watchErrors(page);
    const failed: string[] = [];
    page.on("requestfailed", (req) => failed.push(`${req.url()} ${req.failure()?.errorText ?? ""}`));

    await page.goto(path);
    await expect(page.locator("h1").first()).toBeVisible();

    // Stylesheets applied: the body gets the brand canvas colour, not the browser default.
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    expect(bg).not.toBe("rgba(0, 0, 0, 0)");
    expect(bg).not.toBe("rgb(255, 255, 255)");

    expect(await horizontalOverflow(page), "horizontal scroll").toBeLessThanOrEqual(0);
    expect(failed, "failed requests").toEqual([]);
    expect(errors.filter((e) => !e.includes("Cross-Origin-Opener-Policy")), "console errors").toEqual([]);
  });
}
