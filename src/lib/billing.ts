import Stripe from "stripe";

import { hasStripeConfig } from "@/lib/env";
import { logEmailEvent, updatePlan } from "@/lib/store";

function getStripe() {
  if (!hasStripeConfig()) {
    return null;
  }

  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function startCheckout(plan: "solo" | "pro") {
  const stripe = getStripe();

  if (!stripe) {
    const subscription = await updatePlan(plan);
    await logEmailEvent({
      type: "payment-receipt",
      provider: "local-fallback",
      plan,
      message: "Stripe credentials unavailable. Recorded local subscription change.",
    });

    return {
      mode: "fallback" as const,
      redirectUrl: "/app/account?checkout=fallback",
      subscription,
    };
  }

  return {
    mode: "stripe" as const,
    redirectUrl: "/app/account?checkout=config-needed",
  };
}

export async function openBillingPortal() {
  if (!getStripe()) {
    return {
      mode: "fallback" as const,
      redirectUrl: "/app/account?portal=fallback",
    };
  }

  return {
    mode: "stripe" as const,
    redirectUrl: "/app/account?portal=config-needed",
  };
}
