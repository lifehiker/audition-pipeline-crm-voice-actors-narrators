import { NextResponse } from "next/server";

import { hasStripeConfig } from "@/lib/env";
import { logEmailEvent } from "@/lib/store";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!hasStripeConfig()) {
    await logEmailEvent({
      type: "stripe-webhook",
      provider: "local-fallback",
      message: "Webhook received without Stripe credentials. Ignored safely.",
      hasSignature: Boolean(signature),
    });

    return NextResponse.json({ received: true, mode: "fallback" });
  }

  await logEmailEvent({
    type: "stripe-webhook",
    provider: "stripe-configured",
    message: "Stripe credentials are configured, but webhook mutation logic still depends on live account wiring.",
    hasSignature: Boolean(signature),
    payloadSize: body.length,
  });

  return NextResponse.json({ received: true, mode: "configured" });
}
