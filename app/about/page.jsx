'use client'

import { motion } from 'framer-motion'

import {
  Users,
  Target,
  Zap,
  Heart,
  Sparkles,
  ShieldCheck,
  Rocket,
  Globe,
} from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Mission',
      description:
        'Helping professionals create ATS-optimized resumes that open career opportunities.',
      gradient:
        'from-blue-500 to-cyan-500',
    },

    {
      icon: Users,
      title: 'Community',
      description:
        'Building a global community of ambitious professionals and job seekers.',
      gradient:
        'from-purple-500 to-pink-500',
    },

    {
      icon: Zap,
      title: 'Innovation',
      description:
        'Using cutting-edge AI technology to deliver smarter resume insights.',
      gradient:
        'from-yellow-500 to-orange-500',
    },

    {
      icon: Heart,
      title: 'Excellence',
      description:
        'Committed to helping users maximize interview and hiring success.',
      gradient:
        'from-green-500 to-emerald-500',
    },
  ]

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      description:
        'HR expert with 10+ years of recruitment experience.',
    },

    {
      name: 'Michael Chen',
      role: 'CTO',
      description:
        'AI engineer and full-stack SaaS architect.',
    },

    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      description:
        'Career strategist focused on user success.',
    },

    {
      name: 'David Kim',
      role: 'Lead Designer',
      description:
        'UX/UI designer passionate about premium experiences.',
    },
  ]

  return (
    <div className="relative overflow-hidden px-4 py-24">
      {/* Background Glow */}
      <div className="absolute left-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HERO */}
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
            duration: 0.8,
          }}
          className="mx-auto mb-28 max-w-4xl text-center"
        >
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-white backdrop-blur-xl">
            <Sparkles
              size={16}
              className="text-blue-400"
            />

            About ResumeAI
          </div>

          {/* Heading */}
          <h1 className="mb-8 text-5xl font-black leading-tight text-white md:text-7xl">
            Empowering Careers With
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              {' '}
              AI Technology
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg leading-relaxed text-gray-400 md:text-xl">
            ResumeAI helps professionals optimize resumes,
            improve ATS scores, and increase interview
            opportunities using advanced artificial
            intelligence and recruiter-focused insights.
          </p>
        </motion.div>

        {/* STORY SECTION */}
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
          className="relative mb-28 overflow-hidden rounded-[40px] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl md:p-16"
        >
          {/* Glow */}
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-2">
            {/* Left */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white">
                <Rocket
                  size={16}
                  className="text-blue-400"
                />

                Our Story
              </div>

              <h2 className="mb-6 text-4xl font-black text-white">
                Built For Modern
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {' '}
                  Job Seekers
                </span>
              </h2>

              <p className="mb-6 text-lg leading-relaxed text-gray-400">
                ResumeAI was founded to solve a major
                problem in modern hiring — talented
                professionals were being rejected because
                their resumes were not optimized for ATS
                systems and recruiter expectations.
              </p>

              <p className="text-lg leading-relaxed text-gray-400">
                We combined AI technology, hiring insights,
                and modern resume optimization techniques to
                create a platform that helps professionals
                stand out in competitive job markets.
              </p>
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
                  label: 'Average Rating',
                },

                {
                  value: '50+',
                  label: 'Countries',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    y: -8,
                  }}
                  className="rounded-3xl border border-white/10 bg-black/20 p-8 text-center backdrop-blur-xl"
                >
                  <h3 className="mb-2 text-5xl font-black text-white">
                    {item.value}
                  </h3>

                  <p className="text-gray-400">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* VALUES */}
        <div className="mb-28">
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
            className="mx-auto mb-20 max-w-3xl text-center"
          >
            <h2 className="mb-6 text-5xl font-black text-white">
              Our Core
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {' '}
                Values
              </span>
            </h2>

            <p className="text-lg text-gray-400">
              The principles that drive innovation and user
              success at ResumeAI.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, idx) => {
              const Icon = value.icon

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
                  className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
                >
                  {/* Glow */}
                  <div
                    className={`absolute right-0 top-0 h-40 w-40 rounded-full bg-gradient-to-r ${value.gradient} opacity-10 blur-3xl transition-all duration-500 group-hover:opacity-20`}
                  />

                  {/* Icon */}
                  <div
                    className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${value.gradient}`}
                  >
                    <Icon
                      size={30}
                      className="text-white"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl font-bold text-white">
                    {value.title}
                  </h3>

                  {/* Description */}
                  <p className="leading-relaxed text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* TEAM */}
        <div className="mb-28">
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
            className="mx-auto mb-20 max-w-3xl text-center"
          >
            <h2 className="mb-6 text-5xl font-black text-white">
              Meet The
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {' '}
                Team
              </span>
            </h2>

            <p className="text-lg text-gray-400">
              A passionate team building the future of AI
              resume optimization.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {team.map((member, idx) => (
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
                className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-2xl"
              >
                {/* Top Gradient */}
                <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
                  <div className="absolute inset-0 bg-black/10" />
                </div>

                {/* Content */}
                <div className="relative p-8">
                  {/* Avatar */}
                  <div className="-mt-20 mb-6 flex justify-center">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#050816] bg-gradient-to-r from-blue-500 to-purple-600 text-3xl font-black text-white shadow-2xl">
                      {member.name.charAt(0)}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="mb-1 text-center text-xl font-bold text-white">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="mb-4 text-center font-medium text-blue-400">
                    {member.role}
                  </p>

                  {/* Description */}
                  <p className="text-center text-sm leading-relaxed text-gray-400">
                    {member.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FINAL CTA */}
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
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-10 text-center backdrop-blur-2xl md:p-16"
        >
          {/* Glow */}
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />

          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white backdrop-blur-xl">
              <Globe
                size={16}
                className="text-blue-400"
              />

              Global AI Resume Platform
            </div>

            <h2 className="mb-6 text-5xl font-black text-white md:text-6xl">
              Helping Professionals
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {' '}
                Get Hired Faster
              </span>
            </h2>

            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl">
              Join thousands of users optimizing resumes,
              improving ATS scores, and landing more
              interviews with ResumeAI.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}