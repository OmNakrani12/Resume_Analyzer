'use client'

import { motion } from 'framer-motion'
import { Upload, Zap, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Resume',
      description: 'Simply drag and drop your resume or click to upload',
    },
    {
      icon: Zap,
      title: 'AI Analysis',
      description: 'Our AI analyzes your resume against industry standards',
    },
    {
      icon: CheckCircle,
      title: 'Get Insights',
      description: 'Receive actionable recommendations to improve',
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to improve your resume
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative"
              >
                {/* Step Number */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full font-bold text-xl mb-6 mx-auto"
                >
                  {idx + 1}
                </motion.div>

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="bg-white p-4 rounded-lg shadow-lg"
                  >
                    <Icon className="text-blue-600" size={32} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-1 bg-gradient-to-r from-blue-600 to-transparent transform -translate-y-1/2 translate-x-8 -z-10" />
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
