import { Button } from "@/components/primitives/Button";

/*
 * Quiet one-line close for the deep service chapters: the guide's CTA copy,
 * then one primary action and two descriptive in-page links. Gives the eye a
 * rest before the next dense chapter (brief 3.2 rhythm).
 */
export function ChapterCoda({
  lead,
  body,
  primary,
  links,
}: {
  lead: string;
  body: string;
  primary: { label: string; href: string };
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="mt-20 grid-12 gap-y-6 border-t border-rule pt-10">
      <p className="text-display-m col-span-12 max-w-[26ch] lg:col-span-7">
        {lead} <span className="text-fg-muted">{body}</span>
      </p>
      <div className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-3 self-end lg:col-span-5 lg:justify-end">
        <Button href={primary.href} arrow>
          {primary.label}
        </Button>
        {links.map((link) => (
          <Button key={link.href} href={link.href} variant="ghost">
            {link.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
