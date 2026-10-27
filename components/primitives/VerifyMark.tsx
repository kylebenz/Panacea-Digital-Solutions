import { cn } from "@/lib/cn";

/*
 * Visible placeholder for any fact that has not been confirmed. The literal
 * "[VERIFY" text is what `npm run prelaunch` scans for, so never hide it.
 */
export function VerifyMark({ children, className }: { children?: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline rounded-xs border border-dashed border-current px-1 py-px font-mono text-[0.8125em] font-medium tracking-normal normal-case",
        "bg-[repeating-linear-gradient(135deg,var(--color-mist)_0_6px,transparent_6px_12px)] text-ink",
        className,
      )}
    >
      {children ? `[VERIFY: ${children}]` : "[VERIFY]"}
    </span>
  );
}
