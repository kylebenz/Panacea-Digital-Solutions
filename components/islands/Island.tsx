"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Hydrate on approach (brief §11). The server renders a static version of
 * each interactive component as `children`; once the visitor scrolls within
 * ~600px, the interactive version is fetched with dynamic import() and
 * swapped in. Until then no code for it is downloaded.
 *
 * To keep the chunk's evaluation out of scroll gestures, it is fetched during
 * the first pause in scrolling once the island is within `farMargin`. If the
 * reader keeps scrolling (or jumps by anchor) and reaches `rootMargin`, it
 * loads at once, as before, so it is always ready before it is on screen.
 */
const SCROLL_QUIET_MS = 150;

function whenScrollSettles(run: () => void) {
  const hasIdle = typeof window.requestIdleCallback === "function";
  let timer = 0;
  let idle = 0;
  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      window.removeEventListener("scroll", schedule);
      idle = hasIdle ? window.requestIdleCallback(run, { timeout: 500 }) : window.setTimeout(run, 0);
    }, SCROLL_QUIET_MS);
  };
  window.addEventListener("scroll", schedule, { passive: true });
  schedule();
  return () => {
    window.removeEventListener("scroll", schedule);
    window.clearTimeout(timer);
    if (hasIdle) window.cancelIdleCallback(idle);
    else window.clearTimeout(idle);
  };
}
const registry = {
  "inquiry-flow": lazy(() => import("@/components/interactive/InquiryFlow")),
} as const;

export type IslandName = keyof typeof registry;

export function Island({
  name,
  children,
  rootMargin = "600px 0px",
  farMargin = "1600px 0px",
}: {
  name: IslandName;
  /** Static server render shown until the island loads. */
  children: ReactNode;
  /** Within this distance the island loads immediately. */
  rootMargin?: string;
  /** Within this distance it loads at the next pause in scrolling. */
  farMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelSettle: (() => void) | null = null;
    const load = () => {
      cleanup();
      setNear(true);
    };
    const near = new IntersectionObserver(([entry]) => entry.isIntersecting && load(), { rootMargin });
    const far = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !cancelSettle) cancelSettle = whenScrollSettles(load);
      },
      { rootMargin: farMargin },
    );
    function cleanup() {
      near.disconnect();
      far.disconnect();
      cancelSettle?.();
    }
    near.observe(el);
    far.observe(el);
    return cleanup;
  }, [rootMargin, farMargin]);

  const Interactive = registry[name];
  return (
    <div ref={ref} data-island={name} data-hydrated={near || undefined}>
      {near ? (
        <Suspense fallback={children}>
          <Interactive />
        </Suspense>
      ) : (
        children
      )}
    </div>
  );
}
