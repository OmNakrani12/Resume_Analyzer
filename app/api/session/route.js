import { NextResponse } from "next/server";
import { auth } from "@/app/firebase/config";

export async function POST(req) {
  try {
    const { token } = await req.json();

    // 🔐 Verify Firebase token
    const decoded = await auth.verifyIdToken(token);
    const uid = decoded.uid;

    // 🍪 Set HttpOnly cookie
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
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
