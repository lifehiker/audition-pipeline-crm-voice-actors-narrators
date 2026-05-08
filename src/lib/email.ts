import { Resend } from "resend";

import { hasResendConfig } from "@/lib/env";
import { logEmailEvent } from "@/lib/store";

function getResend() {
  if (!hasResendConfig()) {
    return null;
  }

  return new Resend(process.env.RESEND_API_KEY!);
}

export async function sendWelcomeEmail(email: string, name: string) {
  const resend = getResend();

  if (!resend) {
    await logEmailEvent({
      type: "welcome",
      email,
      name,
      provider: "local-fallback",
    });
    return;
  }

  await resend.emails.send({
    from: "VoiceLog <hello@updates.voicelog.app>",
    to: email,
    subject: "Welcome to VoiceLog",
    html: `<p>Welcome to VoiceLog, ${name}.</p><p>Your audition pipeline is ready.</p>`,
  });
}

export async function sendTrialReminderEmail(email: string) {
  const resend = getResend();

  if (!resend) {
    await logEmailEvent({
      type: "trial-reminder",
      email,
      provider: "local-fallback",
    });
    return;
  }

  await resend.emails.send({
    from: "VoiceLog <hello@updates.voicelog.app>",
    to: email,
    subject: "Your VoiceLog trial ends in 5 days",
    html: "<p>Your VoiceLog Pro trial is almost up. Upgrade any time to keep analytics and CSV export active.</p>",
  });
}
