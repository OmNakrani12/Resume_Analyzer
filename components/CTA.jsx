'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Resume?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of professionals who have improved their resumes with ResumeAI
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            Start Analyzing Now
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
