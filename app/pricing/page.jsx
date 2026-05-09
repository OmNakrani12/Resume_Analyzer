'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'

export default function Pricing() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(false)

  const plans = [
    {
      id: 'free',
      name: 'Starter',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Upload 1 resume per month',
        'Basic score analysis',
        'Skills suggestions',
        'Email support',
      ],
      notIncluded: [
        'Unlimited uploads',
        'Advanced AI analysis',
      ],
      type: 'free',
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$9.99',
      period: '/month',
      priceId: 'price_1Sv2QjDr9paRgoCTzccqOIn3', // ✅ REAL STRIPE PRICE ID
      description: 'For active job seekers',
      features: [
        'Unlimited resume uploads',
        'Advanced AI analysis',
        'Resume rewriting tips',
        'Monthly reports',
      ],
      notIncluded: ['Dedicated consultant'],
      type: 'paid',
      highlight: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$29.99',
      period: '/month',
      priceId: 'price_1SvEhSDr9paRgoCT1jPiB2TF',
      description: 'For professionals & teams',
      features: [
        'Everything in Pro',
        'Priority support',
        'Dedicated consultant',
        'API access',
      ],
      notIncluded: [],
      type: 'enterprise',
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: selectedPlan.priceId }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Payment failed')
      }

      window.location.href = data.url
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 text-xl">
            Select a plan that fits your career goals
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isSelected = selectedPlan?.id === plan.id

            return (
              <motion.div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                whileHover={{ y: -6 }}
                className={`cursor-pointer rounded-xl p-8 transition border ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 shadow-xl'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                {plan.highlight && (
                  <div className="mb-3 inline-block rounded-full bg-blue-600 px-4 py-1 text-sm text-white">
                    Most Popular
                  </div>
                )}

                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <p className="text-gray-600 mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="text-green-600" size={18} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Not Included */}
                {plan.notIncluded.length > 0 && (
                  <div className="pt-4 border-t space-y-2 text-gray-500">
                    {plan.notIncluded.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <X size={18} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                )}

                {isSelected && (
                  <div className="mt-6 text-center text-blue-600 font-semibold">
                    ✓ Selected
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Continue Button */}
        {selectedPlan && (
          <div className="mt-16 text-center">
            <button
              disabled={loading}
              onClick={handleContinue}
              className="px-10 py-4 text-lg font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading
                ? 'Processing...'
                : selectedPlan.type === 'free'
                ? 'Continue with Free'
                : selectedPlan.type === 'enterprise'
                ? 'Contact Sales'
                : 'Proceed to Payment'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
