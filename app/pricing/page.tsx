import Layout from '../../components/Layout'
import { Check, Star, ArrowRight, Shield, Clock, Users, Phone, Mail, Calendar, Building, User, FileText } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Service Consultations | Relo Network - London Relocation Solutions',
  description: 'Discover our London relocation services designed for executives and corporate teams. Contact us for personalized pricing and comprehensive relocation solutions.',
  keywords: 'London relocation services, executive relocation consultation, corporate relocation solutions, relocation service inquiry, professional relocation London',
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
    title: 'Service Consultations | London Relocation Solutions',
    description: 'Professional London relocation services for executives and corporate teams. Contact us for personalized consultation and transparent pricing.',
    images: [
      {
        url: '/images/og-services-consultation.jpg',
        width: 1200,
        height: 630,
        alt: 'Relo Network Service Consultations - London Relocation Solutions'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ReloNetwork',
    creator: '@ReloNetwork',
    title: 'Service Consultations | London Relocation Solutions',
    description: 'Professional London relocation services for executives and corporate teams. Contact for personalized consultation.'
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

export const dynamic = 'force-dynamic'

export default function ServicesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              London Relocation Services
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-8">
              Professional relocation solutions tailored for executives and corporate teams. Contact us for personalized consultation and transparent pricing.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-[#059669]">
              <Shield className="w-4 h-4" />
              <span>96% Success Rate • Service Guarantees • Transparent Pricing</span>
            </div>
          </div>

          {/* Service Categories - Dual Track ICP */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Executive Track */}
            <div className="bg-gradient-to-br from-[#C9A24A] to-[#B8923D] rounded-xl p-8 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Executive Services</h3>
                <p className="text-white/90 text-lg mb-6">
                  For individual executives, professionals, and entrepreneurs relocating to London.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-white/90">72-Hour Setup Audit</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-white/90">Complete relocation service</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-white/90">Family integration support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-white/90">Personal account manager</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => window.location.href = '/executive-intake'}
                    className="w-full bg-white text-[#C9A24A] font-semibold py-3 rounded-lg hover:bg-white/90 transition-all"
                  >
                    Start Your Assessment
                  </button>
                  <button 
                    onClick={() => window.location.href = '/executive'}
                    className="w-full bg-white/20 text-white font-semibold py-3 rounded-lg hover:bg-white/30 transition-all border border-white/30"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>

            {/* Corporate Track */}
            <div className="bg-gradient-to-br from-[#0B1B2B] to-[#1a2b3b] rounded-xl p-8 shadow-lg text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-16 -translate-y-16"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Corporate Programs</h3>
                <p className="text-white/90 text-lg mb-6">
                  For HR teams managing employee relocations and corporate mobility programs.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-white/90">15-minute needs assessment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-white/90">Dedicated account management</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-white/90">Volume pricing & SLAs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span className="text-white/90">Executive reporting dashboard</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={() => window.location.href = '/corporate-assessment'}
                    className="w-full bg-white text-[#0B1B2B] font-semibold py-3 rounded-lg hover:bg-white/90 transition-all"
                  >
                    Start Corporate Assessment
                  </button>
                  <button 
                    onClick={() => window.location.href = '/corporate'}
                    className="w-full bg-white/20 text-white font-semibold py-3 rounded-lg hover:bg-white/30 transition-all border border-white/30"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Service Features */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB] mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                What's Included in Our Services
              </h2>
              <p className="text-[#6B7280] text-lg">
                Comprehensive relocation support designed to make your London move seamless
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-[#0B1B2B] mb-3">Assessment & Planning</h3>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li>• Comprehensive needs analysis</li>
                  <li>• Area recommendations</li>
                  <li>• Timeline planning</li>
                  <li>• Budget consultation</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-[#0B1B2B] mb-3">Dedicated Support</h3>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li>• Personal account manager</li>
                  <li>• Specialist team assignment</li>
                  <li>• 24/7 support hotline</li>
                  <li>• Progress tracking</li>
                </ul>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="font-bold text-[#0B1B2B] mb-3">Service Guarantees</h3>
                <ul className="space-y-2 text-sm text-[#6B7280]">
                  <li>• 96% success rate</li>
                  <li>• Milestone guarantees</li>
                  <li>• Service credits for delays</li>
                  <li>• Quality assurance</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact for Pricing */}
          <div className="bg-gradient-to-r from-[#0B1B2B] to-[#1a2b3b] rounded-xl p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us for a personalized consultation and transparent pricing tailored to your specific relocation needs.
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              <div className="text-center">
                <Phone className="w-8 h-8 text-[#C9A24A] mx-auto mb-3" />
                <div className="font-semibold mb-1">Call Direct</div>
                <div className="text-white/80">+44 20 3105 9566</div>
              </div>
              <div className="text-center">
                <Mail className="w-8 h-8 text-[#C9A24A] mx-auto mb-3" />
                <div className="font-semibold mb-1">Email Us</div>
                <div className="text-white/80">hello@therelonetwork.com</div>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 text-[#C9A24A] mx-auto mb-3" />
                <div className="font-semibold mb-1">Available</div>
                <div className="text-white/80">Mon-Fri 8:00-20:00 GMT</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/executive-intake'}
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Executive Services
              </button>
              <button 
                onClick={() => window.location.href = '/corporate-assessment'}
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all border border-white/30"
              >
                Corporate Programs
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}