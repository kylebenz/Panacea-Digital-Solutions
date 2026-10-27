"use client";

import { usePathname } from "next/navigation";
import { globalCopy } from "@/content/global";

const linkClass = "btn btn-primary fixed top-3 left-3 z-[60] -translate-y-[200%] focus-visible:translate-y-0";

/* Skip to main content everywhere; skip to the inquiry form on the home page. */
export function SkipLinks() {
  const pathname = usePathname();
  return (
    <>
      <a href="#main" className={linkClass}>
        {globalCopy.skipToContent}
      </a>
      {pathname === "/" ? (
        <a href="#contact" className={linkClass}>
          {globalCopy.skipToContact}
        </a>
      ) : null}
    </>
  );
}
