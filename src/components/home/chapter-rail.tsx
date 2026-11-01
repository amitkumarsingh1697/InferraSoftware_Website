"use client";

import { useEffect, useMemo, useState } from "react";
import { chapters } from "@/components/scene/journey/chapters";
import { ChapterProgress } from "@/components/scene/journey/progress";
import { cn } from "@/lib/utils";

/**
 * Journey navigation for the homepage: a "03 / 10" counter and a right-hand
 * rail listing every chapter, with a thin line that fills as you scroll.
 * Each entry jumps to its section. Works with or without the 3D scene.
 */
export function ChapterRail() {
  const progress = useMemo(() => new ChapterProgress(), []);
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setChapter(progress.chapterAt(window.scrollY)));
    };
    const measure = () => {
      progress.measure();
      update();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [progress]);

  const active = Math.round(chapter);
  const total = chapters.length;
  const fill = chapter / (total - 1);

  const jump = (index: number) => {
    const el = document.querySelector<HTMLElement>(`[data-scene="${chapters[index].scene}"]`);
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -80, immediate: reduced });
    else el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <nav aria-label="Page chapters" className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <p aria-hidden className="mb-5 text-right font-mono text-[0.68rem] tracking-[0.2em] text-fg-subtle">
        <span className="text-accent-text">{String(active + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
      </p>
      <div className="relative flex gap-4">
        <ol className="pointer-events-auto space-y-2.5 text-right">
          {chapters.map((c, i) => (
            <li key={c.scene}>
              <button
                type="button"
                onClick={() => jump(i)}
                aria-current={i === active ? "step" : undefined}
                className={cn(
                  "group inline-flex items-center gap-2 text-[0.7rem] tracking-[0.04em] transition-colors duration-300",
                  i === active ? "text-accent-text" : "text-fg-subtle/70 hover:text-fg",
                )}
              >
                <span className={cn("transition-opacity duration-300", i === active ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>{c.label}</span>
                <span className="font-mono text-[0.62rem]">{String(i + 1).padStart(2, "0")}</span>
              </button>
            </li>
          ))}
        </ol>
        <span aria-hidden className="relative w-px bg-line-strong">
          <span className="absolute inset-x-0 top-0 origin-top bg-accent-text" style={{ height: "100%", transform: `scaleY(${fill})` }} />
        </span>
      </div>
    </nav>
  );
}
