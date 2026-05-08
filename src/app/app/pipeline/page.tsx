import { PipelineBoard } from "@/components/pipeline-board";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppState } from "@/lib/store";

export default async function PipelinePage() {
  const state = await getAppState();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audition pipeline</CardTitle>
          <CardDescription>
            Drag cards between columns or use the status dropdown on each card to keep the board current.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-[var(--muted-ink)]">
            Royalty-share offers automatically surface the calculator when they reach Offered or Booked so you can pressure-test the economics before committing.
          </p>
        </CardContent>
      </Card>
      <PipelineBoard initialAuditions={state.auditions} plan={state.subscription.plan} />
    </div>
  );
}
