import { NextResponse } from "next/server";

import { sendTrialReminderEmail } from "@/lib/email";
import { getAppState } from "@/lib/store";

export async function POST(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const incomingSecret = request.headers.get("x-cron-secret");

  if (cronSecret && incomingSecret !== cronSecret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const state = await getAppState();
  const trialEndsAt = new Date(state.subscription.trialEndsAt).getTime();
  const fiveDays = 1000 * 60 * 60 * 24 * 5;

  if (trialEndsAt - Date.now() > fiveDays) {
    return NextResponse.json({ sent: false, reason: "trial-not-close-enough" });
  }

  await sendTrialReminderEmail(state.user.email);
  return NextResponse.json({ sent: true });
}
