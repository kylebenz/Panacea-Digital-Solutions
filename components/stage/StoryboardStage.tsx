"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { heroStage } from "@/content/hero-stage";
import { cn } from "@/lib/cn";
import { Callout } from "@/components/primitives/Callout";
import { PhoneFrame } from "@/components/primitives/PhoneFrame";
import { RegistrationMarks } from "@/components/primitives/RegistrationMarks";
import { Timecode } from "@/components/primitives/Timecode";

/*
 * 7A · Storyboard Assembly. A 15-second concept ad plays out in a 9:16
 * frame — four storyboard frames, word-by-word burned-in captions, a running
 * timecode — while an infographic card assembles beside it. Video and
 * infographic, built from one brief: the two things Panacea makes.
 *
 * - Server renders the final composition (also the reduced-motion and
 *   no-JS state), so the H1 stays the LCP element and nothing shifts.
 * - Loops slowly; pauses off-screen, on hover, on focus, when the tab is
 *   hidden, and via the visible Pause control (WCAG 2.2.2).
 * - Illustrations arrive as server-rendered props, keeping this island small.
 */

const { frames, card, durationSeconds } = heroStage;
const TOTAL = durationSeconds * 1000;
const HOLD = 3200;
const LOOP = TOTAL + HOLD;
const TICK = 50;
const START_DELAY = 1400;

function frameAt(ms: number) {
  if (ms >= TOTAL) return frames.length - 1;
  const s = ms / 1000;
  return Math.max(
    0,
    frames.findIndex((f) => s < f.end),
  );
}

function wordsShown(ms: number, index: number) {
  const frame = frames[index];
  const words = frame.caption.split(" ");
  if (ms >= TOTAL) return words.length;
  const local = ms / 1000 - frame.start;
  const step = ((frame.end - frame.start) * 0.6) / words.length;
  return Math.min(words.length, Math.floor(local / step) + 1);
}

