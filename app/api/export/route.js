import { NextResponse } from "next/server";

const PYTHON_API_URL = process.env.NEXT_PUBLIC_PYTHON_API_URL || 'http://localhost:3001';

/**
 * POST /api/export - Export analysis results
 * Supports JSON and Markdown formats
 */
export async function POST(req) {
    try {
        const { searchParams } = new URL(req.url);
        const format = searchParams.get('format') || 'json'; // json or markdown
        const download = searchParams.get('download') === 'true';

        const body = await req.json();

        if (!body) {
            return NextResponse.json(
                { success: false, error: 'Analysis data required' },
                { status: 400 }
            );
        }

        // Choose endpoint based on format and download preference
        let endpoint = `/api/export/${format}`;
        if (download) {
            endpoint = `/api/export/download/${format}`;
        }

        const response = await fetch(`${PYTHON_API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Export failed' },
                { status: response.status }
            );
        }

        // If downloading, return the file
        if (download) {
            const blob = await response.blob();
            const contentType = format === 'json' ? 'application/json' : 'text/markdown';
            const filename = `resume_analysis_${Date.now()}.${format === 'json' ? 'json' : 'md'}`;

            return new NextResponse(blob, {
                headers: {
                    'Content-Type': contentType,
                    'Content-Disposition': `attachment; filename="${filename}"`
                }
            });
        }

        const result = await response.json();
        return NextResponse.json(result);

    } catch (err) {
        console.error("EXPORT ERROR:", err);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}

/**
 * GET /api/export/summary - Get analysis summary statistics
 */
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const analysisData = searchParams.get('data');

        if (!analysisData) {
            return NextResponse.json(
                { success: false, error: 'Analysis data required' },
                { status: 400 }
            );
        }

        const response = await fetch(`${PYTHON_API_URL}/api/export/summary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: analysisData
        });

        if (!response.ok) {
            return NextResponse.json(
                { success: false, error: 'Failed to get summary' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);

    } catch (err) {
        console.error("GET SUMMARY ERROR:", err);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
