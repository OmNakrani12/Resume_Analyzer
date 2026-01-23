/**
 * Learning Roadmap Generator
 * Creates personalized skill development roadmaps
 */

class RoadmapGenerator {
    // Skill learning resources database
    static SKILL_RESOURCES = {
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
        Kubernetes: {
            time: '2-3 months',
            priority: 'Medium',
            resources: [
                { name: 'Kubernetes Official Docs', type: 'Documentation', url: 'https://kubernetes.io/docs/' },
                { name: 'Kubernetes for Developers (LFD259)', type: 'Course', url: 'https://training.linuxfoundation.org/' },
                { name: 'Certified Kubernetes Administrator (CKA)', type: 'Certification', url: 'https://www.cncf.io/certification/cka/' },
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
    };

    static generateRoadmap(suggestedSkills, detectedRole) {
        const roadmapItems = [];

        for (const skill of suggestedSkills.slice(0, 6)) {
            // Top 6 skills
            // Get resource info or create default
            const skillInfo = this.SKILL_RESOURCES[skill] || {
                time: '2-3 months',
                priority: 'Medium',
                resources: [
                    { name: `${skill} Official Documentation`, type: 'Documentation', url: '#' },
                    { name: `Learn ${skill} Online`, type: 'Course', url: '#' },
                ],
            };

            roadmapItems.push({
                skill,
                estimated_time: skillInfo.time,
                priority: skillInfo.priority,
                resources: skillInfo.resources,
                description: `Master ${skill} to enhance your ${detectedRole} capabilities`,
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
        };
    }

    static _createPhases(roadmapItems) {
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

export default RoadmapGenerator;
