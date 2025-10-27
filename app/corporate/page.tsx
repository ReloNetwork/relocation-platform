'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, CheckCircle, Clock, Shield, Target, Calculator, Star, ArrowRight, Zap, Building2, Users, TrendingUp, AlertTriangle, Globe, Award, Mail, Calendar, FileText, HeadphonesIcon } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'




export default function CorporatePage() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/corporate-assessment')
  }

  const handleContactUs = () => {
    // Scroll to contact form
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
  }


  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#0B1B2B] via-[#0B1B2B] to-[#1a2633] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-6 py-3 mb-8">
              <Building2 className="h-5 w-5 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] font-medium">Trusted by Fortune 500 Companies</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Corporate Employee <br />
              <span className="text-[#C9A24A]">Relocation Programs</span>
              <span className="text-4xl lg:text-5xl text-[#C9A24A] block mt-2">Made Simple.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              End-to-end relocation solutions for HR teams managing employee moves to London. <br />
              <span className="text-[#C9A24A] font-semibold">Dedicated account management and SLA guarantees.</span>
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-xl"
              >
                <FileText className="mr-2 h-5 w-5" />
                Start Corporate Assessment
              </Button>
              <Button 
                onClick={handleContactUs}
                size="lg"
                className="bg-white hover:bg-gray-50 text-[#0B1B2B] px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-xl border border-white"
              >
                <Phone className="mr-2 h-5 w-5" />
                Speak with Specialist
              </Button>
            </div>

            {/* Mobile Phone CTA */}
            <div className="block sm:hidden">
              <a 
                href="tel:+442031059566"
                className="inline-flex items-center bg-[#C9A24A] hover:bg-[#B8923D] text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Now: +44 20 3105 9566
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">96%</div>
                <div className="text-white/70 text-sm">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">24hr</div>
                <div className="text-white/70 text-sm">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">100s</div>
                <div className="text-white/70 text-sm">Successful Relocations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">7-30</div>
                <div className="text-white/70 text-sm">Days Completion</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              How Our Corporate Program Works
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              From assessment to completion, we handle every aspect of your corporate relocation program
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-[#C9A24A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">1. Assessment & Planning</h3>
              <p className="text-[#6B7280] mb-4">
                Complete our 15-minute corporate assessment to identify your relocation requirements, timeline, and budget parameters.
              </p>
              <div className="text-sm text-[#C9A24A] font-medium">2-hour response guarantee</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#C9A24A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">2. Dedicated Team Assignment</h3>
              <p className="text-[#6B7280] mb-4">
                Receive a dedicated account manager and specialist team aligned with your company's industry and relocation complexity.
              </p>
              <div className="text-sm text-[#C9A24A] font-medium">24-hour team assignment</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#C9A24A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">3. Execution & Delivery</h3>
              <p className="text-[#6B7280] mb-4">
                Full program execution with real-time progress tracking, milestone guarantees, and dedicated support throughout.
              </p>
              <div className="text-sm text-[#C9A24A] font-medium">SLA-backed delivery</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Guarantees */}
      <div className="bg-[#FAFAF9] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Service Level Guarantees
            </h2>
            <p className="text-[#6B7280] text-lg">
              Professional SLAs that protect your business and ensure successful outcomes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
              <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">96% Success Rate</h3>
              <p className="text-[#6B7280] text-sm">Proven track record with comprehensive milestone guarantees</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
              <Clock className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">24-Hour Response</h3>
              <p className="text-[#6B7280] text-sm">Dedicated account management with guaranteed response times</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
              <Target className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">7-30 Day Completion</h3>
              <p className="text-[#6B7280] text-sm">Timeline commitments with penalty clauses for missed deadlines</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Corporate Relocation Services
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Comprehensive solutions designed for HR teams managing employee relocations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#FAFAF9] rounded-xl p-8 border border-[#E5E7EB]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center mr-4">
                  <Users className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1B2B]">Individual Employee Relocations</h3>
              </div>
              <p className="text-[#6B7280] mb-6">
                Full-service relocation for individual employees and their families. From property search to school placement, we handle every detail.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-[#6B7280]">Property search and viewings</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-[#6B7280]">Family integration support</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-[#6B7280]">School enrollment assistance</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-[#6B7280]">Cultural orientation and settling</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0B1B2B] rounded-xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#C9A24A]/20 rounded-lg flex items-center justify-center mr-4">
                  <Building2 className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Corporate Program Management</h3>
              </div>
              <p className="text-white/80 mb-6">
                End-to-end program management for companies with multiple relocations. Dedicated account management and bulk pricing.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-white/80">Dedicated account manager</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-white/80">Volume pricing and SLAs</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-white/80">Real-time progress tracking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-white/80">Executive reporting dashboard</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-12 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-xl mr-4"
            >
              Start Assessment
            </Button>
            <Button 
              onClick={handleContactUs}
              size="lg"
              className="bg-white hover:bg-gray-50 text-[#0B1B2B] border border-[#E5E7EB] px-12 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-xl"
            >
              Discuss Requirements
            </Button>
          </div>
        </div>
      </div>

      {/* Corporate Testimonials */}
      <div className="bg-[#FAFAF9] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Trusted by Leading Corporations
            </h2>
            <p className="text-[#6B7280]">What HR directors and executives say about our corporate relocation programs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "Relo Network transformed our global mobility program. Their dedicated account management and SLA guarantees gave us confidence in managing 20+ relocations annually."
              </p>
              <div>
                <div className="font-semibold text-[#0B1B2B]">Sarah Mitchell</div>
                <div className="text-sm text-[#6B7280]">VP People Operations, Technology</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "Managing employee relocations across multiple departments became seamless with Relo Network. Their corporate dashboard and progress tracking eliminated all the admin headaches."
              </p>
              <div>
                <div className="font-semibold text-[#0B1B2B]">James Rodriguez</div>
                <div className="text-sm text-[#6B7280]">Chief Human Resources Officer, Financial Services</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "The corporate assessment helped us understand our relocation needs better than any previous provider. The resulting program exceeded our expectations for both cost and quality."
              </p>
              <div>
                <div className="font-semibold text-[#0B1B2B]">Emma Thompson</div>
                <div className="text-sm text-[#6B7280]">Head of Talent, Investment Banking</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-[#0B1B2B] text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Why Companies Choose Relo Network for Corporate Programs
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Building2 className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-white">Enterprise Experience</h3>
              <p className="text-white/70 text-sm">Purpose-built for corporate relocation programs</p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-white">Account Management</h3>
              <p className="text-white/70 text-sm">Dedicated specialists for your entire program</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-white">Measurable Results</h3>
              <p className="text-white/70 text-sm">96% satisfaction with comprehensive reporting</p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-white">SLA Protection</h3>
              <p className="text-white/70 text-sm">Service guarantees with penalty clauses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Speak with a Corporate Relocation Specialist
            </h2>
            <p className="text-[#6B7280] text-lg">
              Discuss your corporate relocation requirements with our team
            </p>
          </div>
          
          <div className="bg-[#FAFAF9] rounded-lg p-8 border border-[#E5E7EB]">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Get Started Today</h3>
                <p className="text-[#6B7280] mb-6">
                  Complete our 15-minute corporate assessment to receive a customized relocation program proposal within 48 hours.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <span className="text-[#6B7280]">Immediate needs assessment</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <span className="text-[#6B7280]">Custom program design</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <span className="text-[#6B7280]">Transparent pricing proposal</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <span className="text-[#6B7280]">SLA and milestone guarantees</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGetStarted}
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-3 rounded-lg font-semibold mb-4"
                >
                  Start Corporate Assessment
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-[#E5E7EB]">
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Direct Contact</h3>
                <p className="text-[#6B7280] mb-6">
                  Prefer to speak directly with our team? Contact us for immediate assistance.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <div>
                      <div className="font-medium text-[#0B1B2B]">+44 20 3105 9566</div>
                      <div className="text-sm text-[#6B7280]">Corporate Relocation Line</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <div>
                      <div className="font-medium text-[#0B1B2B]">hello@therelonetwork.com</div>
                      <div className="text-sm text-[#6B7280]">Corporate Inquiries</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <div>
                      <div className="font-medium text-[#0B1B2B]">Monday - Friday</div>
                      <div className="text-sm text-[#6B7280]">8:00 - 20:00 GMT</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-[#C9A24A]/10 rounded-lg">
                  <div className="text-sm text-[#C9A24A] font-medium mb-2">Response Guarantee</div>
                  <div className="text-sm text-[#6B7280]">All corporate inquiries receive a response within 24 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-[#0B1B2B] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-full px-4 py-2 mb-6">
            <Building2 className="h-4 w-4 text-[#C9A24A] mr-2" />
            <span className="text-[#C9A24A] text-sm font-medium">Ready to Transform Your Relocation Program?</span>
          </div>
          
          <h3 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Start Your Corporate Assessment Today
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join leading companies who trust Relo Network for their employee relocations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-all px-8 py-4 font-semibold"
            >
              Complete 15-Minute Assessment
            </Button>
            <a 
              href="tel:+442031059566"
              className="inline-flex items-center justify-center h-14 px-8 py-4 text-base border-2 border-white text-white bg-transparent hover:bg-white hover:text-[#0B1B2B] rounded-lg hover:scale-105 transition-all font-semibold"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call: +44 20 3105 9566
            </a>
          </div>
          
          <p className="text-sm text-white/80 mt-6">
            24-hour response guarantee • Professional SLAs • 96% satisfaction rate
          </p>
        </div>
      </div>
    </Layout>
  )
}