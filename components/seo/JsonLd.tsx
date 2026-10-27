import { faq } from "@/content/faq";
import { pricing } from "@/content/pricing";
import { seo } from "@/content/seo";
import { site } from "@/lib/site";

/*
 * Structured data for / (brief §9): Organization, WebSite, two Services, an
 * OfferCatalog with USD offers for the three plans, and FAQPage. Only
 * accurate data: no LocalBusiness (no physical address), no Review or
 * AggregateRating, and email/contactPoint only once verified.
 */
export function JsonLd() {
  const base = site.url.replace(/\/$/, "");
  const org = `${base}/#organization`;
  const catalog = `${base}/#packages`;

  const offers = site.plans.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: `${pricing.videosLine(plan.videos)}, ${pricing.infographicsLine(plan.infographics)}, ${pricing.revisionLine}.`,
    price: plan.priceMonthly.toFixed(2),
    priceCurrency: "USD",
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: plan.priceMonthly.toFixed(2),
      priceCurrency: "USD",
      unitText: "MONTH",
    },
    url: `${base}/#pricing`,
    // Only once the offer's end date is confirmed.
    ...(site.promo.enabled && site.promo.endDate ? { priceValidUntil: site.promo.endDate } : {}),
  }));

  const service = (key: "video" | "infographic", anchor: string) => ({
    "@type": "Service",
    "@id": `${base}/#service-${key}`,
    name: seo.services[key].name,
    serviceType: seo.services[key].name,
    description: seo.services[key].description,
    provider: { "@id": org },
    areaServed: { "@type": "Country", name: "US" },
    url: `${base}/#${anchor}`,
    hasOfferCatalog: { "@id": catalog },
  });

  const graph = [
    {
      "@type": "Organization",
      "@id": org,
      name: site.name,
      url: `${base}/`,
      logo: `${base}/icon.svg`,
      slogan: site.tagline,
      description: seo.positioning,
      ...(site.contact.email
        ? {
            email: site.contact.email,
            contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.contact.email },
          }
        : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${base}/#website`,
      url: `${base}/`,
      name: site.name,
      description: seo.description,
      publisher: { "@id": org },
      inLanguage: "en-US",
    },
    service("video", "ad-videos"),
    service("infographic", "infographics"),
    {
      "@type": "OfferCatalog",
      "@id": catalog,
      name: pricing.title,
      itemListElement: offers,
    },
    {
      "@type": "FAQPage",
      "@id": `${base}/#faq`,
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped so it can't close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
