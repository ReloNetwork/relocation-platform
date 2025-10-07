'use client';

import React from 'react'
import { ArrowLeft, ExternalLink, Star, Calendar, User, Building2, Plane, GraduationCap, Car, Heart } from 'lucide-react'
import Link from 'next/link'
import GlobalNavigationFixed from '@/components/GlobalNavigationFixed'
import Analytics from '@/components/Analytics'

export default function LaunchEditionNewsletter() {
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
              <Star className="w-4 h-4 mr-2" />
              Launch Edition
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Relo Network Launches: London's Premium Relocation Platform
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Connecting discerning professionals with London's finest service providers
            </p>
            
            <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Relo Network Team
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                January 7, 2025
              </div>
              <div>6 min read</div>
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
                  src="https://images.unsplash.com/photo-1520986606214-8b456906c813?w=800&h=450&fit=crop&crop=center&auto=format&q=80" 
                  alt="Stunning London cityscape featuring iconic landmarks and Thames riverside"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
              <p className="text-lg text-[#0B1B2B] leading-relaxed mb-6">
                <strong>Dear Professional,</strong>
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Moving to London should be exciting, not exhausting.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Yet every week, I hear the same stories: accomplished executives, successful entrepreneurs, and talented professionals spending months navigating London's complex relocation landscape. Brilliant minds who can close million-pound deals finding themselves overwhelmed by school applications, visa requirements, and property searches.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                The disconnect is stark. London offers world-class services, but connecting with the right providers at the right time has been frustratingly inefficient.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                <strong>Today, that changes.</strong>
              </p>
              
              <p className="text-xl font-semibold text-[#0B1B2B] text-center">
                <strong>Welcome to Relo Network</strong> - London's first AI-powered platform designed specifically for professionals who value their time and expect exceptional service.
              </p>
              </div>
            </div>

            {/* Why London Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                The London Opportunity
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                The data tells a compelling story about London's appeal to international professionals:
              </p>
              
              <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Market Reality:</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• 1 in 22 London properties now purchased by Americans</li>
                  <li>• Corporate relocations to London up 67% since 2022</li>
                  <li>• Average professional relocation budget: £25,000-£75,000</li>
                  <li>• New FIG tax regime offers 4-year foreign income exemption</li>
                </ul>
              </div>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                <strong>The Challenge:</strong> Premium service providers exist across London, but finding and coordinating them has been a time-consuming, often frustrating process. Quality varies wildly, and without proper connections, even well-funded relocations can become stressful ordeals.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed">
                <strong>Our Solution:</strong> Relo Network curates and connects you with London's most exceptional service providers through an intelligent platform that understands your specific needs, budget, and timeline.
              </p>
            </div>

            {/* Partners Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                London's Finest Service Providers
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-8">
                We're building relationships with service providers who share our commitment to excellence. These aren't companies chosen for their marketing budgets, but for their track records serving discerning international clients.
              </p>

              {/* Partner Cards */}
              <div className="space-y-8">
                
                {/* The Chancery Rosewood */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                      alt="The Chancery Rosewood, Mayfair - Former US Embassy transformed into luxury hotel"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">The Chancery Rosewood, Mayfair</h3>
                        <p className="text-[#C9A24A] font-semibold text-lg">Ultra-Luxury Accommodation</p>
                      </div>
                    </div>
                    
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
                      Having transformed the former US Embassy into London's newest luxury landmark, they've created something remarkable - a space where international professionals feel immediately at home while experiencing quintessential British excellence.
                    </p>
                    
                    <p className="text-[#6B7280] leading-relaxed mb-6">
                      Their approach to extended-stay accommodation perfectly aligns with our clients' needs during the transition period, offering 144 all-suite accommodation in the heart of Mayfair's most prestigious address.
                    </p>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border-l-4 border-[#C9A24A]">
                      <p className="text-sm text-[#0B1B2B] font-medium italic">
                        "A remarkable transformation of diplomatic history into modern luxury hospitality, perfectly positioned for international executives seeking familiarity with excellence."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fragomen Immigration */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8 lg:order-1">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Plane className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Fragomen Immigration</h3>
                          <p className="text-[#C9A24A] font-semibold text-lg">Immigration Excellence</p>
                        </div>
                      </div>
                      
                      <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
                        Bringing 70+ years of global immigration expertise to complex visa requirements, their London team specializes in corporate and investor visas, understanding that professional relocations often involve intricate legal requirements that demand specialist attention.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed mb-6">
                        Their track record with same-day amendments and expedited processing makes them invaluable for time-sensitive relocations across 170+ countries worldwide.
                      </p>
                      
                      <div className="bg-[#F8F9FA] rounded-lg p-4 border-l-4 border-[#C9A24A]">
                        <p className="text-sm text-[#0B1B2B] font-medium italic">
                          "Global reach, local expertise - solving complex immigration challenges before they become emergencies."
                        </p>
                      </div>
                    </div>
                    
                    <div className="aspect-[4/3] lg:aspect-auto lg:order-2">
                      <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                        alt="Fragomen London Immigration Law Firm - Modern office interior"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Coutts International */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                      alt="Coutts International private banking facility in London, featuring elegant marble interiors and personalized wealth management consultations"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Coutts International</h3>
                        <p className="text-[#C9A24A] font-medium text-lg italic">Where the royal warrant meets your portfolio</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <p className="text-[#6B7280] leading-relaxed mb-6 text-lg">
                        Offering something beyond prestige, their non-domicile structuring expertise can deliver substantial tax optimization for relocating professionals. For those with significant assets, proper banking setup isn't just convenient—it's financially essential.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed text-lg">
                        Their international team understands the complexities of cross-border wealth management, providing the sophisticated financial architecture that Fortune 500 executives require when establishing their London presence.
                      </p>
                    </div>
                  </div>
                </div>

                {/* American School in London */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                      alt="American School in London campus featuring modern educational facilities, diverse student body, and world-class learning environments"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>American School in London</h3>
                        <p className="text-[#C9A24A] font-medium text-lg italic">Continuity for your family</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <p className="text-[#6B7280] leading-relaxed mb-6 text-lg">
                        Exemplifying educational excellence for internationally mobile families. With 50 nationalities represented and deep experience in mid-year transfers, they understand that family decisions often drive relocation timing.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed text-lg">
                        Their admissions team specializes in seamless transitions for children of relocating professionals, ensuring academic continuity while embracing the global perspective that defines London's international community.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Preview */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Platform Preview: How Relo Network Works
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Our AI-powered platform launching this week transforms how professionals approach London relocation:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Intelligent Matching</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Input your requirements - location preferences, budget, family needs, timeline - and receive curated recommendations from vetted service providers.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Streamlined Coordination</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Rather than managing dozens of separate relationships, coordinate your entire relocation through one intelligent platform.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Quality Assurance</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Every service provider in our network is personally vetted and selected for their track record with international professionals.
                  </p>
                </div>
              </div>
            </div>

            {/* London Market Intelligence */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                London Market Intelligence
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Location Insights</h3>
                  <ul className="space-y-2 text-[#6B7280]">
                    <li>• Mayfair and Marylebone remain popular for finance professionals seeking proximity to the City</li>
                    <li>• Kensington attracts families prioritizing schools and green spaces</li>
                    <li>• Canary Wharf appeals to banking professionals wanting modern amenities</li>
                    <li>• Greenwich offers value and Thames views for those seeking more space</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Timing Considerations</h3>
                  <ul className="space-y-2 text-[#6B7280]">
                    <li>• School applications: September remains optimal, but mid-year transfers are increasingly accommodated</li>
                    <li>• Property market: Spring and autumn offer the best selection</li>
                    <li>• Visa processing: Allow 8-12 weeks for complex applications</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Budget Planning</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    The total cost of London relocation varies significantly based on service level and requirements. Our platform helps optimize spending by connecting you with the right providers for your specific needs and budget.
                  </p>
                </div>
              </div>
            </div>

            {/* Get Started */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Get Started
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">For Professionals Planning a London Move</h3>
                  <p className="text-[#6B7280] mb-4">
                    Book a 15-minute consultation to understand how Relo Network can streamline your relocation.
                  </p>
                  <a 
                    href="/book-consultation"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors"
                  >
                    Book Consultation
                    <Calendar className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">For Service Providers</h3>
                  <p className="text-[#6B7280] mb-4">
                    If you're a London-based service provider interested in joining our curated network, we'd love to hear from you.
                  </p>
                  <a 
                    href="mailto:hello@therelonetwork.com"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white font-semibold rounded-lg transition-colors"
                  >
                    Get in Touch
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-[#F8F9FA] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                What's Next
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                This week marks the beginning of something significant. Over the coming days, we'll be sharing:
              </p>
              
              <ul className="space-y-2 text-[#6B7280] mb-6">
                <li><strong>Tuesday:</strong> Comprehensive London area guide for professionals</li>
                <li><strong>Thursday:</strong> Banking and financial setup guide for international relocations</li>
                <li><strong>Friday:</strong> Education guide for families moving to London</li>
              </ul>
              
              <p className="text-lg font-semibold text-[#0B1B2B] mb-4">
                This is just the beginning of making London relocation effortless for professionals worldwide.
              </p>
              
              <p className="text-xl font-bold text-[#C9A24A]">
                Relocate to London, Intelligently.
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
            Ready to Experience Executive Relocation?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join the founding partner network that's transforming Fortune 500 relocations to London.
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