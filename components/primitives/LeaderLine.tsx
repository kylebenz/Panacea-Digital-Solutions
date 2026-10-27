import { cn } from "@/lib/cn";

/*
 * Annotation leader: a hairline elbow with an anchor dot. Coordinates are
 * in a 0–100 box stretched over its parent, so callers position it with
 * percentages. `draw` animates the stroke in (static under reduced motion).
 */
export function LeaderLine({
  from,
  elbow,
  to,
  draw = false,
  className,
}: {
  from: [number, number];
  elbow?: [number, number];
  to: [number, number];
  draw?: boolean;
  className?: string;
}) {
  const points = [from, ...(elbow ? [elbow] : []), to].map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-visible text-accent", className)}
      aria-hidden="true"
      fill="none"
    >
      <polyline
        points={points}
        pathLength={1}
        stroke="currentColor"
        strokeWidth="1.25"
        vectorEffect="non-scaling-stroke"
        className={draw ? "anim-draw" : undefined}
      />
      <circle cx={from[0]} cy={from[1]} r="0.9" fill="currentColor" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
