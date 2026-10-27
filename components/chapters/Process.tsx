import { process } from "@/content/process";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Process() {
  return (
    <Chapter id="process" title={process.title}>
      <PhaseSlate phase={4} items={["7D Process Timeline"]} />
    </Chapter>
  );
}
