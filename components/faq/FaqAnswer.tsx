import { Fragment } from "react";
import type { FaqItem } from "@/content/faq";

/* Renders a verbatim answer, turning marked phrases into in-page links. */
export function FaqAnswer({ item }: { item: FaqItem }) {
  if (!item.links?.length) return <>{item.answer}</>;
  const pattern = new RegExp(`(${item.links.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`);
  return (
    <>
      {item.answer.split(pattern).map((part, i) => {
        const link = item.links!.find((l) => l.text === part);
        return link ? (
          <a key={i} href={link.href} className="text-fg underline decoration-accent underline-offset-4">
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}
