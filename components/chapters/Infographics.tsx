import { infographics } from "@/content/infographics";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Infographics() {
  return (
    <Chapter id="infographics" title={infographics.title} lede={<p>{infographics.intro}</p>}>
      <PhaseSlate phase={3} items={["7F Infographic Anatomy", "Infographic content principles", "Use cases"]} />
    </Chapter>
  );
}
