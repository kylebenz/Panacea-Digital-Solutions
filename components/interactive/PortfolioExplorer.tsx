"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { portfolioItems } from "@/content/portfolio-items";
import { portfolio } from "@/content/portfolio";
import { topics, formatLabel, type PortfolioItem, type Topic } from "@/lib/portfolio";
import { cn } from "@/lib/cn";
import { inPageId, scrollToId } from "@/lib/wayfinding/navigate";
import { Button } from "@/components/primitives/Button";
import { ConceptBadge } from "@/components/primitives/ConceptBadge";
import { PortfolioCard, cardClass, thumbWidth } from "@/components/samples/PortfolioCard";

/*
 * 7G · Portfolio Explorer. Filter by format and topic (Radix Toggle Groups);
 * cards re-flow in place with Motion layout animation. Each card opens a
 * Radix Dialog lightbox — video items load their player only then (facade),
 * with captions from a .vtt track and a visible transcript. Closing returns
 * focus to the card.
 */

type TypeFilter = "all" | "video" | "infographic";
type TopicFilter = "all" | Topic;
const ease = [0.22, 1, 0.36, 1] as const;

function useHoverPreviewAllowed() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setOk(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return ok;
}

function Filter<T extends string>({
  id,
  label,
  value,
  onChange,
  items,
}: {
  id: string;
  label: string;
  value: T;
  onChange: (v: T) => void;
  items: ReadonlyArray<{ id: T; label: string }>;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-[6rem_1fr] md:items-center">
      <p id={id} className="text-mono text-fg-muted">
        {label}
      </p>
      <ToggleGroup.Root
        type="single"
        value={value}
        onValueChange={(v) => v && onChange(v as T)}
        aria-labelledby={id}
        className="flex flex-wrap gap-2"
      >
        {items.map((item) => (
          <ToggleGroup.Item key={item.id} value={item.id} className="chip min-h-9 cursor-pointer">
            {item.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}

function Thumb({ item, art, previewAllowed }: { item: PortfolioItem; art: ReactNode; previewAllowed: boolean }) {
  const [hovering, setHovering] = useState(false);
  const preview = item.type === "video" ? item.media.previewSrc : undefined;
  return (
    <Dialog.Trigger asChild>
      <button
        type="button"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        className={cn(
          "group relative block w-full cursor-zoom-in rounded-[6px] text-left transition-transform duration-[var(--dur-2)] ease-[var(--ease-cut)] hover:-translate-y-1",
          thumbWidth[item.ratio],
        )}
      >
        <span className="sr-only">{portfolio.card.open(item.type === "video" ? "Play" : "View", item.title)}</span>
        {art}
        {/* Muted hover preview only when a preview file exists. */}
        {preview && previewAllowed && hovering ? (
          <video
            className="absolute inset-0 h-full w-full rounded-[6px] object-cover"
            src={preview}
            muted
            autoPlay
            loop
            playsInline
            aria-hidden="true"
          />
        ) : null}
        <span className="text-mono absolute right-2 bottom-2 rounded-xs bg-ink/85 px-1.5 py-1 text-[0.625rem] text-paper opacity-0 transition-opacity duration-[var(--dur-1)] group-hover:opacity-100 group-focus-visible:opacity-100">
          {item.type === "video" ? "Play" : "View"}
        </span>
      </button>
    </Dialog.Trigger>
  );
}

function Lightbox({ item, art, onClose }: { item: PortfolioItem; art: ReactNode; onClose: () => void }) {
  const pendingId = useRef<string | null>(null);
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/80" />
      <Dialog.Content
        data-tone="paper"
        aria-describedby={undefined}
        className="fixed inset-x-0 top-0 bottom-0 z-50 m-auto flex max-h-[min(54rem,100dvh)] w-full max-w-5xl flex-col overflow-y-auto border border-rule-strong sm:inset-6"
        onCloseAutoFocus={(event) => {
          const id = pendingId.current;
          if (!id) return; // default: Radix returns focus to the card
          pendingId.current = null;
          event.preventDefault();
          scrollToId(id);
        }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3">
          <ConceptBadge />
          <Dialog.Close className="text-mono inline-flex min-h-10 items-center gap-2 rounded-xs px-2">
            {portfolio.lightbox.close}
            <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true" fill="none">
              <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Dialog.Close>
        </div>
        <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex justify-center">
            {item.type === "video" ? (
              <div className="w-full max-w-[20rem]">
                <video
                  className="aspect-[9/16] w-full rounded-[6px] bg-ink"
                  controls
                  playsInline
                  preload="metadata"
                  poster={item.media.poster}
                  aria-label={portfolio.lightbox.videoLabel(item.title)}
                >
                  <source src={item.media.src} type="video/mp4" />
                  <track
                    kind="captions"
                    src={item.media.captions}
                    srcLang="en"
                    label={portfolio.lightbox.captionsLabel}
                    default
                  />
                </video>
                {item.media.placeholder ? (
                  <p className="text-mono mt-2 text-fg-muted">{portfolio.lightbox.placeholder}</p>
                ) : null}
              </div>
            ) : (
              <div className={cn("w-full", item.ratio === "1:1" ? "max-w-[26rem]" : "max-w-[24rem]")}>{art}</div>
            )}
          </div>
          <div>
            <Dialog.Title className="text-display-m">{item.title}</Dialog.Title>
            <dl className="mt-6 grid gap-3 border-t border-rule pt-5">
              {(
                [
                  [portfolio.card.audience, item.audience],
                  [portfolio.card.madeFor, item.businessType],
                  [portfolio.card.goal, item.goal],
                  [portfolio.card.format, `${item.type === "video" ? "Video" : "Infographic"} · ${formatLabel(item)}`],
                ] as const
              ).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3">
                  <dt className="text-mono pt-0.5 text-fg-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {item.type === "video" ? (
              <div className="mt-6 border-t border-rule pt-5">
                <h3 className="text-mono text-fg-muted">{portfolio.lightbox.transcript}</h3>
                <ol className="mt-3 grid gap-2">
                  {item.script.map((cue) => (
                    <li key={cue.start} className="grid grid-cols-[3.5rem_1fr] gap-3">
                      <span className="text-mono pt-0.5 text-fg-muted tabular-nums">
                        0:{String(cue.start).padStart(2, "0")}
                      </span>
                      <span>{cue.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <div className="mt-6 border-t border-rule pt-5">
                <h3 className="text-mono text-fg-muted">{item.art.kicker}</h3>
                <ol className="mt-3 grid list-decimal gap-1.5 pl-5">
                  {item.art.items.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ol>
              </div>
            )}
            <Button
              href={portfolio.cta.href}
              arrow
              className="mt-8"
              onClick={(event) => {
                // Close first (releasing the scroll lock), then jump to the form.
                const id = inPageId(event.currentTarget as HTMLAnchorElement);
                if (!id) return;
                event.preventDefault();
                pendingId.current = id;
                onClose();
              }}
            >
              {portfolio.cta.label}
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default function PortfolioExplorer({ artBySlug }: { artBySlug?: Record<string, ReactNode> }) {
  const [type, setType] = useState<TypeFilter>("all");
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const previewAllowed = useHoverPreviewAllowed();
  const arts = artBySlug ?? {};

  const shown = useMemo(
    () =>
      portfolioItems.filter(
        (item) => (type === "all" || item.type === type) && (topic === "all" || item.topic === topic),
      ),
    [type, topic],
  );

  const topicItems = [
    { id: "all" as TopicFilter, label: portfolio.filters.allTopics },
    ...(Object.keys(topics) as Topic[]).map((t) => ({ id: t as TopicFilter, label: topics[t] })),
  ];

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <div className="grid gap-4">
          <Filter
            id="portfolio-type"
            label={portfolio.filters.typeLabel}
            value={type}
            onChange={setType}
            items={portfolio.filters.types}
          />
          <Filter
            id="portfolio-topic"
            label={portfolio.filters.topicLabel}
            value={topic}
            onChange={setTopic}
            items={topicItems}
          />
        </div>
        <p className="text-mono mt-6 text-fg-muted" aria-live="polite">
          {portfolio.count(shown.length, portfolioItems.length)}
        </p>

        {shown.length === 0 ? (
          <div className="mt-10 grid place-items-start gap-4 border border-dashed border-rule-strong p-8">
            <p>{portfolio.empty}</p>
            <Button
              variant="secondary"
              onClick={() => {
                setType("all");
                setTopic("all");
              }}
            >
              {portfolio.reset}
            </Button>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-2 items-start gap-x-4 gap-y-10 sm:flex sm:flex-wrap sm:gap-x-8 sm:gap-y-14">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((item) => (
                <m.li
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0, transition: { duration: 0.18 } }}
                  transition={{ duration: 0.42, ease }}
                  className={cardClass(item)}
                >
                  <Dialog.Root
                    open={openSlug === item.slug}
                    onOpenChange={(open) => setOpenSlug(open ? item.slug : null)}
                  >
                    <PortfolioCard
                      item={item}
                      thumb={<Thumb item={item} art={arts[item.slug]} previewAllowed={previewAllowed} />}
                    />
                    <Lightbox item={item} art={arts[item.slug]} onClose={() => setOpenSlug(null)} />
                  </Dialog.Root>
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </MotionConfig>
    </LazyMotion>
  );
}
