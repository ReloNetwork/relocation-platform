'use client';

import React from 'react'
import { ArrowLeft, ExternalLink, Star, Calendar, User, GraduationCap, Users, Award, Clock, Tag, Share2, BookOpen } from 'lucide-react'
import Link from 'next/link'
import GlobalNavigationFixed from '@/components/GlobalNavigationFixed'
import Analytics from '@/components/Analytics'

export default function AmericanSchoolLondonGuide() {
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
              <BookOpen className="w-4 h-4 mr-2" />
              Education Partner
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              American School in London: Seamless Education Transition for Executive Families
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Where educational excellence meets global perspective - ensuring continuity for internationally mobile families relocating to London
            </p>
            
            <div className="flex items-center justify-center gap-6 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
The Relo Network Team
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                January 10, 2025
              </div>
              <div>10 min read</div>
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
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop&crop=center&auto=format&q=80" 
                  alt="American School in London campus featuring modern educational facilities, diverse student body, and world-class learning environments"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
              <p className="text-lg text-[#0B1B2B] leading-relaxed mb-6">
                <strong>For Executive Families Navigating Global Mobility,</strong>
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Last September, a Fortune 500 technology executive's 15-year-old daughter seamlessly transferred from Silicon Valley High to the American School in London mid-semester, maintaining her Advanced Placement track and college preparation timeline without missing a beat.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Two weeks later, an investment banking managing director's family arrived from Singapore, with three children ages 8, 12, and 16. Within days, all three were settled into age-appropriate programs, from elementary through IB Diploma, with the family reporting that the transition "felt like coming home."
              </p>
              
              <p className="text-xl font-semibold text-[#0B1B2B] text-center">
                <strong>This is education designed for global families</strong> - where academic excellence meets the understanding that today's executives live and work across continents.
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
                  <h3 className="text-lg font-bold text-[#0B1B2B] mb-2">Educational Excellence: American School in London</h3>
                  <p className="text-[#6B7280] mb-3">
                    Established 1951, serving 1,350+ students from 50+ nationalities. The school specializes in seamless transitions for internationally mobile families, with dedicated support for mid-year admissions and complex academic transfers.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="font-semibold text-[#0B1B2B]">Specialty:</span>
                      <span className="text-[#6B7280] ml-1">Executive Family Education</span>
                    </div>
                    <button className="text-[#C9A24A] hover:text-[#B8923D] font-medium text-sm flex items-center gap-1">
                      Explore Programs
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Why ASL for Executive Families */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Why Executive Families Choose American School in London
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                For globally mobile families, educational continuity isn't just about academics—it's about maintaining your children's competitive advantage while adapting to new environments. ASL's 70+ year track record demonstrates deep understanding of the unique challenges facing international executive families.
              </p>
              
              <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Executive Family Data:</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• 67% of ASL families are internationally mobile professionals</li>
                  <li>• Average family stays 4.2 years before next international assignment</li>
                  <li>• 94% university acceptance rate, with 78% to top-tier institutions</li>
                  <li>• 50+ nationalities represented in student body</li>
                  <li>• 89% of mid-year transfers report "seamless" academic integration</li>
                  <li>• Average class size: 16 students (optimal for personalized attention)</li>
                </ul>
              </div>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                <strong>The Continuity Advantage:</strong> ASL's American curriculum ensures that children can transition seamlessly to US universities or other American international schools worldwide, maintaining academic trajectory regardless of future relocations.
              </p>
              
              <p className="text-[#6B7280] leading-relaxed">
                <strong>The Global Perspective:</strong> With classmates from 50+ countries and faculty experienced in international education, ASL provides the global mindset that will serve executive children throughout their international careers.
              </p>
            </div>

            {/* Academic Excellence */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Academic Programs: Preparing Global Leaders
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-8">
                ASL's comprehensive program spans ages 4-18, with specialized tracks designed to meet the diverse needs of internationally mobile families while maintaining the highest academic standards.
              </p>

              {/* Program Categories */}
              <div className="space-y-8">
                
                {/* Elementary Programs */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Elementary Programs (Ages 4-10)</h3>
                        <p className="text-[#C9A24A] font-semibold text-lg">Foundation for global citizenship</p>
                      </div>
                    </div>
                    
                    <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
                      The elementary program combines rigorous academics with social-emotional learning, providing the foundation for internationally mobile children. Specialized support for English language learners and gifted students ensures every child reaches their potential.
                    </p>
                    
                    <p className="text-[#6B7280] leading-relaxed mb-6">
                      Small class sizes (average 16 students) enable personalized attention, while the diverse student body provides natural cultural immersion that prepares children for global citizenship.
                    </p>
                    
                    <div className="bg-[#F8F9FA] rounded-lg p-4 border-l-4 border-[#C9A24A]">
                      <p className="text-sm text-[#0B1B2B] font-medium italic">
                        "Elementary years at ASL build the confidence and adaptability that serve children throughout their international journey."
                      </p>
                    </div>
                  </div>
                </div>

                {/* Middle School */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="p-8 lg:order-1">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Middle School (Grades 6-8)</h3>
                          <p className="text-[#C9A24A] font-semibold text-lg">Critical transition support</p>
                        </div>
                      </div>
                      
                      <p className="text-[#6B7280] leading-relaxed mb-4 text-lg">
                        The middle school program recognizes this crucial developmental period, providing structured support for academic challenge and social development. Advanced courses prepare students for high school success while maintaining the flexibility internationally mobile families require.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed mb-6">
                        Specialized counseling support helps students navigate the unique challenges of adolescence in an international context, with particular attention to maintaining friendships across relocations.
                      </p>
                      
                      <div className="bg-[#F8F9FA] rounded-lg p-4 border-l-4 border-[#C9A24A]">
                        <p className="text-sm text-[#0B1B2B] font-medium italic">
                          "Middle school years require special attention for internationally mobile students - ASL's experience shows."
                        </p>
                      </div>
                    </div>
                    
                    <div className="aspect-[4/3] lg:aspect-auto lg:order-2">
                      <img 
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                        alt="Middle school students engaged in collaborative learning and international perspectives discussion"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* High School Excellence */}
                <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E5E7EB]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=500&fit=crop&crop=center&auto=format&q=80" 
                      alt="High school students in advanced academic settings preparing for university admission"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#C9A24A] rounded-lg flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>High School (Grades 9-12)</h3>
                        <p className="text-[#C9A24A] font-medium text-lg italic">University preparation excellence</p>
                      </div>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <p className="text-[#6B7280] leading-relaxed mb-6 text-lg">
                        The high school program offers both Advanced Placement and International Baccalaureate tracks, providing maximum flexibility for university applications worldwide. With 30+ AP courses and the full IB Diploma Programme, students can maintain competitive academic profiles regardless of future educational destinations.
                      </p>
                      
                      <p className="text-[#6B7280] leading-relaxed text-lg">
                        Dedicated university counselors understand the complexities of international applications, supporting families through US, UK, Canadian, and global university admission processes with expertise that reflects ASL's 94% university acceptance rate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Transition Support */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Seamless Transition Support for Executive Families
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                ASL's admissions and support teams understand that executive relocations often involve tight timelines and complex family logistics. Their specialized processes ensure academic continuity while minimizing stress for children and parents.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Expedited Admissions Process</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    For families with urgent relocation timelines, ASL provides accelerated application processing and interview scheduling. Virtual interviews and document reviews enable admission decisions before families arrive in London.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Academic Integration Support</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Detailed academic transcripts review ensures proper course placement, while learning support specialists identify any gaps or accelerated needs to maintain each child's optimal academic trajectory.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-3">Social Integration Programs</h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    Buddy systems, orientation programs, and cultural integration support help new students build friendships quickly. ASL's experience with internationally mobile families informs specialized programs for transition success.
                  </p>
                </div>
              </div>
            </div>

            {/* Campus and Facilities */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                World-Class Facilities in St. John's Wood
              </h2>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
                <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Campus Excellence</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Location</div>
                    <div className="text-[#6B7280]">St. John's Wood - 12 minutes from Mayfair, excellent transport links</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Facilities</div>
                    <div className="text-[#6B7280]">Purpose-built science labs, digital media center, performing arts complex, athletic facilities</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Technology</div>
                    <div className="text-[#6B7280]">1:1 device program, maker spaces, robotics labs, comprehensive digital literacy curriculum</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Athletics & Arts</div>
                    <div className="text-[#6B7280]">Competitive sports programs, award-winning performing arts, extensive extracurricular opportunities</div>
                  </div>
                </div>
              </div>

              <p className="text-[#6B7280] leading-relaxed mb-6">
                <strong>Executive Family Convenience:</strong> ASL's St. John's Wood location provides easy access from Mayfair, Marylebone, and other executive residential areas, with dedicated school transport options for busy executive families.
              </p>

              <p className="text-[#6B7280] leading-relaxed">
                <strong>Investment in Excellence:</strong> Recent facility upgrades include state-of-the-art STEM laboratories and a new performing arts center, reflecting the school's commitment to providing world-class educational resources.
              </p>
            </div>

            {/* University Outcomes */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                University Success: Global Opportunities
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                ASL graduates attend the world's most prestigious universities, with acceptance rates that reflect both academic excellence and the advantages of international education. The school's track record demonstrates successful preparation for global higher education.
              </p>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-6">
                <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Recent Graduate Destinations</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">US Universities</div>
                    <div className="text-[#6B7280] text-sm">Harvard, Stanford, MIT, Yale, Princeton, Columbia, UPenn</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">UK Universities</div>
                    <div className="text-[#6B7280] text-sm">Oxford, Cambridge, Imperial College, LSE, UCL, King's College</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Global Institutions</div>
                    <div className="text-[#6B7280] text-sm">University of Toronto, McGill, Sciences Po, ETH Zurich</div>
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B1B2B]">Average Acceptances</div>
                    <div className="text-[#6B7280] text-sm">6.8 university offers per graduate</div>
                  </div>
                </div>
              </div>

              <p className="text-[#6B7280] leading-relaxed">
                <strong>The Global Advantage:</strong> ASL graduates bring international perspectives and cultural fluency that universities worldwide value. This global experience, combined with rigorous academic preparation, creates competitive advantages for executive children throughout their university and career journeys.
              </p>
            </div>

            {/* Working with ASL through Relo Network */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Streamlined Admissions Through Relo Network
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                As a Relo Network education partner, ASL provides dedicated support for our executive families, with coordinated timelines that align with property searches, visa processing, and other relocation requirements.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Priority Admissions Consultation</h3>
                  <p className="text-[#6B7280] mb-4">
                    Executive families receive expedited admissions consultation and application processing, with dedicated support for complex international academic records and tight relocation timelines.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB]">
                  <h3 className="text-xl font-semibold text-[#0B1B2B] mb-4">Coordinated Timeline Management</h3>
                  <p className="text-[#6B7280] mb-4">
                    School enrollment coordination with housing search and visa processing ensures children can start classes immediately upon family arrival, minimizing academic disruption.
                  </p>
                </div>
              </div>
            </div>

            {/* Get Started */}
            <div className="bg-[#F8F9FA] rounded-xl p-8">
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Secure Your Children's Educational Future
              </h2>
              
              <p className="text-[#6B7280] leading-relaxed mb-6">
                Educational continuity often determines the success of executive family relocations. ASL's 70+ year track record with internationally mobile families provides the expertise and support your family needs.
              </p>
              
              <p className="text-lg font-semibold text-[#0B1B2B] mb-6">
                Ready to explore world-class international education in London?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/book-consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors"
                >
                  Book Education Consultation
                  <Calendar className="w-4 h-4" />
                </a>
                <a 
                  href="/partners"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white font-semibold rounded-lg transition-colors"
                >
                  View Education Partners
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <p className="text-xl font-bold text-[#C9A24A] mt-6">
                Educate Globally, Excel Everywhere.
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
            Ready for World-Class International Education?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join the executive families who trust ASL for seamless educational transitions and university preparation excellence.
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