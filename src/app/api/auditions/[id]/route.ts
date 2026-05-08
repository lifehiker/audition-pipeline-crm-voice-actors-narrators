import { NextResponse } from "next/server";

import { deleteAudition, updateAudition } from "@/lib/store";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const payload = await request.json();
  const audition = await updateAudition(id, payload);
  return NextResponse.json(audition);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await deleteAudition(id);
  return NextResponse.json({ ok: true });
}
