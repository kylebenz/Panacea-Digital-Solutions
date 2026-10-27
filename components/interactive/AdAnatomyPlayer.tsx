"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { adVideos } from "@/content/ad-videos";
import { AD_DURATION, AdAnatomyView, segments, valueText } from "./AdAnatomyView";

/*
 * 7E · interactive player. The playhead is an accessible slider
 * (role="slider", arrow keys, aria-valuetext naming the segment). Dragging
 * anywhere on the track, or keyboard-stepping, swaps the preview frame and
 * its annotation.
 */
export default function AdAnatomyPlayer({ arts }: { arts?: ReactNode[] }) {
  const [position, setPosition] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = (v: number) => Math.min(AD_DURATION, Math.max(0, v));

  function fromPointer(event: PointerEvent<HTMLDivElement>) {
    const rect = trackRef.current!.getBoundingClientRect();
    setPosition(clamp(((event.clientX - rect.left) / rect.width) * AD_DURATION));
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const starts = segments.map((s) => s.start);
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = Math.floor(position) + 1;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = Math.ceil(position) - 1;
        break;
      case "PageUp":
        next = starts.find((s) => s > position) ?? AD_DURATION;
        break;
      case "PageDown":
        next = [...starts].reverse().find((s) => s < position) ?? 0;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = AD_DURATION;
        break;
    }
    if (next === null) return;
    event.preventDefault();
    setPosition(clamp(next));
  }

  return (
    <AdAnatomyView
      mode="interactive"
      position={position}
      arts={arts ?? []}
      trackRef={trackRef}
      trackProps={{
        onPointerDown: (event) => {
          dragging.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          thumbRef.current?.focus({ preventScroll: true });
          fromPointer(event);
        },
        onPointerMove: (event) => {
          if (dragging.current) fromPointer(event);
        },
        onPointerUp: () => {
          dragging.current = false;
        },
        onPointerCancel: () => {
          dragging.current = false;
        },
      }}
      thumbProps={
        {
          ref: thumbRef,
          role: "slider",
          tabIndex: 0,
          "aria-label": adVideos.anatomy.sliderLabel,
          "aria-valuemin": 0,
          "aria-valuemax": AD_DURATION,
          "aria-valuenow": Math.round(position),
          "aria-valuetext": valueText(position),
          "aria-orientation": "horizontal",
          onKeyDown,
        } as React.HTMLAttributes<HTMLDivElement> & { ref: React.Ref<HTMLDivElement> }
      }
    />
  );
}
