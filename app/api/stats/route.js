import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:3001';

/**
 * GET /api/stats - Get user statistics
 */
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId') || 'default_user';

        const response = await fetch(`${PYTHON_API_URL}/api/users/stats`, {
            headers: {
                'X-User-ID': userId
            }
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Failed to fetch statistics' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);

    } catch (err) {
        console.error("GET STATS ERROR:", err);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * POST /api/stats/compare - Compare resume statistics
 */
export async function POST(req) {
    try {
        const body = await req.json();

        if (!body.resumeId1 || !body.resumeId2) {
            return NextResponse.json(
                { success: false, error: 'Two resume IDs required for comparison' },
                { status: 400 }
            );
        }

        const response = await fetch(`${PYTHON_API_URL}/api/resumes/compare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Comparison failed' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);

    } catch (err) {
        console.error("COMPARE STATS ERROR:", err);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
