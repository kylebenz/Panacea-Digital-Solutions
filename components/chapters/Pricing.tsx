import { pricing } from "@/content/pricing";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Pricing() {
  return (
    <Chapter id="pricing" title={pricing.title} lede={<p>{pricing.intro}</p>}>
      <PhaseSlate phase={5} items={["7H Package Comparator", "Revision explainer", "Package terms"]} />
    </Chapter>
  );
}
