import { NextResponse } from 'next/server';
import JobMatcher from '@/lib/services/jobMatcher';

/**
 * POST /api/jobs/match - Match resume with job description
 */
export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get('action');

    const data = await req.json();

    // Handle different job-related actions
    if (action === 'match') {
      return handleJobMatch(data);
    } else if (action === 'suggestions') {
      return handleJobSuggestions(data);
    } else if (action === 'keywords') {
      return handleKeywordExtraction(data);
    }

    // Default to job match
    return handleJobMatch(data);
  } catch (err) {
    console.error('JOBS API ERROR:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process job request' },
      { status: 500 }
    );
  }
}

async function handleJobMatch(data) {
  if (!data) {
    return NextResponse.json(
      { success: false, error: 'No data provided' },
      { status: 400 }
    );
  }

  const resumeText = data.resumeText || '';
  const resumeSkills = data.resumeSkills || {};
  const jobDescription = data.jobDescription || '';

  if (!jobDescription) {
    return NextResponse.json(
      { success: false, error: 'Job description is required' },
      { status: 400 }
    );
  }

  // Analyze job match
  const result = JobMatcher.analyzeJobMatch(resumeText, resumeSkills, jobDescription);

  return NextResponse.json(result, { status: 200 });
}

async function handleJobSuggestions(data) {
  const skills = data.skills || [];
  const role = data.role || 'Software Engineer';

  // Job suggestions based on role and skills
  const jobSuggestions = {
    'Software Engineer': [
      {
        title: 'Full Stack Developer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        matchScore: 85,
        requiredSkills: ['React', 'Node.js', 'Python', 'SQL'],
      },
      {
        title: 'Backend Engineer',
        company: 'StartupXYZ',
        location: 'Remote',
        matchScore: 78,
        requiredSkills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      },
      {
        title: 'Frontend Developer',
        company: 'Design Co',
        location: 'New York, NY',
        matchScore: 72,
        requiredSkills: ['React', 'TypeScript', 'CSS', 'Figma'],
      },
    ],
    'Data Scientist': [
      {
        title: 'Machine Learning Engineer',
        company: 'AI Labs',
        location: 'Boston, MA',
        matchScore: 88,
        requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'SQL'],
      },
      {
        title: 'Data Analyst',
        company: 'Analytics Inc',
        location: 'Chicago, IL',
        matchScore: 75,
        requiredSkills: ['Python', 'SQL', 'Tableau', 'Statistics'],
      },
    ],
  };

  const suggestions = jobSuggestions[role] || jobSuggestions['Software Engineer'];

  return NextResponse.json(
    {
      success: true,
      data: {
        role,
        suggestions,
        totalJobs: suggestions.length,
      },
    },
    { status: 200 }
  );
}

async function handleKeywordExtraction(data) {
  const jobDescription = data.jobDescription || '';

  if (!jobDescription) {
    return NextResponse.json(
      { success: false, error: 'Job description is required' },
      { status: 400 }
    );
  }

  const keywords = JobMatcher.extractJobRequirements(jobDescription);

  return NextResponse.json(
    {
      success: true,
      data: {
        keywords: keywords.slice(0, 20), // Top 20 keywords
        totalKeywords: keywords.length,
      },
    },
    { status: 200 }
  );
}
