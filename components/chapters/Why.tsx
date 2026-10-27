import { why } from "@/content/why";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Why() {
  return (
    <Chapter id="why" title={why.title} lede={<p>{why.body}</p>}>
      <PhaseSlate phase={2} items={["Editorial statement"]} />
    </Chapter>
  );
}
