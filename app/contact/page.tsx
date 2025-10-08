'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      const response = await fetch('/api/corporate/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', service: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Contact Us
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Ready to begin your London relocation? Our expert team is here to guide you through every step of your move.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Get in Touch
                </h2>
                <p className="text-[#6B7280] mb-8">
                  Whether you're an individual looking for premium relocation services or a corporation managing employee relocations, 
                  we're here to make your move to London seamless and stress-free.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1B2B] mb-1">Phone</h3>
                    <p className="text-[#6B7280]">+44 20 3974 1239</p>
                    <p className="text-sm text-[#9CA3AF]">Monday-Friday 8:00-20:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1B2B] mb-1">Email</h3>
                    <p className="text-[#6B7280]">hello@therelonetwork.com</p>
                    <p className="text-sm text-[#9CA3AF]">We respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1B2B] mb-1">London Office</h3>
                    <p className="text-[#6B7280]">Central London</p>
                    <p className="text-sm text-[#9CA3AF]">Serving all 33 boroughs</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1B2B] mb-1">Business Hours</h3>
                    <p className="text-[#6B7280]">Monday-Friday: 8:00-20:00</p>
                    <p className="text-sm text-[#9CA3AF]">Online Service Hours: 24/7</p>
                    <p className="text-sm text-[#9CA3AF]">Emergency support available 24/7</p>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                <h3 className="font-semibold text-[#0B1B2B] mb-4">Our Services</h3>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                    Executive Relocation Services
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                    Corporate Employee Moves
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                    Property Search & Viewings
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                    School Placement Services
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#C9A24A] rounded-full"></div>
                    Immigration & Visa Support
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB]">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Send us a Message
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium">Thank you for your message!</p>
                  <p className="text-green-700 text-sm">We'll get back to you within 2 hours.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 font-medium">Something went wrong.</p>
                  <p className="text-red-700 text-sm">Please try again or call us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent outline-none transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent outline-none transition-all"
                      placeholder="+44 20 xxxx xxxx"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                      Service Interest
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="executive">Executive Relocation</option>
                      <option value="corporate">Corporate Services</option>
                      <option value="property">Property Search</option>
                      <option value="school">School Placement</option>
                      <option value="immigration">Immigration Support</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your relocation needs, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0B1B2B] text-[#C9A24A] px-6 py-4 rounded-lg font-semibold hover:bg-[#0B1B2B]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>

                <p className="text-sm text-[#6B7280] text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="/terms" className="text-[#C9A24A] hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-[#C9A24A] hover:underline">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}