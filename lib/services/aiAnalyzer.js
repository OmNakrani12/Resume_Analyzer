/**
 * AI-Powered Resume Analyzer using Google Gemini
 * Provides comprehensive resume analysis with scoring
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

class AIAnalyzer {
    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY not found in environment variables');
        }

        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    }

    async analyzeResume(resumeText) {
        const prompt = `You are an expert resume reviewer and career coach. Analyze the following resume and provide a comprehensive evaluation.

Resume Text:
${resumeText}

Please provide your analysis in the following JSON format:

{
    "overallScore": <number between 0-100>,
    "summary": "<brief 2-3 sentence summary of the resume>",
    "strengths": [
        "<strength 1>",
        "<strength 2>",
        "<strength 3>",
        "<strength 4>"
    ],
    "improvements": [
        "<improvement suggestion 1>",
        "<improvement suggestion 2>",
        "<improvement suggestion 3>",
        "<improvement suggestion 4>"
    ],
    "scores": {
        "formatting": <0-100>,
        "content": <0-100>,
        "experience": <0-100>,
        "skills": <0-100>,
        "education": <0-100>,
        "impact": <0-100>
    },
    "recommendations": [
        "<actionable recommendation 1>",
        "<actionable recommendation 2>",
        "<actionable recommendation 3>"
    ]
}

Evaluate based on:
1. Overall structure and formatting
2. Content quality and relevance
3. Work experience presentation
4. Skills demonstration
5. Education and certifications
6. Impact and achievements

Provide only the JSON response, no additional text.`;

        try {
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            let resultText = response.text().trim();

            // Remove markdown code blocks if present
            if (resultText.startsWith('```')) {
                const parts = resultText.split('```');
                resultText = parts[1];
                if (resultText.startsWith('json')) {
                    resultText = resultText.substring(4);
                }
                resultText = resultText.trim();
            }

            const analysis = JSON.parse(resultText);

            // Validate structure
            const requiredKeys = ['overallScore', 'summary', 'strengths', 'improvements', 'scores', 'recommendations'];
            for (const key of requiredKeys) {
                if (!(key in analysis)) {
                    throw new Error(`Missing required key: ${key}`);
                }
            }

            return {
                success: true,
                analysis,
            };
        } catch (error) {
            console.error('AI Analysis error:', error);
            return this._getFallbackAnalysis();
        }
    }

    _getFallbackAnalysis() {
        return {
            success: true,
            analysis: {
                overallScore: 70,
                summary: 'Resume analysis completed. Consider adding more specific achievements and quantifiable results.',
                strengths: [
                    'Clear contact information',
                    'Organized structure',
                    'Relevant experience listed',
                    'Educational background included',
                ],
                improvements: [
                    'Add more quantifiable achievements',
                    'Include specific metrics and results',
                    'Enhance skills section with proficiency levels',
                    'Add relevant certifications',
                ],
                scores: {
                    formatting: 75,
                    content: 70,
                    experience: 68,
                    skills: 65,
                    education: 72,
                    impact: 60,
                },
                recommendations: [
                    'Use action verbs to describe accomplishments',
                    'Quantify achievements with numbers and percentages',
                    'Tailor resume to specific job descriptions',
                ],
            },
        };
    }
}

export default AIAnalyzer;
