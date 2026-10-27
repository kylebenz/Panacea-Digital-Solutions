"use client";

/*
 * In-page anchor navigation.
 *
 * - Uses native smooth scrolling (CSS scroll-behavior; off under reduced
 *   motion) — no scroll-jacking.
 * - Moves focus to the target chapter heading (tabindex="-1") so keyboard
 *   and screen-reader users land where sighted users do.
 * - Corrects the landing position once scrolling ends, because chapters
 *   using content-visibility: auto can change height as they render.
 */

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function focusTarget(target: HTMLElement) {
  const heading =
    target.querySelector<HTMLElement>("[data-chapter-heading]") ?? (target.matches("[tabindex]") ? target : null);
  const focusable = heading ?? target;
  if (!focusable.hasAttribute("tabindex")) focusable.setAttribute("tabindex", "-1");
  focusable.focus({ preventScroll: true });
}

const nextFrame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

/** Resolves once the page has stopped scrolling for ~6 frames. */
async function scrollSettled(limitMs = 2500) {
  const started = performance.now();
  let last = window.scrollY;
  let still = 0;
  while (still < 6 && performance.now() - started < limitMs) {
    await nextFrame();
    still = window.scrollY === last ? still + 1 : 0;
    last = window.scrollY;
  }
}

let settleToken = 0;

/*
 * Deferred chapters render at an estimated height until they are near the
 * viewport, so the first scroll can land off target. Re-measure and nudge
 * (instantly) until the target sits at its scroll margin.
 */
async function settle(target: HTMLElement) {
  const token = ++settleToken;
  await scrollSettled();

  const correct = () => {
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const drift = target.getBoundingClientRect().top - margin;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
    if (Math.abs(drift) <= 2 || (drift > 0 && atBottom)) return true;
    window.scrollBy({ top: drift, behavior: "instant" as ScrollBehavior });
    return false;
  };

  for (let attempt = 0; attempt < 5; attempt++) {
    if (token !== settleToken) return; // a newer navigation took over
    if (correct()) break;
    await nextFrame();
    await nextFrame();
  }

  // Islands near the landing spot hydrate on approach and can change the
  // page height after we land. Keep the target in place through those late
  // layout changes for a short while, until the reader scrolls themselves.
  if (token !== settleToken) return;
  const stop = () => {
    observer.disconnect();
    clearTimeout(timer);
    for (const type of USER_SCROLL_EVENTS) window.removeEventListener(type, stop);
  };
  const observer = new ResizeObserver(() => {
    if (token !== settleToken) return stop();
    correct();
  });
  observer.observe(document.body);
  const timer = setTimeout(stop, 2000);
  for (const type of USER_SCROLL_EVENTS) window.addEventListener(type, stop, { once: true, passive: true });
}

const USER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

export function scrollToId(id: string, { updateHash = true } = {}) {
  const target = document.getElementById(id);
  if (!target) return false;
  if (updateHash && window.location.hash !== `#${id}`) {
    history.pushState(null, "", `#${id}`);
  }
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "instant" : "smooth",
    block: "start",
  });
  focusTarget(target);
  void settle(target);
  return true;
}

/** Returns the in-page id an anchor points at, or null for other links. */
export function inPageId(anchor: HTMLAnchorElement): string | null {
  if (anchor.target && anchor.target !== "_self") return null;
  const href = anchor.getAttribute("href");
  if (!href || !href.includes("#")) return null;
  const url = new URL(href, window.location.href);
  if (url.origin !== window.location.origin) return null;
  if (url.pathname !== window.location.pathname) return null;
  const id = decodeURIComponent(url.hash.slice(1));
  return id || null;
}

export function handleAnchorClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = (event.target as Element | null)?.closest("a");
  if (!anchor) return;
  const id = inPageId(anchor);
  if (!id || !document.getElementById(id)) return;
  event.preventDefault();
  // Query-string links such as /?package=growth#contact keep their query.
  // Next.js syncs useSearchParams with native history.pushState.
  const url = new URL(anchor.href);
  if (url.search && url.search !== window.location.search) {
    history.pushState(null, "", `${url.pathname}${url.search}#${id}`);
    scrollToId(id, { updateHash: false });
    return;
  }
  scrollToId(id);
}
