'use client';

import React from 'react'
import { ArrowLeft, ExternalLink, Star, Calendar, User, Car, Shield, Clock, Tag, Share2, Crown, MapPin } from 'lucide-react'
import Link from 'next/link'
import GlobalNavigationFixed from '@/components/GlobalNavigationFixed'
import Analytics from '@/components/Analytics'

export default function LondonLuxuryTransport() {
  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <Analytics />
      <GlobalNavigationFixed />
      <main className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E5E7EB] py-4">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/newsletter" className="flex items-center gap-2 text-[#6B7280] hover:text-[#C9A24A] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Newsletter
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <div className="bg-gradient-to-br from-[#0B1B2B] to-[#0B1B2B]/90 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#C9A24A] text-white mb-6">
              <Crown className="w-4 h-4 mr-2" />
              Transport Partner
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Executive Transport Excellence: London Luxury Chauffeuring Partner Spotlight
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Where precision meets prestige - ensuring executive mobility that matches your professional standards across London and beyond
            </p>
            
            <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
The Relo Network Team
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                January 11, 2025
              </div>
              <div>8 min read</div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <article className="prose prose-lg max-w-none">
            
            {/* Opening Story */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB] mb-8">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=450&fit=crop&crop=center&auto=format&q=80" 
                  alt="Luxury chauffeur service featuring premium vehicles and professional drivers in central London"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
              <p className="text-lg text-[#0B1B2B] leading-relaxed mb-6">
                <strong>When Time Is Your Most Valuable Asset,</strong>
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                At 6:30 AM last Tuesday, a Fortune 500 CEO's flight from New York landed at Heathrow 45 minutes early. By 6:35, she was in her chauffeur-driven vehicle, reviewing board materials for a 9 AM presentation in Canary Wharf. Despite morning traffic, she arrived composed and prepared, having conducted two client calls en route.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                That same week, a private equity managing director hosted a series of client meetings across London - from breakfast in Mayfair to lunch in the City to dinner in Greenwich. Each transition was seamless, with his chauffeur coordinating timing while he focused entirely on deal execution.
              </p>
              
              <p className="text-xl font-semibold text-[#0B1B2B] text-center">
                <strong>This is executive transport reimagined</strong> - where luxury meets reliability and every journey enhances your professional effectiveness.
              </p>
              </div>
            </div>

            {/* Partner Spotlight */}
            <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#C9A24A]/5 border-l-4 border-[#C9A24A] rounded-r-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Executive Transport in London</h3>
                  <p className="text-[#6B7280] mb-3">
                    London's premier chauffeur services specialize in executive and diplomatic transport. Leading firms like Executive Travel London and others provide sophisticated transport solutions for Fortune 500 executives, government officials, and high-net-worth individuals.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-semibold text-[#0B1B2B]">Specialty:</span>
                      <span className="text-[#6B7280] ml-1">Executive Chauffeur Services</span>
                    </div>
                    <button className="text-[#C9A24A] hover:text-[#B8923D] font-medium text-sm flex items-center gap-1">
                      Book Service
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Executive Transport Matters */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Why Executive Transport is Strategic, Not Luxury
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                For senior executives, transport isn't just about getting from point A to point B—it's about maximizing productivity, maintaining professional image, and ensuring reliable timing for critical business activities. In London's complex transport landscape, professional chauffeur services become essential business infrastructure.
              </p>
              
              <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Executive Transport ROI:</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Average 2.5 hours daily productivity gained through mobile office capability</li>
                  <li>• 97% on-time arrival rate for critical business meetings</li>
                  <li>• Reduced stress and enhanced professional presence</li>
                  <li>• Secure, confidential environment for sensitive business discussions</li>
                  <li>• Expert local knowledge optimizing travel efficiency</li>
                  <li>• Professional representation for client transport and entertainment</li>
                </ul>
              </div>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                <strong>The Productivity Factor:</strong> London traffic averages 45 minutes daily delay for executive commutes. Professional chauffeur services transform this time into productive work sessions, with mobile connectivity and privacy enabling continued business operations.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed">
                <strong>The Reliability Imperative:</strong> When million-pound deals depend on precise timing and professional presentation, executive transport becomes risk management essential for business continuity.
              </p>
            </div>

            {/* Service Excellence Standards */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Executive Transport Service Standards
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-8">
                London's premier executive transport providers maintain exacting standards that reflect the professionalism and reliability required by international business leaders. Every detail from vehicle selection to driver training reflects understanding of executive requirements.
              </p>

              {/* Service Categories */}
              <div className="space-y-8">
                
                {/* Fleet Excellence */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Car className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Premium Fleet Selection</h3>
                        <p className="text-[#C9A24A] font-semibold text-lg">Vehicles that enhance your professional image</p>
                      </div>
                    </div>
                    
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
                      Executive transport fleets feature latest-generation Mercedes S-Class, BMW 7-Series, and Range Rover vehicles, maintained to manufacturer standards with comprehensive insurance and safety systems.
                    </p>
                    
                    <p className="text-[#6B7280] leading-relaxed mb-6">
                      Vehicles include mobile office capabilities: Wi-Fi connectivity, charging stations, privacy partitions, and climate control optimized for productivity and comfort during extended journeys.
                    </p>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border-l-4 border-[#C9A24A]">
                      <p className="text-sm text-[#0B1B2B] font-medium italic">
                        "Your vehicle selection communicates professional standards before you arrive at any destination."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Professional Drivers */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8 lg:order-1">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Professional Chauffeur Standards</h3>
                          <p className="text-[#C9A24A] font-semibold text-lg">Discretion, expertise, reliability</p>
                        </div>
                      </div>
                      
                      <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
                        Executive chauffeurs undergo comprehensive background checks, advanced driving training, and customer service protocols designed for high-profile international clients requiring discretion and professionalism.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed mb-6">
                        Language capabilities, cultural awareness, and comprehensive London geography knowledge ensure seamless service for international executives and their guests.
                      </p>
                      
                      <div className="bg-[#F8F9FA] rounded-lg p-4 border-l-4 border-[#C9A24A]">
                        <p className="text-sm text-[#0B1B2B] font-medium italic">
                          "Professional chauffeurs become trusted extensions of your executive team."
                        </p>
                      </div>
                    </div>
                    
                    <div className="aspect-[4/3] lg:aspect-auto lg:order-2">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                        alt="Professional chauffeur in formal attire demonstrating executive service standards"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Technology & Coordination */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                      alt="Executive transport technology featuring GPS tracking, mobile connectivity, and scheduling systems"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Advanced Coordination Technology</h3>
                        <p className="text-[#C9A24A] font-medium text-lg italic">Seamless scheduling and communication</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <p className="text-[#6B7280] leading-relaxed mb-6 text-lg">
                        Modern executive transport leverages real-time GPS tracking, flight monitoring, and dynamic scheduling systems that automatically adjust for delays, traffic conditions, and last-minute changes to executive calendars.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed text-lg">
                        Mobile applications provide transparent communication, allowing executives and assistants to track vehicle location, modify destinations, and coordinate complex multi-stop itineraries with precision timing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Categories */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Executive Transport Service Categories
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Premier transport providers offer specialized services designed for different aspects of executive business operations, from daily commuting to international client entertainment and complex event logistics.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Airport Transfers & Flight Coordination</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Flight monitoring and dynamic scheduling ensure seamless connections for international travel. Meet-and-greet services, baggage assistance, and Fast Track coordination optimize travel efficiency for busy executives.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Daily Executive Commuting</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Consistent daily transport with dedicated chauffeurs who understand your schedule, preferred routes, and specific requirements. Mobile office setup enables productivity during commutes across London's business districts.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Client Entertainment & Business Development</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Specialized vehicles and services for client transportation, business entertainment, and corporate events. Professional presentation enhances your company's image while ensuring guest comfort and convenience.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Multi-City & International Coordination</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Coordinated transport across multiple UK cities and European destinations, with partner networks ensuring consistent service standards for complex business travel requirements.
                  </p>
                </div>
              </div>
            </div>

            {/* Security & Discretion */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Security & Discretion Standards
              </h2>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
                <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Executive Security Protocols</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Driver Background Checks</div>
                    <div className="text-[#6B7280]">Enhanced DBS clearance, international background verification, ongoing monitoring</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Vehicle Security</div>
                    <div className="text-[#6B7280]">GPS tracking, emergency communication systems, comprehensive insurance coverage</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Confidentiality Standards</div>
                    <div className="text-[#6B7280]">NDA agreements, privacy training, secure communication protocols</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Route Security</div>
                    <div className="text-[#6B7280]">Dynamic route planning, secure parking arrangements, threat assessment capabilities</div>
                  </div>
                </div>
              </div>

              <p className="text-[#6B7280] leading-relaxed">
                <strong>The Discretion Imperative:</strong> Premier transport providers understand that executive conversations require complete confidentiality. Professional chauffeurs are trained to maintain absolute discretion while providing attentive service that enhances rather than disrupts business operations.
              </p>
            </div>

            {/* Working with Transport Partners through Relo Network */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Coordinated Transport Services Through Relo Network
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                As part of comprehensive executive relocation services, Relo Network coordinates transport arrangements with property viewings, school visits, banking appointments, and other relocation activities, ensuring seamless coordination across all service providers.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Immediate Service Setup</h3>
                  <p className="text-[#6B7280] mb-4">
                    Executive transport arrangements begin from airport arrival, with vehicles ready for property viewings, meetings, and familiarization tours during your initial London visit and relocation period.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Ongoing Account Management</h3>
                  <p className="text-[#6B7280] mb-4">
                    Dedicated account management ensures service consistency and continuous optimization of transport arrangements as your London operations and requirements evolve.
                  </p>
                </div>
              </div>
            </div>

            {/* Get Started */}
            <div className="bg-[#F8F9FA] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Elevate Your Executive Mobility
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Professional transport isn't about luxury—it's about effectiveness, reliability, and maintaining the standards that reflect your professional success while maximizing your productive time.
              </p>
              
              <p className="text-lg font-semibold text-[#0B1B2B] mb-6">
                Ready to experience executive transport excellence?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/book-consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors"
                >
                  Book Transport Consultation
                  <Calendar className="w-4 h-4" />
                </a>
                <a 
                  href="/partners"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white font-semibold rounded-lg transition-colors"
                >
                  View Transport Partners
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <p className="text-xl font-bold text-[#C9A24A] mt-6">
                Travel Efficiently, Arrive Effectively.
              </p>
              
              <p className="text-[#6B7280] mt-4">
                <em>The Relo Network Team</em>
              </p>
            </div>

          </article>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready for Executive Transport Excellence?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join the executive network that values time, discretion, and professional standards in every journey across London.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/book-consultation"
              className="px-8 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors"
            >
              Book Consultation
            </a>
            <Link 
              href="/partners"
              className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#0B1B2B] font-semibold rounded-lg transition-colors"
            >
              Explore Partners
            </Link>
          </div>
        </div>
      </div>
      </main>
    </div>
  )
}