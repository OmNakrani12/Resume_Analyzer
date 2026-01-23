import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:3001';

/**
 * POST /api/jobs/match - Match resume with job description
 */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.jobDescription) {
      return NextResponse.json(
        { success: false, error: 'Job description is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${PYTHON_API_URL}/api/jobs/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Job matching failed' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("JOB MATCH ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/jobs/suggestions - Get job suggestions
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const skills = searchParams.get('skills')?.split(',') || [];
    const role = searchParams.get('role') || 'Software Engineer';

    const response = await fetch(`${PYTHON_API_URL}/api/jobs/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ skills, role })
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to get suggestions' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("JOB SUGGESTIONS ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
