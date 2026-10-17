import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { caseStudies, getCaseStudy, workStatusLabel } from "@/content/work";

export const alt = "Inferra Software engineering demonstrator";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  return renderOgImage({ eyebrow: c ? workStatusLabel[c.status] : "Work", title: c?.title ?? "Inferra Software" });
}
