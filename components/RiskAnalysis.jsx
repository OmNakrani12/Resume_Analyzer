'use client'

import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, XCircle, TrendingUp, Info } from 'lucide-react'

export default function RiskAnalysis({ riskData }) {
    if (!riskData) return null

    const {
        overall_risk_score = 0,
        risk_level = 'Unknown',
        red_flags = [],
        recommendations = [],
        detailed_analysis = {},
        metadata = {}
    } = riskData

    // Get risk level color
    const getRiskColor = () => {
        if (overall_risk_score <= 30) return {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-700',
            badge: 'bg-green-100 text-green-800',
            icon: CheckCircle
        }
        if (overall_risk_score <= 60) return {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-700',
            badge: 'bg-yellow-100 text-yellow-800',
            icon: AlertTriangle
        }
        return {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-700',
            badge: 'bg-red-100 text-red-800',
            icon: XCircle
        }
    }

    const riskColor = getRiskColor()
    const RiskIcon = riskColor.icon

    // Get severity color
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'High': return 'bg-red-100 text-red-700 border-red-300'
            case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
            case 'Low': return 'bg-blue-100 text-blue-700 border-blue-300'
            default: return 'bg-gray-100 text-gray-700 border-gray-300'
        }
    }

    return (
        <div className="space-y-6">
            {/* Risk Score Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${riskColor.bg} border-2 ${riskColor.border} rounded-xl p-8`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-full ${riskColor.badge}`}>
                            <RiskIcon size={32} className={riskColor.text} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">Risk Analysis</h3>
                            <p className="text-gray-600 mt-1">Authenticity verification score</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-5xl font-bold ${riskColor.text}`}>
                            {overall_risk_score}
                        </div>
                        <div className={`inline-block mt-2 px-4 py-1.5 rounded-full text-sm font-semibold ${riskColor.badge}`}>
                            {risk_level} Risk
                        </div>
                    </div>
                </div>

                {/* Risk Meter */}
                <div className="mt-6">
                    <div className="flex justify-between text-xs text-gray-600 mb-2">
                        <span>Low Risk</span>
                        <span>Medium Risk</span>
                        <span>High Risk</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${overall_risk_score}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-3 rounded-full ${overall_risk_score <= 30 ? 'bg-green-500' :
                                    overall_risk_score <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>0</span>
                        <span>30</span>
                        <span>60</span>
                        <span>100</span>
                    </div>
                </div>
            </motion.div>

            {/* Red Flags */}
            {red_flags.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <AlertTriangle className="text-orange-600" size={24} />
                        Red Flags Detected ({red_flags.length})
                    </h4>
                    <div className="space-y-3">
                        {red_flags.map((flag, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="border-l-4 border-orange-400 bg-orange-50 p-4 rounded-r-lg"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSeverityColor(flag.severity)}`}>
                                                {flag.severity}
                                            </span>
                                            <span className="font-semibold text-gray-900">{flag.category}</span>
                                        </div>
                                        <p className="text-gray-700 text-sm">{flag.description}</p>
                                    </div>
                                    <div className="ml-4 text-right">
                                        <div className="text-sm font-semibold text-orange-600">
                                            Impact: {flag.impact}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Detailed Analysis */}
            {detailed_analysis && Object.keys(detailed_analysis).length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <TrendingUp className="text-blue-600" size={24} />
                        Detailed Category Analysis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(detailed_analysis).map(([category, score], idx) => (
                            <motion.div
                                key={category}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + idx * 0.1 }}
                                className="bg-gray-50 rounded-lg p-4"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-gray-700 capitalize">
                                        {category.replace(/_/g, ' ')}
                                    </span>
                                    <span className={`text-lg font-bold ${score <= 30 ? 'text-green-600' :
                                            score <= 60 ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {score}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${score <= 30 ? 'bg-green-500' :
                                                score <= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${score}%` }}
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-lg p-6"
                >
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Info className="text-blue-600" size={24} />
                        Verification Recommendations
                    </h4>
                    <ul className="space-y-3">
                        {recommendations.map((rec, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg"
                            >
                                <Shield className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                                <span className="text-gray-700">{rec}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}

            {/* Metadata */}
            {metadata && Object.keys(metadata).length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-50 rounded-xl p-4"
                >
                    <h5 className="text-sm font-semibold text-gray-700 mb-3">Analysis Metadata</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        {Object.entries(metadata).map(([key, value]) => (
                            <div key={key}>
                                <div className="text-gray-500 capitalize">{key.replace(/_/g, ' ')}</div>
                                <div className="font-semibold text-gray-900">{value}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    )
}
