import { afterEach, describe, expect, it, vi } from "vitest";
import { buildContentSecurityPolicy, buildSecurityHeaders, isIndexingEnabled } from "@/lib/security-headers";

afterEach(() => vi.unstubAllEnvs());

const header = (key: string) => buildSecurityHeaders().find((h) => h.key === key)?.value;

describe("indexing control", () => {
  it("is off by default", () => {
    vi.stubEnv("SITE_INDEXING", "");
    expect(isIndexingEnabled()).toBe(false);
    expect(header("X-Robots-Tag")).toBe("noindex, nofollow");
  });

  it("is on only when enabled outside Vercel or on Vercel production", () => {
    vi.stubEnv("SITE_INDEXING", "enabled");
    vi.stubEnv("VERCEL_ENV", undefined as unknown as string);
    expect(isIndexingEnabled()).toBe(true);
    vi.stubEnv("VERCEL_ENV", "production");
    expect(isIndexingEnabled()).toBe(true);
    expect(header("X-Robots-Tag")).toBeUndefined();
  });

  it("never indexes Vercel preview deployments", () => {
    vi.stubEnv("SITE_INDEXING", "enabled");
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(isIndexingEnabled()).toBe(false);
  });
});

describe("content security policy", () => {
  it("locks down framing, objects and form targets", () => {
    vi.stubEnv("NODE_ENV", "production");
    const csp = buildContentSecurityPolicy();
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).not.toContain("unsafe-eval");
    expect(csp).not.toContain("plausible.io");
  });

  it("adds the analytics origin only when analytics is configured", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_PLAUSIBLE_DOMAIN", "example.com");
    expect(buildContentSecurityPolicy()).toContain("https://plausible.io");
  });

  it("sends the standard hardening headers", () => {
    expect(header("X-Content-Type-Options")).toBe("nosniff");
    expect(header("X-Frame-Options")).toBe("DENY");
    expect(header("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  });
});
