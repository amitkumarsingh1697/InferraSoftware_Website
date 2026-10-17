/**
 * Generates the Inferra Software logo files in /public/brand.
 *
 * The symbol is hand-authored geometry (see MARK_PATHS). The wordmark is
 * converted from the Sora typeface (SIL Open Font License) into outlined
 * paths so the SVG files render identically everywhere, with no font
 * dependency.
 *
 * Run: npm run brand
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public", "brand");

const palette = {
  dark: { bg: "#0A0718", a: "#A78BFA", b: "#7C3AED", stem: "#F5F3FF", node: "#67E8F9", word: "#F5F3FF", sub: "#B7B0CC" },
  light: { bg: "#FFFFFF", a: "#7C3AED", b: "#5B21B6", stem: "#1A1233", node: "#0E7490", word: "#1A1233", sub: "#4B4466" },
};

// 48 x 48 grid. Two faceted chevrons form a diamond; the stem and node
// between them form an "i": an input bracket, an inference, an output bracket.
const MARK = {
  left: "M17 5h5L10 24l12 19h-5L5 24z",
  right: "M31 5h-5l12 19-12 19h5l12-19z",
  stem: "M21.5 20.5h5V38l-2.5 3-2.5-3z",
  node: { cx: 24, cy: 12.5, r: 3.6 },
};

function markGroup({ a, b, stem, node }, id, mono) {
  if (mono) {
    return `<g fill="${mono}"><path d="${MARK.left}"/><path d="${MARK.right}"/><path d="${MARK.stem}"/><circle cx="${MARK.node.cx}" cy="${MARK.node.cy}" r="${MARK.node.r}"/></g>`;
  }
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
<g><path fill="url(#${id})" d="${MARK.left}"/><path fill="url(#${id})" d="${MARK.right}"/><path fill="${stem}" d="${MARK.stem}"/><circle fill="${node}" cx="${MARK.node.cx}" cy="${MARK.node.cy}" r="${MARK.node.r}"/></g>`;
}

async function loadFont(file) {
  const buf = await readFile(path.join(root, "node_modules", "@fontsource", file));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

function textPath(font, text, size, tracking, x, y) {
  let cursor = x;
  const parts = [];
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    const p = glyph.getPath(cursor, y, size);
    parts.push(p.toPathData(2));
    cursor += (glyph.advanceWidth / font.unitsPerEm) * size + tracking;
  }
  return { d: parts.join(""), width: cursor - x - tracking };
}

const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="${title}"><title>${title}</title>${body}</svg>\n`;

async function main() {
  await mkdir(out, { recursive: true });
  const sora = await loadFont("sora/files/sora-latin-600-normal.woff");
  const mono = await loadFont("jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff");

  const files = {};

  // Symbol only
  files["inferra-mark.svg"] = svg(48, 48, markGroup(palette.dark, "g"), "Inferra Software");
  files["inferra-mark-light.svg"] = svg(48, 48, markGroup(palette.light, "g"), "Inferra Software");
  files["inferra-mark-mono.svg"] = svg(48, 48, markGroup({}, "g", "#000000"), "Inferra Software");
  files["inferra-mark-mono-white.svg"] = svg(48, 48, markGroup({}, "g", "#FFFFFF"), "Inferra Software");

  // App icon: symbol on a midnight tile
  files["inferra-app-icon.svg"] = svg(
    512,
    512,
    `<rect width="512" height="512" rx="112" fill="#0A0718"/><rect x="8" y="8" width="496" height="496" rx="104" fill="none" stroke="#8B5CF6" stroke-opacity=".35" stroke-width="4"/><g transform="translate(96 96) scale(6.667)">${markGroup(palette.dark, "g")}</g>`,
    "Inferra Software",
  );

  // Horizontal lockup: symbol + INFERRA + SOFTWARE
  const word = textPath(sora, "INFERRA", 30, 3.2, 64, 35);
  const sub = textPath(mono, "SOFTWARE", 9.5, 4.1, 66, 52);
  const lockW = Math.ceil(Math.max(64 + word.width, 66 + sub.width) + 4);
  const lockup = (p, id, monoColor) =>
    `<g transform="translate(0 8)">${markGroup(p, id, monoColor)}</g><path fill="${monoColor ?? p.word}" d="${word.d}"/><path fill="${monoColor ?? p.sub}" d="${sub.d}"/>`;
  files["inferra-lockup-dark.svg"] = svg(lockW, 64, lockup(palette.dark, "g"), "Inferra Software");
  files["inferra-lockup-light.svg"] = svg(lockW, 64, lockup(palette.light, "g"), "Inferra Software");
  files["inferra-lockup-mono.svg"] = svg(lockW, 64, lockup({}, "g", "#000000"), "Inferra Software");
  files["inferra-lockup-mono-white.svg"] = svg(lockW, 64, lockup({}, "g", "#FFFFFF"), "Inferra Software");

  // Wordmark only
  const wm = textPath(sora, "INFERRA", 40, 4.4, 0, 40);
  files["inferra-wordmark.svg"] = svg(Math.ceil(wm.width + 2), 48, `<path fill="#F5F3FF" d="${wm.d}"/>`, "Inferra");
  files["inferra-wordmark-light.svg"] = svg(Math.ceil(wm.width + 2), 48, `<path fill="#1A1233" d="${wm.d}"/>`, "Inferra");

  // Stacked lockup for social avatars and square placements
  const sw = textPath(sora, "INFERRA", 44, 4.8, 0, 0);
  const ss = textPath(mono, "SOFTWARE", 14, 6.2, 0, 0);
  const W = 320;
  const stacked = (p, id) =>
    `<rect width="${W}" height="${W}" fill="${p.bg}"/><g transform="translate(94 44) scale(2.75)">${markGroup(p, id)}</g>` +
    `<path fill="${p.word}" transform="translate(${(W - sw.width) / 2} 222)" d="${sw.d}"/>` +
    `<path fill="${p.sub}" transform="translate(${(W - ss.width) / 2} 252)" d="${ss.d}"/>`;
  files["inferra-stacked-dark.svg"] = svg(W, W, stacked(palette.dark, "g"), "Inferra Software");
  files["inferra-stacked-light.svg"] = svg(W, W, stacked(palette.light, "g"), "Inferra Software");

  for (const [name, body] of Object.entries(files)) {
    await writeFile(path.join(out, name), body);
  }
  // Favicon used by the App Router (src/app/icon.svg)
  await writeFile(path.join(root, "src", "app", "icon.svg"), files["inferra-mark.svg"]);
  console.log(`Wrote ${Object.keys(files).length} brand files to public/brand`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
