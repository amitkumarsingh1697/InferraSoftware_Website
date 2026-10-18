import { z } from "zod";
import { budgetRanges, engagementModels, enquiryTypes, projectTypes, referralSources, regions, serviceOptions, timelines } from "./options";

// Zod probes for eval support to speed up parsing; the CSP forbids eval, so
// opt out of that probe to avoid console CSP violations in the browser.
z.config({ jitless: true });

const values = <T extends readonly { value: string }[]>(list: T) => list.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

/** Collapse whitespace and strip control characters (keeps newlines in long text). */
const singleLine = (max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u001F\u007F]+/g, " ").replace(/\s+/g, " ").trim())
    .pipe(z.string().max(max, `Please keep this under ${max} characters.`));

const multiLine = (min: number, max: number) =>
  z
    .string()
    .transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").replace(/\r\n?/g, "\n").trim())
    .pipe(
      z
        .string()
        .min(min, `Please share at least ${min} characters so we know how to help.`)
        .max(max, `Please keep this under ${max} characters.`),
    );

const optionalUrl = z
  .string()
  .trim()
  .max(300)
  .refine((v) => v === "" || /^https:\/\/[^\s<>"']+$/i.test(v), "Please enter a full https:// link.")
  .optional()
  .default("");

export const enquirySchema = z
  .object({
    enquiryType: z.enum(values(enquiryTypes)).default("project"),
    fullName: singleLine(120).pipe(z.string().min(2, "Please enter your full name.")),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(200)
      .pipe(z.email("Please enter a valid email address.")),
    company: singleLine(160).optional().default(""),
    jobTitle: singleLine(120).optional().default(""),
    region: z.enum(regions, { message: "Please choose your country or region." }),
    service: z.enum(values(serviceOptions), { message: "Please choose the service you're interested in." }),
    projectType: z.enum(values(projectTypes), { message: "Please choose a project type." }),
    message: multiLine(10, 5000),
    budget: z.enum(values(budgetRanges)).optional().default(""),
    timeline: z.enum(values(timelines)).optional().default(""),
    engagementModel: z.enum(values(engagementModels), { message: "Please choose an engagement model." }),
    referral: z.enum(values(referralSources), { message: "Please tell us how you heard about us." }),
    portfolioUrl: optionalUrl,
    consent: z.literal(true, { message: "Please confirm you have read the privacy policy." }),
    attribution: z
      .object({
        utm_source: z.string().max(120).optional(),
        utm_medium: z.string().max(120).optional(),
        utm_campaign: z.string().max(120).optional(),
        utm_term: z.string().max(120).optional(),
        utm_content: z.string().max(120).optional(),
        referrer: z.string().max(120).optional(),
        landing: z.string().max(120).optional(),
      })
      .optional(),
    // Anti-spam fields (validated on the server only).
    website: z.string().max(200).optional().default(""),
    startedAt: z.number().int().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.enquiryType !== "careers" && data.company.length < 2) {
      ctx.addIssue({ code: "custom", path: ["company"], message: "Please enter your company name." });
    }
  });

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;

/** Fields shown in step one of the form; used for per-step validation. */
export const stepOneFields = ["enquiryType", "fullName", "email", "company", "jobTitle", "region", "message"] as const;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
