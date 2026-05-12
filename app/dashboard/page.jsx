'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  BarChart3,
  FileText,
  TrendingUp,
  LogOut,
  AlertCircle,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { resumeAPI, userAPI } from '@/lib/api'
import { useAuth } from '@/lib/context/AuthContext'

export default function Dashboard() {
  const router = useRouter()
  const { user: authUser, loading: authLoading, logout } = useAuth()
  const [resumes, setResumes] = useState([])
  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authUser) {
          router.push('/signin')
          return
        }

        const userId = authUser?.uid || 'default_user'

        const [profileResponse, resumesResponse] = await Promise.all([
          userAPI.getProfile(userId),
          resumeAPI.list(userId, 1, 10),
        ])

        const profile = profileResponse?.data || {
          resumesAnalyzed: 0,
          resumeLimit: 10,
          subscription: 'free',
          email: authUser.email || 'user@example.com',
        }

        const resumesList =
          resumesResponse?.data?.resumes || []

        setResumes(resumesList)

        const avgAtsScore =
          resumesList.length > 0
            ? Math.round(
                resumesList.reduce(
                  (sum, r) =>
                    sum +
                    Number(
                      r.atsScore ?? 0
                    ),
                  0
                ) / resumesList.length
              )
            : 0

        const avgOverallScore =
          resumesList.length > 0
            ? Math.round(
                resumesList.reduce(
                  (sum, r) =>
                    sum +
                    Number(
                      r.overallScore ??
                        r.atsScore ??
                        0
                    ),
                  0
                ) / resumesList.length
              )
            : 0

        setStats([
          {
            icon: FileText,
            label: 'Resumes Analyzed',
            value: (
              profile.resumesAnalyzed ||
              resumesList.length
            ).toString(),
            change: `${
              (profile.resumeLimit || 10) -
              (profile.resumesAnalyzed ||
                resumesList.length)
            } remaining`,
          },
          {
            icon: TrendingUp,
            label: 'Average ATS Score',
            value: `${avgAtsScore}%`,
            change:
              (profile.subscription || 'free')
                .charAt(0)
                .toUpperCase() +
              (profile.subscription || 'free').slice(1),
          },
          {
            icon: BarChart3,
            label: 'Subscription',
            value:
              (profile.subscription || 'free')
                .charAt(0)
                .toUpperCase() +
              (profile.subscription || 'free').slice(1),
            change:
              profile.email ||
              authUser.email ||
              'user@example.com',
          },
        ])
      } catch (err) {
        console.error(err)

        setError(
          err.response?.data?.error ||
            err.message ||
            'Failed to load dashboard.'
        )
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading) {
      fetchData()
    }
  }, [authUser, authLoading])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/signin')
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

          <p className="text-slate-400 text-lg">
            Loading dashboard...
          </p>
        </div>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
        duration: 0.6,
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden px-4 py-10">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10"
      >
        {/* HERO SECTION */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 lg:p-10 mb-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <Sparkles className="text-white w-6 h-6" />
                </div>

                <span className="text-white font-bold text-xl tracking-tight">
                  ResumeAI
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
                Welcome back,
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  {' '}
                  {authUser?.displayName || 'Professional'}
                </span>
              </h1>

              <p className="text-slate-400 text-lg mt-5 max-w-2xl leading-relaxed">
                Analyze resumes, improve ATS scores,
                optimize keywords, and unlock AI-powered
                career insights.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/analyze"
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-indigo-600/30"
              >
                Analyze Resume
              </Link>

              {/* <button
                onClick={handleLogout}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-7 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
              >
                <LogOut
                  size={18}
                  className="inline mr-2"
                />
                Logout
              </button> */}
            </div>
          </div>
        </motion.div>

        {/* ERROR */}
        {error && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-red-500/10 border border-red-500/20 text-red-300 px-5 py-4 rounded-2xl mb-8 flex items-center gap-3"
          >
            <AlertCircle size={20} />
            {error}
          </motion.div>
        )}

        {/* STATS */}
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-3 gap-6 mb-10"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon

            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[2rem] p-7 transition-all duration-300 hover:border-indigo-500/30"
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">
                      {stat.label}
                    </p>

                    <h3 className="text-4xl font-bold text-white mt-2">
                      {stat.value}
                    </h3>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                    <Icon
                      className="text-indigo-400"
                      size={28}
                    />
                  </div>
                </div>

                <p className="text-sm text-emerald-400 font-medium">
                  {stat.change}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* RECENT RESUMES */}
        <motion.div
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Recent Resume Analyses
              </h2>

              <p className="text-slate-400 mt-2">
                Review ATS scores and AI analysis
                history.
              </p>
            </div>

            <Link
              href="/analyze"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition"
            >
              Upload New Resume →
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-6">
                <FileText
                  size={36}
                  className="text-indigo-400"
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                No resumes analyzed yet
              </h3>

              <p className="text-slate-400 mb-6">
                Upload your first resume and get
                AI-powered ATS insights instantly.
              </p>

              <Link
                href="/analyze"
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-semibold transition"
              >
                Upload Resume
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop View Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                        Resume
                      </th>

                      <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                        ATS Score
                      </th>

                      <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                        Overall Score
                      </th>

                      <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                        Date
                      </th>

                      <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                        Status
                      </th>

                      <th className="text-left py-4 px-4 text-slate-400 font-semibold text-sm uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {resumes.map((resume, idx) => (
                      <motion.tr
                        key={resume.id}
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
                        className="border-b border-white/5 hover:bg-white/5 transition group"
                      >
                        <td className="py-5 px-4 text-white font-medium">
                          {resume.fileName}
                        </td>

                        <td className="py-5 px-4">
                          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1.5 rounded-full text-sm font-bold">
                            {resume.atsScore || 0}%
                          </span>
                        </td>

                        <td className="py-5 px-4">
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1.5 rounded-full text-sm font-bold">
                            {resume.overallScore ||
                              resume.score ||
                              'N/A'}
                          </span>
                        </td>

                        <td className="py-5 px-4 text-slate-400 text-sm">
                          {new Date(
                            resume.createdAt ||
                              resume.uploadedAt ||
                              Date.now()
                          ).toLocaleDateString()}
                        </td>

                        <td className="py-5 px-4">
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-1.5 rounded-full text-sm font-bold">
                            {(
                              resume.status ||
                              'completed'
                            )
                              .charAt(0)
                              .toUpperCase() +
                              (
                                resume.status ||
                                'completed'
                              ).slice(1)}
                          </span>
                        </td>

                        <td className="py-5 px-4">
                          <Link
                            href={`/resume/${resume.id}`}
                            className="text-indigo-400 hover:text-white font-bold transition-all flex items-center gap-2 group-hover:translate-x-1"
                          >
                            View Analysis 
                            <TrendingUp size={14} />
                          </Link>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View Cards */}
              <div className="md:hidden space-y-4">
                {resumes.map((resume, idx) => (
                  <motion.div
                    key={resume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-white font-bold text-lg truncate max-w-[200px]">
                          {resume.fileName}
                        </h4>
                        <p className="text-slate-500 text-xs mt-1">
                          {new Date(resume.createdAt || resume.uploadedAt || Date.now()).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase px-3 py-1 rounded-full border border-indigo-500/20">
                        {resume.status || 'completed'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-slate-500 text-[10px] uppercase font-bold mb-1 tracking-wider">ATS Score</p>
                        <p className="text-blue-400 font-black text-xl">{resume.atsScore || 0}%</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                        <p className="text-slate-500 text-[10px] uppercase font-bold mb-1 tracking-wider">Overall</p>
                        <p className="text-emerald-400 font-black text-xl">{resume.overallScore || resume.score || 'N/A'}</p>
                      </div>
                    </div>

                    <Link
                      href={`/resume/${resume.id}`}
                      className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                    >
                      View Analysis
                      <TrendingUp size={16} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}