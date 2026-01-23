import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/services/mailer"

export async function POST(req) {
  try {
    const { to, subject, message } = await req.json()

    if (!to || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      )
    }

    await sendEmail({
      to,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    })

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    })
  } catch (err) {
    console.error("EMAIL ERROR:", err)
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    )
  }
}
