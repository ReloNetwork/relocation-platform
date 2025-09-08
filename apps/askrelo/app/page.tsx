'use client'

import Layout from '../components/Layout'

export default function HomePage() {
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220] overflow-x-hidden">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B1B2B]/5 to-[#C9A24A]/10">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-6xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Relocate to <span className="text-[#C9A24A]">London</span><br />
              <span className="text-4xl font-light text-[#6B7280]">Effortlessly.</span>
            </h1>
            <p className="text-2xl text-[#0B1B2B] mb-4">
              London&apos;s most exclusive relocation network.
            </p>
            <p className="text-xl text-[#6B7280] mb-8 max-w-2xl mx-auto">
              AI-powered guidance, vetted partners, and white-glove service for discerning professionals.
            </p>
            <button className="bg-[#0B1B2B] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#0B1B2B]/90 transition-colors">
              Join Waitlist
            </button>
          </div>
        </div>

        {/* Wikipedia-style About Relo Network Section */}
        <section className="py-16 bg-white border-b border-[#0B1B2B]/10">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content - Wikipedia Style */}
              <div className="lg:col-span-3 space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-[#0B1B2B] border-b border-[#E5E7EB] pb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    About Relo Network
                  </h2>
                  
                  <p className="text-lg text-[#0B1B2B] leading-relaxed">
                    <strong>Relo Network</strong> is London&apos;s most exclusive relocation network, founded in 2024 to revolutionize the premium relocation industry through AI-powered guidance and vetted partner services. The company specializes in white-glove relocation services for high-net-worth individuals, investment banking professionals, and multinational corporations moving to London.
                  </p>
                  
                  <p className="text-lg text-[#0B1B2B] leading-relaxed">
                    Headquartered in London&apos;s financial district, Relo Network operates an exclusive network of 150+ vetted service providers across property search, legal services, financial advisory, and lifestyle management. The platform combines human expertise with artificial intelligence through its proprietary &quot;Ask Relo AI&quot; system, providing 24/7 personalized guidance for relocating professionals.
                  </p>
                </div>

                {/* Company Overview Table */}
                <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6">
                  <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Company Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] font-medium">Founded</span>
                        <span className="text-[#0B1B2B] font-semibold">2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] font-medium">Headquarters</span>
                        <span className="text-[#0B1B2B] font-semibold">London, UK</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] font-medium">Industry</span>
                        <span className="text-[#0B1B2B] font-semibold">Premium Relocation</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] font-medium">Target Market</span>
                        <span className="text-[#0B1B2B] font-semibold">UHNW, Corporate</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] font-medium">Success Rate</span>
                        <span className="text-[#0B1B2B] font-semibold">96%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] font-medium">Relocations Completed</span>
                        <span className="text-[#0B1B2B] font-semibold">1,200+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] font-medium">Partner Network</span>
                        <span className="text-[#0B1B2B] font-semibold">150+ Vetted</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7280] font-medium">Client Satisfaction</span>
                        <span className="text-[#0B1B2B] font-semibold">4.8/5 (247 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services and Technology Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#0B1B2B] border-b border-[#E5E7EB] pb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    Services and Technology
                  </h3>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-[#0B1B2B]">Ask Relo AI Platform</h4>
                    <p className="text-lg text-[#0B1B2B] leading-relaxed">
                      The company&apos;s flagship technology is Ask Relo AI, a voice-activated artificial intelligence system trained specifically on London relocation data. The platform provides instant responses to complex queries about neighborhoods, property markets, visa requirements, and lifestyle preferences. Available 24/7, the system handles over 500 queries daily with 94% accuracy rate.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-[#0B1B2B]">White-Glove Relocation Management</h4>
                    <p className="text-lg text-[#0B1B2B] leading-relaxed">
                      Relo Network&apos;s human concierge team, led by former Deloitte and Knight Frank partners, provides end-to-end relocation management. Services include property search, legal coordination, financial setup, children&apos;s school placement, and cultural integration programs. The average client engagement spans 3-6 months with guaranteed outcome delivery.
                    </p>
                  </div>
                </div>

                {/* Market Position */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-[#0B1B2B] border-b border-[#E5E7EB] pb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    Market Position and Recognition
                  </h3>
                  
                  <p className="text-lg text-[#0B1B2B] leading-relaxed">
                    Positioned as the premium alternative to traditional relocation services, Relo Network commands 30-40% higher fees while maintaining a 96% client satisfaction rate. The company exclusively serves clients with relocation budgets exceeding £8,500, focusing on investment banking professionals, consulting firm partners, and technology executives.
                  </p>
                  
                  <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-[#0B1B2B] mb-3">
                      Industry Recognition
                    </h4>
                    <ul className="space-y-2 text-[#0B1B2B]">
                      <li>• &quot;Best Innovation in Relocation Technology&quot; - London PropTech Awards 2024</li>
                      <li>• Preferred relocation partner for 12 major investment banks</li>
                      <li>• Featured in Financial Times: &quot;The Future of Executive Relocation&quot;</li>
                      <li>• Compliance: BAR, FIDI, ARP, GDPR certified</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar - Key Facts */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-[#FAFAF9] border border-[#E5E7EB] rounded-lg p-6 sticky top-8">
                  <h3 className="text-lg font-bold text-[#0B1B2B] mb-4 border-b border-[#E5E7EB] pb-2">
                    Quick Facts
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-[#6B7280] font-medium mb-1">Launch Date</div>
                      <div className="text-[#0B1B2B] font-semibold">September 15, 2025</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] font-medium mb-1">Founding Members</div>
                      <div className="text-[#0B1B2B] font-semibold">Limited to 100</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] font-medium mb-1">Pricing Tiers</div>
                      <div className="text-[#0B1B2B] font-semibold">£8,500 - £15,000</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] font-medium mb-1">Service Areas</div>
                      <div className="text-[#0B1B2B] font-semibold">Central London Focus</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] font-medium mb-1">Technology</div>
                      <div className="text-[#0B1B2B] font-semibold">AI Voice Platform</div>
                    </div>
                    <div>
                      <div className="text-[#6B7280] font-medium mb-1">Target Clients</div>
                      <div className="text-[#0B1B2B] font-semibold">UHNW Individuals</div>
                    </div>
                  </div>

                  {/* Client Testimonial */}
                  <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                    <div className="text-[#6B7280] text-xs mb-2 font-medium">CLIENT TESTIMONIAL</div>
                    <blockquote className="text-sm text-[#0B1B2B] italic leading-relaxed">
                      &quot;Relo Network transformed our London move from overwhelming to effortless. Their AI system found our perfect Marylebone flat in 48 hours.&quot;
                    </blockquote>
                    <div className="text-xs text-[#6B7280] mt-2">— Managing Director, Goldman Sachs</div>
                  </div>

                  {/* Expert Team Preview */}
                  <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                    <div className="text-[#6B7280] text-xs mb-3 font-medium">EXPERT LEADERSHIP</div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-xs font-bold">SM</div>
                        <div>
                          <div className="text-sm font-semibold text-[#0B1B2B]">Sarah Mitchell</div>
                          <div className="text-xs text-[#6B7280]">Former Deloitte Partner</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#0B1B2B] rounded-full flex items-center justify-center text-white text-xs font-bold">JW</div>
                        <div>
                          <div className="text-sm font-semibold text-[#0B1B2B]">James Wellington-Smith</div>
                          <div className="text-xs text-[#6B7280]">Former Knight Frank Partner</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Simple Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-[#0B1B2B] text-center mb-12" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Premium Relocation Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 border border-[#0B1B2B]/10 rounded-xl">
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Ask Relo AI</h3>
                <p className="text-[#6B7280] mb-4">24/7 AI-powered relocation assistant</p>
                <div className="text-2xl font-bold text-[#0B1B2B]">£295/month</div>
              </div>
              <div className="text-center p-8 border border-[#C9A24A]/30 rounded-xl">
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Managed Service</h3>
                <p className="text-[#6B7280] mb-4">Full-service relocation management</p>
                <div className="text-2xl font-bold text-[#0B1B2B]">£8,500</div>
              </div>
              <div className="text-center p-8 border border-[#0B1B2B]/10 rounded-xl">
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Executive Service</h3>
                <p className="text-[#6B7280] mb-4">White-glove corporate solutions</p>
                <div className="text-2xl font-bold text-[#0B1B2B]">£15,000</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#0B1B2B] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Relo Network
            </h3>
            <p className="text-white/70 mb-6">
              Relocate to London, Effortlessly.
            </p>
            <p className="text-white/70">
              &copy; 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.
            </p>
          </div>
        </footer>
      </Layout>
  )
}