'use client'

import { motion } from 'framer-motion'

import {
  Zap,
  BarChart3,
  Lock,
  Lightbulb,
  Clock,
  Users,
  Sparkles,
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Instant AI Analysis',
      description:
        'Analyze your resume instantly with advanced AI-powered ATS scanning and optimization.',
      gradient:
        'from-blue-500 to-cyan-500',
    },

    {
      icon: BarChart3,
      title: 'ATS Score & Metrics',
      description:
        'Track resume performance with detailed ATS scores and recruiter-focused metrics.',
      gradient:
        'from-purple-500 to-pink-500',
    },

    {
      icon: Lightbulb,
      title: 'Smart Suggestions',
      description:
        'Get personalized recommendations to improve readability, keywords, and structure.',
      gradient:
        'from-yellow-500 to-orange-500',
    },

    {
      icon: Lock,
      title: 'Secure & Private',
      description:
        'Your resumes and personal information are encrypted and securely protected.',
      gradient:
        'from-green-500 to-emerald-500',
    },

    {
      icon: Clock,
      title: 'Track Improvements',
      description:
        'Monitor your resume growth over time with advanced progress tracking.',
      gradient:
        'from-indigo-500 to-blue-500',
    },

    {
      icon: Users,
      title: 'Recruiter Insights',
      description:
        'Built using real hiring manager and recruiter best practices.',
      gradient:
        'from-pink-500 to-rose-500',
    },
  ]

  return (
    <section className="relative overflow-hidden py-28 px-4">
      {/* Background Glow */}
      <div className="absolute left-[-10%] top-0 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-[-10%] h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto mb-24 max-w-3xl text-center"
        >
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl">
            <Sparkles
              size={16}
              className="text-blue-400"
            />

            Premium AI Features
          </div>

          {/* Heading */}
          <h2 className="mb-6 text-5xl font-black leading-tight text-white md:text-6xl">
            Powerful
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {' '}
              Features
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-400 md:text-xl">
            Everything you need to optimize your resume,
            improve ATS ranking, and increase interview
            opportunities.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, idx) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: idx * 0.1,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -10,
                }}
                className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all duration-300 hover:border-white/20"
              >
                {/* Glow */}
                <div
                  className={`absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-r ${feature.gradient} opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20`}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.1,
                  }}
                  className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-2xl`}
                >
                  <Icon
                    size={30}
                    className="text-white"
                  />
                </motion.div>

                {/* Title */}
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="leading-relaxed text-gray-400">
                  {feature.description}
                </p>

                {/* Hover Line */}
                <div
                  className={`mt-8 h-1 w-0 rounded-full bg-gradient-to-r ${feature.gradient} transition-all duration-500 group-hover:w-full`}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          viewport={{
            once: true,
          }}
          className="mt-24 rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <h3 className="mb-6 text-4xl font-black text-white">
                Built For Modern
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {' '}
                  Job Seekers
                </span>
              </h3>

              <p className="mb-8 text-lg leading-relaxed text-gray-400">
                ResumeAI combines artificial intelligence,
                ATS optimization, and recruiter insights to
                help professionals stand out in competitive
                hiring markets.
              </p>

              <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30">
                Explore Features
              </button>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  value: '10K+',
                  label: 'Resumes Optimized',
                },

                {
                  value: '95%',
                  label: 'ATS Success Rate',
                },

                {
                  value: '4.9★',
                  label: 'User Rating',
                },

                {
                  value: '24/7',
                  label: 'AI Availability',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-white/10 bg-black/20 p-6 text-center"
                >
                  <h4 className="mb-2 text-4xl font-black text-white">
                    {item.value}
                  </h4>

                  <p className="text-sm text-gray-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}