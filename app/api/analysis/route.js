import { NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';
import DocumentExtractor from '@/lib/services/documentExtractor';
import AIAnalyzer from '@/lib/services/aiAnalyzer';
import SkillExtractor from '@/lib/services/skillExtractor';
import ATSScorer from '@/lib/services/atsScorer';
import RoadmapGenerator from '@/lib/services/roadmapGenerator';
import { analyzeRisk } from '@/lib/services/riskAnalyzer';

/**
 * POST /api/analysis - Analyze resume
 * Complete AI-powered resume analysis
 */
export async function POST(req) {
  let filePath = null;

  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'doc', 'docx', 'txt'];

    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed: PDF, DOC, DOCX, TXT' },
        { status: 400 }
      );
    }

    // Save file temporarily
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempFileName = `${uuidv4()}.${fileExtension}`;
    filePath = join(process.cwd(), 'tmp', tempFileName);

    // Ensure tmp directory exists
    try {
      await writeFile(filePath, buffer);
    } catch (err) {
      // Create tmp directory if it doesn't exist
      const { mkdir } = await import('fs/promises');
      await mkdir(join(process.cwd(), 'tmp'), { recursive: true });
      await writeFile(filePath, buffer);
    }

    // Step 1: Extract text from document
    const extractionResult = await DocumentExtractor.extractText(filePath, fileExtension);

    if (!extractionResult.success) {
      // Clean up
      if (filePath) {
        try {
          await unlink(filePath);
        } catch (e) {
          console.error('Failed to delete temp file:', e);
        }
      }
      return NextResponse.json(
        {
          success: false,
          error: `Text extraction failed: ${extractionResult.error || 'Unknown error'}`,
        },
        { status: 500 }
      );
    }

    const resumeText = extractionResult.text;

    // Step 2: Extract skills
    const skillAnalysis = SkillExtractor.analyzeSkills(resumeText);

    // Step 3: Calculate ATS score
    const atsResult = ATSScorer.calculateAtsScore(resumeText, skillAnalysis);

    // Step 4: AI-powered analysis
    const aiAnalyzer = new AIAnalyzer();
    const aiResult = await aiAnalyzer.analyzeResume(resumeText);

    // Step 5: Generate learning roadmap
    const roadmapResult = RoadmapGenerator.generateRoadmap(
      skillAnalysis.suggested_skills,
      skillAnalysis.detected_role
    );

    // Step 6: Analyze risk (NEW)
    const riskAnalysis = await analyzeRisk(resumeText, {
      skills: skillAnalysis,
      atsScore: atsResult
    });

    // Clean up uploaded file
    if (filePath) {
      try {
        await unlink(filePath);
      } catch (e) {
        console.error('Failed to delete temp file:', e);
      }
    }

    // Compile comprehensive response
    const response = {
      success: true,
      data: {
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
        },
        risk_analysis: riskAnalysis, // NEW
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error('ANALYSIS API ERROR:', err);

    // Clean up on error
    if (filePath) {
      try {
        await unlink(filePath);
      } catch (e) {
        console.error('Failed to delete temp file:', e);
      }
    }

    return NextResponse.json(
      { success: false, error: `Analysis failed: ${err.message}` },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analysis/health - Health check
 */
export async function GET(req) {
  return NextResponse.json(
    {
      success: true,
      message: 'Resume Analyzer API is running',
      version: '2.0.0',
    },
    { status: 200 }
  );
}
