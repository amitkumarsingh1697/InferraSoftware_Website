"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle2, Copy, LoaderCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonClasses } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { readAttribution } from "@/lib/attribution";
import { enquirySchema, fieldErrors, stepOneFields } from "@/lib/enquiry/schema";
import {
  budgetRanges,
  engagementModels,
  enquiryTypes,
  projectTypes,
  referralSources,
  regions,
  serviceOptions,
  timelines,
} from "@/lib/enquiry/options";

type FormState = {
  enquiryType: string;
  fullName: string;
  email: string;
  company: string;
  jobTitle: string;
  region: string;
  service: string;
  projectType: string;
  message: string;
  budget: string;
  timeline: string;
  engagementModel: string;
  referral: string;
  portfolioUrl: string;
  consent: boolean;
  website: string;
};

const initial: FormState = {
  enquiryType: "project",
  fullName: "",
  email: "",
  company: "",
  jobTitle: "",
  region: "",
  service: "",
  projectType: "",
  message: "",
  budget: "",
  timeline: "",
  engagementModel: "",
  referral: "",
  portfolioUrl: "",
  consent: false,
  website: "",
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; id: string }
  | { kind: "error"; code: "delivery_unconfigured" | "delivery_failed" | "rate_limited" | "network" | "unknown" };

const LABELS: Record<string, string> = {
  enquiryType: "Enquiry type",
  fullName: "Full name",
  email: "Business email",
  company: "Company name",
  jobTitle: "Job title",
  region: "Country or region",
  service: "Service of interest",
  projectType: "Project type",
  message: "Message",
  engagementModel: "Preferred engagement model",
  referral: "How you heard about us",
  portfolioUrl: "CV or portfolio link",
  consent: "Privacy consent",
};

export interface EnquiryFormProps {
  phone: { display: string; e164: string };
  email: string | null;
  bookingUrl: string | null;
}

function prefill(base: FormState, type: string | null, service: string | null): FormState {
  const next = { ...base };
  if (type === "partnership") {
    next.enquiryType = "partnership";
    next.projectType = "capacity";
    next.engagementModel = "white-label";
  } else if (type === "careers") {
    next.enquiryType = "careers";
  }
  if (service && serviceOptions.some((o) => o.value === service)) next.service = service;
  return next;
}

