"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Pointer parallax for decorative artwork. Only active for fine pointers
 * (mouse/trackpad) when the visitor has not asked for reduced motion; on touch
 * devices and with reduced motion the art stays still. Updates CSS variables
 * inside requestAnimationFrame, so React does not re-render.
 */
export function ParallaxStage({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={cn("[--px:0] [--py:0]", className)} aria-hidden="true">
      {children}
    </div>
  );
}

export function ParallaxLayer({ depth, children }: { depth: number; children: React.ReactNode }) {
  return (
    <div
      className="absolute -inset-8 transition-transform duration-700 ease-out will-change-transform"
      style={{ transform: `translate3d(calc(var(--px) * ${-depth}px), calc(var(--py) * ${-depth * 0.6}px), 0)` }}
    >
      {children}
    </div>
  );
}
