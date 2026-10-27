import type { Metadata } from "next";
import { legal } from "@/content/legal";
import { LegalShell } from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: legal.privacy.metaTitle,
  description: legal.privacy.description,
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <LegalShell page="privacy" />;
}
