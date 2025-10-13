'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { CheckCircle, Calendar, Phone, Clock, ArrowRight, Users, Target } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

function ConsultationContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loading, setLoading] = useState(false)
  
  const requestId = searchParams.get('requestId') || ''
  const companyName = searchParams.get('company') || 'Your Company'

  // Sample time slots - in production, these would be fetched from a calendar API
  const timeSlots = [
    { id: '1', date: 'Today', time: '2:00 PM', available: true, emergency: true },
    { id: '2', date: 'Today', time: '4:00 PM', available: true, emergency: true },
    { id: '3', date: 'Today', time: '6:00 PM', available: true, emergency: false },
    { id: '4', date: 'Tomorrow', time: '9:00 AM', available: true, emergency: false },
    { id: '5', date: 'Tomorrow', time: '11:00 AM', available: true, emergency: false },
    { id: '6', date: 'Tomorrow', time: '2:00 PM', available: true, emergency: false },
    { id: '7', date: 'Tomorrow', time: '4:00 PM', available: false, emergency: false },
    { id: '8', date: 'Day After', time: '10:00 AM', available: true, emergency: false }
  ]

  const handleBookConsultation = async () => {
    if (!selectedSlot) return
    
    setLoading(true)
    
    try {
      // In production, this would book the actual calendar slot
      const response = await fetch('/api/consultations/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId,
          slotId: selectedSlot,
          companyName
        })
      })

      if (response.ok) {
        router.push(`/corporate/consultation/confirmed?requestId=${requestId}&slot=${selectedSlot}`)
      } else {
        throw new Error('Failed to book consultation')
      }
    } catch (error) {
      console.error('Booking error:', error)
      alert('Error booking consultation. Please try again or call our emergency hotline.')
    } finally {
      setLoading(false)
    }
  }

  const selectedSlotDetails = timeSlots.find(slot => slot.id === selectedSlot)

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-800 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Calendar className="h-16 w-16 text-blue-400 mx-auto mb-6" />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Schedule Your Emergency Consultation
            </h1>
            <p className="text-xl text-blue-100 mb-2">
              Book your free consultation with our emergency response specialist
            </p>
            <p className="text-blue-200">
              Request ID: <span className="font-mono bg-blue-800/30 px-2 py-1 rounded">{requestId}</span>
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* What to Expect */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">What to Expect in Your Consultation</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Expert Assessment</h3>
                <p className="text-gray-300 text-sm">
                  Our emergency specialist will assess your specific relocation needs and timeline requirements.
                </p>
              </div>
              
              <div className="text-center">
                <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Custom Solution</h3>
                <p className="text-gray-300 text-sm">
                  Receive a tailored emergency relocation plan designed specifically for your situation.
                </p>
              </div>
              
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Obligation Quote</h3>
                <p className="text-gray-300 text-sm">
                  Get a detailed quote with no pressure to commit. Make an informed decision.
                </p>
              </div>
            </div>
          </div>

          {/* Time Slot Selection */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Select Your Preferred Time</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedSlot(slot.id)}
                  disabled={!slot.available}
                  className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                    selectedSlot === slot.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : slot.available
                      ? 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                      : 'border-slate-700 bg-slate-800/30 opacity-50 cursor-not-allowed'
                  }`}
                >
                  {slot.emergency && (
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                        URGENT
                      </span>
                    </div>
                  )}
                  
                  <div className="text-sm text-gray-400 mb-1">{slot.date}</div>
                  <div className={`font-semibold ${
                    slot.available ? 'text-white' : 'text-gray-500'
                  }`}>
                    {slot.time}
                  </div>
                  
                  {!slot.available && (
                    <div className="text-xs text-red-400 mt-1">Unavailable</div>
                  )}
                  
                  {slot.emergency && slot.available && (
                    <div className="text-xs text-red-400 mt-1">Emergency slot</div>
                  )}
                </button>
              ))}
            </div>

            {selectedSlot && selectedSlotDetails && (
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center text-blue-300">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-semibold">
                    Selected: {selectedSlotDetails.date} at {selectedSlotDetails.time}
                  </span>
                </div>
                {selectedSlotDetails.emergency && (
                  <p className="text-blue-200 text-sm mt-2">
                    This is an emergency slot - our specialist will prioritize your urgent needs.
                  </p>
                )}
              </div>
            )}

            <Button
              onClick={handleBookConsultation}
              disabled={!selectedSlot || loading}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-lg font-semibold"
            >
              {loading ? (
                'Booking...'
              ) : (
                <>
                  Book Free Consultation
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Emergency Contact */}
          <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 text-center">
            <Phone className="h-12 w-12 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Can't Wait for a Scheduled Call?</h2>
            <p className="text-red-200 mb-6">
              For immediate assistance, call our 24/7 emergency hotline
            </p>
            <div className="text-3xl font-bold text-red-300 mb-2">+44 20 3105 9566</div>
            <p className="text-red-200 text-sm">
              Reference your request ID: {requestId}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default function ConsultationBookingPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </Layout>
    }>
      <ConsultationContent />
    </Suspense>
  )
}