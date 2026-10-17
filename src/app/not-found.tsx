import Link from "next/link";
import { CoreEmblem } from "@/components/art/generative";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div aria-hidden className="bg-blueprint absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-mono text-sm tracking-[0.2em] text-cyan">ERROR 404 · SIGNAL LOST</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">This page isn&apos;t part of the system.</h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-fg-muted">
              The address may be mistyped, or the page may have moved. Here are some reliable routes back.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/" arrow>
                Back to home
              </ButtonLink>
              <ButtonLink href="/services" variant="secondary">
                Explore services
              </ButtonLink>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {[
                ["Work", "/work"],
                ["Insights", "/insights"],
                ["About", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-violet-bright hover:text-fg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto aspect-square w-full max-w-sm opacity-70 grayscale-[30%]">
            <CoreEmblem />
          </div>
        </div>
      </Container>
    </section>
  );
}
