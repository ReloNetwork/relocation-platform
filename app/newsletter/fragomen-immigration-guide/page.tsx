'use client';

import React from 'react'
import { ArrowLeft, ExternalLink, Star, Calendar, User, Plane, Shield, CheckCircle, Clock, Tag, Share2, Globe } from 'lucide-react'
import Link from 'next/link'
import GlobalNavigationFixed from '@/components/GlobalNavigationFixed'
import Analytics from '@/components/Analytics'

export default function FragomenImmigrationGuide() {
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
              <Globe className="w-4 h-4 mr-2" />
              Partner Spotlight
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Corporate Immigration Excellence: How Fragomen London Transforms Executive Visa Processing
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              70+ years of global immigration expertise meets London's complex visa landscape - your guide to seamless executive visa processing
            </p>
            
            <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
The Relo Network Team
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                January 9, 2025
              </div>
              <div>9 min read</div>
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
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=450&fit=crop&crop=center&auto=format&q=80" 
                  alt="Modern immigration law office interior featuring professional consultation areas and global visa processing expertise"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
              <p className="text-lg text-[#0B1B2B] leading-relaxed mb-6">
                <strong>When Global Mobility Meets Local Expertise,</strong>
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Last month, a Fortune 500 technology executive received a same-day amendment to his Global Talent visa, enabling a critical board meeting in London. The week before, a private equity partner's family secured expedited dependent visas, allowing their children to start at the American School in London mid-term.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                These aren't unusual occurrences—they represent the standard of service that has made Fragomen the global leader in corporate immigration, with their London team specializing in the complex visa requirements that define executive relocations.
              </p>
              
              <p className="text-xl font-semibold text-[#0B1B2B] text-center">
                <strong>This is immigration law reimagined for the global executive</strong> - where decades of expertise meet the urgency of international business.
              </p>
              </div>
            </div>

            {/* Immigration Law Overview */}
            <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#C9A24A]/5 border-l-4 border-[#C9A24A] rounded-r-xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Executive Immigration in London</h3>
                  <p className="text-[#6B7280] mb-3">
                    London's immigration landscape requires specialized expertise for executive relocations. Leading global firms like Fragomen and others provide sophisticated immigration services, with teams dedicated to corporate and high-net-worth client requirements.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-semibold text-[#0B1B2B]">Focus:</span>
                      <span className="text-[#6B7280] ml-1">Complex Executive Visa Requirements</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Immigration Complexity Demands Expertise */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Why Executive Immigration Demands Specialist Expertise
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                UK immigration law has become increasingly complex, with frequent policy changes and heightened scrutiny on high-value applications. For executives, immigration isn't just about compliance—it's about optimizing tax status, ensuring family continuity, and maintaining business operations across multiple jurisdictions.
              </p>
              
              <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Executive Immigration Challenges:</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Complex investment thresholds for Innovator and Investor visas</li>
                  <li>• Global Talent visa requirements for exceptional achievement documentation</li>
                  <li>• Intra-company transfer regulations for multinational executives</li>
                  <li>• Family dependent visa coordination and timing</li>
                  <li>• Tax residency implications and non-domicile structuring</li>
                  <li>• Expedited processing for time-sensitive relocations</li>
                </ul>
              </div>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                <strong>The Corporate Reality:</strong> Fortune 500 companies rely on immigration specialists not just for compliance, but for strategic advantage. The right visa strategy can accelerate deployment of key executives, optimize tax exposure, and ensure family stability during complex international transitions.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed">
                <strong>The Fragomen Advantage:</strong> With offices in 170+ countries and dedicated teams for each visa category, Fragomen provides the global coordination and local expertise that executive relocations demand.
              </p>
            </div>

            {/* Fragomen's Executive Services */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Fragomen's Executive Immigration Services
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-8">
                Fragomen's London team has developed specialized processes for the unique requirements of executive relocations, from initial visa strategy through to permanent residency and citizenship applications.
              </p>

              {/* Service Categories */}
              <div className="space-y-8">
                
                {/* Global Talent Visas */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Global Talent & Exceptional Promise Visas</h3>
                        <p className="text-[#C9A24A] font-semibold text-lg">Fast-track for recognized leaders</p>
                      </div>
                    </div>
                    
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
                      For executives with exceptional achievements in technology, finance, or academia, the Global Talent visa offers the fastest path to UK residency. Fragomen's team specializes in building compelling endorsement applications that demonstrate the exceptional talent criteria.
                    </p>
                    
                    <p className="text-[#6B7280] leading-relaxed mb-6">
                      Recent successes include AI executives, fintech founders, and investment management leaders securing endorsements from Tech Nation, ACCA, and the Royal Society.
                    </p>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border-l-4 border-[#C9A24A]">
                      <p className="text-sm text-[#0B1B2B] font-medium italic">
                        "Global Talent visas offer immediate work authorization and fast-track to settlement - ideal for executives planning long-term UK presence."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Corporate Visas */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8 lg:order-1">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Skilled Worker & Intra-Company Transfers</h3>
                          <p className="text-[#C9A24A] font-semibold text-lg">Corporate deployment expertise</p>
                        </div>
                      </div>
                      
                      <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
                        For multinational corporations deploying executives to London operations, Fragomen manages the complex sponsor license requirements and individual visa applications that enable rapid deployment of senior talent.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed mb-6">
                        Their corporate clients include Fortune 500 technology companies, investment banks, and consulting firms requiring seamless executive transfers between global offices.
                      </p>
                      
                      <div className="bg-[#F8F9FA] rounded-lg p-4 border-l-4 border-[#C9A24A]">
                        <p className="text-sm text-[#0B1B2B] font-medium italic">
                          "Corporate visa success depends on understanding both immigration law and business operational requirements."
                        </p>
                      </div>
                    </div>
                    
                    <div className="aspect-[4/3] lg:aspect-auto lg:order-2">
                      <img 
                        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                        alt="Corporate immigration consultation featuring professional meeting between executives and immigration specialists"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Investment Visas */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                      alt="Investment visa consultation featuring financial documentation and UK investment opportunities"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center">
                        <Plane className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>Innovator & Start-up Visas</h3>
                        <p className="text-[#C9A24A] font-medium text-lg italic">Entrepreneurial pathway expertise</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <p className="text-[#6B7280] leading-relaxed mb-6 text-lg">
                        For entrepreneurs and investors establishing UK operations, Fragomen provides end-to-end support for Innovator and Start-up visa applications, including business plan development and endorsing body relationships.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed text-lg">
                        Their expertise extends to structuring investments that satisfy Home Office requirements while optimizing business operational flexibility and tax efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* The Fragomen Process */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                The Fragomen Executive Immigration Process
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Fragomen's approach to executive immigration combines legal expertise with project management discipline, ensuring that visa applications support broader business objectives while meeting strict Home Office requirements.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Strategic Assessment</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Initial consultation includes visa route optimization, tax implications assessment, and family coordination requirements. This strategic foundation ensures the immigration approach supports long-term objectives.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Documentation Excellence</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Fragomen's documentation teams understand the specific evidence requirements for executive applications, from exceptional talent documentation to complex corporate structures and investment verification.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Expedited Processing</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    When business requirements demand accelerated processing, Fragomen coordinates priority services and same-day amendments, ensuring immigration timelines align with corporate deployment schedules.
                  </p>
                </div>
              </div>
            </div>

            {/* Real Results */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Executive Immigration Success Stories
              </h2>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
                <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Recent Executive Successes</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Fortune 500 Technology Executive</div>
                    <div className="text-[#6B7280]">Global Talent visa approved in 3 weeks, enabling £2M+ compensation package optimization through non-domicile status</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Private Equity Managing Director</div>
                    <div className="text-[#6B7280]">Innovator visa secured for fintech investment fund, with family dependent visas processed simultaneously for September school start</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Investment Banking VP</div>
                    <div className="text-[#6B7280]">Intra-company transfer coordinated with sponsor license upgrade, enabling immediate deployment to London trading desk</div>
                  </div>
                </div>
              </div>

              <p className="text-[#6B7280] leading-relaxed">
                <strong>The Executive Difference:</strong> Fragomen's success with executive immigration stems from understanding that visa applications are just one component of complex international business strategies. Their holistic approach ensures immigration solutions support broader objectives.
              </p>
            </div>

            {/* Working with Fragomen */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Coordinating Executive Immigration Services
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Successful executive relocations require coordinated immigration services alongside property search, banking, and education planning. Leading immigration firms offer specialized support for high-level international moves.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Immediate Assessment</h3>
                  <p className="text-[#6B7280] mb-4">
                    Executive consultation within 48 hours for initial visa route assessment and strategic planning. Priority scheduling ensures immigration planning doesn't delay business operations.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Coordinated Service Delivery</h3>
                  <p className="text-[#6B7280] mb-4">
                    Immigration timeline coordination with property search, banking setup, and school applications through the Relo Network platform, ensuring seamless executive relocation.
                  </p>
                </div>
              </div>
            </div>

            {/* Get Started */}
            <div className="bg-[#F8F9FA] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Begin Your Executive Immigration Process
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Immigration excellence isn't about paperwork—it's about enabling global executives to deploy effectively while optimizing tax exposure and ensuring family stability.
              </p>
              
              <p className="text-lg font-semibold text-[#0B1B2B] mb-6">
                Ready to experience immigration law designed for executives?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/book-consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors"
                >
                  Book Immigration Consultation
                  <Calendar className="w-4 h-4" />
                </a>
                <a 
                  href="/partners"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white font-semibold rounded-lg transition-colors"
                >
                  View Immigration Partners
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <p className="text-xl font-bold text-[#C9A24A] mt-6">
                Navigate Global Immigration, Intelligently.
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
            Ready for Seamless Executive Immigration?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join the executive network that's redefining corporate immigration with world-class expertise and coordinated service delivery.
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