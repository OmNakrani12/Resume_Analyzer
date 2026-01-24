'use client'

import { motion } from 'framer-motion'
import {
    Sparkles, Rocket, Shield, Zap, Users, Trophy,
    CheckCircle2, Star, TrendingUp, Award, Clock, Globe
} from 'lucide-react'

export default function AboutAlternative() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4">
                    <div className="max-w-6xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 px-6 py-2 rounded-full mb-8">
                                <Sparkles className="text-purple-300" size={20} />
                                <span className="text-purple-200 font-medium">Next-Gen Resume Intelligence</span>
                            </div>

                            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
                                Revolutionize Your
                                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                                    Career Journey
                                </span>
                            </h1>

                            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
                                Harness the power of artificial intelligence to transform your resume into a career-launching masterpiece. Stand out, get noticed, land your dream job.
                            </p>

                            <div className="flex gap-4 justify-center flex-wrap">
                                <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-105">
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Rocket size={20} />
                                        Launch Analysis
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </button>

                                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl font-bold text-white hover:bg-white/20 transition">
                                    Learn More
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Floating Stats */}
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { icon: Users, value: '50K+', label: 'Happy Users', color: 'from-blue-500 to-cyan-500' },
                                { icon: Trophy, value: '98%', label: 'Success Rate', color: 'from-purple-500 to-pink-500' },
                                { icon: Clock, value: '< 60s', label: 'Analysis Time', color: 'from-orange-500 to-red-500' },
                                { icon: Globe, value: '120+', label: 'Countries', color: 'from-green-500 to-emerald-500' }
                            ].map((stat, idx) => {
                                const Icon = stat.icon
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="relative group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                                            style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}></div>
                                        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                                                <Icon className="text-white" size={28} />
                                            </div>
                                            <p className="text-4xl font-black text-white mb-2">{stat.value}</p>
                                            <p className="text-gray-300">{stat.label}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl font-black text-white mb-4">
                                Supercharged Features
                            </h2>
                            <p className="text-xl text-gray-300">
                                Everything you need to dominate the job market
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { icon: Zap, title: 'Lightning Fast', desc: 'Get results in under 60 seconds', color: 'yellow' },
                                { icon: Shield, title: 'Bank-Level Security', desc: 'Your data is encrypted end-to-end', color: 'blue' },
                                { icon: TrendingUp, title: 'Smart Analytics', desc: 'AI-powered insights and recommendations', color: 'green' },
                                { icon: Star, title: 'ATS Optimized', desc: 'Beat applicant tracking systems', color: 'purple' },
                                { icon: Award, title: 'Expert Approved', desc: 'Trusted by HR professionals', color: 'pink' },
                                { icon: Rocket, title: 'Career Boost', desc: '3x more interview callbacks', color: 'orange' }
                            ].map((feature, idx) => {
                                const Icon = feature.icon
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        className="group relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-white/30 transition">
                                            <div className="mb-4">
                                                <Icon className="text-purple-400" size={40} />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                            <p className="text-gray-400">{feature.desc}</p>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="py-20 px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12">
                            <div className="grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-4xl font-black text-white mb-6">
                                        Why We're Different
                                    </h2>
                                    <div className="space-y-4">
                                        {[
                                            'AI trained on 1M+ successful resumes',
                                            'Real-time ATS compatibility checking',
                                            'Industry-specific optimization',
                                            'Personalized skill gap analysis',
                                            'Career roadmap generation',
                                            'Unlimited revisions & exports'
                                        ].map((item, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-center gap-3"
                                            >
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                                                    <CheckCircle2 size={16} className="text-white" />
                                                </div>
                                                <span className="text-gray-200 text-lg">{item}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-50"></div>
                                    <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
                                        <div className="space-y-6">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-semibold">Resume Score</span>
                                                    <span className="text-3xl font-black">94</span>
                                                </div>
                                                <div className="bg-white/30 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: '94%' }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: 0.5 }}
                                                        className="bg-white h-full rounded-full"
                                                    ></motion.div>
                                                </div>
                                            </div>

                                            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-semibold">ATS Match</span>
                                                    <span className="text-3xl font-black">89</span>
                                                </div>
                                                <div className="bg-white/30 rounded-full h-3 overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: '89%' }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: 0.7 }}
                                                        className="bg-white h-full rounded-full"
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="mt-6 text-purple-100 text-sm">
                                            See exactly how your resume performs before you apply
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl font-black text-white mb-6">
                                Ready to Transform Your Career?
                            </h2>
                            <p className="text-xl text-gray-300 mb-10">
                                Join 50,000+ professionals who've upgraded their resumes with AI
                            </p>
                            <button className="group relative px-12 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl font-black text-white text-xl overflow-hidden transition-all hover:scale-105">
                                <span className="relative z-10 flex items-center gap-3">
                                    <Rocket size={24} />
                                    Start Free Analysis
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </button>
                            <p className="mt-4 text-gray-400 text-sm">No credit card required • Results in 60 seconds</p>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    )
}
