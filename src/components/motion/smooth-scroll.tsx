"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/**
 * Inertial smooth scrolling for mouse and trackpad. Touch devices keep native
 * scrolling, and the whole thing is off when the visitor prefers reduced
 * motion. Scrolling stays native underneath (no transformed wrapper), so
 * keyboard, find-in-page, anchors and screen readers all behave normally.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -96 }, autoRaf: true });
    window.__lenis = lenis;
    const onChange = () => {
      if (mq.matches) lenis.destroy();
    };
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      lenis.destroy();
      if (window.__lenis === lenis) window.__lenis = undefined;
    };
  }, []);

  // New page: start at the top without an animated scroll.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}
