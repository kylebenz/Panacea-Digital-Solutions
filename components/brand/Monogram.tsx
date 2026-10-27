import { cn } from "@/lib/cn";

/*
 * Placeholder monogram: a "P" built from a 9:16 frame (video) and a square
 * (infographic). Deliberately avoids any medical symbol (brief 3.6).
 */
export function Monogram({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 30"
      className={cn("h-7 w-auto", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      fill="none"
    >
      {/* 9:16 frame — the stem */}
      <rect x="3" y="3" width="13.5" height="24" rx="1.5" stroke="currentColor" strokeWidth="2" />
      {/* Square — the bowl */}
      <rect x="16.5" y="3" width="12" height="12" fill="var(--color-verdigris)" />
      <rect x="16.5" y="3" width="12" height="12" stroke="currentColor" strokeWidth="2" />
      {/* Playhead notch */}
      <rect x="6" y="22.25" width="7.5" height="1.75" fill="var(--color-remedy)" />
    </svg>
  );
}
