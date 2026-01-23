/**
 * ATS (Applicant Tracking System) Score Calculator
 * Evaluates resume compatibility with ATS systems
 */

class ATSScorer {
    // Keywords that ATS systems look for
    static CONTACT_KEYWORDS = ['email', 'phone', 'linkedin', 'github', 'portfolio'];
    static SECTION_KEYWORDS = ['experience', 'education', 'skills', 'projects', 'certifications'];
    static ACTION_VERBS = [
        'achieved', 'improved', 'developed', 'created', 'managed', 'led', 'designed',
        'implemented', 'increased', 'reduced', 'optimized', 'built', 'launched',
        'delivered', 'collaborated', 'coordinated', 'analyzed', 'resolved',
    ];

    static calculateAtsScore(resumeText, extractedSkills) {
        const textLower = resumeText.toLowerCase();
        const scores = {};

        // 1. Contact Information Score (0-100)
        scores.contact_information = this._scoreContactInfo(textLower);

        // 2. Formatting Score (0-100)
        scores.formatting = this._scoreFormatting(resumeText);

        // 3. Keywords Score (0-100)
        scores.keywords = this._scoreKeywords(textLower, extractedSkills);

        // 4. Section Completeness (0-100)
        scores.section_completeness = this._scoreSections(textLower);

        // 5. Action Verbs Usage (0-100)
        scores.action_verbs = this._scoreActionVerbs(textLower);

        // 6. Length Appropriateness (0-100)
        scores.length = this._scoreLength(resumeText);

        // Calculate overall ATS score (weighted average)
        const overallScore =
            scores.contact_information * 0.2 +
            scores.formatting * 0.15 +
            scores.keywords * 0.25 +
            scores.section_completeness * 0.2 +
            scores.action_verbs * 0.1 +
            scores.length * 0.1;

        // Generate recommendations
        const recommendations = this._generateRecommendations(scores);

        return {
            success: true,
            overall_ats_score: Math.round(overallScore * 10) / 10,
            category_scores: scores,
            recommendations,
            ats_friendly: overallScore >= 70,
        };
    }

    static _scoreContactInfo(text) {
        let score = 0;
        const maxScore = 100;
        const pointsPerItem = maxScore / this.CONTACT_KEYWORDS.length;

        // Check for email
        if (/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text)) {
            score += pointsPerItem;
        }

        // Check for phone
        if (/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(text)) {
            score += pointsPerItem;
        }

        // Check for other keywords
        for (const keyword of ['linkedin', 'github', 'portfolio']) {
            if (text.includes(keyword)) {
                score += pointsPerItem;
            }
        }

        return Math.min(score, maxScore);
    }

    static _scoreFormatting(text) {
        let score = 100;

        // Penalize excessive special characters
        const specialChars = (text.match(/[^\w\s\.\,\@\-\+\#\(\)\/\:]/g) || []).length;
        if (specialChars > 50) {
            score -= 20;
        }

        // Check for reasonable line length
        const lines = text.split('\n');
        const avgLineLength = lines.reduce((sum, line) => sum + line.length, 0) / Math.max(lines.length, 1);
        if (avgLineLength > 200) {
            score -= 15;
        }

        // Reward consistent formatting
        if (lines.length > 10) {
            score += 10;
        }

        return Math.max(0, Math.min(score, 100));
    }

    static _scoreKeywords(text, extractedSkills) {
        const totalSkills = extractedSkills?.current_skills?.total_technical || 0;

        // More skills = better keyword score
        if (totalSkills >= 15) return 100;
        if (totalSkills >= 10) return 85;
        if (totalSkills >= 7) return 70;
        if (totalSkills >= 5) return 55;
        if (totalSkills >= 3) return 40;
        return 25;
    }

    static _scoreSections(text) {
        let score = 0;
        const pointsPerSection = 100 / this.SECTION_KEYWORDS.length;

        for (const section of this.SECTION_KEYWORDS) {
            if (text.includes(section)) {
                score += pointsPerSection;
            }
        }

        return Math.min(score, 100);
    }

    static _scoreActionVerbs(text) {
        const verbCount = this.ACTION_VERBS.filter((verb) => text.includes(verb)).length;

        // More action verbs = better score
        if (verbCount >= 10) return 100;
        if (verbCount >= 7) return 85;
        if (verbCount >= 5) return 70;
        if (verbCount >= 3) return 55;
        return 40;
    }

    static _scoreLength(text) {
        const wordCount = text.split(/\s+/).length;

        // Ideal: 400-800 words
        if (wordCount >= 400 && wordCount <= 800) return 100;
        if ((wordCount >= 300 && wordCount < 400) || (wordCount > 800 && wordCount <= 1000)) return 85;
        if ((wordCount >= 200 && wordCount < 300) || (wordCount > 1000 && wordCount <= 1200)) return 70;
        return 50;
    }

    static _generateRecommendations(scores) {
        const recommendations = [];

        if (scores.contact_information < 80) {
            recommendations.push('Add complete contact information including email, phone, and LinkedIn profile');
        }

        if (scores.keywords < 70) {
            recommendations.push('Include more relevant technical skills and industry keywords');
        }

        if (scores.section_completeness < 80) {
            recommendations.push('Ensure all standard sections are present: Experience, Education, Skills, Projects');
        }

        if (scores.action_verbs < 70) {
            recommendations.push("Use more action verbs to describe your accomplishments (e.g., 'achieved', 'developed', 'led')");
        }

        if (scores.formatting < 80) {
            recommendations.push('Simplify formatting - avoid excessive special characters and complex layouts');
        }

        if (scores.length < 70) {
            recommendations.push('Adjust resume length to 400-800 words for optimal ATS compatibility');
        }

        if (recommendations.length === 0) {
            recommendations.push('Your resume is well-optimized for ATS systems!');
        }

        return recommendations;
    }
}

export default ATSScorer;
