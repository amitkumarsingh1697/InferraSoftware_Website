import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-[background-color,border-color,box-shadow,color] duration-200 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-strong text-white shadow-[0_0_0_1px_rgb(167_139_250/0.4),0_8px_30px_-8px_rgb(124_58_237/0.8)] hover:bg-accent-deep hover:shadow-[0_0_0_1px_rgb(103_232_249/0.5),0_8px_36px_-6px_rgb(124_58_237/0.9)]",
  secondary: "border border-line-strong bg-white/[0.03] text-fg hover:border-violet-bright hover:bg-white/[0.07]",
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
