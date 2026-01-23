import { NextResponse } from 'next/server';
import dataStore from '@/lib/storage/dataStore';

/**
 * GET /api/preferences - Get user preferences
 */
export async function GET(req) {
    try {
        const userId = req.headers.get('X-User-ID') || 'default_user';
        const preferences = dataStore.getPreferences(userId);

        return NextResponse.json(
            {
                success: true,
                data: preferences,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('GET PREFERENCES ERROR:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch preferences' },
            { status: 500 }
        );
    }
}

/**
 * PUT /api/preferences - Update user preferences
 */
export async function PUT(req) {
    try {
        const userId = req.headers.get('X-User-ID') || 'default_user';
        const data = await req.json();

        const updated = dataStore.savePreferences(userId, data);

        return NextResponse.json(
            {
                success: true,
                message: 'Preferences updated successfully',
                data: updated,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('UPDATE PREFERENCES ERROR:', err);
        return NextResponse.json(
            { success: false, error: 'Failed to update preferences' },
            { status: 500 }
        );
    }
}
