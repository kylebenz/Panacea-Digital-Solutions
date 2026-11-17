import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/chapters/Hero";
import { Work } from "@/components/chapters/Work";
import { Why } from "@/components/chapters/Why";
import { HowItWorks } from "@/components/chapters/HowItWorks";
import { Breakdowns } from "@/components/chapters/Breakdowns";
import { About } from "@/components/chapters/About";
import { Formats } from "@/components/chapters/Formats";
import { Faq } from "@/components/chapters/Faq";
import { Pricing } from "@/components/chapters/Pricing";
import { Fit } from "@/components/chapters/Fit";
import { Contact } from "@/components/chapters/Contact";
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
      <Work />
      <Why />
      <HowItWorks />
      <Breakdowns />
      <About />
      <Formats />
      <Faq />
      <Pricing />
      <Fit />
      <Contact />
      <MobileCtaBar />
    </>
  );
}
