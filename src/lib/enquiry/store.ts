import "server-only";
import { getServerEnv } from "@/lib/env";
import { createRateLimiter, type RateLimitResult } from "./rate-limit";

/**
 * State the enquiry endpoint keeps between requests: the rate-limit counters
 * and the recent-submission fingerprints used to drop duplicates.
 *
 * With a shared Redis configured (Upstash REST, see .env.example) every server
 * instance sees the same counters, which is what serverless hosting needs.
 * Without one, or if Redis is unreachable, it falls back to per-instance
 * memory so the form keeps working.
 */
export interface EnquiryStore {
  readonly kind: "redis" | "memory";
  /** Count one request for `key`; blocked once `limit` is reached in the window. */
  hit(key: string): Promise<RateLimitResult>;
  /** The enquiry ID already issued for this fingerprint, if any. */
  recall(fingerprint: string): Promise<string | null>;
  /** Remember the ID issued for a fingerprint, for the dedupe window. */
  remember(fingerprint: string, id: string): Promise<void>;
}

export interface StoreOptions {
  limit: number;
  windowMs: number;
  dedupeMs: number;
}

export function createMemoryStore({ limit, windowMs, dedupeMs }: StoreOptions): EnquiryStore {
  const limiter = createRateLimiter({ limit, windowMs });
  const recent = new Map<string, { id: string; at: number }>();
  const prune = (now: number) => {
    for (const [k, v] of recent) if (now - v.at > dedupeMs) recent.delete(k);
  };
  return {
    kind: "memory",
    async hit(key) {
      return limiter(key);
    },
    async recall(fingerprint) {
      prune(Date.now());
      return recent.get(fingerprint)?.id ?? null;
    },
    async remember(fingerprint, id) {
      recent.set(fingerprint, { id, at: Date.now() });
    },
  };
}

type Command = (string | number)[];
type PipelineReply = { result?: unknown; error?: string }[];

/** Minimal Upstash REST client: one pipeline call per operation, no SDK. */
export function createRedisStore(
  { url, token }: { url: string; token: string },
  { limit, windowMs, dedupeMs }: StoreOptions,
  fallback: EnquiryStore = createMemoryStore({ limit, windowMs, dedupeMs }),
  fetcher: typeof fetch = fetch,
): EnquiryStore {
  let warned = false;
  const degrade = (err: unknown) => {
    if (!warned) {
      warned = true;
      console.warn(`[enquiry] shared store unavailable, using per-instance memory: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  async function pipeline(commands: Command[]): Promise<unknown[]> {
    const res = await fetcher(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands.map((c) => c.map(String))),
      signal: AbortSignal.timeout(2_000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Redis responded ${res.status}`);
    const replies = (await res.json()) as PipelineReply;
    if (!Array.isArray(replies) || replies.length !== commands.length) throw new Error("Unexpected Redis reply");
    const failed = replies.find((r) => r.error);
    if (failed) throw new Error(`Redis error: ${failed.error}`);
    return replies.map((r) => r.result);
  }

  return {
    kind: "redis",
    async hit(key) {
      const k = `inferra:enquiry:rl:${key}`;
      try {
        // Fixed window: the first hit starts the clock, later hits only count.
        const [count, , ttl] = await pipeline([
          ["INCR", k],
          ["PEXPIRE", k, windowMs, "NX"],
          ["PTTL", k],
        ]);
        const used = Number(count);
        const msLeft = Math.max(Number(ttl), 0) || windowMs;
        if (used > limit) return { allowed: false, remaining: 0, retryAfterSeconds: Math.ceil(msLeft / 1000) };
        return { allowed: true, remaining: limit - used, retryAfterSeconds: 0 };
      } catch (err) {
        degrade(err);
        return fallback.hit(key);
      }
    },
    async recall(fingerprint) {
      try {
        const [id] = await pipeline([["GET", `inferra:enquiry:dedupe:${fingerprint}`]]);
        return typeof id === "string" ? id : null;
      } catch (err) {
        degrade(err);
        return fallback.recall(fingerprint);
      }
    },
    async remember(fingerprint, id) {
      try {
        await pipeline([["SET", `inferra:enquiry:dedupe:${fingerprint}`, id, "PX", dedupeMs]]);
      } catch (err) {
        degrade(err);
        await fallback.remember(fingerprint, id);
      }
    },
  };
}

let cached: EnquiryStore | null = null;

export function getEnquiryStore(options: StoreOptions): EnquiryStore {
  if (cached) return cached;
  const { redis } = getServerEnv();
  cached = redis ? createRedisStore(redis, options) : createMemoryStore(options);
  return cached;
}
