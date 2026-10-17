"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track, analyticsEnabled, type AnalyticsEvent } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

/**
 * - Loads the analytics script only when configured.
 * - Captures first-touch attribution for the enquiry form.
 * - Delegated click tracking: any element with data-track="event_name"
 *   (and optional data-track-label) reports a click. Server components can
 *   opt in with a plain attribute and no client JavaScript of their own.
 */
export function Analytics() {
  useEffect(() => {
    captureAttribution();
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const event = el.dataset.track as AnalyticsEvent;
      const label = el.dataset.trackLabel;
      track(event, { ...(label ? { label } : {}), path: window.location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!analyticsEnabled) return null;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";
  return <Script src={src} data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN} strategy="afterInteractive" />;
}

/** Fires a page-level event once, e.g. a service or case-study view. */
export function TrackView({ event, label }: { event: AnalyticsEvent; label: string }) {
  useEffect(() => {
    track(event, { label });
  }, [event, label]);
  return null;
}
