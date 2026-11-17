import type { ReactNode } from "react";
import { chapterById } from "@/lib/chapters";
import { cn } from "@/lib/cn";

/*
 * Section wrapper shared by every chapter after the hero. Owns the anchor id,
 * tone, eyebrow label, and the focusable H2 that anchor jumps land on.
 * Each chapter component composes this, so any chapter can later move to its
 * own route without rework (brief 4.4).
 */
export function Chapter({
  id,
  title,
  lede,
  action,
  children,
  defer = true,
  align = "start",
  layout = "stack",
  className,
}: {
  id: string;
  title: string;
  lede?: ReactNode;
  /** Optional button shown to the right of the heading on wide screens. */
  action?: ReactNode;
  children?: ReactNode;
  /** content-visibility: auto for chapters below the fold. */
  defer?: boolean;
  align?: "start" | "center";
  /** "split": heading on the left, body on the right on large screens. */
  layout?: "stack" | "split";
  className?: string;
}) {
  const chapter = chapterById(id);
  const titleId = `${id}-title`;
  const centered = align === "center";

  const header = (
    <header
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        !!action && "sm:flex-row sm:items-end sm:justify-between sm:gap-8",
      )}
    >
      <div className={cn("flex flex-col gap-4", centered && "items-center")}>
        <p className="eyebrow">{chapter.label}</p>
        <h2
          id={titleId}
          tabIndex={-1}
          data-chapter-heading=""
          className={cn("text-display-l max-w-[22ch]", centered && "mx-auto")}
        >
          {title}
        </h2>
        {lede ? <div className={cn("measure text-fg-muted", centered && "mx-auto")}>{lede}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );

  return (
    <section
      id={id}
      data-chapter=""
      data-tone={chapter.tone}
      data-defer={defer ? "" : undefined}
      aria-labelledby={titleId}
      className={cn("chapter py-[var(--chapter-pad)]", className)}
    >
      <div className={cn("page relative", layout === "split" && "grid gap-10 lg:grid-cols-2 lg:gap-16")}>
        {header}
        {children}
      </div>
    </section>
  );
}
