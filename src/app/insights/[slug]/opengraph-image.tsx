import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { articles, getArticle } from "@/content/insights";

export const alt = "Inferra Software insight";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  return renderOgImage({ eyebrow: a ? `${a.kind} · ${a.topic}` : "Insights", title: a?.title ?? "Inferra Software" });
}
