import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { RegistrationMarks } from "./RegistrationMarks";

const ratios = {
  "4:5": { className: "aspect-[4/5]", size: "1080 × 1350" },
  "1:1": { className: "aspect-square", size: "1080 × 1080" },
} as const;

/*
 * Infographic artboard: paper surface, hairline border, registration marks,
 * and measured dimension labels along two edges.
 */
export function InfographicFrame({
  ratio = "4:5",
  children,
  showMeasure = true,
  className,
}: {
  ratio?: keyof typeof ratios;
  children?: ReactNode;
  showMeasure?: boolean;
  className?: string;
}) {
  const spec = ratios[ratio];
  const [w, h] = spec.size.split(" × ");
  return (
    <div className={cn("relative", showMeasure && "pt-6 pl-6", className)}>
      {showMeasure ? (
        <>
          <div
            className="text-mono absolute top-0 right-0 left-6 flex items-center gap-2 text-fg-muted"
            aria-hidden="true"
          >
            <span className="h-2 w-px bg-current" />
            <span className="h-px flex-1 bg-current opacity-50" />
            <span>{w} px</span>
            <span className="h-px flex-1 bg-current opacity-50" />
            <span className="h-2 w-px bg-current" />
          </div>
          <div
            className="text-mono absolute top-6 bottom-0 left-0 flex w-4 flex-col items-center gap-2 text-fg-muted"
            aria-hidden="true"
          >
            <span className="h-px w-2 bg-current" />
            <span className="w-px flex-1 bg-current opacity-50" />
            <span className="[writing-mode:vertical-rl] rotate-180">{h} px</span>
            <span className="w-px flex-1 bg-current opacity-50" />
            <span className="h-px w-2 bg-current" />
          </div>
        </>
      ) : null}
      <div
        className={cn("relative bg-paper text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)]", spec.className)}
      >
        <RegistrationMarks />
        <div className="relative h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
