import { NextResponse } from "next/server";
import { rtdb } from "@/app/firebase/admin";
import { randomUUID } from "crypto";

export async function POST(req) {
  try {
    const analysisId = randomUUID();
    const body = await req.json();

    await rtdb.ref(`analysis_results/${analysisId}`).set({
      ...body,
      createdAt: Date.now(),
    });

    return NextResponse.json({ analysisId });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
