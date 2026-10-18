import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/section";
import { ArticleRow, FeaturedArticle } from "@/components/insights/article-card";
import { FilterableGrid } from "@/components/work/work-filter";
import { FinalCta } from "@/components/home/final-cta";
import { articleTopics, sortedArticles } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights: Practical Engineering Guides",
  description:
    "Practical guides from Inferra Software on legacy Java modernization, integrating LLMs into products, safer agentic workflows, reliable BigQuery pipelines and production readiness.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = sortedArticles();
  const topics = articleTopics.filter((t) => articles.some((a) => a.topic === t));
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Insights"
        title={
          <>
            Practical guides from <span className="text-gradient">engineers who ship</span>
          </>
        }
        intro="Educational articles on the problems we help solve. They are written to be useful on their own, whether or not you ever work with us."
      />
      <Container className="py-16 sm:py-20">
        {articles[0] && <FeaturedArticle article={articles[0]} />}
        <h2 className="mt-16 font-display text-2xl font-semibold sm:mt-20">All articles</h2>
        <div className="mt-6">
          <FilterableGrid
            label="Filter by topic"
            allLabel="All topics"
            filters={topics}
            emptyMessage="No articles in this topic yet. Check back soon, or ask us a question directly."
            layout="list"
            items={articles.map((a) => ({ key: a.slug, tags: [a.topic], node: <ArticleRow article={a} /> }))}
          />
        </div>
      </Container>
      <FinalCta headline="Have a question we haven't covered?" body="If you are weighing a technical decision, we are happy to share a view, even if it is just a short conversation." />
    </>
  );
}
