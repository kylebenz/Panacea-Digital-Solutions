"use client";

import { useEffect, useRef, useState } from "react";
import { chapterHref, chapterTimecode, chapters } from "@/lib/chapters";
import { globalCopy } from "@/content/global";
import { cn } from "@/lib/cn";
import { formatTimecode } from "@/components/primitives/Timecode";
import { ACTIVE_BAND, useWayfinding } from "@/lib/wayfinding/store";

/*
 * 7B · Chapter Rail. A vertical scrubber on the right edge (≥1024px).
 * Ticks sit where each chapter actually falls in the scroll, so long
 * chapters read as long clips. Ticks are nudged apart to keep 24px targets,
 * and the playhead is mapped through the same nudge so it crosses each tick
 * exactly when that chapter becomes active.
 */

const MIN_GAP = 26; // px between tick centres (24px targets + breathing room)

type Layout = { raw: number[]; shown: number[]; height: number };

function measure(track: HTMLElement): Layout {
  const doc = document.documentElement;
  const max = Math.max(1, doc.scrollHeight - window.innerHeight);
  const band = window.innerHeight * ACTIVE_BAND;
  const height = track.clientHeight;

  const raw = chapters.map((chapter) => {
    const el = document.getElementById(chapter.id);
    if (!el) return 0;
    const top = el.getBoundingClientRect().top + window.scrollY;
    return Math.min(1, Math.max(0, (top - band) / max));
  });

  // Forward pass enforces the minimum gap; backward pass keeps the last
  // tick inside the track.
  const shown = raw.map((r) => r * height);
  for (let i = 1; i < shown.length; i++) shown[i] = Math.max(shown[i], shown[i - 1] + MIN_GAP);
  shown[shown.length - 1] = Math.min(shown[shown.length - 1], height);
  for (let i = shown.length - 2; i >= 0; i--) shown[i] = Math.min(shown[i], shown[i + 1] - MIN_GAP);
  return { raw, shown, height };
}

/** Maps raw scroll progress onto the nudged tick scale. */
function playheadY(progress: number, layout: Layout) {
  const { raw, shown, height } = layout;
  if (progress <= raw[0]) return shown[0];
  for (let i = 0; i < raw.length - 1; i++) {
    if (progress < raw[i + 1]) {
      const span = raw[i + 1] - raw[i] || 1;
      const t = (progress - raw[i]) / span;
      return shown[i] + t * (shown[i + 1] - shown[i]);
    }
  }
  const last = raw.length - 1;
  const t = (progress - raw[last]) / Math.max(1e-6, 1 - raw[last]);
  return shown[last] + t * (height - shown[last]);
}

export function ChapterRail() {
  const activeId = useWayfinding((s) => s.activeId);
  const progress = useWayfinding((s) => s.progress);
  const trackRef = useRef<HTMLOListElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [tipsSuppressed, setTipsSuppressed] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setLayout(measure(track)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    observer.observe(track);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const activeIndex = Math.max(
    0,
    chapters.findIndex((chapter) => chapter.id === activeId),
  );
  const active = chapters[activeIndex];

  // Running reel timecode: chapter number as minutes, progress through the
  // chapter as seconds.
  let seconds = activeIndex * 60;
  if (layout) {
    const start = layout.raw[activeIndex];
    const end = layout.raw[activeIndex + 1] ?? 1;
    const t = Math.min(1, Math.max(0, (progress - start) / Math.max(1e-6, end - start)));
    seconds += Math.min(59, Math.floor(t * 60));
  }

  return (
    <nav
      aria-label={globalCopy.railLabel}
      data-tone={active.tone}
      data-tips-suppressed={tipsSuppressed || undefined}
      onKeyDown={(event) => {
        if (event.key === "Escape") setTipsSuppressed(true);
      }}
      onPointerLeave={() => setTipsSuppressed(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setTipsSuppressed(false);
      }}
      className="chapter-rail fixed top-[calc(var(--header-h-condensed)+1.25rem)] right-2 bottom-5 z-30 hidden w-11 flex-col items-center rounded-xs py-3 shadow-[inset_0_0_0_1px_var(--tone-line)] transition-colors duration-[var(--dur-2)] ease-[var(--ease-cut)] lg:flex"
    >
      <p className="text-mono mb-3 text-[0.625rem] text-fg-muted" aria-hidden="true">
        Reel
      </p>
      <ol ref={trackRef} className="relative w-full flex-1">
        {/* Track */}
        <span aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-rule-strong" />
        {/* Playhead */}
        {layout ? (
          <span
            aria-hidden="true"
            className="absolute left-1/2 z-10 h-[3px] w-7 -translate-x-1/2 -translate-y-1/2 bg-remedy"
            style={{ top: playheadY(progress, layout) }}
          />
        ) : null}
        {chapters.map((chapter, index) => {
          const current = chapter.id === active.id;
          const top = layout ? layout.shown[index] : (index / (chapters.length - 1)) * 100;
          return (
            <li
              key={chapter.id}
              className="absolute left-0 z-20 w-full -translate-y-1/2"
              style={{ top: layout ? top : `${top}%` }}
            >
              <a
                href={chapterHref(chapter.id)}
                aria-current={current ? "location" : undefined}
                aria-label={`Chapter ${chapter.number}: ${chapter.label}`}
                className="rail-tick group relative flex h-6 w-full items-center justify-center no-underline"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "relative z-20 rounded-xs px-0.5 font-mono text-[0.6875rem] leading-none font-medium tabular-nums transition-colors duration-[var(--dur-1)]",
                    current ? "bg-fg text-bg" : "bg-bg text-fg-muted group-hover:text-fg",
                  )}
                >
                  {chapter.number}
                </span>
                <span
                  aria-hidden="true"
                  className="rail-tip text-mono pointer-events-none absolute right-[calc(100%+0.625rem)] whitespace-nowrap rounded-xs bg-ink px-2 py-1.5 text-paper opacity-0 shadow-[0_0_0_1px_var(--color-line-on-ink)] transition-[opacity,translate] duration-[var(--dur-1)] ease-[var(--ease-cut)]"
                >
                  CH {chapter.number} · {chapterTimecode(chapter.number)} — {chapter.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <p
        className="text-mono mt-3 text-[0.625rem] text-fg-muted [writing-mode:vertical-rl] rotate-180"
        aria-hidden="true"
      >
        {formatTimecode(seconds)}
      </p>
    </nav>
  );
}
