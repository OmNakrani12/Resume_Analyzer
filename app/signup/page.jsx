'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

import { auth, googleProvider } from '@/app/firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth'

export default function SignUp() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🔁 HANDLE GOOGLE REDIRECT RESULT (PRODUCTION)
  useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        if (!result) return

        const user = result.user
        const token = await user.getIdToken(true)

        await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            fullName: user.displayName || 'Google User',
          }),
        })

        localStorage.setItem('token', token)
        localStorage.setItem(
          'user',
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
          })
        )

        router.push('/dashboard')
      })
      .catch((err) => {
        console.error(err)
        setError('Google sign up failed')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // 📧 EMAIL SIGN UP
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!Object.values(formData).every((v) => v)) {
        throw new Error('Please fill in all fields')
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      if (!agreedToTerms) {
        throw new Error('Please agree to the terms')
      }

      const cred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      )

      const user = cred.user
      const token = await user.getIdToken(true)

      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          fullName: formData.fullName,
        }),
      })

      localStorage.setItem('token', token)
      localStorage.setItem(
        'user',
        JSON.stringify({
          uid: user.uid,
          email: user.email,
        })
      )

      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  // 🔵 GOOGLE SIGN UP
  const handleGoogleSignup = async () => {
    setError('')
    setLoading(true)

    try {
      if (window.location.hostname === 'localhost') {
        // Popup for local dev
        const result = await signInWithPopup(auth, googleProvider)
        const user = result.user
        const token = await user.getIdToken(true)

        await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token,
            fullName: user.displayName || 'Google User',
          }),
        })

        localStorage.setItem('token', token)
        localStorage.setItem(
          'user',
          JSON.stringify({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
          })
        )

        router.push('/dashboard')
      } else {
        // Redirect for production
        await signInWithRedirect(auth, googleProvider)
      }
    } catch (err) {
      console.error(err)
      setError('Google sign up failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center px-4 py-12">
      <motion.div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* EMAIL SIGN UP */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            I agree to terms & privacy policy
          </label>

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* GOOGLE SIGN UP */}
        <button
          onClick={handleGoogleSignup}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border py-3 rounded hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center mt-6">
          Already have an account?{' '}
          <Link href="/signin" className="text-blue-600 font-semibold">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
