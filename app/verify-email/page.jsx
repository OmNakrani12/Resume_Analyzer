'use client'

import { useEffect, useState } from 'react'
import { auth } from '@/app/firebase/config'
import { sendEmailVerification, reload, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { Mail, RefreshCw, LogOut, CheckCircle2, ShieldAlert } from 'lucide-react'
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'
import AuthLayout from '@/components/AuthLayout'

export default function VerifyEmail() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u)
        if (u.emailVerified) router.push('/dashboard')
      } else {
        router.push('/signin')
      }
    })
    return () => unsubscribe()
  }, [router])

  const checkStatus = async () => {
    setLoading(true)
    try {
      await reload(auth.currentUser)
      if (auth.currentUser.emailVerified) {
        router.push('/dashboard')
      } else {
        setError('Email not yet verified. Please check your inbox.')
      }
    } catch (err) {
      setError('Failed to check status')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setLoading(true)
    setError('')
    try {
      await sendEmailVerification(auth.currentUser)
      setSuccess('Verification link resent successfully.')
    } catch (err) {
      setError('Too many requests. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    Cookies.remove('token')
    localStorage.removeItem('user')
    router.push('/signin')
  }

  return (
    <AuthLayout title="Final Step" subtitle="Let's confirm your identity">
      <div className="space-y-10 py-4 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-24 h-24 mx-auto"
        >
          <div className="absolute inset-0 bg-indigo-600/20 rounded-3xl blur-xl animate-pulse" />
          <div className="relative w-full h-full bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
            <Mail className="text-indigo-500 w-12 h-12" />
          </div>
        </motion.div>

        <div className="space-y-3">
          <p className="text-white font-bold text-lg">Verify your email</p>
          <p className="text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
            We've sent a secure confirmation link to <span className="text-indigo-400">{user?.email}</span>.
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2">
            <ShieldAlert size={16} /> {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2">
            <CheckCircle2 size={16} /> {success}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={checkStatus}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition active:scale-[0.98]"
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : 'I have verified my email'}
          </button>
          
          <button
            onClick={handleResend}
            disabled={loading}
            className="w-full bg-white/5 hover:bg-white/10 text-white py-4 rounded-2xl font-bold border border-white/10 transition"
          >
            Resend Email
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="text-slate-500 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition"
        >
          Use a different account
        </button>
      </div>
    </AuthLayout>
  )
}
