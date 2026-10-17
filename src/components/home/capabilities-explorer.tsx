"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ExplorerPillar {
  id: string;
  label: string;
  code: string;
  tagline: string;
  description: string;
  services: { title: string; href: string; summary: string }[];
}

// Node positions on the system map (viewBox 0 0 400 400), clockwise from the top.
const POSITIONS = [
  { x: 200, y: 52 },
  { x: 341, y: 154 },
  { x: 287, y: 320 },
  { x: 113, y: 320 },
  { x: 59, y: 154 },
];

/**
 * Interactive capability map. Implemented as an ARIA tabs widget: arrow keys
 * move between pillars, and each tab's panel links to the relevant services.
 */
export function CapabilitiesExplorer({ pillars }: { pillars: ExplorerPillar[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<Record<"m" | "d", (HTMLButtonElement | null)[]>>({ m: [], d: [] });
  const current = pillars[active];

  const onKeyDown = (e: React.KeyboardEvent, index: number, layout: "m" | "d") => {
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % pillars.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + pillars.length) % pillars.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = pillars.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[layout][next]?.focus();
  };

  const tab = (p: ExplorerPillar, i: number, layout: "m" | "d", extra?: string) => (
    <button
      key={p.id}
      ref={(el) => {
        tabRefs.current[layout][i] = el;
      }}
      role="tab"
      id={`${baseId}-${layout}-tab-${i}`}
      aria-selected={active === i}
      aria-controls={`${baseId}-panel`}
      tabIndex={active === i ? 0 : -1}
      onClick={() => setActive(i)}
      onKeyDown={(e) => onKeyDown(e, i, layout)}
      className={cn(
        "group rounded-xl border px-3.5 py-2.5 text-left transition-[border-color,background-color,box-shadow] duration-200",
        active === i
          ? "border-cyan/60 bg-surface-2 shadow-[0_0_0_1px_rgb(103_232_249/0.25),0_0_28px_-6px_rgb(103_232_249/0.45)]"
          : "border-line bg-ink-2/90 hover:border-line-strong",
        extra,
      )}
    >
      <span className="block font-mono text-[0.62rem] tracking-[0.2em] text-cyan">{p.code}</span>
      <span className="block font-display text-sm font-semibold text-fg sm:text-base">{p.label}</span>
    </button>
  );

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      {/* system map (desktop) and tab list */}
      <div className="relative">
        <div role="tablist" aria-label="Capability areas" aria-orientation="horizontal" className="flex gap-2 overflow-x-auto pb-2 lg:hidden">
          {pillars.map((p, i) => tab(p, i, "m", "shrink-0"))}
        </div>

        <div className="relative mx-auto hidden aspect-square w-full max-w-[460px] lg:block">
          <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <radialGradient id="cx-core" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#fff" />
                <stop offset="0.35" stopColor="#67E8F9" stopOpacity="0.8" />
                <stop offset="1" stopColor="#8B5CF6" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="200" cy="200" r="150" fill="none" stroke="#A78BFA" strokeOpacity="0.12" />
            <circle cx="200" cy="200" r="104" fill="none" stroke="#A78BFA" strokeOpacity="0.1" strokeDasharray="2 8" />
            <polygon points={POSITIONS.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke="#A78BFA" strokeOpacity="0.14" />
            {POSITIONS.map((p, i) => (
              <path
                key={i}
                d={`M200 200 L${p.x} ${p.y}`}
                stroke={i === active ? "#67E8F9" : "#A78BFA"}
                strokeOpacity={i === active ? 0.9 : 0.18}
                strokeWidth={i === active ? 2 : 1}
                strokeDasharray={i === active ? "5 7" : undefined}
                className={i === active ? "animate-stream" : undefined}
                style={{ transition: "stroke-opacity 300ms" }}
              />
            ))}
            <circle cx="200" cy="200" r="56" fill="url(#cx-core)" opacity="0.55" />
            <circle cx="200" cy="200" r="8" fill="#fff" />
            <ellipse cx="200" cy="200" rx="40" ry="12" fill="none" stroke="#C4B5FD" strokeOpacity="0.6" transform="rotate(-18 200 200)" />
          </svg>
          <div role="tablist" aria-label="Capability areas" aria-orientation="horizontal">
            {pillars.map((p, i) => (
              <div
                key={p.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(POSITIONS[i].x / 400) * 100}%`, top: `${(POSITIONS[i].y / 400) * 100}%` }}
              >
                {tab(p, i, "d", "min-w-[8.5rem] text-center")}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-d-tab-${active}`}
        tabIndex={0}
        className="panel brackets p-6 sm:p-8"
      >
        <div key={current.id} className="animate-[fadein_400ms_ease-out]">
          <p className="font-mono text-xs tracking-[0.2em] text-cyan">
            {current.code} · {current.label.toUpperCase()}
          </p>
          <h3 className="mt-3 text-2xl font-semibold leading-snug text-fg sm:text-3xl">{current.tagline}</h3>
          <p className="mt-4 leading-relaxed text-fg-muted">{current.description}</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {current.services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} className="group flex items-start justify-between gap-4 py-4">
                  <span>
                    <span className="block font-medium text-fg group-hover:text-cyan">{s.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-fg-muted">{s.summary}</span>
                  </span>
                  <ArrowUpRight aria-hidden className="mt-1 h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
