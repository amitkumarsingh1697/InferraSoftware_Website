import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[background-color,border-color,box-shadow,color,transform] duration-[var(--duration-hover)] ease-editorial focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-strong text-on-accent shadow-[0_10px_30px_-12px_rgb(67_42_26/0.7)] hover:bg-accent-deep hover:shadow-[0_14px_36px_-12px_rgb(67_42_26/0.8)] hover:-translate-y-px",
  secondary: "border border-line-strong bg-surface/60 text-fg backdrop-blur-sm hover:border-accent-text hover:bg-surface",
  ghost: "text-fg-muted hover:text-fg",
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
  /** Analytics event name; picked up by the delegated click tracker. */
  track?: string;
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
  arrow = false,
  track,
  external = false,
}: CommonProps & { href: string; external?: boolean }) {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );
  const cls = cn(base, variants[variant], className);
  if (external || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} data-track={track} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={track}>
      {content}
    </Link>
  );
}

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}
