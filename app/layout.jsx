import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/lib/context/AuthContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Resume Analyzer - AI Powered ATS Resume Scanner',
  description:
    'Optimize your resume using AI-powered ATS analysis and increase your interview chances.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#050816] text-white antialiased overflow-x-hidden`}
      >
        {/* Background Layer */}
        <div className="fixed inset-0 -z-50 overflow-hidden">
          {/* Base Background */}
          <div className="absolute inset-0 bg-[#050816]" />

          {/* Blue Glow */}
          <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[120px]" />

          {/* Purple Glow */}
          <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]" />

          {/* Pink Glow */}
          <div className="absolute left-[30%] top-[40%] h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-[120px]" />

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Radial Fade */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050816_80%)]" />
        </div>

        {/* Main Wrapper */}
        <div className="relative z-10 flex min-h-screen flex-col">
          {/* Navigation */}
          <AuthProvider>
            <Navigation />

            {/* Main Content */}
            <main className="flex-1">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </AuthProvider>
        </div>
      </body>
    </html>
  )
}