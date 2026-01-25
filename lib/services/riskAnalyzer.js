/**
 * Risk Analyzer Service
 * Analyzes resumes for potential fake or exaggerated information
 */

/**
 * Analyze resume text for risk indicators
 * @param {string} text - Extracted resume text
 * @param {Object} context - Additional context (skills, ats score, etc.)
 * @returns {Object} Risk analysis results
 */
export async function analyzeRisk(text, context = {}) {
    try {
        if (!text || typeof text !== 'string') {
            throw new Error('Invalid text provided for risk analysis');
        }

        const textLower = text.toLowerCase();
        const words = text.split(/\s+/);
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

        // Initialize scores
        let exaggerationScore = 0;
        let timelineScore = 0;
        let skillMatchScore = 0;
        let languageScore = 0;
        let formatScore = 0;
        const redFlags = [];

        // 1. EXAGGERATION ANALYSIS
        const superlatives = ['best', 'greatest', 'perfect', 'exceptional', 'outstanding',
            'unparalleled', 'world-class', 'top', 'leading', 'premier',
            'ultimate', 'supreme', 'optimal', 'ideal', 'flawless'];

        let superlativeCount = 0;
        superlatives.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) superlativeCount += matches.length;
        });

        if (superlativeCount > 10) {
            exaggerationScore += 40;
            redFlags.push({
                category: 'Exaggerated Claims',
                severity: 'High',
                description: `Contains ${superlativeCount} superlatives - may indicate exaggeration`,
                impact: 40
            });
        } else if (superlativeCount > 5) {
            exaggerationScore += 20;
            redFlags.push({
                category: 'Exaggerated Claims',
                severity: 'Medium',
                description: `Contains ${superlativeCount} superlatives`,
                impact: 20
            });
        }

        // Check for vague quantifiers
        const vagueQuantifiers = ['many', 'several', 'numerous', 'various', 'multiple'];
        let vagueCount = 0;
        vagueQuantifiers.forEach(word => {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            const matches = text.match(regex);
            if (matches) vagueCount += matches.length;
        });

        if (vagueCount > 8) {
            exaggerationScore += 20;
            redFlags.push({
                category: 'Exaggerated Claims',
                severity: 'Medium',
                description: 'Excessive use of vague quantifiers instead of specific numbers',
                impact: 20
            });
        }

        // 2. TIMELINE ANALYSIS
        // Extract years from text
        const yearPattern = /\b(19|20)\d{2}\b/g;
        const years = text.match(yearPattern) || [];
        const uniqueYears = [...new Set(years)].map(y => parseInt(y)).sort();

        if (uniqueYears.length > 0) {
            const careerSpan = uniqueYears[uniqueYears.length - 1] - uniqueYears[0];

            // Check for unrealistic experience claims
            const experiencePattern = /(\d+)\+?\s*years?\s+(?:of\s+)?experience/gi;
            const expMatches = text.match(experiencePattern);

            if (expMatches) {
                expMatches.forEach(match => {
                    const claimedYears = parseInt(match.match(/\d+/)[0]);
                    if (claimedYears > careerSpan + 2) {
                        timelineScore += 30;
                        redFlags.push({
                            category: 'Timeline Inconsistency',
                            severity: 'High',
                            description: `Claims ${claimedYears} years experience but timeline shows ${careerSpan} years`,
                            impact: 30
                        });
                    }
                });
            }
        }

        // Check for employment gaps (simplified - looks for "gap" or "break" mentions)
        if (textLower.includes('gap') || textLower.includes('break') || textLower.includes('unemployed')) {
            // This is actually good - being honest about gaps
            timelineScore -= 10; // Reduce risk score
        }

        // 3. SKILL MISMATCH ANALYSIS
        const skills = context.skills?.current || [];
        const totalSkills = Array.isArray(skills) ? skills.length :
            (skills.technical ? Object.values(skills.technical).flat().length : 0);

        if (totalSkills > 30) {
            skillMatchScore += 30;
            redFlags.push({
                category: 'Skill Mismatch',
                severity: 'High',
                description: `Lists ${totalSkills} skills - may indicate keyword stuffing`,
                impact: 30
            });
        } else if (totalSkills > 20) {
            skillMatchScore += 15;
            redFlags.push({
                category: 'Skill Mismatch',
                severity: 'Medium',
                description: `Lists ${totalSkills} skills - unusually high number`,
                impact: 15
            });
        }

        // Check for buzzword overload
        const buzzwords = ['synergy', 'leverage', 'paradigm', 'disruptive', 'innovative',
            'cutting-edge', 'next-generation', 'revolutionary', 'game-changing'];
        let buzzwordCount = 0;
        buzzwords.forEach(word => {
            if (textLower.includes(word)) buzzwordCount++;
        });

        if (buzzwordCount > 5) {
            skillMatchScore += 20;
            redFlags.push({
                category: 'Skill Mismatch',
                severity: 'Medium',
                description: 'Excessive use of buzzwords without substance',
                impact: 20
            });
        }

        // 4. LANGUAGE PATTERN ANALYSIS
        // Check for generic statements
        const genericPhrases = ['responsible for', 'duties included', 'worked on', 'helped with'];
        let genericCount = 0;
        genericPhrases.forEach(phrase => {
            const regex = new RegExp(phrase, 'gi');
            const matches = text.match(regex);
            if (matches) genericCount += matches.length;
        });

        if (genericCount > 8) {
            languageScore += 25;
            redFlags.push({
                category: 'Language Patterns',
                severity: 'Medium',
                description: 'Excessive use of generic phrases - may lack specific achievements',
                impact: 25
            });
        }

        // Check for first-person pronouns (should be minimal in resumes)
        const firstPersonPattern = /\b(I|me|my|mine)\b/gi;
        const firstPersonMatches = text.match(firstPersonPattern) || [];

        if (firstPersonMatches.length > 20) {
            languageScore += 15;
            redFlags.push({
                category: 'Language Patterns',
                severity: 'Low',
                description: 'Excessive use of first-person pronouns',
                impact: 15
            });
        }

        // 5. FORMAT ANALYSIS
        // Check for contact information
        const hasEmail = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/.test(text);
        const hasPhone = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(text);

        if (!hasEmail) {
            formatScore += 20;
            redFlags.push({
                category: 'Format Issues',
                severity: 'Medium',
                description: 'Missing email address',
                impact: 20
            });
        }

        if (!hasPhone) {
            formatScore += 15;
            redFlags.push({
                category: 'Format Issues',
                severity: 'Low',
                description: 'Missing phone number',
                impact: 15
            });
        }

        // Check for unprofessional email patterns
        if (hasEmail) {
            const unprofessionalPatterns = ['sexy', 'hot', 'cool', 'baby', '69', '420', 'party'];
            const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
            if (emailMatch) {
                const email = emailMatch[0].toLowerCase();
                unprofessionalPatterns.forEach(pattern => {
                    if (email.includes(pattern)) {
                        formatScore += 25;
                        redFlags.push({
                            category: 'Format Issues',
                            severity: 'High',
                            description: 'Unprofessional email address',
                            impact: 25
                        });
                    }
                });
            }
        }

        // Calculate overall risk score (weighted average)
        const overallRiskScore = Math.min(100, Math.round(
            (exaggerationScore * 0.3) +
            (timelineScore * 0.25) +
            (skillMatchScore * 0.2) +
            (languageScore * 0.15) +
            (formatScore * 0.1)
        ));

        // Determine risk level
        let riskLevel = 'Low';
        if (overallRiskScore > 60) riskLevel = 'High';
        else if (overallRiskScore > 30) riskLevel = 'Medium';

        // Generate recommendations
        const recommendations = [];
        if (redFlags.some(f => f.category === 'Timeline Inconsistency')) {
            recommendations.push('Verify employment dates with previous employers or references');
        }
        if (redFlags.some(f => f.category === 'Exaggerated Claims')) {
            recommendations.push('Request specific examples and quantifiable achievements during interview');
        }
        if (redFlags.some(f => f.category === 'Skill Mismatch')) {
            recommendations.push('Conduct technical assessment to verify claimed skills');
            recommendations.push('Ask for portfolio or project examples');
        }
        if (redFlags.some(f => f.category === 'Format Issues')) {
            recommendations.push('Request updated resume with complete contact information');
        }
        if (overallRiskScore < 20) {
            recommendations.push('Resume appears authentic with minimal red flags');
        }

        return {
            overall_risk_score: overallRiskScore,
            risk_level: riskLevel,
            red_flags: redFlags.sort((a, b) => b.impact - a.impact), // Sort by impact
            recommendations,
            detailed_analysis: {
                exaggeration_score: Math.min(100, exaggerationScore),
                timeline_score: Math.min(100, timelineScore),
                skill_match_score: Math.min(100, skillMatchScore),
                language_score: Math.min(100, languageScore),
                format_score: Math.min(100, formatScore)
            },
            metadata: {
                total_words: words.length,
                total_sentences: sentences.length,
                superlative_count: superlativeCount,
                total_skills: totalSkills
            }
        };

    } catch (error) {
        console.error('Risk analysis error:', error);
        return {
            overall_risk_score: 0,
            risk_level: 'Unknown',
            red_flags: [],
            recommendations: ['Risk analysis could not be completed'],
            detailed_analysis: {
                exaggeration_score: 0,
                timeline_score: 0,
                skill_match_score: 0,
                language_score: 0,
                format_score: 0
            },
            error: error.message
        };
    }
}

export default analyzeRisk;
