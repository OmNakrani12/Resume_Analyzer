import { NextResponse } from "next/server";
import { rtdb } from "@/app/firebase/admin";
import { randomUUID } from "crypto";

export async function POST(req) {
  const jobId = randomUUID();
  const body = await req.json();

  await rtdb.ref(`jobs/${jobId}`).set({
    ...body,
    createdAt: Date.now(),
  });

  return NextResponse.json({ jobId });
}
