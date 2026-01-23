/**
 * Job Matching Service
 * Matches resumes with job descriptions
 */

class JobMatcher {
    static calculateMatchScore(resumeSkills, jobRequirements) {
        if (!jobRequirements || jobRequirements.length === 0) {
            return 0.0;
        }

        const resumeSkillsLower = resumeSkills.map((s) => s.toLowerCase());
        const matched = jobRequirements.filter((req) => resumeSkillsLower.includes(req.toLowerCase())).length;

        return (matched / jobRequirements.length) * 100;
    }

    static extractJobRequirements(jobDescription) {
        // Common requirement keywords
        const requirementKeywords = [
            'required',
            'must have',
            'should have',
            'experience with',
            'proficient in',
            'knowledge of',
            'familiar with',
            'expertise in',
        ];

        const requirements = [];
        const lines = jobDescription.toLowerCase().split('\n');

        for (const line of lines) {
            if (requirementKeywords.some((keyword) => line.includes(keyword))) {
                // Extract skills from the line
                const words = line.match(/\b[a-z]{2,}\b/g) || [];
                requirements.push(...words);
            }
        }

        return [...new Set(requirements)];
    }

    static analyzeJobMatch(resumeText, resumeSkills, jobDescription) {
        // Extract job requirements
        const jobRequirements = this.extractJobRequirements(jobDescription);

        // Get all resume skills
        const allResumeSkills = [];
        if (resumeSkills?.current && resumeSkills.current.technical) {
            for (const categorySkills of Object.values(resumeSkills.current.technical)) {
                allResumeSkills.push(...categorySkills);
            }
        }

        // Calculate match score
        const matchScore = this.calculateMatchScore(allResumeSkills, jobRequirements);

        // Find matching skills
        const resumeSkillsLower = allResumeSkills.map((s) => s.toLowerCase());
        const matchingSkills = jobRequirements.filter((req) => resumeSkillsLower.includes(req.toLowerCase()));

        // Find missing skills
        const missingSkills = jobRequirements.filter((req) => !resumeSkillsLower.includes(req.toLowerCase()));

        // Generate recommendations
        const recommendations = [];
        if (matchScore < 50) {
            recommendations.push('Consider adding more relevant skills to your resume');
            recommendations.push('Highlight projects that demonstrate required skills');
        } else if (matchScore < 75) {
            recommendations.push('Good match! Consider emphasizing matching skills more prominently');
            recommendations.push('Add specific examples of using required technologies');
        } else {
            recommendations.push('Excellent match! Your resume aligns well with this job');
            recommendations.push('Make sure to highlight your strongest matching skills');
        }

        if (missingSkills.length > 0) {
            recommendations.push(`Consider learning: ${missingSkills.slice(0, 5).join(', ')}`);
        }

        return {
            success: true,
            matchScore: Math.round(matchScore * 10) / 10,
            matchingSkills: matchingSkills.slice(0, 10),
            missingSkills: missingSkills.slice(0, 10),
            totalRequirements: jobRequirements.length,
            matchedRequirements: matchingSkills.length,
            recommendations,
            matchLevel: matchScore >= 75 ? 'Excellent' : matchScore >= 50 ? 'Good' : 'Fair',
        };
    }
}

export default JobMatcher;
