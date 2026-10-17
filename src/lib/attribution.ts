/**
 * First-touch lead attribution. On the first page view of a browser session we
 * keep UTM parameters, the referring domain (not the full URL) and the landing
 * path in sessionStorage. It is sent only if the visitor submits an enquiry,
 * and is cleared when the browser session ends. No cookies are set.
 */
export const ATTRIBUTION_KEY = "inferra:attribution";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing?: string;
}

const clip = (v: string) => v.slice(0, 120);

export function captureAttribution() {
  try {
    if (sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const url = new URL(window.location.href);
    const data: Attribution = {};
    for (const key of UTM_KEYS) {
      const value = url.searchParams.get(key);
      if (value) data[key] = clip(value);
    }
    if (document.referrer) {
      const ref = new URL(document.referrer);
      if (ref.host !== url.host) data.referrer = clip(ref.host);
    }
    data.landing = clip(url.pathname);
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable (private mode, blocked): attribution is optional.
  }
}

export function readAttribution(): Attribution | undefined {
  try {
    const raw = sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : undefined;
  } catch {
    return undefined;
  }
}
