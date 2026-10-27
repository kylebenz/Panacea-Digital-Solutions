"use client";

import { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { chapterHref, chapterTimecode, chapters } from "@/lib/chapters";
import { globalCopy } from "@/content/global";
import { cn } from "@/lib/cn";
import { inPageId, scrollToId } from "@/lib/wayfinding/navigate";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/primitives/Button";

export default function MobileMenuDialog({
  open,
  onOpenChange,
  activeId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeId: string | null;
}) {
  // Loaded on demand by MobileMenu.tsx so Radix stays out of first-load JS.
  // A link click closes the menu first (releasing the scroll lock), then
  // scrolls and focuses the chapter instead of returning focus to the trigger.
  const pendingId = useRef<string | null>(null);

  function onLinkClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const id = inPageId(event.currentTarget);
    if (!id || !document.getElementById(id)) {
      onOpenChange(false);
      return;
    }
    event.preventDefault();
    pendingId.current = id;
    onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Content
          data-tone="ink"
          aria-describedby={undefined}
          className="mobile-menu fixed inset-0 z-50 flex flex-col overflow-y-auto lg:hidden"
          onCloseAutoFocus={(event) => {
            const id = pendingId.current;
            if (!id) return;
            pendingId.current = null;
            event.preventDefault();
            scrollToId(id);
          }}
        >
          <div className="page flex h-[var(--header-h)] shrink-0 items-center justify-between border-b border-rule">
            <Logo />
            <Dialog.Close className="text-mono inline-flex min-h-10 items-center gap-2 rounded-xs px-2">
              <span>Close</span>
              <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true" fill="none">
                <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Dialog.Close>
          </div>
          <nav aria-label={globalCopy.menuTitle} className="page flex-1 py-6">
            <Dialog.Title className="text-mono mb-4 text-fg-muted">{globalCopy.menuTitle}</Dialog.Title>
            <ol className="border-t border-rule">
              {chapters.map((chapter, index) => {
                const current = chapter.id === activeId;
                return (
                  <li
                    key={chapter.id}
                    className="mobile-menu-item border-b border-rule"
                    style={{ "--i": index } as React.CSSProperties}
                  >
                    <a
                      href={chapterHref(chapter.id)}
                      onClick={onLinkClick}
                      aria-current={current ? "location" : undefined}
                      className="flex min-h-12 items-baseline gap-4 py-2.5 no-underline"
                    >
                      <span className={cn("text-mono w-7 shrink-0", current ? "text-accent" : "text-fg-muted")}>
                        {chapter.number}
                      </span>
                      <span className="font-display flex-1 text-[1.5rem] leading-tight">{chapter.label}</span>
                      <span className="text-mono text-fg-muted" aria-hidden="true">
                        {chapterTimecode(chapter.number)}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="page sticky bottom-0 border-t border-rule bg-bg py-4">
            <Button href={chapterHref("contact")} onClick={onLinkClick} className="w-full" arrow>
              {globalCopy.getStarted}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
