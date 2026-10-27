import { faq } from "@/content/faq";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Faq() {
  return (
    <Chapter id="faq" title={faq.title}>
      <PhaseSlate phase={6} items={["Accordion", "Live filter", "Per-question anchors"]} />
    </Chapter>
  );
}
