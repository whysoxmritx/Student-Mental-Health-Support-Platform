'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { ArrowLeft, Download, Share2, Home, Lightbulb, BookOpen } from 'lucide-react'
import Link from 'next/link'

interface CheckInData {
  id: string
  timestamp: string
  responses: Record<string, string>
}

interface Resource {
  title: string
  description: string
  type: string
  tips: string[]
}

const CATEGORIES = [
  { id: 'mood', label: 'Mood', weight: 1 },
  { id: 'anxiety', label: 'Anxiety', weight: -1, inverted: true },
  { id: 'sleep', label: 'Sleep', weight: 1 },
  { id: 'stress', label: 'Stress', weight: -1, inverted: true },
  { id: 'social', label: 'Connection', weight: 1 },
  { id: 'activities', label: 'Engagement', weight: 1 },
]

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const [checkInData, setCheckInData] = useState<CheckInData | null>(null)
  const [insights, setInsights] = useState<string>('')
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingInsights, setIsLoadingInsights] = useState(false)

  useEffect(() => {
    const id = params.id as string
    const stored = localStorage.getItem('checkIns')
    if (stored) {
      const checkIns: CheckInData[] = JSON.parse(stored)
      const current = checkIns.find(c => c.id === id)
      if (current) {
        setCheckInData(current)
        // Fetch insights after data is loaded
        fetchInsights(current.responses)
      }
    }
    setIsLoading(false)
  }, [params.id])

  const fetchInsights = async (responses: Record<string, string>) => {
    setIsLoadingInsights(true)
    try {
      const response = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses }),
      })
      const data = await response.json()
      if (data.success) {
        setInsights(data.insights)
        setResources(data.resources)
      }
    } catch (error) {
      console.error('Error fetching insights:', error)
    } finally {
      setIsLoadingInsights(false)
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-gray-600">Loading results...</div>
      </main>
    )
  }

  if (!checkInData) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Results</h1>
            <div className="w-20" />
          </div>
        </header>
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-4">No check-in data found.</p>
            <Link href="/checkin">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Start a New Check-In
              </Button>
            </Link>
          </Card>
        </section>
      </main>
    )
  }

  const responses = checkInData.responses
  const radarData = CATEGORIES.map(cat => {
    const value = parseInt(responses[cat.id] || '3')
    const score = cat.inverted ? 6 - value : value
    return {
      category: cat.label,
      score,
      fullMark: 5,
    }
  })

  const timeData = [
    {
      name: 'Score',
      value: radarData.reduce((sum, item) => sum + item.score, 0) / radarData.length,
    },
  ]

  const overallScore = Math.round((radarData.reduce((sum, item) => sum + item.score, 0) / radarData.length) * 20)
  const timestamp = new Date(checkInData.timestamp)
  const formattedDate = timestamp.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-6 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/history">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Your Results</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Results */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overall Score Card */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-500 to-teal-500 text-white">
          <p className="text-sm font-medium text-blue-100 mb-2">Overall Wellbeing Score</p>
          <h2 className="text-5xl font-bold mb-4">{overallScore}%</h2>
          <p className="text-blue-100 mb-4">
            Check-in completed on {formattedDate}
          </p>
          <p className="text-sm text-blue-100">
            {overallScore >= 80
              ? 'Great job! You are doing well overall.'
              : overallScore >= 60
                ? 'You are managing well, but there are areas to focus on.'
                : overallScore >= 40
                  ? 'You may benefit from support and self-care.'
                  : 'Please consider reaching out for support.'}
          </p>
        </Card>

        {/* Radar Chart */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Wellbeing Profile</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Radar
                  name="Score"
                  dataKey="score"
                  stroke="#2563eb"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            This radar chart shows your scores across different dimensions of mental health. Higher values indicate better wellbeing.
          </p>
        </Card>

        {/* Detailed Breakdown */}
        <Card className="p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Detailed Breakdown</h3>
          <div className="space-y-4">
            {CATEGORIES.map(cat => {
              const value = parseInt(responses[cat.id] || '3')
              const score = cat.inverted ? 6 - value : value
              const percentage = (score / 5) * 100
              const color = percentage >= 80 ? 'bg-green-500' : percentage >= 60 ? 'bg-yellow-500' : percentage >= 40 ? 'bg-orange-500' : 'bg-red-500'

              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{cat.label}</span>
                    <span className="text-sm text-gray-600">{Math.round(percentage)}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* AI Insights Section */}
        {isLoadingInsights ? (
          <Card className="p-8 mb-8">
            <p className="text-gray-600 text-center">Generating personalized insights...</p>
          </Card>
        ) : (
          <>
            {insights && (
              <Card className="p-8 mb-8 border-blue-200 bg-blue-50">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Insights</h3>
                    <div className="space-y-4 text-gray-700">
                      {insights.split('\n\n').map((insight, idx) => (
                        <p key={idx} className="text-sm leading-relaxed">
                          {insight}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Resources Section */}
            {resources.length > 0 && (
              <Card className="p-8 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Recommended Resources</h3>
                </div>
                <div className="space-y-6">
                  {resources.map((resource, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-6">
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                          {resource.type}
                        </span>
                        <h4 className="text-lg font-semibold text-gray-900 mt-2">{resource.title}</h4>
                        <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                      </div>
                      <ul className="space-y-2">
                        {resource.tips.map((tip, tipIdx) => (
                          <li key={tipIdx} className="flex items-start gap-3 text-sm text-gray-700">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button variant="outline" className="gap-2 flex-1 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share Results
          </Button>
          <Button variant="outline" className="gap-2 flex-1 bg-transparent">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
          <Link href="/checkin" className="flex-1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2">
              New Check-In
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full gap-2 bg-transparent">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
