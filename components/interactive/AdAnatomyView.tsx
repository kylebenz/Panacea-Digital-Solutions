import type { HTMLAttributes, ReactNode, Ref } from "react";
import { adVideos } from "@/content/ad-videos";
import { heroStage } from "@/content/hero-stage";
import { cn } from "@/lib/cn";
import { PhoneFrame } from "@/components/primitives/PhoneFrame";
import { Timecode, formatTimecode } from "@/components/primitives/Timecode";

/*
 * 7E · Anatomy of a Short Ad — presentational markup shared by the static
 * server render and the interactive player, so swapping one for the other on
 * approach doesn't move anything. No hooks here.
 */

const { anatomy } = adVideos;
export const AD_DURATION = heroStage.durationSeconds;
export const segments = anatomy.segments;

export function segmentAt(seconds: number) {
  return segments.find((s) => seconds < s.end) ?? segments[segments.length - 1];
}

function frameIndexAt(seconds: number) {
  const index = heroStage.frames.findIndex((f) => seconds < f.end);
  return index === -1 ? heroStage.frames.length - 1 : index;
}

/** Caption words revealed as the playhead moves through a frame. */
function captionAt(seconds: number) {
  const frame = heroStage.frames[frameIndexAt(seconds)];
  const words = frame.caption.split(" ");
  const local = (seconds - frame.start) / (frame.end - frame.start);
  const shown =
    seconds >= AD_DURATION ? words.length : Math.min(words.length, Math.floor(local * words.length * 1.4) + 1);
  return { words, shown };
}

export function valueText(seconds: number) {
  return `${formatTimecode(seconds)}, ${segmentAt(seconds).name}`;
}

const pct = (seconds: number) => `${(seconds / AD_DURATION) * 100}%`;

type Props = {
  /** Playhead position in seconds. */
  position: number;
  /** Static (no-JS / pre-hydration) rendering lists every annotation. */
  mode: "static" | "interactive";
  /** Server-rendered storyboard frames, indexed like heroStage.frames. */
  arts: ReactNode[];
  trackRef?: Ref<HTMLDivElement>;
  trackProps?: HTMLAttributes<HTMLDivElement>;
  thumbProps?: HTMLAttributes<HTMLDivElement>;
};

export function AdAnatomyView({ position, mode, arts, trackRef, trackProps, thumbProps }: Props) {
  const segment = segmentAt(position);
  const frameIndex = frameIndexAt(position);
  const { words, shown } = captionAt(position);

  return (
    <div className="grid-12 items-start gap-y-10">
      <div className="col-span-12 sm:col-span-5 lg:col-span-4">
        <PhoneFrame
          className="mx-auto w-[min(16rem,80%)] sm:mx-0 sm:w-full"
          timecode={<Timecode seconds={Math.floor(position)} />}
          progress={position / AD_DURATION}
          captionBoxed={false}
          caption={words.map((word, i) => (
            <span
              key={i}
              className={cn(
                "box-decoration-clone bg-ink py-0.5",
                i === 0 && "rounded-l-xs pl-1.5",
                i === words.length - 1 && "rounded-r-xs pr-1.5",
                i >= shown && "invisible",
              )}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        >
          <div className="absolute inset-0" aria-hidden="true">
            {arts[frameIndex]}
          </div>
        </PhoneFrame>
      </div>

      <div className="col-span-12 sm:col-span-7 lg:col-span-8 lg:col-start-5">
        <div className="flex items-center gap-3">
          <h3 className="text-display-m">{anatomy.title}</h3>
          <span className="chip min-h-0 px-1.5 py-0.5 text-[0.625rem]">{anatomy.illustrative}</span>
        </div>
        <p className="measure mt-3 text-fg-muted">{anatomy.intro}</p>

        {/* Timeline: ruler, segment track, captions track, playhead. */}
        <div className="mt-8 select-none">
          <div className="relative h-5" aria-hidden="true">
            {[0, ...segments.map((s) => s.end)].map((t) => (
              <span
                key={t}
                className="text-mono absolute top-0 -translate-x-1/2 text-[0.625rem] text-fg-muted first:translate-x-0 last:-translate-x-full"
                style={{ left: pct(t) }}
              >
                {formatTimecode(t).slice(3)}
              </span>
            ))}
          </div>
          <div
            ref={trackRef}
            {...trackProps}
            className={cn("relative touch-none pt-1 pb-1", mode === "interactive" && "cursor-ew-resize")}
          >
            <div className="flex gap-1" aria-hidden="true">
              {segments.map((s) => {
                const active = mode === "interactive" && s.id === segment.id;
                return (
                  <div
                    key={s.id}
                    style={{ width: pct(s.end - s.start) }}
                    className={cn(
                      "text-mono flex h-11 items-center truncate rounded-xs px-2 text-[0.6875rem] transition-colors duration-[var(--dur-1)]",
                      active
                        ? "bg-aqua text-ink"
                        : "bg-ink-raised text-paper shadow-[inset_0_0_0_1px_var(--tone-line-strong)]",
                    )}
                  >
                    {s.id === "cta" ? (
                      <>
                        <span className="sm:hidden">CTA</span>
                        <span className="hidden sm:inline">{s.name}</span>
                      </>
                    ) : (
                      s.name
                    )}
                  </div>
                );
              })}
            </div>
            <div
              aria-hidden="true"
              className="text-mono mt-1 flex h-7 items-center rounded-xs bg-teal/45 px-2 text-[0.6875rem] text-paper"
            >
              {anatomy.captions.name}
            </div>
            {/* Second-by-second ticks */}
            <div className="relative mt-1 h-2" aria-hidden="true">
              {Array.from({ length: AD_DURATION + 1 }, (_, t) => (
                <span key={t} className="absolute top-0 h-full w-px bg-rule-strong" style={{ left: pct(t) }} />
              ))}
            </div>
            {/* Playhead */}
            <div
              {...thumbProps}
              className={cn(
                "absolute top-0 bottom-0 -ml-3 flex w-6 justify-center rounded-xs",
                mode === "interactive" && "cursor-grab active:cursor-grabbing",
              )}
              style={{ left: pct(position) }}
            >
              <span aria-hidden="true" className="h-full w-[2px] bg-remedy" />
              <span aria-hidden="true" className="absolute -top-1.5 h-3 w-3 rotate-45 bg-remedy" />
            </div>
          </div>
        </div>

        {mode === "interactive" ? (
          <div className="mt-8 grid gap-4">
            <div className="border-l-2 border-accent pl-5">
              <p className="text-mono text-fg-muted">
                {formatTimecode(segment.start).slice(3)}–{formatTimecode(segment.end).slice(3)}
              </p>
              <p className="text-h3 mt-1">{segment.name}</p>
              <p className="measure mt-2 text-fg-muted">{segment.note}</p>
            </div>
            <p className="measure text-small border-l-2 border-aqua pl-5 text-fg-muted">
              <span className="font-semibold text-fg">{anatomy.captions.name}.</span> {anatomy.captions.note}
            </p>
          </div>
        ) : (
          <dl className="mt-8 grid gap-5">
            {[
              ...segments,
              { id: "captions", name: anatomy.captions.name, note: anatomy.captions.note, start: 0, end: AD_DURATION },
            ].map((s) => (
              <div key={s.id} className="border-l-2 border-rule-strong pl-5">
                <dt className="text-h3">
                  {s.name}{" "}
                  <span className="text-mono font-normal text-fg-muted">
                    {formatTimecode(s.start).slice(3)}–{formatTimecode(s.end).slice(3)}
                  </span>
                </dt>
                <dd className="measure mt-1 text-fg-muted">{s.note}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
