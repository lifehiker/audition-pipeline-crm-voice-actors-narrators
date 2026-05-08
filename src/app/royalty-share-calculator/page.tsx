import type { Metadata } from "next";

import { RoyaltyCalculator } from "@/components/royalty-calculator";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "ACX Royalty Share Calculator",
  description:
    "Use the free VoiceLog royalty-share calculator to compare audiobook royalty projections with flat-fee and PFH equivalents.",
};

export default function RoyaltyShareCalculatorPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 lg:px-10">
        <section className="space-y-4">
          <Badge variant="accent">Free calculator</Badge>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
            Royalty share versus flat fee, without spreadsheet gymnastics.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--muted-ink)]">
            Enter estimated finished hours, royalty percentage, and expected monthly sales. VoiceLog turns that into low, medium, and high annual scenarios plus an equivalent PFH value.
          </p>
        </section>
        <RoyaltyCalculator />
      </main>
      <SiteFooter />
    </>
  );
}
