import { describe, expect, it, vi } from "vitest";
import { createMemoryStore, createRedisStore } from "@/lib/enquiry/store";

const opts = { limit: 2, windowMs: 60_000, dedupeMs: 60_000 };
const redis = { url: "https://example.upstash.io", token: "token-123456" };

/** A fake Upstash REST endpoint backed by a Map, enough for INCR/PEXPIRE/PTTL/GET/SET. */
function fakeUpstash() {
  const data = new Map<string, string>();
  const ttl = new Map<string, number>();
  const calls: string[][][] = [];
  const fetcher = vi.fn(async (_url: string | URL | Request, init?: RequestInit) => {
    const commands = JSON.parse(String(init?.body)) as string[][];
    calls.push(commands);
    const results = commands.map(([cmd, key, ...args]) => {
      switch (cmd) {
        case "INCR": {
          const n = Number(data.get(key) ?? 0) + 1;
          data.set(key, String(n));
          return { result: n };
        }
        case "PEXPIRE":
          if (!ttl.has(key)) ttl.set(key, Number(args[0]));
          return { result: 1 };
        case "PTTL":
          return { result: ttl.get(key) ?? -1 };
        case "GET":
          return { result: data.get(key) ?? null };
        case "SET":
          data.set(key, args[0]);
          return { result: "OK" };
        default:
          return { error: `unknown ${cmd}` };
      }
    });
    return new Response(JSON.stringify(results), { status: 200 });
  });
  return { fetcher: fetcher as unknown as typeof fetch, calls };
}

describe("memory enquiry store", () => {
  it("rate limits and remembers fingerprints", async () => {
    const store = createMemoryStore(opts);
    expect((await store.hit("a")).allowed).toBe(true);
    expect((await store.hit("a")).allowed).toBe(true);
    expect((await store.hit("a")).allowed).toBe(false);
    expect(await store.recall("fp")).toBeNull();
    await store.remember("fp", "INF-1");
    expect(await store.recall("fp")).toBe("INF-1");
  });
});

describe("redis enquiry store", () => {
  it("counts hits in a shared window and blocks past the limit", async () => {
    const { fetcher, calls } = fakeUpstash();
    const store = createRedisStore(redis, opts, undefined, fetcher);
    expect(await store.hit("client")).toEqual({ allowed: true, remaining: 1, retryAfterSeconds: 0 });
    expect((await store.hit("client")).allowed).toBe(true);
    expect(await store.hit("client")).toEqual({ allowed: false, remaining: 0, retryAfterSeconds: 60 });
    expect(calls[0][0]).toEqual(["INCR", "inferra:enquiry:rl:client"]);
    expect(calls[0][1]).toEqual(["PEXPIRE", "inferra:enquiry:rl:client", "60000", "NX"]);
  });

  it("stores and recalls duplicate fingerprints", async () => {
    const { fetcher, calls } = fakeUpstash();
    const store = createRedisStore(redis, opts, undefined, fetcher);
    expect(await store.recall("fp")).toBeNull();
    await store.remember("fp", "INF-ABC");
    expect(await store.recall("fp")).toBe("INF-ABC");
    expect(calls[1][0]).toEqual(["SET", "inferra:enquiry:dedupe:fp", "INF-ABC", "PX", "60000"]);
  });

  it("falls back to memory when Redis is unreachable", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fetcher = vi.fn(async () => new Response("down", { status: 500 })) as unknown as typeof fetch;
    const store = createRedisStore(redis, opts, createMemoryStore(opts), fetcher);
    expect((await store.hit("x")).allowed).toBe(true);
    expect((await store.hit("x")).allowed).toBe(true);
    expect((await store.hit("x")).allowed).toBe(false);
    await store.remember("fp", "INF-2");
    expect(await store.recall("fp")).toBe("INF-2");
    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });
});
