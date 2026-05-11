/**
 * Learning Roadmap Generator using Groq AI
 * Creates personalized skill development roadmaps powered by AI
 * Supports all career types: IT, Business, Finance, Marketing, Healthcare, Creative, etc.
 */

import Groq from 'groq-sdk'

class RoadmapGenerator {
    constructor() {
        const apiKey = process.env.GROQ_API_KEY
        if (!apiKey) {
            throw new Error('GROQ_API_KEY not found')
        }
        this.groq = new Groq({ apiKey })
    }

    // Fallback static resources for all professions
    static SKILL_RESOURCES = {
        // IT & Technology Skills
        Python: {
            time: '3-4 months',
            priority: 'High',
            resources: [
                { name: 'Python.org Official Tutorial', type: 'Documentation', url: 'https://docs.python.org/3/tutorial/' },
                { name: 'Python for Everybody (Coursera)', type: 'Course', url: 'https://www.coursera.org/specializations/python' },
                { name: 'Automate the Boring Stuff', type: 'Book', url: 'https://automatetheboringstuff.com/' },
            ],
        },
        JavaScript: {
            time: '2-3 months',
            priority: 'High',
            resources: [
                { name: 'JavaScript.info', type: 'Tutorial', url: 'https://javascript.info/' },
                { name: 'freeCodeCamp JavaScript', type: 'Interactive', url: 'https://www.freecodecamp.org/' },
                { name: 'Eloquent JavaScript', type: 'Book', url: 'https://eloquentjavascript.net/' },
            ],
        },
        React: {
            time: '2-3 months',
            priority: 'High',
            resources: [
                { name: 'React Official Docs', type: 'Documentation', url: 'https://react.dev/' },
                { name: 'React - The Complete Guide (Udemy)', type: 'Course', url: 'https://www.udemy.com/course/react-the-complete-guide/' },
                { name: 'Scrimba React Course', type: 'Interactive', url: 'https://scrimba.com/learn/learnreact' },
            ],
        },
        'Node.js': {
            time: '2-3 months',
            priority: 'High',
            resources: [
                { name: 'Node.js Official Docs', type: 'Documentation', url: 'https://nodejs.org/docs/' },
                { name: 'The Complete Node.js Developer Course', type: 'Course', url: 'https://www.udemy.com/course/the-complete-nodejs-developer-course-2/' },
                { name: 'NodeSchool', type: 'Interactive', url: 'https://nodeschool.io/' },
            ],
        },
        Docker: {
            time: '1-2 months',
            priority: 'Medium',
            resources: [
                { name: 'Docker Official Docs', type: 'Documentation', url: 'https://docs.docker.com/' },
                { name: 'Docker Mastery (Udemy)', type: 'Course', url: 'https://www.udemy.com/course/docker-mastery/' },
                { name: 'Play with Docker', type: 'Interactive', url: 'https://labs.play-with-docker.com/' },
            ],
        },
        AWS: {
            time: '3-4 months',
            priority: 'High',
            resources: [
                { name: 'AWS Training', type: 'Course', url: 'https://aws.amazon.com/training/' },
                { name: 'AWS Certified Solutions Architect', type: 'Certification', url: 'https://aws.amazon.com/certification/' },
                { name: 'A Cloud Guru', type: 'Platform', url: 'https://acloudguru.com/' },
            ],
        },
        'Machine Learning': {
            time: '4-6 months',
            priority: 'High',
            resources: [
                { name: 'Machine Learning by Andrew Ng', type: 'Course', url: 'https://www.coursera.org/learn/machine-learning' },
                { name: 'Fast.ai Practical Deep Learning', type: 'Course', url: 'https://www.fast.ai/' },
                { name: 'Hands-On Machine Learning', type: 'Book', url: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/' },
            ],
        },
        // Business & Finance Skills
        'Financial Analysis': {
            time: '2-3 months',
            priority: 'High',
            resources: [
                { name: 'Corporate Finance Fundamentals (Coursera)', type: 'Course', url: 'https://www.coursera.org/learn/corporate-finance-fundamentals' },
                { name: 'Excel for Finance Professionals', type: 'Course', url: 'https://www.udemy.com/course/finance-excel' },
                { name: 'Principles of Finance', type: 'Book', url: 'https://www.investopedia.com/' },
            ],
        },
        'Business Analysis': {
            time: '2-3 months',
            priority: 'High',
            resources: [
                { name: 'Business Analysis Fundamentals', type: 'Course', url: 'https://www.udemy.com/course/business-analysis' },
                { name: 'IIBA BABOK Guide', type: 'Certification', url: 'https://www.iiba.org/' },
                { name: 'Requirements Gathering', type: 'Course', url: 'https://www.coursera.org/learn/requirements' },
            ],
        },
        'Product Management': {
            time: '3-4 months',
            priority: 'High',
            resources: [
                { name: 'Reforge Product Management', type: 'Course', url: 'https://www.reforge.com/' },
                { name: 'Inspired by Marty Cagan', type: 'Book', url: 'https://www.svpg.com/inspired/' },
                { name: 'Lean Product Development', type: 'Course', url: 'https://www.udemy.com/course/product-development' },
            ],
        },
        // Marketing Skills
        'Digital Marketing': {
            time: '2-3 months',
            priority: 'High',
            resources: [
                { name: 'Google Digital Garage', type: 'Course', url: 'https://learndigital.withgoogle.com/' },
                { name: 'HubSpot Academy', type: 'Certification', url: 'https://academy.hubspot.com/' },
                { name: 'Digital Marketing Strategy', type: 'Course', url: 'https://www.coursera.org/learn/digital-marketing' },
            ],
        },
        'Content Marketing': {
            time: '2-3 months',
            priority: 'Medium',
            resources: [
                { name: 'Content Marketing Institute', type: 'Course', url: 'https://contentmarketinginstitute.com/' },
                { name: 'Copywriting Mastery', type: 'Course', url: 'https://www.udemy.com/course/copywriting' },
                { name: 'SEO Fundamentals', type: 'Course', url: 'https://moz.com/guides/seo' },
            ],
        },
        // Creative Skills
        'Graphic Design': {
            time: '3-4 months',
            priority: 'High',
            resources: [
                { name: 'Graphic Design Bootcamp (Udemy)', type: 'Course', url: 'https://www.udemy.com/course/graphic-design' },
                { name: 'Adobe Creative Cloud Tutorials', type: 'Tutorial', url: 'https://www.adobe.com/creativecloud' },
                { name: 'Dribbble Design Community', type: 'Platform', url: 'https://dribbble.com/' },
            ],
        },
        'UX Design': {
            time: '3-4 months',
            priority: 'High',
            resources: [
                { name: 'Nielsen Norman UX Course', type: 'Course', url: 'https://www.nngroup.com/' },
                { name: 'Interaction Design Foundation', type: 'Course', url: 'https://www.interaction-design.org/' },
                { name: 'Don Norman UX Principles', type: 'Book', url: 'https://www.nngroup.com/books/' },
            ],
        },
        // Sales & HR Skills
        'Sales Strategy': {
            time: '2-3 months',
            priority: 'High',
            resources: [
                { name: 'Salesforce Training', type: 'Course', url: 'https://www.salesforce.com/training/' },
                { name: 'Advanced Sales Techniques', type: 'Course', url: 'https://www.udemy.com/course/sales' },
                { name: 'Negotiation Mastery', type: 'Course', url: 'https://www.coursera.org/learn/negotiation' },
            ],
        },
        'Recruitment': {
            time: '2-3 months',
            priority: 'High',
            resources: [
                { name: 'HR Recruitment Fundamentals', type: 'Course', url: 'https://www.linkedin.com/learning/recruitment' },
                { name: 'Talent Acquisition Strategy', type: 'Course', url: 'https://www.udemy.com/course/recruitment' },
                { name: 'SHRM HR Certification', type: 'Certification', url: 'https://www.shrm.org/' },
            ],
        },
    };

    async generateRoadmap(suggestedSkills, detectedRole) {
        try {
            // Use AI to generate personalized roadmap
            return await this.generateAIRoadmap(suggestedSkills, detectedRole)
        } catch (error) {
            console.error('❌ AI roadmap generation failed:', error)
            // Fallback to static generation if AI fails
            return this.generateStaticRoadmap(suggestedSkills, detectedRole)
        }
    }

    async generateAIRoadmap(suggestedSkills, detectedRole) {
        const skillsList = suggestedSkills.slice(0, 8).join(', ')

        const prompt = `You are an expert career development advisor specializing in creating comprehensive learning roadmaps for professionals at all levels.

Career Target: ${detectedRole}
Skills to develop: ${skillsList}

Create a comprehensive, personalized learning roadmap for someone aiming to be a ${detectedRole}.

Return ONLY valid JSON (no markdown, no explanations, no extra text):
{
  "roadmap": [
    {
      "skill": "skill name",
      "description": "why this skill is important for ${detectedRole} and how it impacts career growth",
      "estimated_time": "X-Y months",
      "priority": "High|Medium|Low",
      "learning_path": "step by step learning approach, realistic and practical",
      "resources": [
        {"name": "resource name", "type": "Course|Book|Documentation|Project|Certification|Platform", "url": "https://..."},
        {"name": "resource name", "type": "Course|Book|Documentation|Project|Certification|Platform", "url": "https://..."}
      ],
      "milestones": ["milestone 1", "milestone 2", "milestone 3"],
      "practical_project": "A real-world project to practice this skill in ${detectedRole} context"
    }
  ],
  "total_estimated_time": "X months",
  "career_impact": "How these skills will impact ${detectedRole} career progression, salary expectations, and opportunities",
  "learning_tips": "Practical advice for balancing learning with work and staying motivated"
}

Important guidelines:
- Make resources relevant to both entry-level and experienced professionals
- Include mix of free resources (Coursera, YouTube, documentation) and paid options (Udemy, specialized platforms)
- Ensure learning paths are realistic based on prior experience
- Focus on skills that directly impact job market value and salary
- Include both technical and soft skills when relevant
- Make milestones specific and measurable
- Practical projects should be portfolio-worthy
- Adapt content to the specific career field (not all tech)`

        try {
            const completion = await this.groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.5,
                max_tokens: 3500,
            })

            const rawText = completion.choices[0]?.message?.content || ''
            const jsonMatch = rawText.match(/\{[\s\S]*\}/)

            if (!jsonMatch) {
                throw new Error('No JSON found in response')
            }

            const aiData = JSON.parse(jsonMatch[0])

            // Create phases from the roadmap
            const phases = this._createPhasesFromAI(aiData.roadmap)

            return {
                success: true,
                roadmap: aiData.roadmap,
                phases,
                total_estimated_time: aiData.total_estimated_time,
                role: detectedRole,
                career_impact: aiData.career_impact,
                learning_tips: aiData.learning_tips,
                source: 'ai-generated',
            }
        } catch (error) {
            console.error('Groq AI roadmap error:', error)
            throw error
        }
    }

    generateStaticRoadmap(suggestedSkills, detectedRole) {
        const roadmapItems = [];

        for (const skill of suggestedSkills.slice(0, 6)) {
            // Get resource info or create default
            const skillInfo = RoadmapGenerator.SKILL_RESOURCES[skill] || {
                time: '2-3 months',
                priority: 'Medium',
                resources: [
                    { name: `${skill} Official Documentation`, type: 'Documentation', url: '#' },
                    { name: `Learn ${skill} Online`, type: 'Course', url: '#' },
                    { name: `${skill} Certification`, type: 'Certification', url: '#' },
                ],
            };

            roadmapItems.push({
                skill,
                estimated_time: skillInfo.time,
                priority: skillInfo.priority,
                resources: skillInfo.resources,
                description: `Master ${skill} to advance in your ${detectedRole} career path`,
                learning_path: `Start with fundamentals through official resources and documentation, then build practical projects to gain real-world experience in ${skill}.`,
                milestones: ['Learn fundamentals', 'Build a project', 'Master advanced concepts', 'Share your knowledge'],
                practical_project: `Create a portfolio project showcasing ${skill} expertise relevant to ${detectedRole} role`,
            });
        }

        // Sort by priority (High > Medium > Low)
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        roadmapItems.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

        // Create timeline phases
        const phases = this._createPhases(roadmapItems);

        return {
            success: true,
            roadmap: roadmapItems,
            phases,
            total_estimated_time: '6-12 months',
            role: detectedRole,
            learning_tips: 'Dedicate 5-10 hours per week to learning, combine online courses with practical projects, and engage with the professional community.',
            source: 'static-fallback',
        };
    }

    _createPhasesFromAI(roadmapItems) {
        const phases = [];
        const highPriority = roadmapItems.filter((item) => item.priority === 'High');
        const mediumPriority = roadmapItems.filter((item) => item.priority === 'Medium');

        if (highPriority.length > 0) {
            phases.push({
                phase: 1,
                name: 'Foundation Building',
                duration: '0-3 months',
                skills: highPriority.slice(0, 2).map((item) => item.skill),
                focus: 'Master core skills essential for your role',
            });
        }

        const phase2Skills = [...highPriority.slice(2), ...mediumPriority.slice(0, 2)];
        if (phase2Skills.length > 0) {
            phases.push({
                phase: 2,
                name: 'Skill Expansion',
                duration: '3-6 months',
                skills: phase2Skills.map((item) => item.skill),
                focus: 'Expand your expertise with complementary skills',
            });
        }

        const remaining = roadmapItems.slice(4);
        if (remaining.length > 0) {
            phases.push({
                phase: 3,
                name: 'Advanced Mastery',
                duration: '6-12 months',
                skills: remaining.map((item) => item.skill),
                focus: 'Achieve advanced expertise and specialization',
            });
        }

        return phases;
    }

    _createPhases(roadmapItems) {
        const phases = [];

        // Phase 1: High priority skills (0-3 months)
        const highPriority = roadmapItems.filter((item) => item.priority === 'High');
        if (highPriority.length > 0) {
            phases.push({
                phase: 1,
                name: 'Foundation Building',
                duration: '0-3 months',
                skills: highPriority.slice(0, 2).map((item) => item.skill),
                focus: 'Master core technologies essential for your role',
            });
        }

        // Phase 2: Medium priority + remaining high (3-6 months)
        const mediumPriority = roadmapItems.filter((item) => item.priority === 'Medium');
        const phase2Skills = [...highPriority.slice(2), ...mediumPriority.slice(0, 2)];
        if (phase2Skills.length > 0) {
            phases.push({
                phase: 2,
                name: 'Skill Expansion',
                duration: '3-6 months',
                skills: phase2Skills.map((item) => item.skill),
                focus: 'Expand your technical toolkit with complementary skills',
            });
        }

        // Phase 3: Advanced skills (6-12 months)
        const remaining = roadmapItems.slice(4);
        if (remaining.length > 0) {
            phases.push({
                phase: 3,
                name: 'Advanced Mastery',
                duration: '6-12 months',
                skills: remaining.map((item) => item.skill),
                focus: 'Achieve expertise in specialized areas',
            });
        }

        return phases;
    }
}

// Create singleton instance
const roadmapGeneratorInstance = new RoadmapGenerator()

// Export both class and instance for compatibility
export default {
    generateRoadmap: (suggestedSkills, detectedRole) =>
        roadmapGeneratorInstance.generateRoadmap(suggestedSkills, detectedRole),
    generateStaticRoadmap: (suggestedSkills, detectedRole) =>
        new RoadmapGenerator().generateStaticRoadmap(suggestedSkills, detectedRole),
}
