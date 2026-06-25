'use client'

import { useState } from 'react'

import {
  signInWithPopup,
} from 'firebase/auth'

import {
  auth,
  githubProvider,
} from '@/app/firebase/config'

import {
  Github,
  ArrowRight,
  Loader2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { userAPI } from '@/lib/api'

export default function GithubButton() {
  const [loading, setLoading] =
    useState(false)

  const [error, setError] = useState('')

  const router = useRouter()

  const handleGithubLogin = async () => {
    try {
      setLoading(true)
      setError('')

      const result = await signInWithPopup(
        auth,
        githubProvider
      )

      const user = result.user

      // Initialize/Update profile in database
      await userAPI.updateProfile({
        userId: user.uid,
        fullName: user.displayName || '',
        email: user.email || '',
      })

      // AuthContext will handle token sync via onAuthStateChanged
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      switch (err.code) {
        case 'auth/account-exists-with-different-credential':
          setError(
            'An account already exists with this email using another sign-in method.'
          )
          break

        case 'auth/popup-closed-by-user':
          setError(
            'Login popup was closed before completing sign in.'
          )
          break

        case 'auth/popup-blocked':
          setError(
            'Popup was blocked by browser. Please allow popups.'
          )
          break

        case 'auth/network-request-failed':
          setError(
            'Network error. Please check your internet connection.'
          )
          break

        case 'auth/too-many-requests':
          setError(
            'Too many attempts. Please try again later.'
          )
          break

        case 'auth/cancelled-popup-request':
          setError(
            'Another popup is already open.'
          )
          break

        default:
          setError(
            'GitHub login failed. Please try again.'
          )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleGithubLogin}
      className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-3 rounded-2xl font-bold hover:bg-white/10 transition"
    >
      <Github className="w-5 h-5" />
      GitHub
    </button>
  )
}