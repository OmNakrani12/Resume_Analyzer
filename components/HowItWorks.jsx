'use client'

import { motion } from 'framer-motion'

import {
  Upload,
  Sparkles,
  BarChart3,
  ArrowRight,
} from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Resume',
      description:
        'Upload your resume in seconds using drag & drop or file upload.',
      gradient:
        'from-blue-500 to-cyan-500',
    },

    {
      icon: Sparkles,
      title: 'AI Analysis',
      description:
        'Our AI analyzes ATS score, formatting, keywords, readability, and structure.',
      gradient:
        'from-purple-500 to-pink-500',
    },

    {
      icon: BarChart3,
      title: 'Get Insights',
      description:
        'Receive actionable recommendations to improve ranking and interview chances.',
      gradient:
        'from-green-500 to-emerald-500',
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

            AI Powered Process
          </div>

          {/* Heading */}
          <h2 className="mb-6 text-5xl font-black leading-tight text-white md:text-6xl">
            How It
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {' '}
              Works
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-400 md:text-xl">
            Improve your resume in just a few simple steps
            using advanced AI-powered ATS analysis.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-10 lg:grid-cols-3">
          {/* Connector Line */}
          <div className="absolute left-1/2 top-24 hidden h-1 w-[70%] -translate-x-1/2 bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-green-500/40 lg:block" />

          {steps.map((step, idx) => {
            const Icon = step.icon

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
                  delay: idx * 0.2,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -10,
                }}
                className="relative"
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all duration-300 hover:border-white/20">
                  {/* Gradient Glow */}
                  <div
                    className={`absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-r ${step.gradient} opacity-20 blur-3xl`}
                  />

                  {/* Step Number */}
                  <div className="mb-8 flex items-center justify-between">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${step.gradient} shadow-2xl`}
                    >
                      <Icon
                        size={30}
                        className="text-white"
                      />
                    </div>

                    <div className="text-6xl font-black text-white/5">
                      0{idx + 1}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-3xl font-bold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-8 leading-relaxed text-gray-400">
                    {step.description}
                  </p>

                  {/* Learn More */}
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-400">
                    Learn More

                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
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
            delay: 0.3,
          }}
          viewport={{
            once: true,
          }}
          className="mt-24 grid gap-6 md:grid-cols-3"
        >
          {[
            {
              value: '10K+',
              label: 'Resumes Analyzed',
            },

            {
              value: '95%',
              label: 'ATS Optimization Rate',
            },

            {
              value: '4.9★',
              label: 'User Satisfaction',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-2xl"
            >
              <h4 className="mb-2 text-5xl font-black text-white">
                {item.value}
              </h4>

              <p className="text-gray-400">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}