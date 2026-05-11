'use client'

import { motion } from 'framer-motion'

import {
  Code,
  Heart,
  TrendingUp,
  Plus,
  Sparkles,
  Brain,
  Briefcase,
  ShieldCheck,
} from 'lucide-react'

export default function SkillsMatrix({
  skillsData,
}) {
  if (!skillsData) return null

  const {
    current = {
      technical: {},
      soft: [],
      total_technical: 0,
    },

    suggested = [],

    detected_role = 'Professional',

    skill_gap_count = 0,
  } = skillsData

  const categoryIcons = {
    languages: '💻',

    frameworks: '⚛️',

    databases: '🗄️',

    cloud: '☁️',

    tools: '🛠️',

    concepts: '🧠',
  }

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
      {/* Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
            <Sparkles
              size={16}
              className="text-blue-400"
            />

            AI Skill Intelligence
          </div>

          <h3 className="text-3xl font-black text-white">
            Skills Matrix
          </h3>

          <p className="mt-2 text-gray-400">
            Analyze your technical expertise and
            discover missing industry skills
          </p>
        </div>

        {/* Right */}
        <div className="grid grid-cols-2 gap-4">
          {/* Total Skills */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2">
              <Code
                size={18}
                className="text-blue-400"
              />

              <span className="text-sm text-gray-400">
                Technical Skills
              </span>
            </div>

            <h4 className="text-4xl font-black text-white">
              {current.total_technical}
            </h4>
          </div>

          {/* Role */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2">
              <Briefcase
                size={18}
                className="text-purple-400"
              />

              <span className="text-sm text-gray-400">
                Detected Role
              </span>
            </div>

            <h4 className="text-lg font-bold text-white">
              {detected_role}
            </h4>
          </div>
        </div>
      </div>

      {/* Technical Skills */}
      {current.technical &&
        Object.keys(current.technical)
          .length > 0 && (
          <div className="relative z-10 mb-10">
            <div className="mb-6 flex items-center gap-3">
              <Code className="text-blue-400" />

              <h4 className="text-2xl font-bold text-white">
                Technical Skills
              </h4>
            </div>

            <div className="grid gap-5">
              {Object.entries(
                current.technical
              ).map(
                (
                  [category, skills],
                  idx
                ) => (
                  <motion.div
                    key={category}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        idx * 0.1,
                    }}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                  >
                    {/* Category Header */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-2xl">
                          {categoryIcons[
                            category
                          ] || '📌'}
                        </div>

                        <div>
                          <h5 className="text-lg font-bold capitalize text-white">
                            {category}
                          </h5>

                          <p className="text-sm text-gray-500">
                            {
                              skills.length
                            }{' '}
                            skills
                          </p>
                        </div>
                      </div>

                      <div className="rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-sm font-semibold text-blue-400">
                        Active
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-3">
                      {skills.map(
                        (
                          skill,
                          skillIdx
                        ) => (
                          <motion.div
                            key={skillIdx}
                            initial={{
                              opacity: 0,
                              scale: 0,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            transition={{
                              delay:
                                0.2 +
                                skillIdx *
                                  0.05,
                            }}
                            whileHover={{
                              scale: 1.05,
                            }}
                            className="rounded-2xl border border-blue-500/10 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 px-4 py-2 text-sm font-semibold text-blue-300 backdrop-blur-xl"
                          >
                            {skill}
                          </motion.div>
                        )
                      )}
                    </div>
                  </motion.div>
                )
              )}
            </div>
          </div>
        )}

      {/* Soft Skills */}
      {current.soft &&
        current.soft.length > 0 && (
          <div className="relative z-10 mb-10">
            <div className="mb-6 flex items-center gap-3">
              <Heart className="text-pink-400" />

              <h4 className="text-2xl font-bold text-white">
                Soft Skills
              </h4>
            </div>

            <div className="flex flex-wrap gap-3">
              {current.soft.map(
                (skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay:
                        0.3 +
                        idx * 0.05,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="rounded-2xl border border-pink-500/10 bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-4 py-2 text-sm font-semibold text-pink-300 backdrop-blur-xl"
                  >
                    {skill}
                  </motion.div>
                )
              )}
            </div>
          </div>
        )}

      {/* Suggested Skills */}
      {suggested &&
        suggested.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="relative z-10 overflow-hidden rounded-[32px] border border-green-500/10 bg-gradient-to-br from-green-500/10 to-emerald-500/5 p-8"
          >
            {/* Glow */}
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-green-500/10 blur-[120px]" />

            {/* Header */}
            <div className="relative z-10 mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm text-green-300">
                  <TrendingUp size={16} />

                  Recommended Growth
                </div>

                <h4 className="text-3xl font-black text-white">
                  Recommended Skills
                </h4>

                <p className="mt-2 text-gray-400">
                  Improve your competitiveness for{' '}
                  {detected_role} roles
                </p>
              </div>

              {/* Count */}
              <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-5 text-center backdrop-blur-xl">
                <p className="text-sm text-green-300">
                  Missing Skills
                </p>

                <h3 className="text-5xl font-black text-white">
                  {skill_gap_count}
                </h3>
              </div>
            </div>

            {/* Skills */}
            <div className="relative z-10 flex flex-wrap gap-3">
              {suggested.map(
                (skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    transition={{
                      delay:
                        0.5 +
                        idx * 0.05,
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="group flex cursor-pointer items-center gap-2 rounded-2xl border border-green-500/20 bg-white/5 px-4 py-3 font-semibold text-green-300 backdrop-blur-xl transition-all duration-300 hover:bg-green-500/10"
                  >
                    <Plus
                      size={16}
                      className="transition-transform duration-300 group-hover:rotate-90"
                    />

                    {skill}
                  </motion.div>
                )
              )}
            </div>

            {/* Footer */}
            <div className="relative z-10 mt-8 flex items-start gap-3 rounded-3xl border border-white/5 bg-black/20 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/10">
                <Brain
                  className="text-green-400"
                  size={18}
                />
              </div>

              <div>
                <p className="font-semibold text-white">
                  AI Career Insight
                </p>

                <p className="mt-1 text-sm leading-relaxed text-gray-400">
                  Adding these skills to your learning
                  roadmap can significantly improve your
                  ATS rankings and recruiter visibility.
                </p>
              </div>
            </div>
          </motion.div>
        )}
    </motion.div>
  )
}