/**
 * Skill Extraction Service
 * Extracts technical, professional, and soft skills from resume text
 * Supports all career types: IT, Business, Finance, Marketing, Healthcare, Creative, etc.
 */

import Groq from 'groq-sdk'

class SkillExtractor {
    // Comprehensive skill databases for ALL professions
    static TECHNICAL_SKILLS = {
        // IT & Programming
        languages: [
            'Python', 'JavaScript', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
            'Go', 'Rust', 'TypeScript', 'Scala', 'R', 'MATLAB', 'Perl', 'Dart', 'SQL',
            'HTML', 'CSS', 'Shell', 'Bash', 'PowerShell',
        ],
        frameworks: [
            'React', 'Angular', 'Vue', 'Next.js', 'Node.js', 'Express', 'Django', 'Flask',
            'FastAPI', 'Spring', 'Laravel', 'Rails', 'ASP.NET', 'Flutter', 'React Native',
            'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy',
        ],
        databases: [
            'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Oracle', 'SQL Server', 'SQLite',
            'Cassandra', 'DynamoDB', 'Firebase', 'Elasticsearch', 'Neo4j', 'MariaDB',
        ],
        cloud: [
            'AWS', 'Azure', 'Google Cloud', 'GCP', 'Heroku', 'DigitalOcean', 'Vercel',
            'Netlify', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Terraform',
        ],
        dev_tools: [
            'Git', 'GitHub', 'GitLab', 'Jira', 'Confluence', 'Slack', 'VS Code', 'IntelliJ',
            'Postman', 'Figma', 'Adobe XD', 'Tableau', 'Power BI',
        ],
        it_concepts: [
            'Machine Learning', 'Deep Learning', 'AI', 'Data Science', 'DevOps', 'Agile',
            'Scrum', 'REST API', 'GraphQL', 'Microservices', 'Blockchain', 'IoT',
            'Cybersecurity', 'Cloud Computing', 'Big Data', 'ETL', 'Data Warehousing',
        ],
    };

    // Professional & Business Skills
    static PROFESSIONAL_SKILLS = {
        business: [
            'Business Analysis', 'Strategic Planning', 'Business Development', 'Market Research',
            'Product Management', 'Operations Management', 'Supply Chain', 'Logistics',
            'Business Intelligence', 'Competitive Analysis', 'Market Analysis',
        ],
        finance: [
            'Financial Analysis', 'Accounting', 'Auditing', 'Tax Planning', 'Budgeting',
            'Financial Modeling', 'Investment Analysis', 'Risk Management', 'Valuation',
            'Cost Analysis', 'Financial Reporting', 'Forecasting', 'Excel', 'SAP', 'QuickBooks',
        ],
        marketing: [
            'Digital Marketing', 'Social Media Marketing', 'Content Marketing', 'SEO', 'SEM',
            'Email Marketing', 'Brand Management', 'Market Segmentation', 'Marketing Analytics',
            'Campaign Management', 'Public Relations', 'Customer Acquisition', 'Advertising',
        ],
        sales: [
            'Sales Management', 'Client Relations', 'Account Management', 'Lead Generation',
            'Negotiation', 'Sales Strategy', 'Customer Retention', 'Territory Management',
            'Relationship Building', 'Closing Sales',
        ],
        hr: [
            'Recruitment', 'Talent Acquisition', 'Employee Relations', 'HR Strategy',
            'Compensation & Benefits', 'Performance Management', 'Training & Development',
            'Organizational Development', 'HRIS', 'Payroll', 'Labor Relations',
        ],
        legal: [
            'Contract Management', 'Legal Compliance', 'Regulatory Affairs', 'Litigation',
            'IP Law', 'Corporate Law', 'Employment Law', 'Due Diligence', 'Legal Research',
            'Document Review',
        ],
    };

