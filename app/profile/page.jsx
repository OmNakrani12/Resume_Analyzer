'use client'

import {
  useState,
  useEffect,
} from 'react'

import { useRouter } from 'next/navigation'

import { motion } from 'framer-motion'

import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Edit2,
  Save,
  X,
  ArrowLeft,
  Camera,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

import Link from 'next/link'

import { userAPI } from '@/lib/api'

import { useAuth } from '@/lib/context/AuthContext'

export default function ProfilePage() {
  const router = useRouter()

  const {
    user: authUser,
    loading: authLoading,
  } = useAuth()

  const [profile, setProfile] =
    useState({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      bio: '',
      jobTitle: '',
    })

  const [isEditing, setIsEditing] =
    useState(false)

  const [loading, setLoading] =
    useState(true)

  const [saving, setSaving] =
    useState(false)

  const [error, setError] =
    useState('')

  const [success, setSuccess] =
    useState('')

  useEffect(() => {
    const fetchProfile =
      async () => {
        try {
          if (!authUser) {
            router.push('/signin')
            return
          }

          const userId =
            authUser?.uid ||
            'default_user'

          const response =
            await userAPI.getProfile(
              userId
            )

          const profileData =
            response?.data?.data ||
            {}

          setProfile({
            fullName:
              profileData.fullName ||
              authUser.displayName ||
              '',

            email:
              profileData.email ||
              authUser.email ||
              '',

            phone:
              profileData.phone ||
              '',

            location:
              profileData.location ||
              '',

            bio:
              profileData.bio || '',

            jobTitle:
              profileData.jobTitle ||
              '',
          })
        } catch (err) {
          console.error(err)

          setError(
            'Failed to load profile'
          )
        } finally {
          setLoading(false)
        }
      }

    if (!authLoading) {
      fetchProfile()
    }
  }, [
    authUser,
    authLoading,
    router,
  ])

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    })
  }

  const handleSave = async () => {
    setSaving(true)

    setError('')

    setSuccess('')

    try {
      const userId =
        authUser?.uid ||
        'default_user'

      await userAPI.updateProfile({
        userId,
        ...profile,
      })

      setSuccess(
        'Profile updated successfully!'
      )

      setIsEditing(false)

      setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      console.error(err)
      setError(
        'Failed to update profile'
      )
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError('')
    setSuccess('')
  }

  if (loading || authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#030712]">
        <div className="text-center">
          <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

          <p className="text-gray-400">
            Loading profile...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] px-4 py-12">
      {/* Glow Effects */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/10 blur-[140px]" />

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative z-10 mx-auto max-w-5xl"
      >
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>

            <h1 className="text-5xl font-black text-white">
              My Profile
            </h1>

            <p className="mt-3 text-gray-400">
              Manage your account
              and personal
              information
            </p>
          </div>

          {!isEditing && (
            <motion.button
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={() =>
                setIsEditing(true)
              }
              className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300"
            >
              <Edit2 size={18} />
              Edit Profile
            </motion.button>
          )}
        </div>

        {/* Error */}
        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400 backdrop-blur-xl"
          >
            {error}
          </motion.div>
        )}

        {/* Success */}
        {success && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-green-400 backdrop-blur-xl"
          >
            {success}
          </motion.div>
        )}

        {/* Main Card */}
        <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
          {/* Hero Section */}
          <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-blue-600/20 via-indigo-600/10 to-purple-600/20 p-10">
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

            <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center">
              {/* Avatar */}
              <div className="relative">
                {authUser?.photoURL ? (
                  <img
                    src={
                      authUser.photoURL
                    }
                    alt="Profile"
                    className="h-32 w-32 rounded-full border border-white/10 object-cover shadow-2xl"
                  />
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-[32px] bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-2xl shadow-blue-500/20">
                    <User
                      size={52}
                      className="text-white"
                    />
                  </div>
                )}

                <button className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl">
                  <Camera
                    size={18}
                    className="text-white"
                  />
                </button>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <h2 className="text-4xl font-black text-white">
                    {profile.fullName ||
                      'User'}
                  </h2>

                  <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-300">
                    {authUser?.emailVerified
                      ? 'Verified'
                      : 'Free Plan'}
                  </div>
                </div>

                <p className="text-lg text-gray-300">
                  {profile.jobTitle ||
                    'Professional'}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                    <ShieldCheck
                      size={16}
                    />
                    Verified Account
                  </div>

                  <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300">
                    <Sparkles
                      size={16}
                    />
                    AI Resume
                    Optimization
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <InputField
                icon={User}
                label="Full Name"
                name="fullName"
                value={
                  profile.fullName
                }
                onChange={
                  handleChange
                }
                disabled={!isEditing}
                placeholder="Enter full name"
              />

              <InputField
                icon={Mail}
                label="Email Address"
                name="email"
                value={profile.email}
                onChange={
                  handleChange
                }
                disabled={!isEditing}
                placeholder="Enter email"
              />

              <InputField
                icon={Phone}
                label="Phone Number"
                name="phone"
                value={profile.phone}
                onChange={
                  handleChange
                }
                disabled={!isEditing}
                placeholder="+91 9876543210"
              />

              <InputField
                icon={MapPin}
                label="Location"
                name="location"
                value={
                  profile.location
                }
                onChange={
                  handleChange
                }
                disabled={!isEditing}
                placeholder="Surat, India"
              />

              <div className="md:col-span-2">
                <InputField
                  icon={Briefcase}
                  label="Job Title"
                  name="jobTitle"
                  value={
                    profile.jobTitle
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    !isEditing
                  }
                  placeholder="Software Engineer"
                />
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <User size={16} />
                  Bio
                </label>

                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={
                    handleChange
                  }
                  disabled={
                    !isEditing
                  }
                  rows={5}
                  className={`w-full rounded-3xl border px-5 py-4 text-white outline-none placeholder:text-gray-500 transition-all duration-300 ${
                    isEditing
                      ? 'border-white/10 bg-white/5 focus:border-blue-500/30 focus:bg-white/[0.07]'
                      : 'cursor-not-allowed border-white/5 bg-white/[0.03]'
                  }`}
                  placeholder="Tell something about yourself..."
                />
              </div>
            </div>

            {/* Buttons */}
            {isEditing && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <button
                  onClick={
                    handleSave
                  }
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Save size={18} />

                  {saving
                    ? 'Saving...'
                    : 'Save Changes'}
                </button>

                <button
                  onClick={
                    handleCancel
                  }
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  <X size={18} />
                  Cancel
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* Input Component */
function InputField({
  icon: Icon,
  label,
  name,
  value,
  onChange,
  disabled,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-300">
        <Icon size={16} />
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full rounded-3xl border px-5 py-4 text-white outline-none placeholder:text-gray-500 transition-all duration-300 ${
          disabled
            ? 'cursor-not-allowed border-white/5 bg-white/[0.03]'
            : 'border-white/10 bg-white/5 focus:border-blue-500/30 focus:bg-white/[0.07]'
        }`}
      />
    </div>
  )
}