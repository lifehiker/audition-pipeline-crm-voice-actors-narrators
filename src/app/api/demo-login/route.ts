import { NextResponse } from "next/server";

import { sendWelcomeEmail } from "@/lib/email";
import { getAppState } from "@/lib/store";

export async function POST(request: Request) {
  const state = await getAppState();
  await sendWelcomeEmail(state.user.email, state.user.name);
  const response = NextResponse.redirect(new URL("/app", request.url));
  response.cookies.set("voicelog-demo", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });
  return response;
}
