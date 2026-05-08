import { Dashboard } from "@/components/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { getAppState } from "@/lib/store";

export default async function AppDashboardPage() {
  const state = await getAppState();

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none bg-[linear-gradient(145deg,#16324f_0%,#214c62_48%,#2f6778_100%)] text-white">
        <CardContent className="grid gap-6 p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-white/70">Dashboard</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-[-0.05em]">
              Run your audition desk like a business, not a browser tab.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/76">
              VoiceLog aggregates your active submissions, highlights where you are converting,
              and keeps royalty-share economics visible before a weak deal lands on your calendar.
            </p>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-white/8 p-6">
            <p className="text-sm text-white/70">Current plan</p>
            <p className="mt-3 text-3xl font-semibold capitalize">
              {state.subscription.plan === "trial" ? "Pro trial" : state.subscription.plan}
            </p>
            <p className="mt-2 text-sm text-white/70">
              Trial ends {new Date(state.subscription.trialEndsAt).toLocaleDateString("en-US")}
            </p>
          </div>
        </CardContent>
      </Card>
      <Dashboard auditions={state.auditions} plan={state.subscription.plan} />
    </div>
  );
}
