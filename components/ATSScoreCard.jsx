'use client'

import { motion } from 'framer-motion'

import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  BarChart3,
} from 'lucide-react'

export default function ATSScoreCard({
  atsData,
}) {
  if (!atsData) return null

  const {
    overall_score,
    category_scores,
    recommendations,
    ats_friendly,
  } = atsData

  const getProgressColor = (score) => {
    if (score >= 80)
      return 'from-green-500 to-emerald-400'

    if (score >= 60)
      return 'from-yellow-500 to-orange-400'

    return 'from-red-500 to-pink-500'
  }

  const getTextColor = (score) => {
    if (score >= 80)
      return 'text-green-400'

    if (score >= 60)
      return 'text-yellow-400'

    return 'text-red-400'
  }

  const categories = [
    {
      key: 'contact_information',
      label: 'Contact Info',
      icon: '📧',
    },

    {
      key: 'formatting',
      label: 'Formatting',
      icon: '📄',
    },

    {
      key: 'keywords',
      label: 'Keywords',
      icon: '🔑',
    },

    {
      key: 'section_completeness',
      label: 'Sections',
      icon: '📋',
    },

    {
      key: 'action_verbs',
      label: 'Action Verbs',
      icon: '⚡',
    },

    {
      key: 'length',
      label: 'Length',
      icon: '📏',
    },
  ]

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b1120]/80 p-8 shadow-[0_0_80px_rgba(59,130,246,0.08)] backdrop-blur-3xl"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
            <Sparkles
              size={16}
              className="text-blue-400"
            />

            AI Resume Analysis
          </div>

          <h3 className="text-3xl font-black text-white">
            ATS Compatibility Score
          </h3>

          <p className="mt-2 text-gray-400">
            Optimize your resume for recruiters and
            ATS systems
          </p>
        </div>

        {/* Status */}
        <div
          className={`inline-flex items-center gap-3 rounded-2xl border px-5 py-4 backdrop-blur-xl ${
            ats_friendly
              ? 'border-green-500/20 bg-green-500/10 text-green-400'
              : 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400'
          }`}
        >
          {ats_friendly ? (
            <>
              <CheckCircle2 size={24} />

              <div>
                <p className="font-bold">
                  ATS Friendly
                </p>

                <p className="text-xs opacity-70">
                  Excellent Resume
                </p>
              </div>
            </>
          ) : (
            <>
              <AlertCircle size={24} />

              <div>
                <p className="font-bold">
                  Needs Improvement
                </p>

                <p className="text-xs opacity-70">
                  Optimize More
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Score */}
      <motion.div
        initial={{
          scale: 0.9,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          delay: 0.2,
          duration: 0.6,
        }}
        className="relative z-10 mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.03] p-8"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gray-500">
              Overall Score
            </p>

            <div className="flex items-end gap-3">
              <h2 className="text-7xl font-black text-white">
                {overall_score}
              </h2>

              <span className="mb-3 text-2xl font-bold text-gray-500">
                /100
              </span>
            </div>

            <p className="mt-4 max-w-md text-gray-400">
              Your resume performance based on ATS
              parsing, keyword optimization, formatting,
              and recruiter readability.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2">
                <TrendingUp
                  size={20}
                  className="text-green-400"
                />

                <p className="font-semibold text-white">
                  Resume Strength
                </p>
              </div>

              <h4 className="text-3xl font-black text-white">
                +48%
              </h4>

              <p className="text-sm text-gray-400">
                Higher interview visibility
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck
                  size={20}
                  className="text-blue-400"
                />

                <p className="font-semibold text-white">
                  ATS Parsing
                </p>
              </div>

              <h4 className="text-3xl font-black text-white">
                {overall_score >= 80
                  ? 'Excellent'
                  : overall_score >= 60
                  ? 'Good'
                  : 'Weak'}
              </h4>

              <p className="text-sm text-gray-400">
                Resume readability score
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Breakdown */}
      <div className="relative z-10 mb-10">
        <div className="mb-6 flex items-center gap-3">
          <BarChart3 className="text-purple-400" />

          <h4 className="text-2xl font-bold text-white">
            Score Breakdown
          </h4>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {categories.map((category, idx) => {
            const score = Math.round(
              category_scores[
                category.key
              ] || 0
            )

            return (
              <motion.div
                key={category.key}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: idx * 0.1,
                }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-xl">
                      {category.icon}
                    </div>

                    <div>
                      <p className="font-semibold text-white">
                        {category.label}
                      </p>

                      <p className="text-sm text-gray-500">
                        ATS optimization
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-2xl font-black ${getTextColor(
                      score
                    )}`}
                  >
                    {score}%
                  </span>
                </div>

                {/* Progress */}
                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${score}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: idx * 0.1,
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${getProgressColor(
                      score
                    )}`}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations &&
        recommendations.length > 0 && (
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <Sparkles className="text-blue-400" />

              <h4 className="text-2xl font-bold text-white">
                AI Recommendations
              </h4>
            </div>

            <div className="space-y-4">
              {recommendations.map(
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
                      delay:
                        0.4 + idx * 0.1,
                    }}
                    className="flex items-start gap-4 rounded-3xl border border-blue-500/10 bg-blue-500/5 p-5 backdrop-blur-xl"
                  >
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/10">
                      <AlertCircle
                        className="text-blue-400"
                        size={18}
                      />
                    </div>

                    <div>
                      <p className="font-medium leading-relaxed text-gray-300">
                        {rec}
                      </p>
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        )}
    </motion.div>
  )
}