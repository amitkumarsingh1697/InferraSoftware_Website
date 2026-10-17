import { services } from "@/content/services";

/** Option lists for the enquiry form. Shared by client and server validation. */
export const enquiryTypes = [
  { value: "project", label: "A project or engineering need" },
  { value: "partnership", label: "A partnership (agency, consultancy, integrator)" },
  { value: "careers", label: "Careers or talent network" },
] as const;

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const projectTypes = [
  { value: "new-product", label: "New product or application" },
  { value: "existing-product", label: "Extend or improve an existing product" },
  { value: "modernization", label: "Modernize a legacy system" },
  { value: "ai-automation", label: "AI, LLM or automation initiative" },
  { value: "data-cloud", label: "Data, cloud or integration work" },
  { value: "sap", label: "SAP or BASIS support" },
  { value: "review", label: "Architecture or code review" },
  { value: "capacity", label: "Additional engineering capacity" },
  { value: "hiring", label: "Hiring or technical assessment" },
  { value: "other", label: "Something else" },
] as const;

export const budgetRanges = [
  { value: "", label: "Prefer not to say" },
  { value: "under-10k", label: "Under USD 10,000" },
  { value: "10k-25k", label: "USD 10,000 – 25,000" },
  { value: "25k-50k", label: "USD 25,000 – 50,000" },
  { value: "50k-100k", label: "USD 50,000 – 100,000" },
  { value: "100k-plus", label: "Over USD 100,000" },
  { value: "unknown", label: "Not defined yet" },
] as const;

export const timelines = [
  { value: "", label: "Prefer not to say" },
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

export const engagementModels = [
  { value: "project", label: "Fixed-scope project" },
  { value: "dedicated", label: "Dedicated engineering capacity" },
  { value: "white-label", label: "White-label or subcontracting" },
  { value: "advisory", label: "Advisory or assessment" },
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const referralSources = [
  { value: "search", label: "Search engine" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Recommendation or referral" },
  { value: "existing-contact", label: "I know the team" },
  { value: "event", label: "Event or community" },
  { value: "other", label: "Other" },
  { value: "prefer-not", label: "Prefer not to say" },
] as const;

export const regions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Ireland",
  "Germany",
  "France",
  "Netherlands",
  "Nordics",
  "Rest of Europe",
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Other Gulf countries",
  "India",
  "Singapore",
  "Australia / New Zealand",
  "Rest of Asia-Pacific",
  "Africa",
  "Latin America",
  "Other",
] as const;

export function labelFor(list: readonly { value: string; label: string }[], value: string | undefined): string {
  if (!value) return "Not provided";
  return list.find((o) => o.value === value)?.label ?? value;
}
