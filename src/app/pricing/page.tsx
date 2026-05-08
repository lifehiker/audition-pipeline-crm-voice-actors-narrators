import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Compare VoiceLog Solo and Pro pricing for audition tracking, analytics, CSV export, and royalty-share decision support.",
};

const plans = [
  {
    name: "Solo",
    price: "$19/mo",
    description: "Pipeline and calculator access for working narrators who mainly need workflow discipline.",
    features: [
      "Unlimited audition logging",
      "Drag-and-drop pipeline board",
      "30/90/365 day booking metrics",
      "Royalty-share calculator",
    ],
    cta: "Start Solo",
    plan: "solo",
  },
  {
    name: "Pro",
    price: "$29/mo",
    description: "Adds analytics depth and exports for narrators treating auditions as a measurable business system.",
    features: [
      "Everything in Solo",
      "Genre conversion breakdown",
      "Multi-year trend chart",
      "CSV export",
    ],
    cta: "Start Pro trial",
    plan: "pro",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-12 lg:px-10">
        <section className="space-y-4">
          <Badge variant="accent">Pricing</Badge>
          <h1 className="text-5xl font-semibold tracking-[-0.05em] text-[var(--ink)]">
            Professional-tool pricing for narrators who want better data than spreadsheets.
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-[var(--muted-ink)]">
            Every account starts with a 30-day Pro trial. If live Stripe credentials are not configured yet, the billing routes fall back to a safe local subscription switch so the full product can still be tested end to end.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.plan === "pro" ? "border-[var(--accent)] bg-white" : "bg-white/85"}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-4">
                  <span>{plan.name}</span>
                  {plan.plan === "pro" ? <Badge variant="success">Best for analytics</Badge> : null}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">
                    {plan.price}
                  </p>
                  <p className="mt-2 text-sm text-[var(--muted-ink)]">$0 today during the trial window.</p>
                </div>
                <div className="grid gap-3 text-sm leading-6 text-[var(--ink)]">
                  {plan.features.map((feature) => (
                    <p key={feature}>{feature}</p>
                  ))}
                </div>
                <form action="/api/billing/checkout" method="post">
                  <input type="hidden" name="plan" value={plan.plan} />
                  <Button className="w-full" size="lg">
                    {plan.cta}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="rounded-[32px] bg-[var(--ink)] p-8 text-white">
          <p className="text-2xl font-semibold">Want to test the whole workflow first?</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/72">
            Launch the demo workspace to add auditions, move deals through the pipeline, open the account page, and verify export gating without waiting on external providers.
          </p>
          <Link href="/signin" className="mt-5 inline-flex">
            <Button variant="secondary">Open sign-in</Button>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
