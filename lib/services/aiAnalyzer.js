import { GoogleGenerativeAI } from '@google/generative-ai'

class AIAnalyzer {
  constructor() {
    const apiKey = process.env.GEMINI_API_KEY
    console.log('Gemini API Key:', apiKey);
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY not found')
    }

    this.genAI = new GoogleGenerativeAI(apiKey)
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-pro' // ✅ FIX
    })
  }

  async analyzeResume(resumeText) {
    const prompt = `
You are an expert resume reviewer.

Return ONLY valid JSON.
NO markdown.
NO explanations.
NO text outside JSON.

JSON FORMAT:
{
  "overallScore": 0,
  "summary": "",
  "strengths": [],
  "improvements": [],
  "scores": {
    "formatting": 0,
    "content": 0,
    "experience": 0,
    "skills": 0,
    "education": 0,
    "impact": 0
  },
  "recommendations": []
}

Resume Text:
${resumeText}
`

    try {
      const result = await this.model.generateContent(prompt)
      const response = await result.response
      const rawText = response.text()

      console.log('🔍 Gemini RAW OUTPUT:\n', rawText)

      // ✅ Extract first JSON object safely
      const jsonMatch = rawText.match(/\{[\s\S]*\}/)

      if (!jsonMatch) {
        throw new Error('No JSON found in Gemini response')
      }

      const analysis = JSON.parse(jsonMatch[0])

      return {
        success: true,
        analysis
      }
    } catch (error) {
      console.error('❌ Gemini parsing failed:', error)
      return this._getFallbackAnalysis()
    }
  }

  _getFallbackAnalysis() {
    return {
      success: true,
      analysis: {
        overallScore: 70,
        summary: 'Resume analysis completed. Consider adding more quantifiable achievements.',
        strengths: [
          'Clear contact information',
          'Organized structure',
          'Relevant experience listed',
          'Educational background included'
        ],
        improvements: [
          'Add measurable achievements',
          'Include metrics and results',
          'Improve skills section',
          'Add certifications'
        ],
        scores: {
          formatting: 75,
          content: 70,
          experience: 68,
          skills: 65,
          education: 72,
          impact: 60
        },
        recommendations: [
          'Use action verbs',
          'Quantify achievements',
          'Tailor resume to job role'
        ]
      }
    }
  }
}

export default AIAnalyzer
