import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Voice Actor CRM",
  description:
    "VoiceLog is a voice actor CRM for narrators and voice professionals managing auditions across ACX, Voice123, Findaway, and more.",
};

export default function VoiceActorCrmPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 lg:px-10">
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="bg-white/82">
            <CardHeader>
              <Badge variant="success" className="w-fit">
                Voice Actor CRM
              </Badge>
              <CardTitle className="text-4xl">A CRM shaped around auditions, not salespeople.</CardTitle>
              <CardDescription>
                VoiceLog keeps platform submissions, callbacks, booked titles, and rate comparisons in one operating view.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-[24px] bg-[var(--paper)] p-4 text-sm leading-6 text-[var(--ink)]">
                Designed for voice actors who work across platform silos and need better data than each marketplace exposes.
              </div>
              <Link href="/app">
                <Button>Try the CRM</Button>
              </Link>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            {[
              "Platform-agnostic pipeline across ACX, Voice123, Voices.com, Findaway, Backstage, and direct auditions.",
              "Dashboard KPI cards for submission pace and booking rate over 30, 90, and 365 day windows.",
              "Royalty-share comparison for audiobook-specific offers that general CRMs are not built to understand.",
            ].map((item) => (
              <Card key={item}>
                <CardContent className="pt-6 text-base leading-7 text-[var(--muted-ink)]">{item}</CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
