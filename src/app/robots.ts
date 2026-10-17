import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexingEnabled } from "@/lib/seo";

/** Production allows crawling; every other environment blocks it. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled()) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
