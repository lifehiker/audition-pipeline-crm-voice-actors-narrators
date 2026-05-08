import type { Metadata } from "next";
import Link from "next/link";

import { RoyaltyCalculator } from "@/components/royalty-calculator";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ACX Royalty Share vs Flat Fee",
  description:
    "A practical guide to evaluating ACX royalty-share offers versus flat-fee audiobook narration work, with a built-in calculator.",
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-12 lg:px-10">
        <article className="space-y-8">
          <div className="space-y-4">
            <Badge variant="accent">Guide</Badge>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
              ACX royalty share vs. flat fee: how working narrators should actually decide.
            </h1>
            <p className="text-lg leading-8 text-[var(--muted-ink)]">
              Royalty share is not automatically generous and flat fee is not automatically safe. The right answer depends on expected unit sales, time to payment, rights-holder credibility, and what your per-finished-hour floor needs to be.
            </p>
          </div>

          {[
            "Start with the opportunity cost. If a project will absorb ten finished hours and likely pay out slower than your usual PFH work, the bar for upside has to be higher.",
            "Translate royalty-share into annual income scenarios instead of talking about it abstractly. Even rough low, medium, and high cases produce better decisions than intuition alone.",
            "Look beyond total dollars. A royalty-share deal that projects well but drips out over years may still underperform a smaller flat-fee contract that clears next month.",
            "Track this data after the fact. Narrators who can compare accepted royalty projects against booked flat-fee work build better instincts with each offer instead of relying on anecdotes.",
          ].map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-[var(--ink)]">
              {paragraph}
            </p>
          ))}

          <Card>
            <CardContent className="pt-6">
              <RoyaltyCalculator />
            </CardContent>
          </Card>

          <div className="rounded-[28px] bg-[var(--ink)] p-8 text-white">
            <p className="text-2xl font-semibold">Want the rest of the pipeline around the calculator?</p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/72">
              VoiceLog keeps your submissions, callbacks, offers, bookings, and offer economics in the same workspace so you can learn from actual outcomes instead of isolated spreadsheets.
            </p>
            <Link href="/app" className="mt-5 inline-flex">
              <Button variant="secondary">Open VoiceLog</Button>
            </Link>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