    // Creative & Design Skills
    static CREATIVE_SKILLS = {
        design: [
            'Graphic Design', 'UI Design', 'UX Design', 'Product Design', 'Web Design',
            'Mobile Design', 'Branding', 'Logo Design', 'Typography', 'Color Theory',
            'Layout Design', 'Wireframing', 'Prototyping',
        ],
        creative_tools: [
            'Adobe Photoshop', 'Adobe Illustrator', 'Adobe XD', 'Figma', 'Sketch',
            'InVision', 'Framer', 'Adobe Creative Suite', 'Canva', 'CorelDRAW',
        ],
        media: [
            'Video Production', 'Video Editing', 'Animation', 'Motion Graphics',
            'Photography', 'Audio Production', 'Cinematography', 'Directing',
            'Sound Design', 'Visual Effects',
        ],
        writing: [
            'Copywriting', 'Technical Writing', 'Content Writing', 'Journalism',
            'Blogging', 'Creative Writing', 'Scriptwriting', 'Grant Writing',
        ],
    };

    // Healthcare & Science Skills
    static HEALTHCARE_SKILLS = {
        clinical: [
            'Clinical Assessment', 'Patient Care', 'Diagnosis', 'Treatment Planning',
            'Nursing', 'Pharmacy', 'Medical Imaging', 'Surgery', 'Emergency Care',
        ],
        healthcare_tech: [
            'EHR', 'EMR', 'Medical Records', 'HIPAA', 'Healthcare IT', 'Telemedicine',
            'Medical Coding', 'Billing', 'Healthcare Analytics',
        ],
        research: [
            'Medical Research', 'Clinical Trials', 'Data Analysis', 'Statistical Analysis',
            'Lab Work', 'Research Design', 'Literature Review',
        ],
    };

    // Education & Training Skills
    static EDUCATION_SKILLS = {
        teaching: [
            'Curriculum Development', 'Lesson Planning', 'Teaching', 'Student Assessment',
            'Classroom Management', 'Educational Leadership', 'Instructional Design',
            'Online Teaching', 'Tutoring', 'Mentoring',
        ],
    };

    static SOFT_SKILLS = [
        'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
        'Time Management', 'Adaptability', 'Creativity', 'Collaboration', 'Analytical',
        'Project Management', 'Presentation', 'Negotiation', 'Conflict Resolution',
        'Decision Making', 'Strategic Planning', 'Mentoring', 'Customer Service',
        'Emotional Intelligence', 'Work Ethic', 'Initiative', 'Reliability',
    ];

    static extractSkills(resumeText) {
        const textLower = resumeText.toLowerCase();
        const foundSkills = {
            technical: {},
            professional: {},
            creative: {},
            healthcare: {},
            education: {},
            soft: [],
            all_skills: [],
        };

        // Extract all skill types
        this._extractCategorySkills(textLower, this.TECHNICAL_SKILLS, foundSkills.technical, foundSkills.all_skills);
        this._extractCategorySkills(textLower, this.PROFESSIONAL_SKILLS, foundSkills.professional, foundSkills.all_skills);
        this._extractCategorySkills(textLower, this.CREATIVE_SKILLS, foundSkills.creative, foundSkills.all_skills);
        this._extractCategorySkills(textLower, this.HEALTHCARE_SKILLS, foundSkills.healthcare, foundSkills.all_skills);
        this._extractCategorySkills(textLower, this.EDUCATION_SKILLS, foundSkills.education, foundSkills.all_skills);

        // Extract soft skills
        for (const skill of this.SOFT_SKILLS) {
            const pattern = new RegExp(`\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            if (pattern.test(textLower)) {
                foundSkills.soft.push(skill);
            }
        }

        return foundSkills;
    }

    static _extractCategorySkills(textLower, categoryObject, resultObject, allSkillsList) {
        for (const [category, skills] of Object.entries(categoryObject)) {
            const foundInCategory = [];
            for (const skill of skills) {
                const pattern = new RegExp(`\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                if (pattern.test(textLower)) {
                    foundInCategory.push(skill);
                    allSkillsList.push(skill);
                }
            }
            if (foundInCategory.length > 0) {
                resultObject[category] = foundInCategory;
            }
        }
    }

