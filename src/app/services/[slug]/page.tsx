import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Tag } from "@/components/ui/badge";
import { PillarArt } from "@/components/art/pillar-art";
import { FinalCta } from "@/components/home/final-cta";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackView } from "@/components/analytics/analytics";
import { getService, pillars, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.metaDescription, path: `/services/${slug}` });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const pillar = pillars[service.pillar];
  const related = service.related.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <TrackView event="service_view" label={service.slug} />
      <JsonLd data={serviceSchema({ name: service.title, description: service.metaDescription, path: `/services/${slug}` })} />
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.shortTitle, path: `/services/${slug}` },
        ]}
        eyebrow={`${pillar.code} · ${service.hero.eyebrow}`}
        title={service.hero.headline}
        intro={service.hero.intro}
        art={
          <div className="panel brackets p-5">
            <PillarArt pillar={service.pillar} />
            <p className="mt-3 border-t border-line pt-3 font-mono text-[0.68rem] tracking-[0.18em] text-fg-subtle">
              {service.title.toUpperCase()}
            </p>
          </div>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/contact?service=${service.slug}`} arrow track="cta_click">
            Discuss your project
          </ButtonLink>
          <ButtonLink href="#capabilities" variant="secondary">
            See capabilities
          </ButtonLink>
        </div>
      </PageHero>

      {/* What it solves + challenges */}
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="solves">
            <SectionHeading id="solves" eyebrow="What this solves" title="The problem behind the request" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-fg-muted">
              {service.solves.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
          <section aria-labelledby="challenges" className="panel p-7 sm:p-9">
            <h2 id="challenges" className="font-display text-xl font-semibold">
              Common challenges we hear
            </h2>
            <ul className="mt-6 space-y-4">
              {service.challenges.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-cyan" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>

      {/* Capabilities */}
      <section id="capabilities" aria-labelledby="cap-title" className="border-y border-line bg-ink-2/60 py-20 sm:py-24">
        <Container>
          <SectionHeading id="cap-title" eyebrow="Capabilities & scope" title="What we can take on" />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {service.capabilities.map((c, i) => (
              <li key={c.title} className="bg-ink-2 p-7">
                <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{c.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Technical approaches */}
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="How we work" title="Technical approach" intro="The engineering principles we apply to this kind of work." />
            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Typical technologies</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {service.technologies.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-fg-subtle">
                Choices depend on your existing systems, team and constraints. We will recommend what fits rather than default to a fixed stack.
              </p>
            </div>
          </div>
          <ol className="space-y-5">
            {service.approaches.map((a) => (
              <li key={a.title} className="panel flex gap-5 p-6">
                <Check aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-cyan" />
                <div>
                  <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-fg-muted">{a.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      {/* Use cases */}
      <section aria-labelledby="use-title" className="border-y border-line bg-ink-2/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="use-title"
            eyebrow="Illustrative use cases"
            title="Where this service typically helps"
            intro="Examples of the problems this service addresses. They illustrate common scenarios; they are not descriptions of past client work."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {service.useCases.map((u) => (
              <li key={u.title} className="panel p-7">
                <h3 className="font-display text-lg font-semibold">{u.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{u.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Engagement + quality */}
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="engage-title">
            <SectionHeading id="engage-title" eyebrow="Engagement" title="How we can work together" />
            <ul className="mt-8 space-y-4">
              {service.engagement.map((e) => (
                <li key={e.title} className="border-l-2 border-accent pl-5">
                  <h3 className="font-semibold text-fg">{e.title}</h3>
                  <p className="mt-1 leading-relaxed text-fg-muted">{e.description}</p>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="quality-title">
            <SectionHeading id="quality-title" eyebrow="Quality" title="Security, reliability & maintainability" />
            <ul className="mt-8 grid gap-4">
              {service.quality.map((q) => (
                <li key={q.title} className="panel p-5">
                  <h3 className="font-semibold text-fg">{q.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{q.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {service.candidNote && (
          <aside aria-labelledby="candid-title" className="mt-16 rounded-[var(--radius-panel)] border border-cyan/30 bg-cyan/[0.04] p-7 sm:p-9">
            <div className="flex items-start gap-4">
              <Info aria-hidden className="mt-1 h-5 w-5 shrink-0 text-cyan" />
              <div>
                <h2 id="candid-title" className="font-display text-xl font-semibold">
                  {service.candidNote.title}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed text-fg-muted">
                  {service.candidNote.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </Container>

      {/* Related */}
      <section aria-labelledby="related-title" className="border-t border-line py-20">
        <Container>
          <h2 id="related-title" className="text-2xl font-semibold sm:text-3xl">
            Related services
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}`} className="group panel flex h-full flex-col p-6 transition-colors hover:border-line-strong">
                  <Icon name={r.icon} className="h-5 w-5 text-violet-bright" />
                  <span className="mt-4 flex items-start justify-between gap-3 font-display text-lg font-semibold group-hover:text-cyan">
                    {r.shortTitle}
                    <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-fg-subtle group-hover:text-cyan" />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-fg-muted">{r.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta
        headline={`Let's talk about ${service.shortTitle}`}
        body="Share what you are working on. We will respond with questions, an honest view of fit and suggested next steps."
        primary={{ label: "Start a Conversation", href: `/contact?service=${service.slug}` }}
      />
    </>
  );
}
