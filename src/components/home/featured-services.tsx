import Link from "next/link";
import { ArrowRight, ArrowUpRight, Handshake } from "lucide-react";
import { PillarArt } from "@/components/art/pillar-art";
import { Container, SectionHeading } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { ButtonLink } from "@/components/ui/button";
import { getService, services } from "@/content/services";

function svc(slug: string) {
  const s = getService(slug);
  if (!s) throw new Error(`Unknown service: ${slug}`);
  return s;
}

export function FeaturedServices() {
  const ai = svc("ai-llm-engineering");
  const agents = svc("agentic-ai-automation");
  const evals = svc("llm-evaluation");
  const product = svc("software-product-development");
  const modern = svc("application-modernization");
  const compact = ["full-stack-development", "cloud-data-engineering", "sap-basis", "architecture-advisory", "engineering-hiring"].map(svc);

  return (
    <section aria-labelledby="featured-title" className="relative py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="featured-title"
          eyebrow="Featured capabilities"
          title={
            <>
              Where we make the <span className="text-gradient">biggest difference</span>
            </>
          }
          intro="From a first product release to AI that acts on real systems, these are the engagements we are built for."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {/* Intelligence: editorial feature panel */}
          <article className="panel reveal relative overflow-hidden lg:col-span-6 lg:grid lg:grid-cols-[1.1fr_1fr]">
            <div className="relative z-10 p-7 sm:p-10">
              <p className="font-mono text-xs tracking-[0.2em] text-cyan">SYS·03 · INTELLIGENCE</p>
              <h3 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">
                AI that is engineered, evaluated and kept under control.
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed text-fg-muted">
                We build LLM features, agentic workflows and MCP integrations for real products and operations, with
                evaluation, guardrails and human oversight designed in. And when conventional software would serve you
                better, we will say so.
              </p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-3">
                {[ai, agents, evals].map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="group flex h-full flex-col rounded-xl border border-line bg-ink/50 p-4 transition-colors hover:border-cyan/50">
                      <Icon name={s.icon} className="h-5 w-5 text-violet-bright" />
                      <span className="mt-3 text-sm font-semibold text-fg group-hover:text-cyan">{s.shortTitle}</span>
                      <ArrowUpRight aria-hidden className="mt-auto h-4 w-4 self-end pt-1 text-fg-subtle group-hover:text-cyan" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex items-center justify-center border-t border-line p-6 lg:border-l lg:border-t-0">
              <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_60%_50%,rgb(139_92_246/0.25),transparent_65%)]" />
              <PillarArt pillar="intelligence" className="relative max-w-md" />
            </div>
          </article>

          {/* Product development */}
          <article className="panel reveal flex flex-col overflow-hidden lg:col-span-3">
            <div className="border-b border-line bg-ink/40 px-6 pt-6">
              <PillarArt pillar="build" className="mx-auto max-h-56 max-w-sm" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="font-mono text-xs tracking-[0.2em] text-cyan">SYS·01 · BUILD</p>
              <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{product.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{product.summary}</p>
              <Link href={`/services/${product.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-bright hover:text-fg">
                How we build products <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Modernization */}
          <article className="panel reveal flex flex-col overflow-hidden lg:col-span-3">
            <div className="border-b border-line bg-ink/40 px-6 pt-6">
              <PillarArt pillar="modernize" className="mx-auto max-h-56 max-w-sm" />
            </div>
            <div className="flex flex-1 flex-col p-7">
              <p className="font-mono text-xs tracking-[0.2em] text-cyan">SYS·02 · MODERNIZE</p>
              <h3 className="mt-3 text-xl font-semibold sm:text-2xl">{modern.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-muted">{modern.summary}</p>
              <Link href={`/services/${modern.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-bright hover:text-fg">
                Our modernization approach <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Compact capability links */}
          <div className="reveal lg:col-span-4">
            <ul className="grid h-full gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2">
              {compact.map((s) => (
                <li key={s.slug} className="bg-ink-2">
                  <Link href={`/services/${s.slug}`} className="group flex h-full items-start gap-4 p-5 transition-colors hover:bg-surface">
                    <Icon name={s.icon} className="mt-0.5 h-5 w-5 shrink-0 text-violet-bright" />
                    <span>
                      <span className="block font-medium text-fg group-hover:text-cyan">{s.shortTitle}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{s.summary}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="bg-ink-2">
                <Link href="/services" className="group flex h-full items-center justify-between gap-4 p-5 text-sm font-semibold text-violet-bright hover:bg-surface hover:text-fg">
                  All {services.length} services <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Partnerships */}
          <aside className="panel reveal relative flex flex-col overflow-hidden p-7 lg:col-span-2" aria-labelledby="partners-title">
            <div aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
            <Handshake aria-hidden className="relative h-6 w-6 text-cyan" />
            <h3 id="partners-title" className="relative mt-4 text-xl font-semibold">
              For agencies, consultancies &amp; integrators
            </h3>
            <p className="relative mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
              Need dependable engineering capacity? We work as a subcontracting or white-label delivery partner, under your
              brand and governance, from a single project to an ongoing relationship.
            </p>
            <ButtonLink href="/contact?type=partnership" variant="secondary" className="relative mt-6 self-start" track="partnership_enquiry" arrow>
              Explore a partnership
            </ButtonLink>
          </aside>
        </div>
      </Container>
    </section>
  );
}
