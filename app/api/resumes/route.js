import { NextResponse } from "next/server";
import { rtdb } from "@/app/firebase/admin";
import { randomUUID } from "crypto";

export async function POST(req) {
  try {
    const body = await req.json();
    const resumeId = randomUUID();

    await rtdb.ref(`resumes/${resumeId}`).set({
      ...body,
      createdAt: Date.now(),
      version: 1,
    });

    return NextResponse.json({ resumeId });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const snapshot = await rtdb.ref("resumes").orderByChild("userId")
    .equalTo(userId)
    .get();

  const data = snapshot.exists()
    ? Object.entries(snapshot.val()).map(([id, value]) => ({ id, ...value }))
    : [];

  return NextResponse.json(data);
}
