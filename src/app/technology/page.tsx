import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { FinalCta } from "@/components/home/final-cta";
import { selectionPrinciples, techGroups } from "@/content/technology";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Technology & Engineering Practices",
  description:
    "The languages, frameworks, AI, cloud, data and delivery technologies Inferra Software works with, organised by their role in delivery, and how we choose technology for each project.",
  path: "/technology",
});

/** A small delivery-flow diagram: how the technology groups fit together. */
function StackDiagram() {
  const rows = [
    { label: "Experience", items: "React · Next.js · Accessible UI" },
    { label: "Intelligence", items: "LLMs · RAG · Agents · MCP · Evaluation" },
    { label: "Services", items: "Java · Spring Boot · Python · APIs · Messaging" },
    { label: "Data", items: "PostgreSQL · BigQuery · Pipelines" },
    { label: "Platform", items: "Google Cloud · Docker · CI/CD · Observability" },
  ];
  return (
    <figure className="panel brackets p-6">
      <ol className="space-y-2">
        {rows.map((r, i) => (
          <li
            key={r.label}
            className="flex items-center gap-4 rounded-lg border border-line bg-ink/50 px-4 py-3"
            style={{ marginLeft: `${i * 6}px`, marginRight: `${(rows.length - 1 - i) * 6}px` }}
          >
            <span className="w-24 shrink-0 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cyan">{r.label}</span>
            <span className="text-sm text-fg-muted">{r.items}</span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 border-t border-line pt-3 text-xs text-fg-subtle">
        A typical layered solution. Real architectures are shaped by each project&apos;s needs.
      </figcaption>
    </figure>
  );
}

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Technology", path: "/technology" }]}
        eyebrow="Technology & practices"
        title={
          <>
            Breadth where it helps, <span className="text-gradient">depth where it counts</span>
          </>
        }
        intro="We organise technology by the job it does in a solution. Items marked as established strengths are where the team has deep, hands-on experience; others are used when a project calls for them. We do not claim equal depth in everything, and we will tell you where we stand."
        art={<StackDiagram />}
      />

      <Container className="py-20 sm:py-24">
        <p className="mb-10 flex flex-wrap items-center gap-5 text-sm text-fg-subtle">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-3 w-3 rounded-sm border border-violet-bright/40 bg-accent/25" /> Established strength
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="h-3 w-3 rounded-sm border border-line" /> Project-dependent
          </span>
        </p>
        <div className="space-y-6">
          {techGroups.map((g) => (
            <section key={g.id} aria-labelledby={`tg-${g.id}`} className="panel reveal grid gap-6 p-7 sm:p-8 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-ink/60">
                    <Icon name={g.icon} className="h-5 w-5 text-violet-bright" />
                  </span>
                  <h2 id={`tg-${g.id}`} className="font-display text-xl font-semibold">
                    {g.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{g.role}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-2" aria-label={`${g.title} technologies`}>
                {g.items.map((t) => (
                  <li
                    key={t.name}
                    className={
                      t.depth === "core"
                        ? "rounded-md border border-violet-bright/40 bg-accent/10 px-3 py-1.5 text-sm text-fg"
                        : "rounded-md border border-line px-3 py-1.5 text-sm text-fg-subtle"
                    }
                  >
                    {t.name}
                    <span className="sr-only">{t.depth === "core" ? " (established strength)" : " (project-dependent)"}</span>
                  </li>
                ))}
              </ul>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Practices</p>
                <ul className="mt-3 space-y-2">
                  {g.practices.map((p) => (
                    <li key={p} className="flex gap-2.5 text-sm text-fg-muted">
                      <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>
      </Container>

      <section aria-labelledby="choose-title" className="border-y border-line bg-ink-2/60 py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="choose-title"
            eyebrow="How we choose"
            title="Technology decisions start with your context"
            intro="Every recommendation balances business needs, technical constraints, maintainability and delivery requirements."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {selectionPrinciples.map((p, i) => (
              <li key={p.title} className="panel p-6">
                <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <FinalCta headline="Working with a specific stack?" body="Tell us what you run today and where you want to go. We will be clear about where our experience is deep and where we would bring in specialists." />
    </>
  );
}
