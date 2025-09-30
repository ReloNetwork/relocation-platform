'use client'

import { useState } from 'react'
import { Building2, UserPlus, CreditCard, Crown, Shield, Star, CheckCircle, Clock, Users, Phone, Mail } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

interface DirectorySignupFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  companyName: string
  jobTitle: string
  companySize: string
  industryType: string
  accessTier: string
  serviceNeeds: string[]
  urgencyLevel: string
  budget: string
  londonAreas: string[]
  currentChallenges: string
  specificRequirements: string
  howHeard: string
  marketingConsent: boolean
}

export default function DirectorySignupPage() {
  const [formData, setFormData] = useState<DirectorySignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    companySize: '',
    industryType: '',
    accessTier: '',
    serviceNeeds: [],
    urgencyLevel: '',
    budget: '',
    londonAreas: [],
    currentChallenges: '',
    specificRequirements: '',
    howHeard: '',
    marketingConsent: false
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/directory/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        if (result.paymentUrl && formData.accessTier !== 'free') {
          window.location.href = result.paymentUrl
        } else {
          window.location.href = `/directory/welcome?tier=${formData.accessTier}&signupId=${result.signupId}`
        }
      } else {
        throw new Error('Failed to submit signup')
      }
    } catch (error) {
      console.error('Error submitting signup:', error)
      alert('Error submitting signup. Please try again or call +44 20 3974 1239')
    } finally {
      setLoading(false)
    }
  }

  const handleServiceNeedToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      serviceNeeds: prev.serviceNeeds.includes(service)
        ? prev.serviceNeeds.filter(s => s !== service)
        : [...prev.serviceNeeds, service]
    }))
  }

  const handleAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      londonAreas: prev.londonAreas.includes(area)
        ? prev.londonAreas.filter(a => a !== area)
        : [...prev.londonAreas, area]
    }))
  }

  const serviceOptions = [
    'Property Search & Rental',
    'Luxury Moving Services',
    'Legal & Immigration',
    'Financial Services',
    'School Search & Placement',
    'Healthcare & Medical',
    'Transportation Services',
    'Home Services & Utilities',
    'Lifestyle & Concierge',
    'Pet Relocation'
  ]

  const londonAreaOptions = [
    'Central London (Zone 1)',
    'Mayfair & Belgravia',
    'Kensington & Chelsea',
    'Canary Wharf',
    'City of London',
    'Marylebone & Fitzrovia',
    'South Kensington',
    'Notting Hill',
    'Hampstead & Camden',
    'Greenwich & Docklands',
    'Other Areas'
  ]

  const accessTiers = [
    {
      id: 'free',
      name: 'Essential Access',
      price: 'Free',
      description: 'Basic partner listings and contact forms',
      icon: Shield,
      features: [
        'Basic partner directory access',
        'Partner business names & categories',
        'Service area coverage',
        'Contact request forms',
        'Limited filtering options'
      ]
    },
    {
      id: 'plus',
      name: 'Plus Directory Access',
      price: '£29/month',
      description: 'Full filters & contact details',
      icon: Star,
      popular: true,
      features: [
        'Everything in Essential Access',
        'Full filters & contact details',
        '3 curated introductions per month',
        'Templates bundle access',
        'Email support'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Directory Access',
      price: '£99/month',
      description: 'Personal partner matching service',
      icon: Crown,
      features: [
        'Everything in Plus Access',
        'Unlimited curated introductions',
        '48-hour area shortlist delivery',
        'WhatsApp line (UK hours)',
        'Document pre-check service'
      ]
    }
  ]

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-6 py-3 mb-6">
              <UserPlus className="h-5 w-5 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Directory Access Signup</span>
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              Join London's Premier Service Directory
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Get instant access to 200+ vetted service providers across all specialties. Connect with London's most trusted professionals.
            </p>
          </div>

          {/* Access Tier Selection */}
          <div className="mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6 text-center">
              Choose Your Access Level
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accessTiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`bg-white rounded-lg p-6 border cursor-pointer transition-all ${
                    formData.accessTier === tier.id
                      ? 'border-[#C9A24A] ring-2 ring-[#C9A24A]/20'
                      : 'border-[#E5E7EB] hover:border-[#C9A24A]/50'
                  } ${tier.popular ? 'relative' : ''}`}
                  onClick={() => setFormData({ ...formData, accessTier: tier.id })}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-[#C9A24A] text-[#0B1220] px-4 py-1 rounded-full text-sm font-semibold">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <tier.icon className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
                    <h3 className="text-lg font-semibold text-[#0B1220] mb-1">{tier.name}</h3>
                    <div className="text-2xl font-bold text-[#C9A24A] mb-2">{tier.price}</div>
                    <p className="text-sm text-[#6B7280]">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-2 text-sm">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#C9A24A] flex-shrink-0" />
                        <span className="text-[#6B7280]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Signup Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB]">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Company Name *"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Job Title *"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <select
                      value={formData.companySize}
                      onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Company Size *</option>
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="11-50 employees">11-50 employees</option>
                      <option value="51-200 employees">51-200 employees</option>
                      <option value="201-1000 employees">201-1000 employees</option>
                      <option value="1000+ employees">1000+ employees</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={formData.industryType}
                      onChange={(e) => setFormData({ ...formData, industryType: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Industry Type *</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Technology">Technology</option>
                      <option value="Legal">Legal</option>
                      <option value="Consulting">Consulting</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Media & Entertainment">Media & Entertainment</option>
                      <option value="Government & Public Sector">Government & Public Sector</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Service Requirements</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#0B1220] mb-3">What services do you need? (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.serviceNeeds.includes(service)}
                          onChange={() => handleServiceNeedToggle(service)}
                          className="w-4 h-4 text-[#C9A24A] border-[#E5E7EB] rounded focus:ring-[#C9A24A]"
                        />
                        <span className="text-sm text-[#6B7280]">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      value={formData.urgencyLevel}
                      onChange={(e) => setFormData({ ...formData, urgencyLevel: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Urgency Level *</option>
                      <option value="Immediate (within 1 week)">Immediate (within 1 week)</option>
                      <option value="Urgent (within 1 month)">Urgent (within 1 month)</option>
                      <option value="Planning (1-3 months)">Planning (1-3 months)</option>
                      <option value="Future (3+ months)">Future (3+ months)</option>
                    </select>
                  </div>
                  <div>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    >
                      <option value="">Monthly Service Budget *</option>
                      <option value="£1,000 - £5,000">£1,000 - £5,000</option>
                      <option value="£5,000 - £15,000">£5,000 - £15,000</option>
                      <option value="£15,000 - £30,000">£15,000 - £30,000</option>
                      <option value="£30,000 - £50,000">£30,000 - £50,000</option>
                      <option value="£50,000+">£50,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* London Areas */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">London Area Focus</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#0B1220] mb-3">Which London areas are you interested in? (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {londonAreaOptions.map((area) => (
                      <label key={area} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.londonAreas.includes(area)}
                          onChange={() => handleAreaToggle(area)}
                          className="w-4 h-4 text-[#C9A24A] border-[#E5E7EB] rounded focus:ring-[#C9A24A]"
                        />
                        <span className="text-sm text-[#6B7280]">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Additional Information</h3>
                <div className="space-y-4">
                  <div>
                    <textarea
                      rows={3}
                      placeholder="What are your current challenges with finding service providers? *"
                      value={formData.currentChallenges}
                      onChange={(e) => setFormData({ ...formData, currentChallenges: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Any specific requirements or preferences?"
                      value={formData.specificRequirements}
                      onChange={(e) => setFormData({ ...formData, specificRequirements: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <select
                      value={formData.howHeard}
                      onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                    >
                      <option value="">How did you hear about us?</option>
                      <option value="Google Search">Google Search</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Referral">Referral</option>
                      <option value="Industry Event">Industry Event</option>
                      <option value="Company Partner">Company Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Marketing Consent */}
              <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                    className="w-4 h-4 text-[#C9A24A] border-[#E5E7EB] rounded focus:ring-[#C9A24A] mt-1"
                  />
                  <div className="text-sm">
                    <p className="text-[#0B1220] font-medium mb-1">Marketing Communications</p>
                    <p className="text-[#6B7280]">
                      I agree to receive marketing communications about new partners, directory updates, and exclusive offers. You can unsubscribe at any time.
                    </p>
                  </div>
                </label>
              </div>

              {/* Submit Button */}
              <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-6">
                <div className="text-center mb-4">
                  {formData.accessTier === 'free' ? (
                    <>
                      <h4 className="text-lg font-semibold text-[#0B1220] mb-2">Start Your Free Access</h4>
                      <p className="text-[#6B7280]">Get instant access to basic partner listings</p>
                    </>
                  ) : formData.accessTier === 'plus' ? (
                    <>
                      <h4 className="text-lg font-semibold text-[#0B1220] mb-2">Activate Plus Directory Access</h4>
                      <p className="text-[#6B7280]">
                        Monthly subscription: <span className="font-semibold text-[#C9A24A]">£29/month</span>
                      </p>
                    </>
                  ) : formData.accessTier === 'pro' ? (
                    <>
                      <h4 className="text-lg font-semibold text-[#0B1220] mb-2">Activate Pro Directory Access</h4>
                      <p className="text-[#6B7280]">
                        Monthly subscription: <span className="font-semibold text-[#C9A24A]">£99/month</span>
                      </p>
                    </>
                  ) : (
                    <>
                      <h4 className="text-lg font-semibold text-[#0B1220] mb-2">Choose Your Access Level</h4>
                      <p className="text-[#6B7280]">Please select an access tier above to continue</p>
                    </>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={loading || !formData.accessTier}
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-md font-semibold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  {formData.accessTier === 'free' ? (
                    <>
                      <Shield className="h-5 w-5 mr-2" />
                      {loading ? 'Processing...' : 'Get Free Access'}
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5 mr-2" />
                      {loading ? 'Processing...' : 'Continue to Payment'}
                    </>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-[#6B7280]">
                Questions? Call our directory team: <span className="font-semibold text-[#0B1220]">+44 20 3974 1239</span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}