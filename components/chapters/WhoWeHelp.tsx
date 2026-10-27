import { whoWeHelp } from "@/content/who-we-help";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function WhoWeHelp() {
  return (
    <Chapter id="who-we-help" title={whoWeHelp.title} lede={<p>{whoWeHelp.body}</p>}>
      <PhaseSlate phase={4} items={["Audience chips", "Suitability caveat"]} />
    </Chapter>
  );
}
