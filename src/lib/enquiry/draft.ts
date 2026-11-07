/**
 * Unsent enquiry drafts, kept in sessionStorage so a refresh, an accidental
 * back navigation or a visit to another page doesn't lose what was typed.
 * sessionStorage is per tab and cleared when the tab closes, so details are
 * never left behind on a shared computer. Storage can be unavailable (private
 * mode, blocked site data); every access is wrapped and failures are ignored.
 */
export const DRAFT_KEY = "inferra:enquiry-draft";
const MAX_AGE_MS = 24 * 60 * 60_000;

/** Fields a visitor types; if none has content there is nothing worth keeping. */
const TYPED_FIELDS = ["fullName", "email", "company", "jobTitle", "message", "portfolioUrl"] as const;

export function hasTypedContent(form: Record<string, unknown>): boolean {
  return TYPED_FIELDS.some((k) => typeof form[k] === "string" && (form[k] as string).trim() !== "");
}

export function loadDraft<T extends Record<string, unknown>>(base: T, now = Date.now()): T | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { savedAt?: number; form?: Record<string, unknown> };
    if (!parsed.form || typeof parsed.savedAt !== "number" || now - parsed.savedAt > MAX_AGE_MS) {
      clearDraft();
      return null;
    }
    // Only take known fields, with the same type as the blank form.
    const next = { ...base };
    for (const key of Object.keys(base) as (keyof T)[]) {
      const value = parsed.form[key as string];
      if (key !== "website" && typeof value === typeof base[key]) next[key] = value as T[keyof T];
    }
    return hasTypedContent(next) ? next : null;
  } catch {
    return null;
  }
}

export function saveDraft(form: Record<string, unknown>, now = Date.now()): void {
  try {
    if (!hasTypedContent(form)) return clearDraft();
    // The honeypot is never stored.
    const { website: _honeypot, ...rest } = form;
    void _honeypot;
    window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ savedAt: now, form: rest }));
  } catch {
    // Storage full or blocked: the form still works, it just isn't saved.
  }
}

export function clearDraft(): void {
  try {
    window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // ignore
  }
}
