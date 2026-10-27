"use client";

import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { pricing } from "@/content/pricing";
import { RevisionSide } from "./RevisionExplainerView";

/* 7H · revision explainer: a two-state segmented toggle (Radix Toggle Group). */
export default function RevisionExplainer() {
  const [side, setSide] = useState<"included" | "separate">("included");
  return (
    <div>
      <ToggleGroup.Root
        type="single"
        value={side}
        onValueChange={(v) => v && setSide(v as typeof side)}
        aria-label={pricing.revision.toggleLabel}
        className="inline-flex flex-wrap rounded-xs p-1 shadow-[inset_0_0_0_1px_var(--tone-line-strong)]"
      >
        {(["included", "separate"] as const).map((key) => (
          <ToggleGroup.Item
            key={key}
            value={key}
            className="min-h-10 cursor-pointer rounded-[1px] px-4 text-[0.9375rem] font-semibold text-fg-muted transition-colors duration-[var(--dur-1)] data-[state=on]:bg-fg data-[state=on]:text-bg"
          >
            {pricing.revision[key].label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
      <div key={side} aria-live="polite" className="anim-wipe mt-8">
        <RevisionSide side={side} />
      </div>
    </div>
  );
}
