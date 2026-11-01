import { Reveal } from "@/components/motion/reveal";
import { SplitTitle } from "@/components/motion/split-title";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-highlight", className)}>
      <span aria-hidden className="h-px w-8 bg-gradient-to-r from-transparent to-highlight" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  className,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
  id?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>}
      <Tag id={id} className="mt-5 text-[2.1rem] font-medium leading-[1.08] text-fg sm:text-5xl lg:text-[3.4rem]">
        <SplitTitle>{title}</SplitTitle>
      </Tag>
      {intro && <div className="mt-5 text-lg leading-relaxed text-fg-muted">{intro}</div>}
    </Reveal>
  );
}

export function Section({
  children,
  className,
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("relative py-section", className)}>
      {children}
    </section>
  );
}
