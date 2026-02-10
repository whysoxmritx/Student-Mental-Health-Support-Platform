'use client'

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import { StressAssessment, type AssessmentResult } from '@/components/stress-assessment'
import { AssessmentResults } from '@/components/assessment-results'
import { CalmMode } from '@/components/calm-mode'
import { RecoveryPlan } from '@/components/recovery-plan'
import { SupportDirectory } from '@/components/support-directory'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Home, Zap } from 'lucide-react'
import Link from 'next/link'

type AssessmentStep = 'questions' | 'results' | 'full-view'

export default function AssessmentPage() {
  const [step, setStep] = useState<AssessmentStep>('questions')
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [calmModeOpen, setCalmModeOpen] = useState(false)

  const handleAssessmentComplete = (answers: Record<string, number>, assessmentResult: AssessmentResult) => {
    setResult(assessmentResult)
    setStep('results')
  }

  const handleContinue = () => {
    setStep('full-view')
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        {/* Header with Theme Toggle */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <Home className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-gray-900 dark:text-white">SafeSpace</span>
            </Link>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        {step === 'questions' && (
          <StressAssessment onComplete={handleAssessmentComplete} />
        )}

        {step === 'results' && result && (
          <AssessmentResults result={result} onContinue={handleContinue} />
        )}

        {step === 'full-view' && result && (
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    Your Complete Wellness Plan
                  </h1>
                  <Button
                    onClick={() => setStep('questions')}
                    variant="outline"
                    className="dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                  >
                    Start New Assessment
                  </Button>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  A personalized recovery plan and support resources tailored to your needs
                </p>
              </div>

              {/* Calm Mode Section */}
              <Card className="p-8 mb-12 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border-blue-200 dark:border-blue-900">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Feeling Overwhelmed?
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300">
                      Take a 2-minute guided breathing exercise to calm your mind
                    </p>
                  </div>
                  <Button
                    onClick={() => setCalmModeOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white whitespace-nowrap ml-4"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Calm Mode
                  </Button>
                </div>
              </Card>

              {/* Recovery Plan */}
              <Card className="p-8 mb-12 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  7-Day Recovery Plan
                </h2>
                <RecoveryPlan result={result} />
              </Card>

              {/* Support Directory */}
              <Card className="p-8 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Find Support
                </h2>
                <SupportDirectory />
              </Card>

              {/* Footer Info */}
              <div className="mt-12 p-8 bg-gray-100 dark:bg-gray-800 rounded-lg text-center text-gray-600 dark:text-gray-400 space-y-2">
                <p>
                  This assessment is anonymous and confidential. Your responses are stored locally
                  in your browser.
                </p>
                <p className="text-sm">
                  Remember: This tool is for self-awareness and should not replace professional
                  mental health care.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Calm Mode Modal */}
        <CalmMode isOpen={calmModeOpen} onClose={() => setCalmModeOpen(false)} />
      </div>
    </ThemeProvider>
  )
}
