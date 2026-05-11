'use client'

import { motion } from 'framer-motion'

import {
  FileText,
  Zap,
  ShieldCheck,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
} from 'lucide-react'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black/20 backdrop-blur-2xl">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid gap-14 lg:grid-cols-5">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-3 shadow-lg shadow-blue-500/20">
                <Sparkles className="text-white" size={24} />
              </div>

              <h2 className="text-3xl font-black tracking-tight text-white">
                ResumeAI
              </h2>
            </div>

            {/* Description */}
            <p className="mb-8 max-w-md text-lg leading-relaxed text-gray-400">
              AI-powered ATS resume analysis platform helping
              professionals optimize resumes, improve scores,
              and land more interviews faster.
            </p>

            {/* Feature Badges */}
            <div className="mb-8 flex flex-wrap gap-3">
              {[
                {
                  icon: FileText,
                  label: 'ATS Analysis',
                },
                {
                  icon: Zap,
                  label: 'AI Optimization',
                },
                {
                  icon: ShieldCheck,
                  label: 'Secure Platform',
                },
              ].map((item, i) => {
                const Icon = item.icon

                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl"
                  >
                    <Icon size={16} />
                    {item.label}
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                {
                  icon: Github,
                  href: 'https://github.com/OmNakrani12/Resume_Analyzer',
                },
                {
                  icon: Linkedin,
                  href: 'https://in.linkedin.com/in/om-nakrani-343026285',
                },
                {
                  icon: Twitter,
                  href: '#',
                },
              ].map((item, i) => {
                const Icon = item.icon

                return (
                  <motion.a
                    whileHover={{
                      scale: 1.1,
                      y: -3,
                    }}
                    key={i}
                    href={item.href}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-400 transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white"
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-6 text-lg font-bold text-white">
              Product
            </h3>

            <ul className="space-y-4">
              {[
                {
                  label: 'Resume Analyzer',
                  href: '/analyze',
                },
                {
                  label: 'Pricing',
                  href: '/pricing',
                },
                {
                  label: 'Features',
                  href: '/features',
                },
                {
                  label: 'ATS Checker',
                  href: '/ats-checker',
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-gray-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-6 text-lg font-bold text-white">
              Company
            </h3>

            <ul className="space-y-4">
              {[
                {
                  label: 'About',
                  href: '/about',
                },
                {
                  label: 'Blog',
                  href: '/blog',
                },
                {
                  label: 'Careers',
                  href: '/careers',
                },
                {
                  label: 'Contact',
                  href: '/contact',
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-gray-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-6 text-lg font-bold text-white">
              Legal
            </h3>

            <ul className="space-y-4">
              {[
                {
                  label: 'Privacy Policy',
                  href: '/privacy',
                },
                {
                  label: 'Terms & Conditions',
                  href: '/terms',
                },
                {
                  label: 'Cookie Policy',
                  href: '/cookies',
                },
                {
                  label: 'Security',
                  href: '/security',
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-gray-400 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © {currentYear} ResumeAI. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span>Made with AI & ❤️</span>

            <span className="hidden h-4 w-px bg-white/10 md:block" />

            <span>Powered by Stripe Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  )
}