import type { ReactNode } from "react";
import { chapterById } from "@/lib/chapters";
import { cn } from "@/lib/cn";
import { ChapterMarker } from "@/components/primitives/ChapterMarker";
import { HairlineGrid } from "@/components/primitives/HairlineGrid";

/*
 * Section wrapper shared by every chapter after the hero. Owns the anchor id,
 * tone, chapter marker, and the focusable H2 that anchor jumps land on.
 * Each chapter component composes this, so any chapter can later move to its
 * own route without rework (brief 4.4).
 */
export function Chapter({
  id,
  title,
  lede,
  children,
  defer = true,
  layout = "stack",
  className,
  headerClassName,
}: {
  id: string;
  title: string;
  lede?: ReactNode;
  children?: ReactNode;
  /** content-visibility: auto for chapters below the fold. */
  defer?: boolean;
  /** "split": heading in the left third, body to the right on large screens. */
  layout?: "stack" | "split";
  className?: string;
  headerClassName?: string;
}) {
  const chapter = chapterById(id);
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      data-chapter=""
      data-tone={chapter.tone}
      data-defer={defer ? "" : undefined}
      aria-labelledby={titleId}
      className={cn("chapter py-[var(--chapter-pad)]", className)}
    >
      {chapter.grid ? <HairlineGrid /> : null}
      <div className={cn("page relative", layout === "split" && "grid-12 gap-y-10")}>
        <header
          className={cn(
            "grid-12 gap-y-6",
            layout === "split" &&
              "col-span-12 self-start lg:sticky lg:top-[calc(var(--header-h-condensed)+2rem)] lg:col-span-4",
            headerClassName,
          )}
        >
          <ChapterMarker number={chapter.number} label={chapter.label} className="col-span-12" />
          <h2
            id={titleId}
            tabIndex={-1}
            data-chapter-heading=""
            className={cn(
              "text-display-l col-span-12 max-w-[24ch] justify-self-start",
              layout === "stack" && "md:col-span-10 lg:col-span-8",
            )}
          >
            {title}
          </h2>
          {lede ? (
            <div
              className={cn(
                "text-body-l measure col-span-12 text-fg-muted",
                layout === "stack" && "md:col-span-8 lg:col-span-6",
              )}
            >
              {lede}
            </div>
          ) : null}
        </header>
        {layout === "split" ? <div className="col-span-12 lg:col-span-8 lg:col-start-5">{children}</div> : children}
      </div>
    </section>
  );
}
