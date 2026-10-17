import { Phone } from "lucide-react";
import { HeroScene } from "@/components/art/hero-scene";
import { ButtonLink } from "@/components/ui/button";
import { messaging } from "@/config/messaging";
import { siteConfig } from "@/config/site";

export function Hero() {
  const { hero } = messaging;
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[640px] items-center overflow-hidden pb-20 pt-28 sm:min-h-[100svh] sm:max-h-[1100px] lg:pt-32">
      <div className="absolute inset-0 -z-10">
        <HeroScene />
        {/* readability scrims: text always sits on a dark, even field */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,var(--color-ink)_0%,rgb(10_7_24/0.82)_45%,rgb(10_7_24/0.35)_80%,transparent)] lg:bg-[linear-gradient(90deg,var(--color-ink)_0%,rgb(10_7_24/0.8)_32%,transparent_60%)]" />
        <div aria-hidden className="absolute inset-0 bg-ink/45 sm:bg-ink/20 lg:bg-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-ink/60 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cyan backdrop-blur sm:text-xs">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_10px_2px_rgb(103_232_249/0.7)]" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="mt-7 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.035em] text-fg sm:text-6xl lg:text-7xl">
            <span className="block">{hero.headline[0]}</span>
            <span className="text-gradient block pb-1">{hero.headline[1]}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl">{hero.body}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={hero.primaryCta.href} arrow track="cta_click" className="px-6 py-3 text-[0.95rem]">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary" className="px-6 py-3 text-[0.95rem]">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
          <a
            href={`tel:${siteConfig.contact.phoneE164}`}
            className="mt-6 inline-flex items-center gap-2 text-sm text-fg-muted hover:text-fg"
            data-track="call_click"
            data-track-label="hero"
          >
            <Phone aria-hidden className="h-4 w-4 text-cyan" />
            Prefer to talk? Call {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[0.6rem] tracking-[0.3em] text-fg-subtle">SCROLL</span>
        <span className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-4 animate-[scrollcue_2.4s_ease-in-out_infinite] bg-cyan" />
        </span>
      </div>
    </section>
  );
}
