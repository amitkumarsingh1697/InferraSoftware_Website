import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CoverArt } from "@/components/art/generative";
import { Container, SectionHeading } from "@/components/ui/section";
import { DisclosureBadge, Tag } from "@/components/ui/badge";
import { caseStudies, workStatusLabel } from "@/content/work";

export function SelectedWork() {
  const featured = caseStudies.slice(0, 3);
  return (
    <section aria-labelledby="work-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="work-title"
            eyebrow="Selected work"
            title="Engineering demonstrators"
            intro="As a new company, we show how we think rather than borrow credibility. These reference designs explain our approach to common problems. They are not client engagements."
          />
          <Link href="/work" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-violet-bright hover:text-fg">
            View all work <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {featured.map((c) => (
            <li key={c.slug} className="reveal">
              <Link href={`/work/${c.slug}`} className="group panel flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                  <CoverArt seed={c.slug} hue={c.hue} className="transition-transform duration-700 group-hover:scale-105" />
                  <DisclosureBadge className="absolute left-3 top-3 bg-ink/80 backdrop-blur">{workStatusLabel[c.status]}</DisclosureBadge>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs text-fg-subtle">{c.projectType}</p>
                  <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-cyan">{c.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{c.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.capabilities.slice(0, 3).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
