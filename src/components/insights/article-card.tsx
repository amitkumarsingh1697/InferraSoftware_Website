import Link from "next/link";
import { CoverArt } from "@/components/art/generative";
import { formatDate } from "@/lib/utils";
import { getReadingTime } from "@/lib/insights";
import type { ArticleMeta } from "@/content/types";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const minutes = getReadingTime(article.slug);
  return (
    <Link href={`/insights/${article.slug}`} className="group panel flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong">
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
        <CoverArt seed={article.slug} hue={article.hue} className="transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full border border-line-strong bg-ink/80 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-fg-muted backdrop-blur">
          {article.kind}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-cyan">{article.topic}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-cyan">{article.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{article.description}</p>
        <p className="mt-5 font-mono text-xs text-fg-subtle">
          <time dateTime={article.published}>{formatDate(article.published)}</time> · {minutes} min read
        </p>
      </div>
    </Link>
  );
}
