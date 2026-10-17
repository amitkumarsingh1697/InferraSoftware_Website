import "server-only";
import { getServerEnv } from "@/lib/env";
import { enquiryHtml, enquirySubject, enquiryText, headerSafe } from "./format";
import type { Enquiry } from "./schema";

export type DeliveryResult =
  | { ok: true; channels: string[] }
  | { ok: false; reason: "unconfigured" | "failed"; channels: string[] };

async function sendWithResend(e: Enquiry, id: string, cfg: { apiKey: string; to: string[]; from: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: cfg.from,
      to: cfg.to,
      reply_to: headerSafe(e.email, 200),
      subject: enquirySubject(e, id),
      text: enquiryText(e, id),
      html: enquiryHtml(e, id),
      headers: { "X-Entity-Ref-ID": id },
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

async function sendToWebhook(e: Enquiry, id: string, url: string, secret?: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(secret ? { Authorization: `Bearer ${secret}` } : {}) },
    body: JSON.stringify({ id, receivedAt: new Date().toISOString(), text: enquiryText(e, id), enquiry: e }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/**
 * Delivers an enquiry through every configured channel. Succeeds if at least
 * one channel accepts it. Never logs the enquiry content.
 */
export async function deliverEnquiry(e: Enquiry, id: string): Promise<DeliveryResult> {
  const env = getServerEnv();
  const tasks: { name: string; run: () => Promise<void> }[] = [];

  if (env.resend) {
    const cfg = env.resend;
    tasks.push({ name: "email", run: () => sendWithResend(e, id, cfg) });
  }
  if (env.webhook) {
    const cfg = env.webhook;
    tasks.push({ name: "webhook", run: () => sendToWebhook(e, id, cfg.url, cfg.secret) });
  }
  if (tasks.length === 0) return { ok: false, reason: "unconfigured", channels: [] };

  const results = await Promise.allSettled(tasks.map((t) => t.run()));
  const delivered = tasks.filter((_, i) => results[i].status === "fulfilled").map((t) => t.name);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      console.error(`[enquiry ${id}] ${tasks[i].name} delivery failed: ${r.reason instanceof Error ? r.reason.message : "unknown error"}`);
    }
  });
  return delivered.length > 0 ? { ok: true, channels: delivered } : { ok: false, reason: "failed", channels: [] };
}
