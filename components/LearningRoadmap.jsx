'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, BookOpen, ExternalLink, Award, Target } from 'lucide-react'

export default function LearningRoadmap({ roadmapData }) {
    if (!roadmapData) return null

    const { items, phases, total_time, role } = roadmapData

    const priorityColors = {
        'High': 'bg-red-100 text-red-700 border-red-300',
        'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-300',
        'Low': 'bg-green-100 text-green-700 border-green-300'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <MapPin className="text-purple-600" size={28} />
                        Learning Roadmap
                    </h3>
                    <p className="text-gray-600 mt-1">Personalized path to become a better {role}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Total Time</p>
                    <p className="text-2xl font-bold text-purple-600">{total_time}</p>
                </div>
            </div>

            {/* Phases Timeline */}
            {phases && phases.length > 0 && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                        <Target size={20} className="text-purple-600" />
                        Learning Phases
                    </h4>
                    <div className="space-y-3">
                        {phases.map((phase, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + idx * 0.1 }}
                                className="bg-white rounded-lg p-4 border-l-4 border-purple-500"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h5 className="font-semibold text-gray-900">Phase {phase.phase}: {phase.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{phase.focus}</p>
                                    </div>
                                    <span className="text-sm font-medium text-purple-600 whitespace-nowrap">{phase.duration}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {phase.skills.map((skill, skillIdx) => (
                                        <span
                                            key={skillIdx}
                                            className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Detailed Roadmap Items */}
            <div>
                <h4 className="font-semibold text-gray-900 mb-4">Detailed Learning Path</h4>
                <div className="space-y-4">
                    {items.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                            className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-md transition"
                        >
                            {/* Skill Header */}
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h5 className="text-lg font-bold text-gray-900">{item.skill}</h5>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${priorityColors[item.priority]}`}>
                                            {item.priority} Priority
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                                <div className="flex items-center gap-1 text-gray-600 ml-4">
                                    <Clock size={16} />
                                    <span className="text-sm font-medium">{item.estimated_time}</span>
                                </div>
                            </div>

                            {/* Resources */}
                            <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                                    <BookOpen size={16} />
                                    Learning Resources
                                </p>
                                <div className="grid md:grid-cols-2 gap-2">
                                    {item.resources.map((resource, resIdx) => (
                                        <a
                                            key={resIdx}
                                            href={resource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Award size={16} className="text-purple-600" />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 group-hover:text-purple-700">
                                                        {resource.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{resource.type}</p>
                                                </div>
                                            </div>
                                            <ExternalLink size={14} className="text-gray-400 group-hover:text-purple-600" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white text-center"
            >
                <h4 className="text-xl font-bold mb-2">Ready to Start Your Journey?</h4>
                <p className="text-purple-100 mb-4">
                    Follow this roadmap consistently and track your progress to achieve your career goals
                </p>
                <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition">
                    Save Roadmap
                </button>
            </motion.div>
        </motion.div>
    )
}
