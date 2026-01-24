import { NextResponse } from 'next/server'
import { rtdb } from '@/app/firebase/admin';

export async function GET(req, { params }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId' },
        { status: 400 }
      )
    }

    const snapshot = await rtdb
      .ref(`resumes/${userId}/${id}`)
      .get()

    if (!snapshot.exists()) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id,
          ...snapshot.val(),
        },
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('GET RESUME ERROR:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/resumes/[id]
 * Update resume metadata
 */
export async function PUT(req, { params }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { userId, fileName, notes } = body

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId' },
        { status: 400 }
      )
    }

    const ref = rtdb.ref(`resumes/${userId}/${id}`)
    const snapshot = await ref.get()

    if (!snapshot.exists()) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      )
    }

    const updates = {
      ...(fileName && { fileName }),
      ...(notes !== undefined && { notes }),
      updatedAt: Date.now(),
    }

    await ref.update(updates)

    return NextResponse.json(
      {
        success: true,
        message: 'Resume updated successfully',
        data: {
          id,
          ...snapshot.val(),
          ...updates,
        },
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('UPDATE RESUME ERROR:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/resumes/[id]?userId=xxx
 * Delete resume
 */
export async function DELETE(req, { params }) {
  try {
    const { id } = await params
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Missing userId' },
        { status: 400 }
      )
    }

    const ref = rtdb.ref(`resumes/${userId}/${id}`)
    const snapshot = await ref.get()

    if (!snapshot.exists()) {
      return NextResponse.json(
        { success: false, error: 'Resume not found' },
        { status: 404 }
      )
    }

    await ref.remove()

    return NextResponse.json(
      {
        success: true,
        message: 'Resume deleted successfully',
      },
      { status: 200 }
    )
  } catch (err) {
    console.error('DELETE RESUME ERROR:', err)
    return NextResponse.json(
      { success: false, error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}
