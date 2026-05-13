'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/context/AuthContext'
import { userAPI } from '@/lib/api'

import {
  Sparkles,
  UploadCloud,
  ShieldCheck,
  FileText,
} from 'lucide-react'

import FileUpload from '@/components/FileUpload'
import AnalysisResults from '@/components/AnalysisResults'

export default function AnalyzePage() {
  const { user } = useAuth()
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isPro, setIsPro] = useState(false)

  useEffect(() => {
    async function checkPlan() {
      if (user?.uid) {
        const res = await userAPI.getUser(user.uid)
        if (res?.success) {
          const plan = res.user?.plan || 'free'
          setIsPro(plan === 'pro' || plan === 'professional')
        }
      }
    }
    checkPlan()
  }, [user])

  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden py-14 px-4">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto relative z-10"
      >

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
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2 rounded-full mb-6 backdrop-blur-xl">
            <Sparkles className="text-indigo-400 w-5 h-5" />

            <span className="text-slate-300 font-medium">
              AI-Powered Resume Analysis
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Analyze Your Resume
            <span className="block bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Like a Professional
            </span>
          </h1>

          <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Upload your resume and receive
            AI-powered ATS scoring, keyword
            optimization, skill analysis,
            formatting checks, and personalized
            improvement suggestions instantly.
          </p>
        </motion.div>

        {/* FEATURE CARDS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
          }}
          className="grid md:grid-cols-3 gap-6 mb-14"
        >

          {/* FEATURE 1 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-5">
              <UploadCloud
                className="text-indigo-400"
                size={28}
              />
            </div>

            <h3 className="text-white text-xl font-bold mb-3">
              Instant Upload
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Upload PDF or DOC resumes securely
              and analyze them instantly using AI.
            </p>
          </div>

          {/* FEATURE 2 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-5">
              <ShieldCheck
                className="text-cyan-400"
                size={28}
              />
            </div>

            <h3 className="text-white text-xl font-bold mb-3">
              ATS Optimization
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Improve ATS compatibility and make
              your resume recruiter-friendly.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] p-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-5">
              <FileText
                className="text-emerald-400"
                size={28}
              />
            </div>

            <h3 className="text-white text-xl font-bold mb-3">
              Smart AI Insights
            </h3>

            <p className="text-slate-400 leading-relaxed">
              Get skill analysis, keyword checks,
              improvement suggestions, and career
              guidance instantly.
            </p>
          </div>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="space-y-10">

          {/* UPLOAD CARD */}
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
            className="
              bg-white/5
              border border-white/10
              backdrop-blur-2xl
              rounded-[2.5rem]
              p-8
              shadow-2xl
              max-w-4xl
              mx-auto
            "
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                <UploadCloud
                  className="text-indigo-400"
                  size={28}
                />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  Upload Resume
                </h2>

                <p className="text-slate-400 mt-1">
                  Upload your resume to begin
                  AI-powered analysis
                </p>
              </div>
            </div>

            <FileUpload
              onAnalysis={setAnalysisResult}
            />
          </motion.div>

          {/* ANALYSIS RESULTS */}
          {analysisResult && (
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
              className="w-full"
            >
              <div
                className="
                  bg-white/5
                  border border-white/10
                  backdrop-blur-2xl
                  rounded-[2.5rem]
                  p-8
                  shadow-2xl
                "
              >

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <Sparkles
                      className="text-emerald-400"
                      size={28}
                    />
                  </div>

                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                      AI Resume Analysis
                    </h2>

                    <p className="text-slate-400 mt-1">
                      Detailed ATS insights and
                      resume improvement suggestions
                    </p>
                  </div>
                </div>

                {/* RESULTS COMPONENT */}
                <AnalysisResults
                  result={analysisResult}
                  isPro={isPro}
                />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}