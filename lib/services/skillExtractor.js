/**
 * Skill Extraction Service
 * Extracts technical and soft skills from resume text
 */

class SkillExtractor {
    // Comprehensive skill databases
    static TECHNICAL_SKILLS = {
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
        tools: [
            'Git', 'GitHub', 'GitLab', 'Jira', 'Confluence', 'Slack', 'VS Code', 'IntelliJ',
            'Postman', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Tableau', 'Power BI',
        ],
        concepts: [
            'Machine Learning', 'Deep Learning', 'AI', 'Data Science', 'DevOps', 'Agile',
            'Scrum', 'REST API', 'GraphQL', 'Microservices', 'Blockchain', 'IoT',
            'Cybersecurity', 'Cloud Computing', 'Big Data', 'ETL', 'Data Warehousing',
        ],
    };

    static SOFT_SKILLS = [
        'Leadership', 'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking',
        'Time Management', 'Adaptability', 'Creativity', 'Collaboration', 'Analytical',
        'Project Management', 'Presentation', 'Negotiation', 'Conflict Resolution',
        'Decision Making', 'Strategic Planning', 'Mentoring', 'Customer Service',
    ];

    static extractSkills(resumeText) {
        const textLower = resumeText.toLowerCase();
        const foundSkills = {
            technical: {},
            soft: [],
            all_technical: [],
        };

        // Extract technical skills by category
        for (const [category, skills] of Object.entries(this.TECHNICAL_SKILLS)) {
            const foundInCategory = [];
            for (const skill of skills) {
                // Case-insensitive search with word boundaries
                const pattern = new RegExp(`\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
                if (pattern.test(textLower)) {
                    foundInCategory.push(skill);
                    foundSkills.all_technical.push(skill);
                }
            }

            if (foundInCategory.length > 0) {
                foundSkills.technical[category] = foundInCategory;
            }
        }

        // Extract soft skills
        for (const skill of this.SOFT_SKILLS) {
            const pattern = new RegExp(`\\b${skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            if (pattern.test(textLower)) {
                foundSkills.soft.push(skill);
            }
        }

        return foundSkills;
    }

    static suggestSkills(currentSkills, jobRole = 'Software Engineer') {
        // Role-based skill recommendations
        const roleSkills = {
            'Software Engineer': ['Docker', 'Kubernetes', 'AWS', 'React', 'Node.js', 'Python', 'Git', 'REST API'],
            'Data Scientist': ['Python', 'R', 'TensorFlow', 'PyTorch', 'SQL', 'Tableau', 'Machine Learning', 'Statistics'],
            'Frontend Developer': ['React', 'Vue', 'Angular', 'TypeScript', 'CSS', 'HTML', 'Webpack', 'Figma'],
            'Backend Developer': ['Node.js', 'Python', 'Java', 'SQL', 'MongoDB', 'Redis', 'Docker', 'Microservices'],
            'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform', 'Linux', 'CI/CD', 'Monitoring'],
            'Full Stack Developer': ['React', 'Node.js', 'Python', 'SQL', 'MongoDB', 'AWS', 'Git', 'Docker'],
        };

        const recommended = roleSkills[jobRole] || roleSkills['Software Engineer'];
        const currentLower = currentSkills.map((s) => s.toLowerCase());

        // Suggest skills not already present
        const suggestions = recommended.filter((skill) => !currentLower.includes(skill.toLowerCase()));

        return suggestions.slice(0, 8); // Return top 8 suggestions
    }

    static analyzeSkills(resumeText) {
        const extracted = this.extractSkills(resumeText);

        // Determine likely job role based on skills
        const allSkills = extracted.all_technical;
        let jobRole = 'Software Engineer'; // Default

        if (allSkills.some((skill) => ['TensorFlow', 'PyTorch', 'Machine Learning', 'Data Science'].includes(skill))) {
            jobRole = 'Data Scientist';
        } else if (allSkills.some((skill) => ['Docker', 'Kubernetes', 'Jenkins', 'Terraform'].includes(skill))) {
            jobRole = 'DevOps Engineer';
        } else if (allSkills.some((skill) => ['React', 'Vue', 'Angular'].includes(skill)) && !resumeText.includes('Backend')) {
            jobRole = 'Frontend Developer';
        }

        const suggestions = this.suggestSkills(allSkills, jobRole);

        return {
            success: true,
            current_skills: {
                technical: extracted.technical,
                soft: extracted.soft,
                total_technical: extracted.all_technical.length,
                total_soft: extracted.soft.length,
            },
            suggested_skills: suggestions,
            detected_role: jobRole,
            skill_gap_count: suggestions.length,
        };
    }
}

export default SkillExtractor;
