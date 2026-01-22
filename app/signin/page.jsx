'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { auth } from "@/app/firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields')
      }

      const userCredential =
        await signInWithEmailAndPassword(auth, email, password)

      const user = userCredential.user
      console.log("Logged in:", user.uid)

      // 🔐 GET ID TOKEN
      const token = await user.getIdToken()

      // 🔐 CALL BACKEND WITH TOKEN (NO UID)
      await fetch("/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      localStorage.setItem("user", JSON.stringify({ uid: user.uid, email: user.email }))
      router.push("/dashboard")

    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          setError("No account found with this email.")
          break
        case "auth/wrong-password":
          setError("Incorrect password.")
          break
        default:
          setError("Sign in failed. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }


  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md"
      >

        <motion.div
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your ResumeAI account</p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
          >
            <span className="text-red-600">⚠️</span>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <motion.div
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </motion.div>

          {/* Password Field */}
          <motion.div
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Remember Me & Forgot Password */}
          <motion.div
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between text-sm"
          >
            <label className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" className="w-4 h-4 rounded" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-blue-600 hover:text-blue-700 font-medium">
              Forgot password?
            </Link>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            custom={4}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        {/* Divider */}
        <motion.div
          custom={5}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="my-6 flex items-center gap-4"
        >
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">Or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.div
          custom={6}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
