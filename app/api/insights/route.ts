export const runtime = 'nodejs'

interface CheckInResponses {
  [key: string]: string
}

function generateInsights(responses: CheckInResponses): string {
  const mood = parseInt(responses.mood || '3')
  const anxiety = parseInt(responses.anxiety || '3')
  const sleep = parseInt(responses.sleep || '3')
  const stress = parseInt(responses.stress || '3')
  const social = parseInt(responses.social || '3')
  const activities = parseInt(responses.activities || '3')
  const notes = responses.notes || ''

  const insights: string[] = []

  // Mood insights
  if (mood <= 2) {
    insights.push(
      'Your mood appears to be low. Consider activities that bring you joy, spending time with loved ones, or speaking with a mental health professional if this persists.'
    )
  } else if (mood >= 4) {
    insights.push('Great! Your mood is positive. Keep up the activities and routines that support this state of mind.')
  }

  // Anxiety insights
  if (anxiety >= 4) {
    insights.push(
      'You are experiencing significant anxiety. Try grounding techniques like the 5-4-3-2-1 method, deep breathing, or progressive muscle relaxation. Regular exercise can also help reduce anxiety.'
    )
  } else if (anxiety <= 2) {
    insights.push('Your anxiety levels are well-managed. Continue with whatever coping strategies you are using.')
  }

  // Sleep insights
  if (sleep <= 2) {
    insights.push(
      'Your sleep quality needs attention. Establish a consistent sleep schedule, avoid screens before bed, and create a calming bedtime routine. Consider limiting caffeine intake.'
    )
  } else if (sleep >= 4) {
    insights.push('Excellent sleep quality! Continue maintaining your healthy sleep habits.')
  }

  // Stress insights
  if (stress >= 4) {
    insights.push(
      'High stress levels detected. Consider breaking tasks into smaller chunks, taking regular breaks, and practicing relaxation techniques like meditation or yoga.'
    )
  } else if (stress <= 2) {
    insights.push('Your stress levels are manageable. Keep maintaining a good balance between work and rest.')
  }

  // Social connection insights
  if (social <= 2) {
    insights.push(
      'You may be feeling isolated. Reach out to friends or family, join a community group, or consider online communities with shared interests.'
    )
  } else if (social >= 4) {
    insights.push('Great social connections! Maintaining close relationships is vital for mental health.')
  }

  // Activities engagement insights
  if (activities <= 2) {
    insights.push(
      'Increasing engagement in activities can boost your mood. Start small with activities you used to enjoy, even if they feel challenging right now.'
    )
  } else if (activities >= 4) {
    insights.push('You are well-engaged in your activities. This is a positive sign for your overall wellbeing.')
  }

  // Notes-based insights
  if (notes.toLowerCase().includes('work') || notes.toLowerCase().includes('job')) {
    insights.push('Work-related concerns detected. Set clear boundaries between work and personal time, and remember to take breaks during your day.')
  }

  if (notes.toLowerCase().includes('tired') || notes.toLowerCase().includes('exhausted')) {
    insights.push('You mention feeling tired. Ensure you are getting adequate rest and consider if any activities can be postponed or delegated.')
  }

  if (notes.toLowerCase().includes('happy') || notes.toLowerCase().includes('great') || notes.toLowerCase().includes('good')) {
    insights.push('Wonderful! It sounds like you are in a positive place. Keep journaling positive moments to maintain this momentum.')
  }

  return insights.length > 0 ? insights.join('\n\n') : 'Continue monitoring your wellbeing regularly to identify patterns and trends.'
}

