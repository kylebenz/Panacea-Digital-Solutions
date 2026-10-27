import { chapterTimecode } from "@/lib/chapters";
import { cn } from "@/lib/cn";

/** `CH 09 · 00:09:00 — PRICING`, preceded by a small frame tick. */
export function ChapterMarker({ number, label, className }: { number: string; label: string; className?: string }) {
  return (
    <p className={cn("text-mono flex items-center gap-3 text-fg-muted", className)}>
      <span aria-hidden="true" className="relative inline-block h-3 w-[0.42rem] shrink-0 border border-current">
        <span className="absolute inset-x-0 bottom-0 h-[2px] bg-accent" />
      </span>
      <span>
        <span className="text-fg">CH {number}</span>
        <span aria-hidden="true"> · </span>
        <span className="sr-only">, timecode </span>
        {chapterTimecode(number)}
        <span aria-hidden="true"> — </span>
        <span className="sr-only">, </span>
        {label}
      </span>
    </p>
  );
}
