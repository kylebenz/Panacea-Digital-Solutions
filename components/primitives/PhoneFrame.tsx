import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * 9:16 phone frame. Children fill the screen. Optional burned-in caption
 * and timecode/scrub overlays match the "production language".
 */
export function PhoneFrame({
  children,
  caption,
  timecode,
  progress,
  label,
  className,
}: {
  children?: ReactNode;
  caption?: ReactNode;
  timecode?: ReactNode;
  /** 0–1; draws a scrub bar with a remedy playhead. */
  progress?: number;
  /** Accessible description of what the frame shows. */
  label?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "relative w-full max-w-[18rem] rounded-phone bg-ink p-2.5 shadow-[0_0_0_1px_var(--color-line-on-ink)]",
        className,
      )}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      <div className="relative aspect-[9/16] overflow-hidden rounded-screen bg-ink-raised text-paper">
        {children}
        {timecode ? (
          <div className="absolute top-3 left-3 rounded-xs bg-ink/80 px-1.5 py-0.5 text-paper">{timecode}</div>
        ) : null}
        {caption ? (
          <div className="absolute inset-x-4 bottom-10 text-center">
            <span className="box-decoration-clone rounded-xs bg-ink px-1.5 py-0.5 text-[0.9375rem] leading-[1.6] font-semibold text-paper">
              {caption}
            </span>
          </div>
        ) : null}
        {typeof progress === "number" ? (
          <div className="absolute inset-x-4 bottom-4 h-[3px] bg-paper/25" aria-hidden="true">
            <div className="h-full bg-paper/70" style={{ width: `${progress * 100}%` }} />
            <div
              className="absolute top-1/2 h-3 w-[3px] -translate-x-1/2 -translate-y-1/2 bg-remedy"
              style={{ left: `${progress * 100}%` }}
            />
          </div>
        ) : null}
      </div>
      <span aria-hidden="true" className="absolute top-4 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-paper/20" />
    </figure>
  );
}
