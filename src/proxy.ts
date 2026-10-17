import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/content/services";
import { industries } from "@/content/industries";
import { caseStudies } from "@/content/work";
import { articles } from "@/content/insights/meta";

/**
 * Detail pages are prerendered and streamed, so a `notFound()` for an unknown
 * slug would arrive after a 200 status had already been sent. Checking slugs
 * here, before rendering, gives search engines and monitors a real 404.
 */
const known: Record<string, Set<string>> = {
  services: new Set(services.map((s) => s.slug)),
  industries: new Set(industries.map((i) => i.slug)),
  work: new Set(caseStudies.map((c) => c.slug)),
  insights: new Set(articles.map((a) => a.slug)),
};

export function proxy(req: NextRequest) {
  const [, section, slug] = req.nextUrl.pathname.split("/");
  const slugs = known[section];
  if (!slugs || !slug) return NextResponse.next();
  // opengraph-image and other nested files under a known slug pass through.
  if (slugs.has(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/_not-found", req.url), { status: 404 });
}

export const config = {
  matcher: ["/services/:slug/:path*", "/industries/:slug/:path*", "/work/:slug/:path*", "/insights/:slug/:path*"],
};
