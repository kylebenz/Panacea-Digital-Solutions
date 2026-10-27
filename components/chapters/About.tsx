import { about } from "@/content/about";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function About() {
  return (
    <Chapter id="about" title={about.title} lede={<p>{about.intro}</p>}>
      <PhaseSlate phase={6} items={["About copy", "Our commitments"]} />
    </Chapter>
  );
}
