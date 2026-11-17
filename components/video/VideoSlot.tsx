import type { VideoSlot as Slot } from "@/lib/work";
import { cn } from "@/lib/cn";
import { ConceptBadge } from "@/components/primitives/ConceptBadge";

const ratioClass = {
  "9:16": "aspect-[9/16]",
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
} as const;

function PlayGlyph({ small }: { small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid place-items-center rounded-full bg-paper/12 shadow-[inset_0_0_0_1px_rgb(245_242_236/0.35)]",
        small ? "h-10 w-10" : "h-14 w-14",
      )}
    >
      <svg viewBox="0 0 12 14" className={small ? "ml-0.5 h-3.5 w-3" : "ml-1 h-5 w-4"} fill="currentColor">
        <path d="M0 0v14l12-7z" />
      </svg>
    </span>
  );
}

/*
 * One video slot. Until `media` is filled in (lib/work.ts) it renders a
 * labelled placeholder; afterwards a native player that loads nothing until
 * the visitor presses play. Concept Samples always carry the badge.
 */
export function VideoSlot({
  slot,
  placeholderLabel,
  size = "md",
  caption = true,
  className,
}: {
  slot: Slot;
  placeholderLabel: string;
  size?: "md" | "sm";
  caption?: boolean;
  className?: string;
}) {
  const ratio = ratioClass[slot.ratio ?? "9:16"];
  const small = size === "sm";
  return (
    <figure data-tone="ink" className={cn("overflow-hidden rounded-card", className)}>
      <div className={cn("video-placeholder relative w-full", ratio)}>
        {slot.media ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            controls
            playsInline
            preload="none"
            poster={slot.media.poster}
            aria-label={slot.title}
          >
            <source src={slot.media.src} type="video/mp4" />
            <track kind="captions" src={slot.media.captions} srcLang="en" label="English" default />
          </video>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center">
            <PlayGlyph small={small} />
            <span className={cn("text-mono text-paper-dim", small && "text-[0.625rem]")}>{placeholderLabel}</span>
          </div>
        )}
        {slot.status === "concept" && !small ? (
          <ConceptBadge className="absolute top-2 left-2 max-sm:px-1.5 max-sm:text-[0.5625rem] sm:top-3 sm:left-3" />
        ) : null}
      </div>
      {caption ? (
        <figcaption className={cn("border-t border-rule", small ? "px-3 py-2" : "px-4 py-3")}>
          <p className={cn("leading-snug font-semibold", small ? "text-[0.8125rem]" : "text-[0.9375rem]")}>
            {slot.title}
          </p>
          <p className={cn("mt-0.5 text-fg-muted", small ? "text-[0.6875rem]" : "text-small")}>
            {slot.subtitle}
            {slot.status === "concept" && small ? " · Concept Sample" : null}
          </p>
        </figcaption>
      ) : null}
    </figure>
  );
}
