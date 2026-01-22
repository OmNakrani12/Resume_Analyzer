import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { auth, rtdb } from "@/app/firebase/admin";

/**
 * CREATE / UPDATE USER PROFILE
 */
export async function POST(req) {
  try {
    const session = cookies().get("session")?.value;
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔐 VERIFY SESSION
    const decoded = await auth.verifyIdToken(session);
    const uid = decoded.uid;
    const email = decoded.email;

    const { fullName } = await req.json();

    await rtdb.ref(`users/${uid}`).set({
      fullName,
      email,
      role: "user",
      plan: "free",
      createdAt: Date.now(),
    });

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("POST /users error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

/**
 * GET CURRENT USER PROFILE
 */
export async function GET() {
  try {
    // ✅ AWAIT cookies()
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔐 Verify token
    const decoded = await auth.verifyIdToken(session);
    const uid = decoded.uid;

    const snapshot = await rtdb.ref(`users/${uid}`).get();
    return NextResponse.json(snapshot.val());

  } catch (err) {
    console.error("GET /users error:", err);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
