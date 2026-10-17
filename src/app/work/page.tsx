import Link from "next/link";
import { CoverArt } from "@/components/art/generative";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/section";
import { DisclosureBadge, Tag } from "@/components/ui/badge";
import { FilterableGrid } from "@/components/work/work-filter";
import { FinalCta } from "@/components/home/final-cta";
import { caseStudies, workStatusLabel } from "@/content/work";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Work & Engineering Demonstrators",
  description:
    "Engineering demonstrators from Inferra Software: reference designs for an AI knowledge assistant, modular SaaS architecture, legacy Java modernization, BigQuery data pipelines and agentic workflows with approval controls.",
  path: "/work",
});

export default function WorkPage() {
  const filters = Array.from(new Set(caseStudies.flatMap((c) => c.services.map((s) => getService(s)?.shortTitle ?? s))));
  const items = caseStudies.map((c) => ({
    key: c.slug,
    tags: c.services.map((s) => getService(s)?.shortTitle ?? s),
    node: (
      <Link href={`/work/${c.slug}`} className="group panel flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong">
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
          <CoverArt seed={c.slug} hue={c.hue} className="transition-transform duration-700 group-hover:scale-105" />
          <DisclosureBadge className="absolute left-3 top-3 bg-ink/80 backdrop-blur">{workStatusLabel[c.status]}</DisclosureBadge>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-xs text-fg-subtle">{c.projectType}</p>
          <h2 className="mt-2 text-lg font-semibold leading-snug group-hover:text-cyan">{c.title}</h2>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{c.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {c.stack.slice(0, 4).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>
      </Link>
    ),
  }));

  return (
    <>
      <PageHero
        crumbs={[{ name: "Work", path: "/work" }]}
        eyebrow="Work"
        title={
          <>
            How we think, <span className="text-gradient">shown in detail</span>
          </>
        }
        intro="Inferra Software is a new company, so instead of borrowing credibility we show our engineering thinking. Each entry below is an engineering demonstrator: a reference design for a common problem, explaining requirements, architecture, implementation and validation. None of them is presented as client work."
      >
        <p className="mt-6 max-w-2xl rounded-xl border border-warning/30 bg-warning/5 p-4 text-sm leading-relaxed text-fg-muted">
          <strong className="text-warning">About these projects:</strong> demonstrators are labelled clearly. When we publish
          client case studies, they will only include details and results the client has approved.
        </p>
      </PageHero>
      <Container className="py-16 sm:py-20">
        <FilterableGrid label="Filter by service" filters={filters} items={items} emptyMessage="No projects match this filter yet." />
      </Container>
      <FinalCta headline="Facing a similar challenge?" body="If one of these problems sounds familiar, let's talk about how the approach would apply to your systems and constraints." />
    </>
  );
}
