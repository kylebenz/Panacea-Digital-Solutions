import { cn } from "@/lib/cn";

/** Formats whole seconds as HH:MM:SS. */
export function formatTimecode(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export function Timecode({
  value,
  seconds,
  live = false,
  className,
}: {
  value?: string;
  seconds?: number;
  /** Shows the remedy "recording" dot used on running counters. */
  live?: boolean;
  className?: string;
}) {
  const text = value ?? formatTimecode(seconds ?? 0);
  return (
    <span className={cn("text-mono inline-flex items-center gap-1.5 tabular-nums", className)}>
      {live ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-remedy" /> : null}
      <span>{text}</span>
    </span>
  );
}
