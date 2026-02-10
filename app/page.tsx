import React from "react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Brain, TrendingUp, Shield } from 'lucide-react'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">SafeSpace</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">
              How it Works
            </a>
            <Link href="/assessment">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">Stress Assessment</Button>
            </Link>
            <Link href="/checkin">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Start Check-In</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center space-y-8 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 text-balance">
            Your Mental Health, Your Safe Space
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 text-balance">
            Check in with your wellbeing whenever you need. Get personalized insights, discover helpful resources, and track your mental health journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/assessment">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8">
                Take Stress Assessment
              </Button>
            </Link>
            <Link href="/checkin">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Start Your Check-In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            How SafeSpace Helps
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <FeatureCard
              icon={Brain}
              title="Smart Assessment"
              description="Answer thoughtfully designed questions about your emotions, sleep, stress, and more."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Visual Insights"
              description="See your wellbeing trends over time with clear, easy-to-understand charts and metrics."
            />
            <FeatureCard
              icon={Shield}
              title="Personalized Resources"
              description="Get AI-powered recommendations for coping strategies and helpful resources tailored to you."
            />
            <FeatureCard
              icon={Heart}
              title="Compassionate Design"
              description="A safe, non-judgmental space designed with care and backed by mental health principles."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Three Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="1"
              title="Complete Your Check-In"
              description="Spend 5 minutes answering our carefully crafted questions about your emotional state, sleep, stress levels, and daily activities."
            />
            <StepCard
              number="2"
              title="Get Your Results"
              description="Receive an instant visualization of your mental health status with detailed breakdowns by category."
            />
            <StepCard
              number="3"
              title="Explore Resources"
              description="Discover personalized coping strategies and mental health resources based on your responses."
            />
          </div>
        </div>
      </section>

      {/* Assessment Feature Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            New: Anonymous Stress Assessment
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Understand Your Stress Levels
              </h3>
              <p className="text-lg text-gray-600">
                Take our quick 12-question assessment to identify your stress patterns across academic, emotional, and social dimensions.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-teal-600 rounded-full"></span>
                  Quick 5-minute assessment
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-teal-600 rounded-full"></span>
                  Personalized 7-day recovery plan
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-teal-600 rounded-full"></span>
                  Guided breathing exercises
                </li>
                <li className="flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-teal-600 rounded-full"></span>
                  100% anonymous and private
                </li>
              </ul>
              <Link href="/assessment">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 mt-4">
                  Start Assessment
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg p-8 text-center">
              <div className="inline-block p-6 bg-white rounded-lg shadow-lg">
                <div className="text-5xl font-bold text-teal-600 mb-2">3</div>
                <p className="text-gray-600 mb-4">Stress Dimensions</p>
                <p className="text-sm text-gray-500">Academic, Emotional, Social</p>
              </div>
              <div className="mt-8 space-y-2 text-left text-gray-700">
                <p className="font-semibold">Includes:</p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Results visualization</li>
                  <li>• Recovery recommendations</li>
                  <li>• Support directory</li>
                  <li>• Calm mode breathing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Check In?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Take the first step towards better mental health awareness today.
          </p>
          <Link href="/checkin">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-10">
              Start Your Check-In Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>
            SafeSpace is a mental health assessment tool. For mental health emergencies, please contact your local crisis hotline.
          </p>
          <p className="mt-4 text-sm">© 2024 SafeSpace. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className: string }>
  title: string
  description: string
}) {
  return (
    <div className="p-8 border border-gray-200 rounded-lg hover:border-blue-300 transition bg-white">
      <Icon className="w-12 h-12 text-blue-600 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
