'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, FileText } from 'lucide-react'
import { motion } from 'framer-motion'
import ProfileDropdown from './ProfileDropdown'
import Image from 'next/image'


export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Analyze', href: '/analyze' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="ResumeAI Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <span className="text-xl font-bold text-gray-900">ResumeAI</span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Profile Dropdown */}
          <motion.div
            className="hidden md:flex items-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileDropdown />
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-600 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/signin"
                className="block text-gray-700 hover:text-blue-600 font-medium py-2"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="block bg-blue-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
