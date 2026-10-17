import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { techGroups } from "@/content/technology";

export function TechPreview() {
  const groups = techGroups.filter((g) => g.id !== "frontend");
  return (
    <section aria-labelledby="tech-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="tech-title"
            eyebrow="Technology & practices"
            title="The right tools, chosen for your problem"
            intro="Grouped by the role each plays in delivery. Highlighted items are established strengths; others are used where a project calls for them."
          />
          <Link href="/technology" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-violet-bright hover:text-fg">
            Technology in depth <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <li key={g.id} className="panel reveal p-6">
              <div className="flex items-center gap-3">
                <Icon name={g.icon} className="h-5 w-5 text-violet-bright" />
                <h3 className="font-display text-base font-semibold">{g.title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${g.title} technologies`}>
                {g.items.map((t) => (
                  <li
                    key={t.name}
                    className={
                      t.depth === "core"
                        ? "rounded-md border border-violet-bright/40 bg-accent/10 px-2.5 py-1 text-xs text-fg"
                        : "rounded-md border border-line px-2.5 py-1 text-xs text-fg-subtle"
                    }
                  >
                    {t.name}
                    {t.depth === "project" && <span className="sr-only"> (project-dependent)</span>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-4 text-xs text-fg-subtle">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-sm border border-violet-bright/40 bg-accent/20" /> Established strength
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-sm border border-line" /> Project-dependent
          </span>
        </p>
      </Container>
    </section>
  );
}
