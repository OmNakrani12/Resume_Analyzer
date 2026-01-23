import { NextResponse } from 'next/server';
import dataStore from '@/lib/storage/dataStore';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET /api/resumes - List user's resumes
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = req.headers.get('X-User-ID') || 'default_user';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get user's resumes
    let userResumes = dataStore.getUserResumes(userId);

    // Sort by date (newest first)
    userResumes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Paginate
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = userResumes.slice(start, end);

    return NextResponse.json(
      {
        success: true,
        data: {
          resumes: paginated,
          total: userResumes.length,
          page,
          limit,
          totalPages: Math.ceil(userResumes.length / limit),
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET RESUMES ERROR:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/resumes/save-analysis - Save analysis results
 */
export async function POST(req) {
  try {
    const data = await req.json();
    const userId = req.headers.get('X-User-ID') || 'default_user';

    const resumeId = uuidv4();

    // Save resume metadata
    const resumeData = {
      id: resumeId,
      userId,
      fileName: data.fileName || 'resume.pdf',
      fileSize: data.fileSize || 0,
      overallScore: data.overallScore || 0,
      atsScore: data.atsScore || 0,
      createdAt: new Date().toISOString(),
    };

    dataStore.saveResume(resumeData);

    // Save analysis results
    const analysisData = {
      aiAnalysis: data.aiAnalysis,
      atsScore: data.atsScore,
      skills: data.skills,
      roadmap: data.roadmap,
    };

    dataStore.saveAnalysis(resumeId, analysisData);

    return NextResponse.json(
      {
        success: true,
        message: 'Analysis saved successfully',
        data: { resumeId },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('SAVE ANALYSIS ERROR:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to save analysis' },
      { status: 500 }
    );
  }
}
