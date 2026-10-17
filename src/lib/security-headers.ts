/**
 * HTTP security headers, applied to every route from next.config.ts.
 *
 * Content Security Policy notes:
 * - Pages are statically prerendered, so per-request nonces are not used.
 *   Next.js injects small inline bootstrap scripts, which requires
 *   'unsafe-inline' for script-src. All other sources are locked to 'self'.
 * - When analytics is enabled (NEXT_PUBLIC_PLAUSIBLE_DOMAIN), its script and
 *   API origin are added automatically.
 */
export function analyticsOrigin(): string | null {
  if (!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) return null;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";
  try {
    return new URL(src).origin;
  } catch {
    return null;
  }
}

export function isIndexingEnabled(): boolean {
  // Index only when explicitly enabled AND (when on Vercel) this is the production deployment.
  const enabled = process.env.SITE_INDEXING === "enabled";
  const vercelEnv = process.env.VERCEL_ENV;
  return enabled && (vercelEnv === undefined || vercelEnv === "production");
}

export function buildContentSecurityPolicy(): string {
  const isDev = process.env.NODE_ENV !== "production";
  const analytics = analyticsOrigin();
  const script = ["'self'", "'unsafe-inline'", isDev ? "'unsafe-eval'" : null, analytics].filter(Boolean).join(" ");
  const connect = ["'self'", analytics, isDev ? "ws:" : null].filter(Boolean).join(" ");
  return [
    "default-src 'self'",
    `script-src ${script}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src ${connect}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    isDev ? null : "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; ");
}

export function buildSecurityHeaders(): { key: string; value: string }[] {
  const headers = [
    { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
    { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  ];
  if (!isIndexingEnabled()) {
    headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
  }
  return headers;
}
