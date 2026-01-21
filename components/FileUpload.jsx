'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { resumeAPI } from '@/lib/api'

export default function FileUpload({ onAnalysis }) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const [uploadedResumeId, setUploadedResumeId] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (selectedFile) => {
    setError('')
    
    if (!selectedFile.name.match(/\.(pdf|doc|docx)$/i)) {
      setError('Please upload a valid resume file (PDF, DOC, DOCX)')
      return
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setFile(selectedFile)
  }

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a file first')
      return
    }

    setIsAnalyzing(true)
    setError('')

    try {
      // Step 1: Upload resume
      const formData = new FormData()
      formData.append('resume', file)
      
      const uploadResponse = await resumeAPI.upload(formData)
      const resumeId = uploadResponse.data.data.resume.id
      setUploadedResumeId(resumeId)

      // Step 2: Analyze resume
      const analysisResponse = await resumeAPI.analyze(resumeId)
      const analysis = analysisResponse.data.data.analysis

      const result = {
        score: analysis.overallScore,
        summary: `Your resume scored ${analysis.overallScore}/100`,
        strengths: analysis.strengths,
        improvements: analysis.improvements,
        scores: analysis.scores,
        extractedData: analysis.extractedData,
        recommendations: analysis.recommendations,
      }

      onAnalysis(result)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze resume. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-3 border-dashed rounded-lg p-12 text-center transition cursor-pointer ${
          isDragging
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-300 bg-gray-50 hover:border-gray-400'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt"
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="inline-block"
          >
            <Upload className="text-blue-600 mx-auto mb-4" size={48} />
          </motion.div>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Drop your resume here
          </p>
          <p className="text-gray-600">or click to browse (PDF, DOC, DOCX, TXT - Max 5MB)</p>
        </label>
      </motion.div>

      {/* File Display */}
      {file && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <FileText className="text-blue-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">{file.name}</p>
              <p className="text-sm text-gray-600">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
          <CheckCircle className="text-green-600" size={24} />
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"
        >
          <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
          <p className="text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Analyze Button */}
      {file && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
        </motion.button>
      )}
    </div>
  )
}
