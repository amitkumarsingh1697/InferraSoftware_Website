import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/section";
import { Icon } from "@/components/ui/icon";
import { FinalCta } from "@/components/home/final-cta";
import { industries } from "@/content/industries";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries & Use Cases",
  description:
    "How Inferra Software's engineering capabilities apply to financial services, SaaS and technology, retail and commerce, enterprise operations and data-intensive businesses.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }]}
        eyebrow="Industries & use cases"
        title={
          <>
            Engineering fundamentals, <span className="text-gradient">applied to your sector</span>
          </>
        }
        intro="Good engineering transfers across industries, but every sector has its own constraints. These pages describe common technology challenges and how our capabilities apply. They reflect general expertise and illustrative scenarios, not a list of existing clients."
      />
      <Container className="py-20 sm:py-24">
        <ul className="grid gap-6 md:grid-cols-2">
          {industries.map((ind, i) => (
            <li key={ind.slug} className={i === 0 ? "md:col-span-2" : undefined}>
              <Link href={`/industries/${ind.slug}`} className="group panel reveal flex h-full flex-col p-7 transition-colors hover:border-line-strong sm:p-9">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-strong bg-ink/60">
                    <Icon name={ind.icon} className="h-5 w-5 text-violet-bright" />
                  </span>
                  <ArrowUpRight aria-hidden className="h-5 w-5 text-fg-subtle group-hover:text-cyan" />
                </div>
                <h2 className="mt-6 font-display text-2xl font-semibold group-hover:text-cyan">{ind.name}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-fg-muted">{ind.summary}</p>
                <p className="mt-6 text-xs text-fg-subtle">
                  Relevant services:{" "}
                  {ind.capabilities
                    .map((c) => getService(c)?.shortTitle)
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-fg-subtle">
          Don&apos;t see your industry? Most of our work is defined by the engineering problem rather than the sector. If you are
          building, modernizing or integrating software, we are happy to talk.
        </p>
      </Container>
      <FinalCta headline="Have a sector-specific challenge?" body="Tell us about your systems, constraints and goals. We will give you an honest view of how we could help." />
    </>
  );
}
