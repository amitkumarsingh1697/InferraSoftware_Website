import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { ArticleCard } from "@/components/insights/article-card";
import { sortedArticles } from "@/content/insights";

export function InsightsTeaser() {
  const latest = sortedArticles().slice(0, 3);
  return (
    <section aria-labelledby="insights-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading id="insights-title" eyebrow="Insights" title="Practical engineering guides" intro="How we think about modernization, AI reliability, data and production readiness." />
          <Link href="/insights" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-violet-bright hover:text-fg">
            All insights <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {latest.map((a) => (
            <li key={a.slug} className="reveal">
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
