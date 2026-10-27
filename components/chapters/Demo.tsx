import { concepts, demoCopy } from "@/content/script-demo";
import type { StoryArtKind } from "@/content/hero-stage";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { ScriptDemoPanel, StaticControls } from "@/components/interactive/ScriptDemoPanel";
import { OutlineView, ScriptView, StoryboardView, ViewColumn } from "@/components/interactive/ScriptDemoViews";
import { StoryArt } from "@/components/stage/StoryArt";

/* 05 · Script-to-Screen demo (7C). */
const kinds: StoryArtKind[] = ["house", "talk", "path", "message", "calendar", "app", "question"];

export function Demo() {
  const artMap = Object.fromEntries(kinds.map((k) => [k, <StoryArt key={k} kind={k} />]));
  const concept = concepts["home-care"].introduce;
  return (
    <Chapter id="demo" title={demoCopy.title} lede={<p>{demoCopy.lede}</p>}>
      <div className="mt-12">
        <Island name="script-to-screen" slots={{ artMap }}>
          <ScriptDemoPanel
            businessId="home-care"
            goalId="introduce"
            controls={<StaticControls businessId="home-care" goalId="introduce" />}
          >
            <ViewColumn title={demoCopy.views.script} n={1}>
              <ScriptView concept={concept} active={null} />
            </ViewColumn>
            <ViewColumn title={demoCopy.views.storyboard} n={2}>
              <StoryboardView concept={concept} active={null} artMap={artMap} />
            </ViewColumn>
            <ViewColumn title={demoCopy.views.outline} n={3}>
              <OutlineView concept={concept} active={null} />
            </ViewColumn>
          </ScriptDemoPanel>
        </Island>
      </div>
    </Chapter>
  );
}
