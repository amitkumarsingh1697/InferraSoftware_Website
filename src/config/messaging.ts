/**
 * Brand messaging hierarchy. Edit copy here rather than inside components.
 * See docs/BRAND.md for the reasoning behind each line.
 */
export const messaging = {
  /** Primary brand promise (the slogan). */
  slogan: "Complex ideas. Engineered into reality.",

  /** Short positioning used in metadata, footer and social cards. */
  positioning:
    "Inferra Software is a senior-led software engineering studio that helps businesses design, build, modernize and scale production-ready software across stacks and domains.",

  /** Supporting line under the slogan in brand placements. */
  supportingHeadline: "Senior-led engineering for products, platforms and intelligent systems.",

  hero: {
    eyebrow: "Independent software engineering & product development",
    headline: ["Complex Ideas.", "Engineered Into Reality."] as const,
    body: "Inferra Software helps ambitious businesses build, modernize, and scale production-ready software, from full-stack platforms and enterprise systems to AI-powered products and intelligent automation.",
    primaryCta: { label: "Discuss Your Project", href: "/contact" },
    secondaryCta: { label: "Explore Our Capabilities", href: "/services" },
  },

  credibility: {
    eyebrow: "Why teams talk to us",
    headline: "Senior Engineering. Practical Architecture. Production-Ready Delivery.",
  },

  finalCta: {
    headline: "Have a Complex Engineering Challenge?",
    body: "Tell us what you're building, modernizing, or trying to solve. Let's explore the right approach together.",
    primary: { label: "Start a Conversation", href: "/contact" },
    secondary: { label: "Explore Our Services", href: "/services" },
  },

  ctas: {
    discuss: "Discuss a Project",
    call: "Call us",
    book: "Book a call",
    partnership: "Explore a partnership",
  },
} as const;
