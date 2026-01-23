import { NextResponse } from 'next/server';
import dataStore from '@/lib/storage/dataStore';

/**
 * GET /api/stats - Get user statistics
 */
export async function GET(req) {
    try {
        const userId = req.headers.get('X-User-ID') || 'default_user';
        const stats = dataStore.getUserStats(userId);

        return NextResponse.json(
            {
                success: true,
                data: stats,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('GET STATS ERROR:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch statistics' },
            { status: 500 }
        );
    }
}
