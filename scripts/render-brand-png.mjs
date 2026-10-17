/**
 * Renders PNG versions of the app icon and social lockup from the SVG sources
 * in /public/brand, using the Playwright Chromium already used for tests.
 *
 * Run: npm run brand:png  (set PLAYWRIGHT_CHROMIUM_PATH if Chromium is not auto-detected)
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const brand = path.join(root, "public", "brand");

const jobs = [
  { src: "inferra-app-icon.svg", out: "public/brand/inferra-app-icon-512.png", w: 512, h: 512 },
  { src: "inferra-app-icon.svg", out: "public/brand/inferra-app-icon-192.png", w: 192, h: 192 },
  { src: "inferra-app-icon.svg", out: "src/app/apple-icon.png", w: 180, h: 180 },
  { src: "inferra-app-icon.svg", out: "public/brand/inferra-app-icon.png", w: 512, h: 512 },
  { src: "inferra-stacked-dark.svg", out: "public/brand/inferra-stacked-dark.png", w: 640, h: 640 },
  { src: "inferra-lockup-dark.svg", out: "public/brand/inferra-lockup-dark.png", w: 0, h: 128, bg: "#0A0718" },
];

const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {});
const page = await browser.newPage();
for (const job of jobs) {
  const svg = await readFile(path.join(brand, job.src), "utf8");
  const [, vw, vh] = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg) ?? [];
  const h = job.h;
  const w = job.w || Math.round((Number(vw) / Number(vh)) * h);
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(
    `<html><body style="margin:0;background:${job.bg ?? "transparent"}">${svg.replace(/width="[\d.]+" height="[\d.]+"/, `width="${w}" height="${h}"`)}</body></html>`,
  );
  const buf = await page.screenshot({ omitBackground: !job.bg, clip: { x: 0, y: 0, width: w, height: h } });
  await writeFile(path.join(root, job.out), buf);
  console.log("wrote", job.out);
}
await browser.close();
