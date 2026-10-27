import { services } from "@/content/services";
import { cn } from "@/lib/cn";
import { heroStage } from "@/content/hero-stage";
import { Chapter } from "@/components/layout/Chapter";
import { Button } from "@/components/primitives/Button";
import { Callout } from "@/components/primitives/Callout";
import { RegistrationMarks } from "@/components/primitives/RegistrationMarks";
import { StoryArt } from "@/components/stage/StoryArt";

/*
 * 02 · Two contrasting overview panels: a dark "edit suite" panel for video
 * and a light "diagram" panel for infographics. Each panel's visual shows how
 * that format is structured, and each links to its deep chapter.
 */

function VideoVisual() {
  const widths = ["24%", "48%", "28%"];
  return (
    <div className="flex items-stretch gap-5" aria-hidden="true">
      <div className="relative aspect-[9/16] w-20 shrink-0 overflow-hidden rounded-[6px] sm:w-24">
        <StoryArt kind={heroStage.frames[0].art} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-end gap-2">
        <p className="text-mono text-fg-muted">Edit timeline</p>
        <div className="relative">
          <div className="flex gap-1">
            {services.video.segments.map((segment, i) => (
              <span
                key={segment}
                style={{ width: widths[i] }}
                className="text-mono truncate rounded-xs bg-ink-raised px-2 py-2 text-[0.625rem] shadow-[inset_0_0_0_1px_var(--tone-line-strong)]"
              >
                {segment === "Call to action" ? (
                  <>
                    <span className="sm:hidden">CTA</span>
                    <span className="hidden sm:inline">{segment}</span>
                  </>
                ) : (
                  segment
                )}
              </span>
            ))}
          </div>
          <div className="text-mono mt-1 truncate rounded-xs bg-teal/40 px-2 py-1 text-[0.625rem]">Captions</div>
          <span className="absolute -top-2 -bottom-2 left-[34%] w-[2px] bg-remedy">
            <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-remedy" />
          </span>
        </div>
      </div>
    </div>
  );
}

function DiagramVisual() {
  const blocks = ["h-7", "h-14", "h-6"];
  const fills = ["bg-ink/80", "bg-paper-2", "bg-teal"];
  const last = services.infographic.callouts.length - 1;
  return (
    <div className="grid grid-cols-[minmax(0,8.5rem)_1fr]" aria-hidden="true">
      {services.infographic.callouts.map((label, i) => (
        <div key={label} className="contents">
          {/* One artboard, sliced into rows so each row can carry a leader. */}
          <div
            className={cn(
              "bg-paper px-3 py-1.5 shadow-[inset_1px_0_0_var(--color-line-strong),inset_-1px_0_0_var(--color-line-strong)]",
              i === 0 &&
                "pt-3 shadow-[inset_1px_0_0_var(--color-line-strong),inset_-1px_0_0_var(--color-line-strong),inset_0_1px_0_var(--color-line-strong)]",
              i === last &&
                "pb-3 shadow-[inset_1px_0_0_var(--color-line-strong),inset_-1px_0_0_var(--color-line-strong),inset_0_-1px_0_var(--color-line-strong)]",
            )}
          >
            <div className={cn(blocks[i], fills[i], "rounded-[2px]")} />
          </div>
          <div className="flex items-center gap-2 py-1.5">
            <span className="h-px flex-1 bg-teal" />
            <Callout n={i + 1} className="h-6 w-6 text-[0.625rem]" />
            <span className="text-mono w-[7.5rem] text-ink">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Services() {
  return (
    <Chapter id="services" title={services.title}>
      <div className="grid-12 mt-14 items-start gap-y-8">
        <article
          data-tone="ink"
          aria-labelledby="services-video-title"
          className="reveal-wipe col-span-12 flex flex-col gap-8 p-6 sm:p-9 lg:col-span-7"
        >
          <p className="text-mono flex justify-between text-fg-muted">
            <span>{services.video.kicker}</span>
            <span aria-hidden="true">Video</span>
          </p>
          <VideoVisual />
          <div>
            <h3 id="services-video-title" className="text-display-m">
              {services.video.title}
            </h3>
            <p className="measure mt-4 text-fg-muted">{services.video.body}</p>
          </div>
          <Button href={services.video.link.href} variant="secondary" arrow className="self-start whitespace-normal">
            {services.video.link.label}
          </Button>
        </article>

        <article
          aria-labelledby="services-infographic-title"
          className="reveal-wipe relative col-span-12 flex flex-col gap-8 bg-mist p-6 sm:p-9 lg:col-span-5 lg:mt-24"
        >
          <RegistrationMarks />
          <p className="text-mono flex justify-between text-ink-2">
            <span>{services.infographic.kicker}</span>
            <span aria-hidden="true">Infographic</span>
          </p>
          <DiagramVisual />
          <div>
            <h3 id="services-infographic-title" className="text-display-m">
              {services.infographic.title}
            </h3>
            <p className="measure mt-4 text-ink-2">{services.infographic.body}</p>
          </div>
          <Button
            href={services.infographic.link.href}
            variant="secondary"
            arrow
            className="self-start whitespace-normal"
          >
            {services.infographic.link.label}
          </Button>
        </article>
      </div>
      <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-rule pt-6">
        <p className="text-mono text-fg-muted">Both formats, one monthly package</p>
        <Button href={services.pricingLink.href} variant="ghost" arrow>
          {services.pricingLink.label}
        </Button>
      </div>
    </Chapter>
  );
}
