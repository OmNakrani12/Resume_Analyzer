import { NextResponse } from "next/server";
import { adminAuth, rtdb } from "@/app/firebase/admin";

/* =========================
   PATCH → Partial Update
========================= */
export async function PATCH(req) {
  try {
    const { token, fullName, plan, role } = await req.json();

    if (!token) {
      return NextResponse.json(
        { error: "Missing token" },
        { status: 400 }
      );
    }

    // 🔐 Verify Firebase ID token
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    // 🧠 Build update object dynamically
    const updates = {
      updatedAt: Date.now(),
    };

    if (fullName) updates.fullName = fullName;
    if (plan) updates.plan = plan;
    if (role) updates.role = role;

    // 🚫 Prevent empty updates
    if (Object.keys(updates).length === 1) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    // 🗄️ Partial update (PATCH behavior)
    await rtdb.ref(`users/${uid}`).update(updates);

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      updates,
    });

  } catch (err) {
    console.error("PATCH USER ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    );
  }
}

/* =========================
   GET → Fetch User Profile
========================= */
export async function GET(req) {
  try {
    // 🔐 Read token from Authorization header
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.replace("Bearer ", "");

    // 🔎 Verify Firebase ID token
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    // 📦 Fetch user profile
    const snapshot = await rtdb.ref(`users/${uid}`).get();

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: snapshot.val(),
    });

  } catch (err) {
    console.error("GET USER ERROR:", err);
    return NextResponse.json(
      { error: err.message },
      { status: 401 }
    );
  }
}
