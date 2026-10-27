import type { ReactNode } from "react";
import { portfolio } from "@/content/portfolio";
import { formatLabel, type PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/cn";
import { ConceptBadge } from "@/components/primitives/ConceptBadge";

/*
 * Portfolio card following the guide's structure: title, audience,
 * communication goal, asset type and format, and the badge. `thumb` lets the
 * interactive explorer wrap the artwork in a lightbox trigger.
 */
export const cardWidth = {
  "9:16": "sm:w-[13rem]",
  "4:5": "sm:w-[16rem]",
  "1:1": "sm:w-[20rem]",
} as const;

export const thumbWidth = {
  "9:16": "sm:w-[11.25rem]",
  "4:5": "sm:w-[16rem]",
  "1:1": "sm:w-[20rem]",
} as const;

export function PortfolioCard({
  item,
  thumb,
  headingLevel = 3,
}: {
  item: PortfolioItem;
  thumb: ReactNode;
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  return (
    <article id={`sample-${item.slug}`} className="flex h-full flex-col">
      <div className="flex sm:h-[20rem] sm:items-end">{thumb}</div>
      <Heading className="mt-4 text-[1rem] leading-snug font-semibold">{item.title}</Heading>
      <dl className="text-small mt-2 grid gap-1 text-fg-muted">
        <div>
          <dt className="sr-only">{portfolio.card.audience}</dt>
          <dd>
            <span className="text-fg">{portfolio.card.audience}:</span> {item.audience}
          </dd>
        </div>
        <div>
          <dt className="sr-only">{portfolio.card.goal}</dt>
          <dd>
            <span className="text-fg">{portfolio.card.goal}:</span> {item.goal}
          </dd>
        </div>
        <div>
          <dt className="sr-only">{portfolio.card.format}</dt>
          <dd className="text-mono mt-1">
            {item.type === "video" ? "Video" : "Infographic"} · {formatLabel(item)}
          </dd>
        </div>
      </dl>
      <div className="mt-3">
        {item.status === "concept" ? (
          <ConceptBadge />
        ) : (
          <span className="text-mono text-fg-muted">{item.permission.clientName}</span>
        )}
      </div>
    </article>
  );
}

export function cardClass(item: PortfolioItem) {
  return cn("min-w-0", cardWidth[item.ratio]);
}
