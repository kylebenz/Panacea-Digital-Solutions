import { hero } from "@/content/hero";
import { heroStage } from "@/content/hero-stage";
import { ChapterMarker } from "@/components/primitives/ChapterMarker";
import { Button } from "@/components/primitives/Button";
import { StoryArt } from "@/components/stage/StoryArt";
import { StoryboardStage } from "@/components/stage/StoryboardStage";

export function Hero() {
  return (
    <section
      id="top"
      data-chapter=""
      data-tone="paper"
      aria-labelledby="top-title"
      className="chapter pt-8 pb-14 sm:pt-14 lg:pt-16 lg:pb-20"
    >
      <div className="page grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-6 xl:col-span-6">
          <ChapterMarker number="00" label="Opening" />
          <p className="text-mono mt-10 text-verdigris">{hero.eyebrow}</p>
          <h1 id="top-title" tabIndex={-1} data-chapter-heading="" className="text-display-xl mt-4 max-w-[17ch]">
            {hero.title}
          </h1>
          <div className="text-body-l measure mt-7 grid gap-3 text-fg-muted">
            {hero.bodyParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={hero.primaryCta.href} arrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 lg:pl-4 xl:col-span-5 xl:col-start-8 xl:pl-0">
          <StoryboardStage
            arts={heroStage.frames.map((frame) => (
              <StoryArt key={frame.start} kind={frame.art} push />
            ))}
            thumbs={heroStage.frames.map((frame) => (
              <StoryArt key={frame.start} kind={frame.art} />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
