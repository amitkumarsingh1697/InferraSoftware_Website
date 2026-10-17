import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Database, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { DisclosureBadge } from "@/components/ui/badge";
import { FinalCta } from "@/components/home/final-cta";
import { getIndustry, industries } from "@/content/industries";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) return {};
  return pageMetadata({ title: `${ind.name} Software Engineering`, description: ind.metaDescription, path: `/industries/${slug}` });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const ind = getIndustry(slug);
  if (!ind) notFound();
  const related = ind.capabilities.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: ind.name, path: `/industries/${slug}` },
        ]}
        eyebrow="Industry"
        title={ind.name}
        intro={ind.intro}
        art={
          <div className="panel brackets flex aspect-[4/3] items-center justify-center p-8">
            <div className="relative flex h-40 w-40 items-center justify-center">
              <div aria-hidden className="absolute inset-0 rounded-full bg-accent/25 blur-2xl" />
              <div aria-hidden className="absolute inset-0 rotate-45 rounded-3xl border border-line-strong" />
              <div aria-hidden className="absolute inset-6 rotate-45 rounded-2xl border border-cyan/40" />
              <Icon name={ind.icon} className="relative h-12 w-12 text-cyan" strokeWidth={1.4} />
            </div>
          </div>
        }
      >
        <p className="mt-6 text-sm text-fg-subtle">
          This page describes general engineering expertise and illustrative use cases. It does not imply existing clients in this sector.
        </p>
      </PageHero>

      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="ch-title">
            <SectionHeading id="ch-title" eyebrow="Challenges" title="Common technology challenges" />
            <ul className="mt-8 space-y-5">
              {ind.challenges.map((c) => (
                <li key={c.title} className="border-l-2 border-line-strong pl-5">
                  <h3 className="font-semibold text-fg">{c.title}</h3>
                  <p className="mt-1 leading-relaxed text-fg-muted">{c.description}</p>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="sol-title">
            <SectionHeading id="sol-title" eyebrow="Solutions" title="Potential software solutions" />
            <ul className="mt-8 grid gap-4">
              {ind.solutions.map((s) => (
                <li key={s.title} className="panel p-5">
                  <h3 className="font-semibold text-fg">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">{s.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>

      <section aria-labelledby="uc-title" className="border-y border-line bg-ink-2/60 py-20 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-center gap-4">
            <SectionHeading id="uc-title" eyebrow="Use cases" title="Illustrative scenarios" />
          </div>
          <DisclosureBadge className="mt-6">Illustrative · not client work</DisclosureBadge>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {ind.useCases.map((u) => (
              <li key={u.title} className="panel p-7">
                <h3 className="font-display text-lg font-semibold">{u.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{u.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Container className="py-20 sm:py-24">
        <div className="grid gap-6 md:grid-cols-2">
          <section aria-labelledby="data-title" className="panel p-7 sm:p-9">
            <Database aria-hidden className="h-6 w-6 text-cyan" />
            <h2 id="data-title" className="mt-4 font-display text-xl font-semibold">
              Integration & data considerations
            </h2>
            <ul className="mt-5 space-y-3">
              {ind.dataConsiderations.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-violet-bright" />
                  {d}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="sec-title" className="panel p-7 sm:p-9">
            <ShieldCheck aria-hidden className="h-6 w-6 text-cyan" />
            <h2 id="sec-title" className="mt-4 font-display text-xl font-semibold">
              Security & reliability considerations
            </h2>
            <ul className="mt-5 space-y-3">
              {ind.securityConsiderations.map((d) => (
                <li key={d} className="flex gap-3 leading-relaxed text-fg-muted">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-violet-bright" />
                  {d}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section aria-labelledby="rel-title" className="mt-20">
          <h2 id="rel-title" className="text-2xl font-semibold sm:text-3xl">
            Relevant engineering capabilities
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/services/${r.slug}`} className="group panel flex h-full items-start gap-4 p-5 transition-colors hover:border-line-strong">
                  <Icon name={r.icon} className="mt-0.5 h-5 w-5 shrink-0 text-violet-bright" />
                  <span className="flex-1">
                    <span className="block font-semibold group-hover:text-cyan">{r.shortTitle}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{r.summary}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="h-4 w-4 shrink-0 text-fg-subtle" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <FinalCta
        headline="Discuss a specific problem"
        body={`Working on a ${ind.name.toLowerCase()} challenge? Tell us about it, and we will tell you honestly whether and how we can help.`}
        primary={{ label: "Start a Conversation", href: `/contact?industry=${ind.slug}` }}
      />
    </>
  );
}
