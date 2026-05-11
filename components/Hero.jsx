'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
} from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },

    visible: {
      opacity: 1,

      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-24">
      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-7xl"
      >
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl"
            >
              <Sparkles
                size={16}
                className="text-blue-400"
              />

              AI Powered Resume Analysis
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="mb-8 text-5xl font-black leading-tight text-white md:text-7xl"
            >
              Optimize Your Resume
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                {' '}
                Land More Interviews
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl"
            >
              Improve your ATS score, optimize keywords,
              enhance resume structure, and increase your
              chances of getting hired using advanced AI
              analysis.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mb-12 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/analyze"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5 text-lg font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30"
              >
                Analyze Resume

                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                View Pricing
              </Link>
            </motion.div>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              {[
                {
                  icon: ShieldCheck,
                  text: 'ATS Optimized',
                },

                {
                  icon: Zap,
                  text: 'AI Powered',
                },

                {
                  icon: BarChart3,
                  text: 'Real-time Analysis',
                },
              ].map((item, i) => {
                const Icon = item.icon

                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl"
                  >
                    <Icon size={16} />

                    {item.text}
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            {/* Main Dashboard */}
            <div className="relative w-full max-w-[560px] overflow-hidden rounded-[40px] border border-white/10 bg-[#0b1120]/80 shadow-[0_0_80px_rgba(59,130,246,0.15)] backdrop-blur-3xl">
              {/* Glow */}
              <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />

              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />

                  <div className="h-3 w-3 rounded-full bg-yellow-500" />

                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-gray-400">
                  Resume Analysis
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                {/* Resume Preview */}
                <div className="rounded-3xl border border-white/10 bg-white p-6 shadow-2xl">
                  {/* Resume Header */}
                  <div className="mb-6 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />

                    <div className="flex-1">
                      <div className="mb-2 h-4 w-40 rounded-full bg-gray-800" />

                      <div className="h-3 w-28 rounded-full bg-gray-300" />
                    </div>
                  </div>

                  {/* Resume Lines */}
                  <div className="space-y-3">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-3 rounded-full ${
                          i % 2 === 0
                            ? 'w-full'
                            : 'w-[85%]'
                        } bg-gray-200`}
                      />
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {[
                      'React',
                      'Next.js',
                      'Firebase',
                      'AI',
                    ].map((skill) => (
                      <div
                        key={skill}
                        className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ATS Score Card */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="absolute -right-8 top-10 rounded-3xl border border-white/10 bg-[#111827]/90 p-5 shadow-2xl backdrop-blur-2xl"
                >
                  <p className="mb-2 text-sm text-gray-400">
                    ATS Score
                  </p>

                  <h3 className="text-5xl font-black text-white">
                    92%
                  </h3>

                  <div className="mt-3 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                    Excellent Match
                  </div>
                </motion.div>

                {/* AI Suggestion */}
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="absolute -bottom-6 -left-6 max-w-[240px] rounded-3xl border border-white/10 bg-[#111827]/90 p-5 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles
                      size={18}
                      className="text-blue-400"
                    />

                    <p className="font-semibold text-white">
                      AI Suggestion
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-gray-400">
                    Add more industry keywords to improve
                    recruiter visibility and ATS ranking.
                  </p>
                </motion.div>

                {/* Analytics Card */}
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-10 right-0 rounded-3xl border border-white/10 bg-[#111827]/90 p-5 shadow-2xl backdrop-blur-2xl"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <BarChart3
                      size={18}
                      className="text-purple-400"
                    />

                    <span className="text-sm font-semibold text-white">
                      Interview Rate
                    </span>
                  </div>

                  <h4 className="text-3xl font-black text-white">
                    +48%
                  </h4>

                  <p className="text-xs text-gray-400">
                    Higher than average resumes
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}