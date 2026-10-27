"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { InfographicAnatomyView, hotspotClass, principleItems } from "./InfographicAnatomyView";

/*
 * 7F · interactive version. Each hotspot is a real <button>; hover, focus,
 * or tap makes it active, draws a leader line to the note, and opens it.
 */
type Leader = { points: string; key: number } | null;

export default function InfographicAnatomy() {
  const [active, setActive] = useState(0);
  const [leader, setLeader] = useState<Leader>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const noteId = useId();

  const measure = useCallback(() => {
    const container = containerRef.current;
    const note = noteRef.current;
    const button = buttonRefs.current[active];
    if (!container || !note || !button) return;
    const c = container.getBoundingClientRect();
    const b = button.getBoundingClientRect();
    const n = note.getBoundingClientRect();
    const hx = b.left + b.width / 2 - c.left;
    const hy = b.top + b.height / 2 - c.top;
    let points: string;
    if (n.left - c.left > hx + 24) {
      // Note sits to the right: run out horizontally, then drop to the note.
      const nx = n.left - c.left;
      const ny = Math.min(Math.max(hy, n.top - c.top + 28), n.bottom - c.top - 28);
      const elbow = nx - 28;
      points = `${hx + b.width / 2},${hy} ${elbow},${hy} ${elbow},${ny} ${nx},${ny}`;
    } else {
      // Note sits below: drop down to the note's top edge.
      const ny = n.top - c.top;
      const nx = Math.min(Math.max(hx, n.left - c.left + 28), n.right - c.left - 28);
      const elbow = ny - 20;
      points = `${hx},${hy + b.height / 2} ${hx},${elbow} ${nx},${elbow} ${nx},${ny}`;
    }
    setLeader((prev) => ({ points, key: prev?.points === points ? prev.key : (prev?.key ?? 0) + 1 }));
  }, [active]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [measure]);

  return (
    <InfographicAnatomyView
      mode="interactive"
      active={active}
      containerRef={containerRef}
      noteRef={noteRef}
      noteId={noteId}
      renderHotspot={(i) => (
        <button
          type="button"
          ref={(el) => {
            buttonRefs.current[i] = el;
          }}
          aria-label={`${String(i + 1).padStart(2, "0")}. ${principleItems[i].principle}`}
          aria-expanded={active === i}
          aria-controls={noteId}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setActive(i);
          }}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
          className={hotspotClass(active === i)}
        >
          {String(i + 1).padStart(2, "0")}
        </button>
      )}
      leader={
        leader ? (
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <polyline
              key={leader.key}
              points={leader.points}
              pathLength={1}
              fill="none"
              stroke="var(--color-teal)"
              strokeWidth="1.5"
              className="anim-draw"
            />
          </svg>
        ) : null
      }
    />
  );
}
