"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/logo";

/**
 * Short opening curtain for the homepage: the mark, a 00–100 counter and a
 * hairline, then a fade. It is timed by CSS (so it clears even without
 * JavaScript), never takes clicks, is skipped for reduced motion, and only
 * plays once per browser session. Timing lives in tokens.css (--intro-*).
 */
export function IntroLoader() {
  const [state, setState] = useState<"play" | "skip">("play");
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("inferra-intro") === "1";
    } catch {
      /* storage blocked: just play */
    }
    if (seen || navigator.webdriver) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time decision after mount
      setState("skip");
      return;
    }
    const total = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--intro-count")) || 1100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - p, 3);
      if (count.current) count.current.textContent = String(Math.round(eased * 100)).padStart(2, "0");
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    // Remember the intro once it has actually played.
    const done = window.setTimeout(() => {
      try {
        sessionStorage.setItem("inferra-intro", "1");
      } catch {
        /* ignore */
      }
    }, total);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(done);
    };
  }, []);

  if (state === "skip") return null;
  return (
    <div className="intro-curtain" aria-hidden="true">
      <div className="flex flex-col items-center gap-6">
        <LogoMark className="h-12 w-12" />
        <div className="h-px w-40 overflow-hidden bg-line">
          <div className="intro-bar h-full bg-accent-strong" />
        </div>
        <span ref={count} className="font-mono text-xs tracking-[0.3em] text-fg-subtle">
          00
        </span>
      </div>
    </div>
  );
}
