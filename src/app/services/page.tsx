import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { PillarArt } from "@/components/art/pillar-art";
import { FinalCta } from "@/components/home/final-cta";
import { engagementModels } from "@/content/approach";
import { getServicesByPillar, pillarOrder, pillars } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Software Engineering Services",
  description:
    "Explore Inferra Software's services: full-stack and backend engineering, product development, modernization, AI and LLM engineering, agentic automation, LLM evaluation, cloud and data, SAP and BASIS, architecture advisory and engineering hiring.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Services"
        title={
          <>
            Engineering capability, <span className="text-gradient">assembled around your problem</span>
          </>
        }
        intro="We are not a single-technology shop. Our services span five capability areas, and most engagements draw on more than one. Start with the area closest to your challenge, or simply tell us the problem and we will help you scope it."
      />

      <Container className="py-20 sm:py-24">
        <div className="space-y-20">
          {pillarOrder.map((pillar, idx) => {
            const p = pillars[pillar];
            const items = getServicesByPillar(pillar);
            return (
              <section key={pillar} aria-labelledby={`pillar-${pillar}`} className="reveal grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
                <div className={idx % 2 ? "lg:order-2" : undefined}>
                  <p className="font-mono text-xs tracking-[0.2em] text-cyan">{p.code}</p>
                  <h2 id={`pillar-${pillar}`} className="mt-3 text-3xl font-semibold sm:text-4xl">
                    {p.label}
                  </h2>
                  <p className="mt-2 text-lg text-violet-bright">{p.tagline}</p>
                  <p className="mt-4 leading-relaxed text-fg-muted">{p.description}</p>
                  <div className="panel mt-8 hidden p-4 lg:block">
                    <PillarArt pillar={pillar} />
                  </div>
                </div>
                <ul className="grid content-start gap-5">
                  {items.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group panel flex gap-5 p-6 transition-colors hover:border-line-strong sm:p-7">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-ink/60">
                          <Icon name={s.icon} className="h-5 w-5 text-violet-bright" />
                        </span>
                        <span className="flex-1">
                          <span className="flex items-start justify-between gap-4">
                            <span className="font-display text-xl font-semibold group-hover:text-cyan">{s.title}</span>
                            <ArrowUpRight aria-hidden className="mt-1 h-5 w-5 shrink-0 text-fg-subtle group-hover:text-cyan" />
                          </span>
                          <span className="mt-2 block leading-relaxed text-fg-muted">{s.summary}</span>
                          <span className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-fg-subtle">
                            {s.capabilities.slice(0, 4).map((c) => (
                              <span key={c.title}>· {c.title}</span>
                            ))}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Container>

      <section aria-labelledby="models-title" className="border-y border-line bg-ink-2/60 py-20">
        <Container>
          <h2 id="models-title" className="text-3xl font-semibold sm:text-4xl">
            Flexible ways to engage
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-fg-muted">
            Choose the model that fits your situation. We can start small and adjust as the work and the relationship evolve.
          </p>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {engagementModels.map((m) => (
              <li key={m.title} className="panel p-6">
                <h3 className="font-display text-lg font-semibold">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{m.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta headline="Not sure which service fits?" body="Describe the problem in your own words. We will help you work out the right approach, even if it spans several of these areas." />
    </>
  );
}
