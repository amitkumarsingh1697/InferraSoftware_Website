import { describe, expect, it } from "vitest";
import { createRateLimiter } from "@/lib/enquiry/rate-limit";

describe("createRateLimiter", () => {
  it("allows up to the limit within the window, then blocks", () => {
    const check = createRateLimiter({ limit: 3, windowMs: 1000 });
    expect(check("a", 0).allowed).toBe(true);
    expect(check("a", 10).allowed).toBe(true);
    expect(check("a", 20).remaining).toBe(0);
    const blocked = check("a", 30);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(1);
  });

  it("tracks keys independently and frees capacity after the window", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(check("a", 0).allowed).toBe(true);
    expect(check("b", 0).allowed).toBe(true);
    expect(check("a", 500).allowed).toBe(false);
    expect(check("a", 1001).allowed).toBe(true);
  });

  it("bounds memory by evicting the oldest key", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 10_000, maxKeys: 2 });
    check("a", 0);
    check("b", 1);
    check("c", 2);
    // "a" was evicted, so it is allowed again.
    expect(check("a", 3).allowed).toBe(true);
  });
});
