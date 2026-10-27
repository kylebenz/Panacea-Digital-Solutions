import { hero } from "@/content/hero";
import { ChapterMarker } from "@/components/primitives/ChapterMarker";
import { Button } from "@/components/primitives/Button";
import { PhaseSlate } from "@/components/dev/PhaseSlate";

export function Hero() {
  return (
    <section
      id="top"
      data-chapter=""
      data-tone="paper"
      aria-labelledby="top-title"
      className="chapter pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24"
    >
      <div className="page grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <ChapterMarker number="00" label="Opening" />
          <p className="text-mono mt-10 text-verdigris">{hero.eyebrow}</p>
          <h1 id="top-title" tabIndex={-1} data-chapter-heading="" className="text-display-xl mt-4 max-w-[18ch]">
            {hero.title}
          </h1>
          <p className="text-body-l measure mt-7 text-fg-muted">{hero.body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={hero.primaryCta.href} arrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-5">
          <PhaseSlate phase={2} items={["7A Storyboard Assembly stage"]} />
        </div>
      </div>
    </section>
  );
}
