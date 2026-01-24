import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { rtdb } from '@/app/firebase/admin'

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)

    const userId = req.headers.get('X-User-ID') || 'default_user'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const snapshot = await rtdb.ref(`resumes/${userId}`).get()

    let resumes = snapshot.exists()
      ? Object.entries(snapshot.val()).map(([id, value]) => ({
          id,
          ...value.meta,
        }))
      : []

    // newest first
    resumes.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    )

    const start = (page - 1) * limit
    const paginated = resumes.slice(start, start + limit)

    return NextResponse.json(
      {
        success: true,
        data: {
          resumes: paginated,
          total: resumes.length,
          page,
          limit,
          totalPages: Math.ceil(resumes.length / limit),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('GET RESUMES ERROR:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}

export async function POST(req) {
  try {
    const body = await req.json()
    const userId = req.headers.get('X-User-ID') || 'default_user'

    const resumeId = uuidv4()
    const createdAt = new Date().toISOString()

    const resumeData = {
      meta: {
        fileName: body.fileName || 'resume.pdf',
        fileSize: body.fileSize || 0,
        overallScore: body.overallScore || 0,
        atsScore: body.atsScore || 0,
        createdAt,
      },
      analysis: {
        aiAnalysis: body.aiAnalysis || {},
        skills: body.skills || [],
        roadmap: body.roadmap || [],
      },
    }

    await rtdb.ref(`resumes/${userId}/${resumeId}`).set(resumeData)

    return NextResponse.json(
      {
        success: true,
        message: 'Resume analysis saved successfully',
        data: { resumeId },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('SAVE RESUME ERROR:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save resume' },
      { status: 500 }
    )
  }
}
