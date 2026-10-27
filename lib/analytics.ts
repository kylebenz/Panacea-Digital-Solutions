/*
 * Event tracking. Only event names and a step number are ever sent — never
 * form field values (guardrail 7: no PHI to analytics). Plausible is
 * cookieless; GA4 receives events only after consent (wired in Phase 7).
 */
type EventName = "inquiry_step" | "inquiry_submit";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string | number> }) => void;
    __panaceaConsent?: boolean;
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, props?: { step: number }) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
  if (window.__panaceaConsent && window.gtag) window.gtag("event", event, props ?? {});
}
