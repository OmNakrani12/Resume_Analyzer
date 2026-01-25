// app/api/gemini-test/route.js
import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

    const result = await model.generateContent('Say OK')
    return NextResponse.json({ ok: true, text: result.response.text() })
  } catch (e) {
    return NextResponse.json({
      ok: false,
      error: e.message
    })
  }
}
