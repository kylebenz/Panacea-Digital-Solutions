import { adVideos } from "@/content/ad-videos";
import { heroStage } from "@/content/hero-stage";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { AdAnatomyView } from "@/components/interactive/AdAnatomyView";
import { StoryArt } from "@/components/stage/StoryArt";
import { ChapterCoda } from "./ChapterCoda";

/*
 * 03 · AI-assisted ad videos (ink). Guide copy; "What is included" as a
 * production call sheet; Anatomy of a Short Ad (7E); what the service is
 * designed to support; the guide's CTA.
 */
export function AdVideos() {
  const { included, supports, cta } = adVideos;
  const arts = heroStage.frames.map((frame) => <StoryArt key={frame.start} kind={frame.art} />);

  return (
    <Chapter id="ad-videos" title={adVideos.title} lede={<p>{adVideos.intro}</p>}>
      {/* What is included — a production call sheet */}
      <div className="grid-12 mt-16 gap-y-6">
        <div className="col-span-12 lg:col-span-4">
          <h3 id="ad-videos-included" className="text-display-m">
            {included.title}
          </h3>
        </div>
        <ol className="col-span-12 border-t border-rule-strong lg:col-span-8">
          {included.items.map((item, i) => (
            <li
              key={item.label}
              className="reveal-wipe grid grid-cols-[3rem_1fr] items-baseline gap-x-4 border-b border-rule py-4 sm:grid-cols-[3rem_9rem_1fr]"
            >
              <span className="text-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-mono hidden text-fg-muted sm:block">{item.label}</span>
              <span className="text-body-l">{item.text}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 7E */}
      <div className="mt-24 border-t border-rule pt-16">
        <Island name="ad-anatomy" slots={{ arts }}>
          <AdAnatomyView mode="static" position={1} arts={arts} />
        </Island>
      </div>

      {/* What this service is designed to support */}
      <div className="grid-12 mt-24 gap-y-6 border-t border-rule pt-16">
        <h3 id="ad-videos-supports" className="text-display-m col-span-12 max-w-[20ch] lg:col-span-4">
          {supports.title}
        </h3>
        <div className="col-span-12 lg:col-span-8">
          <p className="text-body-l measure">{supports.body}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-hidden="true">
            {supports.uses.map((use) => (
              <li key={use} className="chip">
                {use}
              </li>
            ))}
          </ul>
          <p className="measure mt-8 border-l-2 border-aqua pl-5 text-fg-muted">{supports.caveat}</p>
        </div>
      </div>

      <ChapterCoda lead={cta.lead} body={cta.body} primary={cta.primary} links={[cta.pricing, cta.portfolio]} />
    </Chapter>
  );
}
