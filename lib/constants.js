// Constants used throughout the application

export const APP_NAME = 'ResumeAI'
export const APP_DESCRIPTION = 'AI-powered resume analysis tool to improve your resume and get more interviews'

// API Configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
export const API_TIMEOUT = 30000 // 30 seconds

// File Upload Configuration
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_FILE_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
export const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt']

// Pagination
export const ITEMS_PER_PAGE = 10
export const DEFAULT_PAGE = 1

// Animation Durations (in seconds)
export const ANIMATION_DURATION = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.0,
}

// Color Scheme
export const COLORS = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#1F2937',
  ACCENT: '#10B981',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  INFO: '#3B82F6',
}

// Routes
export const ROUTES = {
  HOME: '/',
  ANALYZE: '/analyze',
  DASHBOARD: '/dashboard',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  PRICING: '/pricing',
  ABOUT: '/about',
  PROFILE: '/profile',
  FAQ: '/faq',
  CONTACT: '/contact',
}

// Pricing Plans
export const PRICING_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Free',
    features: [
      'Upload 1 resume per month',
      'Basic score analysis',
      'Skills suggestions',
      'Email support',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$9.99',
    period: 'per month',
    features: [
      'Unlimited resume uploads',
      'Advanced score analysis',
      'AI-powered suggestions',
      'Resume rewriting tips',
      'Email support',
      'Monthly reports',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '$29.99',
    period: 'per month',
    features: [
      'Everything in Professional',
      'Priority email support',
      'Phone support',
      'Dedicated consultant',
      'Advanced analytics',
      'Batch processing',
      'API access',
    ],
  },
]

// Analysis Score Levels
export const SCORE_LEVELS = {
  EXCELLENT: { min: 80, label: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' },
  GOOD: { min: 60, label: 'Good', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  POOR: { min: 0, label: 'Needs Improvement', color: 'text-red-600', bg: 'bg-red-100' },
}

// Status Messages
export const STATUS_MESSAGES = {
  LOADING: 'Loading...',
  SUCCESS: 'Success!',
  ERROR: 'Something went wrong',
  PENDING: 'Pending',
  COMPLETED: 'Completed',
}

// Local Storage Keys
export const STORAGE_KEYS = {
  USER_TOKEN: 'resume_analyzer_token',
  USER_PREFERENCES: 'resume_analyzer_prefs',
  DRAFT_RESUME: 'resume_analyzer_draft',
}

// Environment Variables
export const ENV = {
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

// UI Constants
export const UI = {
  TOAST_DURATION: 5000, // ms
  DEBOUNCE_DELAY: 300, // ms
  MODAL_ANIMATION_DURATION: 0.3, // seconds
}
