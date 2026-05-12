'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  Info,
  Layers,
  Sparkles,
  Search,
  Zap
} from 'lucide-react'

export default function RiskAnalysis({ riskData }) {
    if (!riskData) return null

    const {
        overall_risk_score = 0,
        risk_level = 'Unknown',
        red_flags = [],
        recommendations = [],
        project_analysis = {
            authenticity_score: 0,
            detail_level: 'Unknown',
            observation: ''
        },
        metadata = {}
    } = riskData

    // Get risk level visual config
    const getRiskConfig = () => {
        if (overall_risk_score <= 30) return {
            gradient: 'from-emerald-500/20 to-teal-500/10',
            border: 'border-emerald-500/20',
            text: 'text-emerald-400',
            glow: 'shadow-emerald-500/10',
            icon: CheckCircle
        }
        if (overall_risk_score <= 60) return {
            gradient: 'from-amber-500/20 to-orange-500/10',
            border: 'border-amber-500/20',
            text: 'text-amber-400',
            glow: 'shadow-amber-500/10',
            icon: AlertTriangle
        }
        return {
            gradient: 'from-rose-500/20 to-red-500/10',
            border: 'border-rose-500/20',
            text: 'text-rose-400',
            glow: 'shadow-rose-500/10',
            icon: XCircle
        }
    }

    const config = getRiskConfig()
    const RiskIcon = config.icon

    return (
        <div className="space-y-8 pb-12">
            
            {/* Main Risk Score Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`relative overflow-hidden rounded-[2.5rem] border ${config.border} bg-gradient-to-br ${config.gradient} p-10 backdrop-blur-3xl ${config.glow}`}
            >
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Shield size={120} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <div className={`p-5 rounded-[1.5rem] bg-white/5 border border-white/10 ${config.text}`}>
                            <RiskIcon size={40} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-white tracking-tight">Risk Evaluation</h3>
                            <p className="text-slate-400 mt-1 font-medium">AI-driven authenticity & consistency audit</p>
                        </div>
                    </div>

                    <div className="text-center md:text-right">
                        <div className={`text-7xl font-black ${config.text}`}>
                            {overall_risk_score}
                        </div>
                        <div className={`inline-block mt-3 px-6 py-2 rounded-2xl text-sm font-bold tracking-wider uppercase border ${config.border} bg-white/5 ${config.text}`}>
                            {risk_level} Risk Level
                        </div>
                    </div>
                </div>

                {/* Risk Progress Meter */}
                <div className="relative z-10 mt-10">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">
                        <span>Safe</span>
                        <span>Elevated</span>
                        <span>Critical</span>
                    </div>
                    <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${overall_risk_score}%` }}
                            transition={{ duration: 1.5, ease: 'circOut' }}
                            className={`h-full rounded-full bg-gradient-to-r from-transparent via-white/20 to-white/60`}
                        />
                    </div>
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
                
                {/* Red Flags Section */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
                            <AlertTriangle className="text-rose-400" size={20} />
                        </div>
                        <h4 className="text-xl font-bold text-white">Critical Red Flags</h4>
                    </div>

                    {red_flags.length > 0 ? (
                        <div className="space-y-4">
                            {red_flags.map((flag, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    className="group relative bg-white/5 border border-white/5 hover:border-rose-500/30 p-5 rounded-2xl transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md bg-white/5 ${
                                            flag.severity === 'High' ? 'text-rose-400' : 'text-amber-400'
                                        }`}>
                                            {flag.severity}
                                        </span>
                                        <span className="text-slate-500 text-xs font-bold">Impact: {flag.impact}</span>
                                    </div>
                                    <h5 className="text-white font-bold mb-1">{flag.category}</h5>
                                    <p className="text-slate-400 text-sm leading-relaxed">{flag.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                            <CheckCircle className="text-emerald-500/50 mb-4" size={48} />
                            <p className="text-slate-400 font-medium">No major inconsistencies detected.</p>
                        </div>
                    )}
                </motion.div>

                <div className="space-y-8">
                    
                    {/* Project Analysis Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 blur-[60px] rounded-full" />
                        
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                                <Layers className="text-indigo-400" size={20} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Project Authenticity Analysis</h4>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Authenticity Score</p>
                                <p className="text-3xl font-black text-white">{project_analysis.authenticity_score}%</p>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Detail Level</p>
                                <p className="text-lg font-bold text-indigo-400">{project_analysis.detail_level}</p>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 border-l-4 border-l-indigo-500">
                            <div className="flex gap-3">
                                <Search className="text-indigo-400 shrink-0 mt-1" size={18} />
                                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                                    {project_analysis.observation || "Detailed project audit results will appear here after AI analysis."}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Recommendations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 rounded-[2rem] p-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                <Zap className="text-indigo-400" size={20} />
                            </div>
                            <h4 className="text-xl font-bold text-white">Verification Steps</h4>
                        </div>

                        <div className="grid gap-3">
                            {recommendations.map((rec, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                    <span className="text-slate-300 text-sm font-medium">{rec}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
