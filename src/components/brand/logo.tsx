import { cn } from "@/lib/utils";

/**
 * The Inferra mark: two faceted chevrons forming a diamond around an "i".
 * Geometry is shared with scripts/generate-brand-assets.mjs.
 */
export function LogoMark({ className, title, mono = false }: { className?: string; title?: string; mono?: boolean }) {
  const gradientId = "inferra-mark-gradient";
  return (
    <svg viewBox="0 0 48 48" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      {!mono && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#A78BFA" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      )}
      <path fill={mono ? "currentColor" : `url(#${gradientId})`} d="M17 5h5L10 24l12 19h-5L5 24z" />
      <path fill={mono ? "currentColor" : `url(#${gradientId})`} d="M31 5h-5l12 19-12 19h5l12-19z" />
      <path fill={mono ? "currentColor" : "#F5F3FF"} d="M21.5 20.5h5V38l-2.5 3-2.5-3z" />
      <circle fill={mono ? "currentColor" : "#67E8F9"} cx="24" cy="12.5" r="3.6" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-8 w-8 shrink-0" />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[1.05rem] font-semibold uppercase tracking-[0.14em] text-fg">Inferra</span>{" "}
          <span className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.42em] text-fg-muted">Software</span>
        </span>
      )}
    </span>
  );
}
