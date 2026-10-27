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
    <span aria-hidden="true" className={cn("inline-flex items-center gap-3", className)}>
      <Monogram className={cn("shrink-0", subline ? "h-10" : "h-8")} />
      <Wordmark subline={subline} className={cn(subline ? "h-8" : "h-[1.375rem]", wordmarkClassName)} />
    </span>
  );
}
