'use client'

import { motion } from 'framer-motion'
import { FileText, Zap, BarChart3, Users } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-bold text-lg mb-4">ResumeAI</h3>
            <p className="text-gray-400">AI-powered resume analysis to help you land your dream job.</p>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/analyze" className="hover:text-white transition">Analyze</a></li>
              <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
              <li><a href="/features" className="hover:text-white transition">Features</a></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/about" className="hover:text-white transition">About</a></li>
              <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
              <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/privacy" className="hover:text-white transition">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white transition">Terms</a></li>
              <li><a href="/cookies" className="hover:text-white transition">Cookies</a></li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">&copy; {currentYear} ResumeAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