    static detectCareerPath(resumeText) {
        const textLower = resumeText.toLowerCase();

        // Check for specific career indicators
        const indicators = {
            'Data Scientist': ['machine learning', 'data science', 'tensorflow', 'pytorch', 'statistical analysis', 'deep learning'],
            'DevOps Engineer': ['docker', 'kubernetes', 'jenkins', 'ci/cd', 'infrastructure', 'deployment'],
            'Frontend Developer': ['react', 'vue', 'angular', 'ui design', 'ux', 'frontend', 'web design'],
            'Backend Developer': ['node.js', 'python', 'java', 'api', 'database', 'backend'],
            'Full Stack Developer': ['react', 'node.js', 'full stack', 'frontend', 'backend'],
            'Product Manager': ['product management', 'roadmap', 'stakeholder', 'product strategy', 'requirements'],
            'Business Analyst': ['business analysis', 'requirements gathering', 'process improvement', 'ba'],
            'Financial Analyst': ['financial analysis', 'excel', 'financial modeling', 'valuation', 'accounting'],
            'Marketing Manager': ['marketing', 'brand', 'campaign', 'digital marketing', 'seo', 'social media'],
            'Sales Executive': ['sales', 'client relations', 'account management', 'business development'],
            'HR Manager': ['recruitment', 'talent acquisition', 'human resources', 'employee relations'],
            'UX/UI Designer': ['ui design', 'ux design', 'figma', 'adobe xd', 'wireframing', 'prototyping'],
            'Graphic Designer': ['graphic design', 'adobe', 'photoshop', 'illustrator', 'branding'],
            'Healthcare Professional': ['nursing', 'clinical', 'patient care', 'medical', 'healthcare'],
            'Teacher/Educator': ['teaching', 'curriculum', 'education', 'student', 'instructor'],
        };

        // Score each career path
        let bestMatch = 'Professional';
        let bestScore = 0;

        for (const [career, keywords] of Object.entries(indicators)) {
            const score = keywords.filter((kw) => textLower.includes(kw.toLowerCase())).length;
            if (score > bestScore) {
                bestScore = score;
                bestMatch = career;
            }
        }

        return bestMatch;
    }

