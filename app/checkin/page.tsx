'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const QUESTIONS = [
  {
    id: 'mood',
    category: 'Emotional Wellbeing',
    question: 'How would you describe your overall mood today?',
    type: 'radio',
    options: [
      { value: '5', label: 'Excellent - I feel great' },
      { value: '4', label: 'Good - I feel fine' },
      { value: '3', label: 'Okay - I feel neutral' },
      { value: '2', label: 'Poor - I feel down' },
      { value: '1', label: 'Very Poor - I feel terrible' },
    ],
  },
  {
    id: 'anxiety',
    category: 'Emotional Wellbeing',
    question: 'How would you rate your anxiety level?',
    type: 'radio',
    options: [
      { value: '1', label: 'No anxiety - I feel calm' },
      { value: '2', label: 'Mild - Slightly anxious' },
      { value: '3', label: 'Moderate - Noticeably anxious' },
      { value: '4', label: 'Significant - Very anxious' },
      { value: '5', label: 'Severe - Extremely anxious' },
    ],
  },
  {
    id: 'sleep',
    category: 'Physical Health',
    question: 'How well did you sleep last night?',
    type: 'radio',
    options: [
      { value: '5', label: 'Excellent - 7-9 hours of quality sleep' },
      { value: '4', label: 'Good - 6-7 hours of decent sleep' },
      { value: '3', label: 'Fair - 5-6 hours or interrupted sleep' },
      { value: '2', label: 'Poor - Less than 5 hours' },
      { value: '1', label: 'Very Poor - I did not sleep well at all' },
    ],
  },
  {
    id: 'stress',
    category: 'Stress',
    question: 'What is your current stress level?',
    type: 'radio',
    options: [
      { value: '1', label: 'No stress - Feeling relaxed' },
      { value: '2', label: 'Low stress - Manageable' },
      { value: '3', label: 'Moderate stress - Noticeable but handled' },
      { value: '4', label: 'High stress - Feeling overwhelmed' },
      { value: '5', label: 'Very high stress - Critical situation' },
    ],
  },
  {
    id: 'social',
    category: 'Social Connection',
    question: 'How connected do you feel to others?',
    type: 'radio',
    options: [
      { value: '5', label: 'Very connected - Strong relationships' },
      { value: '4', label: 'Connected - Good social support' },
      { value: '3', label: 'Moderate - Some connection' },
      { value: '2', label: 'Isolated - Little connection' },
      { value: '1', label: 'Very isolated - Feeling alone' },
    ],
  },
  {
    id: 'activities',
    category: 'Daily Activities',
    question: 'How engaged were you in activities today?',
    type: 'radio',
    options: [
      { value: '5', label: 'Very engaged - Enjoyed most activities' },
      { value: '4', label: 'Engaged - Participated in some activities' },
      { value: '3', label: 'Neutral - Did routine activities' },
      { value: '2', label: 'Disengaged - Struggled to do activities' },
      { value: '1', label: 'Very disengaged - No motivation' },
    ],
  },
  {
    id: 'notes',
    category: 'Additional Notes',
    question: 'Is there anything else you would like to share?',
    type: 'textarea',
    placeholder: 'Optional: Share any additional thoughts or feelings...',
  },
]

export type CheckInData = Record<string, string>

export default function CheckInPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<CheckInData>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = QUESTIONS[currentStep]
  const isLastStep = currentStep === QUESTIONS.length - 1
  const isFirstStep = currentStep === 0

  const handleResponse = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Save to localStorage for now (will integrate with database later)
      const checkInData = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        responses,
      }

      const existingData = localStorage.getItem('checkIns')
      const checkIns = existingData ? JSON.parse(existingData) : []
      checkIns.push(checkInData)
      localStorage.setItem('checkIns', JSON.stringify(checkIns))

      // Redirect to results
      router.push(`/results/${checkInData.id}`)
    } catch (error) {
      console.error('Error saving check-in:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = Boolean(responses[currentQuestion.id])

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Mental Health Check-In</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Question {currentStep + 1} of {QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Question Section */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="p-8">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-600 mb-2">
              {currentQuestion.category}
            </p>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Radio Options */}
          {currentQuestion.type === 'radio' && (
            <RadioGroup
              value={responses[currentQuestion.id] || ''}
              onValueChange={handleResponse}
            >
              <div className="space-y-4">
                {currentQuestion.options?.map(option => (
                  <div key={option.value} className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 cursor-pointer text-gray-700 font-normal hover:text-gray-900"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {/* Textarea */}
          {currentQuestion.type === 'textarea' && (
            <Textarea
              placeholder={currentQuestion.placeholder}
              value={responses[currentQuestion.id] || ''}
              onChange={e => handleResponse(e.target.value)}
              className="min-h-40 resize-none"
            />
          )}
        </Card>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button
            onClick={handleBack}
            disabled={isFirstStep}
            variant="outline"
            className="gap-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          {!isLastStep ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? 'Submitting...' : 'Complete Check-In'}
            </Button>
          )}
        </div>
      </section>
    </main>
  )
}
