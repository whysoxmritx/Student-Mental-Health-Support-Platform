'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface CalmModeProps {
  isOpen: boolean
  onClose: () => void
}

export function CalmMode({ isOpen, onClose }: CalmModeProps) {
  const [secondsLeft, setSecondsLeft] = useState(120)
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')

  useEffect(() => {
    if (!isOpen) return

    setIsBreathing(true)
    setSecondsLeft(120)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !isBreathing || secondsLeft <= 0) {
      if (secondsLeft <= 0 && isBreathing) {
        setIsBreathing(false)
      }
      return
    }

    const timer = setInterval(() => {
      setSecondsLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, isBreathing, secondsLeft])

  useEffect(() => {
    if (!isBreathing) return

    const phases: Array<{ phase: 'inhale' | 'hold' | 'exhale'; duration: number }> = [
      { phase: 'inhale', duration: 4000 },
      { phase: 'hold', duration: 4000 },
      { phase: 'exhale', duration: 4000 },
    ]

    let currentPhaseIndex = 0
    let phaseStartTime = Date.now()

    const updatePhase = () => {
      const elapsed = Date.now() - phaseStartTime
      const currentPhase = phases[currentPhaseIndex]

      if (elapsed >= currentPhase.duration) {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
        phaseStartTime = Date.now()
        setBreathPhase(phases[currentPhaseIndex].phase)
      }

      if (isBreathing) {
        requestAnimationFrame(updatePhase)
      }
    }

    setBreathPhase(phases[0].phase)
    const animId = requestAnimationFrame(updatePhase)

    return () => cancelAnimationFrame(animId)
  }, [isBreathing])

  if (!isOpen) return null

  const getBreathText = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'Inhale...'
      case 'hold':
        return 'Hold...'
      case 'exhale':
        return 'Exhale...'
    }
  }

  const getCircleSize = () => {
    switch (breathPhase) {
      case 'inhale':
        return 'w-40 h-40'
      case 'hold':
        return 'w-40 h-40'
      case 'exhale':
        return 'w-32 h-32'
    }
  }

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Darkened Background */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />

      {/* Modal Content */}
      <div className="relative bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-12 max-w-md w-full mx-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 dark:hover:bg-white/10 rounded-lg transition"
        >
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Content */}
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Calm Mode
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              2-Minute Guided Breathing
            </p>
          </div>

          {/* Breathing Circle */}
          <div className="flex justify-center">
            <div
              className={`${getCircleSize()} ${
                breathPhase === 'inhale'
                  ? 'animate-pulse'
                  : breathPhase === 'hold'
                    ? 'opacity-100'
                    : 'animate-pulse'
              } bg-gradient-to-br from-blue-400 to-teal-400 dark:from-blue-600 dark:to-teal-600 rounded-full transition-all duration-1000 flex items-center justify-center`}
            >
              <span className="text-white text-lg font-semibold">
                {getBreathText()}
              </span>
            </div>
          </div>

          {/* Timer */}
          <div className="space-y-2">
            <p className="text-4xl font-bold text-gray-900 dark:text-white font-mono">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
            {secondsLeft <= 0 && !isBreathing && (
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                Well done! You completed the breathing exercise.
              </p>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-white/50 dark:bg-white/10 rounded-lg p-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>Follow the circle as it expands and contracts</p>
            <p>Breathe naturally and let your mind settle</p>
          </div>

          {/* Action Button */}
          {secondsLeft <= 0 || !isBreathing ? (
            <Button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
            >
              Close
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
