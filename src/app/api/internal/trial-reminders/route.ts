import { NextResponse } from "next/server";

import { sendTrialReminderEmail } from "@/lib/email";
import { getAppState } from "@/lib/store";

export async function POST() {
  const state = await getAppState();
  const trialEndsAt = new Date(state.subscription.trialEndsAt).getTime();
  const fiveDays = 1000 * 60 * 60 * 24 * 5;

  if (trialEndsAt - Date.now() <= fiveDays) {
    await sendTrialReminderEmail(state.user.email);
    return NextResponse.json({ sent: true });
  }

  return NextResponse.json({ sent: false, reason: "trial-not-close-enough" });
}
