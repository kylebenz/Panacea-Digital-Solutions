import { infographics } from "@/content/infographics";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { InfographicAnatomyView } from "@/components/interactive/InfographicAnatomyView";
import { ChapterCoda } from "./ChapterCoda";

/*
 * 04 · Healthcare infographics (paper + hairline grid). Guide copy, use
 * cases, Infographic Anatomy (7F) carrying the guide's five principles, and
 * the guide's CTA.
 */
export function Infographics() {
  const { cta } = infographics;
  return (
    <Chapter
      id="infographics"
      title={infographics.title}
      lede={
        <>
          <p>{infographics.intro}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-hidden="true">
            {infographics.uses.map((use) => (
              <li key={use} className="chip bg-bg">
                {use}
              </li>
            ))}
          </ul>
        </>
      }
    >
      <div className="mt-16">
        <Island name="infographic-anatomy">
          <InfographicAnatomyView mode="static" active={0} />
        </Island>
      </div>

      <ChapterCoda lead={cta.lead} body={cta.body} primary={cta.primary} links={[cta.pricing, cta.portfolio]} />
    </Chapter>
  );
}
