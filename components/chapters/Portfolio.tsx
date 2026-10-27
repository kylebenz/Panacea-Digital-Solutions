import { portfolio } from "@/content/portfolio";
import { portfolioItems } from "@/content/portfolio-items";
import { Chapter } from "@/components/layout/Chapter";
import { Island } from "@/components/islands/Island";
import { Button } from "@/components/primitives/Button";
import { PortfolioGrid } from "@/components/samples/PortfolioGrid";
import { SampleArt } from "@/components/samples/SampleArt";

/* 07 · Samples — Portfolio Explorer (7G). */
export function Portfolio() {
  const artBySlug = Object.fromEntries(
    portfolioItems.map((item) => [item.slug, <SampleArt key={item.slug} item={item} />]),
  );
  return (
    <Chapter
      id="portfolio"
      title={portfolio.title}
      lede={
        <>
          <p>{portfolio.intro}</p>
          <p className="text-small mt-4">{portfolio.conceptNote}</p>
        </>
      }
    >
      <div className="mt-12">
        <Island name="portfolio-explorer" slots={{ artBySlug }}>
          <PortfolioGrid items={portfolioItems} arts={artBySlug} />
        </Island>
      </div>
      <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-rule pt-8">
        <Button href={portfolio.cta.href} arrow>
          {portfolio.cta.label}
        </Button>
      </div>
    </Chapter>
  );
}
