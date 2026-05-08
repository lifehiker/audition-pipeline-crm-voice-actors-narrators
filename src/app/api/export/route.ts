import { NextResponse } from "next/server";

import { getAppState } from "@/lib/store";

export async function GET() {
  const state = await getAppState();
  if (state.subscription.plan === "solo") {
    return NextResponse.json(
      { error: "CSV export is available on Pro and during the free trial." },
      { status: 403 },
    );
  }

  const header = [
    "title",
    "role",
    "platform",
    "genre",
    "payType",
    "payDetails",
    "status",
    "submittedAt",
    "notes",
  ];

  const rows = state.auditions.map((audition) =>
    [
      audition.title,
      audition.role,
      audition.platform,
      audition.genre,
      audition.payType,
      audition.payDetails,
      audition.status,
      audition.submittedAt,
      (audition.notes ?? "").replaceAll("\n", " "),
    ]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(","),
  );

  const csv = [header.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="voicelog-auditions.csv"',
    },
  });
}
