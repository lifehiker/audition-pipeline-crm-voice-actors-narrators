import { AuditionsTable } from "@/components/auditions-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAppState } from "@/lib/store";

export default async function AuditionsPage() {
  const state = await getAppState();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Audition list</CardTitle>
          <CardDescription>
            Table view for reviewing older submissions, editing terms, and cleaning up records that are no longer relevant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-6 text-[var(--muted-ink)]">
            Use the pipeline for drag-and-drop movement, then use this page when you need to revise economics, status, and notes in one focused editor.
          </p>
        </CardContent>
      </Card>
      <AuditionsTable initialAuditions={state.auditions} />
    </div>
  );
}
