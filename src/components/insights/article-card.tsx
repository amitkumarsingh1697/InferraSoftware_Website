import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

/** Large horizontal card for the newest article at the top of the Insights page. */
export function FeaturedArticle({ article }: { article: ArticleMeta }) {
  const minutes = getReadingTime(article.slug);
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group panel grid overflow-hidden transition-[border-color] duration-300 hover:border-line-strong md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line md:aspect-auto md:min-h-80 md:border-b-0 md:border-r">
        <CoverArt seed={article.slug} hue={article.hue} className="transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">
          Latest {article.kind} · <span className="text-cyan">{article.topic}</span>
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight group-hover:text-cyan sm:text-3xl">{article.title}</h2>
        <p className="mt-4 leading-relaxed text-fg-muted">{article.description}</p>
        <p className="mt-6 flex items-center gap-2 text-sm font-medium text-fg">
          Read the {article.kind} <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </p>
        <p className="mt-4 font-mono text-xs text-fg-subtle">
          <time dateTime={article.published}>{formatDate(article.published)}</time> · {minutes} min read
        </p>
      </div>
    </Link>
  );
}

/** Compact row used in the Insights article list. */
export function ArticleRow({ article }: { article: ArticleMeta }) {
  const minutes = getReadingTime(article.slug);
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group grid gap-3 py-7 sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:items-start sm:gap-8"
    >
      <div className="font-mono text-xs text-fg-subtle">
        <p className="uppercase tracking-[0.14em] text-cyan">{article.topic}</p>
        <p className="mt-1.5">
          <time dateTime={article.published}>{formatDate(article.published)}</time>
        </p>
        <p className="mt-1">
          {article.kind} · {minutes} min
        </p>
      </div>
      <div>
        <h3 className="text-lg font-semibold leading-snug group-hover:text-cyan sm:text-xl">{article.title}</h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-muted">{article.description}</p>
      </div>
      <ArrowRight aria-hidden className="hidden h-5 w-5 text-fg-subtle transition-[color,transform] group-hover:translate-x-1 group-hover:text-cyan sm:mt-1 sm:block" />
    </Link>
  );
}
