"use client";

import { chapterHref } from "@/lib/chapters";
import { globalCopy } from "@/content/global";
import { cn } from "@/lib/cn";
import { useWayfinding } from "@/lib/wayfinding/store";
import { Button } from "@/components/primitives/Button";

/*
 * Sticky bottom CTA for small screens: appears once the hero has scrolled
 * away and hides while #contact is on screen. Hidden state is inert so it
 * never traps keyboard focus off-screen.
 */
export function MobileCtaBar() {
  const heroVisible = useWayfinding((s) => s.heroVisible);
  const contactVisible = useWayfinding((s) => s.contactVisible);
  const shown = !heroVisible && !contactVisible;

  return (
    <div
      data-tone="ink"
      data-mobile-cta=""
      inert={!shown}
      aria-hidden={!shown || undefined}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-rule px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-[var(--dur-2)] ease-[var(--ease-cut)] lg:hidden",
        shown ? "translate-y-0" : "translate-y-[110%]",
      )}
    >
      <Button href={chapterHref("contact")} className="w-full" arrow>
        {globalCopy.getStarted}
      </Button>
    </div>
  );
}
