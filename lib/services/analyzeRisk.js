import Groq from 'groq-sdk'

/**
 * Resume Risk Analyzer (AI-powered using Groq)
 * Detects inconsistencies, exaggeration, and potential red flags.
 */
export async function analyzeRisk(resumeText, context = {}) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    console.error('GROQ_API_KEY not found. Falling back to rule-based analysis.')
    return getFallbackRiskAnalysis(resumeText)
  }

  const groq = new Groq({ apiKey })

  const prompt = `
You are a senior recruitment auditor and fraud detection expert. 
Analyze the following resume text for "Red Flags", "Inconsistencies", and "Project Authenticity".

Focus on:
1. Skill Exaggeration (Advanced skills listed without supporting experience).
2. Experience Mismatch (Senior titles with low years of experience).
3. Project Depth (Are projects detailed or just list of buzzwords?).
4. Unrealistic Claims (e.g. "built 100% of the internet").
5. Formatting risks (Non-ATS compliant structures).

Return ONLY valid JSON.
NO markdown.
NO explanations.

JSON FORMAT:
{
  "overall_risk_score": 0, // 0-100 (0 is low risk, 100 is critical)
  "risk_level": "Low" | "Medium" | "High",
  "red_flags": [
    {
      "category": "",
      "severity": "Low" | "Medium" | "High",
      "description": "",
      "impact": 0 // 0-30
    }
  ],
  "project_analysis": {
    "authenticity_score": 0, // 0-100
    "detail_level": "Poor" | "Fair" | "Detailed",
    "observation": ""
  },
  "recommendations": []
}

Resume Text:
${resumeText}
`

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 1500,
    })

    const rawText = completion.choices[0]?.message?.content || ''
    const jsonMatch = rawText.match(/\{[\s\S]*\}/)

    if (!jsonMatch) throw new Error('No JSON found')

    const result = JSON.parse(jsonMatch[0])
    return result
  } catch (error) {
    console.error('❌ Groq Risk Analysis failed:', error)
    return getFallbackRiskAnalysis(resumeText)
  }
}

function getFallbackRiskAnalysis(text) {
  // Simple fallback logic if AI fails
  const lowerText = text.toLowerCase()
  const redFlags = []
  let score = 10

  if (!lowerText.includes('github.com') && !lowerText.includes('linkedin.com')) {
    redFlags.push({
      category: 'Verification',
      severity: 'Low',
      description: 'No professional links found for verification.',
      impact: 10
    })
    score += 10
  }

  return {
    overall_risk_score: score,
    risk_level: score > 60 ? 'High' : score > 30 ? 'Medium' : 'Low',
    red_flags: redFlags,
    project_analysis: {
      authenticity_score: 70,
      detail_level: 'Fair',
      observation: 'Manual check recommended for project depth.'
    },
    recommendations: ['Add verifiable links to your resume.']
  }
}
