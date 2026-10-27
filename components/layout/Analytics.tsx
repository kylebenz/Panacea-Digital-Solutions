"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { consent } from "@/content/consent";
import { Button } from "@/components/primitives/Button";

/*
 * Analytics (brief §2): cookieless Plausible by default; GA4 only after the
 * visitor accepts the consent banner. Both are configured through env vars
 * and render nothing when unset.
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN   e.g. panaceadigital.com
 *   NEXT_PUBLIC_PLAUSIBLE_SRC      optional self-hosted script URL
 *   NEXT_PUBLIC_GA4_ID             e.g. G-XXXXXXX (enables the banner)
 */
const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleSrc = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";
const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
const STORAGE_KEY = "panacea-analytics-consent";

type Choice = "granted" | "denied" | "unset";
const CHANGE_EVENT = "panacea-consent-change";

function readChoice(): Choice {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset";
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function Analytics() {
  // "pending" on the server and during hydration, so the banner never flashes.
  const choice = useSyncExternalStore<Choice | "pending">(subscribe, readChoice, () => "pending");

  useEffect(() => {
    // Queue events fired before the Plausible script arrives.
    if (plausibleDomain && !window.plausible) {
      const queue: unknown[][] = [];
      const stub = (...args: unknown[]) => void queue.push(args);
      (stub as unknown as { q: unknown[][] }).q = queue;
      window.plausible = stub as Window["plausible"];
    }
  }, []);

  function decide(next: "granted" | "denied") {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable: the banner returns on the next visit */
    }
    window.__panaceaConsent = next === "granted";
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }

  useEffect(() => {
    window.__panaceaConsent = choice === "granted";
  }, [choice]);

  return (
    <>
      {plausibleDomain ? (
        <Script defer data-domain={plausibleDomain} src={plausibleSrc} strategy="afterInteractive" />
      ) : null}

      {ga4 && choice === "granted" ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}
          </Script>
        </>
      ) : null}

      {ga4 && choice === "unset" ? (
        <section
          data-tone="paper"
          aria-label={consent.label}
          className="fixed inset-x-3 bottom-3 z-40 border border-rule-strong p-4 shadow-[0_18px_40px_-24px_rgb(17_24_22/0.55)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md"
        >
          <p className="text-small">
            {consent.body}{" "}
            <a href={consent.privacy.href} className="underline">
              {consent.privacy.label}
            </a>
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => decide("granted")}>
              {consent.accept}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => decide("denied")}>
              {consent.decline}
            </Button>
          </div>
        </section>
      ) : null}
    </>
  );
}
