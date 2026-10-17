import { pillarOrder, pillars, services } from "@/content/services";

export interface NavLink {
  label: string;
  href: string;
}

export const primaryNav: (NavLink & { menu?: "services"; desktop?: "always" | "xl" })[] = [
  { label: "Home", href: "/", desktop: "xl" },
  { label: "Services", href: "/services", menu: "services", desktop: "always" },
  { label: "Industries", href: "/industries", desktop: "always" },
  { label: "Technology", href: "/technology", desktop: "always" },
  { label: "Work", href: "/work", desktop: "always" },
  { label: "Insights", href: "/insights", desktop: "always" },
  { label: "About", href: "/about", desktop: "always" },
  { label: "Contact", href: "/contact", desktop: "xl" },
];

export const servicesMenu = pillarOrder.map((pillar) => ({
  pillar,
  label: pillars[pillar].label,
  code: pillars[pillar].code,
  tagline: pillars[pillar].tagline,
  items: services
    .filter((s) => s.pillar === pillar)
    .map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}`, summary: s.summary })),
}));

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: services.map((s) => ({ label: s.shortTitle, href: `/services/${s.slug}` })),
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "All services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Technology", href: "/technology" },
      { label: "Partnerships", href: "/contact?type=partnership" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
