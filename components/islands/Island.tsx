"use client";

import type { StoryArtKind } from "@/content/hero-stage";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

/*
 * Hydrate on approach (brief §11). The server renders a static version of
 * each interactive chapter component as `children`; once the visitor scrolls
 * within ~600px, the interactive version is fetched with dynamic import()
 * and swapped in. Until then no code for it is downloaded.
 */
const registry = {
  "ad-anatomy": lazy(() => import("@/components/interactive/AdAnatomyPlayer")),
  "infographic-anatomy": lazy(() => import("@/components/interactive/InfographicAnatomy")),
  "script-to-screen": lazy(() => import("@/components/interactive/ScriptToScreen")),
  "process-timeline": lazy(() => import("@/components/interactive/ProcessTimeline")),
  "audience-chips": lazy(() => import("@/components/interactive/AudienceChips")),
  "portfolio-explorer": lazy(() => import("@/components/interactive/PortfolioExplorer")),
  "revision-explainer": lazy(() => import("@/components/interactive/RevisionExplainer")),
} as const;

export type IslandName = keyof typeof registry;

export function Island({
  name,
  children,
  slots,
  rootMargin = "600px 0px",
}: {
  name: IslandName;
  /** Static server render shown until the island loads. */
  children: ReactNode;
  /** Server-rendered nodes (e.g. SVG artwork) handed to the interactive version. */
  slots?: {
    arts?: ReactNode[];
    artMap?: Partial<Record<StoryArtKind, ReactNode>>;
    artBySlug?: Record<string, ReactNode>;
  };
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
          <Interactive {...slots} />
        </Suspense>
      ) : (
        children
      )}
    </div>
  );
}
