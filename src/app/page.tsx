import { Hero } from "@/components/home/hero";
import { Credibility } from "@/components/home/credibility";
import { CapabilitiesExplorer } from "@/components/home/capabilities-explorer";
import { FeaturedServices } from "@/components/home/featured-services";
import { Approach } from "@/components/home/approach";
import { SelectedWork } from "@/components/home/selected-work";
import { TeamIntro } from "@/components/home/team-intro";
import { TechPreview } from "@/components/home/tech-preview";
import { InsightsTeaser } from "@/components/home/insights-teaser";
import { FinalCta } from "@/components/home/final-cta";
import { Container, SectionHeading } from "@/components/ui/section";
import { pillarOrder, pillars, getServicesByPillar } from "@/content/services";
import { hasConfiguredSiteUrl } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: hasConfiguredSiteUrl() ? { canonical: "/" } : undefined,
};

export default function HomePage() {
  const explorerPillars = pillarOrder.map((id) => ({
    id,
    label: pillars[id].label,
    code: pillars[id].code,
    tagline: pillars[id].tagline,
    description: pillars[id].description,
    services: getServicesByPillar(id).map((s) => ({ title: s.title, href: `/services/${s.slug}`, summary: s.summary })),
  }));

  return (
    <>
      <Hero />
      <Credibility />
      <section aria-labelledby="explorer-title" className="relative py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="explorer-title"
            eyebrow="Capabilities"
            title={
              <>
                One team, <span className="text-gradient">five ways</span> to move your software forward
              </>
            }
            intro="Select an area to see how we can help. Most real projects combine several, which is why we keep them under one roof."
          />
          <div className="mt-14">
            <CapabilitiesExplorer pillars={explorerPillars} />
          </div>
        </Container>
      </section>
      <FeaturedServices />
      <Approach />
      <SelectedWork />
      <TeamIntro />
      <TechPreview />
      <InsightsTeaser />
      <FinalCta />
    </>
  );
}
