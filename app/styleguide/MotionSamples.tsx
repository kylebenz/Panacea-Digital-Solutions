"use client";

import { useState } from "react";
import { LeaderLine } from "@/components/primitives/LeaderLine";
import { Callout } from "@/components/primitives/Callout";

const samples = [
  { key: "wipe", label: "Frame wipe", note: "Reveals panels and frames left → right. 600ms, edit-cut easing." },
  { key: "mask", label: "Mask reveal", note: "Lines of type rise through a mask. Stagger ≤ 60ms." },
  { key: "draw", label: "Leader draw", note: "Annotation leaders draw from anchor to note." },
  { key: "scrub", label: "Scrub bar", note: "Playhead travels a timeline; used for loading and progress." },
] as const;

export function MotionSamples() {
  const [run, setRun] = useState(0);
  return (
    <div>
      <button type="button" className="btn btn-secondary btn-sm" onClick={() => setRun((n) => n + 1)}>
        Replay samples
      </button>
      <div key={run} className="mt-8 grid gap-6 md:grid-cols-2">
        {samples.map((sample) => (
          <figure key={sample.key} className="border border-rule-strong p-5">
            <div className="relative grid h-32 place-items-center overflow-hidden bg-mist text-ink">
              {sample.key === "wipe" ? <div className="anim-wipe h-20 w-3/4 bg-ink" /> : null}
              {sample.key === "mask" ? (
                <p className="text-display-m text-center">
                  {["Healthcare content,", "made simpler"].map((line, i) => (
                    <span key={line} className="block overflow-hidden">
                      <span className="anim-mask-up block" style={{ animationDelay: `${i * 60}ms` }}>
                        {line}
                      </span>
                    </span>
                  ))}
                </p>
              ) : null}
              {sample.key === "draw" ? (
                <div className="absolute inset-4">
                  <LeaderLine from={[12, 70]} elbow={[45, 25]} to={[88, 25]} draw className="text-verdigris" />
                  <Callout n={1} className="absolute top-[70%] left-[12%] -translate-x-1/2 -translate-y-1/2" />
                </div>
              ) : null}
              {sample.key === "scrub" ? (
                <div className="relative h-[3px] w-3/4 overflow-hidden bg-ink/20">
                  <span className="absolute inset-y-0 left-0 w-[35%] bg-ink [animation:scrub_1.1s_var(--ease-cut)_infinite]" />
                </div>
              ) : null}
            </div>
            <figcaption className="mt-4">
              <p className="text-mono">{sample.label}</p>
              <p className="text-small mt-1 text-fg-muted">{sample.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
