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

import { resumeAPI } from '@/lib/api'
import { generateAnalysisPDF } from '@/lib/utils/pdfGenerator'

import ATSScoreCard from '@/components/ATSScoreCard'
import SkillsMatrix from '@/components/SkillsMatrix'
import LearningRoadmap from '@/components/LearningRoadmap'
import RiskAnalysis from '@/components/RiskAnalysis'

export default function ResumeViewPage() {
  const router = useRouter()
  const { id: resumeId } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [resumeData, setResumeData] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [downloading, setDownloading] = useState(false)

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    async function fetchResume() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (!user?.uid) {
          router.push('/signin')
          return
        }

        const res = await resumeAPI.getDetail(resumeId, user.uid)

        if (res?.data?.success) {
          // IMPORTANT: store INNER data object only
          setResumeData(res.data.data)
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

    if (resumeId) fetchResume()
  }, [resumeId, router])

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
  const skills = resumeData.skills || {}

  const roadmap = analysis.roadmap || {}

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
        atsScore
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-blue-600 mb-4"
          >
            <ArrowLeft size={18} /> Back
          </button>

          <div className="bg-white rounded-xl shadow p-6 flex justify-between">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <FileText />
                {meta.fileName || 'Resume'}
              </h1>

              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Calendar size={14} />
                {meta.createdAt
                  ? new Date(meta.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2"
            >
              {downloading ? 'Downloading...' : <Download size={18} />}
              PDF
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}
        <div className="bg-white rounded-xl shadow p-2 mb-6 flex gap-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ================= CONTENT ================= */}
        <AnimatePresence mode="wait">

          {/* OVERVIEW */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-white rounded-xl shadow p-6 flex gap-6">
                <div className="relative w-28 h-28">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="8"
                      strokeDasharray={`${overallScore * 2.83} 283`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                    <text x="50" y="60" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                      {overallScore}
                    </text>
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Overall Resume Score</h3>
                  <p className="text-gray-500">Out of 100</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ATS */}
          {activeTab === 'ats' && (
            <motion.div key="ats" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ATSScoreCard atsData={{ overall_score: atsScore,  }} />
            </motion.div>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
            <motion.div key="skills" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SkillsMatrix skillsData={skills} />
            </motion.div>
          )}

          {/* ROADMAP */}
          {activeTab === 'roadmap' && (
            <motion.div key="roadmap" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LearningRoadmap roadmapData={roadmap} />
            </motion.div>
          )}

          {/* RISK */}
          {activeTab === 'risk' && (
            <motion.div key="risk" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <RiskAnalysis riskData={analysis.riskAnalysis || {}} />
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