export function StoryboardStage({ arts, thumbs }: { arts: ReactNode[]; thumbs: ReactNode[] }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(TOTAL);
  const [time, setTime] = useState(TOTAL);
  const [loop, setLoop] = useState(0);
  const [started, setStarted] = useState(false);
  const [motionOK, setMotionOK] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [explicitPlay, setExplicitPlay] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setMotionOK(mq.matches);
    update();
    mq.addEventListener("change", update);
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    if (rootRef.current) observer.observe(rootRef.current);
    return () => {
      mq.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  // Hold the finished composition briefly on load, then roll from 00:00:00.
  useEffect(() => {
    if (!motionOK || started) return;
    const id = window.setTimeout(() => {
      timeRef.current = 0;
      setTime(0);
      setStarted(true);
    }, START_DELAY);
    return () => window.clearTimeout(id);
  }, [motionOK, started]);

  const running =
    motionOK && started && onScreen && pageVisible && !userPaused && (explicitPlay || (!hovered && !focused));

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      let next = timeRef.current + (now - last);
      last = now;
      if (next >= LOOP) {
        next %= LOOP;
        setLoop((n) => n + 1);
      }
      const quantised = Math.floor(next / TICK) * TICK;
      if (quantised !== Math.floor(timeRef.current / TICK) * TICK) setTime(quantised);
      timeRef.current = next;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const t = motionOK ? time : TOTAL;
  const index = frameAt(t);
  const frame = frames[index];
  const words = frame.caption.split(" ");
  const shown = wordsShown(t, index);
  const progress = Math.min(1, t / TOTAL);
  const built = card.buildAt.filter((at) => t / 1000 >= at).length;
  const paused = motionOK && started && !running;

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={heroStage.label}
      data-paused={paused || undefined}
      className="stage relative mx-auto w-full max-w-[34rem]"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false);
        setExplicitPlay(false);
      }}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
          setExplicitPlay(false);
        }
      }}
    >
      {/* Production slug row */}
      <div
        className="text-mono mb-3 flex items-center justify-between gap-3 text-[0.6875rem] text-fg-muted sm:text-[0.75rem]"
        aria-hidden="true"
      >
        <span>
          <span className="text-fg">SC {String(index + 1).padStart(2, "0")}</span> · {frame.segment}
        </span>
        <span className="flex items-center gap-3">
          <span className="hidden tabular-nums sm:inline">
            FR {index + 1}/{frames.length}
          </span>
          <span className="chip min-h-0 px-1.5 py-0.5 text-[0.625rem]">{heroStage.tag}</span>
        </span>
      </div>

      <div className="relative" aria-hidden="true">
        <PhoneFrame
          className="mr-[4%] ml-auto w-[min(17.5rem,64%)]"
          timecode={<Timecode seconds={Math.min(durationSeconds, Math.floor(t / 1000))} live={running} />}
          progress={progress}
          captionBoxed={false}
          caption={
            <>
              {words.map((word, i) => (
                // Each burned-in word carries its own background so words
                // that haven't appeared yet leave no empty caption bar.
                <span
                  key={`${loop}-${index}-${i}`}
                  className={cn(
                    "box-decoration-clone bg-ink py-0.5",
                    i === 0 && "rounded-l-xs pl-1.5",
                    i === words.length - 1 && "rounded-r-xs pr-1.5",
                    i < shown ? "caption-word" : "invisible",
                  )}
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </>
          }
        >
          <div
            key={`${loop}-${index}`}
            className="absolute inset-0"
            style={{ "--frame-duration": `${frame.end - frame.start + 0.6}s` } as CSSProperties}
          >
            {arts[index]}
          </div>
        </PhoneFrame>

        {/* The infographic card builds itself from the same brief. */}
        <div className="absolute bottom-[36%] left-0 w-[min(15.5rem,58%)] border border-line-strong bg-paper p-4 text-ink shadow-[0_18px_40px_-24px_rgb(17_24_22/0.55)] sm:p-5">
          <RegistrationMarks />
          <p className="text-mono text-[0.625rem] text-verdigris">{card.kicker}</p>
          <p
            className="font-display mt-2 text-[1.0625rem] leading-[1.15] transition-[clip-path] duration-[var(--dur-3)] ease-[var(--ease-cut)] sm:text-[1.1875rem]"
            style={{ clipPath: built >= 1 ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
          >
            {card.title}
          </p>
          <ol className="mt-3 grid gap-2.5">
            {card.steps.map((step, i) => {
              const on = built >= i + 2;
              return (
                <li key={step} className="flex items-center gap-2">
                  <Callout
                    n={i + 1}
                    active={on && built === i + 2 && t < TOTAL}
                    className={cn(
                      "h-6 w-6 text-[0.625rem] transition-opacity duration-[var(--dur-2)]",
                      on ? "opacity-100" : "opacity-25",
                    )}
                  />
                  <span
                    className="leader-in h-px w-4 shrink-0 bg-verdigris"
                    style={{ transform: on ? "scaleX(1)" : "scaleX(0)" }}
                  />
                  <span
                    className="text-[0.8125rem] leading-tight font-medium transition-[clip-path] duration-[var(--dur-3)] ease-[var(--ease-cut)] sm:text-[0.875rem]"
                    style={{ clipPath: on ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
                  >
                    {step}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Storyboard strip: the four frames with the current one marked. */}
      <div className="mt-5 flex items-end gap-3">
        <ol
          className="grid flex-1 grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
          aria-hidden="true"
        >
          {frames.map((f, i) => (
            <li key={f.start} className="grid gap-1.5">
              <span
                className={cn(
                  "block h-[2px] transition-colors duration-[var(--dur-1)]",
                  i === index ? "bg-remedy" : "bg-rule-strong",
                )}
              />
              <span className="flex items-center gap-2">
                <span className="relative block aspect-[9/16] w-7 shrink-0 overflow-hidden rounded-[3px]">
                  {thumbs[i]}
                </span>
                <span className="text-mono grid gap-0.5 text-[0.625rem] leading-tight">
                  <span className={i === index ? "text-fg" : "text-fg-muted"}>{f.segment}</span>
                  <span className="text-fg-muted tabular-nums">
                    {String(f.start).padStart(2, "0")}–{String(f.end).padStart(2, "0")}s
                  </span>
                </span>
              </span>
            </li>
          ))}
        </ol>
        {motionOK ? (
          <button
            type="button"
            onClick={() => {
              // Pause is persistent. Play overrides the hover/focus pause until
              // the pointer or focus leaves the stage.
              if (userPaused) {
                setUserPaused(false);
                setExplicitPlay(true);
              } else {
                setUserPaused(true);
                setExplicitPlay(false);
              }
            }}
            className="text-mono inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xs px-2 text-fg shadow-[inset_0_0_0_1px_var(--tone-line-strong)]"
          >
            {!userPaused ? (
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
                <path d="M2 1h2v8H2zM6 1h2v8H6z" fill="currentColor" />
              </svg>
            ) : (
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true">
                <path d="M2 1l7 4-7 4z" fill="currentColor" />
              </svg>
            )}
            <span>{userPaused ? "Play" : "Pause"}</span>
            <span className="sr-only"> storyboard</span>
          </button>
        ) : null}
      </div>

      {/* Same content for assistive technology, without the motion. */}
      <div className="sr-only">
        <p>Illustrative concept. Storyboard for a {durationSeconds}-second ad:</p>
        <ol>
          {frames.map((f) => (
            <li key={f.start}>
              {f.segment}, {f.start} to {f.end} seconds: “{f.caption}” {f.shotNote}.
            </li>
          ))}
        </ol>
        <p>Matching infographic, “{card.title}”:</p>
        <ol>
          {card.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
