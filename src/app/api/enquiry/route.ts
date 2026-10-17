import { createHash, randomUUID } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { enquirySchema, fieldErrors } from "@/lib/enquiry/schema";
import { createRateLimiter } from "@/lib/enquiry/rate-limit";
import { deliverEnquiry } from "@/lib/enquiry/deliver";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_MS = 3_000;
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60_000 });
const recent = new Map<string, { id: string; at: number }>();
const DEDUPE_MS = 10 * 60_000;

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || req.headers.get("x-real-ip") || "unknown";
  // Hash so raw IP addresses are never held in memory longer than needed.
  return createHash("sha256").update(ip).digest("hex").slice(0, 32);
}

function json(status: number, body: Record<string, unknown>, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(req: NextRequest) {
  // Same-origin check: browsers always send Origin on cross-site POSTs.
  const origin = req.headers.get("origin");
  if (origin) {
    let sameOrigin = false;
    try {
      sameOrigin = new URL(origin).host === req.headers.get("host");
    } catch {
      sameOrigin = false;
    }
    if (!sameOrigin) return json(403, { ok: false, error: "forbidden" });
  }

  const rate = limiter(clientKey(req));
  if (!rate.allowed) {
    return json(429, { ok: false, error: "rate_limited", retryAfter: rate.retryAfterSeconds }, { "Retry-After": String(rate.retryAfterSeconds) });
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return json(415, { ok: false, error: "unsupported_media_type" });

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "too_large" });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json(422, { ok: false, error: "validation", fields: fieldErrors(parsed.error) });
  }
  const enquiry = parsed.data;

  // Spam controls: a filled honeypot or an implausibly fast submission is
  // acknowledged without delivery, so automated senders learn nothing.
  const tooFast = typeof enquiry.startedAt === "number" && Date.now() - enquiry.startedAt < MIN_FILL_MS;
  if (enquiry.website || tooFast) {
    return json(200, { ok: true, id: "received" });
  }

  // Duplicate protection (double clicks, retries): same sender + message within 10 minutes.
  const fingerprint = createHash("sha256").update(`${enquiry.email}|${enquiry.message}`).digest("hex");
  const now = Date.now();
  for (const [k, v] of recent) if (now - v.at > DEDUPE_MS) recent.delete(k);
  const previous = recent.get(fingerprint);
  if (previous) return json(200, { ok: true, id: previous.id, duplicate: true });

  const id = `INF-${randomUUID().slice(0, 8).toUpperCase()}`;
  const result = await deliverEnquiry(enquiry, id);

  if (result.ok) {
    recent.set(fingerprint, { id, at: now });
    console.info(`[enquiry ${id}] delivered via ${result.channels.join(", ")}`);
    return json(200, { ok: true, id });
  }

  if (result.reason === "unconfigured") {
    console.warn(`[enquiry ${id}] not delivered: no delivery channel is configured`);
    return json(503, { ok: false, error: "delivery_unconfigured" });
  }
  return json(502, { ok: false, error: "delivery_failed" });
}

export function GET() {
  return json(405, { ok: false, error: "method_not_allowed" }, { Allow: "POST" });
}
