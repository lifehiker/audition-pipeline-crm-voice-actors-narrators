import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ACX Audition Tracker for Narrators",
  description:
    "Replace ACX's flat audition list with a real pipeline, conversion analytics, and royalty-share comparison inside VoiceLog.",
};

export default function AcxAuditionTrackerPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 lg:px-10">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Badge variant="accent">ACX Audition Tracker</Badge>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
              ACX gives you a list. VoiceLog gives you a pipeline.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted-ink)]">
              Track callbacks, offers, and bookings across ACX without losing context once a title leaves your browser history. Add royalty-share math and genre-level conversion insight on top.
            </p>
            <Link href="/app">
              <Button size="lg">Open the tracker</Button>
            </Link>
          </div>
          <Card className="bg-[var(--ink)] text-white">
            <CardHeader>
              <CardTitle className="text-white">What narrators actually need</CardTitle>
              <CardDescription className="text-white/72">
                ACX’s native dashboard stops at flat status history. VoiceLog adds the workflow and analytics layer on top.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm leading-6 text-white/76">
              <p>Move submissions from Submitted to Callback to Offered to Booked.</p>
              <p>See whether thrillers or literary fiction are really converting for your voice.</p>
              <p>Pressure-test royalty-share offers against flat-fee equivalents before you accept.</p>
            </CardContent>
          </Card>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
