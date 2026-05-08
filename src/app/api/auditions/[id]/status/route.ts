import { NextResponse } from "next/server";

import { updateAuditionStatus } from "@/lib/store";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload = await request.json();
  const audition = await updateAuditionStatus(id, payload.status);
  return NextResponse.json(audition);
}
