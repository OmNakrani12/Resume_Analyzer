import { NextResponse } from 'next/server'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'
import os from 'os'
import { v4 as uuidv4 } from 'uuid'
import { adminAuth } from '@/app/firebase/admin'

import DocumentExtractor from '@/lib/services/documentExtractor'
import AIAnalyzer from '@/lib/services/aiAnalyzer'
import SkillExtractor from '@/lib/services/skillExtractor'
import ATSScorer from '@/lib/services/atsScorer'
import RoadmapGenerator from '@/lib/services/roadmapGenerator'
import { analyzeRisk } from '@/lib/services/riskAnalyzer'

// 🔴 REQUIRED: force Node runtime (PDF parsing needs fs)
export const runtime = 'nodejs'

/**
 * Helper: Extract userId from auth header (optional)
 */
async function getUserIdFromRequest(req) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }
    const token = authHeader.split('Bearer ')[1]
    const decoded = await adminAuth.verifyIdToken(token)
    return decoded.uid
  } catch (err) {
    return null
  }
}

export async function POST(req) {
  let filePath = null
  let userId = null

  try {
    // Extract userId from auth header (optional)
    userId = await getUserIdFromRequest(req)
    
    const formData = await req.formData()
    const file = formData.get('file')

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    const fileName = file.name
    const fileExtension = fileName.split('.').pop().toLowerCase()
    const allowedExtensions = ['pdf', 'doc', 'docx', 'txt']

    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed: PDF, DOC, DOCX, TXT' },
        { status: 400 }
      )
    }

    // ✅ WRITE FILE ONLY TO /tmp
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const tempFileName = `${uuidv4()}.${fileExtension}`
    filePath = path.join(os.tmpdir(), tempFileName)

    await writeFile(filePath, buffer)

    // Step 1: Extract text
    const extractionResult = await DocumentExtractor.extractText(
      filePath,
      fileExtension
    )

    if (!extractionResult.success) {
      throw new Error(extractionResult.error || 'Text extraction failed')
    }

    const resumeText = extractionResult.text

    // Step 2: Skills
    const skillAnalysis = await SkillExtractor.analyzeSkills(resumeText)

    // Step 3: ATS
    const atsResult = await ATSScorer.calculateAtsScore(resumeText, skillAnalysis)

    // Step 4: AI analysis
    const aiAnalyzer = new AIAnalyzer()
    const aiResult = await aiAnalyzer.analyzeResume(resumeText)

    // Step 5: Roadmap (now async with Groq AI)
    const roadmapResult = await RoadmapGenerator.generateRoadmap(
      skillAnalysis.suggested_skills,
      skillAnalysis.detected_role
    )

    // Step 6: Risk analysis
    const riskAnalysis = await analyzeRisk(resumeText, {
      skills: skillAnalysis,
      atsScore: atsResult
    })

    return NextResponse.json({
      success: true,
      data: {
        resume_text: resumeText,
        extraction: {
          word_count: extractionResult.word_count,
          char_count: extractionResult.char_count,
        },
        ai_analysis: aiResult.analysis,
        skills: {
          current: skillAnalysis.current_skills,
          suggested: skillAnalysis.suggested_skills,
          detected_role: skillAnalysis.detected_role,
          skill_gap_count: skillAnalysis.skill_gap_count,
        },
        ats_score: {
          overall_score: atsResult.overall_ats_score,
          category_scores: atsResult.category_scores,
          recommendations: atsResult.recommendations,
          ats_friendly: atsResult.ats_friendly,
        },
        roadmap: {
          items: roadmapResult.roadmap,
          phases: roadmapResult.phases,
          total_time: roadmapResult.total_estimated_time,
          career_impact: roadmapResult.career_impact,
          learning_tips: roadmapResult.learning_tips,
          source: roadmapResult.source,
        },
        risk_analysis: riskAnalysis,
      },
    })
  } catch (err) {
    console.error('ANALYSIS API ERROR:', err)

    return NextResponse.json(
      { success: false, error: `Analysis failed: ${err.message}` },
      { status: 500 }
    )
  } finally {
    // ✅ ALWAYS CLEAN UP TEMP FILE
    if (filePath) {
      try {
        await unlink(filePath)
      } catch (e) {
        console.error('Temp file cleanup failed:', e)
      }
    }
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Resume Analyzer API is running',
      version: '2.0.0',
    },
    { status: 200 }
  )
}
