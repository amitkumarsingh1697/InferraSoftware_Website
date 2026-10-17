import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Container, Eyebrow } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Interior page header. Each page supplies its own art (or none), so interior
 * pages share a rhythm without looking identical.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  art,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: { name: string; path: string }[];
  art?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden border-b border-line pb-16 pt-28 sm:pb-20 sm:pt-36", className)}>
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="bg-blueprint absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/20 blur-[120px]" />
        <div className="absolute -bottom-40 left-[-10%] h-[360px] w-[360px] rounded-full bg-cyan/10 blur-[120px]" />
      </div>
      <Container>
        <div className={cn("grid items-center gap-10", art && "lg:grid-cols-[1.25fr_1fr]")}>
          <div>
            <Breadcrumbs items={crumbs} />
            {eyebrow && <Eyebrow className="mt-8">{eyebrow}</Eyebrow>}
            <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-6xl">{title}</h1>
            {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted sm:text-xl">{intro}</div>}
            {children}
          </div>
          {art && <div className="relative mx-auto w-full max-w-md lg:max-w-none">{art}</div>}
        </div>
      </Container>
    </section>
  );
}
