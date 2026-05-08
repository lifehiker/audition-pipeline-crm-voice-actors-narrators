import { NextResponse } from "next/server";

import { openBillingPortal } from "@/lib/billing";

export async function POST(request: Request) {
  const result = await openBillingPortal();
  return NextResponse.redirect(new URL(result.redirectUrl, request.url));
}
