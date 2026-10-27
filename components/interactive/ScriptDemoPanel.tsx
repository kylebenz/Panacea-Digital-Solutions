import type { ReactNode } from "react";
import { businessTypes, demoCopy, goals } from "@/content/script-demo";
import { Button } from "@/components/primitives/Button";

/*
 * 7C · frame shared by static and interactive renders: controls slot, the
 * concept panel with its three view columns, and the verbatim footer + CTA.
 */
export function ScriptDemoPanel({
  businessId,
  goalId,
  controls,
  children,
}: {
  businessId: string;
  goalId: string;
  controls: ReactNode;
  children: ReactNode;
}) {
  const business = businessTypes.find((b) => b.id === businessId)!;
  const goal = goals.find((g) => g.id === goalId)!;
  return (
    <div>
      {controls}
      <div data-tone="paper" className="mt-8 border border-rule-strong">
        <div className="text-mono flex flex-wrap items-center justify-between gap-3 border-b border-rule px-5 py-3 text-fg-muted sm:px-6">
          <p aria-live="polite">
            <span className="text-fg">Concept</span> · {business.label} · {goal.label}
          </p>
          <span className="chip min-h-0 px-1.5 py-0.5 text-[0.625rem]">{demoCopy.illustrative}</span>
        </div>
        <div className="grid gap-10 p-5 sm:p-6 lg:grid-cols-[1.05fr_1.35fr_1fr] lg:gap-8">{children}</div>
        <div className="flex flex-col gap-4 border-t border-rule px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-small measure text-fg-muted">{demoCopy.footer}</p>
          <Button href={demoCopy.cta.href} arrow className="shrink-0">
            {demoCopy.cta.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function StaticControls({ businessId, goalId }: { businessId: string; goalId: string }) {
  const groups = [
    { label: demoCopy.businessLabel, items: businessTypes, selected: businessId },
    { label: demoCopy.goalLabel, items: goals, selected: goalId },
  ];
  return (
    <div className="grid gap-5">
      {groups.map((group) => (
        <div key={group.label} className="grid gap-2 md:grid-cols-[9rem_1fr] md:items-center">
          <p className="text-mono text-fg-muted">{group.label}</p>
          <ul className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <li key={item.id} className="chip min-h-9" data-state={item.id === group.selected ? "on" : "off"}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
