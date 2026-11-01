"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/design/motion";
import { cn } from "@/lib/utils";

const Experience = dynamic(() => import("./experience"), { ssr: false });

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Fixed, full-viewport 3D layer behind the page content. It loads after the
 * page is interactive, never blocks reading, and is skipped entirely without
 * WebGL (the warm gradient backdrop remains). Pointer events pass through.
 */
export function SceneLayer() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const veilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Automated browsers (end-to-end tests, crawlers) render WebGL in software,
    // which is slow and tells them nothing; they get the static backdrop.
    // Append ?scene=on to force the scene, for example in the scene test.
    const forced = new URLSearchParams(window.location.search).get("scene") === "on";
    if (!supportsWebGL() || (navigator.webdriver && !forced)) return;
    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      {/* Backdrop: warm light falling across the paper */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_75%_20%,color-mix(in_srgb,var(--color-surface)_90%,transparent),transparent_70%),radial-gradient(ellipse_60%_50%_at_10%_90%,color-mix(in_srgb,var(--color-surface-3)_45%,transparent),transparent_70%)]" />
      {enabled && (
        <div className={cn("absolute inset-0 transition-opacity duration-[1600ms] ease-editorial", ready ? "opacity-100" : "opacity-0")}>
          <Experience
            reduced={reduced}
            onReady={() => setReady(true)}
            onVeil={(v) => veilRef.current?.style.setProperty("opacity", String(v))}
          />
        </div>
      )}
      <div ref={veilRef} className="absolute inset-0 bg-canvas transition-opacity duration-700 ease-soft" style={{ opacity: 0 }} />
    </div>
  );
}
