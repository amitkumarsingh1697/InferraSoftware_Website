import { Container, Eyebrow } from "@/components/ui/section";
import { messaging } from "@/config/messaging";

const facts = [
  {
    value: "8+",
    label: "years",
    detail: "Founder's experience in software engineering and technical leadership.",
  },
  {
    value: "Millions",
    label: "of end users",
    detail: "Reached by products and platforms the founder contributed to in earlier professional roles.*",
  },
  {
    value: "Senior",
    label: "led delivery",
    detail: "A small, experienced core team, with specialists added as project needs grow.",
  },
];

const principles = [
  {
    title: "Senior engineering",
    body: "The people who scope your project are the people who build it. No hand-off from a sales team to a junior bench.",
  },
  {
    title: "Practical architecture",
    body: "Designs proportionate to your stage and budget: simple where possible, sophisticated where it pays for itself.",
  },
  {
    title: "Production-ready delivery",
    body: "Tests, observability, security and documentation are part of the work from the first sprint, not an afterthought.",
  },
];

export function Credibility() {
  return (
    <section aria-labelledby="cred-title" className="relative border-y border-line bg-ink-2/60 py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="reveal">
            <Eyebrow>{messaging.credibility.eyebrow}</Eyebrow>
            <h2 id="cred-title" className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              {messaging.credibility.headline}
            </h2>
            <ul className="mt-10 space-y-6">
              {principles.map((p, i) => (
                <li key={p.title} className="flex gap-4">
                  <span aria-hidden className="mt-1 font-mono text-xs text-cyan">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-fg">{p.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-fg-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <dl className="grid gap-px overflow-hidden rounded-[var(--radius-panel)] border border-line bg-line sm:grid-cols-3 lg:grid-cols-1">
              {facts.map((f) => (
                <div key={f.label} className="bg-ink-2 p-6 lg:flex lg:items-center lg:gap-8 lg:p-7">
                  <dt className="lg:w-48 lg:shrink-0">
                    <span className="font-display text-4xl font-semibold text-gradient">{f.value}</span>
                    <span className="mt-1 block font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{f.label}</span>
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-fg-muted lg:mt-0">{f.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-fg-subtle">
              *This figure describes the founder&apos;s professional experience before Inferra Software. It is not a claim about
              products delivered by Inferra Software. We do not publish client names, logos or results without permission.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
