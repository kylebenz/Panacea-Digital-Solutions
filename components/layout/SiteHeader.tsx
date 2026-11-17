"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { chapterHref, navChapters } from "@/lib/chapters";
import { globalCopy } from "@/content/global";
import { cn } from "@/lib/cn";
import { restartWayfinding, useWayfinding } from "@/lib/wayfinding/store";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/primitives/Button";
import { MobileMenu } from "./MobileMenu";

export function SiteHeader() {
  const pathname = usePathname();
  const condensed = useWayfinding((s) => s.condensed);
  const activeId = useWayfinding((s) => s.activeId);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    restartWayfinding();
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header
      data-tone="paper"
      data-condensed={condensed || undefined}
      className={cn(
        "sticky top-0 z-40 border-b transition-[border-color] duration-[var(--dur-2)] ease-[var(--ease-cut)]",
        // Condensed: a hairline in the logo gradient under a soft rule.
        condensed ? "header-hairline border-rule" : "border-transparent",
      )}
    >
      <div
        // Constant height: animating it would re-lay out the whole page on every
        // frame as scrolling starts. Condensing only adds the hairline.
        className="page flex h-[var(--header-h-condensed)] items-center gap-4"
      >
        <a href={chapterHref("top")} className="shrink-0 rounded-xs">
          <span className="sr-only">{globalCopy.homeLabel}</span>
          <Logo />
        </a>

        <span className="flex-1" aria-hidden="true" />

        <nav aria-label={globalCopy.primaryNavLabel} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navChapters.map((chapter) => {
              const current = isHome && chapter.id === activeId;
              return (
                <li key={chapter.id}>
                  <a
                    href={chapterHref(chapter.id)}
                    aria-current={current ? "location" : undefined}
                    className={cn(
                      "relative inline-flex min-h-10 items-center px-3 text-[0.9375rem] font-medium no-underline transition-colors duration-[var(--dur-1)]",
                      current ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {chapter.nav}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "bg-brand-gradient absolute inset-x-3 bottom-1 h-[2px] origin-left transition-transform duration-[var(--dur-2)] ease-[var(--ease-cut)]",
                        current ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <Button href={chapterHref("contact")} size="sm" arrow className="hidden shrink-0 sm:inline-flex">
          {globalCopy.getStarted}
        </Button>

        <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} activeId={isHome ? activeId : null} />
      </div>
    </header>
  );
}
