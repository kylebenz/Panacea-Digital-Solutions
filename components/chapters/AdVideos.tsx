import { adVideos } from "@/content/ad-videos";
import { Chapter } from "@/components/layout/Chapter";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function AdVideos() {
  return (
    <Chapter id="ad-videos" title={adVideos.title} lede={<p>{adVideos.intro}</p>}>
      <PhaseSlate
        phase={3}
        items={["What is included", "7E Anatomy of a Short Ad", "What this service is designed to support"]}
      />
    </Chapter>
  );
}
