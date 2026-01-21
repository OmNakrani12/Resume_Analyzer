'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, CheckCircle } from 'lucide-react'
import { authAPI } from '@/lib/api'

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
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!Object.values(formData).every(v => v)) {
        setError('Please fill in all fields')
        setLoading(false)
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      if (!agreedToTerms) {
        setError('Please agree to the terms and conditions')
        setLoading(false)
        return
      }

      const response = await authAPI.register({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
      const { data } = response.data

      // Store tokens
      localStorage.setItem('token', data.token)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify(data.user))

      router.push('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Sign up failed. Please try again.')
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
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center px-4 py-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          custom={0}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join ResumeAI and start improving today</p>
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
          {/* Full Name */}
          <motion.div
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="your@email.com"
                required
              />
            </div>
          </motion.div>

          {/* Password */}
          <motion.div
            custom={3}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          </motion.div>

          {/* Confirm Password */}
          <motion.div
            custom={4}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </motion.div>

          {/* Terms Checkbox */}
          <motion.div
            custom={5}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <label className="flex items-center gap-2 text-gray-700 text-sm">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              I agree to the{' '}
              <Link href="/terms" className="text-green-600 hover:text-green-700 font-medium">
                terms
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-green-600 hover:text-green-700 font-medium">
                privacy policy
              </Link>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            custom={6}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition mt-6"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </form>

        {/* Sign In Link */}
        <motion.div
          custom={7}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-center mt-6"
        >
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/signin" className="text-green-600 hover:text-green-700 font-semibold">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
