import { whoWeHelp } from "@/content/who-we-help";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { AudienceList } from "@/components/interactive/AudienceView";

/* 08 · Who we help — guide copy, audience chips, suitability caveat. */
export function WhoWeHelp() {
  return (
    <Chapter id="who-we-help" title={whoWeHelp.title} lede={<p>{whoWeHelp.intro}</p>}>
      <div className="mt-14">
        <Island name="audience-chips">
          <AudienceList />
        </Island>
      </div>
      <p className="measure mt-14 flex gap-3 border-t border-rule pt-6 text-fg-muted">
        <span className="text-mono shrink-0 pt-0.5 text-fg">Note</span>
        {whoWeHelp.caveat}
      </p>
    </Chapter>
  );
}
