"use client";

import { lazy, Suspense, useState } from "react";

const loadDialog = () => import("./MobileMenuDialog");
const MobileMenuDialog = lazy(loadDialog);

/*
 * Menu trigger for small screens. The full-screen dialog (Radix) is loaded
 * on first intent — pointer-over, focus, or tap — not with the page.
 */
export function MobileMenu({
  open,
  onOpenChange,
  activeId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeId: string | null;
}) {
  const [requested, setRequested] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={() => void loadDialog()}
        onFocus={() => void loadDialog()}
        onClick={() => {
          setRequested(true);
          onOpenChange(true);
        }}
        className="text-mono inline-flex min-h-10 shrink-0 items-center gap-2 rounded-xs px-2 text-fg lg:hidden"
      >
        <span>Menu</span>
        <svg viewBox="0 0 16 12" className="h-3 w-4" aria-hidden="true" fill="none">
          <path d="M0 1h16M0 6h16M0 11h10" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      {requested ? (
        <Suspense fallback={null}>
          <MobileMenuDialog open={open} onOpenChange={onOpenChange} activeId={activeId} />
        </Suspense>
      ) : null}
    </>
  );
}