export function EnquiryForm({ phone, email, bookingUrl }: EnquiryFormProps) {
  const params = useSearchParams();
  // Pre-fill from links such as /contact?type=partnership or ?service=sap-basis
  const [form, setForm] = useState<FormState>(() => prefill(initial, params.get("type"), params.get("service")));
  const [step, setStep] = useState<1 | 2>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [showMore, setShowMore] = useState(false);
  const [copied, setCopied] = useState(false);
  const startedAt = useRef<number>(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Record when the form was first shown; the server rejects instant submissions.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const isCareers = form.enquiryType === "careers";

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: "" }));
  };

  // Only called from event handlers, so reading the ref here is safe.
  const buildPayload = () => {
    const base = { ...form, attribution: undefined as unknown, startedAt: startedAt.current || undefined };
    if (form.enquiryType === "careers") {
      base.service = base.service || "not-sure";
      base.projectType = "other";
      base.engagementModel = "not-sure";
    }
    return base;
  };

  const validate = (only?: readonly string[]) => {
    const result = enquirySchema.safeParse(buildPayload());
    if (result.success) return {};
    const errs = fieldErrors(result.error);
    if (!only) return errs;
    return Object.fromEntries(Object.entries(errs).filter(([k]) => only.includes(k)));
  };

  const focusSummary = () => window.requestAnimationFrame(() => summaryRef.current?.focus());

  const next = () => {
    const errs = validate(stepOneFields);
    setErrors(errs);
    if (Object.keys(errs).length) return focusSummary();
    setStep(2);
    window.requestAnimationFrame(() => stepHeadingRef.current?.focus());
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) return next();
    if (status.kind === "submitting") return;
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      if (Object.keys(errs).some((k) => (stepOneFields as readonly string[]).includes(k))) setStep(1);
      return focusSummary();
    }
    setStatus({ kind: "submitting" });
    const payload = buildPayload();
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, attribution: readAttribution() }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string; error?: string; fields?: Record<string, string> };
      if (res.ok && data.ok) {
        setStatus({ kind: "success", id: data.id ?? "" });
        track(form.enquiryType === "partnership" ? "partnership_enquiry" : form.enquiryType === "careers" ? "career_enquiry" : "enquiry_submitted", {
          service: payload.service,
        });
      } else if (data.error === "validation" && data.fields) {
        setStatus({ kind: "idle" });
        setErrors(data.fields);
        focusSummary();
        return;
      } else {
        const code =
          data.error === "delivery_unconfigured" || data.error === "delivery_failed" || data.error === "rate_limited" ? data.error : "unknown";
        setStatus({ kind: "error", code });
        track("enquiry_failed", { reason: code });
      }
    } catch {
      setStatus({ kind: "error", code: "network" });
      track("enquiry_failed", { reason: "network" });
    }
    window.requestAnimationFrame(() => resultRef.current?.focus());
  };

  const copyMessage = async () => {
    const text = `Name: ${form.fullName}\nEmail: ${form.email}\nCompany: ${form.company}\n\n${form.message}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (status.kind === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="panel p-8 text-center outline-none sm:p-12">
        <CheckCircle2 aria-hidden className="mx-auto h-12 w-12 text-success" />
        <h2 className="mt-5 font-display text-2xl font-semibold">Thank you. Your enquiry has been sent.</h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-fg-muted">
          We read every message personally and will reply to <strong className="text-fg">{form.email}</strong>. If it is urgent, call us on{" "}
          <a href={`tel:${phone.e164}`} className="text-cyan underline underline-offset-2">
            {phone.display}
          </a>
          .
        </p>
        {status.id && status.id !== "received" && <p className="mt-4 font-mono text-xs text-fg-subtle">Reference: {status.id}</p>}
        <Link href="/insights" className={buttonClasses("secondary", "mt-8")}>
          Read our engineering guides
        </Link>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v);
  const submitting = status.kind === "submitting";

  return (
    <form onSubmit={submit} noValidate className="panel p-6 sm:p-9" aria-describedby="form-intro">
      <div className="flex items-center justify-between gap-4">
        <p id="form-intro" className="text-sm text-fg-muted">
          Fields marked <span aria-hidden className="text-cyan">*</span>
          <span className="sr-only">with an asterisk</span> are required.
        </p>
        <p className="font-mono text-xs text-fg-subtle" aria-live="polite">
          Step {step} of 2
        </p>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        <span className="h-1 flex-1 rounded-full bg-gradient-to-r from-accent to-cyan" />
        <span className={cn("h-1 flex-1 rounded-full", step === 2 ? "bg-gradient-to-r from-accent to-cyan" : "bg-line-strong")} />
      </div>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="mt-6 rounded-xl border border-danger/50 bg-danger/10 p-4 outline-none">
          <p className="font-semibold text-fg">Please check the following:</p>
          <ul className="mt-2 space-y-1 text-sm">
            {errorList.map(([k, v]) => (
              <li key={k}>
                <a href={`#f-${k}`} className="text-danger underline underline-offset-2">
                  {LABELS[k] ?? k}: {v}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive technology */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      {step === 1 && (
        <fieldset className="mt-8 space-y-6">
          <legend className="sr-only">About you</legend>
          <h2 className="font-display text-xl font-semibold">About you</h2>

          <div>
            <p id="f-enquiryType-label" className="text-sm font-medium text-fg">
              What would you like to discuss? <span className="text-cyan">*</span>
            </p>
            <div role="radiogroup" aria-labelledby="f-enquiryType-label" id="f-enquiryType" className="mt-3 grid gap-2 sm:grid-cols-3">
              {enquiryTypes.map((o) => (
                <label
                  key={o.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-2.5 rounded-xl border p-3.5 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-cyan",
                    form.enquiryType === o.value ? "border-cyan/60 bg-surface-2 text-fg" : "border-line text-fg-muted hover:border-line-strong",
                  )}
                >
                  <input
                    type="radio"
                    name="enquiryType"
                    value={o.value}
                    checked={form.enquiryType === o.value}
                    onChange={() => set("enquiryType", o.value)}
                    className="mt-0.5 accent-[var(--color-accent)]"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="fullName" label="Full name" required error={errors.fullName}>
              <input id="f-fullName" autoComplete="name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} {...aria("fullName", errors)} className={inputCls(errors.fullName)} />
            </Field>
            <Field id="email" label="Business email" required error={errors.email}>
              <input id="f-email" type="email" autoComplete="email" inputMode="email" value={form.email} onChange={(e) => set("email", e.target.value)} {...aria("email", errors)} className={inputCls(errors.email)} />
            </Field>
            <Field id="company" label="Company name" required={!isCareers} hint={isCareers ? "Optional for career enquiries" : undefined} error={errors.company}>
              <input id="f-company" autoComplete="organization" value={form.company} onChange={(e) => set("company", e.target.value)} {...aria("company", errors, isCareers)} className={inputCls(errors.company)} />
            </Field>
            <Field id="jobTitle" label="Job title" hint="Optional" error={errors.jobTitle}>
              <input id="f-jobTitle" autoComplete="organization-title" value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} {...aria("jobTitle", errors, true)} className={inputCls(errors.jobTitle)} />
            </Field>
            <Field id="region" label="Country or region" required error={errors.region}>
              <select id="f-region" value={form.region} onChange={(e) => set("region", e.target.value)} {...aria("region", errors)} className={inputCls(errors.region)}>
                <option value="">Select…</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            id="message"
            label={isCareers ? "Tell us about yourself" : "Message"}
            required
            hint={
              isCareers
                ? "Your experience, the kind of work you're looking for and your availability."
                : "A short note on why you're getting in touch: a question, what you need help with, or when you'd like us to call you back. Please don't include passwords or confidential data."
            }
            error={errors.message}
          >
            <textarea id="f-message" rows={4} value={form.message} onChange={(e) => set("message", e.target.value)} {...aria("message", errors, true)} className={cn(inputCls(errors.message), "min-h-28 resize-y")} />
            <p className="mt-1 text-right font-mono text-[0.7rem] text-fg-subtle" aria-live="off">
              {form.message.length} / 5000
            </p>
          </Field>

          <div className="flex justify-end pt-2">
            <button type="submit" className={buttonClasses("primary", "px-6")}>
              Continue <ArrowRight aria-hidden className="h-4 w-4" />
            </button>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="mt-8 space-y-6">
          <legend className="sr-only">{isCareers ? "About you and your experience" : "About the project"}</legend>
          <h2 ref={stepHeadingRef} tabIndex={-1} className="font-display text-xl font-semibold outline-none">
            {isCareers ? "Your experience" : "About the project"}
          </h2>

          {!isCareers && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="service" label="Service of interest" required error={errors.service}>
                <select id="f-service" value={form.service} onChange={(e) => set("service", e.target.value)} {...aria("service", errors)} className={inputCls(errors.service)}>
                  <option value="">Select…</option>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="projectType" label="Project type" required error={errors.projectType}>
                <select id="f-projectType" value={form.projectType} onChange={(e) => set("projectType", e.target.value)} {...aria("projectType", errors)} className={inputCls(errors.projectType)}>
                  <option value="">Select…</option>
                  {projectTypes.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="engagementModel" label="Preferred engagement model" required error={errors.engagementModel}>
                <select id="f-engagementModel" value={form.engagementModel} onChange={(e) => set("engagementModel", e.target.value)} {...aria("engagementModel", errors)} className={inputCls(errors.engagementModel)}>
                  <option value="">Select…</option>
                  {engagementModels.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="referral" label="How did you hear about us?" required error={errors.referral}>
                <select id="f-referral" value={form.referral} onChange={(e) => set("referral", e.target.value)} {...aria("referral", errors)} className={inputCls(errors.referral)}>
                  <option value="">Select…</option>
                  {referralSources.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {isCareers && (
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="portfolioUrl" label="CV, portfolio or LinkedIn link" hint="Optional. A https:// link to a document or profile you control." error={errors.portfolioUrl}>
                <input id="f-portfolioUrl" type="url" inputMode="url" placeholder="https://" value={form.portfolioUrl} onChange={(e) => set("portfolioUrl", e.target.value)} {...aria("portfolioUrl", errors, true)} className={inputCls(errors.portfolioUrl)} />
              </Field>
              <Field id="referral" label="How did you hear about us?" required error={errors.referral}>
                <select id="f-referral" value={form.referral} onChange={(e) => set("referral", e.target.value)} {...aria("referral", errors)} className={inputCls(errors.referral)}>
                  <option value="">Select…</option>
                  {referralSources.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          )}

          {!isCareers && (
            <div className="rounded-xl border border-line">
              <button
                type="button"
                aria-expanded={showMore}
                aria-controls="optional-details"
                onClick={() => setShowMore((v) => !v)}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-fg-muted hover:text-fg"
              >
                Add budget and timeline (optional)
                <span aria-hidden className="font-mono text-cyan">{showMore ? "−" : "+"}</span>
              </button>
              <div id="optional-details" hidden={!showMore} className="grid gap-5 border-t border-line p-4 sm:grid-cols-2">
                <Field id="budget" label="Estimated budget range" hint="Optional">
                  <select id="f-budget" value={form.budget} onChange={(e) => set("budget", e.target.value)} className={inputCls()}>
                    {budgetRanges.map((o) => (
                      <option key={o.value || "none"} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field id="timeline" label="Desired timeline" hint="Optional">
                  <select id="f-timeline" value={form.timeline} onChange={(e) => set("timeline", e.target.value)} className={inputCls()}>
                    {timelines.map((o) => (
                      <option key={o.value || "none"} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          )}

          <div id="f-consent">
            <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-fg-muted">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                aria-invalid={errors.consent ? true : undefined}
                aria-describedby={errors.consent ? "f-consent-error" : undefined}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-accent)]"
              />
              <span>
                I have read the{" "}
                <Link href="/privacy" className="text-cyan underline underline-offset-2" target="_blank">
                  privacy policy
                </Link>{" "}
                and agree that Inferra Software may use these details to respond to my enquiry. <span className="text-cyan">*</span>
              </span>
            </label>
            {errors.consent && (
              <p id="f-consent-error" className="mt-1.5 text-sm text-danger">
                {errors.consent}
              </p>
            )}
          </div>

          {status.kind === "error" && (
            <div ref={resultRef} tabIndex={-1} role="alert" className="rounded-xl border border-warning/50 bg-warning/10 p-5 outline-none">
              <div className="flex gap-3">
                <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                <div className="text-sm leading-relaxed text-fg-muted">
                  <p className="font-semibold text-fg">
                    {status.code === "rate_limited"
                      ? "Too many attempts in a short time."
                      : status.code === "delivery_unconfigured"
                        ? "Online enquiries are not available yet."
                        : "We couldn't send your enquiry."}
                  </p>
                  <p className="mt-1">
                    {status.code === "rate_limited"
                      ? "Please wait a few minutes and try again, or contact us directly."
                      : "Your message has not been lost: it is still in this form. Please try again, or reach us directly:"}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href={`tel:${phone.e164}`} className={buttonClasses("secondary", "min-h-9 px-3 py-1.5 text-xs")} data-track="call_click" data-track-label="form_fallback">
                      <Phone aria-hidden className="h-3.5 w-3.5" /> Call {phone.display}
                    </a>
                    {email && (
                      <a
                        href={`mailto:${email}?subject=${encodeURIComponent("Project enquiry")}&body=${encodeURIComponent(form.message)}`}
                        className={buttonClasses("secondary", "min-h-9 px-3 py-1.5 text-xs")}
                      >
                        Email us
                      </a>
                    )}
                    {bookingUrl && (
                      <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary", "min-h-9 px-3 py-1.5 text-xs")}>
                        Book a call
                      </a>
                    )}
                    <button type="button" onClick={copyMessage} className={buttonClasses("secondary", "min-h-9 px-3 py-1.5 text-xs")}>
                      <Copy aria-hidden className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy my message"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
            <button type="button" onClick={() => setStep(1)} className={buttonClasses("ghost", "px-3")} disabled={submitting}>
              <ArrowLeft aria-hidden className="h-4 w-4" /> Back
            </button>
            <button type="submit" className={buttonClasses("primary", "px-7")} disabled={submitting} aria-disabled={submitting}>
              {submitting ? (
                <>
                  <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send enquiry <ArrowRight aria-hidden className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
          <p className="sr-only" role="status" aria-live="polite">
            {submitting ? "Sending your enquiry" : ""}
          </p>
        </fieldset>
      )}
    </form>
  );
}

function aria(key: string, errors: Record<string, string>, hasHint = false) {
  const err = errors[key];
  return {
    name: key,
    "aria-invalid": err ? true : undefined,
    "aria-describedby": [hasHint ? `f-${key}-hint` : null, err ? `f-${key}-error` : null].filter(Boolean).join(" ") || undefined,
  } as const;
}

function inputCls(error?: string) {
  return cn(
    "mt-1.5 block w-full rounded-xl border bg-ink/70 px-3.5 py-2.5 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-colors focus:border-cyan focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-cyan",
    error ? "border-danger" : "border-line-strong hover:border-violet-bright/50",
  );
}

function Field({ id, label, required, hint, error, children }: { id: string; label: string; required?: boolean; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={`f-${id}`} className="text-sm font-medium text-fg">
        {label} {required && <span className="text-cyan">*</span>}
        {required && <span className="sr-only">(required)</span>}
      </label>
      {children}
      {hint && (
        <p id={`f-${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-fg-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`f-${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
