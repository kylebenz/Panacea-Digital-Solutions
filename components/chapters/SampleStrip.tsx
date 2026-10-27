import { portfolioItems, stripSlugs } from "@/content/portfolio-items";
import { sampleStrip } from "@/content/sample-strip";
import { chapterHref } from "@/lib/chapters";
import { formatLabel } from "@/lib/portfolio";
import { cn } from "@/lib/cn";
import { ConceptBadge } from "@/components/primitives/ConceptBadge";
import { Button } from "@/components/primitives/Button";
import { SampleArt } from "@/components/samples/SampleArt";

/*
 * Filmstrip of Concept Samples directly under the hero. Frames keep their
 * true aspect ratios (9:16, 4:5, 1:1) at a shared height, like clips on a
 * reel. Each links to the full portfolio chapter.
 */
const frameWidth = {
  "9:16": "w-[7.5rem] sm:w-[8.4375rem]",
  "4:5": "w-[10.67rem] sm:w-[12rem]",
  "1:1": "w-[13.33rem] sm:w-[15rem]",
};

export function SampleStrip() {
  const items = stripSlugs.map((slug) => portfolioItems.find((item) => item.slug === slug)!);
  return (
    <section data-tone="paper" aria-label={sampleStrip.label} className="relative pb-16 lg:pb-24">
      <div className="page">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-rule pt-6">
          <p className="text-mono text-fg-muted">
            <span className="text-fg">{sampleStrip.label}</span> · {items.length} of {portfolioItems.length}
            <span className="ml-3 hidden normal-case tracking-normal sm:inline">— {sampleStrip.note}</span>
          </p>
          <Button href={chapterHref("portfolio")} variant="ghost" arrow>
            {sampleStrip.linkLabel}
          </Button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto overscroll-x-contain [scrollbar-width:thin]">
        <div className="page">
          <div className="perforations" aria-hidden="true" />
          <ul className="flex w-max snap-x snap-mandatory gap-5 py-5 sm:gap-8 lg:w-full lg:justify-between">
            {items.map((item) => (
              <li
                key={item.slug}
                className={cn(
                  "shrink-0 snap-start",
                  item.ratio === "1:1" ? "w-[13.33rem] sm:w-[15rem]" : "w-[12.5rem]",
                )}
              >
                <a href={chapterHref("portfolio")} className="group block rounded-xs no-underline">
                  <div className="flex h-[13.33rem] items-end sm:h-[15rem]">
                    <SampleArt
                      item={item}
                      className={cn(
                        frameWidth[item.ratio],
                        "transition-transform duration-[var(--dur-2)] ease-[var(--ease-cut)] group-hover:-translate-y-1",
                      )}
                    />
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-snug font-semibold group-hover:underline">{item.title}</p>
                  <p className="text-mono mt-1.5 text-fg-muted">
                    {item.type === "video" ? "Video" : "Infographic"} · {formatLabel(item)}
                  </p>
                </a>
                <ConceptBadge className="mt-2.5" />
              </li>
            ))}
          </ul>
          <div className="perforations" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
