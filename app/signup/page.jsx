'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, User, CheckCircle, ArrowRight } from 'lucide-react'
import { auth } from '@/app/firebase/config'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'
import Cookies from 'js-cookie'
import AuthLayout from '@/components/AuthLayout'

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const cred = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      await updateProfile(cred.user, { displayName: formData.fullName })
      await sendEmailVerification(cred.user)
      
      const token = await cred.user.getIdToken()
      Cookies.set('token', token, { expires: 7 })
      
      router.push('/verify-email')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Join Community" subtitle="Create your professional AI identity">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
              placeholder="Full name"
              required
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
              placeholder="Email address"
              required
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
              placeholder="Create password"
              required
            />
          </div>
        </div>

        <div className="bg-indigo-600/5 border border-indigo-600/10 p-4 rounded-2xl">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.15em] mb-2">Password Requirements</p>
          <ul className="grid grid-cols-2 gap-2">
            {['8+ characters', 'Uppercase', 'Numbers', 'Symbols'].map(req => (
              <li key={req} className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
        >
          {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Get Started <ArrowRight size={20} /></>}
        </button>

        <p className="text-center text-slate-500 font-medium mt-8">
          Already have an account? <Link href="/signin" className="text-white font-bold hover:underline">Sign In</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
