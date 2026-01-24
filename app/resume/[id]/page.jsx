'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckCircle, AlertCircle, TrendingUp, Brain, Target, Map,
    Download, ArrowLeft, FileText, Calendar, Loader2, Award, BookOpen, Clock
} from 'lucide-react'
import { resumeAPI, exportAPI } from '@/lib/api'

export default function ResumeViewPage() {
    const router = useRouter()
    const params = useParams()
    const resumeId = params.id

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [resumeData, setResumeData] = useState(null)
    const [activeTab, setActiveTab] = useState('overview')
    const [downloading, setDownloading] = useState(false)

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                setLoading(true)
                setError('')

                const userStr = localStorage.getItem('user')
                if (!userStr) {
                    router.push('/signin')
                    return
                }

                const storedUser = JSON.parse(userStr)
                const userId = storedUser.uid
                const response = await resumeAPI.getDetail(resumeId, userId)
                console.log('Resume detail response:', response.data);
                if (response.data.success) {
                    setResumeData(response.data.data)
                } else {
                    setError(response.data.error || 'Failed to load resume analysis')
                }
            } catch (err) {
                console.error('Fetch resume error:', err)
                setError('Failed to load resume analysis. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        if (resumeId) {
            fetchResumeData()
        }
    }, [resumeId, router])

    const handleDownload = async () => {
        try {
            setDownloading(true)
            await exportAPI.downloadJSON(resumeData)
        } catch (err) {
            console.error('Download error:', err)
            alert('Failed to download report')
        } finally {
            setDownloading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading resume analysis...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        )
    }

    if (!resumeData) return null

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Brain },
        { id: 'ats', label: 'ATS Score', icon: Target },
        { id: 'skills', label: 'Skills', icon: TrendingUp },
        { id: 'roadmap', label: 'Roadmap', icon: Map }
    ]

    const aiAnalysis = resumeData.aiAnalysis || resumeData.ai_analysis || {}
    const atsScore = resumeData.atsScore || resumeData.ats_score || {}
    const skills = resumeData.skills || {}
    const roadmap = resumeData.roadmap || {}

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <button
                        onClick={() => router.push('/dashboard')}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition font-medium"
                    >
                        <ArrowLeft size={20} />
                        Back to Dashboard
                    </button>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <FileText className="text-blue-600" size={32} />
                                    <h1 className="text-3xl font-bold text-gray-900">{resumeData.fileName}</h1>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} />
                                        <span>Analyzed on {new Date(resumeData.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                                            Overall Score: {aiAnalysis.overallScore || resumeData.overallScore || 'N/A'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleDownload}
                                disabled={downloading}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition shadow-md"
                            >
                                {downloading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Downloading...
                                    </>
                                ) : (
                                    <>
                                        <Download size={20} />
                                        Download Report
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-2 mb-6"
                >
                    <div className="flex gap-2 overflow-x-auto">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition whitespace-nowrap ${activeTab === tab.id
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >
                            {/* Overall Score Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Overall Resume Score</h3>
                                    <TrendingUp className="text-blue-600" size={24} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative w-24 h-24">
                                        <svg className="w-full h-full" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="45"
                                                fill="none"
                                                stroke="#3b82f6"
                                                strokeWidth="8"
                                                strokeDasharray={`${(aiAnalysis.overallScore || 0) * 2.83} 283`}
                                                strokeLinecap="round"
                                                transform="rotate(-90 50 50)"
                                            />
                                            <text x="50" y="60" textAnchor="middle" className="text-2xl font-bold fill-gray-900">
                                                {aiAnalysis.overallScore || 0}
                                            </text>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">out of 100</p>
                                        <p className="text-sm text-gray-500 mt-1">{aiAnalysis.summary || 'Resume analysis complete'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Strengths */}
                            {aiAnalysis.strengths && aiAnalysis.strengths.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Strengths</h3>
                                    <div className="space-y-2">
                                        {aiAnalysis.strengths.map((strength, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                                            >
                                                <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                                                <span className="text-gray-700">{strength}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Improvements */}
                            {aiAnalysis.improvements && aiAnalysis.improvements.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-6">
                                    <h3 className="font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
                                    <div className="space-y-2">
                                        {aiAnalysis.improvements.map((improvement, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200"
                                            >
                                                <AlertCircle className="text-amber-600 flex-shrink-0" size={20} />
                                                <span className="text-gray-700">{improvement}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'ats' && (
                        <motion.div
                            key="ats"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">ATS Compatibility Score</h3>
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600 mb-1">Overall ATS Score</p>
                                        <p className="text-5xl font-bold text-blue-600">{atsScore.overall_score || 0}</p>
                                        <p className="text-sm text-gray-600 mt-1">out of 100</p>
                                    </div>
                                    <Target className="text-blue-600" size={48} />
                                </div>
                            </div>
                            <p className="text-gray-600">Detailed ATS analysis will be displayed here.</p>
                        </motion.div>
                    )}

                    {activeTab === 'skills' && (
                        <motion.div
                            key="skills"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills Analysis</h3>
                            <p className="text-gray-600">Skills matrix will be displayed here.</p>
                        </motion.div>
                    )}

                    {activeTab === 'roadmap' && (
                        <motion.div
                            key="roadmap"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white rounded-xl shadow-lg p-6"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Map className="text-purple-600" size={28} />
                                Learning Roadmap
                            </h3>
                            <p className="text-gray-600">Personalized learning roadmap will be displayed here.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
