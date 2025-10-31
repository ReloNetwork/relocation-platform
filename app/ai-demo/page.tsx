'use client'

import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Button } from '../../ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/components/card'
import { Badge } from '../../ui/components/badge'
import { CheckCircle, Star, ArrowRight, Phone, MessageSquare, Calendar, TrendingUp, Shield, Award, Building, Users, Mic, BarChart3, Clock, Play } from 'lucide-react'

interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  industry: string
  businessType: string
  currentChallenges: string
  monthlyRevenue: string
  timeframe: string
  hearAboutUs: string
}

export default function AIDemoPage() {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    industry: '',
    businessType: '',
    currentChallenges: '',
    monthlyRevenue: '',
    timeframe: '',
    hearAboutUs: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/ai-demo/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'ai-demo-page',
          timestamp: new Date().toISOString()
        }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('There was an error submitting your request. Please try again.')
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  if (submitted) {
    return (
      <Layout className="bg-[#FAFAF9] text-[#0B1220]" showFooter={false}>
        <div className="min-h-screen flex items-center justify-center pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-[#C9A24A]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Demo Request Received
            </h1>
            <p className="text-lg text-[#6B7280] mb-6">
              Thank you for your interest in our AI voice assistant solutions. We'll contact you within 24 hours to schedule your personalized demo.
            </p>
            <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-[#0B1B2B] mb-2">What happens next?</h3>
              <ul className="text-sm text-[#6B7280] space-y-2 text-left">
                <li>• Our AI consultant will review your business requirements</li>
                <li>• We'll prepare a customized demo based on your industry</li>
                <li>• You'll receive a calendar link to book your 30-minute demo call</li>
                <li>• We'll show you ROI projections specific to your business</li>
              </ul>
            </div>
            <Button
              onClick={() => window.location.href = '/relosolutions'}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white"
            >
              Learn More About Our Services
            </Button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220]" showFooter={false}>
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#C9A24A]/15 to-[#C9A24A]/5 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0B1B2B]/8 to-[#0B1B2B]/3 blur-2xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Content */}
            <div>
              <Badge className="bg-[#C9A24A]/10 text-[#C9A24A] border-[#C9A24A]/20 mb-6">
                Get Your Custom Demo
              </Badge>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                See How AI Captures <span className="text-[#C9A24A]">Every Missed Call</span>
              </h1>
              
              <p className="text-lg text-[#6B7280] mb-8 leading-relaxed">
                Watch our AI voice assistant handle real client inquiries for premium service businesses. 
                See exactly how it books appointments, qualifies leads, and recovers lost revenue 24/7.
              </p>

              {/* Key Benefits */}
              <div className="space-y-4 mb-8">
                {[
                  { icon: Phone, text: "Never miss another client call" },
                  { icon: Calendar, text: "Automatically book qualified appointments" },
                  { icon: TrendingUp, text: "Recover 6-figure revenue losses" },
                  { icon: Shield, text: "Fortune 500-proven technology" }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-4 h-4 text-[#C9A24A]" />
                    </div>
                    <span className="text-[#0B1B2B] font-medium">{benefit.text}</span>
                  </div>
                ))}
              </div>

              {/* Social Proof */}
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-[#C9A24A]/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A24A] text-[#C9A24A]" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-[#0B1B2B]">Used by Fortune 500 executives</span>
                </div>
                <p className="text-sm text-[#6B7280] italic">
                  "This AI system has transformed how we handle client inquiries. It's like having a premium receptionist available 24/7."
                </p>
                <div className="text-xs text-[#6B7280] mt-2">— Premium law firm partner</div>
              </div>
            </div>

            {/* Right Column - Lead Form */}
            <div>
              <Card className="shadow-2xl border-[#C9A24A]/20">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-[#C9A24A]" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#0B1B2B]">Get Your Custom Demo</CardTitle>
                  <CardDescription className="text-[#6B7280]">
                    See how AI voice assistants work for businesses like yours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="businessType" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Business Type *
                      </label>
                      <select
                        id="businessType"
                        name="businessType"
                        required
                        value={formData.businessType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      >
                        <option value="">Select your business type</option>
                        <option value="dental-practice">Dental Practice</option>
                        <option value="medical-spa">Medical Spa</option>
                        <option value="law-firm">Law Firm</option>
                        <option value="consulting">Consulting Firm</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="financial-services">Financial Services</option>
                        <option value="healthcare">Healthcare Practice</option>
                        <option value="professional-services">Professional Services</option>
                        <option value="other">Other Premium Service</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="monthlyRevenue" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Monthly Revenue Range *
                      </label>
                      <select
                        id="monthlyRevenue"
                        name="monthlyRevenue"
                        required
                        value={formData.monthlyRevenue}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      >
                        <option value="">Select revenue range</option>
                        <option value="under-50k">Under £50k</option>
                        <option value="50k-100k">£50k - £100k</option>
                        <option value="100k-250k">£100k - £250k</option>
                        <option value="250k-500k">£250k - £500k</option>
                        <option value="500k-1m">£500k - £1M</option>
                        <option value="over-1m">Over £1M</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="currentChallenges" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Current Challenges (Optional)
                      </label>
                      <textarea
                        id="currentChallenges"
                        name="currentChallenges"
                        rows={3}
                        value={formData.currentChallenges}
                        onChange={handleInputChange}
                        placeholder="What challenges are you facing with missed calls or lead capture?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label htmlFor="timeframe" className="block text-sm font-medium text-[#0B1B2B] mb-2">
                        Implementation Timeframe *
                      </label>
                      <select
                        id="timeframe"
                        name="timeframe"
                        required
                        value={formData.timeframe}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      >
                        <option value="">Select timeframe</option>
                        <option value="immediate">Immediate (within 2 weeks)</option>
                        <option value="1-month">Within 1 month</option>
                        <option value="3-months">Within 3 months</option>
                        <option value="6-months">Within 6 months</option>
                        <option value="exploring">Just exploring options</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold py-4 text-lg"
                    >
                      {loading ? 'Requesting Demo...' : 'Get My Custom Demo'}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <p className="text-xs text-[#6B7280] text-center">
                      We'll contact you within 24 hours to schedule your personalized demo. 
                      No spam, just valuable insights for your business.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              What You'll See In Your Demo
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              We'll show you exactly how our AI handles real scenarios from businesses like yours
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <CardTitle className="text-xl">Live Call Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#6B7280]">Watch our AI handle actual client calls, book appointments, and qualify leads with natural conversation</p>
              </CardContent>
            </Card>

            <Card className="text-center border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <CardTitle className="text-xl">ROI Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#6B7280]">See personalized revenue projections based on your current missed call volume and average client value</p>
              </CardContent>
            </Card>

            <Card className="text-center border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <CardTitle className="text-xl">Custom Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#6B7280]">Learn how we'd customize the AI for your specific industry, services, and business requirements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Demo Questions & Answers
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How long is the demo?",
                answer: "The demo typically takes 30 minutes. We'll show you live call examples, discuss your specific needs, and provide ROI projections for your business."
              },
              {
                question: "Is this really free?",
                answer: "Yes, absolutely free with no obligations. We want you to see the value before making any decisions. Many prospects become clients after seeing the demo."
              },
              {
                question: "What information do you need?",
                answer: "We'll ask about your current call volume, average client value, and business goals to customize the demo and provide accurate ROI projections."
              },
              {
                question: "Can you integrate with our existing systems?",
                answer: "Yes, we integrate with most major CRM systems, scheduling platforms, and phone systems. We'll discuss your specific setup during the demo."
              }
            ].map((faq, idx) => (
              <details key={idx} className="bg-white rounded-lg shadow-sm border border-[#C9A24A]/20 overflow-hidden group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-[#C9A24A]/5 transition-colors">
                  <h3 className="text-lg font-semibold text-[#0B1B2B] pr-4">{faq.question}</h3>
                  <svg className="w-6 h-6 text-[#C9A24A] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[#6B7280] leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}