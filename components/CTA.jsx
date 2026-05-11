'use client'

import Link from 'next/link'

import { motion } from 'framer-motion'

import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react'

export default function CTA() {
  return (
    <section className="relative overflow-hidden px-4 py-28">
      {/* Background Glow */}
      <div className="absolute left-[-10%] top-0 h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[120px]" />

      <div className="absolute bottom-0 right-[-10%] h-[400px] w-[400px] rounded-full bg-purple-500/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
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
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl md:p-16"
        >
          {/* Inner Glow */}
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              viewport={{
                once: true,
              }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl"
            >
              <Sparkles
                size={16}
                className="text-blue-400"
              />

              AI Powered Resume Optimization
            </motion.div>

            {/* Heading */}
            <motion.h2
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
                delay: 0.1,
              }}
              viewport={{
                once: true,
              }}
              className="mx-auto mb-8 max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl"
            >
              Ready To Transform
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
                {' '}
                Your Resume?
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
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
              className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl"
            >
              Join thousands of professionals using
              AI-powered ATS optimization to improve resumes,
              increase interview opportunities, and land
              dream jobs faster.
            </motion.p>

            {/* CTA Buttons */}
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
              className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              {/* Primary Button */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Link
                  href="/analyze"
                  className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-5 text-lg font-semibold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:shadow-purple-500/30"
                >
                  Start Analyzing

                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              {/* Secondary Button */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-5 text-lg font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  View Pricing
                </Link>
              </motion.div>
            </motion.div>

            {/* Bottom Features */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
              viewport={{
                once: true,
              }}
              className="flex flex-wrap items-center justify-center gap-4"
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
                  icon: Sparkles,
                  text: 'Instant Results',
                },
              ].map((item, i) => {
                const Icon = item.icon

                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl"
                  >
                    <Icon
                      size={16}
                      className="text-blue-400"
                    />

                    {item.text}
                  </div>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}