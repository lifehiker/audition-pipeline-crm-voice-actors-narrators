import { NextResponse } from "next/server";

import { createAudition, listAuditions } from "@/lib/store";

export async function GET() {
  return NextResponse.json(await listAuditions());
}

export async function POST(request: Request) {
  const payload = await request.json();
  const audition = await createAudition({
    title: payload.title,
    role: payload.role,
    platform: payload.platform,
    genre: payload.genre,
    payType: payload.payType,
    payDetails: payload.payDetails,
    flatFee: payload.flatFee,
    perFinishedHourRate: payload.perFinishedHourRate,
    royaltyPercentage: payload.royaltyPercentage,
    estimatedFinishedHours: payload.estimatedFinishedHours,
    monthlySalesEstimate: payload.monthlySalesEstimate,
    status: payload.status,
    submittedAt: new Date(payload.submittedAt).toISOString(),
    notes: payload.notes,
  });

  return NextResponse.json(audition, { status: 201 });
}
