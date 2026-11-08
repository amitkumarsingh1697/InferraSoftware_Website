import { afterEach, describe, expect, it, vi } from "vitest";

const keys = [
  "RESEND_API_KEY",
  "ENQUIRY_TO_EMAIL",
  "ENQUIRY_FROM_EMAIL",
  "ENQUIRY_WEBHOOK_URL",
  "ENQUIRY_WEBHOOK_SECRET",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "KV_REST_API_URL",
  "KV_REST_API_TOKEN",
];

async function loadEnv(vars: Record<string, string>) {
  for (const k of keys) delete process.env[k];
  Object.assign(process.env, vars);
  vi.resetModules();
  return import("@/lib/env");
}

afterEach(() => {
  for (const k of keys) delete process.env[k];
});

describe("enquiry delivery configuration", () => {
  it("is off when nothing is set", async () => {
    const { getServerEnv } = await loadEnv({});
    expect(getServerEnv().resend).toBeNull();
  });

  it("uses the Resend test sender when no from address is set", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const { getServerEnv, RESEND_TEST_SENDER } = await loadEnv({ RESEND_API_KEY: "re_test_1234567890", ENQUIRY_TO_EMAIL: "owner@example.com" });
    expect(getServerEnv().resend).toEqual({ apiKey: "re_test_1234567890", to: ["owner@example.com"], from: RESEND_TEST_SENDER });
  });

  it("prefers an explicit from address", async () => {
    const { getServerEnv } = await loadEnv({
      RESEND_API_KEY: "re_test_1234567890",
      ENQUIRY_TO_EMAIL: "a@example.com, b@example.com",
      ENQUIRY_FROM_EMAIL: "Site <web@example.com>",
    });
    expect(getServerEnv().resend).toMatchObject({ to: ["a@example.com", "b@example.com"], from: "Site <web@example.com>" });
  });

  it("stays off with an API key but no recipient", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { getServerEnv } = await loadEnv({ RESEND_API_KEY: "re_test_1234567890" });
    expect(getServerEnv().resend).toBeNull();
    expect(warn).toHaveBeenCalled();
  });
});

describe("shared rate-limit store configuration", () => {
  it("is off by default", async () => {
    const { getServerEnv } = await loadEnv({});
    expect(getServerEnv().redis).toBeNull();
  });

  it("accepts the Upstash variable names", async () => {
    const { getServerEnv } = await loadEnv({ UPSTASH_REDIS_REST_URL: "https://eu1.upstash.io/", UPSTASH_REDIS_REST_TOKEN: "tok_12345678" });
    expect(getServerEnv().redis).toEqual({ url: "https://eu1.upstash.io", token: "tok_12345678" });
  });

  it("accepts the Vercel KV variable names", async () => {
    const { getServerEnv } = await loadEnv({ KV_REST_API_URL: "https://kv.upstash.io", KV_REST_API_TOKEN: "tok_12345678" });
    expect(getServerEnv().redis).toEqual({ url: "https://kv.upstash.io", token: "tok_12345678" });
  });

  it("stays off with only a URL", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const { getServerEnv } = await loadEnv({ KV_REST_API_URL: "https://kv.upstash.io" });
    expect(getServerEnv().redis).toBeNull();
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });
});
