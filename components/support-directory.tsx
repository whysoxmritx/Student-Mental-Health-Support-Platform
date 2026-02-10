'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, Clock, AlertCircle } from 'lucide-react'

export function SupportDirectory() {
  const services = [
    {
      title: 'Campus Counseling Center',
      type: 'Professional Support',
      contact: {
        name: 'Dr. Sarah Johnson',
        phone: '+1 (555) 123-4567',
        email: 'counseling@campus.edu',
        hours: 'Mon-Fri: 9AM-5PM, Sat: 10AM-2PM',
      },
      description: 'Free, confidential counseling services for students',
    },
    {
      title: 'National Crisis Hotline',
      type: 'Crisis Support',
      contact: {
        name: '24/7 Helpline',
        phone: '988 (US)',
        email: 'support@crisistextline.org',
        hours: 'Available 24/7',
      },
      description: 'Immediate support during mental health crises',
    },
    {
      title: 'Peer Support Network',
      type: 'Community Support',
      contact: {
        name: 'Support Group Coordinator',
        phone: '+1 (555) 234-5678',
        email: 'peers@supportnetwork.org',
        hours: 'Tue & Thu: 7PM-8:30PM',
      },
      description: 'Connect with others going through similar experiences',
    },
    {
      title: 'Mental Health Clinic',
      type: 'Professional Support',
      contact: {
        name: 'Dr. Michael Chen',
        phone: '+1 (555) 345-6789',
        email: 'appointments@mentalhealthclinic.org',
        hours: 'Mon-Fri: 8AM-6PM, Weekend by appointment',
      },
      description: 'Long-term therapy and psychiatric services',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Important Notice */}
      <Card className="p-6 border-2 border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-red-900 dark:text-red-200 mb-1">
              Emergency Support
            </h3>
            <p className="text-red-800 dark:text-red-300 text-sm mb-3">
              If you're in immediate danger or having suicidal thoughts, please call emergency services
              or the National Crisis Hotline immediately.
            </p>
            <a href="tel:988">
              <Button className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-700 dark:hover:bg-red-600">
                Call 988 (Crisis Support)
              </Button>
            </a>
          </div>
        </div>
      </Card>

      {/* Services Directory */}
      <div className="grid md:grid-cols-2 gap-6">
        {services.map((service, idx) => (
          <Card key={idx} className="p-6 hover:shadow-lg transition dark:bg-gray-800 dark:border-gray-700">
            <div className="space-y-4">
              {/* Title and Type */}
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 mb-2">
                  {service.type}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {service.description}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                {/* Name */}
                {service.contact.name && (
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {service.contact.name}
                    </p>
                  </div>
                )}

                {/* Hours */}
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {service.contact.hours}
                  </span>
                </div>

                {/* Phone */}
                {service.contact.phone && (
                  <a href={`tel:${service.contact.phone.replace(/\D/g, '')}`}>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{service.contact.phone}</span>
                    </div>
                  </a>
                )}

                {/* Email */}
                {service.contact.email && (
                  <a href={`mailto:${service.contact.email}`}>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm font-medium">{service.contact.email}</span>
                    </div>
                  </a>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2 flex flex-col">
                <a href={`tel:${service.contact.phone.replace(/\D/g, '')}`}>
                  <Button
                    variant="outline"
                    className="w-full dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
                <a href={`mailto:${service.contact.email}`}>
                  <Button
                    variant="outline"
                    className="w-full dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 bg-transparent"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Resources Section */}
      <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">
          Additional Resources
        </h3>
        <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
            <span>Check your school/university website for counseling services</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
            <span>Many health insurance plans cover mental health services</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
            <span>Online therapy platforms offer accessible mental health support</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
            <span>Many communities offer free or low-cost mental health clinics</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}
