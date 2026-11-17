"use client";

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Hydrate on approach (brief §11). The server renders a static version of
 * each interactive component as `children`; once the visitor scrolls within
 * ~600px, the interactive version is fetched with dynamic import() and
 * swapped in. Until then no code for it is downloaded.
 */
const registry = {
  "inquiry-flow": lazy(() => import("@/components/interactive/InquiryFlow")),
} as const;

export type IslandName = keyof typeof registry;

export function Island({
  name,
  children,
  rootMargin = "600px 0px",
}: {
  name: IslandName;
  /** Static server render shown until the island loads. */
  children: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

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
