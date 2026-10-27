import { cn } from "@/lib/cn";

/*
 * Typeset wordmark beside the supplied mark: PANACEA in ink, the subline in
 * the brand teal. textLength pins the width so it doesn't shift while fonts swap.
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
          fill="var(--tone-accent)"
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
