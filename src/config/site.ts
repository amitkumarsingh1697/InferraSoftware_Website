/**
 * Company configuration: the single place to edit contact details, links
 * and SEO defaults.
 *
 * Rules:
 * - Leave a value as `null` until it is real. Components hide anything that
 *   is null, so nothing fake is ever published.
 * - The production domain is NOT set here. It comes from the
 *   NEXT_PUBLIC_SITE_URL environment variable (see .env.example) so preview
 *   deployments never claim to be the canonical site.
 */
export const siteConfig = {
  name: "Inferra Software",
  shortName: "Inferra",
  legalName: null as string | null, // e.g. "Inferra Software Private Limited", once registered

  founder: {
    name: "Amit Kumar Singh",
    title: "Founder",
  },

  contact: {
    /** Display format and E.164 format for tel: links. */
    phoneDisplay: "+91 98918 55259",
    phoneE164: "+919891855259",
    /** Business email. Not yet provided, so the email contact method is hidden. */
    email: null as string | null,
    /** Registered or office address. Not provided; intentionally omitted. */
    address: null as string | null,
    /** Calling hours shown next to the phone number, e.g. "Mon–Fri, 10:00–19:00 IST". Hidden while null. */
    availability: null as string | null,
  },

  /**
   * External scheduling page (Calendly, Cal.com, Google Calendar booking page,
   * etc.). Can also be supplied with NEXT_PUBLIC_BOOKING_URL. The booking CTA is
   * hidden until one of them is set.
   */
  bookingUrl: null as string | null,

  social: {
    linkedin: null as string | null, // company LinkedIn page, once created
    github: null as string | null,
    x: null as string | null,
  },

  seo: {
    titleTemplate: "%s · Inferra Software",
    defaultTitle: "Inferra Software · Senior-led software engineering & product development",
    defaultDescription:
      "Inferra Software is a senior-led software engineering studio. We help businesses build, modernize and scale production-ready software, from full-stack platforms and enterprise systems to AI-powered products and intelligent automation.",
    keywords: [
      "software engineering company",
      "software product development",
      "full-stack development",
      "Java development",
      "Python development",
      "microservices",
      "application modernization",
      "LLM engineering",
      "agentic AI",
      "MCP integration",
      "LLM evaluation",
      "BigQuery",
      "Google Cloud",
      "SAP BASIS",
      "software development partner",
      "white-label software development",
    ],
    locale: "en_GB",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function getBookingUrl(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  const url = fromEnv || siteConfig.bookingUrl;
  return url && isSafeExternalUrl(url) ? url : null;
}

/** Only https URLs are allowed for outbound links that come from configuration. */
export function isSafeExternalUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:";
  } catch {
    return false;
  }
}

export function getSocialLinks() {
  return Object.entries(siteConfig.social)
    .filter((entry): entry is [string, string] => typeof entry[1] === "string" && isSafeExternalUrl(entry[1]))
    .map(([network, href]) => ({ network, href }));
}
