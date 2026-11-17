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
  const link = "inline-flex min-h-6 items-center text-paper-dim no-underline hover:text-paper hover:underline";

  return (
    <footer data-tone="ink" className="relative pt-16 pb-28 lg:pb-12">
      <div className="page">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div>
            <Logo subline={false} />
            <p className="mt-5 font-display text-[1.25rem] font-medium text-accent">{site.tagline}</p>
          </div>

          <div className="grid gap-8">
            <nav aria-label={globalCopy.footerNavLabel}>
              <p className="text-mono mb-3 text-fg-muted">{footer.exploreLabel}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-small">
                {navChapters.map((chapter) => (
                  <li key={chapter.id}>
                    <a href={chapterHref(chapter.id)} className={link}>
                      {chapter.nav}
                    </a>
                  </li>
                ))}
                <li>
                  <a href={chapterHref("contact")} className={link}>
                    {globalCopy.getStarted}
                  </a>
                </li>
              </ul>
            </nav>
            <div>
              <p className="text-mono mb-3 text-fg-muted">{footer.contactLabel}</p>
              <p className="text-small break-words">
                {email ? (
                  <a href={`mailto:${email}`} className={link}>
                    {email}
                  </a>
                ) : (
                  <VerifyMark>contact email</VerifyMark>
                )}
              </p>
            </div>
          </div>
        </div>

        <p className="text-small measure mt-12 text-fg-muted">{footer.disclaimer}</p>

        <div className="mt-8 flex flex-col gap-3 border-t border-rule pt-6 text-[0.75rem] text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {legalName ?? <VerifyMark>legal entity name</VerifyMark>}. {footer.rights}
          </p>
          <ul className="flex gap-5">
            {footer.legalLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
