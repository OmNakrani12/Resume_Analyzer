import Cookies from 'js-cookie'

export const apiFetch = async (url, options = {}) => {
  const token = Cookies.get('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (response.status === 401) {
      // Clear token if unauthorized
      Cookies.remove('token')
      if (typeof window !== 'undefined') {
        window.location.href = '/signin'
      }
      return response
    }

    return response
  } catch (error) {
    console.error('API FETCH ERROR:', error)
    throw error
  }
}

// Compatibility exports for existing code
export const resumeAPI = {
  list: (userId, page = 1, limit = 10) => 
    apiFetch(`/api/resumes?userId=${userId}&page=${page}&limit=${limit}`).then(res => res.json()),
  getDetail: (resumeId, userId) => 
    apiFetch(`/api/resumes/${resumeId}${userId ? `?userId=${userId}` : ''}`).then(res => res.json()),
  delete: (resumeId) => 
    apiFetch(`/api/resumes/${resumeId}`, { method: 'DELETE' }).then(res => res.json()),
  saveAnalysis: (data) => 
    apiFetch('/api/resumes', { method: 'POST', body: JSON.stringify(data) }).then(res => res.json()),
}

export const userAPI = {
  getProfile: (userId) => 
    apiFetch(`/api/users/profile?userId=${userId}`).then(res => res.json()),
  getUser: () => 
    apiFetch('/api/users').then(res => res.json()),
  updateProfile: (data) => 
    apiFetch('/api/users/profile', { method: 'PUT', body: JSON.stringify(data) }).then(res => res.json()),
}

export const authAPI = {
  logout: async () => {
    Cookies.remove('token')
    // AuthContext.logout() will handle Firebase auth signout
  }
}
