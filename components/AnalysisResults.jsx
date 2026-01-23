'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, TrendingUp, Brain, Target, Map, Download } from 'lucide-react'
import ATSScoreCard from './ATSScoreCard'
import SkillsMatrix from './SkillsMatrix'
import LearningRoadmap from './LearningRoadmap'

export default function AnalysisResults({ result }) {
  const [activeTab, setActiveTab] = useState('overview')

  if (!result) return null

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'ats', label: 'ATS Score', icon: Target },
    { id: 'skills', label: 'Skills', icon: TrendingUp },
    { id: 'roadmap', label: 'Roadmap', icon: Map }
  ]

  const aiAnalysis = result.ai_analysis || result
  const atsScore = result.ats_score
  const skills = result.skills
  const roadmap = result.roadmap

  return (
    <div className="space-y-6">
      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition whitespace-nowrap ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Overall Score */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Overall Resume Score</h3>
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
                      strokeDasharray={`${aiAnalysis.overallScore * 2.83} 283`}
                      strokeLinecap="round"
                      initial={{ strokeDasharray: '0 283' }}
                      animate={{ strokeDasharray: `${aiAnalysis.overallScore * 2.83} 283` }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                    />
                    <text x="50" y="60" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                      {aiAnalysis.overallScore}
                    </text>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600">out of 100</p>
                  <p className="text-sm text-gray-500 mt-1">{aiAnalysis.summary}</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Category Scores */}
            {aiAnalysis.scores && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Detailed Scores</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(aiAnalysis.scores).map(([category, score], idx) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
                    >
                      <p className="text-2xl font-bold text-blue-600">{score}</p>
                      <p className="text-sm text-gray-600 capitalize mt-1">{category}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Strengths</h3>
              <div className="space-y-2">
                {aiAnalysis.strengths?.map((strength, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
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
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
              <div className="space-y-2">
                {aiAnalysis.improvements?.map((improvement, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + idx * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200"
                  >
                    <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{improvement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recommendations */}
            {aiAnalysis.recommendations && aiAnalysis.recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4">Actionable Recommendations</h3>
                <div className="space-y-2">
                  {aiAnalysis.recommendations.map((rec, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <TrendingUp className="text-blue-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{rec}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'ats' && (
          <motion.div
            key="ats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ATSScoreCard atsData={atsScore} />
          </motion.div>
        )}

        {activeTab === 'skills' && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <SkillsMatrix skillsData={skills} />
          </motion.div>
        )}

        {activeTab === 'roadmap' && (
          <motion.div
            key="roadmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <LearningRoadmap roadmapData={roadmap} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Download Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg"
      >
        <Download size={20} />
        Download Full Analysis Report
      </motion.button>
    </div>
  )
}
