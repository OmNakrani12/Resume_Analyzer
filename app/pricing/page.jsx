'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  Sparkles,
  Rocket,
  Crown,
  X,
} from 'lucide-react'

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      icon: Rocket,
      price: 'Free',
      description: 'Perfect for students and beginners',
      features: [
        '1 Resume Upload / Month',
        'Basic ATS Score',
        'Skills Suggestions',
        'Email Support',
      ],
      notIncluded: ['Advanced AI Analysis'],
      type: 'free',
      gradient: 'from-slate-700 to-slate-900',
    },
    {
      id: 'pro',
      name: 'Professional',
      icon: Sparkles,
      price: '$9.99',
      period: '/month',
      priceId: 'price_1Sv2QjDr9paRgoCTzccqOIn3',
      description: 'Best for active job seekers',
      features: [
        'Unlimited Resume Uploads',
        'Advanced AI Analysis',
        'Resume Rewriting Tips',
        'Detailed Reports',
        'Priority Support',
      ],
      notIncluded: [],
      type: 'paid',
      highlight: true,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      icon: Crown,
      price: '$29.99',
      period: '/month',
      priceId: 'price_1SvEhSDr9paRgoCT1jPiB2TF',
      description: 'Built for teams and professionals',
      features: [
        'Everything in Pro',
        'API Access',
        'Dedicated Consultant',
        'Priority Support',
        'Custom Integrations',
      ],
      notIncluded: [],
      type: 'enterprise',
      gradient: 'from-orange-500 via-red-500 to-pink-500',
    },
  ]

  const handleContinue = async () => {
    if (!selectedPlan) return

    if (selectedPlan.type === 'free') {
      window.location.href = '/signup'
      return
    }

    if (selectedPlan.type === 'enterprise') {
      window.location.href = '/contact'
      return
    }

    try {
      setLoading(true)

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: selectedPlan.priceId,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Payment failed')
      }

      window.location.href = '/checkout'
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#050816] py-24 px-4 text-white">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-xl">
            <Sparkles size={16} />
            AI Resume Analyzer Pricing
          </div>

          <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
            Upgrade Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {' '}
              Career Journey
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl">
            Improve ATS score, optimize your resume, and land interviews faster.
          </p>
        </motion.div>

        {/* Pricing Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const isSelected = selectedPlan?.id === plan.id

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                onClick={() => setSelectedPlan(plan)}
                className={`relative cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isSelected
                    ? 'border-blue-500 bg-white/10 shadow-2xl shadow-blue-500/20'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                } backdrop-blur-2xl`}
              >
                {/* Glow Layer */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10`}
                />

                {/* Popular Badge */}
                {plan.highlight && (
                  <div className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1 text-xs font-bold tracking-wide text-white">
                    MOST POPULAR
                  </div>
                )}

                <div className="relative z-10 p-8">
                  {/* Icon */}
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${plan.gradient}`}
                  >
                    <Icon size={28} />
                  </div>

                  {/* Name */}
                  <h2 className="mb-2 text-3xl font-bold">
                    {plan.name}
                  </h2>

                  <p className="mb-8 text-gray-400">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8 flex items-end gap-2">
                    <span className="text-5xl font-black">
                      {plan.price}
                    </span>

                    {plan.period && (
                      <span className="mb-1 text-gray-400">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20">
                          <Check
                            size={14}
                            className="text-green-400"
                          />
                        </div>

                        <span className="text-gray-200">
                          {feature}
                        </span>
                      </div>
                    ))}

                    {plan.notIncluded.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 opacity-40"
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
                          <X
                            size={14}
                            className="text-red-400"
                          />
                        </div>

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Selected */}
                  {isSelected && (
                    <div className="mt-8 rounded-xl border border-blue-500/30 bg-blue-500/10 py-3 text-center font-semibold text-blue-400">
                      ✓ Selected Plan
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 text-center"
          >
            <button
              disabled={loading}
              onClick={handleContinue}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-12 py-5 text-lg font-bold text-white shadow-2xl shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-purple-500/40 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? 'Processing...'
                : selectedPlan.type === 'free'
                ? 'Start Free'
                : selectedPlan.type === 'enterprise'
                ? 'Contact Sales'
                : 'Upgrade Now'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}