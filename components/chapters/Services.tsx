import { services } from "@/content/services";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Services() {
  return (
    <Chapter id="services" title={services.title}>
      <PhaseSlate phase={2} items={["Video panel", "Diagram panel"]} />
    </Chapter>
  );
}
