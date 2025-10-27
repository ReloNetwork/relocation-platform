'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, CheckCircle, Clock, Shield, Target, Star, ArrowRight, Building2, Users, TrendingUp, Globe, Award, Mail, Calendar, FileText, User, Briefcase, Home, School, Heart } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'

export default function ExecutivePage() {
  const router = useRouter()

  const handleGetStarted = () => {
    router.push('/executive-intake')
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
              <User className="h-5 w-5 text-[#C9A24A] mr-2" />
              <span className="text-[#C9A24A] font-medium">Trusted by Senior Executives</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Executive <br />
              <span className="text-[#C9A24A]">Relocation Services</span>
              <span className="text-4xl lg:text-5xl text-[#C9A24A] block mt-2">Made Personal.</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Comprehensive relocation solutions for executives, professionals, and entrepreneurs moving to London. <br />
              <span className="text-[#C9A24A] font-semibold">From property search to family integration - we handle everything.</span>
            </p>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:scale-105 transition-all shadow-xl"
              >
                <FileText className="mr-2 h-5 w-5" />
                Start Your 72-Hour Audit
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
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A24A]">72hr</div>
                <div className="text-white/70 text-sm">Setup Audit</div>
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
              How Our Executive Service Works
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              From initial assessment to settling in, we provide a seamless relocation experience tailored to your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-[#C9A24A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">1. 72-Hour Setup Audit</h3>
              <p className="text-[#6B7280] mb-4">
                Comprehensive area analysis, property shortlist, and detailed relocation roadmap delivered within 72 hours.
              </p>
              <div className="text-sm text-[#C9A24A] font-medium">Credited toward full service</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-[#C9A24A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">2. Dedicated Specialist</h3>
              <p className="text-[#6B7280] mb-4">
                Receive a dedicated relocation specialist who understands your lifestyle, career requirements, and family needs.
              </p>
              <div className="text-sm text-[#C9A24A] font-medium">Personal account management</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-[#C9A24A]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">3. Complete Integration</h3>
              <p className="text-[#6B7280] mb-4">
                Full-service relocation including property, schools, lifestyle integration, and ongoing support until you're settled.
              </p>
              <div className="text-sm text-[#C9A24A] font-medium">30-day settling guarantee</div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Guarantees */}
      <div className="bg-[#FAFAF9] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Executive Service Guarantees
            </h2>
            <p className="text-[#6B7280] text-lg">
              Professional commitments that ensure your relocation success
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
              <h3 className="font-bold text-[#0B1B2B] mb-2">72-Hour Delivery</h3>
              <p className="text-[#6B7280] text-sm">Complete setup audit with actionable insights delivered fast</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg border border-[#E5E7EB] shadow-sm">
              <Target className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-bold text-[#0B1B2B] mb-2">30-Day Settlement</h3>
              <p className="text-[#6B7280] text-sm">Complete integration guarantee or service credits applied</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Executive Relocation Services
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Comprehensive solutions designed for executives, professionals, and entrepreneurs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-[#FAFAF9] rounded-xl p-8 border border-[#E5E7EB]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1B2B]">72-Hour Setup Audit</h3>
              </div>
              <p className="text-[#6B7280] mb-6">
                Fast-track your relocation with our comprehensive setup audit. Get property shortlists, area analysis, and actionable insights within 72 hours.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-[#6B7280]">Detailed area analysis and recommendations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-[#6B7280]">Curated property shortlist with viewings</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-[#6B7280]">School and lifestyle recommendations</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-[#6B7280]">Credit toward full relocation service</span>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0B1B2B] rounded-xl p-8 text-white">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#C9A24A]/20 rounded-lg flex items-center justify-center mr-4">
                  <Home className="w-6 h-6 text-[#C9A24A]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Complete Relocation Service</h3>
              </div>
              <p className="text-white/80 mb-6">
                Full-service relocation from property search to family integration. Everything handled by your dedicated specialist team.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-white/80">End-to-end property acquisition</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-white/80">Family and school integration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-white/80">Lifestyle and social integration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                  <span className="text-white/80">Ongoing support and concierge</span>
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
              Start 72-Hour Audit
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

      {/* Executive Testimonials */}
      <div className="bg-[#FAFAF9] py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Trusted by Leading Executives
            </h2>
            <p className="text-[#6B7280]">What executives and professionals say about our relocation services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "The 72-hour audit was incredible - detailed property options, school recommendations, and area insights that saved me months of research. Worth every penny."
              </p>
              <div>
                <div className="font-semibold text-[#0B1B2B]">Michael Chen</div>
                <div className="text-sm text-[#6B7280]">Managing Director, Investment Banking</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "Moving from New York to London with three children seemed impossible. Relo Network handled everything - schools, housing, even helped my wife find work connections."
              </p>
              <div>
                <div className="font-semibold text-[#0B1B2B]">Sarah Williams</div>
                <div className="text-sm text-[#6B7280]">Chief Technology Officer, FinTech</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-[#E5E7EB] shadow-sm">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#6B7280] mb-4 italic">
                "As an entrepreneur launching in London, I needed more than just housing. The lifestyle integration and network introductions were game-changing."
              </p>
              <div>
                <div className="font-semibold text-[#0B1B2B]">David Thompson</div>
                <div className="text-sm text-[#6B7280]">Founder & CEO, PropTech Startup</div>
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
              Why Executives Choose Relo Network
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Building2 className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-white">Executive Focus</h3>
              <p className="text-white/70 text-sm">Purpose-built for senior professionals and their families</p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-white">Personal Service</h3>
              <p className="text-white/70 text-sm">Dedicated specialists who understand your lifestyle</p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-white">Proven Results</h3>
              <p className="text-white/70 text-sm">96% satisfaction with comprehensive support</p>
            </div>
            
            <div className="text-center">
              <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold mb-2 text-white">Service Guarantee</h3>
              <p className="text-white/70 text-sm">Milestone commitments with service credits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Speak with an Executive Relocation Specialist
            </h2>
            <p className="text-[#6B7280] text-lg">
              Discuss your relocation requirements with our expert team
            </p>
          </div>
          
          <div className="bg-[#FAFAF9] rounded-lg p-8 border border-[#E5E7EB]">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Start Your Journey</h3>
                <p className="text-[#6B7280] mb-6">
                  Begin with our 72-Hour Setup Audit to receive a comprehensive relocation roadmap within three days.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <span className="text-[#6B7280]">Detailed area analysis & recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <span className="text-[#6B7280]">Curated property shortlist with viewings</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <span className="text-[#6B7280]">School and lifestyle integration plan</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <span className="text-[#6B7280]">Credit toward full relocation service</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGetStarted}
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-3 rounded-lg font-semibold mb-4"
                >
                  Start Your 72-Hour Audit
                </Button>
              </div>
              
              <div className="bg-white rounded-lg p-6 border border-[#E5E7EB]">
                <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Direct Contact</h3>
                <p className="text-[#6B7280] mb-6">
                  Prefer to speak directly with our team? Contact us for immediate assistance and consultation.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <div>
                      <div className="font-medium text-[#0B1B2B]">+44 20 3105 9566</div>
                      <div className="text-sm text-[#6B7280]">Executive Relocation Line</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#C9A24A] mr-3" />
                    <div>
                      <div className="font-medium text-[#0B1B2B]">hello@therelonetwork.com</div>
                      <div className="text-sm text-[#6B7280]">Executive Services</div>
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
                  <div className="text-sm text-[#C9A24A] font-medium mb-2">Personal Service</div>
                  <div className="text-sm text-[#6B7280]">All executive inquiries receive personal attention from our senior team</div>
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
            <User className="h-4 w-4 text-[#C9A24A] mr-2" />
            <span className="text-[#C9A24A] text-sm font-medium">Ready to Make Your Move?</span>
          </div>
          
          <h3 className="text-3xl font-bold mb-4 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Start Your Executive Relocation Today
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join hundreds of executives who have successfully relocated to London with Relo Network.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-lg hover:scale-105 shadow-lg hover:shadow-xl transition-all px-8 py-4 font-semibold"
            >
              Get Your 72-Hour Setup Audit
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
            72-hour delivery guarantee • Personal service • 96% satisfaction rate
          </p>
        </div>
      </div>
    </Layout>
  )
}