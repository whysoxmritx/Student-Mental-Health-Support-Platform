'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, CheckCircle2 } from 'lucide-react'
import type { AssessmentResult } from './stress-assessment'

interface RecoveryPlanProps {
  result: AssessmentResult
}

const LOW_STRESS_PLAN = [
  { day: 1, action: 'Maintain your current sleep schedule consistently' },
  { day: 2, action: 'Take a 15-minute walk in nature or outdoors' },
  { day: 3, action: 'Practice gratitude - write down 3 things you\'re grateful for' },
  { day: 4, action: 'Spend 10 minutes on a hobby you enjoy' },
  { day: 5, action: 'Connect with a friend or family member' },
  { day: 6, action: 'Try a new healthy recipe and share it with someone' },
  { day: 7, action: 'Reflect on your progress and celebrate your wins' },
]

const MEDIUM_STRESS_PLAN = [
  { day: 1, action: 'Start a 5-minute morning meditation or breathing exercise' },
  { day: 2, action: 'Organize one area of your space (desk, bedroom, etc.)' },
  { day: 3, action: 'Identify 3 stressors and write down one action for each' },
  { day: 4, action: 'Practice saying "no" to one non-essential commitment' },
  { day: 5, action: 'Engage in 20 minutes of physical activity you enjoy' },
  { day: 6, action: 'Journal about your feelings and what you\'ve learned' },
  { day: 7, action: 'Schedule a break or relaxation activity just for you' },
]

const HIGH_STRESS_PLAN = [
  { day: 1, action: 'Reach out to someone you trust and talk about how you\'re feeling' },
  { day: 2, action: 'Create a simple daily routine with 3 realistic tasks' },
  { day: 3, action: 'Spend 10 minutes on progressive muscle relaxation' },
  { day: 4, action: 'Remove one stressor or delegate a task' },
  { day: 5, action: 'Engage in activities that bring you joy or peace' },
  { day: 6, action: 'Practice self-compassion - write yourself a supportive message' },
  { day: 7, action: 'Review this week and identify professional support if needed' },
]

export function RecoveryPlan({ result }: RecoveryPlanProps) {
  const getPlan = () => {
    switch (result.overall) {
      case 'low':
        return { plan: LOW_STRESS_PLAN, color: 'text-green-600', bgColor: 'bg-green-50 dark:bg-green-900/20' }
      case 'medium':
        return {
          plan: MEDIUM_STRESS_PLAN,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        }
      case 'high':
        return { plan: HIGH_STRESS_PLAN, color: 'text-red-600', bgColor: 'bg-red-50 dark:bg-red-900/20' }
    }
  }

  const { plan, color, bgColor } = getPlan()

  const downloadPlan = () => {
    const planText = `7-Day Recovery Plan\n${'='.repeat(50)}\n\nStress Level: ${result.overall.toUpperCase()}\n\n${plan
      .map(item => `Day ${item.day}: ${item.action}`)
      .join('\n\n')}\n\n${'='.repeat(50)}\nRemember: Progress over perfection!`

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(planText))
    element.setAttribute('download', 'recovery-plan.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <Card className={`p-8 border-2 ${bgColor} dark:border-gray-700`}>
        <h2 className={`text-2xl font-bold ${color} dark:text-white mb-2`}>
          Your Personalized 7-Day Recovery Plan
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Small steps each day can lead to meaningful changes. Start today!
        </p>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {plan.map(item => (
          <Card key={item.day} className="p-6 hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-300">Day {item.day}</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">{item.action}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg p-6 space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Pro Tips</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• Check off tasks as you complete them</li>
              <li>• Adapt the plan to fit your needs</li>
              <li>• Track how you feel each day</li>
              <li>• Be kind to yourself if you miss a day</li>
            </ul>
          </div>
        </div>
      </div>

      <Button
        onClick={downloadPlan}
        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
      >
        <Download className="w-4 h-4 mr-2" />
        Download Plan as Text File
      </Button>
    </div>
  )
}
