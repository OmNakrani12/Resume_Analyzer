import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:3001';

/**
 * POST /api/analysis - Analyze resume
 * Proxies to Python backend for AI-powered analysis
 */
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Forward to Python backend
    const pythonFormData = new FormData();
    pythonFormData.append('file', file);

    const response = await fetch(`${PYTHON_API_URL}/api/analyze`, {
      method: 'POST',
      body: pythonFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { success: false, error: errorData.error || 'Analysis failed' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("ANALYSIS API ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analysis/history - Get analysis history
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'default_user';
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '10';

    // Forward to Python backend
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
        { success: false, error: 'Failed to fetch history' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("GET ANALYSIS HISTORY ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
