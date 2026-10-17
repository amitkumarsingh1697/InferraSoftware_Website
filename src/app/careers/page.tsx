import Link from "next/link";
import { Briefcase, Handshake, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { Tag } from "@/components/ui/badge";
import { FinalCta } from "@/components/home/final-cta";
import { engineeringPrinciples, openRoles } from "@/content/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers & Partnerships",
  description:
    "Work with Inferra Software: our engineering principles, working environment, open positions and talent network, plus partnership opportunities for agencies and consultancies.",
  path: "/careers",
});

export default function CareersPage() {
  const roles = openRoles();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Careers", path: "/careers" }]}
        eyebrow="Careers & partnerships"
        title={
          <>
            Build serious software <span className="text-gradient">with people who care</span>
          </>
        }
        intro="Inferra Software is a young, senior-led company. We are growing carefully, project by project, and we are always interested in hearing from experienced engineers and from businesses that want a dependable delivery partner."
      />

      <Container className="py-20 sm:py-24">
        <SectionHeading eyebrow="How we work" title="Engineering principles" />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {engineeringPrinciples.map((p) => (
            <li key={p.title} className="panel p-6">
              <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{p.description}</p>
            </li>
          ))}
          <li className="panel p-6">
            <h3 className="font-display text-lg font-semibold">An honest picture</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">
              We are small. That means real ownership and direct access to decision-makers, and also that roles evolve with
              client work. We will be clear about scope, type of engagement and expectations from the first conversation.
            </p>
          </li>
        </ul>
      </Container>

      <section aria-labelledby="roles-title" className="border-y border-line bg-ink-2/60 py-20 sm:py-24">
        <Container>
          <SectionHeading id="roles-title" eyebrow="Open positions" title={roles.length ? "Current openings" : "No open roles right now"} />
          {roles.length > 0 ? (
            <ul className="mt-10 space-y-5">
              {roles.map((r) => (
                <li key={r.slug} className="panel p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                    <Tag>{r.type}</Tag>
                    <Tag>{r.location}</Tag>
                  </div>
                  <p className="mt-3 leading-relaxed text-fg-muted">{r.summary}</p>
                  <div className="mt-5 grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="font-semibold text-fg">Responsibilities</h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-fg-muted">
                        {r.responsibilities.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-fg">What we look for</h4>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-fg-muted">
                        {r.requirements.map((x) => (
                          <li key={x}>{x}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <ButtonLink href={`/contact?type=careers&role=${r.slug}`} className="mt-6" arrow track="career_enquiry">
                    Apply for this role
                  </ButtonLink>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div className="panel brackets p-7 sm:p-9">
                <Briefcase aria-hidden className="h-6 w-6 text-cyan" />
                <h3 className="mt-4 font-display text-2xl font-semibold">Join our talent network</h3>
                <p className="mt-3 leading-relaxed text-fg-muted">
                  We have no advertised vacancies at the moment, but we regularly need experienced engineers for client
                  projects across backend, frontend, AI, data, cloud and SAP. Introduce yourself and share a link to your CV,
                  portfolio or LinkedIn profile, and we will get in touch when a suitable opportunity appears.
                </p>
                <ButtonLink href="/contact?type=careers" className="mt-7" arrow track="career_enquiry">
                  Send a speculative application
                </ButtonLink>
              </div>
              <div className="panel p-7">
                <ShieldCheck aria-hidden className="h-6 w-6 text-violet-bright" />
                <h3 className="mt-4 font-display text-lg font-semibold">Your information</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  We ask for links rather than file uploads, so your documents stay where you control them. We use what you
                  send only to consider you for opportunities and delete it on request. See our{" "}
                  <Link href="/privacy" className="text-cyan underline underline-offset-2">
                    privacy policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          )}
        </Container>
      </section>

      <Container className="py-20 sm:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="Partnerships"
              title="Delivery capacity for agencies and consultancies"
              intro="We welcome partnerships with digital agencies, software companies, IT consultancies and system integrators that need additional engineering capacity. We can work under your brand, follow your processes and support your client relationships, from a single project to an ongoing arrangement."
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {["Subcontracting", "White-label delivery", "Team extension", "Specialist support", "Ongoing partnership"].map((t) => (
                <li key={t}>
                  <Tag>{t}</Tag>
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-7 sm:p-9">
            <Handshake aria-hidden className="h-6 w-6 text-cyan" />
            <h3 className="mt-4 font-display text-xl font-semibold">Start a partnership conversation</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">Tell us about your clients, the skills you need and how you prefer to work.</p>
            <ButtonLink href="/contact?type=partnership" className="mt-6" arrow track="partnership_enquiry">
              Partnership enquiry
            </ButtonLink>
          </div>
        </div>
      </Container>

      <FinalCta />
    </>
  );
}
