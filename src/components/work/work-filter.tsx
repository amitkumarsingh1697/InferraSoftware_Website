"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Accessible filter chips. The full list is server-rendered; this component
 * only toggles visibility, so content remains available without JavaScript.
 */
export function FilterableGrid({
  filters,
  items,
  allLabel = "All",
  emptyMessage,
  label,
  layout = "grid",
}: {
  filters: string[];
  items: { key: string; tags: string[]; node: React.ReactNode }[];
  allLabel?: string;
  emptyMessage: string;
  label: string;
  layout?: "grid" | "list";
}) {
  const [active, setActive] = useState<string | null>(null);
  const visible = useMemo(() => items.filter((i) => !active || i.tags.includes(active)), [items, active]);

  return (
    <div>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {[null, ...filters].map((f) => (
          <button
            key={f ?? "all"}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className={cn(
              "min-h-10 rounded-full border px-4 py-2 text-sm transition-colors",
              active === f ? "border-cyan/60 bg-surface-2 text-fg" : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
            )}
          >
            {f ?? allLabel}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {visible.length} {visible.length === 1 ? "item" : "items"} shown
      </p>
      {visible.length === 0 ? (
        <p className="mt-10 rounded-[var(--radius-panel)] border border-dashed border-line-strong p-10 text-center text-fg-muted">{emptyMessage}</p>
      ) : (
        <ul className={layout === "list" ? "mt-10 divide-y divide-line border-y border-line" : "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"}>
          {visible.map((i) => (
            <li key={i.key}>{i.node}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
