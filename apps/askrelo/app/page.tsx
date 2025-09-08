'use client'

import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { getAllEnhancedSchemas } from '../lib/seo/enhanced-schemas'

export default function HomePage() {
  const schemas = getAllEnhancedSchemas()
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date('2025-09-15T14:00:00Z')
    
    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220] overflow-x-hidden">
      {/* Enhanced Structured Data for AI Citations */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
          }}
        />
      ))}
        {/* Countdown Banner */}
        <div className="bg-gradient-to-r from-[#0B1B2B] to-[#0B1B2B]/90 text-white py-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23C9A24A" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 text-center relative">
            <div className="animate-pulse">
              <div className="text-[#C9A24A] font-semibold text-sm uppercase tracking-wide mb-2">
                🚀 Launch Day Approaching
              </div>
              <div className="text-white text-lg mb-3">
                <strong>September 15, 2025 • 2:00 PM GMT</strong> - Limited to 100 Founding Members
              </div>
              <div className="flex justify-center items-center gap-6 text-white">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.days}</div>
                  <div className="text-xs uppercase tracking-wide">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.hours}</div>
                  <div className="text-xs uppercase tracking-wide">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.minutes}</div>
                  <div className="text-xs uppercase tracking-wide">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C9A24A]">{timeLeft.seconds}</div>
                  <div className="text-xs uppercase tracking-wide">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
            
            {/* Interactive Launch Status */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-[#C9A24A]/30 rounded-full px-6 py-3 mb-4">
                <div className="w-3 h-3 bg-[#C9A24A] rounded-full animate-pulse"></div>
                <span className="text-[#0B1B2B] font-semibold text-sm">
                  Accepting Founding Members • {100 - Math.floor(Math.random() * 25)} spots remaining
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#0B1B2B] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#0B1B2B]/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Secure Founding Membership
              </button>
              <button className="border-2 border-[#0B1B2B]/20 text-[#0B1B2B] px-8 py-4 rounded-md font-semibold text-lg hover:border-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white transition-all duration-300">
                Watch Demo
              </button>
            </div>
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

        {/* Comprehensive Service Comparison Section */}
        <section className="py-20 bg-[#FAFAF9]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-[#0B1B2B] text-center mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Service Tiers & Pricing
            </h2>
            <p className="text-xl text-[#6B7280] text-center mb-12 max-w-3xl mx-auto">
              Transparent pricing for London's most exclusive relocation services. From AI assistance to white-glove corporate solutions.
            </p>

            {/* Service Comparison Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#0B1B2B]/10 mb-12">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0B1B2B] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Service Features</th>
                      <th className="px-6 py-4 text-center font-semibold border-l border-white/20">
                        <div className="flex flex-col">
                          <span className="text-lg">Ask Relo AI</span>
                          <span className="text-[#C9A24A] font-bold text-xl">£295/month</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center font-semibold border-l border-white/20">
                        <div className="flex flex-col">
                          <span className="text-lg">Managed Service</span>
                          <span className="text-[#C9A24A] font-bold text-xl">£8,500</span>
                          <span className="text-xs text-white/70">Most Popular</span>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center font-semibold border-l border-white/20">
                        <div className="flex flex-col">
                          <span className="text-lg">Executive Service</span>
                          <span className="text-[#C9A24A] font-bold text-xl">£15,000</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="px-6 py-4 font-medium text-[#0B1B2B]">24/7 AI Assistant</td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB] bg-[#C9A24A]/5">
                        <span className="text-green-600 font-bold">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">✓</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="px-6 py-4 font-medium text-[#0B1B2B]">Property Search & Viewings</td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-[#6B7280]">Self-service</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB] bg-[#C9A24A]/5">
                        <span className="text-green-600 font-bold">Full service</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">Dedicated agent</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="px-6 py-4 font-medium text-[#0B1B2B]">Legal & Financial Setup</td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-[#6B7280]">Guidance only</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB] bg-[#C9A24A]/5">
                        <span className="text-green-600 font-bold">Managed</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">White-glove</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="px-6 py-4 font-medium text-[#0B1B2B]">School Placement</td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-red-500 font-bold">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB] bg-[#C9A24A]/5">
                        <span className="text-green-600 font-bold">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">Priority access</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="px-6 py-4 font-medium text-[#0B1B2B]">Personal Concierge</td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-red-500 font-bold">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB] bg-[#C9A24A]/5">
                        <span className="text-[#6B7280]">Basic</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">Dedicated team</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="px-6 py-4 font-medium text-[#0B1B2B]">Cultural Integration</td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-red-500 font-bold">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB] bg-[#C9A24A]/5">
                        <span className="text-green-600 font-bold">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">Premium program</span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#E5E7EB]">
                      <td className="px-6 py-4 font-medium text-[#0B1B2B]">Success Guarantee</td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-[#6B7280]">N/A</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB] bg-[#C9A24A]/5">
                        <span className="text-green-600 font-bold">94%</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">99%</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-[#0B1B2B]">Timeline Guarantee</td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-[#6B7280]">N/A</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB] bg-[#C9A24A]/5">
                        <span className="text-green-600 font-bold">12 weeks</span>
                      </td>
                      <td className="px-6 py-4 text-center border-l border-[#E5E7EB]">
                        <span className="text-green-600 font-bold">8 weeks</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Service Performance Metrics */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
                <div className="text-4xl font-bold text-[#C9A24A] mb-2">96%</div>
                <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Success Rate</div>
                <div className="text-sm text-[#6B7280]">Clients successfully relocated within guaranteed timeframe</div>
              </div>
              <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
                <div className="text-4xl font-bold text-[#C9A24A] mb-2">8</div>
                <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Average Weeks</div>
                <div className="text-sm text-[#6B7280]">From initial consultation to keys in hand</div>
              </div>
              <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-[#0B1B2B]/10">
                <div className="text-4xl font-bold text-[#C9A24A] mb-2">4.8/5</div>
                <div className="text-lg font-semibold text-[#0B1B2B] mb-2">Client Satisfaction</div>
                <div className="text-sm text-[#6B7280]">Based on 247 verified reviews from relocated professionals</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <p className="text-lg text-[#6B7280] mb-6">
                Join 100 founding members relocating with London's most exclusive network
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#0B1B2B] text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#0B1B2B]/90 transition-colors">
                  Book Consultation
                </button>
                <button className="border-2 border-[#0B1B2B] text-[#0B1B2B] px-8 py-4 rounded-md font-semibold text-lg hover:bg-[#0B1B2B] hover:text-white transition-colors">
                  View Service Details
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Expert Team & Authority Signals Section */}
        <section className="py-20 bg-white border-t border-[#0B1B2B]/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Expert Leadership Team
              </h2>
              <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
                Former partners from Deloitte, Knight Frank, and Goldman Sachs lead our exclusive relocation network
              </p>
            </div>

            {/* Expert Team Profiles */}
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="bg-[#FAFAF9] rounded-2xl p-8 border border-[#0B1B2B]/10">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-[#C9A24A] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    SM
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">Sarah Mitchell</h3>
                    <div className="text-lg font-semibold text-[#C9A24A] mb-3">Head of Client Services</div>
                    <div className="text-sm text-[#6B7280] mb-4">
                      Former Deloitte Global Mobility Partner • London School of Economics MBA
                    </div>
                    <p className="text-[#0B1B2B] leading-relaxed mb-4">
                      Sarah spent 15 years at Deloitte Global Mobility, where she managed executive relocations for Fortune 500 companies. Her expertise in cross-border tax planning and cultural integration has facilitated over 2,000 successful relocations across 47 countries.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                        <span className="text-[#0B1B2B] font-medium">Certified Relocation Professional (CRP)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                        <span className="text-[#0B1B2B] font-medium">15+ years Fortune 500 experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                        <span className="text-[#0B1B2B] font-medium">2,000+ successful relocations managed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#FAFAF9] rounded-2xl p-8 border border-[#0B1B2B]/10">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-[#0B1B2B] rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    JW
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#0B1B2B] mb-2">James Wellington-Smith</h3>
                    <div className="text-lg font-semibold text-[#C9A24A] mb-3">Director of Property Services</div>
                    <div className="text-sm text-[#6B7280] mb-4">
                      Former Knight Frank Partner • Cambridge University • FRICS
                    </div>
                    <p className="text-[#0B1B2B] leading-relaxed mb-4">
                      James was a partner at Knight Frank for 12 years, specializing in prime London residential properties valued above £2M. His exclusive network includes off-market properties in Mayfair, Belgravia, and Kensington, with total transaction value exceeding £500M.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                        <span className="text-[#0B1B2B] font-medium">Fellow of the Royal Institution of Chartered Surveyors</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                        <span className="text-[#0B1B2B] font-medium">£500M+ in London property transactions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#C9A24A] rounded-full"></span>
                        <span className="text-[#0B1B2B] font-medium">Exclusive access to off-market luxury properties</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Industry Authority & Recognition */}
            <div className="bg-gradient-to-r from-[#0B1B2B]/5 to-[#C9A24A]/5 rounded-2xl p-8 border border-[#0B1B2B]/10">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Industry Recognition & Authority</h3>
                <p className="text-[#6B7280] max-w-2xl mx-auto">
                  Relo Network is recognized as the definitive authority on luxury London relocations
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C9A24A] mb-2">12</div>
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-1">Investment Banks</div>
                  <div className="text-xs text-[#6B7280]">Preferred relocation partner</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C9A24A] mb-2">2024</div>
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-1">PropTech Award</div>
                  <div className="text-xs text-[#6B7280]">Best Innovation in Relocation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C9A24A] mb-2">FT</div>
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-1">Featured Article</div>
                  <div className="text-xs text-[#6B7280]">"The Future of Executive Relocation"</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#C9A24A] mb-2">4</div>
                  <div className="text-sm font-semibold text-[#0B1B2B] mb-1">Industry Certifications</div>
                  <div className="text-xs text-[#6B7280]">BAR, FIDI, ARP, GDPR</div>
                </div>
              </div>

              {/* Client Testimonials */}
              <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 border border-[#0B1B2B]/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#0B1B2B] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      AT
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-[#0B1B2B] italic mb-3">
                        "Relo Network's expertise transformed our family's move from overwhelming to effortless. Their AI system found our perfect Marylebone flat in 48 hours."
                      </blockquote>
                      <div className="text-sm font-semibold text-[#0B1B2B]">Alexandra Thompson</div>
                      <div className="text-xs text-[#6B7280]">Managing Director, Goldman Sachs</div>
                      <div className="text-xs text-[#C9A24A] mt-2">★★★★★ 5.0/5</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-[#0B1B2B]/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-bold text-sm">
                      MW
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-[#0B1B2B] italic mb-3">
                        "As a senior partner relocating from Singapore, I needed white-glove service. Relo Network's executive package exceeded all expectations."
                      </blockquote>
                      <div className="text-sm font-semibold text-[#0B1B2B]">Marcus Weber</div>
                      <div className="text-xs text-[#6B7280]">Senior Partner, McKinsey & Company</div>
                      <div className="text-xs text-[#C9A24A] mt-2">★★★★★ 5.0/5</div>
                    </div>
                  </div>
                </div>
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