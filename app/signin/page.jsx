'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

import { auth, googleProvider } from '@/app/firebase/config'
import {
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'

export default function SignIn() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const finishLogin = async (user) => {
    const token = await user.getIdToken(true)

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

    router.replace('/dashboard')
  }

  // 📧 EMAIL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      await finishLogin(cred.user)
    } catch (err) {
      setError(err.message || 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  // 🔵 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)

    try {
      const result = await signInWithPopup(auth, googleProvider)
      await finishLogin(result.user)
    } catch (err) {
      console.error(err)
      setError('Google login failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-4 py-12">
      <motion.div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Email"
            required
          />

          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500">OR</div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full border py-3 rounded hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <p className="text-center mt-6">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-blue-600 font-semibold">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
