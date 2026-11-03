"use client";

import { siteConfig } from "@/config/site";

/** Last-resort error boundary, rendered when the root layout itself fails. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: "100vh", display: "grid", placeItems: "center", background: "#F5F2EA", color: "#14261F", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ maxWidth: 520, padding: 24 }}>
          <p style={{ color: "#9C4A22", letterSpacing: "0.2em", fontSize: 12 }}>INFERRA SOFTWARE</p>
          <h1 style={{ fontSize: 32, lineHeight: 1.2 }}>Something went wrong.</h1>
          <p style={{ color: "#3F5249", lineHeight: 1.6 }}>Please try again. You can also call us on {siteConfig.contact.phoneDisplay}.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 16, background: "#1F4D3D", color: "#FFFFFF", border: 0, borderRadius: 999, padding: "12px 20px", fontWeight: 600, cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
