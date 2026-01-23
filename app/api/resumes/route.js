import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:3001';

/**
 * GET /api/resumes - List user's resumes
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'default_user';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    const response = await fetch(
      `${PYTHON_API_URL}/api/resumes?page=${page}&limit=${limit}`,
      {
        headers: {
          'X-User-ID': userId
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch resumes' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("GET RESUMES ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/resumes - Save analysis result
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const userId = body.userId || 'default_user';

    const response = await fetch(`${PYTHON_API_URL}/api/resumes/save-analysis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to save analysis' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("SAVE RESUME ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/resumes - Delete a resume
 */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const resumeId = searchParams.get('id');

    if (!resumeId) {
      return NextResponse.json(
        { success: false, error: 'Resume ID required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${PYTHON_API_URL}/api/resumes/${resumeId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to delete resume' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("DELETE RESUME ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
