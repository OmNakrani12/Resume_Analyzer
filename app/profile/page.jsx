'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Save, Edit2 } from 'lucide-react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Software Engineer passionate about career growth',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    // TODO: Save to backend
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          {/* Avatar Section */}
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="text-white" size={40} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{formData.fullName}</p>
                <p className="text-gray-600">{formData.email}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              <Edit2 size={20} />
              {isEditing ? 'Cancel' : 'Edit'}
            </motion.button>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name */}
            <motion.div
              variants={itemVariants}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              variants={itemVariants}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </motion.div>

            {/* Phone */}
            <motion.div
              variants={itemVariants}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </motion.div>

            {/* Location */}
            <motion.div
              variants={itemVariants}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </motion.div>

            {/* Bio */}
            <motion.div
              variants={itemVariants}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
              />
            </motion.div>

            {/* Save Button */}
            {isEditing && (
              <motion.button
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
              >
                <Save size={20} />
                Save Changes
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lock size={24} />
            Security
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition border border-gray-200"
          >
            <span className="text-gray-900 font-medium">Change Password</span>
            <span className="text-gray-600">→</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
