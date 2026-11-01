import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A swappable media frame. Pass `src` once final photography or video stills
 * exist; until then it shows `fallback` (generated art) or a labelled
 * placeholder, so layouts never depend on assets that are still in review.
 */
export function MediaSlot({
  src,
  alt = "",
  ratio = "4/3",
  fallback,
  label,
  className,
  priority,
}: {
  src?: string | null;
  alt?: string;
  ratio?: `${number}/${number}`;
  fallback?: React.ReactNode;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--radius-panel)] bg-espresso", className)} style={{ aspectRatio: ratio }}>
      {src ? (
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority={priority} />
      ) : (
        fallback ?? (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(ellipse_at_30%_20%,var(--color-espresso-2),var(--color-espresso))]">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-on-espresso-muted">{label ?? "Media placeholder"}</span>
          </div>
        )
      )}
    </div>
  );
}
