import { NextResponse } from "next/server";
import { auth, rtdb } from "@/app/firebase/admin";

export async function POST(req) {
  try {
    const { token, fullName } = await req.json();

    if (!token || !fullName) {
      return NextResponse.json(
        { error: "Missing data" },
        { status: 400 }
      );
    }

    // 🔐 Verify token
    const decoded = await auth.verifyIdToken(token);
    const uid = decoded.uid;
    const email = decoded.email;

    // 🗄️ Save user profile
    await rtdb.ref(`users/${uid}`).set({
      fullName,
      email,
      role: "user",
      plan: "free",
      createdAt: Date.now(),
    });

    // 🍪 Set secure cookie
    const response = NextResponse.json({ success: true });

    response.cookies.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 5, // 5 days
    });

    return response;

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }
}
