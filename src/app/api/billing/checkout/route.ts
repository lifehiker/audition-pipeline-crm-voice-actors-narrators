import { NextResponse } from "next/server";

import { startCheckout } from "@/lib/billing";

async function readPlan(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (
    contentType.includes("multipart/form-data") ||
    contentType.includes("application/x-www-form-urlencoded")
  ) {
    const formData = await request.formData();
    return formData.get("plan");
  }

  if (contentType.includes("application/json")) {
    const payload = (await request.json()) as { plan?: unknown };
    return payload.plan;
  }

  return null;
}

export async function POST(request: Request) {
  const plan = await readPlan(request);

  if (plan !== "solo" && plan !== "pro") {
    return NextResponse.redirect(new URL("/app/account?error=invalid-plan", request.url));
  }

  const result = await startCheckout(plan);
  return NextResponse.redirect(new URL(result.redirectUrl, request.url));
}
