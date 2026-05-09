'use client'

import React, { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Sparkles, ShieldCheck, Zap } from 'lucide-react'

const AuthLayout = ({ children, title, subtitle }) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth follow effect
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Dynamic Background Beam */}
      <motion.div 
        style={{
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%'
        }}
        className="absolute w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0"
      />

      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-[15%] text-indigo-500/20"
        >
          <Zap size={120} strokeWidth={0.5} />
        </motion.div>
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-[15%] text-blue-500/20"
        >
          <ShieldCheck size={140} strokeWidth={0.5} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1100px] flex flex-col md:flex-row bg-[#080c17]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Left Section: Info Panel */}
        <div className="w-full md:w-[40%] bg-gradient-to-br from-indigo-600/10 to-transparent p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/40">
                <Sparkles className="text-white w-6 h-6" />
              </div>

              <span className="text-xl font-bold text-white tracking-tight">
                ResumeAI
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-6">
              Build a <br />

              <span className="bg-gradient-to-r from-indigo-700 to-blue-400 bg-clip-text text-transparent italic">
                Job-Winning
              </span>

              <br />
              Resume.
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed max-w-[320px]">
              Analyze resumes instantly with AI-powered insights,
              ATS optimization, skill detection, and personalized
              improvement recommendations.
            </p>
          </div>

          <div className="mt-12">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#080c17] bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white"
                >
                  U{i}
                </div>
              ))}

              <div className="w-10 h-10 rounded-full border-2 border-[#080c17] bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                +25k
              </div>
            </div>

            <p className="text-slate-500 text-sm font-medium">
              Trusted by students, developers, and professionals worldwide.
            </p>
          </div>
        </div>

        {/* Right Section: Form Area */}
        <div className="flex-1 p-8 md:p-16 relative">
          <div className="max-w-md mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
              <p className="text-slate-400 font-medium">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthLayout
