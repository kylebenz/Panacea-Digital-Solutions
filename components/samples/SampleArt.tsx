import type { PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/cn";
import { StoryArt } from "@/components/stage/StoryArt";

/*
 * Poster art for a portfolio item, built in SVG/HTML until real files are
 * supplied (O-05). Videos: a storyboard frame with a burned-in caption.
 * Infographics: a typeset artboard. Decorative — the card carries the text.
 */
export function SampleArt({ item, className }: { item: PortfolioItem; className?: string }) {
  if (item.type === "video") {
    return (
      <div
        className={cn("relative aspect-[9/16] overflow-hidden rounded-[6px] bg-ink-raised text-paper", className)}
        aria-hidden="true"
      >
        <StoryArt kind={item.art.motif} />
        <span className="text-mono absolute top-2 left-2 rounded-xs bg-ink/80 px-1 py-0.5 text-[0.5625rem]">
          00:00:00
        </span>
        <span className="absolute inset-x-2 bottom-5 text-center text-[0.6875rem] leading-[1.5] font-semibold">
          <span className="box-decoration-clone bg-ink px-1">{item.art.caption}</span>
        </span>
        <span className="absolute inset-x-2 bottom-2 h-[2px] bg-paper/25">
          <span className="absolute top-1/2 left-0 h-2 w-[2px] -translate-y-1/2 bg-remedy" />
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line-strong bg-paper text-ink",
        item.ratio === "1:1" ? "aspect-square" : "aspect-[4/5]",
        className,
      )}
      aria-hidden="true"
    >
      <div className={cn("flex h-full flex-col p-[9%]", item.ratio === "1:1" ? "bg-mist" : "bg-paper")}>
        <span className="text-mono text-[0.5625rem] text-verdigris">{item.art.kicker}</span>
        <span className="font-display mt-1.5 text-[0.9375rem] leading-[1.12]">{item.title}</span>
        <ol className="mt-auto grid gap-1.5">
          {item.art.items.map((line, i) => (
            <li
              key={line}
              className="flex items-center gap-1.5 border-t border-line pt-1.5 text-[0.625rem] leading-tight"
            >
              <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-full font-mono text-[0.5rem] font-semibold shadow-[inset_0_0_0_1px_currentColor]">
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
