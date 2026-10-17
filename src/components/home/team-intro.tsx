import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, SectionHeading } from "@/components/ui/section";
import { TeamCard } from "@/components/team/team-card";
import { team } from "@/content/team";

export function TeamIntro() {
  return (
    <section aria-labelledby="team-title" className="relative border-y border-line bg-ink-2/60 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <SectionHeading
              id="team-title"
              eyebrow="The team"
              title="Small, senior and hands-on"
              intro="Inferra Software starts with a compact team of experienced engineers. When a project needs more capacity or a specialist skill, we bring in additional developers and specialists, and we are transparent about who is doing the work."
            />
            <Link href="/about" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-bright hover:text-fg">
              About Inferra Software <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
          <ul className="grid gap-5 sm:grid-cols-3">
            {team.map((m) => (
              <li key={m.id} className="reveal">
                <TeamCard member={m} compact />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
