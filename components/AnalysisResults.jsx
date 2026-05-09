'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Brain,
  Target,
  Map,
  Download,
  Loader2,
  Sparkles,
} from 'lucide-react'

import ATSScoreCard from './ATSScoreCard'
import SkillsMatrix from './SkillsMatrix'
import LearningRoadmap from './LearningRoadmap'
import { generateAnalysisPDF } from '@/lib/utils/pdfGenerator'

export default function AnalysisResults({
  result,
  fileName = 'Resume',
}) {
  const [activeTab, setActiveTab] = useState('overview')
  const [downloading, setDownloading] = useState(false)

  const handleDownloadPDF = async () => {
    try {
      setDownloading(true)

      generateAnalysisPDF(result, fileName)
    } catch (error) {
      console.error(error)

      alert('Failed to generate PDF.')
    } finally {
      setDownloading(false)
    }
  }

  if (!result) return null

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Brain,
    },
    {
      id: 'ats',
      label: 'ATS Score',
      icon: Target,
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: TrendingUp,
    },
    {
      id: 'roadmap',
      label: 'Roadmap',
      icon: Map,
    },
  ]

  const aiAnalysis = result.ai_analysis || result
  const atsScore = result.ats_score
  const skills = result.skills
  const roadmap = result.roadmap

  return (
    <div className="relative space-y-8">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Tabs */}
      <div className="relative bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[1.8rem] p-3">
        <div className="flex gap-3 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold whitespace-nowrap
                  transition-all duration-300 hover:scale-105
                  ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-slate-400 hover:bg-white/5'
                  }
                `}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* CONTENT */}
      <AnimatePresence mode="wait">

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
            className="space-y-8"
          >

            {/* OVERALL SCORE */}
            <motion.div
              whileHover={{
                y: -5,
                scale: 1.01,
              }}
              className="
                bg-gradient-to-br
                from-indigo-500/10
                to-cyan-500/10
                border border-indigo-500/20
                backdrop-blur-2xl
                rounded-[2rem]
                p-8
              "
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Overall Resume Score
                  </h3>

                  <p className="text-slate-400 mt-2">
                    AI-generated resume quality analysis
                  </p>
                </div>

                <Sparkles
                  className="text-indigo-400"
                  size={28}
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-8">

                {/* SCORE CIRCLE */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: 'spring',
                  }}
                  className="relative w-32 h-32"
                >
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                  >

                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#6366f1"
                        />

                        <stop
                          offset="100%"
                          stopColor="#06b6d4"
                        />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="8"
                    />

                    <motion.circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${
                        aiAnalysis.overallScore * 2.83
                      } 283`}
                      initial={{
                        strokeDasharray: '0 283',
                      }}
                      animate={{
                        strokeDasharray: `${
                          aiAnalysis.overallScore * 2.83
                        } 283`,
                      }}
                      transition={{
                        duration: 1.5,
                        ease: 'easeOut',
                      }}
                    />

                    <text
                      x="50"
                      y="58"
                      textAnchor="middle"
                      className="text-2xl font-bold fill-white"
                    >
                      {aiAnalysis.overallScore}
                    </text>
                  </svg>
                </motion.div>

                {/* SUMMARY */}
                <div>
                  <h4 className="text-3xl font-bold text-white">
                    {aiAnalysis.overallScore}/100
                  </h4>

                  <p className="text-slate-400 mt-3 max-w-xl leading-relaxed">
                    {aiAnalysis.summary}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CATEGORY SCORES */}
            {aiAnalysis.scores && (
              <motion.div
                whileHover={{
                  y: -5,
                }}
                className="
                  bg-white/5
                  border border-white/10
                  backdrop-blur-2xl
                  rounded-[2rem]
                  p-8
                "
              >
                <h3 className="text-2xl font-bold text-white tracking-tight mb-6">
                  Detailed Scores
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {Object.entries(aiAnalysis.scores).map(
                    ([category, score], idx) => (
                      <motion.div
                        key={category}
                        initial={{
                          opacity: 0,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        transition={{
                          delay: idx * 0.1,
                        }}
                        className="
                          bg-white/5
                          border border-white/10
                          rounded-2xl
                          p-5
                          text-center
                        "
                      >
                        <p className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                          {score}
                        </p>

                        <p className="text-slate-400 capitalize mt-2">
                          {category}
                        </p>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            )}

            {/* STRENGTHS */}
            <motion.div
              className="
                bg-white/5
                border border-white/10
                backdrop-blur-2xl
                rounded-[2rem]
                p-8
              "
            >
              <h3 className="text-2xl font-bold tracking-tight text-white mb-6">
                Strengths
              </h3>

              <div className="space-y-4">
                {aiAnalysis.strengths?.map(
                  (strength, idx) => (
                    <motion.div
                      key={idx}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: idx * 0.1,
                      }}
                      className="
                        flex items-center gap-4
                        bg-emerald-500/10
                        border border-emerald-500/20
                        rounded-2xl
                        p-4
                      "
                    >
                      <CheckCircle
                        className="text-emerald-400 flex-shrink-0"
                        size={22}
                      />

                      <span className="text-slate-200">
                        {strength}
                      </span>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            {/* IMPROVEMENTS */}
            <motion.div
              className="
                bg-white/5
                border border-white/10
                backdrop-blur-2xl
                rounded-[2rem]
                p-8
              "
            >
              <h3 className="text-2xl font-bold tracking-tight text-white mb-6">
                Areas for Improvement
              </h3>

              <div className="space-y-4">
                {aiAnalysis.improvements?.map(
                  (improvement, idx) => (
                    <motion.div
                      key={idx}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: idx * 0.1,
                      }}
                      className="
                        flex items-center gap-4
                        bg-yellow-500/10
                        border border-yellow-500/20
                        rounded-2xl
                        p-4
                      "
                    >
                      <AlertCircle
                        className="text-yellow-400 flex-shrink-0"
                        size={22}
                      />

                      <span className="text-slate-200">
                        {improvement}
                      </span>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>

            {/* RECOMMENDATIONS */}
            {aiAnalysis.recommendations &&
              aiAnalysis.recommendations.length >
                0 && (
                <motion.div
                  className="
                    bg-white/5
                    border border-white/10
                    backdrop-blur-2xl
                    rounded-[2rem]
                    p-8
                  "
                >
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-6">
                    Actionable Recommendations
                  </h3>

                  <div className="space-y-4">
                    {aiAnalysis.recommendations?.map(
                      (rec, idx) => (
                        <motion.div
                          key={idx}
                          initial={{
                            opacity: 0,
                            x: -20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: idx * 0.1,
                          }}
                          className="
                            flex items-center gap-4
                            bg-cyan-500/10
                            border border-cyan-500/20
                            rounded-2xl
                            p-4
                          "
                        >
                          <TrendingUp
                            className="text-cyan-400 flex-shrink-0"
                            size={22}
                          />

                          <span className="text-slate-200">
                            {rec}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </motion.div>
              )}
          </motion.div>
        )}

        {/* ATS */}
        {activeTab === 'ats' && (
          <motion.div
            key="ats"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
          >
            <ATSScoreCard atsData={atsScore} />
          </motion.div>
        )}

        {/* SKILLS */}
        {activeTab === 'skills' && (
          <motion.div
            key="skills"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
          >
            <SkillsMatrix skillsData={skills} />
          </motion.div>
        )}

        {/* ROADMAP */}
        {activeTab === 'roadmap' && (
          <motion.div
            key="roadmap"
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -20,
            }}
          >
            <LearningRoadmap roadmapData={roadmap} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* DOWNLOAD BUTTON */}
      <motion.button
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
        onClick={handleDownloadPDF}
        disabled={downloading}
        className="
          w-full flex items-center justify-center gap-3
          bg-gradient-to-r from-indigo-500 to-cyan-500
          hover:scale-[1.02]
          transition-all duration-300
          text-white px-6 py-4
          rounded-2xl
          font-semibold
          shadow-lg shadow-indigo-500/20
        "
      >
        {downloading ? (
          <>
            <Loader2
              className="animate-spin"
              size={20}
            />

            Generating PDF...
          </>
        ) : (
          <>
            <Download size={20} />

            Download Full Analysis Report
          </>
        )}
      </motion.button>
    </div>
  )
}