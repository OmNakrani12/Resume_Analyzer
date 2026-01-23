# Next.js API Routes Documentation

Complete API reference for Resume Analyzer Next.js API routes.

## Base URL

```
http://localhost:3000/api
```

All routes proxy to Python backend at `http://localhost:3001`

---

## Endpoints

### 1. Analysis

#### POST `/api/analysis`

Analyze a resume file.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: `file` (PDF, DOC, DOCX, TXT)

**Response:**
```json
{
  "success": true,
  "data": {
    "ai_analysis": {...},
    "ats_score": {...},
    "skills": {...},
    "roadmap": {...}
  }
}
```

#### GET `/api/analysis/history`

Get analysis history for a user.

**Query Parameters:**
- `userId` (optional, default: 'default_user')
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

---

### 2. Users

#### GET `/api/users/profile`

Get user profile.

**Query Parameters:**
- `userId` (optional)

#### POST `/api/users/profile`

Update user profile.

**Request Body:**
```json
{
  "userId": "user123",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "San Francisco, CA",
  "bio": "...",
  "jobTitle": "Software Engineer"
}
```

---

### 3. Resumes

#### GET `/api/resumes`

List user's resumes.

**Query Parameters:**
- `userId` (required)
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

#### POST `/api/resumes`

Save analysis result.

**Request Body:**
```json
{
  "userId": "user123",
  "fileName": "resume.pdf",
  "fileSize": 125000,
  "overallScore": 85,
  "atsScore": 78.5,
  "aiAnalysis": {...},
  "skills": {...},
  "roadmap": {...}
}
```

#### DELETE `/api/resumes?id=resumeId`

Delete a resume.

---

### 4. Jobs

#### POST `/api/jobs/match`

Match resume with job description.

**Request Body:**
```json
{
  "resumeText": "...",
  "resumeSkills": {...},
  "jobDescription": "..."
}
```

**Response:**
```json
{
  "success": true,
  "matchScore": 78.5,
  "matchingSkills": [...],
  "missingSkills": [...],
  "recommendations": [...],
  "matchLevel": "Good"
}
```

#### GET `/api/jobs/suggestions`

Get job suggestions.

**Query Parameters:**
- `skills` (comma-separated)
- `role` (optional, default: 'Software Engineer')

---

### 5. Export

#### POST `/api/export?format=json&download=true`

Export analysis results.

**Query Parameters:**
- `format` - 'json' or 'markdown'
- `download` - 'true' or 'false'

**Request Body:** Analysis data

**Response:** File download or JSON response

#### GET `/api/export/summary?data={...}`

Get summary statistics.

---

### 6. Statistics

#### GET `/api/stats?userId=user123`

Get user statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalResumes": 5,
    "averageScore": 78.5,
    "lastAnalyzed": "...",
    "improvementRate": 12.5,
    "skillsLearned": 8,
    "roadmapsCompleted": 2
  }
}
```

#### POST `/api/stats/compare`

Compare two resumes.

**Request Body:**
```json
{
  "resumeId1": "abc123",
  "resumeId2": "def456"
}
```

---

### 7. Preferences

#### GET `/api/preferences?userId=user123`

Get user preferences.

#### POST `/api/preferences`

Update user preferences.

**Request Body:**
```json
{
  "userId": "user123",
  "emailNotifications": true,
  "weeklyDigest": true,
  "jobAlerts": false,
  "theme": "light",
  "language": "en"
}
```

---

## Usage Examples

### Frontend Integration

```javascript
// Analyze resume
const formData = new FormData();
formData.append('file', file);

const response = await fetch('/api/analysis', {
  method: 'POST',
  body: formData
});

const result = await response.json();
```

```javascript
// Get user profile
const response = await fetch('/api/users/profile?userId=user123');
const profile = await response.json();
```

```javascript
// Match with job
const response = await fetch('/api/jobs/match', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    resumeText: '...',
    resumeSkills: {...},
    jobDescription: '...'
  })
});

const matchResult = await response.json();
```

```javascript
// Export as Markdown
const response = await fetch('/api/export?format=markdown&download=true', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(analysisData)
});

const blob = await response.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'resume_analysis.md';
a.click();
```

---

## Error Handling

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

**Common Status Codes:**
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Notes

- All routes are server-side Next.js API routes
- They proxy requests to the Python backend
- Authentication can be added via middleware
- CORS is handled by the Python backend
- File uploads are forwarded directly to Python backend
