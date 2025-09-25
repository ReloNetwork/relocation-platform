'use client'

import React, { useState, useEffect } from 'react'
import Layout from '@/components/Layout'

export default function FeedbackPage() {
  const [partners, setPartners] = useState<any[]>([])
  const [selectedPartner, setSelectedPartner] = useState('')
  const [formData, setFormData] = useState({
    partnerId: '',
    clientName: '',
    rating: 5,
    review: '',
    serviceCategory: '',
    recommendToOthers: true,
    responseTime: 24,
    professionalismRating: 5,
    valueForMoneyRating: 5
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Fetch partners for the dropdown
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      const response = await fetch('/api/partners/recommendations')
      const result = await response.json()
      if (result.ok) {
        setPartners(result.partners || [])
      }
    } catch (error) {
      console.error('Error fetching partners:', error)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePartnerSelect = (partnerId: string) => {
    const partner = partners.find(p => p.id === partnerId)
    setSelectedPartner(partnerId)
    setFormData(prev => ({
      ...prev,
      partnerId,
      serviceCategory: partner?.category || ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/partners/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.ok) {
        setMessage('Thank you for your feedback! Your review helps other clients make informed decisions.')
        // Reset form
        setFormData({
          partnerId: '',
          clientName: '',
          rating: 5,
          review: '',
          serviceCategory: '',
          recommendToOthers: true,
          responseTime: 24,
          professionalismRating: 5,
          valueForMoneyRating: 5
        })
        setSelectedPartner('')
      } else {
        setMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('An error occurred while submitting your feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const StarRating = ({ rating, onRatingChange, label }: { rating: number, onRatingChange: (rating: number) => void, label: string }) => (
    <div>
      <label className="block text-sm font-medium text-[#0B1B2B] mb-2">{label}</label>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`w-6 h-6 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
          >
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
        <span className="ml-2 text-sm text-[#6B7280]">({rating}/5)</span>
      </div>
    </div>
  )

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-12 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Share Your Experience
            </h1>
            <p className="text-[#6B7280] text-lg">
              Help other clients by sharing your experience with our partner services
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#0B1B2B]/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Partner Selection */}
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Select Partner *
                </label>
                <select
                  value={selectedPartner}
                  onChange={(e) => handlePartnerSelect(e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                  required
                >
                  <option value="">Choose a partner...</option>
                  {partners.map(partner => (
                    <option key={partner.id} value={partner.id}>
                      {partner.name} - {partner.category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Client Name */}
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                  placeholder="John Smith"
                  required
                />
              </div>

              {/* Overall Rating */}
              <StarRating
                rating={formData.rating}
                onRatingChange={(rating) => handleInputChange('rating', rating)}
                label="Overall Rating *"
              />

              {/* Detailed Ratings */}
              <div className="grid md:grid-cols-2 gap-6">
                <StarRating
                  rating={formData.professionalismRating}
                  onRatingChange={(rating) => handleInputChange('professionalismRating', rating)}
                  label="Professionalism"
                />
                <StarRating
                  rating={formData.valueForMoneyRating}
                  onRatingChange={(rating) => handleInputChange('valueForMoneyRating', rating)}
                  label="Value for Money"
                />
              </div>

              {/* Response Time */}
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Response Time (hours)
                </label>
                <select
                  value={formData.responseTime}
                  onChange={(e) => handleInputChange('responseTime', parseInt(e.target.value))}
                  className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all"
                >
                  <option value={1}>Within 1 hour</option>
                  <option value={4}>Within 4 hours</option>
                  <option value={24}>Within 24 hours</option>
                  <option value={48}>Within 2 days</option>
                  <option value={72}>Within 3 days</option>
                  <option value={168}>More than a week</option>
                </select>
              </div>

              {/* Written Review */}
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Your Review *
                </label>
                <textarea
                  value={formData.review}
                  onChange={(e) => handleInputChange('review', e.target.value)}
                  rows={4}
                  className="w-full border border-[#E5E7EB] rounded-xl p-3 focus:border-[#C9A24A] focus:ring-2 focus:ring-[#C9A24A]/20 outline-none transition-all resize-none"
                  placeholder="Please share your experience with this partner's services..."
                  required
                />
              </div>

              {/* Recommendation */}
              <div>
                <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                  Would you recommend this partner to others?
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.recommendToOthers === true}
                      onChange={() => handleInputChange('recommendToOthers', true)}
                      className="w-4 h-4 text-[#C9A24A] border-gray-300 focus:ring-[#C9A24A]"
                    />
                    <span className="ml-2 text-sm text-[#0B1B2B]">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={formData.recommendToOthers === false}
                      onChange={() => handleInputChange('recommendToOthers', false)}
                      className="w-4 h-4 text-[#C9A24A] border-gray-300 focus:ring-[#C9A24A]"
                    />
                    <span className="ml-2 text-sm text-[#0B1B2B]">No</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !selectedPartner || !formData.clientName || !formData.review}
                className="w-full py-3 bg-[#0B1B2B] text-[#C9A24A] rounded-xl hover:bg-[#0B1B2B]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
              >
                {loading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </div>

          {/* Message */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl border ${
              message.includes('Thank you')
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="text-sm font-medium">{message}</div>
            </div>
          )}

          {/* Information Section */}
          <div className="mt-8 bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-xl p-6">
            <h3 className="font-semibold text-[#0B1B2B] mb-3">Why Your Feedback Matters</h3>
            <ul className="space-y-2 text-sm text-[#6B7280]">
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Helps other clients make informed decisions
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Enables partners to improve their services
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Maintains quality standards in our network
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A24A]">•</span>
                Your review will be verified before publication
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}