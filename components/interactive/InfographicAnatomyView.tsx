import type { CSSProperties, ReactNode, Ref } from "react";
import { infographics } from "@/content/infographics";
import { cn } from "@/lib/cn";
import { Callout } from "@/components/primitives/Callout";
import { ConceptBadge } from "@/components/primitives/ConceptBadge";
import { RegistrationMarks } from "@/components/primitives/RegistrationMarks";

/*
 * 7F · Infographic Anatomy — shared markup for the static server render and
 * the interactive version. The concept infographic is built in HTML/SVG on a
 * 4:5 artboard; five numbered points map to the guide's principles.
 */

const { principles, sample } = infographics;
export const principleItems = principles.items;

/** Hotspot positions as percentages of the artboard. */
export const hotspots: Array<{ left: number; top: number }> = [
  { left: 0, top: 23 }, // central idea → title
  { left: 100, top: 50 }, // hierarchy → numbered questions
  { left: 100, top: 80 }, // verified → approval line
  { left: 70, top: 8 }, // licensed → illustration
  { left: 50, top: 100 }, // dimensions → bottom edge / size label
];

function HouseIllustration() {
  return (
    <svg viewBox="0 0 64 48" className="h-full w-full" aria-hidden="true" fill="none">
      <path d="M4 44h56" stroke="var(--color-verdigris)" strokeWidth="1.5" />
      <path d="M12 24 32 8l20 16" stroke="var(--color-verdigris)" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="16" y="22" width="32" height="22" stroke="var(--color-verdigris)" strokeWidth="1.5" />
      <rect x="20" y="27" width="7" height="7" fill="var(--color-remedy)" />
      <rect x="36" y="27" width="7" height="7" stroke="var(--color-verdigris)" strokeWidth="1.25" />
      <rect x="28" y="34" width="7" height="10" stroke="var(--color-verdigris)" strokeWidth="1.25" />
    </svg>
  );
}

type Props = {
  mode: "static" | "interactive";
  active: number;
  /** Interactive mode supplies real buttons; static mode draws markers. */
  renderHotspot?: (index: number) => ReactNode;
  containerRef?: Ref<HTMLDivElement>;
  noteRef?: Ref<HTMLDivElement>;
  leader?: ReactNode;
  noteId?: string;
};

