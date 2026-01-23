import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:3001';

/**
 * GET /api/resumes/[id]/analysis - Get analysis results for a resume
 */
export async function GET(req, { params }) {
    try {
        const { id } = params;

        const response = await fetch(`${PYTHON_API_URL}/api/resumes/${id}/analysis`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Analysis not found' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);

    } catch (err) {
        console.error("GET ANALYSIS ERROR:", err);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
