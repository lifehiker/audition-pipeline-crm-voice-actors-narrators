import { ArrowUpRight, Lock } from "lucide-react";

import { PlatformChart, TrendChart } from "@/components/charts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { getDashboardMetrics } from "@/lib/analytics";
import type { Audition, Plan } from "@/lib/types";
import { formatPercent } from "@/lib/utils";

export function Dashboard({ auditions, plan }: { auditions: Audition[]; plan: Plan }) {
  const metrics = getDashboardMetrics(auditions, plan);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Submitted this month", `${metrics.submittedThisMonth}`],
          ["Last month", `${metrics.submittedLastMonth}`],
          ["30-day booking rate", formatPercent(metrics.bookingRate30)],
          ["90-day booking rate", formatPercent(metrics.bookingRate90)],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="flex items-end justify-between pt-6">
              <div>
                <p className="text-sm text-[var(--muted-ink)]">{label}</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink)]">{value}</p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[var(--accent)]" />
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Pipeline balance</CardTitle>
            <CardDescription>Live counts by status across the active pipeline.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {metrics.statusCounts.map((item) => (
              <div key={item.status} className="rounded-[24px] bg-[var(--paper)] p-4">
                <p className="text-sm text-[var(--muted-ink)]">{item.status}</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--ink)]">{item.count}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>365-day booking rate</CardTitle>
            <CardDescription>Longer view for repeatable funnel performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-[28px] bg-[linear-gradient(150deg,#16324f,#214c62)] p-6 text-white">
              <p className="text-sm text-white/70">Rolling 365 days</p>
              <p className="mt-4 text-5xl font-semibold">{formatPercent(metrics.bookingRate365)}</p>
              <p className="mt-3 max-w-sm text-sm leading-6 text-white/76">
                Use this as your benchmark when deciding whether a platform mix is improving or quietly wasting audition time.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Platform mix</CardTitle>
            <CardDescription>Submissions by platform over the current saved dataset.</CardDescription>
          </CardHeader>
          <CardContent>
            <PlatformChart data={metrics.platformBreakdown} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Multi-year trend</CardTitle>
                <CardDescription>Submitted versus booked across your monthly history.</CardDescription>
              </div>
              {metrics.analyticsLocked && (
                <Badge variant="warning">
                  <Lock className="mr-1 h-3 w-3" />
                  Pro only
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {metrics.analyticsLocked ? (
              <div className="rounded-[24px] bg-[var(--paper)] p-6 text-sm leading-6 text-[var(--muted-ink)]">
                Upgrade to Pro to unlock multi-year trend charts and genre conversion analysis.
              </div>
            ) : (
              <TrendChart data={metrics.trend} />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-4">
              <div>
                <CardTitle>Genre performance</CardTitle>
                <CardDescription>Booking rate by genre based on your tracked submissions.</CardDescription>
              </div>
              {metrics.analyticsLocked && <Badge variant="warning">Pro only</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            {metrics.analyticsLocked ? (
              <div className="rounded-[24px] bg-[var(--paper)] p-6 text-sm leading-6 text-[var(--muted-ink)]">
                Solo includes the dashboard and royalty calculator. Genre conversion rankings unlock on Pro.
              </div>
            ) : (
              <Table>
                <THead>
                  <TR>
                    <TH>Genre</TH>
                    <TH>Submitted</TH>
                    <TH>Booked</TH>
                    <TH>Booking rate</TH>
                  </TR>
                </THead>
                <TBody>
                  {metrics.genreBreakdown.map((item) => (
                    <TR key={item.genre}>
                      <TD>{item.genre}</TD>
                      <TD>{item.submitted}</TD>
                      <TD>{item.booked}</TD>
                      <TD>{formatPercent(item.bookingRate)}</TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent auditions</CardTitle>
            <CardDescription>The latest pipeline movement across all tracked platforms.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {auditions.slice(0, 4).map((audition) => (
              <div key={audition.id} className="rounded-[24px] border border-[var(--line)] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[var(--ink)]">{audition.title}</p>
                    <p className="text-sm text-[var(--muted-ink)]">
                      {audition.platform} • {audition.genre} • {audition.status}
                    </p>
                  </div>
                  <Badge variant="accent">{audition.payType}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
