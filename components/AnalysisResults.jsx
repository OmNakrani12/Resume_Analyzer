'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, TrendingUp } from 'lucide-react'

export default function AnalysisResults({ result }) {
  if (!result) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Score */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Resume Score</h3>
          <TrendingUp className="text-blue-600" size={24} />
        </div>
        <motion.div
          className="flex items-center gap-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <div className="relative w-24 h-24">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="8"
                strokeDasharray={`${result.score * 2.83} 283`}
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 283' }}
                animate={{ strokeDasharray: `${result.score * 2.83} 283` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <text x="50" y="60" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                {result.score}
              </text>
            </svg>
          </div>
          <div>
            <p className="text-gray-600">out of 100</p>
            <p className="text-sm text-gray-500">{result.summary}</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-semibold text-gray-900 mb-4">Strengths</h3>
        <div className="space-y-2">
          {result.strengths?.map((strength, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
            >
              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              <span className="text-gray-700">{strength}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Improvements */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
        <div className="space-y-2">
          {result.improvements?.map((improvement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200"
            >
              <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
              <span className="text-gray-700">{improvement}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="space-y-4"
      >
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Current Skills</h3>
          <div className="flex flex-wrap gap-2">
            {result.skills?.current?.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Suggested Skills</h3>
          <div className="flex flex-wrap gap-2">
            {result.skills?.suggested?.map((skill, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + idx * 0.1 }}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
