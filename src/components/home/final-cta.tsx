import { Phone } from "lucide-react";
import { CoreEmblem } from "@/components/art/generative";
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
    <section aria-labelledby="final-cta-title" className="relative py-20 sm:py-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-line-strong bg-gradient-to-br from-surface via-ink-2 to-ink px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
          <div aria-hidden className="absolute -right-24 top-1/2 -z-10 h-[520px] w-[520px] -translate-y-1/2 opacity-80 sm:-right-10 lg:right-0">
            <CoreEmblem />
          </div>
          <div aria-hidden className="absolute inset-y-0 left-0 right-0 -z-10 bg-gradient-to-r from-ink-2 via-ink-2/90 to-transparent md:right-1/3 md:via-ink-2/70" />
          <div className="max-w-xl">
            <h2 id="final-cta-title" className="text-3xl font-semibold leading-tight sm:text-5xl">
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
              className="mt-7 inline-flex items-center gap-2 text-fg hover:text-cyan"
              data-track="call_click"
              data-track-label="final_cta"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong">
                <Phone aria-hidden className="h-4 w-4 text-cyan" />
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
