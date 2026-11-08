"use client";

import { useMemo, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const FILTER_EVENT = "inferra:filterchange";

/** URL-friendly form of a filter label: "SAP Basis" -> "sap-basis". */
export function filterSlug(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(FILTER_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(FILTER_EVENT, onChange);
  };
}

/**
 * Accessible filter chips. The full list is server-rendered; this component
 * only toggles visibility, so content remains available without JavaScript.
 * The chosen filter is kept in the address (e.g. /work?service=sap-basis) so a
 * filtered view can be shared or bookmarked.
 */
export function FilterableGrid({
  filters,
  items,
  allLabel = "All",
  emptyMessage,
  label,
  layout = "grid",
  param = "filter",
}: {
  filters: string[];
  items: { key: string; tags: string[]; node: React.ReactNode }[];
  allLabel?: string;
  emptyMessage: string;
  label: string;
  layout?: "grid" | "list";
  /** Query-string key that holds the active filter. */
  param?: string;
}) {
  // Read from the URL; the server render (and first hydration pass) shows everything.
  const fromUrl = useSyncExternalStore(
    subscribe,
    () => new URLSearchParams(window.location.search).get(param),
    () => null,
  );
  const active = filters.find((f) => filterSlug(f) === fromUrl) ?? null;
  const setActive = (f: string | null) => {
    const url = new URL(window.location.href);
    if (f) url.searchParams.set(param, filterSlug(f));
    else url.searchParams.delete(param);
    // Replace rather than push, so Back leaves the page instead of undoing chips.
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(FILTER_EVENT));
  };
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
              active === f ? "border-highlight/60 bg-surface-2 text-fg" : "border-line text-fg-muted hover:border-line-strong hover:text-fg",
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