export function InfographicAnatomyView({ mode, active, renderHotspot, containerRef, noteRef, leader, noteId }: Props) {
  const activeItem = principleItems[active];
  return (
    <div ref={containerRef} className="grid-12 relative items-start gap-y-10 md:gap-y-8">
      {/* Principles: heading above the artboard on small screens, beside it on large. */}
      <div className="col-span-12 md:col-span-5 md:col-start-8 md:row-start-1 lg:col-span-5 lg:col-start-8">
        <h3 className="text-display-m">{principles.title}</h3>
        <p className="measure mt-3 text-fg-muted">{principles.intro}</p>
      </div>
      {/* Artboard */}
      <div className="col-span-12 md:col-span-6 md:row-span-2 md:row-start-1 lg:col-span-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <ConceptBadge />
          <span className="text-mono text-fg-muted" aria-hidden="true">
            4:5 · PNG
          </span>
        </div>
        <div className="relative mx-auto max-w-[30rem] pt-6 pr-6">
          {/* Measured edges */}
          <div
            className="text-mono absolute top-0 right-6 left-0 flex items-center gap-2 text-[0.625rem] text-fg-muted"
            aria-hidden="true"
          >
            <span className="h-2 w-px bg-current" />
            <span className="h-px flex-1 bg-current opacity-50" />
            <span>1080 px</span>
            <span className="h-px flex-1 bg-current opacity-50" />
            <span className="h-2 w-px bg-current" />
          </div>
          <div
            className="text-mono absolute top-6 right-0 bottom-0 flex w-4 flex-col items-center gap-2 text-[0.625rem] text-fg-muted"
            aria-hidden="true"
          >
            <span className="h-px w-2 bg-current" />
            <span className="w-px flex-1 bg-current opacity-50" />
            <span className="[writing-mode:vertical-rl]">1350 px</span>
            <span className="w-px flex-1 bg-current opacity-50" />
            <span className="h-px w-2 bg-current" />
          </div>

          <figure
            aria-label={sample.label}
            className="@container relative aspect-[4/5] bg-paper text-ink shadow-[0_0_0_1px_var(--color-line-strong),0_24px_48px_-32px_rgb(17_24_22/0.5)]"
          >
            <RegistrationMarks />
            <div className="flex h-full flex-col p-[7%]">
              <div className="flex items-start justify-between gap-4">
                <p className="text-mono text-[clamp(0.5625rem,2.3cqi,0.6875rem)] text-verdigris">{sample.kicker}</p>
                <div className="-mt-1 aspect-[4/3] w-[24%] shrink-0">
                  <HouseIllustration />
                </div>
              </div>
              <p className="font-display mt-[2%] max-w-[14ch] text-[clamp(1.125rem,6.6cqi,2rem)] leading-[1.08]">
                {sample.title}
              </p>
              <ol className="mt-[6%] grid border-t border-line">
                {sample.questions.map((q, i) => (
                  <li key={q} className="flex items-baseline gap-3 border-b border-line py-[3%]">
                    <span className="font-mono text-[clamp(0.625rem,2.5cqi,0.75rem)] font-semibold text-verdigris">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[clamp(0.6875rem,3.4cqi,1rem)] leading-snug font-medium">{q}</span>
                  </li>
                ))}
              </ol>
              <p className="text-mono mt-auto flex items-center gap-2 pt-[4%] text-[clamp(0.5rem,2.1cqi,0.625rem)] text-ink-2">
                <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 shrink-0" aria-hidden="true" fill="none">
                  <path d="M1.5 5.5 4 8l4.5-6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                {sample.approval}
              </p>
              <div className="mt-[3%] flex items-center justify-between gap-3 bg-ink px-[4%] py-[3%] text-paper">
                <span className="text-[clamp(0.625rem,2.8cqi,0.8125rem)] font-semibold">{sample.footerName}</span>
                <span className="text-mono text-[clamp(0.5rem,2.1cqi,0.625rem)] text-paper-dim">
                  {sample.footerContact}
                </span>
              </div>
            </div>

            {/* Hotspots */}
            {hotspots.map((spot, i) => (
              <div
                key={i}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${spot.left}%`, top: `${spot.top}%` } as CSSProperties}
              >
                {renderHotspot ? (
                  renderHotspot(i)
                ) : (
                  <Callout n={i + 1} active={false} className="shadow-[0_0_0_3px_var(--color-paper)]" />
                )}
              </div>
            ))}
          </figure>
        </div>
      </div>

      <div className="col-span-12 md:col-span-5 md:col-start-8 md:row-start-2 lg:col-span-5 lg:col-start-8">
        {mode === "interactive" ? (
          <>
            <div
              ref={noteRef}
              id={noteId}
              className="relative border border-rule-strong bg-bg p-6 shadow-[inset_4px_0_0_var(--color-remedy)]"
            >
              <p className="text-mono text-fg-muted">
                Principle {String(active + 1).padStart(2, "0")} / {String(principleItems.length).padStart(2, "0")}
              </p>
              <p className="text-h3 mt-2">{activeItem.principle}</p>
              <p className="measure mt-3 text-fg-muted">{activeItem.inSample}</p>
            </div>
            <ol className="sr-only">
              {principleItems.map((item, i) => (
                <li key={item.id}>
                  {i + 1}. {item.principle} {item.inSample}
                </li>
              ))}
            </ol>
          </>
        ) : (
          <ol className="grid gap-5">
            {principleItems.map((item, i) => (
              <li key={item.id} className="flex gap-4">
                <Callout n={i + 1} />
                <div>
                  <p className="font-semibold">{item.principle}</p>
                  <p className="text-small mt-1 text-fg-muted">{item.inSample}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
      {leader}
    </div>
  );
}

export const hotspotClass = (on: boolean) =>
  cn(
    "grid h-9 w-9 place-items-center rounded-full font-mono text-[0.75rem] font-semibold tabular-nums transition-[background-color,box-shadow] duration-[var(--dur-1)]",
    on
      ? "bg-remedy text-ink shadow-[0_0_0_1.5px_var(--color-ink),0_0_0_5px_var(--color-paper)]"
      : "bg-paper text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink),0_0_0_4px_rgb(245_241_232/0.9)] hover:bg-mist",
  );
