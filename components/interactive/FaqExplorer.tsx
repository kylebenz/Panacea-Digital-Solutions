"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { faq, faqAnchor } from "@/content/faq";
import { cn } from "@/lib/cn";
import { scrollToId } from "@/lib/wayfinding/navigate";
import { FaqAnswer } from "@/components/faq/FaqAnswer";

/*
 * FAQ: Radix Accordion with a live filter and per-question anchors
 * (#faq-<id>). Closed answers stay in the DOM as hidden="until-found", so
 * the text remains indexable, matches the FAQPage schema, and opens when
 * found with the browser's find-in-page.
 */
const normalise = (s: string) => s.toLowerCase().replace(/[“”"’']/g, "");

export default function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const matches = useMemo(() => {
    const q = normalise(query.trim());
    return faq.items.filter((item) => !q || normalise(`${item.question} ${item.answer}`).includes(q)).map((i) => i.id);
  }, [query]);

  // Deep link: /#faq-<id> opens that answer and lands on it.
  useEffect(() => {
    const openFromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const item = faq.items.find((i) => faqAnchor(i.id) === hash);
      if (!item) return;
      setOpen((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
      requestAnimationFrame(() => scrollToId(hash, { updateHash: false }));
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  // Find-in-page reveals hidden="until-found" content; keep state in step.
  useEffect(() => {
    const cleanups = faq.items.map((item) => {
      const el = contentRefs.current[item.id];
      if (!el) return () => {};
      const onMatch = () => setOpen((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
      el.addEventListener("beforematch", onMatch);
      return () => el.removeEventListener("beforematch", onMatch);
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  // React only renders boolean `hidden`, so set "until-found" directly.
  useEffect(() => {
    for (const item of faq.items) {
      const el = contentRefs.current[item.id];
      if (!el) continue;
      if (open.includes(item.id)) el.removeAttribute("hidden");
      else el.setAttribute("hidden", "until-found");
    }
  }, [open]);

  async function copyLink(id: string) {
    const url = `${window.location.origin}/#${faqAnchor(id)}`;
    history.replaceState(null, "", `#${faqAnchor(id)}`);
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard unavailable: the address bar still shows the link */
    }
    setCopied(id);
    window.setTimeout(() => setCopied((c) => (c === id ? null : c)), 2000);
  }

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="grid w-full max-w-md gap-1.5">
          <label htmlFor="faq-filter" className="field-label">
            {faq.filterLabel}
          </label>
          <input
            id="faq-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={faq.filterPlaceholder}
            className="field-control"
            autoComplete="off"
          />
        </div>
        <p className="text-mono text-fg-muted" aria-live="polite">
          {faq.count(matches.length, faq.items.length)}
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? faq.copied : ""}
      </p>

      {matches.length === 0 ? <p className="mt-8 border border-dashed border-rule-strong p-6">{faq.empty}</p> : null}

      <Accordion.Root type="multiple" value={open} onValueChange={setOpen} className="mt-8 border-t border-rule-strong">
        {faq.items.map((item, i) => {
          const isOpen = open.includes(item.id);
          return (
            <Accordion.Item
              key={item.id}
              value={item.id}
              id={faqAnchor(item.id)}
              hidden={!matches.includes(item.id)}
              className="faq-item group/item border-b border-rule"
            >
              <Accordion.Header className="flex items-start gap-3">
                <Accordion.Trigger className="flex min-h-14 flex-1 cursor-pointer items-baseline gap-4 py-5 text-left">
                  <span className="text-mono w-8 shrink-0 text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-h3 flex-1">{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="relative mt-1.5 h-3 w-3 shrink-0 before:absolute before:top-1/2 before:left-0 before:h-[1.5px] before:w-3 before:-translate-y-1/2 before:bg-current after:absolute after:top-0 after:left-1/2 after:h-3 after:w-[1.5px] after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-[var(--dur-2)] group-data-[state=open]/item:after:scale-y-0"
                  />
                </Accordion.Trigger>
                <button
                  type="button"
                  onClick={() => copyLink(item.id)}
                  className="text-mono mt-4 inline-flex min-h-8 min-w-8 items-center justify-center rounded-xs px-1.5 text-fg-muted opacity-60 hover:opacity-100 focus-visible:opacity-100"
                >
                  {copied === item.id ? (
                    <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" aria-hidden="true" fill="none">
                      <path d="M1.5 5.5 4 8l4.5-6" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  ) : (
                    <span aria-hidden="true">#</span>
                  )}
                  <span className="sr-only">{faq.copyLink(item.question)}</span>
                </button>
              </Accordion.Header>
              <Accordion.Content
                forceMount
                ref={(el) => {
                  contentRefs.current[item.id] = el;
                }}
                // Overrides Radix's boolean `hidden`; the effect below applies
                // hidden="until-found" so closed answers stay findable.
                hidden={undefined}
                className={cn("pb-6 pl-12", isOpen && "anim-wipe")}
              >
                <p className="measure text-fg-muted">
                  <FaqAnswer item={item} />
                </p>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
