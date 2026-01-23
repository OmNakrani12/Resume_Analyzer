import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:3001';

/**
 * GET /api/resumes/[id] - Get specific resume details
 */
export async function GET(req, { params }) {
    try {
        const { id } = params;

        const response = await fetch(`${PYTHON_API_URL}/api/resumes/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Resume not found' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);

    } catch (err) {
        console.error("GET RESUME DETAIL ERROR:", err);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/resumes/[id] - Delete a resume
 */
export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        const response = await fetch(`${PYTHON_API_URL}/api/resumes/${id}`, {
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

/**
 * PUT /api/resumes/[id] - Update resume metadata
 */
export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const body = await req.json();

        const response = await fetch(`${PYTHON_API_URL}/api/resumes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Failed to update resume' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);

    } catch (err) {
        console.error("UPDATE RESUME ERROR:", err);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
