import type { Metadata } from "next";
import { legal } from "@/content/legal";
import { LegalShell } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: legal.terms.metaTitle,
  description: legal.terms.description,
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return <LegalShell page="terms" />;
}
