'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'

import {
  Mail,
  Lock,
  User,
  ArrowRight,
} from 'lucide-react'

import {
  auth,
  googleProvider,
} from '@/app/firebase/config'

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithPopup,
} from 'firebase/auth'

import Cookies from 'js-cookie'

import AuthLayout from '@/components/AuthLayout'
import GithubButton from '@/components/GithubButton'
import { userAPI } from '@/lib/api'

export default function SignUp() {
  const router = useRouter()

  const [formData, setFormData] =
    useState({
      fullName: '',
      email: '',
      password: '',
    })

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })

  // Email Signup
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    try {
      const cred =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )

      await updateProfile(
        cred.user,
        {
          displayName:
            formData.fullName,
        }
      )

      // Initialize profile in database
      await userAPI.updateProfile({
        userId: cred.user.uid,
        fullName: formData.fullName,
        email: formData.email,
      })

      await sendEmailVerification(
        cred.user
      )

      // AuthContext will handle token sync via onAuthStateChanged
      router.push('/verify-email')
    } catch (err) {
      setError(
        err.code === 'auth/email-already-in-use'
          ? 'Email already registered'
          : err.message ||
            'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  // Google Signup
  const handleGoogleLogin =
    async () => {
      try {
        setLoading(true)
        setError('')

        const result = await signInWithPopup(
          auth,
          googleProvider
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
        if (err.code !== 'auth/popup-closed-by-user') {
          setError(
            err.message ||
              'Google sign up failed'
          )
        }
      } finally {
        setLoading(false)
      }
    }

  return (
    <AuthLayout
      title="Join Community"
      subtitle="Create your professional AI identity"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Error */}
        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="space-y-4">
          {/* Full Name */}
          <div className="group relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-500"
              size={20}
            />

            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="Full name"
              required
            />
          </div>

          {/* Email */}
          <div className="group relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-500"
              size={20}
            />

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="Email address"
              required
            />
          </div>

          {/* Password */}
          <div className="group relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-500"
              size={20}
            />

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white outline-none transition-all duration-300 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10"
              placeholder="Create password"
              required
            />
          </div>
        </div>

        {/* Password Requirements */}
        <div className="rounded-2xl border border-indigo-600/10 bg-indigo-600/5 p-4">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
            Password Requirements
          </p>

          <ul className="grid grid-cols-2 gap-2">
            {[
              '8+ characters',
              'Uppercase',
              'Numbers',
              'Symbols',
            ].map((req) => (
              <li
                key={req}
                className="flex items-center gap-2 text-xs text-slate-400"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />

                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-[0.98]"
        >
          {loading ? (
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <>
              Get Started

              <ArrowRight size={20} />
            </>
          )}
        </button>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5"></div>
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-2 font-bold tracking-widest text-slate-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-3 rounded-2xl font-bold hover:bg-white/10 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
            Google
          </button>
          <GithubButton />
        </div>

        {/* Footer */}
        <p className="mt-8 text-center font-medium text-slate-500">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-bold text-white hover:underline"
          >
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}