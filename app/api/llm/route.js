import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { text } = await req.json();

    const prompt = `
Convert the following text into JSON.
Respond ONLY in valid JSON.

Text:
"${text}"
extract information like action, group name, amount, payer and who owes amount.
`;

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt,
        stream: false
      })
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      result: data.response
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
