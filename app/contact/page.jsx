'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Sparkles, MessageSquare, Globe, ArrowRight, Rocket } from 'lucide-react'

function ContactForm() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (plan === 'enterprise') {
      setFormData(prev => ({
        ...prev,
        subject: 'enterprise',
        message: 'I am interested in the Enterprise plan for my team. Please provide more details on custom integrations and API access.'
      }))
    }
  }, [plan])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'om51ppsv20232@gmail.com',
          subject: `Contact Form: ${formData.subject}`,
          message: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'sales@resunexa.ai',
      description: 'Our team typically responds within 2 hours.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: plan === 'enterprise' ? Sparkles : MessageSquare,
      title: plan === 'enterprise' ? 'Dedicated Manager' : 'Priority Support',
      content: plan === 'enterprise' ? '1-on-1 Strategy' : 'Expert Assistance',
      description: plan === 'enterprise' ? 'A personal expert to guide your hiring strategy.' : 'Priority handling for all your queries.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: plan === 'enterprise' ? Rocket : Globe,
      title: plan === 'enterprise' ? 'Priority Onboarding' : 'Global Office',
      content: plan === 'enterprise' ? '24-Hour Setup' : 'San Francisco, CA',
      description: plan === 'enterprise' ? 'Get your entire team up and running in a day.' : '123 Innovation Way, Suite 400',
      gradient: 'from-orange-500 to-red-500'
    },
  ]

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] py-24 px-4 text-white">
      {/* Background Blurs */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px] animate-pulse" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm backdrop-blur-xl">
            <Sparkles size={16} className="text-blue-400" />
            {plan === 'enterprise' ? 'Enterprise Inquiry' : 'Contact Our Team'}
          </div>

          <h1 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
            {plan === 'enterprise' ? (
              <>
                Scale Your <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Business</span>
              </>
            ) : (
              <>
                Let's Start a <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Conversation</span>
              </>
            )}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl">
            {plan === 'enterprise' 
              ? 'Our enterprise experts are ready to help you optimize your hiring workflow at scale.'
              : "Have questions about our AI analysis? We're here to help you navigate your career journey."
            }
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            {contactInfo.map((info, idx) => {
              const Icon = info.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all duration-300 hover:border-white/20"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                  
                  <div className="flex items-start gap-6">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${info.gradient} text-white shadow-lg shadow-blue-500/20`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{info.title}</h3>
                      <p className="text-lg font-semibold text-blue-400 mb-1">{info.content}</p>
                      <p className="text-sm text-gray-400">{info.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Social Proof/Trust */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="rounded-3xl border border-dashed border-white/20 p-8 text-center"
            >
              <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-4">Trusted by professionals at</p>
              <div className="flex flex-wrap justify-center gap-6 grayscale opacity-50">
                {/* Simplified placeholder for logos */}
                <span className="text-xl font-black">GOOGLE</span>
                <span className="text-xl font-black">META</span>
                <span className="text-xl font-black">APPLE</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-12 backdrop-blur-2xl shadow-2xl">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
              
              <h2 className="relative z-10 mb-8 text-3xl font-bold">Send us a message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <Send size={40} />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-400">We've received your inquiry and will get back to you shortly.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-blue-400 hover:underline font-medium"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-blue-500 focus:bg-white/10"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-blue-500 focus:bg-white/10"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-blue-500 focus:bg-white/10 appearance-none"
                      required
                    >
                      <option value="" className="bg-[#050816]">Select an option</option>
                      <option value="enterprise" className="bg-[#050816]">Enterprise Inquiry</option>
                      <option value="support" className="bg-[#050816]">Technical Support</option>
                      <option value="billing" className="bg-[#050816]">Billing Question</option>
                      <option value="other" className="bg-[#050816]">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white outline-none transition focus:border-blue-500 focus:bg-white/10 resize-none"
                      placeholder="How can we help you today?"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-5 text-lg font-bold text-white shadow-xl shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/30 disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                    <Send size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    }>
      <ContactForm />
    </Suspense>
  )
}
