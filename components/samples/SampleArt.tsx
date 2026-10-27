import type { PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/cn";
import { StoryArt } from "@/components/stage/StoryArt";

/*
 * Poster art for a portfolio item, built in SVG/HTML until real files are
 * supplied (O-05). Videos: a storyboard frame with a burned-in caption.
 * Infographics: a typeset artboard. Type is sized in container-query units
 * so the same art reads correctly in the strip, the grid, and the lightbox.
 * Decorative — the card carries the text.
 */
export function SampleArt({ item, className }: { item: PortfolioItem; className?: string }) {
  if (item.type === "video") {
    return (
      <div
        data-art-slug={item.slug}
        className={cn(
          "@container relative aspect-[9/16] overflow-hidden rounded-[6px] bg-ink-raised text-paper",
          className,
        )}
        aria-hidden="true"
      >
        <StoryArt kind={item.art.motif} />
        <span className="text-mono absolute top-[3%] left-[5%] rounded-xs bg-ink/80 px-[0.35em] py-[0.15em] text-[clamp(0.5rem,6cqi,0.75rem)]">
          00:00:00
        </span>
        <span
          data-caption=""
          className="absolute inset-x-[6%] bottom-[9%] text-center text-[clamp(0.625rem,8cqi,1rem)] leading-[1.5] font-semibold"
        >
          <span className="box-decoration-clone bg-ink px-[0.3em]">{item.art.caption}</span>
        </span>
        <span className="absolute inset-x-[6%] bottom-[4%] h-[2px] bg-paper/25">
          <span className="absolute top-1/2 left-0 h-[0.5rem] w-[2px] -translate-y-1/2 bg-remedy" />
        </span>
      </div>
    );
  }

  return (
    <div
      data-art-slug={item.slug}
      className={cn(
        "@container relative overflow-hidden border border-line-strong bg-paper text-ink",
        item.ratio === "1:1" ? "aspect-square" : "aspect-[4/5]",
        className,
      )}
      aria-hidden="true"
    >
      <div className={cn("flex h-full flex-col p-[8%]", item.ratio === "1:1" ? "bg-mist" : "bg-paper")}>
        <span className="text-mono text-[clamp(0.5rem,4cqi,0.75rem)] text-teal">{item.art.kicker}</span>
        <span className="font-display mt-[3%] text-[clamp(0.875rem,7.6cqi,1.75rem)] leading-[1.1]">{item.title}</span>
        <ol className="mt-auto grid gap-[2.5cqi]">
          {item.art.items.map((line, i) => (
            <li
              key={line}
              className="flex items-center gap-[2.5cqi] border-t border-line pt-[2.5cqi] text-[clamp(0.5625rem,4.6cqi,0.9375rem)] leading-tight"
            >
              <span className="grid aspect-square w-[1.5em] shrink-0 place-items-center rounded-full font-mono text-[0.8em] font-semibold shadow-[inset_0_0_0_1px_currentColor]">
                {i + 1}
              </span>
              <span className="truncate">{line}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
