import type { Metadata } from "next";
import { notFound } from "@/content/not-found";
import { chapterHref, navChapters } from "@/lib/chapters";
import { Button } from "@/components/primitives/Button";
import { RegistrationMarks } from "@/components/primitives/RegistrationMarks";

export const metadata: Metadata = {
  title: "Page not found | Panacea Digital",
  robots: { index: false },
};

/* 404 styled as the end-of-reel frame: a 9:16 slate with a stopped playhead. */
export default function NotFound() {
  return (
    <section data-tone="ink" className="py-20 lg:py-28">
      <div className="page grid-12 items-center gap-y-12">
        <div className="col-span-12 lg:col-span-7">
          <p className="text-mono flex items-center gap-3 text-fg-muted">
            <span className="text-remedy">00:12:59</span>
            <span aria-hidden="true" className="h-px w-10 bg-current" />
            <span>{notFound.marker}</span>
          </p>
          <h1 className="text-display-xl mt-6 max-w-[14ch]">{notFound.title}</h1>
          <p className="text-body-l measure mt-6 text-fg-muted">{notFound.body}</p>
          <div className="mt-10">
            <Button href="/" arrow>
              {notFound.home}
            </Button>
          </div>
          <nav aria-label={notFound.sections} className="mt-10">
            <p className="text-mono text-fg-muted">{notFound.sections}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {navChapters.map((c) => (
                <li key={c.id}>
                  <a href={chapterHref(c.id)} className="chip no-underline">
                    {c.nav}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-span-12 flex justify-center lg:col-span-4 lg:col-start-9" aria-hidden="true">
          <div className="relative aspect-[9/16] w-[min(16rem,70%)] bg-ink-raised shadow-[inset_0_0_0_1px_var(--color-line-on-ink)]">
            <RegistrationMarks />
            <div className="absolute inset-0 grid place-items-center">
              <span className="text-mono text-paper-dim">FR — / —</span>
            </div>
            <div className="absolute inset-x-5 bottom-6 h-[3px] bg-paper/25">
              <div className="h-full w-full bg-paper/60" />
              <span className="absolute top-1/2 right-0 h-4 w-[3px] -translate-y-1/2 bg-remedy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
