"use client";

import { useEffect, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { process } from "@/content/process";
import { chapterById } from "@/lib/chapters";
import { cn } from "@/lib/cn";
import { ProcessList } from "./ProcessList";

/*
 * 7D · Process Timeline. Desktop: the four guide steps are clips on an edit
 * timeline inside a sticky frame; scrolling the chapter moves the remedy
 * playhead and the active clip expands to show its copy. Underneath it is a
 * Radix Tabs pattern, so the clips work with the keyboard; choosing a clip
 * scrolls the page to it. Below 1024px, or with reduced motion, it renders
 * the static vertical stepper instead.
 */
const steps = process.steps;
const N = steps.length;

function useDesktopMotion() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem) and (prefers-reduced-motion: no-preference)");
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

function Timeline() {
  const outerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const outer = outerRef.current;
      const sticky = stickyRef.current;
      if (!outer || !sticky) return;
      // The frame sticks once the outer box's top reaches the sticky offset.
      const stickTop = parseFloat(getComputedStyle(sticky).top) || 0;
      const range = outer.offsetHeight - sticky.offsetHeight;
      const travelled = stickTop - outer.getBoundingClientRect().top;
      setProgress(Math.min(1, Math.max(0, travelled / Math.max(1, range))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.min(N - 1, Math.floor(progress * N));
  const within = progress * N - active;
  // Active column is 3fr, the rest 1fr: map progress onto that layout.
  const playhead = ((active + 3 * Math.min(1, within)) / (N + 2)) * 100;
  const columns = steps.map((_, i) => (i === active ? "3fr" : "1fr")).join(" ");

  function goTo(index: number) {
    const outer = outerRef.current;
    const sticky = stickyRef.current;
    if (!outer || !sticky) return;
    const stickTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const range = outer.offsetHeight - sticky.offsetHeight;
    const start = outer.getBoundingClientRect().top + window.scrollY - stickTop;
    window.scrollTo({ top: start + ((index + 0.5) / N) * range, behavior: "smooth" });
  }

  return (
    <div ref={outerRef} className="relative mt-10" style={{ height: `${100 + N * 45}vh` }}>
      <div
        ref={stickyRef}
        className="sticky top-[var(--header-h-condensed)] flex h-[calc(100vh-var(--header-h-condensed))] flex-col justify-center py-8"
      >
        <Tabs.Root value={String(active)} onValueChange={(v) => goTo(Number(v))} activationMode="automatic">
          {/* Pinned wayfinding while the chapter scrolls */}
          <p className="text-mono mb-10 text-fg-muted" aria-hidden="true">
            <span className="text-fg">CH {chapterById("process").number}</span> · {process.title}
          </p>
          {/* Ruler */}
          <div
            className="text-mono relative mb-3 flex justify-between text-[0.625rem] text-fg-muted"
            aria-hidden="true"
          >
            {steps.map((_, i) => (
              <span key={i}>
                00:{chapterById("process").number}:{String(i * 15).padStart(2, "0")}
              </span>
            ))}
            <span>00:{chapterById("process").number}:59</span>
          </div>

          <div className="relative">
            <Tabs.List
              aria-label={process.tabsLabel}
              className="grid gap-1 transition-[grid-template-columns] duration-[var(--dur-3)] ease-[var(--ease-cut)]"
              style={{ gridTemplateColumns: columns }}
            >
              {steps.map((step, i) => (
                <Tabs.Trigger
                  key={step.title}
                  value={String(i)}
                  className={cn(
                    "group relative flex h-28 min-w-0 flex-col justify-between overflow-hidden rounded-t-xs px-5 pt-4 pb-3 text-left transition-colors duration-[var(--dur-1)]",
                    i === active
                      ? "bg-ink-raised shadow-[inset_0_3px_0_var(--color-remedy)]"
                      : "bg-ink-raised/60 shadow-[inset_0_2px_0_var(--tone-line-strong)] hover:bg-ink-raised",
                  )}
                >
                  <span className="text-mono text-fg-muted">Clip {String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={cn(
                      "block truncate",
                      i === active ? "text-display-m text-fg" : "text-[0.9375rem] font-semibold text-fg-muted",
                    )}
                  >
                    {step.title}
                    {i === active ? ":" : ""}
                  </span>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <div
              className="grid gap-1 transition-[grid-template-columns] duration-[var(--dur-3)] ease-[var(--ease-cut)]"
              style={{ gridTemplateColumns: columns }}
            >
              {steps.map((step, i) => (
                <div key={step.title} style={{ gridColumn: i + 1, gridRow: 1 }} className="min-w-0">
                  {/* Every panel stays mounted (tabs keep valid aria-controls);
                      only the active one is visible. */}
                  <Tabs.Content
                    value={String(i)}
                    forceMount
                    hidden={i !== active}
                    className="min-h-64 rounded-b-xs bg-ink-raised px-5 pt-3 pb-8 outline-none focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <p className="text-mono text-fg-muted">
                      Step {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                    </p>
                    <p className="text-statement anim-wipe mt-3 max-w-[30ch]">
                      <span className="sr-only">{step.title}: </span>
                      {step.body}
                    </p>
                  </Tabs.Content>
                  {i !== active ? <div aria-hidden="true" className="min-h-64 rounded-b-xs bg-ink-raised/60" /> : null}
                </div>
              ))}
            </div>

            {/* Playhead */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 h-8 w-[2px] bg-remedy transition-[left] duration-[var(--dur-2)] ease-[var(--ease-cut)]"
              style={{ left: `${playhead}%` }}
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-remedy" />
            </div>
          </div>
          <p className="text-mono mt-5 text-fg-muted">{process.hint}</p>
        </Tabs.Root>
      </div>
    </div>
  );
}

export default function ProcessTimeline() {
  const desktop = useDesktopMotion();
  return desktop ? <Timeline /> : <ProcessList />;
}
