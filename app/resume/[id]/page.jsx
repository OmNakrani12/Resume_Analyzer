'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Brain,
  Target,
  Map,
  Download,
  ArrowLeft,
  FileText,
  Calendar,
  Loader2,
  Shield
} from 'lucide-react'
import { Sparkles } from 'lucide-react'
import { resumeAPI } from '@/lib/api'
import { generateAnalysisPDF } from '@/lib/utils/pdfGenerator'
import { useAuth } from '@/lib/context/AuthContext'

import ATSScoreCard from '@/components/ATSScoreCard'
import SkillsMatrix from '@/components/SkillsMatrix'
import LearningRoadmap from '@/components/LearningRoadmap'
import RiskAnalysis from '@/components/RiskAnalysis'

export default function ResumeViewPage() {
  const router = useRouter()
  const { id: resumeId } = useParams()
  const { user: authUser, loading: authLoading } = useAuth()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [resumeData, setResumeData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [downloading, setDownloading] = useState(false)

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    async function fetchResume() {
      try {
        if (!authUser) {
          router.push('/signin')
          return
        }

        const res = await resumeAPI.getDetail(resumeId, authUser.uid)

        if (res?.success) {
          setResumeData(res.data)
        } else {
          setError('Failed to load resume')
        }
      } catch (err) {
        console.error(err)
        setError('Server error')
      } finally {
        setLoading(false)
      }
    }

    if (resumeId && !authLoading) fetchResume()
  }, [resumeId, authUser, authLoading, router])

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  /* ================= ERROR ================= */
  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!resumeData) return null

  /* ================= NORMALIZED DATA ================= */
  const meta = resumeData.meta || {}
  const analysis = resumeData.analysis || {}
  const skills = analysis.skills || {}
  const roadmap = analysis.roadmap || {}
  const atsData = analysis.atsScore || {}

  const overallScore = meta.overallScore ?? 0
  const atsScore = meta.atsScore ?? 0

  /* ================= PDF DOWNLOAD ================= */
  const handleDownload = async () => {
    try {
      setDownloading(true)

      const pdfData = {
        meta,
        skills,
        roadmap,
        overallScore,
        atsScore,
        analysis
      }

      generateAnalysisPDF(pdfData, meta.fileName || 'Resume')
    } catch (err) {
      console.error(err)
      alert('PDF download failed')
    } finally {
      setDownloading(false)
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'ats', label: 'ATS Score', icon: Target },
    { id: 'skills', label: 'Skills', icon: TrendingUp },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'risk', label: 'Risk', icon: Shield }
  ]

  return (
    <div className="min-h-screen bg-[#030712] py-8 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 mb-6 font-semibold transition"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <FileText className="text-indigo-400" size={20} />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {meta.fileName || 'Resume Analysis'}
                </h1>
              </div>

              <p className="text-slate-400 flex items-center gap-2 text-sm ml-1">
                <Calendar size={14} className="text-slate-500" />
                Analyzed on {meta.createdAt
                  ? new Date(meta.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })
                  : 'N/A'}
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-indigo-600/20 transition active:scale-[0.98] disabled:opacity-50"
            >
              {downloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
              Export Report
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 mb-8 flex flex-wrap gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">

            {/* OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Score Cards */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group">
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors" />
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                          <Brain className="text-indigo-400" size={24} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">Core Match</h4>
                          <p className="text-slate-400 text-sm">Role relevancy score</p>
                        </div>
                        <div className="ml-auto text-3xl font-black text-indigo-400">{overallScore}%</div>
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 relative overflow-hidden group">
                      <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                          <Target className="text-blue-400" size={24} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">ATS Score</h4>
                          <p className="text-slate-400 text-sm">Industry standard compatibility</p>
                        </div>
                        <div className="ml-auto text-3xl font-black text-indigo-400">{atsScore}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                        <CheckCircle className="text-emerald-400" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">Analysis Status</h4>
                        <p className="text-slate-400 text-sm">All checks completed</p>
                      </div>
                      <div className="ml-auto text-sm font-bold text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full">Completed</div>
                    </div>
                  </div>

                  <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-[2rem] p-8 relative overflow-hidden">
                    <div className="relative z-10">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                        <Sparkles size={18} className="text-indigo-400" />
                        AI Recommendation
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Based on your current score, we recommend focusing on keyword optimization and enhancing your action verbs to improve ATS visibility.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Score Visualization (Hidden on Mobile, or shown at bottom) */}
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center">
                  <div className="relative w-48 h-48 mb-8">
                    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#indigoGradient)"
                        strokeWidth="8"
                        strokeDasharray="283"
                        initial={{ strokeDashoffset: 283 }}
                        animate={{ strokeDashoffset: 283 - (overallScore * 2.83) }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-black text-white">{overallScore}</span>
                      <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">Score</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">Overall Resume Quality</h3>
                  <p className="text-slate-400 max-w-sm">
                    Your resume has been analyzed across multiple vectors including formatting, keywords, and impact.
                  </p>
                </div>
              </motion.div>
            )}

            {/* ATS */}
            {activeTab === 'ats' && (
              <motion.div key="ats" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <ATSScoreCard atsData={atsData} />
              </motion.div>
            )}

            {/* SKILLS */}
            {activeTab === 'skills' && (
              <motion.div key="skills" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <SkillsMatrix skillsData={skills} />
              </motion.div>
            )}

            {/* ROADMAP */}
            {activeTab === 'roadmap' && (
              <motion.div key="roadmap" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <LearningRoadmap roadmapData={roadmap} />
              </motion.div>
            )}

            {/* RISK */}
            {activeTab === 'risk' && (
              <motion.div key="risk" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
                <RiskAnalysis riskData={analysis.riskAnalysis || {}} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
