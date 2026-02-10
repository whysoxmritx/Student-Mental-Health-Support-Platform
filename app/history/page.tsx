'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { ArrowLeft, ChevronRight, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface CheckInData {
  id: string
  timestamp: string
  responses: Record<string, string>
}

interface HistoryItem {
  date: string
  score: number
  id: string
}

export default function HistoryPage() {
  const [checkIns, setCheckIns] = useState<CheckInData[]>([])
  const [historyData, setHistoryData] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('checkIns')
    if (stored) {
      const data: CheckInData[] = JSON.parse(stored)
      setCheckIns(data.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()))

      // Calculate scores for chart
      const chartData = data
        .map(item => {
          const responses = item.responses
          const categories = [
            { id: 'mood', inverted: false },
            { id: 'anxiety', inverted: true },
            { id: 'sleep', inverted: false },
            { id: 'stress', inverted: true },
            { id: 'social', inverted: false },
            { id: 'activities', inverted: false },
          ]

          const scores = categories.map(cat => {
            const value = parseInt(responses[cat.id] || '3')
            return cat.inverted ? 6 - value : value
          })
          const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length

          return {
            date: new Date(item.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            }),
            score: Math.round(avgScore * 20),
            id: item.id,
          }
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      setHistoryData(chartData)
    }
    setIsLoading(false)
  }, [])

  const handleDelete = (id: string) => {
    const updated = checkIns.filter(c => c.id !== id)
    setCheckIns(updated)
    localStorage.setItem('checkIns', JSON.stringify(updated))
    setHistoryData(historyData.filter(item => item.id !== id))
  }

  const handleClearAll = () => {
    if (confirm('Are you sure you want to delete all check-ins? This cannot be undone.')) {
      setCheckIns([])
      setHistoryData([])
      localStorage.removeItem('checkIns')
    }
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-gray-600">Loading history...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Check-In History</h1>
          <div className="w-32" />
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {checkIns.length === 0 ? (
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">No check-ins yet</h2>
            <p className="text-gray-600 mb-8">
              Start tracking your mental health by completing your first check-in.
            </p>
            <Link href="/checkin">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Start Your First Check-In
              </Button>
            </Link>
          </Card>
        ) : (
          <>
            {/* Trend Chart */}
            {historyData.length > 1 && (
              <Card className="p-8 mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Wellbeing Trend</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historyData}>
                      <CartesianGrid stroke="#e5e7eb" />
                      <XAxis dataKey="date" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#2563eb"
                        strokeWidth={2}
                        dot={{ fill: '#2563eb', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Wellbeing Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            )}

            {/* Statistics */}
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="p-6">
                <p className="text-sm text-gray-600 mb-2">Total Check-Ins</p>
                <p className="text-3xl font-bold text-gray-900">{checkIns.length}</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-gray-600 mb-2">Latest Score</p>
                <p className="text-3xl font-bold text-blue-600">
                  {historyData.length > 0 ? historyData[historyData.length - 1].score : 0}%
                </p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-gray-600 mb-2">Average Score</p>
                <p className="text-3xl font-bold text-teal-600">
                  {historyData.length > 0
                    ? Math.round(historyData.reduce((sum, item) => sum + item.score, 0) / historyData.length)
                    : 0}
                  %
                </p>
              </Card>
            </div>

            {/* Check-In List */}
            <Card className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Check-Ins</h2>
                {checkIns.length > 0 && (
                  <Button
                    onClick={handleClearAll}
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {checkIns.map(checkIn => {
                  const timestamp = new Date(checkIn.timestamp)
                  const formattedDate = timestamp.toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })

                  const responses = checkIn.responses
                  const categories = [
                    { id: 'mood', inverted: false },
                    { id: 'anxiety', inverted: true },
                    { id: 'sleep', inverted: false },
                    { id: 'stress', inverted: true },
                    { id: 'social', inverted: false },
                    { id: 'activities', inverted: false },
                  ]

                  const scores = categories.map(cat => {
                    const value = parseInt(responses[cat.id] || '3')
                    return cat.inverted ? 6 - value : value
                  })
                  const avgScore = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 20)

                  return (
                    <div
                      key={checkIn.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{avgScore}%</div>
                            <div className="text-xs text-gray-500">Wellbeing</div>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{formattedDate}</p>
                            <p className="text-sm text-gray-600">
                              Mood: {responses.mood} | Anxiety: {responses.anxiety} | Sleep: {responses.sleep}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Link href={`/results/${checkIn.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 bg-transparent"
                          >
                            View
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleDelete(checkIn.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            {/* Footer Action */}
            <div className="flex gap-4 mt-8">
              <Link href="/" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  Back to Home
                </Button>
              </Link>
              <Link href="/checkin" className="flex-1">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Start New Check-In
                </Button>
              </Link>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
