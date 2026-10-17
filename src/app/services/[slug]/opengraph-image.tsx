import { renderOgImage, ogContentType, ogSize } from "@/lib/og";
import { getService, services } from "@/content/services";

export const alt = "Inferra Software service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  return renderOgImage({ eyebrow: "Service", title: s?.title ?? "Inferra Software", subtitle: s?.summary });
}
