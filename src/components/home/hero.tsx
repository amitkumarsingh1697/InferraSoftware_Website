import { Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { HeroIntro, HeroLine } from "@/components/home/hero-motion";
import { messaging } from "@/config/messaging";
import { siteConfig } from "@/config/site";

/**
 * Opening chapter. The 3D sculpture (components/scene) sits in the right half
 * behind this section; the copy owns the left half on wide screens and sits
 * over a soft paper wash on narrow ones.
 */
export function Hero() {
  const { hero } = messaging;
  return (
    <section
      aria-labelledby="hero-title"
      data-scene="hero"
      className="relative isolate flex min-h-[680px] items-center overflow-hidden pb-24 pt-32 sm:min-h-[100svh] sm:max-h-[1100px] lg:pt-36"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--color-canvas)_55%,transparent),color-mix(in_srgb,var(--color-canvas)_20%,transparent)_40%,color-mix(in_srgb,var(--color-canvas)_85%,transparent))] lg:bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-canvas)_85%,transparent)_0%,color-mix(in_srgb,var(--color-canvas)_45%,transparent)_38%,transparent_62%)]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <HeroIntro>
            <HeroLine>
              <p className="inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-highlight sm:text-xs">
                <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-highlight" />
                {hero.eyebrow}
              </p>
            </HeroLine>
            <h1 id="hero-title" className="mt-8 text-[2.9rem] font-medium leading-[0.98] tracking-[-0.025em] text-fg sm:text-7xl lg:text-[5.6rem]">
              <HeroLine as="span" className="block">
                {hero.headline[0]}
              </HeroLine>
              <HeroLine as="span" className="block pb-2 italic text-accent-text">
                {hero.headline[1]}
              </HeroLine>
            </h1>
            <HeroLine>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">{hero.body}</p>
            </HeroLine>
            <HeroLine>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={hero.primaryCta.href} arrow track="cta_click" className="px-6 py-3 text-[0.95rem]">
                  {hero.primaryCta.label}
                </ButtonLink>
                <ButtonLink href={hero.secondaryCta.href} variant="secondary" className="px-6 py-3 text-[0.95rem]">
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </HeroLine>
            <HeroLine>
              <a
                href={`tel:${siteConfig.contact.phoneE164}`}
                className="mt-7 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
                data-track="call_click"
                data-track-label="hero"
              >
                <Phone aria-hidden className="h-4 w-4 text-highlight" />
                Prefer to talk? Call {siteConfig.contact.phoneDisplay}
              </a>
            </HeroLine>
          </HeroIntro>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="text-[0.6rem] font-semibold tracking-[0.35em] text-fg-subtle">SCROLL</span>
        <span className="relative h-12 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-5 animate-[scrollcue_2.4s_ease-in-out_infinite] bg-accent-text" />
        </span>
      </div>
    </section>
  );
}
