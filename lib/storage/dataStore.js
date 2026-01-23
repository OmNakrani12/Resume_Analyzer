class DataStore {
    constructor() {
        this.resumes = new Map();
        this.analysisHistory = new Map();
        this.users = new Map();
        this.userPreferences = new Map();
    }

    // Resume operations
    saveResume(resumeData) {
        this.resumes.set(resumeData.id, resumeData);
        return resumeData;
    }

    getResume(resumeId) {
        return this.resumes.get(resumeId);
    }

    getUserResumes(userId) {
        return Array.from(this.resumes.values()).filter(
            (resume) => resume.userId === userId
        );
    }

    deleteResume(resumeId) {
        const deleted = this.resumes.delete(resumeId);
        this.analysisHistory.delete(resumeId);
        return deleted;
    }

    updateResume(resumeId, updates) {
        const resume = this.resumes.get(resumeId);
        if (!resume) return null;

        const updated = { ...resume, ...updates, updatedAt: new Date().toISOString() };
        this.resumes.set(resumeId, updated);
        return updated;
    }

    // Analysis operations
    saveAnalysis(resumeId, analysisData) {
        this.analysisHistory.set(resumeId, {
            resumeId,
            ...analysisData,
            analyzedAt: new Date().toISOString(),
        });
        return this.analysisHistory.get(resumeId);
    }

    getAnalysis(resumeId) {
        return this.analysisHistory.get(resumeId);
    }

    // User operations
    getUser(userId) {
        return this.users.get(userId) || this._getDefaultUser(userId);
    }

    saveUser(userId, userData) {
        this.users.set(userId, {
            id: userId,
            ...userData,
            updatedAt: new Date().toISOString(),
        });
        return this.users.get(userId);
    }

    _getDefaultUser(userId) {
        return {
            id: userId,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+1 (555) 123-4567',
            location: 'San Francisco, CA',
            bio: 'Software Engineer passionate about career growth',
            jobTitle: 'Software Engineer',
            createdAt: new Date().toISOString(),
        };
    }

    // Preferences operations
    getPreferences(userId) {
        return this.userPreferences.get(userId) || this._getDefaultPreferences();
    }

    savePreferences(userId, preferences) {
        this.userPreferences.set(userId, preferences);
        return preferences;
    }

    _getDefaultPreferences() {
        return {
            emailNotifications: true,
            weeklyDigest: true,
            jobAlerts: false,
            theme: 'light',
            language: 'en',
        };
    }

    // Statistics
    getUserStats(userId) {
        const userResumes = this.getUserResumes(userId);

        if (userResumes.length === 0) {
            return {
                totalResumes: 0,
                averageScore: 0,
                lastAnalyzed: null,
                improvementRate: 0,
                skillsLearned: 0,
                roadmapsCompleted: 0,
            };
        }

        const totalScore = userResumes.reduce((sum, r) => sum + (r.overallScore || 0), 0);
        const averageScore = totalScore / userResumes.length;

        const sortedResumes = [...userResumes].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        return {
            totalResumes: userResumes.length,
            averageScore: Math.round(averageScore * 10) / 10,
            lastAnalyzed: sortedResumes[0]?.createdAt || null,
            improvementRate: 12.5, // Placeholder calculation
            skillsLearned: 8, // Placeholder
            roadmapsCompleted: 2, // Placeholder
        };
    }
}

// Create singleton instance
const dataStore = new DataStore();

export default dataStore;
