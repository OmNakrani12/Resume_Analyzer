import Groq from 'groq-sdk';

/**
 * ATS (Applicant Tracking System) Score Calculator
 * Evaluates resume compatibility with ATS systems using Groq AI
 */
class ATSScorer {
    static async calculateAtsScore(resumeText) {
        const apiKey = process.env.GROQ_API_KEY;
        
        if (!apiKey) {
            console.warn('⚠️ GROQ_API_KEY not found, using fallback ATS scoring');
            return this._getFallbackAtsScore();
        }

        const groq = new Groq({ apiKey });

        const prompt = `
You are an expert ATS (Applicant Tracking System) optimization specialist.
Evaluate the following resume text for ATS compatibility and provide a detailed score.

Analyze the following categories (each score should be 0-100):
1. contact_information: Presence of professional email, phone, LinkedIn, and portfolio/location.
2. formatting: Readability, use of standard section headers, absence of complex tables/graphics that break ATS.
3. keywords: Presence of industry-relevant technical skills, soft skills, and role-specific terminology.
4. section_completeness: Presence of all essential sections (Summary/Objective, Experience, Education, Skills, Projects).
5. action_verbs: Effective use of strong action verbs (e.g., 'achieved', 'spearheaded', 'automated', 'led').
6. length: Appropriateness of word count (ideal is generally 400-800 words for a 1-2 page resume).

Return ONLY valid JSON.
NO markdown.
NO explanations.
NO extra text.

JSON FORMAT:
{
  "overall_ats_score": 0,
  "category_scores": {
    "contact_information": 0,
    "formatting": 0,
    "keywords": 0,
    "section_completeness": 0,
    "action_verbs": 0,
    "length": 0
  },
  "recommendations": [],
  "ats_friendly": false
}

Resume Text:
${resumeText}
`;

        try {
            const completion = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    {
                        role: 'user',
                        content: prompt,
                    },
                ],
                temperature: 0.2,
                max_tokens: 1000,
            });

            const rawText = completion.choices[0]?.message?.content || '';
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);

            if (!jsonMatch) {
                throw new Error('No JSON found in Groq response');
            }

            const analysis = JSON.parse(jsonMatch[0]);

            return {
                success: true,
                overall_ats_score: analysis.overall_ats_score,
                category_scores: analysis.category_scores,
                recommendations: analysis.recommendations,
                ats_friendly: analysis.overall_ats_score >= 70,
            };
        } catch (error) {
            console.error('❌ Groq ATS scoring failed:', error);
            return this._getFallbackAtsScore();
        }
    }

    static _getFallbackAtsScore() {
        return {
            success: true,
            overall_ats_score: 65,
            category_scores: {
                contact_information: 70,
                formatting: 65,
                keywords: 60,
                section_completeness: 75,
                action_verbs: 55,
                length: 70
            },
            recommendations: [
                'Ensure your contact information is complete and professional',
                'Incorporate more industry-specific keywords and skills',
                'Use stronger action verbs to describe your achievements',
                'Keep formatting simple and avoid complex layouts'
            ],
            ats_friendly: false,
        };
    }
}

export default ATSScorer;

