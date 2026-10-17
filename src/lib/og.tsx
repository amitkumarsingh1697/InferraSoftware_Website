import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = path.join(process.cwd(), "src", "assets", "og");

async function fonts() {
  const [sora, mono, inter] = await Promise.all([
    readFile(path.join(fontDir, "sora-latin-600-normal.woff")),
    readFile(path.join(fontDir, "jetbrains-mono-latin-500-normal.woff")),
    readFile(path.join(fontDir, "inter-latin-400-normal.woff")),
  ]);
  return [
    { name: "Sora", data: sora, weight: 600 as const, style: "normal" as const },
    { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
    { name: "Inter", data: inter, weight: 400 as const, style: "normal" as const },
  ];
}

/** Branded social card: midnight field, the core motif, eyebrow, title and lockup. */
export async function renderOgImage({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "radial-gradient(circle at 82% 38%, #4c1d95 0%, #1a0f3d 32%, #0A0718 62%)",
          color: "#F5F3FF",
          fontFamily: "Inter",
          position: "relative",
        }}
      >
        <svg width="520" height="520" viewBox="-200 -200 400 400" style={{ position: "absolute", right: -40, top: 40, opacity: 0.9 }}>
          <circle r="60" fill="#67E8F9" fillOpacity="0.35" />
          <circle r="16" fill="#ffffff" />
          <ellipse rx="150" ry="44" transform="rotate(-18)" fill="none" stroke="#C4B5FD" strokeOpacity="0.8" strokeWidth="2" />
          <ellipse rx="128" ry="36" transform="rotate(32)" fill="none" stroke="#67E8F9" strokeOpacity="0.6" strokeWidth="2" />
          <ellipse rx="176" ry="58" transform="rotate(76)" fill="none" stroke="#C4B5FD" strokeOpacity="0.35" strokeWidth="2" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="56" viewBox="0 0 48 48">
            <path fill="#A78BFA" d="M17 5h5L10 24l12 19h-5L5 24z" />
            <path fill="#A78BFA" d="M31 5h-5l12 19-12 19h5l12-19z" />
            <path fill="#F5F3FF" d="M21.5 20.5h5V38l-2.5 3-2.5-3z" />
            <circle fill="#67E8F9" cx="24" cy="12.5" r="3.6" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Sora", fontSize: 28, letterSpacing: 5 }}>INFERRA</span>
            <span style={{ fontFamily: "Mono", fontSize: 12, letterSpacing: 7, color: "#B7B0CC" }}>SOFTWARE</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <span style={{ fontFamily: "Mono", fontSize: 20, letterSpacing: 4, color: "#67E8F9", textTransform: "uppercase" }}>{eyebrow}</span>
          <span style={{ fontFamily: "Sora", fontSize: title.length > 60 ? 54 : 64, lineHeight: 1.08, marginTop: 20, letterSpacing: -1.5 }}>{title}</span>
          {subtitle && <span style={{ fontSize: 26, color: "#B7B0CC", marginTop: 22, lineHeight: 1.4 }}>{subtitle}</span>}
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
