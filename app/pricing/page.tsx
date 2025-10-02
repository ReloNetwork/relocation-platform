import Layout from '@/components/Layout'
import { Check, Star, ArrowRight, Shield, Clock, Users } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing | Relo Network - Transparent London Relocation Service Costs',
  description: 'Transparent pricing for London relocation services. AI Concierge £295/month, Managed Service £8,500, Executive Service £15,000. No hidden fees, 100% money-back guarantee.',
  keywords: 'London relocation costs, relocation service pricing, luxury moving costs London, executive relocation pricing, corporate relocation costs, AI concierge service pricing, transparent relocation fees',
  authors: [{ name: 'Relo Network', url: 'https://therelonetwork.com' }],
  creator: 'Relo Network',
  publisher: 'Relo Network',
  metadataBase: new URL('https://therelonetwork.com'),
  alternates: {
    canonical: '/pricing',
    languages: {
      'en-GB': '/pricing',
      'x-default': '/pricing'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://therelonetwork.com/pricing',
    siteName: 'Relo Network',
    title: 'Transparent Pricing | London Relocation Service Costs',
    description: 'Clear, transparent pricing for London relocation services. From AI-assisted moves to white-glove executive service. No hidden fees, guaranteed results.',
    images: [
      {
        url: '/images/og-pricing-transparent.jpg',
        width: 1200,
        height: 630,
        alt: 'Relo Network Transparent Pricing - London Relocation Service Costs'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ReloNetwork',
    creator: '@ReloNetwork',
    title: 'Transparent Pricing | London Relocation Service Costs',
    description: 'Clear pricing for London relocation: AI Concierge £295/mo, Managed £8.5k, Executive £15k. No hidden fees, money-back guarantee.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function PricingPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Transparent Pricing for Your London Move
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-8">
              Professional relocation services with no hidden fees. Choose the service level that matches your needs and timeline.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-[#059669]">
              <Shield className="w-4 h-4" />
              <span>100% Money-Back Guarantee • No Hidden Fees • Fixed Pricing</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* AI Concierge */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB] relative">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#EFF6FF] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-[#2563EB]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-2">AI Concierge</h3>
                <p className="text-[#6B7280] text-sm">Self-service with AI guidance</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#0B1B2B]">£295</div>
                <div className="text-sm text-[#6B7280]">per month</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">AI-powered area recommendations</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Property search platform access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Digital move checklist</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Partner directory access</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Email support</span>
                </li>
              </ul>

              <button className="w-full bg-[#E5E7EB] text-[#0B1B2B] px-6 py-3 rounded-lg font-medium hover:bg-[#D1D5DB] transition-colors">
                Get Started
              </button>
            </div>

            {/* Managed Service - Most Popular */}
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-[#C9A24A] relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-[#C9A24A] text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#FEF3C7] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-2">Managed Service</h3>
                <p className="text-[#6B7280] text-sm">Dedicated concierge support</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#0B1B2B]">£8,500</div>
                <div className="text-sm text-[#6B7280]">per move</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Everything in AI Concierge</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Dedicated concierge manager</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Property viewings coordination</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">School placement assistance</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Phone & video support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Moving company coordination</span>
                </li>
              </ul>

              <button className="w-full bg-[#C9A24A] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#B8932A] transition-colors">
                Get Started
              </button>
            </div>

            {/* Executive */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB] relative">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-[#F3F4F6] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-[#0B1B2B]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-2">Executive</h3>
                <p className="text-[#6B7280] text-sm">White-glove service</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-[#0B1B2B]">£15,000</div>
                <div className="text-sm text-[#6B7280]">per move</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Everything in Managed Service</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">24/7 priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Personal property tours</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Visa & immigration support</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Family settling services</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#059669] flex-shrink-0" />
                  <span className="text-sm text-[#6B7280]">Post-move support (3 months)</span>
                </li>
              </ul>

              <button className="w-full bg-[#0B1B2B] text-[#C9A24A] px-6 py-3 rounded-lg font-medium hover:bg-[#0B1B2B]/90 transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Corporate Packages */}
          <div className="bg-gradient-to-r from-[#0B1B2B] to-[#1F2937] rounded-xl p-8 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Corporate Packages
              </h2>
              <p className="text-[#D1D5DB] max-w-2xl mx-auto">
                Volume discounts and dedicated account management for companies relocating multiple employees.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Essential Executive</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">£15,000</p>
                <p className="text-sm text-[#D1D5DB]">per employee</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Complete Executive</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">£25,000</p>
                <p className="text-sm text-[#D1D5DB]">per employee</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-white mb-2">C-Suite Elite</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">£45,000</p>
                <p className="text-sm text-[#D1D5DB]">per employee</p>
              </div>
            </div>
          </div>

          {/* Directory Access */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Partner Directory Access
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto">
                Access our vetted network of 150+ premium service providers for your London relocation.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB] text-center">
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Preview Access</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">Free</p>
                <p className="text-sm text-[#6B7280] mb-4">3 partners per month</p>
                <ul className="text-xs text-[#6B7280] space-y-1">
                  <li>Basic contact info</li>
                  <li>Limited reviews</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-[#C9A24A] text-center relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#C9A24A] text-white px-3 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                </div>
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Premium Access</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">£47</p>
                <p className="text-sm text-[#6B7280] mb-4">per month</p>
                <ul className="text-xs text-[#6B7280] space-y-1">
                  <li>Full partner directory</li>
                  <li>Direct contact details</li>
                  <li>Detailed reviews</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB] text-center">
                <h3 className="font-semibold text-[#0B1B2B] mb-2">VIP Access</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">£147</p>
                <p className="text-sm text-[#6B7280] mb-4">per month</p>
                <ul className="text-xs text-[#6B7280] space-y-1">
                  <li>Priority support</li>
                  <li>Personal recommendations</li>
                  <li>Exclusive partners</li>
                </ul>
              </div>
            </div>

            {/* Partner Network */}
            <div className="bg-[#F9FAFB] rounded-xl p-8 text-center">
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Join Our Partner Network</h3>
              <p className="text-[#6B7280] mb-6 max-w-xl mx-auto">
                Premium service providers can join our exclusive network to access high-value London relocations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#0B1B2B]">Featured Partnership</div>
                  <div className="text-2xl font-bold text-[#C9A24A]">£375/month</div>
                  <div className="text-sm text-[#6B7280]">50% founding discount</div>
                </div>
                <div className="text-[#D1D5DB] hidden sm:block">|</div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-[#0B1B2B]">Founding Partner</div>
                  <div className="text-2xl font-bold text-[#C9A24A]">£25,000</div>
                  <div className="text-sm text-[#6B7280]">12 months exclusivity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Add-on Services */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Add-on Services
              </h2>
              <p className="text-[#6B7280] max-w-2xl mx-auto">
                Additional services available for any package level to customize your relocation experience.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB] text-center">
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Expedited Service</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">+£2,500</p>
                <p className="text-sm text-[#6B7280]">48-hour turnaround</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB] text-center">
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Pet Relocation</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">£1,500</p>
                <p className="text-sm text-[#6B7280]">Full pet moving service</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB] text-center">
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Temp Housing</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">£500</p>
                <p className="text-sm text-[#6B7280]">Short-term arrangements</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border border-[#E5E7EB] text-center">
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Cultural Training</h3>
                <p className="text-2xl font-bold text-[#C9A24A] mb-2">£750</p>
                <p className="text-sm text-[#6B7280]">UK lifestyle orientation</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB] mb-16">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-8 text-center" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-[#0B1B2B] mb-2">What's included in the base price?</h3>
                <p className="text-sm text-[#6B7280] mb-4">All core services listed in each tier. No hidden fees or surprise charges.</p>
                
                <h3 className="font-semibold text-[#0B1B2B] mb-2">When do I pay?</h3>
                <p className="text-sm text-[#6B7280] mb-4">50% upfront to secure service, 50% upon completion. Corporate clients can arrange monthly billing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1B2B] mb-2">What if I'm not satisfied?</h3>
                <p className="text-sm text-[#6B7280] mb-4">100% money-back guarantee if you're not completely satisfied within the first 14 days.</p>
                
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Can I upgrade my package?</h3>
                <p className="text-sm text-[#6B7280]">Yes, you can upgrade at any time. We'll credit what you've already paid toward the new package.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Ready to Start Your London Journey?
            </h2>
            <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
              Book a free 30-minute consultation to discuss your specific needs and get personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#C9A24A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#B8932A] transition-colors flex items-center justify-center gap-2">
                Book Free Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-white text-[#0B1B2B] px-8 py-4 rounded-lg font-semibold border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}