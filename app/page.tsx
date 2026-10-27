import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/chapters/Hero";
import { SampleStrip } from "@/components/chapters/SampleStrip";
import { Why } from "@/components/chapters/Why";
import { Services } from "@/components/chapters/Services";
import { AdVideos } from "@/components/chapters/AdVideos";
import { Infographics } from "@/components/chapters/Infographics";
import { Demo } from "@/components/chapters/Demo";
import { Process } from "@/components/chapters/Process";
import { Portfolio } from "@/components/chapters/Portfolio";
import { WhoWeHelp } from "@/components/chapters/WhoWeHelp";
import { Pricing } from "@/components/chapters/Pricing";
import { About } from "@/components/chapters/About";
import { Faq } from "@/components/chapters/Faq";
import { Contact } from "@/components/chapters/Contact";
import { ChapterRail } from "@/components/layout/ChapterRail";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";

/*
 * The single page. Chapter order here must match `chapters` in
 * site.config.ts; prelaunch checks the two agree.
 */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Hero />
      <SampleStrip />
      <Why />
      <Services />
      <AdVideos />
      <Infographics />
      <Demo />
      <Process />
      <Portfolio />
      <WhoWeHelp />
      <Pricing />
      <About />
      <Faq />
      <Contact />
      <ChapterRail />
      <MobileCtaBar />
    </>
  );
}
