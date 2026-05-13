'use client'

import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

import { useState } from 'react'
import {
  ShieldCheck,
  Lock,
  CreditCard,
} from 'lucide-react'
import { auth } from '@/app/firebase/config'

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment_response`,
      },
      redirect: 'if_required'
    })

    if (result.error) {
      setError(result.error.message)
    }
    else {
      // ✅ Payment Success (or redirecting)
      try {
        const user = auth.currentUser;
        if (user) {
          const token = await user.getIdToken();
          
          await fetch('/api/users', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token,
              plan: 'pro'
            })
          });
        }
      } catch (err) {
        console.error("Plan update failed:", err);
      }

      // If Stripe didn't redirect automatically, we do it now
      if (!result.error) {
        window.location.href = `${window.location.origin}/payment_response`;
      }
    }

    setLoading(false)
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="rounded-2xl bg-blue-500/20 p-3">
            <CreditCard className="text-blue-400" />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white">
              Complete Payment
            </h2>

            <p className="text-gray-400">
              Secure checkout powered by Stripe
            </p>
          </div>
        </div>
      </div>

      {/* Plan Summary */}
      <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Professional Plan
            </h3>

            <p className="text-gray-400">
              Monthly Subscription
            </p>
          </div>

          <div className="text-right">
            <p className="text-3xl font-black text-white">
              $9.99
            </p>

            <span className="text-gray-400">
              /month
            </span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit}>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <PaymentElement
            options={{
              layout: 'tabs',
            }}

          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {/* Security Info */}
        <div className="mt-6 flex flex-col gap-4 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} />
            SSL Secured Checkout
          </div>

          <div className="flex items-center gap-2">
            <Lock size={18} />
            256-bit Encryption
          </div>
        </div>

        {/* Pay Button */}
        <button
          disabled={!stripe || loading}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5 text-lg font-bold text-white shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            'Processing Payment...'
          ) : (
            'Pay $9.99 Securely'
          )}
        </button>
      </form>
    </div>
  )
}