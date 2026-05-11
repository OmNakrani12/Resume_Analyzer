import { NextResponse } from 'next/server'
import RoadmapGenerator from '@/lib/services/roadmapGenerator'

export const runtime = 'nodejs'

/**
 * POST /api/roadmap
 * Generate a personalized learning roadmap using Groq AI
 *
 * Request body:
 * {
 *   "skills": ["skill1", "skill2", "skill3"],
 *   "role": "Senior Developer"
 * }
 */
export async function POST(req) {
  try {
    const { skills, role } = await req.json()

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Skills array is required and must not be empty' },
        { status: 400 }
      )
    }

    if (!role || typeof role !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Role string is required' },
        { status: 400 }
      )
    }

    // Generate roadmap using Groq AI
    const roadmapResult = await RoadmapGenerator.generateRoadmap(skills, role)

    return NextResponse.json({
      success: true,
      data: roadmapResult,
    })
  } catch (error) {
    console.error('❌ Roadmap generation error:', error)

    return NextResponse.json(
      {
        success: false,
        error: `Roadmap generation failed: ${error.message}`,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/roadmap
 * Get API documentation
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Roadmap Generator API (powered by Groq AI)',
    version: '1.0.0',
    endpoints: {
      POST: {
        description: 'Generate a personalized learning roadmap',
        path: '/api/roadmap',
        body: {
          skills: ['skill1', 'skill2', 'skill3'],
          role: 'Role Title',
        },
        response: {
          success: true,
          data: {
            roadmap: 'Array of learning items with AI-generated details',
            phases: 'Learning phases timeline',
            total_estimated_time: 'Estimated time to complete',
            role: 'Target role',
            career_impact: 'AI-generated career impact analysis',
            learning_tips: 'Practical advice for learning',
            source: 'ai-generated or static-fallback',
          },
        },
      },
    },
  })
}