    static suggestSkills(currentSkills, careerPath) {
        // Get all available skills for different career paths
        const pathSkills = {
            'Data Scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Tableau', 'Machine Learning', 'Statistical Analysis'],
            'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform', 'Linux', 'CI/CD', 'Monitoring'],
            'Frontend Developer': ['React', 'Vue', 'Angular', 'TypeScript', 'CSS', 'Figma', 'Responsive Design', 'JavaScript'],
            'Backend Developer': ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'REST API', 'Microservices', 'Authentication'],
            'Full Stack Developer': ['React', 'Node.js', 'Python', 'SQL', 'MongoDB', 'AWS', 'Git', 'Docker'],
            'Product Manager': ['Product Strategy', 'Data Analysis', 'User Research', 'Roadmap Planning', 'Stakeholder Management'],
            'Business Analyst': ['Business Analysis', 'Data Analysis', 'Process Improvement', 'SQL', 'Excel', 'Requirements Gathering'],
            'Financial Analyst': ['Financial Modeling', 'Excel', 'SQL', 'Tableau', 'Accounting', 'Risk Analysis', 'Valuation'],
            'Marketing Manager': ['Digital Marketing', 'Analytics', 'SEO', 'Content Strategy', 'Social Media', 'Campaign Management'],
            'Sales Executive': ['Negotiation', 'CRM', 'Sales Strategy', 'Client Relations', 'Presentation Skills', 'Lead Generation'],
            'HR Manager': ['Recruitment', 'HRIS', 'Employee Relations', 'Training & Development', 'Compensation', 'Compliance'],
            'UX/UI Designer': ['Figma', 'Prototyping', 'User Research', 'Interaction Design', 'Adobe XD', 'Wireframing'],
            'Graphic Designer': ['Adobe Creative Suite', 'Branding', 'Typography', 'Color Theory', 'Figma', 'Web Design'],
            'Healthcare Professional': ['Patient Care', 'Clinical Skills', 'EHR Systems', 'Patient Communication', 'Medical Knowledge'],
            'Teacher/Educator': ['Curriculum Development', 'Educational Technology', 'Assessment', 'Online Teaching', 'Student Engagement'],
            'Professional': ['Communication', 'Leadership', 'Project Management', 'Problem Solving', 'Data Analysis'],
        };

        const recommended = pathSkills[careerPath] || pathSkills['Professional'];
        const currentLower = currentSkills.map((s) => s.toLowerCase());

        const suggestions = recommended.filter((skill) => !currentLower.includes(skill.toLowerCase()));
        return suggestions.slice(0, 8);
    }

    static async analyzeSkills(resumeText) {
        const apiKey = process.env.GROQ_API_KEY;
        
        if (apiKey) {
            try {
                return await this.analyzeSkillsWithAI(resumeText, apiKey);
            } catch (error) {
                console.error('❌ AI Skill Analysis failed, falling back to static:', error);
            }
        }

        // Fallback to static analysis
        return this.analyzeSkillsStatic(resumeText);
    }

    static analyzeSkillsStatic(resumeText) {
        const extracted = this.extractSkills(resumeText);
        const careerPath = this.detectCareerPath(resumeText);

        // Map categories to match UI/AI structure
        const technical = {
            languages: extracted.technical.languages || [],
            frameworks: extracted.technical.frameworks || [],
            databases: extracted.technical.databases || [],
            cloud: extracted.technical.cloud || [],
            tools: extracted.technical.dev_tools || [],
            concepts: extracted.technical.it_concepts || [],
        };

        // Calculate total technical skills
        let totalTechnical = 0;
        Object.values(technical).forEach(skills => {
            totalTechnical += skills.length;
        });

        const allFoundSkills = [
            ...extracted.all_skills,
            ...extracted.soft,
        ];

        const suggestions = this.suggestSkills(allFoundSkills, careerPath);

        return {
            success: true,
            current_skills: {
                technical,
                professional: extracted.professional,
                creative: extracted.creative,
                healthcare: extracted.healthcare,
                education: extracted.education,
                soft: extracted.soft,
                total_technical: totalTechnical,
            },
            suggested_skills: suggestions,
            detected_role: careerPath,
            skill_gap_count: suggestions.length,
        };
    }

    static async analyzeSkillsWithAI(resumeText, apiKey) {
        const groq = new Groq({ apiKey });

        const prompt = `
You are an expert career consultant and ATS specialist. 
Analyze the following resume text and provide a structured skill analysis.

RESUME TEXT:
${resumeText}

TASK:
1. Detect the most accurate career role/path (e.g., "Mechanical Engineer", "Digital Marketer", "Civil Engineer", "Software Developer").
2. Extract all current skills and categorize them.
3. Suggest 8-10 highly relevant skills that are missing but essential for the detected role.

OUTPUT FORMAT (JSON ONLY):
{
  "detected_role": "Specific Role Name",
  "current_skills": {
    "technical": {
      "languages": [],
      "frameworks": [],
      "databases": [],
      "cloud": [],
      "tools": [],
      "concepts": []
    },
    "soft": [],
    "professional": []
  },
  "suggested_skills": ["Skill 1", "Skill 2", ...],
  "skill_gap_count": 0
}

Note: If a skill doesn't fit technical categories, put it in 'professional'. 
Return ONLY valid JSON. No explanations.
`;

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.3,
            max_tokens: 2000,
        });

        const rawText = completion.choices[0]?.message?.content || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error('No JSON found in Groq response');
        }

        const aiResult = JSON.parse(jsonMatch[0]);

        // Calculate total technical skills for the UI
        let totalTechnical = 0;
        if (aiResult.current_skills.technical) {
            Object.values(aiResult.current_skills.technical).forEach(skills => {
                if (Array.isArray(skills)) totalTechnical += skills.length;
            });
        }

        return {
            success: true,
            current_skills: {
                ...aiResult.current_skills,
                total_technical: totalTechnical,
                // Add empty categories for safety
                creative: aiResult.current_skills.creative || {},
                healthcare: aiResult.current_skills.healthcare || {},
                education: aiResult.current_skills.education || {},
            },
            suggested_skills: aiResult.suggested_skills,
            detected_role: aiResult.detected_role,
            skill_gap_count: aiResult.suggested_skills.length,
        };
    }
}

export default SkillExtractor;
