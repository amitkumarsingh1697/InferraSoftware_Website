import "server-only";
import { z } from "zod";

/**
 * Server-side environment validation. Secrets are read only here and never
 * exposed to the browser (none of them use the NEXT_PUBLIC_ prefix).
 * Misconfigured optional integrations are reported once and treated as
 * disabled rather than crashing the site.
 */
const emailList = z
  .string()
  .transform((v) => v.split(",").map((s) => s.trim()).filter(Boolean))
  .pipe(z.array(z.email()).min(1));

const schema = z.object({
  RESEND_API_KEY: z.string().min(10).optional(),
  ENQUIRY_TO_EMAIL: emailList.optional(),
  ENQUIRY_FROM_EMAIL: z.string().min(3).optional(),
  ENQUIRY_WEBHOOK_URL: z.url().refine((u) => u.startsWith("https://"), "Webhook must use https").optional(),
  ENQUIRY_WEBHOOK_SECRET: z.string().min(8).optional(),
  // Shared store for rate limiting and duplicate protection across instances.
  // Vercel's Upstash integration sets the KV_ names; a direct Upstash database
  // gives the UPSTASH_ names. Either pair works.
  UPSTASH_REDIS_REST_URL: z.url().refine((u) => u.startsWith("https://"), "Redis REST URL must use https").optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(8).optional(),
  KV_REST_API_URL: z.url().refine((u) => u.startsWith("https://"), "Redis REST URL must use https").optional(),
  KV_REST_API_TOKEN: z.string().min(8).optional(),
});

export interface ServerEnv {
  resend: { apiKey: string; to: string[]; from: string } | null;
  webhook: { url: string; secret?: string } | null;
  /** Shared Redis (Upstash REST) for rate limits; null means per-instance memory. */
  redis: { url: string; token: string } | null;
  issues: string[];
}

/**
 * Resend's shared test sender. It works without a verified domain, but Resend
 * only delivers its mail to the address that owns the Resend account, so it is
 * for testing; set ENQUIRY_FROM_EMAIL on a verified domain for production.
 */
export const RESEND_TEST_SENDER = "Inferra Website <onboarding@resend.dev>";

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const raw = Object.fromEntries(
    Object.keys(schema.shape).map((k) => [k, process.env[k]?.trim() ? process.env[k]?.trim() : undefined]),
  );
  const parsed = schema.safeParse(raw);
  const issues: string[] = [];
  const data = parsed.success ? parsed.data : {};
  if (!parsed.success) {
    for (const i of parsed.error.issues) issues.push(`${String(i.path[0])}: ${i.message}`);
  }
  const d = data as z.infer<typeof schema>;
  const resend =
    d.RESEND_API_KEY && d.ENQUIRY_TO_EMAIL ? { apiKey: d.RESEND_API_KEY, to: d.ENQUIRY_TO_EMAIL, from: d.ENQUIRY_FROM_EMAIL ?? RESEND_TEST_SENDER } : null;
  if (!resend && (d.RESEND_API_KEY || d.ENQUIRY_TO_EMAIL || d.ENQUIRY_FROM_EMAIL)) {
    issues.push("Email delivery needs RESEND_API_KEY and ENQUIRY_TO_EMAIL together.");
  }
  const webhook = d.ENQUIRY_WEBHOOK_URL ? { url: d.ENQUIRY_WEBHOOK_URL, secret: d.ENQUIRY_WEBHOOK_SECRET } : null;
  const redisUrl = d.UPSTASH_REDIS_REST_URL ?? d.KV_REST_API_URL;
  const redisToken = d.UPSTASH_REDIS_REST_TOKEN ?? d.KV_REST_API_TOKEN;
  const redis = redisUrl && redisToken ? { url: redisUrl.replace(/\/+$/, ""), token: redisToken } : null;
  if (!redis && (redisUrl || redisToken)) issues.push("Shared rate limiting needs both a Redis REST URL and token.");
  if (issues.length) console.warn(`[env] Enquiry configuration issues: ${issues.join("; ")}`);
  cached = { resend, webhook, redis, issues };
  return cached;
}

export function isEnquiryDeliveryConfigured(): boolean {
  const env = getServerEnv();
  return Boolean(env.resend || env.webhook);
}
