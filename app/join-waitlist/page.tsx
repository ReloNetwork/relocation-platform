'use client'

import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

function getCsrf() {
  const m = document.cookie.match(/(?:^|;\s*)relo_csrf=([^;]+)/)
  return m ? decodeURIComponent(m[1]) : ''
}

export default function JoinWaitlistPage() {
  const [status, setStatus] = useState<{ok?: boolean; msg?: string}>({})
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    const payload = Object.fromEntries(fd.entries())
    try {
      const res = await fetch('/api/audience-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-csrf-token': getCsrf() },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Error')
      setStatus({ ok: true, msg: 'Thanks - check your inbox and expect a personal follow-up.' })
      ;(e.target as HTMLFormElement).reset()
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message || 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      {/* Hero Section */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-8">
              <Check className="h-4 w-4 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] text-sm font-medium">Exclusive Access</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Join the <span className="text-[#C9A24A]">Waitlist</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
              Be among the first to experience London's most exclusive relocation network. Priority access, founding member rates, and white-glove service.
            </p>

            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                <span className="text-white/70">500+ on waitlist</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                <span className="text-white/70">50% launch discount</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#C9A24A] rounded-full"></div>
                <span className="text-white/70">Priority access</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-md border border-[#0B1B2B]/10 shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Tell Us About You
            </h2>
            <p className="text-[#6B7280]">
              Answer a few questions so we can prioritise access and match you with the perfect service level.
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#0B1220] mb-2">Full Name</label>
                <input 
                  name="name" 
                  placeholder="Enter your full name" 
                  required 
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-3 text-[#0B1220] placeholder-[#9CA3AF] focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0B1220] mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="Enter your email" 
                  required 
                  className="w-full rounded-md border border-[#E5E7EB] px-3 py-3 text-[#0B1220] placeholder-[#9CA3AF] focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]" 
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-[#0B1220] mb-3">1. Which best describes your current situation?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Professional', 'Entrepreneur', 'Investor', 'Other'].map((role) => (
                  <label key={role} className="flex items-center gap-3 p-3 rounded-md border border-[#E5E7EB] hover:border-[#C9A24A] cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="role" 
                      value={role} 
                      required 
                      className="text-[#C9A24A] focus:ring-[#C9A24A] focus:ring-offset-0"
                    />
                    <span className="text-[#0B1220]">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Desired Outcome */}
            <div>
              <label className="block text-sm font-medium text-[#0B1220] mb-2">2. What's your desired outcome?</label>
              <input 
                name="desired_outcome" 
                placeholder="e.g., Settle in Chelsea within 60 days with family" 
                className="w-full rounded-md border border-[#E5E7EB] px-3 py-3 text-[#0B1220] placeholder-[#9CA3AF] focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]" 
              />
            </div>

            {/* Biggest Frustration */}
            <div>
              <label className="block text-sm font-medium text-[#0B1220] mb-2">3. What's your biggest relocation frustration?</label>
              <input 
                name="frustration" 
                placeholder="e.g., Unreliable timelines, poor communication, hidden costs" 
                className="w-full rounded-md border border-[#E5E7EB] px-3 py-3 text-[#0B1220] placeholder-[#9CA3AF] focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]" 
              />
            </div>

            {/* Price Point */}
            <div>
              <label className="block text-sm font-medium text-[#0B1220] mb-2">4. What budget range works for the right service?</label>
              <select 
                name="price_point" 
                className="w-full rounded-md border border-[#E5E7EB] px-3 py-3 text-[#0B1220] focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A]"
              >
                <option value="">Select your range</option>
                <option value="Under £1k">Under £1,000</option>
                <option value="£1k–£5k">£1,000 – £5,000</option>
                <option value="£5k–£15k">£5,000 – £15,000</option>
                <option value="£15k–£50k">£15,000 – £50,000</option>
                <option value="£50k+">£50,000+</option>
              </select>
            </div>

            {/* Additional Information */}
            <div>
              <label className="block text-sm font-medium text-[#0B1220] mb-2">5. Anything else we should know?</label>
              <textarea 
                name="extra" 
                rows={4} 
                placeholder="Timeline, family size, specific neighborhoods, corporate relocation, etc." 
                className="w-full rounded-md border border-[#E5E7EB] px-3 py-3 text-[#0B1220] placeholder-[#9CA3AF] focus:border-[#C9A24A] focus:outline-none focus:ring-1 focus:ring-[#C9A24A] resize-none" 
              />
            </div>

            {/* Submit Section */}
            <div className="pt-6 border-t border-[#E5E7EB]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-[#6B7280]">
                    Join 500+ members waiting for exclusive access
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-1">
                    We'll contact you within 48 hours with next steps
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all whitespace-nowrap"
                >
                  {loading ? 'Joining...' : 'Join Waitlist'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {status.msg && (
                <div className={`mt-4 p-3 rounded-md ${status.ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                  <p className={`text-sm ${status.ok ? 'text-green-800' : 'text-red-800'}`}>
                    {status.msg}
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              What Waitlist Members Get
            </h3>
            <p className="text-[#6B7280] text-lg">
              Exclusive benefits and priority access to London's premier relocation network
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">50% Launch Discount</h4>
              <p className="text-[#6B7280] text-sm">Exclusive founding member rates on all services - save thousands on your relocation.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Priority Access</h4>
              <p className="text-[#6B7280] text-sm">First access to our premium partner network and concierge services.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-[#C9A24A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="font-semibold text-[#0B1220] mb-2">Personal Consultation</h4>
              <p className="text-[#6B7280] text-sm">Free 30-minute consultation to plan your perfect London relocation strategy.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Questions About Joining?
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Our team is here to help you understand how Relo Network can transform your London move
          </p>
          
          <div className="flex justify-center">
            <button 
              onClick={() => window.location.href = '/demo'}
              className="inline-flex items-center justify-center h-14 px-8 py-4 text-base border border-white text-white bg-transparent hover:bg-white hover:text-[#C9A24A] rounded-md hover:scale-105 transition-all font-medium"
            >
              Try Demo First
            </button>
          </div>
          
          <p className="text-sm text-white/80 mt-6">
            No spam • Personal follow-up within 48 hours • Cancel anytime
          </p>
        </div>
      </div>
    </Layout>
  )
}