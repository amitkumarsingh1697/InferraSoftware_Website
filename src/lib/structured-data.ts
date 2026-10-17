import { siteConfig, getSocialLinks } from "@/config/site";
import { messaging } from "@/config/messaging";
import { absoluteUrl } from "./seo";

export function organizationSchema() {
  const sameAs = getSocialLinks().map((s) => s.href);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/inferra-app-icon.png"),
    description: messaging.positioning,
    slogan: messaging.slogan,
    founder: { "@type": "Person", name: siteConfig.founder.name },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.contact.phoneE164,
        contactType: "sales",
        availableLanguage: ["English"],
        ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
      },
    ],
    ...(siteConfig.legalName ? { legalName: siteConfig.legalName } : {}),
    ...(siteConfig.contact.address ? { address: siteConfig.contact.address } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: absoluteUrl("/"),
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Worldwide",
  };
}

export function articleSchema(input: { title: string; description: string; path: string; published: string; updated?: string; author: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    mainEntityOfPage: absoluteUrl(input.path),
    datePublished: input.published,
    dateModified: input.updated ?? input.published,
    author: { "@type": "Organization", name: input.author, url: absoluteUrl("/") },
    publisher: { "@id": absoluteUrl("/#organization") },
    image: absoluteUrl(`${input.path}/opengraph-image`),
  };
}
