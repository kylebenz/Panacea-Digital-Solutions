import { process } from "@/content/process";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { ProcessList } from "@/components/interactive/ProcessList";

/* 06 · How it works (ink) — Process Timeline (7D), the guide's four steps. */
export function Process() {
  return (
    <Chapter id="process" title={process.title}>
      <Island name="process-timeline">
        <ProcessList />
      </Island>
    </Chapter>
  );
}
