import Link from "next/link";
import { ArrowRight, BarChart3, Coins, KanbanSquare, Mic2, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const featureCards = [
  {
    title: "Cross-platform pipeline",
    description:
      "Track ACX, Findaway, Voice123, Voices.com, Backstage, and direct leads inside one kanban flow.",
    icon: KanbanSquare,
  },
  {
    title: "Conversion analytics",
    description:
      "See which genres and platforms book best over 30, 90, and 365 day windows.",
    icon: BarChart3,
  },
  {
    title: "Royalty-share math",
    description:
      "Compare projected royalty income against flat-fee and PFH offers before you say yes.",
    icon: Coins,
  },
];

export function Homepage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 py-10 lg:px-10 lg:py-16">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-8">
          <Badge variant="accent">Purpose-built for audiobook narrators and voice actors</Badge>
          <div className="space-y-5">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[var(--ink)] sm:text-6xl">
              The audition CRM that finally makes ACX’s flat list feel obsolete.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted-ink)]">
              VoiceLog gives narrators one place to log submissions, move deals through a real
              pipeline, compare royalty-share economics, and see which genres actually convert.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/app">
              <Button size="lg">
                Start the Pro trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/royalty-share-calculator">
              <Button variant="secondary" size="lg">
                Try the royalty calculator
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="bg-white/75">
              <CardContent className="pt-6">
                <p className="text-3xl font-semibold text-[var(--ink)]">30 days</p>
                <p className="mt-2 text-sm text-[var(--muted-ink)]">Full Pro access before first charge</p>
              </CardContent>
            </Card>
            <Card className="bg-white/75">
              <CardContent className="pt-6">
                <p className="text-3xl font-semibold text-[var(--ink)]">7 platforms</p>
                <p className="mt-2 text-sm text-[var(--muted-ink)]">Tracked inside one workflow</p>
              </CardContent>
            </Card>
            <Card className="bg-white/75">
              <CardContent className="pt-6">
                <p className="text-3xl font-semibold text-[var(--ink)]">3 offer models</p>
                <p className="mt-2 text-sm text-[var(--muted-ink)]">Royalty, flat fee, and PFH comparison</p>
              </CardContent>
            </Card>
          </div>
        </div>
        <Card className="relative overflow-hidden border-none bg-[linear-gradient(160deg,#10243b_0%,#17314b_50%,#204861_100%)] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,196,187,0.35),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(233,150,114,0.22),transparent_34%)]" />
          <CardContent className="relative p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/70">Narrator cockpit</p>
                <h2 className="mt-2 text-2xl font-semibold">See what is moving and what is paying.</h2>
              </div>
              <PlayCircle className="h-10 w-10 text-[var(--accent)]" />
            </div>
            <div className="mt-8 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ["Submitted", "14"],
                  ["Callbacks", "5"],
                  ["Booked", "3"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[24px] border border-white/10 bg-white/8 p-4">
                    <p className="text-sm text-white/70">{label}</p>
                    <p className="mt-2 text-3xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-[28px] border border-white/10 bg-[#f7f2e8] p-5 text-[var(--ink)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted-ink)]">
                      Royalty-share snapshot
                    </p>
                    <p className="mt-2 text-xl font-semibold">Night Passage • ACX • Offered</p>
                    <p className="mt-2 text-sm text-[var(--muted-ink)]">
                      Medium scenario projects $6,480 annual income, roughly $762 per finished hour.
                    </p>
                  </div>
                  <Mic2 className="h-10 w-10 text-[#d66e43]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {featureCards.map(({ title, description, icon: Icon }) => (
          <Card key={title} className="bg-white/80">
            <CardHeader>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
                <Icon className="h-6 w-6 text-[var(--ink)]" />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="bg-[var(--ink)] text-white">
          <CardHeader>
            <Badge variant="warning" className="w-fit">
              Pricing
            </Badge>
            <CardTitle className="text-3xl text-white">Professional-tool pricing, not spreadsheet pricing.</CardTitle>
            <CardDescription className="text-white/72">
              Solo unlocks unlimited logging and the pipeline. Pro adds analytics, export, and multi-year trends.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[24px] bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Solo</p>
              <p className="mt-3 text-4xl font-semibold">$19</p>
              <p className="mt-2 text-sm text-white/70">Unlimited logging, kanban pipeline, dashboard, royalty calculator</p>
            </div>
            <div className="rounded-[24px] bg-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-white/70">Pro</p>
              <p className="mt-3 text-4xl font-semibold">$29</p>
              <p className="mt-2 text-sm text-white/70">Everything in Solo plus analytics, CSV export, and trend charts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <Badge variant="success" className="w-fit">
              Day-one distribution
            </Badge>
            <CardTitle>Built for the communities narrators already trust.</CardTitle>
            <CardDescription>
              VoiceLog is designed around the exact workflow gaps raised in ACX forums, narrator Facebook groups, and Voice123 threads.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {[
              "Track callbacks and offers that platform dashboards flatten into one list.",
              "See whether literary fiction, thriller, or business titles convert better for your voice.",
              "Compare royalty-share upside before accepting slow-burn offers.",
              "Export clean CSVs for accountant, coach, or year-end performance review workflows.",
            ].map((item) => (
              <div key={item} className="rounded-[24px] bg-[var(--paper)] p-4 text-sm leading-6 text-[var(--ink)]">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
