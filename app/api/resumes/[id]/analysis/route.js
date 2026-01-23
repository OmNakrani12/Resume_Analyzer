import { NextResponse } from 'next/server';
import dataStore from '@/lib/storage/dataStore';

/**
 * GET /api/resumes/[id]/analysis - Get analysis for specific resume
 */
export async function GET(req, { params }) {
    try {
        const { id } = params;
        const analysis = dataStore.getAnalysis(id);

        if (!analysis) {
            return NextResponse.json(
                { success: false, error: 'Analysis not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: analysis,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('GET ANALYSIS ERROR:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch analysis' },
            { status: 500 }
        );
    }
}
