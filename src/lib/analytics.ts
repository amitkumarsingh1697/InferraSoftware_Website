/**
 * Privacy-conscious analytics wrapper.
 *
 * Tracking is OFF unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. Plausible is the
 * default because it is cookieless and does not collect personal data, which
 * keeps consent requirements light (confirm with your legal adviser for your
 * markets). Any provider exposing a similar function can be swapped in here.
 */
export type AnalyticsEvent =
  | "cta_click"
  | "call_click"
  | "booking_click"
  | "enquiry_submitted"
  | "enquiry_failed"
  | "partnership_enquiry"
  | "career_enquiry"
  | "service_view"
  | "case_study_view"
  | "article_read";

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);

export function track(event: AnalyticsEvent, props?: Props) {
  if (typeof window === "undefined") return;
  if (!analyticsEnabled) {
    if (process.env.NODE_ENV !== "production") console.debug("[analytics:disabled]", event, props ?? {});
    return;
  }
  window.plausible?.(event, props ? { props } : undefined);
}
