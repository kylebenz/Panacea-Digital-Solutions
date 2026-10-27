/*
 * Temporary build slate shown in chapters that later phases fill in.
 * Removed as each chapter is completed; prelaunch fails if any remain.
 */
export function PhaseSlate({ phase, items }: { phase: number; items: string[] }) {
  return (
    <div
      data-phase-slate=""
      className="mt-12 grid min-h-56 place-content-center gap-3 rounded-xs border border-dashed border-rule-strong p-8 text-center"
    >
      <p className="text-mono text-fg-muted">Build slate · Phase {phase}</p>
      <p className="text-small text-fg-muted">{items.join(" · ")}</p>
    </div>
  );
}
