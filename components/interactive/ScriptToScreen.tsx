"use client";

import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { businessTypes, concepts, demoCopy, goals, type BusinessTypeId, type GoalId } from "@/content/script-demo";
import { ScriptDemoPanel } from "./ScriptDemoPanel";
import { OutlineView, ScriptView, StoryboardView, ViewColumn, type ArtMap, type SegmentKey } from "./ScriptDemoViews";

/*
 * 7C · Script-to-Screen, interactive. Radix Toggle Groups pick the business
 * type and goal; the three views swap with Motion layout transitions (a
 * frame wipe in, height animating with layout). Hovering a segment
 * highlights it across script, storyboard, and outline.
 */
const ease = [0.22, 1, 0.36, 1] as const;

function Group<T extends string>({
  id,
  label,
  items,
  value,
  onChange,
}: {
  id: string;
  label: string;
  items: ReadonlyArray<{ id: T; label: string }>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[9rem_1fr] md:items-center">
      <p id={id} className="text-mono text-fg-muted">
        {label}
      </p>
      <ToggleGroup.Root
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v as T)}
        aria-labelledby={id}
        className="flex flex-wrap gap-2"
      >
        {items.map((item) => (
          <ToggleGroup.Item key={item.id} value={item.id} className="chip min-h-9 cursor-pointer">
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}

export default function ScriptToScreen({ artMap }: { artMap?: ArtMap }) {
  const [business, setBusiness] = useState<BusinessTypeId>("home-care");
  const [goal, setGoal] = useState<GoalId>("introduce");
  const [segment, setSegment] = useState<SegmentKey | null>(null);
  const concept = concepts[business][goal];
  const key = `${business}-${goal}`;

  const swap = {
    initial: { clipPath: "inset(0 100% 0 0)" },
    animate: { clipPath: "inset(0 0% 0 0)" },
    exit: { opacity: 0 },
    transition: { duration: 0.42, ease },
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ScriptDemoPanel
          businessId={business}
          goalId={goal}
          controls={
            <div className="grid gap-5">
              <Group
                id="demo-business"
                label={demoCopy.businessLabel}
                items={businessTypes}
                value={business}
                onChange={setBusiness}
              />
              <Group id="demo-goal" label={demoCopy.goalLabel} items={goals} value={goal} onChange={setGoal} />
            </div>
          }
        >
          {(
            [
              [demoCopy.views.script, <ScriptView key="s" concept={concept} active={segment} onSegment={setSegment} />],
              [
                demoCopy.views.storyboard,
                <StoryboardView
                  key="b"
                  concept={concept}
                  active={segment}
                  onSegment={setSegment}
                  artMap={artMap ?? {}}
                />,
              ],
              [
                demoCopy.views.outline,
                <OutlineView key="o" concept={concept} active={segment} onSegment={setSegment} />,
              ],
            ] as const
          ).map(([title, view], i) => (
            <m.div key={title} layout transition={{ duration: 0.32, ease }}>
              <ViewColumn title={title} n={i + 1}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <m.div key={key} {...swap} transition={{ ...swap.transition, delay: i * 0.05 }}>
                    {view}
                  </m.div>
                </AnimatePresence>
              </ViewColumn>
            </m.div>
          ))}
        </ScriptDemoPanel>
      </MotionConfig>
    </LazyMotion>
  );
}
