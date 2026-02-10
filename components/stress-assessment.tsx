'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ChevronRight, ChevronLeft } from 'lucide-react'

interface AssessmentQuestion {
  id: string
  category: 'academic' | 'emotional' | 'social'
  question: string
}

const QUESTIONS: AssessmentQuestion[] = [
  { id: '1', category: 'academic', question: 'How much academic workload is overwhelming you?' },
  { id: '2', category: 'academic', question: 'How stressed do you feel about upcoming exams or deadlines?' },
  { id: '3', category: 'academic', question: 'How difficult is it to concentrate on your studies?' },
  { id: '4', category: 'academic', question: 'How anxious do you feel about your academic performance?' },
  { id: '5', category: 'emotional', question: 'How emotionally exhausted do you feel?' },
  { id: '6', category: 'emotional', question: 'How often do you feel overwhelmed by emotions?' },
  { id: '7', category: 'emotional', question: 'How much do you struggle with motivation?' },
  { id: '8', category: 'emotional', question: 'How often do you feel sad or anxious without a clear reason?' },
  { id: '9', category: 'social', question: 'How pressured do you feel to meet social expectations?' },
  { id: '10', category: 'social', question: 'How lonely do you feel despite being around others?' },
  { id: '11', category: 'social', question: 'How much do social interactions drain your energy?' },
  { id: '12', category: 'social', question: 'How difficult is it to maintain relationships?' },
]

const SCALE_LABELS = ['Never', 'Rarely', 'Sometimes', 'Often', 'Always']

interface StressAssessmentProps {
  onComplete: (answers: Record<string, number>, result: AssessmentResult) => void
}

export interface AssessmentResult {
  overall: 'low' | 'medium' | 'high'
  scores: {
    academic: number
    emotional: number
    social: number
  }
}

export function StressAssessment({ onComplete }: StressAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const currentQuestion = QUESTIONS[currentQuestionIndex]
  const answered = answers[currentQuestion.id] !== undefined
  const isLastQuestion = currentQuestionIndex === QUESTIONS.length - 1

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (!answered) return
    if (isLastQuestion) {
      handleSubmit()
    } else {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    setIsAnalyzing(true)
    // Simulate analysis delay
    setTimeout(() => {
      const result = calculateResult(answers)
      setIsAnalyzing(false)
      onComplete(answers, result)
    }, 2000)
  }

  const calculateResult = (answers: Record<string, number>): AssessmentResult => {
    const scores = {
      academic: 0,
      emotional: 0,
      social: 0,
    }

    let counts = { academic: 0, emotional: 0, social: 0 }

    QUESTIONS.forEach(q => {
      const value = answers[q.id] || 0
      scores[q.category] += value
      counts[q.category] += 1
    })

    const avgAcademic = scores.academic / counts.academic
    const avgEmotional = scores.emotional / counts.emotional
    const avgSocial = scores.social / counts.social
    const overallAvg = (avgAcademic + avgEmotional + avgSocial) / 3

    let overall: 'low' | 'medium' | 'high' = 'low'
    if (overallAvg >= 3.5) {
      overall = 'high'
    } else if (overallAvg >= 2.5) {
      overall = 'medium'
    }

    return {
      overall,
      scores: {
        academic: Math.round(avgAcademic * 20),
        emotional: Math.round(avgEmotional * 20),
        social: Math.round(avgSocial * 20),
      },
    }
  }

  if (isAnalyzing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-6 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 animate-pulse">
            <div className="text-2xl">🧠</div>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Analyzing your responses…
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We're taking a moment to understand your wellbeing
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mental Health Assessment</h1>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {currentQuestionIndex + 1} of {QUESTIONS.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="p-8 mb-8 border-0 shadow-lg dark:bg-gray-800">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 capitalize">
              {currentQuestion.category}
            </span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Scale Selection */}
          <div className="space-y-3 mb-8">
            {[1, 2, 3, 4, 5].map(value => (
              <button
                key={value}
                onClick={() => handleAnswer(value - 1)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[currentQuestion.id] === value - 1
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {SCALE_LABELS[value - 1]}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{value}</span>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="dark:bg-gray-800 dark:border-gray-700 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answered}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {isLastQuestion ? 'Submit Assessment' : 'Next'}
            {!isLastQuestion && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
