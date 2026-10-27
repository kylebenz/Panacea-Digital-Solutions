import { cacheLife } from "next/cache";
import { chapterHref, navChapters } from "@/lib/chapters";
import { site } from "@/lib/site";
import { footer } from "@/content/footer";
import { globalCopy } from "@/content/global";
import { Logo } from "@/components/brand/Logo";
import { VerifyMark } from "@/components/primitives/VerifyMark";

async function copyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await copyrightYear();
  const { email, legalName } = site.contact;
  const lastChapter = site.chapters[site.chapters.length - 1];

  return (
    <footer data-tone="paper" className="relative border-t border-rule pt-20 pb-28 lg:pb-12">
      <div className="page">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <Logo />
            <p className="text-display-l mt-10 max-w-[16ch]">{site.tagline}</p>
          </div>

          <nav aria-label={globalCopy.footerNavLabel} className="col-span-6 sm:col-span-4 lg:col-span-2 lg:col-start-9">
            <p className="text-mono mb-4 text-fg-muted">Chapters</p>
            <ul className="grid gap-1">
              {navChapters.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={chapterHref(chapter.id)}
                    className="inline-flex min-h-8 items-center no-underline hover:underline"
                  >
                    {chapter.nav}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={chapterHref("contact")}
                  className="inline-flex min-h-8 items-center no-underline hover:underline"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          <div className="col-span-6 sm:col-span-4 lg:col-span-2">
            <p className="text-mono mb-4 text-fg-muted">Contact</p>
            <p className="break-words">
              {email ? <a href={`mailto:${email}`}>{email}</a> : <VerifyMark>contact email</VerifyMark>}
            </p>
            <p className="text-mono mt-8 mb-4 text-fg-muted">Legal</p>
            <ul className="grid gap-1">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-8 items-center no-underline hover:underline">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-small measure mt-16 text-fg-muted">{footer.disclaimer}</p>

        <div className="mt-10 flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-small text-fg-muted">
            © {year} {legalName ?? <VerifyMark>legal entity name</VerifyMark>}
          </p>
          <p className="text-mono flex items-center gap-3 text-fg-muted" aria-hidden="true">
            <span>00:{lastChapter.number}:59</span>
            <span className="h-px w-10 bg-current" />
            <span>{footer.endMark}</span>
            <span className="inline-block h-2.5 w-2.5 bg-remedy" />
          </p>
        </div>
      </div>
    </footer>
  );
}
