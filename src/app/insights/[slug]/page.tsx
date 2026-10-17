import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/section";
import { Tag } from "@/components/ui/badge";
import { CoverArt } from "@/components/art/generative";
import { ArticleCard } from "@/components/insights/article-card";
import { ReadingProgress, TableOfContents } from "@/components/insights/toc";
import { ShareLinks } from "@/components/insights/share-links";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackView } from "@/components/analytics/analytics";
import { articles, getArticle, loaders } from "@/content/insights";
import { getReadingTime, getToc } from "@/lib/insights";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return {
    ...pageMetadata({
      title: a.title,
      description: a.description,
      path: `/insights/${slug}`,
      type: "article",
      publishedTime: a.published,
      modifiedTime: a.updated,
      authors: [a.author],
    }),
    keywords: a.tags,
  };
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getArticle(slug);
  const load = loaders[slug];
  if (!article || !load) notFound();
  const { default: Content } = await load();
  const toc = getToc(slug);
  const minutes = getReadingTime(slug);
  const related = (article.related ?? []).map(getArticle).filter((a) => a !== undefined);
  const url = absoluteUrl(`/insights/${slug}`);

  return (
    <>
      <ReadingProgress />
      <TrackView event="article_read" label={slug} />
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.description,
          path: `/insights/${slug}`,
          published: article.published,
          updated: article.updated,
          author: article.author,
        })}
      />
      <header className="relative isolate overflow-hidden border-b border-line pt-28 sm:pt-36">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-50">
          <CoverArt seed={slug} hue={article.hue} />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/85 to-ink" />
        <Container className="pb-14">
          <Breadcrumbs
            items={[
              { name: "Insights", path: "/insights" },
              { name: article.title, path: `/insights/${slug}` },
            ]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="rounded-full border border-line-strong bg-ink/70 px-2.5 py-1 uppercase tracking-[0.14em] text-fg-muted">{article.kind}</span>
            <span className="text-cyan">{article.topic}</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{article.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-fg-muted sm:text-xl">{article.description}</p>
          <p className="mt-6 font-mono text-xs text-fg-subtle">
            {article.author} · <time dateTime={article.published}>{formatDate(article.published)}</time>
            {article.updated && (
              <>
                {" "}
                · Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time>
              </>
            )}{" "}
            · {minutes} min read
          </p>
        </Container>
      </header>

      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="min-w-0">
            <p className="mb-8 rounded-xl border border-line bg-ink-2/60 p-4 text-sm leading-relaxed text-fg-subtle">
              Educational guide. It describes general engineering practice, not a specific client engagement, and is not a
              substitute for advice on your particular systems.
            </p>
            <div id="article-body" className="prose-inferra max-w-[72ch]">
              <Content />
            </div>
            <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
              {article.tags.map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
            <Link href="/insights" className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-violet-bright hover:text-fg">
              <ArrowLeft aria-hidden className="h-4 w-4" /> All insights
            </Link>
          </div>
          <aside className="order-first space-y-10 lg:order-none lg:sticky lg:top-28 lg:self-start">
            <div className="hidden lg:block">
              <TableOfContents entries={toc} />
            </div>
            <details className="panel p-4 lg:hidden">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.18em] text-fg-muted">On this page</summary>
              <ol className="mt-3 space-y-2">
                {toc.map((e) => (
                  <li key={e.id} className={e.depth === 3 ? "pl-4" : undefined}>
                    <a href={`#${e.id}`} className="text-sm text-fg-muted hover:text-fg">
                      {e.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
            <div className="hidden lg:block">
              <ShareLinks url={url} title={article.title} />
            </div>
          </aside>
        </div>
        <div className="mt-12 lg:hidden">
          <ShareLinks url={url} title={article.title} />
        </div>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-articles" className="border-t border-line py-16 sm:py-20">
          <Container>
            <h2 id="related-articles" className="text-2xl font-semibold sm:text-3xl">
              Related articles
            </h2>
            <ul className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((a) => (
                <li key={a.slug}>
                  <ArticleCard article={a} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
      <FinalCta headline="Working through this in practice?" body="We are happy to discuss how these ideas apply to your systems and constraints." />
    </>
  );
}
