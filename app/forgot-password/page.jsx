'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react'
import { auth } from '@/app/firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'
import AuthLayout from '@/components/AuthLayout'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await sendPasswordResetEmail(auth, email)
      setSuccess(true)
    } catch (err) {
      setError('Could not find an account with that email.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout title="Check Inbox" subtitle="A recovery link has been dispatched">
        <div className="text-center py-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-indigo-500/20"
          >
            <CheckCircle2 className="text-indigo-500 w-10 h-10" />
          </motion.div>
          <p className="text-slate-400 font-medium mb-10 leading-relaxed">
            We've sent a password reset link to <span className="text-white font-bold">{email}</span>. Please follow the instructions to regain access.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold transition border border-white/10"
          >
            Try another email
          </button>
          <Link href="/signin" className="flex items-center justify-center gap-2 text-indigo-400 hover:text-indigo-300 font-bold mt-8 transition group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Recover Access" subtitle="We'll help you get back to your dashboard">
      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm font-medium">
            {error}
          </div>
        )}

        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300"
            placeholder="Account email address"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98]"
        >
          {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>Send Reset Link <Send size={18} /></>}
        </button>

        <Link href="/signin" className="flex items-center justify-center gap-2 text-slate-500 hover:text-white font-bold transition group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Login
        </Link>
      </form>
    </AuthLayout>
  )
}
