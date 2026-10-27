import { cn } from "@/lib/cn";

/** Required on every fictional or speculative portfolio item (guardrail 4). */
export function ConceptBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "text-mono inline-flex items-center gap-1.5 rounded-xs bg-verdigris px-2 py-1 text-paper",
        className,
      )}
    >
      <svg aria-hidden="true" viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none">
        <rect
          x="0.75"
          y="0.75"
          width="8.5"
          height="8.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 1.5"
        />
      </svg>
      Concept Sample
    </span>
  );
}
