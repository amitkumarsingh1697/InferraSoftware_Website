import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/work";
import { articles } from "@/content/insights";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/about", "/services", "/industries", "/technology", "/work", "/insights", "/careers", "/contact", "/privacy", "/terms"];
  return [
    ...staticRoutes.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: absoluteUrl(`/services/${s.slug}`), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...industries.map((i) => ({ url: absoluteUrl(`/industries/${i.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...caseStudies.map((c) => ({ url: absoluteUrl(`/work/${c.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...articles.map((a) => ({ url: absoluteUrl(`/insights/${a.slug}`), lastModified: a.updated ?? a.published, priority: 0.6 })),
  ];
}
