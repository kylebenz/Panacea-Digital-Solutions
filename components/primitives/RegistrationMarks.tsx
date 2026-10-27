import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

const corners: CSSProperties[] = [
  { top: 0, left: 0 },
  { top: 0, left: "100%" },
  { top: "100%", left: 0 },
  { top: "100%", left: "100%" },
];

/** Printer's registration marks centred on the four corners of a frame. */
export function RegistrationMarks({ className }: { className?: string }) {
  return (
    <span className={cn("pointer-events-none absolute inset-0 text-rule-strong", className)} aria-hidden="true">
      {corners.map((style, index) => (
        <svg
          key={index}
          viewBox="0 0 16 16"
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2"
          style={style}
          fill="none"
        >
          <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1" />
          <path d="M8 0v16M0 8h16" stroke="currentColor" strokeWidth="1" />
        </svg>
      ))}
    </span>
  );
}
