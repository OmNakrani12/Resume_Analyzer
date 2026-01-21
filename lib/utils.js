// Utility functions for the Resume Analyzer app

export const validateFile = (file) => {
  const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
  const validExtensions = ['.pdf', '.doc', '.docx', '.txt']
  
  const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`
  
  if (!validExtensions.includes(fileExtension)) {
    return {
      valid: false,
      error: 'Please upload a valid resume file (PDF, DOC, DOCX, or TXT)'
    }
  }
  
  const maxSize = 5 * 1024 * 1024 // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size must be less than 5MB'
    }
  }
  
  return { valid: true }
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

export const formatDate = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  return 'text-red-600'
}

export const getScoreBgColor = (score) => {
  if (score >= 80) return 'bg-green-100'
  if (score >= 60) return 'bg-yellow-100'
  return 'bg-red-100'
}

export const handleApiError = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return 'An error occurred. Please try again.'
}

export const debounce = (func, delay) => {
  let timeoutId
  
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export const generateMockAnalysis = () => {
  return {
    score: Math.floor(Math.random() * 40) + 60,
    summary: 'Your resume has good structure and content with opportunities for improvement',
    strengths: [
      'Clear format and organization',
      'Relevant work experience',
      'Good use of keywords',
    ],
    improvements: [
      'Add more quantifiable achievements',
      'Improve action verbs in bullet points',
      'Add metrics and results to every achievement',
      'Include more specific technologies used',
    ],
    skills: {
      current: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Tailwind CSS'],
      suggested: ['GraphQL', 'Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    },
  }
}

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export const capitalizeString = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  const errors = []
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}
