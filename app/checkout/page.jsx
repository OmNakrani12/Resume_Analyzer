'use client'

import { useEffect, useState } from 'react'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import CheckoutForm from '@/components/CheckoutForm'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
)

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    fetch('/api/checkout', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      })
  }, [])

  if (!clientSecret) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        Loading Payment...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050816] px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="flex flex-col justify-center">
            <h1 className="mb-6 text-6xl font-black leading-tight text-white">
              Unlock Premium
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {' '}
                Resume AI
              </span>
            </h1>

            <p className="mb-8 text-lg text-gray-400">
              Advanced ATS analysis, AI resume optimization,
              interview preparation, and more.
            </p>

            <div className="space-y-4 text-white">
              {[
                'Unlimited Resume Uploads',
                'Advanced ATS Analysis',
                'AI Resume Optimization',
                'Priority Support',
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'night',
                  variables: {
                    colorPrimary: '#6366f1',
                    colorBackground: '#0f172a',
                    colorText: '#ffffff',
                    colorDanger: '#ef4444',
                    borderRadius: '16px',
                  },
                },
              }}
            >
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  )
}