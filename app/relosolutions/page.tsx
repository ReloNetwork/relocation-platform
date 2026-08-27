'use client'

import React from 'react'
import Layout from '../../components/Layout'
import { Button } from '../../ui/components/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/components/card'
import { Badge } from '../../ui/components/badge'
import { CheckCircle, Star, ArrowRight, Mic, Users, Building, Phone, MessageSquare, BarChart3, TrendingUp, Zap, Shield, Award } from 'lucide-react'
import { checkoutFunctions } from '../../lib/checkout'

export default function ReloSolutionsPage() {
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220]" showFooter={false}>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-[#C9A24A]/15 to-[#C9A24A]/5 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0B1B2B]/8 to-[#0B1B2B]/3 blur-2xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <Badge className="bg-[#C9A24A]/10 text-[#C9A24A] border-[#C9A24A]/20 mb-6">
            AI-Powered Business Solutions
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relo <span className="text-[#C9A24A]">AI Solutions</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-[#0B1B2B] mb-4 max-w-4xl mx-auto leading-relaxed font-medium px-4">
            The AI assistant that handles consultations for Fortune 500 executives now powers premium service businesses.
          </p>
          
          <p className="text-sm sm:text-base text-[#6B7280] mb-8 max-w-4xl mx-auto leading-relaxed px-4">
            Capture every client inquiry 24/7, recover lost revenue, and scale your premium service with proven AI technology.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
            <Button
              onClick={() => window.location.href = '/ai-demo'}
              size="lg"
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-2xl hover:shadow-[#C9A24A]/25"
            >
              Get Your Custom AI Assistant
            </Button>
            <Button
              onClick={() => window.location.href = '/ai-demo'}
              variant="outline"
              size="lg"
              className="border-[#0B1B2B] text-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>

      {/* Strategic Positioning Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Your New Brand: <span className="text-[#C9A24A]">AI-Powered Consultant</span>
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto leading-relaxed">
              "We built an AI assistant that handles consultations for Fortune 500 executives relocating to London. 
              Now, We help other premium service businesses implement the same technology to capture every client inquiry 24/7 and recover lost revenue."
            </p>
          </div>

          {/* Why This Works */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <Card className="text-center border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <CardTitle className="text-lg">Social Proof</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#6B7280]">We use the same technology for high-stakes Fortune 500 consultations</p>
              </CardContent>
            </Card>

            <Card className="text-center border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <CardTitle className="text-lg">Credibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#6B7280]">We serve Fortune 500 executives - the highest caliber of clients</p>
              </CardContent>
            </Card>

            <Card className="text-center border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <CardTitle className="text-lg">Empathy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#6B7280]">We understand your business challenges as a service provider ourself</p>
              </CardContent>
            </Card>

            <Card className="text-center border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#C9A24A]" />
                </div>
                <CardTitle className="text-lg">ROI-Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[#6B7280]">Our solution offers revenue recovery and growth, not just software</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Offers Section */}
      <section className="py-20 bg-[#FAFAF9]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Premium AI Solutions
            </h2>
            <p className="text-xl text-[#6B7280] max-w-4xl mx-auto leading-relaxed">
              Our services are not a commodity; they are a bespoke, high-value solutions, priced accordingly.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Executive Voice AI */}
            <Card className="relative overflow-hidden border-2 border-[#C9A24A]/20 hover:border-[#C9A24A]/40 transition-all hover:shadow-2xl group">
              <div className="absolute top-0 right-0 bg-[#C9A24A] text-white px-4 py-2 text-sm font-semibold">
                MOST POPULAR
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#C9A24A]/10 rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-[#C9A24A]" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Executive Voice AI</CardTitle>
                    <CardDescription className="text-[#6B7280]">Premium Local Businesses</CardDescription>
                  </div>
                </div>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-[#C9A24A]">£2,497</div>
                  <div className="text-sm text-[#6B7280] mb-2">Setup Fee</div>
                  <div className="text-2xl font-semibold text-[#0B1B2B]">£497<span className="text-sm text-[#6B7280]">/month</span></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[#6B7280] font-medium">Perfect for dentists, med spas, law firms</p>
                  
                  <div className="space-y-2">
                    {[
                      'Custom AI agent for your business',
                      'Calendar & CRM integration',
                      '3 conversation flows',
                      '30-day optimization period',
                      'Unlimited calls (up to 1,000/mo)',
                      'Analytics dashboard',
                      'Team training included'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#C9A24A] flex-shrink-0" />
                        <span className="text-[#0B1B2B] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-[#0B1B2B] text-center">
                    ROI: Pays for itself in the first week by capturing just 4-5 high-value appointments you're currently missing
                  </p>
                </div>

                <Button 
                  onClick={checkoutFunctions.aiExecutive}
                  className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold"
                  size="lg"
                >
                  Get Executive Voice AI
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Voice AI */}
            <Card className="relative overflow-hidden border-2 border-[#0B1B2B]/20 hover:border-[#0B1B2B]/40 transition-all hover:shadow-2xl group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#0B1B2B]/10 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-[#0B1B2B]" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Enterprise Voice AI</CardTitle>
                    <CardDescription className="text-[#6B7280]">Multi-Location Businesses</CardDescription>
                  </div>
                </div>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold text-[#0B1B2B]">£4,997</div>
                  <div className="text-sm text-[#6B7280] mb-2">Setup Fee</div>
                  <div className="text-2xl font-semibold text-[#0B1B2B]">£997<span className="text-sm text-[#6B7280]">/month</span></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[#6B7280] font-medium">For franchises & high-volume operations</p>
                  
                  <div className="space-y-2">
                    {[
                      'Everything in Executive tier',
                      'Multiple AI agents (reception, sales)',
                      'Advanced CRM integration',
                      'Multi-location support',
                      'Dedicated account manager',
                      'Priority support & updates',
                      'Custom reporting dashboard'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#0B1B2B] flex-shrink-0" />
                        <span className="text-[#0B1B2B] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-[#0B1B2B]/10 border border-[#0B1B2B]/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-[#0B1B2B] text-center">
                    ROI: Your business is losing six figures annually from missed calls. 10x return guaranteed.
                  </p>
                </div>

                <Button 
                  onClick={checkoutFunctions.aiEnterprise}
                  className="w-full bg-[#0B1B2B] hover:bg-[#1a2b3b] text-white font-semibold"
                  size="lg"
                >
                  Get Enterprise Voice AI
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Relo Network Showcase */}
            <Card className="relative overflow-hidden border-2 border-gradient-to-br from-[#C9A24A] to-[#0B1B2B] hover:shadow-2xl group bg-gradient-to-br from-[#C9A24A]/5 to-[#0B1B2B]/5">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#C9A24A] to-[#0B1B2B] text-white px-4 py-2 text-sm font-semibold">
                PREMIUM
              </div>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C9A24A]/20 to-[#0B1B2B]/20 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-[#C9A24A]" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Relo Network Showcase</CardTitle>
                    <CardDescription className="text-[#6B7280]">Complete AI Ecosystem</CardDescription>
                  </div>
                </div>
                <div className="text-center py-4">
                  <div className="text-4xl font-bold bg-gradient-to-r from-[#C9A24A] to-[#0B1B2B] bg-clip-text text-transparent">£9,997</div>
                  <div className="text-sm text-[#6B7280] mb-2">Setup Fee</div>
                  <div className="text-2xl font-semibold text-[#0B1B2B]">£1,997<span className="text-sm text-[#6B7280]">/month</span></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <p className="text-[#6B7280] font-medium">Replicate our Fortune 500 system</p>
                  
                  <div className="space-y-2">
                    {[
                      'Everything in Enterprise tier',
                      'Full website integration (voice + text)',
                      'Training on your knowledge base',
                      'Monthly optimization reports',
                      'White-label solution',
                      'Executive-level consultation',
                      'Success guarantee'
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-[#C9A24A] flex-shrink-0" />
                        <span className="text-[#0B1B2B] text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#0B1B2B]/10 border border-[#C9A24A]/20 rounded-lg p-4">
                  <p className="text-sm font-semibold text-[#0B1B2B] text-center">
                    The exact system we trust to serve Fortune 500 executives. Complete client acquisition engine.
                  </p>
                </div>

                <Button 
                  onClick={checkoutFunctions.aiShowcase}
                  className="w-full bg-gradient-to-r from-[#C9A24A] to-[#0B1B2B] hover:from-[#B8923D] hover:to-[#1a2b3b] text-white font-semibold"
                  size="lg"
                >
                  Get Showcase System
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              AI Features Comparison
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              All tiers include our core AI technology. Choose the level of customization and support that fits your business.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-[#C9A24A]/20">
                  <th className="text-left py-4 px-6 font-semibold text-[#0B1B2B]">Features</th>
                  <th className="text-center py-4 px-6 font-semibold text-[#C9A24A]">Executive</th>
                  <th className="text-center py-4 px-6 font-semibold text-[#0B1B2B]">Enterprise</th>
                  <th className="text-center py-4 px-6 font-semibold bg-gradient-to-r from-[#C9A24A] to-[#0B1B2B] bg-clip-text text-transparent">Showcase</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: '24/7 AI Voice Assistant', executive: true, enterprise: true, showcase: true },
                  { feature: 'Calendar Integration', executive: true, enterprise: true, showcase: true },
                  { feature: 'CRM Integration', executive: true, enterprise: true, showcase: true },
                  { feature: 'Analytics Dashboard', executive: true, enterprise: true, showcase: true },
                  { feature: 'Multiple AI Agents', executive: false, enterprise: true, showcase: true },
                  { feature: 'Multi-Location Support', executive: false, enterprise: true, showcase: true },
                  { feature: 'Dedicated Account Manager', executive: false, enterprise: true, showcase: true },
                  { feature: 'Website Integration', executive: false, enterprise: false, showcase: true },
                  { feature: 'Knowledge Base Training', executive: false, enterprise: false, showcase: true },
                  { feature: 'White-Label Solution', executive: false, enterprise: false, showcase: true },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-4 px-6 text-[#0B1B2B]">{row.feature}</td>
                    <td className="text-center py-4 px-6">
                      {row.executive ? <CheckCircle className="w-5 h-5 text-[#C9A24A] mx-auto" /> : <span className="text-gray-300"> - </span>}
                    </td>
                    <td className="text-center py-4 px-6">
                      {row.enterprise ? <CheckCircle className="w-5 h-5 text-[#0B1B2B] mx-auto" /> : <span className="text-gray-300"> - </span>}
                    </td>
                    <td className="text-center py-4 px-6">
                      {row.showcase ? <CheckCircle className="w-5 h-5 text-[#C9A24A] mx-auto" /> : <span className="text-gray-300"> - </span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Everything you need to know about our AI voice assistant solutions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How quickly can the AI be implemented?",
                answer: "Implementation typically takes 2-4 weeks depending on your tier. Executive Voice AI can be live within 2 weeks, while Enterprise and Showcase tiers require 3-4 weeks for full customization and integration with your existing systems."
              },
              {
                question: "What makes this different from other AI phone systems?",
                answer: "Our AI is specifically trained on Fortune 500 executive interactions and premium service business scenarios. Unlike generic chatbots, it understands context, handles complex inquiries, and maintains the professional tone your high-value clients expect."
              },
              {
                question: "Can it integrate with our existing CRM and scheduling system?",
                answer: "Yes, we integrate with all major CRM platforms (Salesforce, HubSpot, Pipedrive) and scheduling systems (Calendly, Acuity, custom systems). During setup, we'll configure seamless data flow between the AI and your existing tools."
              },
              {
                question: "What happens if the AI can't handle a call?",
                answer: "The AI is programmed to recognize when it needs human assistance and will seamlessly transfer complex calls to your team. It also logs detailed notes about the interaction so your staff has full context when they take over."
              },
              {
                question: "How do you ensure the AI maintains our brand voice?",
                answer: "During the setup process, we train the AI on your specific business terminology, service offerings, and communication style. We also provide scripts and responses that match your brand personality, whether that's formal and professional or warm and conversational."
              },
              {
                question: "What's the difference between the three tiers?",
                answer: "Executive Voice AI is perfect for single-location premium businesses like dental practices or law firms. Enterprise Voice AI adds multiple agents and multi-location support for franchises. Relo Network Showcase includes full website integration and our complete Fortune 500-level system."
              },
              {
                question: "Do you provide training for our team?",
                answer: "Absolutely. All tiers include comprehensive team training on how the AI works, how to review call logs, and how to optimize performance. Enterprise and Showcase tiers also include ongoing optimization sessions with your dedicated account manager."
              },
              {
                question: "What's your success rate with premium service businesses?",
                answer: "Our AI typically captures 85-95% of missed calls that would have been lost forever. Clients see an average of 23% increase in booked appointments within the first month, with some seeing increases of 40% or more in high-demand periods."
              }
            ].map((faq, idx) => (
              <details key={idx} className="bg-[#FAFAF9] rounded-lg shadow-sm border border-[#C9A24A]/20 overflow-hidden group">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-[#C9A24A]/5 transition-colors">
                  <h3 className="text-lg font-semibold text-[#0B1B2B] pr-4">{faq.question}</h3>
                  <svg className="w-6 h-6 text-[#C9A24A] transition-transform group-open:rotate-180 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-[#6B7280] leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          {/* CTA within FAQ */}
          <div className="text-center mt-12">
            <p className="text-lg text-[#6B7280] mb-6">
              Still have questions? We're here to help.
            </p>
            <button
              onClick={() => window.location.href = '/ai-demo'}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-all shadow-lg"
            >
              Get Your Questions Answered
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0B1B2B] to-[#1a2b3b]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join premium service businesses already using AI to capture every opportunity and scale their revenue.
          </p>
        </div>
      </section>
    </Layout>
  )
}