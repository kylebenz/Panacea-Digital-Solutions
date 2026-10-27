import { portfolio } from "@/content/portfolio";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Portfolio() {
  return (
    <Chapter id="portfolio" title={portfolio.title} lede={<p>{portfolio.intro}</p>}>
      <PhaseSlate phase={5} items={["7G Portfolio Explorer"]} />
    </Chapter>
  );
}
