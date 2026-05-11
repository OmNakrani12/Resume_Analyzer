'use client'

import { motion } from 'framer-motion'

import {
  MapPin,
  Clock,
  BookOpen,
  ExternalLink,
  Award,
  Target,
  Zap,
  CheckCircle,
  Sparkles,
  Brain,
  Rocket,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react'

export default function LearningRoadmap({
  roadmapData,
}) {
  if (!roadmapData) return null

  const {
    items = [],

    phases = [],

    total_time = 'Not specified',

    role = 'Professional',

    career_impact = null,

    learning_tips = null,

    source = 'unknown',
  } = roadmapData

  const priorityColors = {
    High: 'from-red-500 to-pink-500',

    Medium:
      'from-yellow-500 to-orange-500',

    Low: 'from-green-500 to-emerald-500',
  }

  const isAIGenerated =
    source === 'ai-generated'

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
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
            <Sparkles
              size={16}
              className="text-purple-400"
            />

            AI Career Roadmap
          </div>

          <h3 className="text-4xl font-black text-white">
            Learning Roadmap
          </h3>

          <p className="mt-3 max-w-2xl text-gray-400">
            Personalized career growth strategy for
            becoming a stronger {role}
          </p>
        </div>

        {/* Right Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* Time */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2">
              <Clock
                size={18}
                className="text-blue-400"
              />

              <span className="text-sm text-gray-400">
                Duration
              </span>
            </div>

            <h4 className="text-2xl font-black text-white">
              {total_time}
            </h4>
          </div>

          {/* AI Badge */}
          <div className="rounded-3xl border border-purple-500/20 bg-purple-500/10 p-5 backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-2">
              <Zap
                size={18}
                className="text-purple-400"
              />

              <span className="text-sm text-purple-300">
                AI Powered
              </span>
            </div>

            <h4 className="text-lg font-bold text-white">
              {isAIGenerated
                ? 'Personalized'
                : 'Standard'}
            </h4>
          </div>
        </div>
      </div>

      {/* Learning Tips */}
      {learning_tips && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="relative z-10 mb-8 overflow-hidden rounded-[32px] border border-blue-500/10 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 p-6"
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-blue-500/10 blur-[100px]" />

          <div className="relative z-10 flex gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">
              <Brain
                className="text-blue-400"
                size={24}
              />
            </div>

            <div>
              <h4 className="mb-2 text-xl font-bold text-white">
                Learning Tips & Advice
              </h4>

              <p className="leading-relaxed text-gray-300">
                {learning_tips}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Career Impact */}
      {career_impact && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className="relative z-10 mb-10 overflow-hidden rounded-[32px] border border-purple-500/10 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 p-6"
        >
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-purple-500/10 blur-[100px]" />

          <div className="relative z-10 flex gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/10">
              <TrendingUp
                className="text-purple-400"
                size={24}
              />
            </div>

            <div>
              <h4 className="mb-2 text-xl font-bold text-white">
                Career Impact
              </h4>

              <p className="leading-relaxed text-gray-300">
                {career_impact}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Learning Phases */}
      {phases && phases.length > 0 && (
        <div className="relative z-10 mb-10">
          <div className="mb-6 flex items-center gap-3">
            <Target className="text-purple-400" />

            <h4 className="text-3xl font-bold text-white">
              Learning Phases
            </h4>
          </div>

          <div className="space-y-5">
            {phases.map((phase, idx) => (
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
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
              >
                <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-3 inline-flex rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                      Phase {phase.phase}
                    </div>

                    <h5 className="text-2xl font-bold text-white">
                      {phase.name}
                    </h5>

                    <p className="mt-2 text-gray-400">
                      {phase.focus}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white">
                    {phase.duration}
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-3">
                  {phase.skills.map(
                    (skill, skillIdx) => (
                      <motion.div
                        key={skillIdx}
                        whileHover={{
                          scale: 1.05,
                        }}
                        className="rounded-2xl border border-purple-500/10 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 px-4 py-2 text-sm font-semibold text-purple-300"
                      >
                        {skill}
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Learning Path */}
      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <MapPin className="text-blue-400" />

          <h4 className="text-3xl font-bold text-white">
            Detailed Learning Path
          </h4>
        </div>

        <div className="space-y-6">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3 + idx * 0.1,
              }}
              className="overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              {/* Header */}
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h5 className="text-2xl font-bold text-white">
                      {item.skill}
                    </h5>

                    <div
                      className={`rounded-full bg-gradient-to-r px-4 py-1 text-xs font-bold text-white ${priorityColors[item.priority]}`}
                    >
                      {item.priority} Priority
                    </div>
                  </div>

                  <p className="max-w-3xl text-gray-400">
                    {item.description}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
                  ⏳ {item.estimated_time}
                </div>
              </div>

              {/* Learning Approach */}
              {item.learning_path && (
                <div className="mb-5 rounded-3xl border border-indigo-500/10 bg-indigo-500/5 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <BookOpen
                      size={18}
                      className="text-indigo-400"
                    />

                    <p className="font-semibold text-white">
                      Learning Approach
                    </p>
                  </div>

                  <p className="leading-relaxed text-gray-300">
                    {item.learning_path}
                  </p>
                </div>
              )}

              {/* Resources */}
              <div className="mb-5">
                <div className="mb-4 flex items-center gap-2">
                  <Award
                    size={18}
                    className="text-purple-400"
                  />

                  <p className="font-semibold text-white">
                    Learning Resources
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {item.resources &&
                    item.resources.map(
                      (
                        resource,
                        resIdx
                      ) => (
                        <motion.a
                          key={resIdx}
                          whileHover={{
                            scale: 1.02,
                          }}
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-purple-500/20 hover:bg-purple-500/5"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10">
                              <Award
                                size={18}
                                className="text-purple-400"
                              />
                            </div>

                            <div>
                              <p className="font-semibold text-white transition-colors group-hover:text-purple-300">
                                {resource.name}
                              </p>

                              <p className="text-sm text-gray-500">
                                {resource.type}
                              </p>
                            </div>
                          </div>

                          <ExternalLink
                            size={18}
                            className="text-gray-500 transition-colors group-hover:text-purple-400"
                          />
                        </motion.a>
                      )
                    )}
                </div>
              </div>

              {/* Milestones */}
              {item.milestones &&
                item.milestones.length >
                  0 && (
                  <div className="mb-5 rounded-3xl border border-green-500/10 bg-green-500/5 p-5">
                    <div className="mb-4 flex items-center gap-2">
                      <CheckCircle
                        size={18}
                        className="text-green-400"
                      />

                      <p className="font-semibold text-white">
                        Learning Milestones
                      </p>
                    </div>

                    <div className="space-y-3">
                      {item.milestones.map(
                        (
                          milestone,
                          mIdx
                        ) => (
                          <div
                            key={mIdx}
                            className="flex items-start gap-3"
                          >
                            <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                              <CheckCircle
                                size={14}
                                className="text-green-400"
                              />
                            </div>

                            <p className="text-gray-300">
                              {milestone}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

              {/* Practical Project */}
              {item.practical_project && (
                <div className="rounded-3xl border border-orange-500/10 bg-orange-500/5 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Rocket
                      size={18}
                      className="text-orange-400"
                    />

                    <p className="font-semibold text-white">
                      Practical Project
                    </p>
                  </div>

                  <p className="leading-relaxed text-gray-300">
                    {item.practical_project}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 1,
        }}
        className="relative z-10 mt-10 overflow-hidden rounded-[32px] border border-purple-500/10 bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-center"
      >
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-[120px]" />

        <div className="relative z-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white">
            <ShieldCheck size={16} />

            Career Growth Journey
          </div>

          <h4 className="mb-3 text-4xl font-black text-white">
            Ready to Start Learning?
          </h4>

          <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-purple-100">
            Follow this{' '}
            {isAIGenerated
              ? 'AI-personalized '
              : ''}
            roadmap consistently to improve your skills,
            boost ATS rankings, and become a stronger{' '}
            {role}.
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="rounded-2xl bg-white px-8 py-4 font-bold text-purple-700 shadow-2xl transition-all duration-300 hover:bg-purple-50"
          >
            Save Roadmap
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}