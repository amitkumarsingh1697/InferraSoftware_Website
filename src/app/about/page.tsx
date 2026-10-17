import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading } from "@/components/ui/section";
import { TeamCard } from "@/components/team/team-card";
import { CoreEmblem } from "@/components/art/generative";
import { FinalCta } from "@/components/home/final-cta";
import { approachStages, engagementModels } from "@/content/approach";
import { team } from "@/content/team";
import { messaging } from "@/config/messaging";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Inferra Software",
  description:
    "Why Inferra Software exists, our engineering philosophy, delivery model and approach to technology, and the senior-led team behind it, founded by Amit Kumar Singh.",
  path: "/about",
});

const philosophy = [
  {
    title: "Understand before building",
    body: "The most expensive software is the wrong software. We invest early in understanding the business problem, the users and the constraints, so effort goes where it matters.",
  },
  {
    title: "Engineer for production from day one",
    body: "Automated tests, observability, security and documentation are part of the first sprint. Production quality is not a phase you add at the end.",
  },
  {
    title: "Proportionate architecture",
    body: "We design for the next meaningful stage of your product, not for imaginary scale. Simple where possible, sophisticated where it pays for itself.",
  },
  {
    title: "Honest by default",
    body: "We share risks early, say when we do not know, and recommend against work that will not serve you, including work we could have sold.",
  },
];

const complexity = [
  "Break the problem into parts that can be understood, tested and delivered independently.",
  "Tackle the riskiest unknowns first, with spikes and prototypes where they reduce uncertainty.",
  "Make decisions explicit and record why they were made.",
  "Measure, rather than assume, when performance, reliability or quality is in question.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About Inferra Software"
        title={
          <>
            A senior-led engineering studio for <span className="text-gradient">ambitious software</span>
          </>
        }
        intro={messaging.positioning}
        art={
          <div className="relative mx-auto aspect-square max-w-sm">
            <CoreEmblem />
          </div>
        }
      />

      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <section aria-labelledby="why-title">
            <SectionHeading id="why-title" eyebrow="Why we exist" title="Good software needs experienced hands" />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-fg-muted">
              <p>
                Many businesses have ambitious software plans and too few experienced engineers to deliver them. Others
                have working systems that have become hard to change, or are exploring AI without a clear way to make it
                reliable.
              </p>
              <p>
                Inferra Software was founded to help with exactly these situations: to bring senior engineering judgement
                and hands-on delivery to companies that need software built, modernized, integrated or scaled, without the
                overhead or hand-offs of a large consultancy.
              </p>
              <p>
                We deliberately work across stacks and domains. The right technology depends on your problem, your team and
                your constraints, and our job is to assemble the right capabilities for each project.
              </p>
            </div>
          </section>
          <section aria-labelledby="complex-title" className="panel brackets p-7 sm:p-9">
            <h2 id="complex-title" className="font-display text-2xl font-semibold">
              How we approach complex challenges
            </h2>
            <ol className="mt-6 space-y-4">
              {complexity.map((c, i) => (
                <li key={c} className="flex gap-4 leading-relaxed text-fg-muted">
                  <span className="font-mono text-sm text-cyan">0{i + 1}</span>
                  {c}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </Container>

      <section aria-labelledby="philo-title" className="border-y border-line bg-ink-2/60 py-20 sm:py-24">
        <Container>
          <SectionHeading id="philo-title" eyebrow="Engineering philosophy" title="What we believe about building software" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {philosophy.map((p) => (
              <li key={p.title} className="panel p-7">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-fg-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="team-title" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="team-title"
            eyebrow="The team"
            title="The people behind Inferra Software"
            intro="We are a small, experienced team. As project requirements grow, we bring in additional developers and specialists, and we are always clear about who is working on your project."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <li key={m.id}>
                <TeamCard member={m} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="delivery-title" className="border-y border-line bg-ink-2/60 py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                id="delivery-title"
                eyebrow="Delivery model"
                title="Scaled to your project"
                intro="Engagements start with the core team and expand with vetted specialists when a project needs more capacity or a particular skill. You get one accountable point of contact throughout."
              />
              <ul className="mt-8 space-y-4">
                {engagementModels.map((m) => (
                  <li key={m.title} className="border-l-2 border-accent pl-5">
                    <h3 className="font-semibold text-fg">{m.title}</h3>
                    <p className="mt-1 leading-relaxed text-fg-muted">{m.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <SectionHeading eyebrow="Commitment to quality" title="Production quality, every time" />
              <ol className="mt-8 grid gap-3">
                {approachStages.map((s, i) => (
                  <li key={s.id} className="flex items-baseline gap-4 rounded-xl border border-line bg-ink/40 px-5 py-4">
                    <span className="font-mono text-xs text-cyan">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="font-semibold text-fg">{s.title}</span>
                      <span className="text-fg-muted"> · {s.summary}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-sm text-fg-subtle">Stages and depth are tailored to each project&apos;s scope.</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-20 sm:py-24">
        <SectionHeading
          eyebrow="Choosing technology"
          title="We recommend what fits, not what we prefer"
          intro="Technology choices are driven by your business needs, existing systems, team skills, maintainability and total cost of ownership. We favour proven tools your team can operate long after we hand over, and we are open about where our experience is deep and where we would bring in specialists."
        />
      </Container>

      <FinalCta />
    </>
  );
}
