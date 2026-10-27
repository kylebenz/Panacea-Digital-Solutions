import type { ReactNode } from "react";
import type { PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/cn";
import { PortfolioCard, cardClass, thumbWidth } from "./PortfolioCard";

/* Static portfolio grid (no-JS / pre-hydration): every item, no filters. */
export function PortfolioGrid({ items, arts }: { items: PortfolioItem[]; arts: Record<string, ReactNode> }) {
  return (
    <ul className="grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-14">
      {items.map((item) => (
        <li key={item.slug} className={cardClass(item)}>
          <PortfolioCard
            item={item}
            thumb={<div className={cn("w-full", thumbWidth[item.ratio])}>{arts[item.slug]}</div>}
          />
        </li>
      ))}
    </ul>
  );
}
