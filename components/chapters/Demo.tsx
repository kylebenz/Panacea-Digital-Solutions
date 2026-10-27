import { demo } from "@/content/demo";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Demo() {
  return (
    <Chapter id="demo" title={demo.title}>
      <PhaseSlate phase={4} items={["7C Script-to-Screen"]} />
    </Chapter>
  );
}
