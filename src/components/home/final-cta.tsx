import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { messaging } from "@/config/messaging";
import { siteConfig } from "@/config/site";

export function FinalCta({
  headline = messaging.finalCta.headline,
  body = messaging.finalCta.body,
  primary = messaging.finalCta.primary,
  secondary = messaging.finalCta.secondary,
}: {
  headline?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section aria-labelledby="final-cta-title" data-scene="closing" className="relative py-section">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-line-strong bg-canvas-2/30 px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-surface/90 via-surface/70 to-transparent" />
          <div className="max-w-xl">
            <h2 id="final-cta-title" className="text-4xl font-medium leading-[1.05] sm:text-6xl">
              {headline}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">{body}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primary.href} arrow track="cta_click" className="px-6 py-3">
                {primary.label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="secondary" className="px-6 py-3">
                {secondary.label}
              </ButtonLink>
            </div>
            <a
              href={`tel:${siteConfig.contact.phoneE164}`}
              className="mt-7 inline-flex items-center gap-2 text-fg hover:text-highlight"
              data-track="call_click"
              data-track-label="final_cta"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong">
                <Phone aria-hidden className="h-4 w-4 text-highlight" />
              </span>
              <span>
                <span className="block text-xs text-fg-subtle">Call us directly</span>
                <span className="font-medium">{siteConfig.contact.phoneDisplay}</span>
              </span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
