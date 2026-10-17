import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { messaging } from "@/config/messaging";
import { isIndexingEnabled } from "./security-headers";

/**
 * The production origin comes from one environment variable. Without it, the
 * site still works locally and canonical URLs are omitted.
 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      // fall through to localhost
    }
  }
  return new URL(`http://localhost:${process.env.PORT ?? 3000}`);
}

export function hasConfiguredSiteUrl(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
}

export function absoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}

export { isIndexingEnabled };

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Override for the social image; defaults to the route's opengraph-image. */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
}

export function pageMetadata({ title, description, path, type = "website", publishedTime, modifiedTime, authors, noindex }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: hasConfiguredSiteUrl() ? { canonical: path } : undefined,
    openGraph: {
      type,
      title: `${title} · ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.seo.locale,
      ...(type === "article" ? { publishedTime, modifiedTime, authors } : {}),
    },
    twitter: { card: "summary_large_image", title: `${title} · ${siteConfig.name}`, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export const defaultDescription = siteConfig.seo.defaultDescription;
export const positioning = messaging.positioning;
