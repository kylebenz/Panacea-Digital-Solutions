"use client";

import { useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { whoWeHelp } from "@/content/who-we-help";
import { AudienceResponse } from "./AudienceView";

/* Who we help · audience chips (Radix Toggle Group) that reveal the matching line. */
export default function AudienceChips() {
  const [id, setId] = useState<string>(whoWeHelp.audiences[0].id);
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div>
        <p id="audience-chips-label" className="text-mono mb-4 text-fg-muted">
          {whoWeHelp.chipsLabel}
        </p>
        <ToggleGroup.Root
          type="single"
          value={id}
          onValueChange={(v) => v && setId(v)}
          aria-labelledby="audience-chips-label"
          className="flex flex-wrap gap-2"
        >
          {whoWeHelp.audiences.map((a) => (
            <ToggleGroup.Item key={a.id} value={a.id} className="chip min-h-10 cursor-pointer px-3">
              {a.name}
            </ToggleGroup.Item>
          ))}
        </ToggleGroup.Root>
      </div>
      <div aria-live="polite" key={id} className="anim-wipe">
        <AudienceResponse id={id} />
      </div>
    </div>
  );
}
