import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { CoverArt } from "@/components/art/generative";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container } from "@/components/ui/section";
import { DisclosureBadge, Tag } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { FinalCta } from "@/components/home/final-cta";
import { TrackView } from "@/components/analytics/analytics";
import { caseStudies, getCaseStudy, workStatusDisclosure, workStatusLabel } from "@/content/work";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({ title: `${c.title} (${workStatusLabel[c.status]})`, description: c.summary, path: `/work/${slug}` });
}

function Block({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-10 first:border-t-0 first:pt-0">
      <h2 id={id} className="font-display text-2xl font-semibold">
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => (
        <li key={i} className="flex gap-3 leading-relaxed text-fg-muted">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-cyan" />
          {i}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const disclosure = workStatusDisclosure[c.status];
  const services = c.services.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <TrackView event="case_study_view" label={c.slug} />
      <section className="relative isolate overflow-hidden border-b border-line pt-28 sm:pt-36">
        <div aria-hidden className="absolute inset-0 -z-10 opacity-60">
          <CoverArt seed={c.slug} hue={c.hue} />
        </div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 via-ink/85 to-ink" />
        <Container className="pb-16">
          <Breadcrumbs
            items={[
              { name: "Work", path: "/work" },
              { name: c.title, path: `/work/${c.slug}` },
            ]}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DisclosureBadge>{workStatusLabel[c.status]}</DisclosureBadge>
            <span className="font-mono text-xs text-fg-subtle">{c.projectType}</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{c.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-fg-muted sm:text-xl">{c.summary}</p>
          {disclosure && (
            <div role="note" className="mt-8 flex max-w-3xl gap-3 rounded-xl border border-warning/40 bg-ink/80 p-4 text-sm leading-relaxed text-fg-muted backdrop-blur">
              <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
              <p>{disclosure}</p>
            </div>
          )}
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <article>
            <Block id="challenge" title="Challenge">
              <div className="space-y-4 text-lg leading-relaxed text-fg-muted">
                {c.challenge.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Block>
            <Block id="requirements" title="Requirements">
              <List items={c.requirements} />
            </Block>
            <Block id="constraints" title="Constraints">
              <List items={c.constraints} />
            </Block>
            <Block id="approach" title="Proposed approach">
              <ol className="space-y-4">
                {c.approach.map((a, i) => (
                  <li key={i} className="flex gap-4 leading-relaxed text-fg-muted">
                    <span className="font-mono text-sm text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    {a}
                  </li>
                ))}
              </ol>
            </Block>
            <Block id="architecture" title="Architecture">
              <p className="leading-relaxed text-fg-muted">{c.architecture.summary}</p>
              <ol className="mt-6 space-y-3">
                {c.architecture.components.map((comp, i) => (
                  <li key={comp.title} className="panel flex gap-4 p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line-strong font-mono text-xs text-cyan">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-fg">{comp.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-fg-muted">{comp.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
            <Block id="implementation" title="Implementation details">
              <div className="grid gap-4 sm:grid-cols-2">
                {c.implementation.map((it) => (
                  <div key={it.title} className="rounded-xl border border-line p-5">
                    <h3 className="font-semibold text-fg">{it.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{it.description}</p>
                  </div>
                ))}
              </div>
            </Block>
            <Block id="validation" title="Testing & validation">
              <List items={c.validation} />
            </Block>
            <Block id="outcomes" title={c.status === "client" ? "Outcomes" : `Outcomes (${c.outcomes.label.toLowerCase()})`}>
              {c.status !== "client" && (
                <p className="mb-4 text-sm text-fg-subtle">These are the outcomes the design aims for, not measured results from a deployment.</p>
              )}
              <List items={c.outcomes.items} />
            </Block>
            <Block id="lessons" title="Lessons & principles">
              <List items={c.lessons} />
            </Block>
          </article>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="panel p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Context</h2>
              <p className="mt-2 text-sm text-fg">{c.context}</p>
              <h2 className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Technology stack</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.stack.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
              <h2 className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Capabilities</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {c.capabilities.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div className="panel p-6">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Relevant services</h2>
              <ul className="mt-4 space-y-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group flex items-center gap-3 text-sm text-fg-muted hover:text-fg">
                      <Icon name={s.icon} className="h-4 w-4 text-violet-bright" />
                      <span className="flex-1">{s.shortTitle}</span>
                      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 text-fg-subtle group-hover:text-cyan" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>

      <FinalCta headline="Discuss a similar challenge" body="Tell us where your situation differs. Real projects rarely match a reference design exactly, and that is where the useful conversation starts." />
    </>
  );
}
