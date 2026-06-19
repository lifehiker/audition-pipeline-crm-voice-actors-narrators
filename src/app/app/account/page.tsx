import { Download, Mail, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { getAppState } from "@/lib/store";
import { formatCurrency, formatDate } from "@/lib/utils";

const integrationCards = [
  {
    label: "Sign-in provider",
    body: "Google is available when the admin has enabled it; the workspace runs fully without it.",
    Icon: ShieldCheck,
  },
  {
    label: "Billing",
    body: "Stripe checkout/portal fallback to local plan mutation",
    Icon: Download,
  },
  {
    label: "Email",
    body: "Resend fallback writes event logs locally",
    Icon: Mail,
  },
];

export default async function AccountPage() {
  const state = await getAppState();

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              Manage plan access with Stripe when available or the built-in billing fallback when not configured.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="accent" className="capitalize">
                {state.subscription.plan === "trial" ? "Pro trial" : state.subscription.plan}
              </Badge>
              <Badge variant="neutral">{state.subscription.status}</Badge>
            </div>
            <p className="text-sm leading-6 text-[var(--muted-ink)]">
              Trial ends {formatDate(state.subscription.trialEndsAt)}. If Stripe credentials are added later, checkout and billing portal routes can move to live mode without changing the UI.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <form action="/api/billing/checkout" method="post">
                <input type="hidden" name="plan" value="solo" />
                <Button variant="secondary">Switch to Solo</Button>
              </form>
              <form action="/api/billing/checkout" method="post">
                <input type="hidden" name="plan" value="pro" />
                <Button>Upgrade to Pro</Button>
              </form>
              <form action="/api/billing/portal" method="post">
                <Button variant="ghost">Billing portal</Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational integrations</CardTitle>
            <CardDescription>All external services are guarded so the app remains usable without live credentials.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {integrationCards.map(({ label, body, Icon }) => (
              <div key={label} className="rounded-[24px] bg-[var(--paper)] p-4">
                <Icon className="h-5 w-5 text-[var(--accent)]" />
                <p className="mt-3 font-semibold text-[var(--ink)]">{label}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">{body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle>Invoices and export</CardTitle>
              <CardDescription>CSV export is gated to Pro and trial accounts, matching the PRD.</CardDescription>
            </div>
            <a href="/api/export" download>
              <Button variant="secondary">Download CSV</Button>
            </a>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <THead>
              <TR>
                <TH>Date</TH>
                <TH>Description</TH>
                <TH>Status</TH>
                <TH>Amount</TH>
              </TR>
            </THead>
            <TBody>
              {state.subscription.invoices.map((invoice) => (
                <TR key={invoice.id}>
                  <TD>{formatDate(invoice.date)}</TD>
                  <TD>{invoice.description}</TD>
                  <TD className="capitalize">{invoice.status}</TD>
                  <TD>{formatCurrency(invoice.amount)}</TD>
                </TR>
              ))}
            </TBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
