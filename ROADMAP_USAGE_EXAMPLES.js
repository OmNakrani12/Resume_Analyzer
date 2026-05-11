/**
 * Roadmap Generator Usage Examples
 * How to use the AI-powered learning roadmap generator
 */

// ============================================
// Example 1: Generate Roadmap via API Endpoint
// ============================================

async function generateRoadmapDirectly() {
  const response = await fetch('/api/roadmap', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      skills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
      role: 'Senior Full Stack Developer'
    })
  })

  const result = await response.json()
  if (result.success) {
    console.log('Roadmap generated:', result.data)
    // Use result.data with LearningRoadmap component
  }
}

// ============================================
// Example 2: Use in Resume Analysis
// ============================================

async function analyzeResumeWithRoadmap(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/analysis', {
    method: 'POST',
    body: formData
  })

  const result = await response.json()
  if (result.success) {
    // Roadmap is now included in the analysis response
    const { roadmap } = result.data
    console.log('AI-Generated Roadmap:', roadmap)
    // roadmap includes:
    // - items: Array of skills with learning paths
    // - phases: Learning timeline
    // - total_time: Estimated completion time
    // - career_impact: AI analysis of career benefits
    // - source: 'ai-generated' or 'static-fallback'
  }
}

// ============================================
// Example 3: React Component Usage
// ============================================

import LearningRoadmap from '@/components/LearningRoadmap'

export default function AnalysisResults({ analysisData }) {
  return (
    <div>
      {/* Display the AI-generated roadmap */}
      <LearningRoadmap 
        roadmapData={{
          items: analysisData.roadmap.items,
          phases: analysisData.roadmap.phases,
          total_time: analysisData.roadmap.total_time,
          career_impact: analysisData.roadmap.career_impact,
          source: analysisData.roadmap.source
        }}
      />
    </div>
  )
}

// ============================================
// Example 4: Custom Skills Roadmap
// ============================================

async function createCustomRoadmap(targetRole, currentSkills) {
  const skillsToLearn = [
    'Advanced React Patterns',
    'Microservices Architecture',
    'Kubernetes',
    'GraphQL',
    'System Design'
  ]

  try {
    const response = await fetch('/api/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skills: skillsToLearn,
        role: targetRole
      })
    })

    const { data } = await response.json()
    
    console.log('📚 Learning Path Generated:')
    data.roadmap.forEach((item, index) => {
      console.log(`
        ${index + 1}. ${item.skill}
        ⏱️ Time: ${item.estimated_time}
        📈 Priority: ${item.priority}
        📝 Description: ${item.description}
        💡 Learning Path: ${item.learning_path}
        🚀 Project: ${item.practical_project}
      `)
    })

    console.log('\n📅 Learning Phases:')
    data.phases.forEach(phase => {
      console.log(`Phase ${phase.phase}: ${phase.name}`)
      console.log(`Duration: ${phase.duration}`)
      console.log(`Skills: ${phase.skills.join(', ')}`)
    })

    console.log('\n💼 Career Impact:')
    console.log(data.career_impact)

    return data
  } catch (error) {
    console.error('Error generating roadmap:', error)
  }
}

// ============================================
// Example 5: Track Progress
// ============================================

async function trackRoadmapProgress() {
  // Get stored roadmap
  const roadmapData = localStorage.getItem('userRoadmap')
  const roadmap = JSON.parse(roadmapData)

  // Mark milestone as completed
  roadmap.items.forEach(item => {
    item.completedMilestones = item.milestones.slice(0, 1) // User completed first milestone
  })

  // Calculate progress
  const totalMilestones = roadmap.items.reduce((sum, item) => {
    return sum + (item.milestones?.length || 0)
  }, 0)

  const completedMilestones = roadmap.items.reduce((sum, item) => {
    return sum + (item.completedMilestones?.length || 0)
  }, 0)

  const progressPercentage = (completedMilestones / totalMilestones) * 100
  console.log(`Progress: ${progressPercentage.toFixed(1)}%`)

  return progressPercentage
}

// ============================================
// Example 6: Filter Roadmap by Priority
// ============================================

function filterRoadmapByPriority(roadmap, priority) {
  return roadmap.items.filter(item => item.priority === priority)
}

// Usage
const importantSkills = filterRoadmapByPriority(roadmapData, 'High')
console.log('High Priority Skills:', importantSkills)

// ============================================
// Example 7: Export Roadmap
// ============================================

async function exportRoadmapAsJSON() {
  const roadmapData = localStorage.getItem('userRoadmap')
  const dataStr = JSON.stringify(JSON.parse(roadmapData), null, 2)
  
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'my-learning-roadmap.json'
  link.click()
}

// ============================================
// Example 8: AI Response Structure
// ============================================

/*
{
  "success": true,
  "data": {
    "roadmap": [
      {
        "skill": "React",
        "description": "React is essential for building modern user interfaces...",
        "estimated_time": "2-3 months",
        "priority": "High",
        "learning_path": "Start with fundamentals through the official React documentation, then build practice projects...",
        "resources": [
          {
            "name": "React Official Docs",
            "type": "Documentation",
            "url": "https://react.dev/"
          },
          {
            "name": "React: The Complete Guide",
            "type": "Course",
            "url": "https://www.udemy.com/course/react-the-complete-guide/"
          }
        ],
        "milestones": [
          "Master JSX syntax and component basics",
          "Build your first React application",
          "Master hooks and state management",
          "Optimize performance with React profiling"
        ],
        "practical_project": "Build a full-featured e-commerce storefront with product filtering, cart, and checkout"
      }
    ],
    "phases": [
      {
        "phase": 1,
        "name": "Foundation Building",
        "duration": "0-3 months",
        "skills": ["React", "Node.js"],
        "focus": "Master core technologies essential for your role"
      }
    ],
    "total_estimated_time": "8-10 months",
    "career_impact": "Mastering these skills will elevate you to a Senior Full Stack Developer position...",
    "source": "ai-generated"
  }
}
*/

// ============================================
// Example 9: Error Handling
// ============================================

async function generateRoadmapWithErrorHandling() {
  try {
    const response = await fetch('/api/roadmap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skills: ['React', 'Node.js'],
        role: 'Full Stack Developer'
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()

    if (!result.success) {
      console.error('Roadmap generation failed:', result.error)
      // Fallback UI or alternative action
      return null
    }

    return result.data
  } catch (error) {
    console.error('Failed to generate roadmap:', error)
    // Show user-friendly error message
    alert('Unable to generate roadmap. Please try again later.')
    return null
  }
}

// ============================================
// Example 10: Integrate with Form
// ============================================

async function handleRoadmapForm(event) {
  event.preventDefault()
  
  const formData = new FormData(event.target)
  const skills = formData.getAll('skills')
  const role = formData.get('role')

  // Validate
  if (!skills.length || !role) {
    alert('Please select skills and role')
    return
  }

  // Generate roadmap
  const response = await fetch('/api/roadmap', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ skills, role })
  })

  const result = await response.json()

  if (result.success) {
    // Display roadmap
    displayRoadmap(result.data)
    
    // Save to localStorage
    localStorage.setItem('userRoadmap', JSON.stringify(result.data))
  }
}

export {
  generateRoadmapDirectly,
  analyzeResumeWithRoadmap,
  createCustomRoadmap,
  trackRoadmapProgress,
  filterRoadmapByPriority,
  exportRoadmapAsJSON,
  generateRoadmapWithErrorHandling,
  handleRoadmapForm
}
