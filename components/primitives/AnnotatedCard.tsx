import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Callout } from "./Callout";

/*
 * A card in the "diagram language": hairline frame, numbered callout,
 * mono kicker, and an optional measured annotation along the bottom edge.
 */
export function AnnotatedCard({
  n,
  kicker,
  title,
  children,
  measure,
  className,
  headingLevel = 3,
}: {
  n?: number;
  kicker?: string;
  title: string;
  children?: ReactNode;
  measure?: string;
  className?: string;
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h4";
  return (
    <div className={cn("relative border border-rule-strong bg-bg p-5 sm:p-6", className)}>
      <div className="flex items-start gap-4">
        {typeof n === "number" ? <Callout n={n} /> : null}
        <div className="min-w-0">
          {kicker ? <p className="text-mono mb-1.5 text-fg-muted">{kicker}</p> : null}
          <Heading className="text-h3">{title}</Heading>
          {children ? <div className="mt-2 text-fg-muted">{children}</div> : null}
        </div>
      </div>
      {measure ? (
        <div className="text-mono mt-5 flex items-center gap-2 text-fg-muted" aria-hidden="true">
          <span className="h-2 w-px bg-current" />
          <span className="h-px flex-1 bg-current opacity-60" />
          <span>{measure}</span>
          <span className="h-px flex-1 bg-current opacity-60" />
          <span className="h-2 w-px bg-current" />
        </div>
      ) : null}
    </div>
  );
}
