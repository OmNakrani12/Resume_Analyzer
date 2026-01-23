import { NextResponse } from 'next/server'
import { adminAuth, rtdb } from '@/app/firebase/admin'

/**
 * Helper: Verify Firebase token and get userId
 */
async function getUserIdFromRequest(req) {
  const authHeader = req.headers.get('authorization')

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized')
  }

  const token = authHeader.split('Bearer ')[1]
  const decoded = await adminAuth.verifyIdToken(token)

  return decoded.uid
}

/**
 * GET /api/profile
 * Get logged-in user's profile
 */
export async function GET(req) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split('Bearer ')[1]
    const decoded = await adminAuth.verifyIdToken(token)
    const userId = decoded.uid

    const snapshot = await rtdb.ref(`users/${userId}`).get()

    const userProfile = snapshot.exists()
      ? snapshot.val()
      : {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        bio: '',
        jobTitle: '',
      }

    return NextResponse.json(
      {
        success: true,
        data: userProfile,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('GET PROFILE ERROR:', err.message)

    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }
}

/**
 * PUT /api/profile
 * Update logged-in user's profile
 */
export async function PUT(req) {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.split('Bearer ')[1]
    const decoded = await adminAuth.verifyIdToken(token)
    const userId = decoded.uid

    const data = await req.json()

    if (!data) {
      return NextResponse.json(
        { success: false, error: 'No data provided' },
        { status: 400 }
      )
    }

    const userData = {
      fullName: data.fullName ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      location: data.location ?? '',
      bio: data.bio ?? '',
      jobTitle: data.jobTitle ?? '',
      updatedAt: Date.now(),
    }

    // ✅ Save to Firebase Realtime Database
    await rtdb.ref(`users/${userId}`).update(userData)

    return NextResponse.json(
      {
        success: true,
        message: 'Profile updated successfully',
        data: userData,
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('UPDATE PROFILE ERROR:', err.message)

    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }
}
