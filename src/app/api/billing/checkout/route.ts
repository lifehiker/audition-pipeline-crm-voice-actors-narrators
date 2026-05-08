import { NextResponse } from "next/server";

import { startCheckout } from "@/lib/billing";

export async function POST(request: Request) {
  const formData = await request.formData();
  const plan = formData.get("plan");

  if (plan !== "solo" && plan !== "pro") {
    return NextResponse.redirect(new URL("/app/account?error=invalid-plan", request.url));
  }

  const result = await startCheckout(plan);
  return NextResponse.redirect(new URL(result.redirectUrl, request.url));
}
