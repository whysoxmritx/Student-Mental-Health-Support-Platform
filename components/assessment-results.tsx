'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react'
import type { AssessmentResult } from './stress-assessment'

interface AssessmentResultsProps {
  result: AssessmentResult
  onContinue: () => void
}

export function AssessmentResults({ result, onContinue }: AssessmentResultsProps) {
  const getOverallMessage = () => {
    switch (result.overall) {
      case 'low':
        return {
          title: 'Low Stress Level',
          message: 'You seem to be managing well. Keep maintaining healthy habits!',
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
        }
      case 'medium':
        return {
          title: 'Moderate Stress Level',
          message: 'You could benefit from some additional self-care. Check out our resources.',
          icon: AlertTriangle,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50 dark:bg-amber-900/20',
          borderColor: 'border-amber-200 dark:border-amber-800',
        }
      case 'high':
        return {
          title: 'High Stress Level',
          message: 'Consider reaching out for support. We have resources available.',
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
        }
    }
  }

  const overview = getOverallMessage()
  const Icon = overview.icon

  const getInsight = () => {
    const { academic, emotional, social } = result.scores
    const highest = Math.max(academic, emotional, social)

    if (academic === highest) {
      return 'Your academic stress is notably high. Consider time management strategies and breaking tasks into smaller steps.'
    } else if (emotional === highest) {
      return 'Your emotional fatigue is elevated. Practice self-compassion and consider activities that help you recharge.'
    } else {
      return 'Your social pressure is significant. Remember to set boundaries and engage in activities you truly enjoy.'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Overall Score Card */}
        <Card
          className={`p-8 mb-8 border-2 ${overview.borderColor} ${overview.bgColor} dark:text-white`}
        >
          <div className="flex items-start gap-4">
            <Icon className={`w-12 h-12 ${overview.color} flex-shrink-0`} />
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {overview.title}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                {overview.message}
              </p>
              <p className="text-gray-600 dark:text-gray-400 italic">
                {getInsight()}
              </p>
            </div>
          </div>
        </Card>

        {/* Category Breakdown */}
        <Card className="p-8 mb-8 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Stress Breakdown by Category
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Academic Stress', value: result.scores.academic, color: 'bg-blue-600' },
              { label: 'Emotional Fatigue', value: result.scores.emotional, color: 'bg-purple-600' },
              { label: 'Social Pressure', value: result.scores.social, color: 'bg-teal-600' },
            ].map((category, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {category.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    {category.value}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`${category.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${category.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={onContinue}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-6 text-lg"
          >
            View Recovery Plan & Resources
          </Button>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            All assessments are anonymous and private
          </p>
        </div>
      </div>
    </div>
  )
}
