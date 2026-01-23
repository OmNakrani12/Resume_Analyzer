import { NextResponse } from 'next/server';
import dataStore from '@/lib/storage/dataStore';

/**
 * GET /api/users - Get user profile
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || req.headers.get('X-User-ID') || 'default_user';

    const user = dataStore.getUser(userId);

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET USER PROFILE ERROR:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/users - Update user profile
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const userId = body.userId || req.headers.get('X-User-ID') || 'default_user';

    const userData = {
      name: body.fullName || body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      location: body.location || '',
      bio: body.bio || '',
      jobTitle: body.jobTitle || '',
    };

    const updated = dataStore.saveUser(userId, userData);

    return NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully',
        data: updated,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('UPDATE USER PROFILE ERROR:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users - Alternative update method
 */
export async function PUT(req) {
  return POST(req);
}
