/**
 * Sliding-window rate limiter.
 *
 * In-memory storage is per server instance. That is adequate for a small
 * marketing site and still blocks bursts from a single source, but serverless
 * platforms may run several instances. For stricter guarantees, replace the
 * store with a shared one (for example Upstash Redis or Vercel KV); the
 * interface below is intentionally small to make that swap easy.
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }) {
  const hits = new Map<string, number[]>();

  return function check(key: string, now = Date.now()): RateLimitResult {
    const windowStart = now - windowMs;
    const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return { allowed: false, remaining: 0, retryAfterSeconds: Math.ceil((recent[0] + windowMs - now) / 1000) };
    }
    recent.push(now);
    hits.set(key, recent);
    if (hits.size > maxKeys) {
      // Drop the oldest entries to bound memory.
      const oldest = hits.keys().next().value;
      if (oldest !== undefined) hits.delete(oldest);
    }
    return { allowed: true, remaining: limit - recent.length, retryAfterSeconds: 0 };
  };
}
