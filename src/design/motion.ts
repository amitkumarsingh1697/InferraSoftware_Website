"use client";

import { useSyncExternalStore } from "react";

/**
 * JS side of the design system. Motion timing is defined once in
 * src/design/tokens.css; these helpers read it at runtime so the motion layer
 * and CSS transitions always agree. The fallbacks only apply before CSS loads.
 */
const FALLBACK = {
  "--ease-editorial": "cubic-bezier(0.22, 1, 0.36, 1)",
  "--duration-reveal": "900ms",
  "--reveal-distance": "36px",
  "--reveal-stagger": "90ms",
} as const;

type TokenName = keyof typeof FALLBACK | `--scene-${string}`;

export function readToken(name: TokenName): string {
  if (typeof window === "undefined") return name in FALLBACK ? FALLBACK[name as keyof typeof FALLBACK] : "";
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || (name in FALLBACK ? FALLBACK[name as keyof typeof FALLBACK] : "");
}

function toSeconds(value: string): number {
  const n = parseFloat(value);
  if (Number.isNaN(n)) return 0;
  return value.endsWith("ms") ? n / 1000 : n;
}

function toBezier(value: string): [number, number, number, number] {
  const m = value.match(/cubic-bezier\(([^)]+)\)/);
  const parts = m ? m[1].split(",").map((p) => parseFloat(p)) : [];
  return parts.length === 4 && parts.every((p) => !Number.isNaN(p)) ? (parts as [number, number, number, number]) : [0.22, 1, 0.36, 1];
}

export function motionTokens() {
  return {
    ease: toBezier(readToken("--ease-editorial")),
    duration: toSeconds(readToken("--duration-reveal")),
    distance: parseFloat(readToken("--reveal-distance")) || 36,
    stagger: toSeconds(readToken("--reveal-stagger")),
  };
}

function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * True when the visitor prefers reduced motion. The server render assumes
 * motion is allowed so animated content does not flash on hydration; a
 * <noscript> rule in the root layout keeps it visible without JavaScript.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
