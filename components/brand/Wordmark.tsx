import { cn } from "@/lib/cn";

/*
 * Placeholder SVG wordmark until a real logo is supplied (O-04).
 * textLength pins the width so the mark doesn't shift while fonts swap.
 */
export function Wordmark({ className, subline = true }: { className?: string; subline?: boolean }) {
  return (
    <svg
      viewBox={subline ? "0 0 120 32" : "0 0 120 22"}
      className={cn("h-8 w-auto", className)}
      aria-hidden="true"
      fill="currentColor"
    >
      <text
        x="0"
        y="18"
        textLength="119"
        lengthAdjust="spacingAndGlyphs"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "21px",
          fontWeight: 500,
          letterSpacing: "0.06em",
        }}
      >
        PANACEA
      </text>
      {subline ? (
        <text
          x="0.5"
          y="30"
          textLength="118"
          lengthAdjust="spacing"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "7px",
            fontWeight: 500,
            letterSpacing: "0.08em",
          }}
        >
          DIGITAL SOLUTIONS
        </text>
      ) : null}
    </svg>
  );
}
