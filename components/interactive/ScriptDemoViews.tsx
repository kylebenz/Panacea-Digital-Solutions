import type { ReactNode } from "react";
import type { StoryArtKind } from "@/content/hero-stage";
import { demoCopy, type DemoConcept } from "@/content/script-demo";
import { cn } from "@/lib/cn";

/*
 * 7C · the three linked views (script, storyboard, infographic outline).
 * Pure markup shared by the static render and the interactive island.
 * Elements carry `data-seg` so hovering one segment highlights it in all
 * three views.
 */

export type SegmentKey = "hook" | "message" | "cta";
export type ArtMap = Partial<Record<StoryArtKind, ReactNode>>;

const frameSegments: SegmentKey[] = ["hook", "message", "message", "cta"];

const segClass = (seg: SegmentKey, active: SegmentKey | null) =>
  cn(
    "transition-[background-color,box-shadow] duration-[var(--dur-1)]",
    active === seg && "bg-mist/70 shadow-[inset_3px_0_0_var(--color-remedy)]",
  );

type ViewProps = {
  concept: DemoConcept;
  active: SegmentKey | null;
  onSegment?: (seg: SegmentKey | null) => void;
};

function hoverProps(seg: SegmentKey, onSegment?: ViewProps["onSegment"]) {
  if (!onSegment) return { "data-seg": seg };
  return {
    "data-seg": seg,
    onPointerEnter: () => onSegment(seg),
    onPointerLeave: () => onSegment(null),
  };
}

export function ScriptView({ concept, active, onSegment }: ViewProps) {
  return (
    <ol className="grid gap-px border-y border-line">
      {demoCopy.segments.map((s) => (
        <li key={s.key} {...hoverProps(s.key, onSegment)} className={cn("px-3 py-3.5", segClass(s.key, active))}>
          <p className="text-mono flex justify-between gap-3 text-ink-2">
            <span>{s.label}</span>
            <span className="tabular-nums">{s.time}</span>
          </p>
          <p className="mt-1.5 text-[0.9375rem] leading-snug">{concept.script[s.key]}</p>
        </li>
      ))}
    </ol>
  );
}

export function StoryboardView({ concept, active, onSegment, artMap }: ViewProps & { artMap: ArtMap }) {
  return (
    <ol className="grid gap-2">
      {concept.frames.map((frame, i) => {
        const seg = frameSegments[i];
        return (
          <li key={i} {...hoverProps(seg, onSegment)} className={cn("flex gap-4 p-1.5", segClass(seg, active))}>
            <div
              className="relative aspect-[9/16] w-[4.5rem] shrink-0 overflow-hidden rounded-[5px] bg-ink-raised"
              aria-hidden="true"
            >
              {artMap[frame.art]}
              <span className="text-mono absolute top-1 left-1 rounded-xs bg-ink/80 px-1 text-[0.5625rem] text-paper">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="min-w-0 pt-1">
              <p className="text-mono text-[0.625rem] text-ink-2">
                {demoCopy.frameLabel} {i + 1} · {demoCopy.segments.find((s) => s.key === seg)!.label}
              </p>
              <p className="text-small mt-1 leading-snug">{frame.note}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function OutlineView({ concept, active, onSegment }: ViewProps) {
  return (
    <div className="border border-line-strong bg-paper p-4">
      <p
        {...hoverProps("hook", onSegment)}
        className={cn("font-display -mx-1 px-1 py-1 text-[1.1875rem] leading-tight", segClass("hook", active))}
      >
        {concept.outline.title}
      </p>
      <ol
        {...hoverProps("message", onSegment)}
        className={cn("-mx-1 mt-3 grid gap-2 px-1 py-1", segClass("message", active))}
      >
        {concept.outline.blocks.map((block, i) => (
          <li key={block} className="flex gap-2.5 border-t border-line pt-2 text-small leading-snug">
            <span className="font-mono text-[0.6875rem] font-semibold text-verdigris">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>{block}</span>
          </li>
        ))}
      </ol>
      <p
        {...hoverProps("cta", onSegment)}
        className={cn(
          "-mx-1 mt-3 bg-ink px-2 py-2 text-[0.8125rem] font-semibold text-paper",
          active === "cta" && "shadow-[inset_3px_0_0_var(--color-remedy)]",
        )}
      >
        {concept.script.cta}
      </p>
    </div>
  );
}

export function ViewColumn({ title, n, children }: { title: string; n: number; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h3 className="text-mono mb-3 flex items-center gap-2 text-ink">
        <span className="grid h-5 w-5 place-items-center rounded-full text-[0.625rem] shadow-[inset_0_0_0_1px_currentColor]">
          {n}
        </span>
        {title}
      </h3>
      {children}
    </div>
  );
}
