'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Briefcase, Edit2, Save, X, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { userAPI } from '@/lib/api'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    jobTitle: ''
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userStr = localStorage.getItem('user')
        if (!userStr) {
          router.push('/signin')
          return
        }

        const storedUser = JSON.parse(userStr)
        setUser(storedUser)
        const userId = storedUser?.uid || 'default_user'

        const response = await userAPI.getProfile(userId)
        const profileData = response?.data?.data || {}

        setProfile({
          fullName: profileData.name || storedUser.displayName || '',
          email: profileData.email || storedUser.email || '',
          phone: profileData.phone || '',
          location: profileData.location || '',
          bio: profileData.bio || '',
          jobTitle: profileData.jobTitle || ''
        })
      } catch (err) {
        console.error('Profile fetch error:', err)
        setError('Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [router])

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      const userId = user?.uid || 'default_user'
      await userAPI.updateProfile({
        userId,
        ...profile
      })

      setSuccess('Profile updated successfully!')
      setIsEditing(false)

      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Profile update error:', err)
      setError('Failed to update profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 mt-1">Manage your account information</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
              >
                <Edit2 size={20} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6"
          >
            {success}
          </motion.div>
        )}

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Avatar Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white font-bold text-4xl">
                {profile.fullName?.[0]?.toUpperCase() || profile.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{profile.fullName || 'User'}</h2>
                <p className="text-white/80 text-lg">{profile.jobTitle || 'Professional'}</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <User size={18} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg transition ${isEditing
                      ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Mail size={18} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg transition ${isEditing
                      ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Phone size={18} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg transition ${isEditing
                      ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <MapPin size={18} />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg transition ${isEditing
                      ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  placeholder="City, Country"
                />
              </div>

              {/* Job Title */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <Briefcase size={18} />
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={profile.jobTitle}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 border rounded-lg transition ${isEditing
                      ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  placeholder="e.g., Software Engineer"
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                  <User size={18} />
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg transition ${isEditing
                      ? 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
                      : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 mt-8"
              >
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <X size={20} />
                  Cancel
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
