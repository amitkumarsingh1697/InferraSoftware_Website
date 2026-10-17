import { cn } from "@/lib/utils";

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-xs text-fg-muted", className)}>
      {children}
    </span>
  );
}

/** Unmistakable label for demonstrator / illustrative content. */
export function DisclosureBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-warning/40 bg-warning/10 px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-warning",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-warning" />
      {children}
    </span>
  );
}