function generateResourceRecommendations(responses: CheckInResponses): Array<{
  title: string
  description: string
  type: string
  tips: string[]
}> {
  const mood = parseInt(responses.mood || '3')
  const anxiety = parseInt(responses.anxiety || '3')
  const sleep = parseInt(responses.sleep || '3')
  const stress = parseInt(responses.stress || '3')
  const social = parseInt(responses.social || '3')
  const activities = parseInt(responses.activities || '3')

  const resources: Array<{
    title: string
    description: string
    type: string
    tips: string[]
  }> = []

  // Mood support
  if (mood <= 2) {
    resources.push({
      title: 'Mood Lifting Strategies',
      description: 'Evidence-based techniques to improve your mood',
      type: 'Emotional Wellbeing',
      tips: [
        'Practice gratitude journaling - write 3 things you appreciate daily',
        'Engage in physical activity, even a 10-minute walk',
        'Reach out to someone you trust',
        'Do something kind for others',
        'Get sunlight exposure, which helps regulate mood',
      ],
    })
  }

  // Anxiety management
  if (anxiety >= 4) {
    resources.push({
      title: 'Anxiety Management Techniques',
      description: 'Tools to manage and reduce anxiety',
      type: 'Anxiety Support',
      tips: [
        'Box breathing: Inhale 4 counts, hold 4, exhale 4, hold 4',
        '5-4-3-2-1 grounding: Notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste',
        'Progressive muscle relaxation to release physical tension',
        'Limit caffeine and ensure adequate sleep',
        'Practice mindfulness meditation for 10-15 minutes daily',
      ],
    })
  }

  // Sleep improvement
  if (sleep <= 2) {
    resources.push({
      title: 'Sleep Hygiene Guide',
      description: 'Improve your sleep quality naturally',
      type: 'Sleep Health',
      tips: [
        'Go to bed and wake up at the same time every day',
        'Avoid screens 30-60 minutes before bed',
        'Keep your bedroom cool, dark, and quiet',
        'Avoid large meals, caffeine, and alcohol before bed',
        'Try relaxation techniques like reading or gentle stretching before sleep',
      ],
    })
  }

  // Stress management
  if (stress >= 4) {
    resources.push({
      title: 'Stress Reduction Strategies',
      description: 'Effective ways to manage and reduce stress',
      type: 'Stress Management',
      tips: [
        'Break tasks into smaller, manageable steps',
        'Practice time management and prioritization',
        'Take regular breaks throughout your day',
        'Try deep breathing or meditation',
        'Exercise regularly - even 30 minutes a day helps',
      ],
    })
  }

  // Social connection
  if (social <= 2) {
    resources.push({
      title: 'Building Social Connections',
      description: 'Ways to strengthen relationships and community',
      type: 'Social Support',
      tips: [
        'Send a message to someone you care about',
        'Join a club, class, or group activity',
        'Volunteer in your community',
        'Schedule regular video calls with distant friends',
        'Practice active listening in conversations',
      ],
    })
  }

  // Activity engagement
  if (activities <= 2) {
    resources.push({
      title: 'Building Motivation and Engagement',
      description: 'Strategies to increase daily activities and engagement',
      type: 'Lifestyle',
      tips: [
        'Start with one small activity you enjoy',
        'Set realistic daily goals',
        'Create a routine with structure',
        'Use positive self-talk and celebrate small wins',
        'Consider behavioral activation therapy approaches',
      ],
    })
  }

  // General wellness (always included)
  if (resources.length === 0) {
    resources.push({
      title: 'General Wellness Practices',
      description: 'Universal practices for maintaining good mental health',
      type: 'Wellness',
      tips: [
        'Regular physical activity supports mental health',
        'Maintain a balanced diet and stay hydrated',
        'Practice regular meditation or mindfulness',
        'Set healthy boundaries in relationships and work',
        'Keep a journal to track your thoughts and feelings',
      ],
    })
  }

  return resources
}

export async function POST(request: Request) {
  try {
    const { responses } = await request.json()

    if (!responses) {
      return Response.json({ error: 'Responses are required' }, { status: 400 })
    }

    const insights = generateInsights(responses)
    const resources = generateResourceRecommendations(responses)

    return Response.json({
      success: true,
      insights,
      resources,
    })
  } catch (error) {
    console.error('Error generating insights:', error)
    return Response.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}
