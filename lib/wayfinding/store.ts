"use client";

import { useSyncExternalStore } from "react";

/*
 * One shared scroll/visibility store for the header scrollspy, chapter rail,
 * mobile chapter label, and mobile CTA bar. Observers are created lazily on
 * the first subscriber and torn down with the last, so pages without
 * chapters (privacy, terms) pay nothing.
 */

export type WayfindingState = {
  activeId: string | null;
  /** 0–1 scroll progress through the whole document. */
  progress: number;
  condensed: boolean;
  heroVisible: boolean;
  contactVisible: boolean;
};

const initialState: WayfindingState = {
  activeId: null,
  progress: 0,
  condensed: false,
  heroVisible: true,
  contactVisible: false,
};

let state = initialState;
const listeners = new Set<() => void>();
let teardown: (() => void) | null = null;

function setState(patch: Partial<WayfindingState>) {
  let changed = false;
  for (const key of Object.keys(patch) as Array<keyof WayfindingState>) {
    if (state[key] !== patch[key]) {
      changed = true;
      break;
    }
  }
  if (!changed) return;
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener());
}

/** The band at 40% of the viewport height decides which chapter is active. */
export const ACTIVE_BAND = 0.4;

function start() {
  const chapters = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));

  let frame = 0;
  const measure = () => {
    frame = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    setState({
      progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
      condensed: y > 8,
    });
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(measure);
  };
  measure();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  const visible = new Set<string>();
  const activeObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).id;
        if (entry.isIntersecting) visible.add(id);
        else visible.delete(id);
      }
      // If two chapters straddle the band (rare), the later one wins.
      const current = chapters.filter((chapter) => visible.has(chapter.id)).pop();
      if (current) setState({ activeId: current.id });
    },
    {
      rootMargin: `-${ACTIVE_BAND * 100}% 0px -${(1 - ACTIVE_BAND) * 100 - 0.5}% 0px`,
    },
  );
  chapters.forEach((chapter) => activeObserver.observe(chapter));

  const hero = document.getElementById("top");
  const contact = document.getElementById("contact");
  const edgeObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.target === hero) setState({ heroVisible: entry.isIntersecting });
      if (entry.target === contact) setState({ contactVisible: entry.isIntersecting });
    }
  });
  if (hero) edgeObserver.observe(hero);
  if (contact) edgeObserver.observe(contact);
  if (!hero) setState({ heroVisible: false });

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    activeObserver.disconnect();
    edgeObserver.disconnect();
    state = initialState;
  };
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!teardown) teardown = start();
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && teardown) {
      teardown();
      teardown = null;
    }
  };
}

/** Re-reads the DOM after a client-side route change. */
export function restartWayfinding() {
  if (!teardown) return;
  teardown();
  teardown = start();
  listeners.forEach((listener) => listener());
}

export function useWayfinding<T>(selector: (s: WayfindingState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(initialState),
  );
}
