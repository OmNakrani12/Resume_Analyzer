/**
 * Resume Risk Analyzer (Rule-based, Explainable)
 * No AI dependency
 * Safe for production & legal use
 */

export async function analyzeRisk(resumeText, context = {}) {
  const text = resumeText.toLowerCase()

  let totalRisk = 0
  const redFlags = []

  /* ================= 1. FAKE / EXAGGERATED SKILLS ================= */

  const advancedSkills = [
    'kubernetes',
    'blockchain',
    'machine learning',
    'deep learning',
    'aws',
    'docker',
    'system design',
    'microservices'
  ]

  const mentionedAdvancedSkills = advancedSkills.filter(skill =>
    text.includes(skill)
  )

  const hasProjects =
    text.includes('project') ||
    text.includes('experience') ||
    text.includes('worked')

  if (mentionedAdvancedSkills.length > 0 && !hasProjects) {
    const impact = Math.min(mentionedAdvancedSkills.length * 5, 20)
    totalRisk += impact

    redFlags.push({
      category: 'Skill Exaggeration',
      severity: impact >= 15 ? 'High' : 'Medium',
      description:
        'Advanced skills listed without supporting project or experience evidence',
      impact
    })
  }

  /* ================= 2. EXPERIENCE MISMATCH ================= */

  const yearsMatch = text.match(/\b(\d+)\+?\s+years?\b/)
  const years = yearsMatch ? parseInt(yearsMatch[1]) : 0

  const seniorTerms = /senior|lead|architect|principal/i.test(text)

  if (seniorTerms && years < 2) {
    totalRisk += 20

    redFlags.push({
      category: 'Experience Mismatch',
      severity: 'High',
      description:
        'Senior-level terminology used without sufficient years of experience',
      impact: 20
    })
  }

  /* ================= 3. BUZZWORD OVERUSE ================= */

  const buzzwords = [
    'expert',
    'guru',
    'rockstar',
    'ninja',
    'world-class',
    'mastered'
  ]

  let buzzwordCount = 0
  buzzwords.forEach(word => {
    if (text.includes(word)) buzzwordCount++
  })

  if (buzzwordCount >= 2) {
    const impact = Math.min(buzzwordCount * 4, 12)
    totalRisk += impact

    redFlags.push({
      category: 'Buzzword Overuse',
      severity: 'Medium',
      description:
        'Excessive self-promotional buzzwords without measurable outcomes',
      impact
    })
  }

  /* ================= 4. UNREALISTIC CLAIMS ================= */

  const unrealisticPatterns = [
    /100%\s+improvement/,
    /built\s+entire/i,
    /everything\s+from\s+scratch/,
    /all\s+technologies/
  ]

  const unrealisticDetected = unrealisticPatterns.some(p =>
    p.test(text)
  )

  if (unrealisticDetected) {
    totalRisk += 10

    redFlags.push({
      category: 'Unrealistic Claims',
      severity: 'Medium',
      description:
        'Claims appear exaggerated or lack realistic scope indicators',
      impact: 10
    })
  }

  /* ================= 5. MISSING VERIFIABLE LINKS ================= */

  const hasGithub = text.includes('github.com')
  const hasLinkedIn = text.includes('linkedin.com')

  if (!hasGithub && !hasLinkedIn) {
    totalRisk += 10

    redFlags.push({
      category: 'Missing Verification',
      severity: 'Low',
      description:
        'No GitHub or LinkedIn profile found for skill verification',
      impact: 10
    })
  }

  /* ================= FINAL NORMALIZATION ================= */

  totalRisk = Math.min(totalRisk, 100)

  const riskLevel =
    totalRisk >= 60 ? 'High' : totalRisk >= 30 ? 'Medium' : 'Low'

  return {
    overall_risk_score: totalRisk,
    risk_level: riskLevel,
    red_flags: redFlags,
    recommendations: generateRecommendations(redFlags),
    metadata: {
      detected_advanced_skills: mentionedAdvancedSkills.length,
      experience_years_detected: years,
      buzzword_count: buzzwordCount
    }
  }
}

/* ================= HELPERS ================= */

function generateRecommendations(flags) {
  if (!flags.length) {
    return ['Resume appears consistent with low risk indicators']
  }

  const recs = []

  flags.forEach(flag => {
    switch (flag.category) {
      case 'Skill Exaggeration':
        recs.push('Request project links or practical demonstrations')
        break
      case 'Experience Mismatch':
        recs.push('Clarify role scope and actual responsibilities')
        break
      case 'Buzzword Overuse':
        recs.push('Ask for quantified achievements during interview')
        break
      case 'Unrealistic Claims':
        recs.push('Verify claims with follow-up technical questions')
        break
      case 'Missing Verification':
        recs.push('Ask candidate to share professional profile links')
        break
    }
  })

  return [...new Set(recs)]
}
