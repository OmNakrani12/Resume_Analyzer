import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:3001';

/**
 * GET /api/users/profile - Get user profile
 * Proxies to Python backend
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'default_user';

    const response = await fetch(`${PYTHON_API_URL}/api/users/profile`, {
      headers: {
        'X-User-ID': userId
      }
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to fetch profile' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("GET USER PROFILE ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users/profile - Update user profile
 * Proxies to Python backend
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const userId = body.userId || 'default_user';

    const response = await fetch(`${PYTHON_API_URL}/api/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-ID': userId
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Failed to update profile' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (err) {
    console.error("UPDATE USER PROFILE ERROR:", err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/profile - Alternative update method
 */
export async function PUT(req) {
  return POST(req);
}
