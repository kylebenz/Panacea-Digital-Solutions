import { cn } from "@/lib/cn";

/** Numbered diagram callout: a ringed mono numeral. */
export function Callout({
  n,
  active = false,
  pending = false,
  className,
}: {
  n: number;
  active?: boolean;
  /** Not reached yet: dashed outline, number still legible (AA contrast). */
  pending?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-grid h-7 w-7 shrink-0 place-items-center rounded-full font-mono text-[0.75rem] font-semibold tabular-nums",
        active
          ? "bg-remedy text-ink shadow-[0_0_0_1px_var(--color-ink)]"
          : pending
            ? "bg-bg text-fg-muted outline-1 -outline-offset-1 outline-current outline-dashed"
            : "bg-bg text-fg shadow-[inset_0_0_0_1.5px_currentColor]",
        className,
      )}
    >
      {String(n).padStart(2, "0")}
    </span>
  );
}
