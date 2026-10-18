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
});

export interface ServerEnv {
  resend: { apiKey: string; to: string[]; from: string } | null;
  webhook: { url: string; secret?: string } | null;
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
  if (issues.length) console.warn(`[env] Enquiry delivery configuration issues: ${issues.join("; ")}`);
  cached = { resend, webhook, issues };
  return cached;
}

export function isEnquiryDeliveryConfigured(): boolean {
  const env = getServerEnv();
  return Boolean(env.resend || env.webhook);
}
