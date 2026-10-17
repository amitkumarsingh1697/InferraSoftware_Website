import { Container, SectionHeading } from "@/components/ui/section";
import { approachStages } from "@/content/approach";

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="relative overflow-hidden border-y border-line bg-ink-2/60 py-20 sm:py-28">
      <div aria-hidden className="bg-blueprint absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative">
        <SectionHeading
          id="approach-title"
          eyebrow="Our approach"
          title="A clear path from problem to production"
          intro="Every engagement follows the same disciplined arc. The depth of each stage depends on your project's scope, risk and starting point."
        />
        <ol className="relative mt-16 grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {approachStages.map((stage, i) => (
            <li key={stage.id} className="reveal group relative bg-ink-2 p-6 transition-colors hover:bg-surface">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line-strong font-mono text-sm text-cyan group-hover:border-cyan/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span aria-hidden className="h-px flex-1 bg-gradient-to-r from-line-strong to-transparent" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{stage.title}</h3>
              <p className="mt-1 text-sm font-medium text-violet-bright">{stage.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{stage.detail}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-fg-subtle">
          Actual stages, deliverables and timelines are agreed per project. A focused review may cover only the first two;
          a product build will include all six.
        </p>
      </Container>
    </section>
  );
}
