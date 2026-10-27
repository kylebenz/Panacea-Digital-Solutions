import { cn } from "@/lib/cn";
import { Monogram } from "./Monogram";
import { Wordmark } from "./Wordmark";

export function Logo({
  className,
  subline = true,
  wordmarkClassName,
}: {
  className?: string;
  subline?: boolean;
  wordmarkClassName?: string;
}) {
  return (
    <span aria-hidden="true" className={cn("inline-flex items-center gap-2.5", className)}>
      <Monogram className="h-7 shrink-0" />
      <Wordmark subline={subline} className={cn(subline ? "h-8" : "h-[1.375rem]", wordmarkClassName)} />
    </span>
  );
}
