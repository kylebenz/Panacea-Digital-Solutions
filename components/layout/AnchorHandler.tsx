"use client";

import { useEffect } from "react";
import { handleAnchorClick, scrollToId } from "@/lib/wayfinding/navigate";

/*
 * Delegated handler for every same-page anchor (nav, rail, CTAs, skip
 * links). Also re-settles a deep link such as /#pricing on first load,
 * since deferred chapters may have rendered at estimated heights.
 */
export function AnchorHandler() {
  useEffect(() => {
    document.addEventListener("click", handleAnchorClick);
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && document.getElementById(id)) {
      requestAnimationFrame(() => scrollToId(id, { updateHash: false }));
    }
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);
  return null;
}
