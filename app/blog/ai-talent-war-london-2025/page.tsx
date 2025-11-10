'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Clock, DollarSign, Users, TrendingUp, MapPin, Briefcase } from 'lucide-react'

// Metadata should be handled in a layout.tsx file or in a server component wrapper
// For now, we'll use the page as a client component for the lead capture functionality

export default function AITalentWarPost() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Submit to your newsletter/lead capture system
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: 'ai-talent-article',
          utm_source: 'linkedin',
          content: 'AI Talent War Article Lead Magnet'
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setEmail('')
      }
    } catch (error) {
      console.error('Newsletter signup error:', error)
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
            <Link 
              href="/contact" 
              className="bg-[#C9A24A] text-white px-4 py-2 rounded-lg hover:bg-[#B8913A] transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Article Header */}
      <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <time dateTime="2025-11-10">November 10, 2025</time>
            <span>•</span>
            <span>8 min read</span>
            <span>•</span>
            <span className="text-[#C9A24A] font-medium">AI & Tech</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B1220] mb-6 leading-tight">
            The £690k AI Talent War: Why London is the New Battleground
          </h1>
          
        </header>

        {/* Opening Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-gray-700 mb-6">
            xAI opens in Piccadilly. OpenAI expands near St Paul's. Anthropic chases billions in new funding.
          </p>
          
          <p className="text-gray-700 mb-6">
            London is no longer "catching up" to Silicon Valley, it <span className="font-bold">IS</span> the new battleground for AI talent.
          </p>
          
          <h3 className="text-xl font-semibold text-[#0B1220] mb-4">Introducing Relocation Velocity</h3>
          <p className="text-gray-700 mb-8">
            In that environment and at these salary levels, the real differentiator isn't how much you pay, it's how fast you can move a hire from "offer accepted" to "fully operational in London". At Relo Network, we call this Relocation Velocity and we're benchmarking it in our upcoming London Relocation Index for AI and tech companies.
          </p>
        </div>

        {/* Key Stats */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 mb-12">
          <h3 className="text-xl font-bold text-[#0B1220] mb-6 text-center">The Numbers Behind the Talent War</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <DollarSign className="h-8 w-8 text-[#C9A24A] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#0B1220]">£690k</div>
            <div className="text-sm text-gray-600">Top-end AI researcher compensation packages</div>
          </div>
          <div className="text-center">
            <Clock className="h-8 w-8 text-[#C9A24A] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#0B1220]">7-14 days</div>
            <div className="text-sm text-gray-600">Our standard London landing window for senior talent (post-visa)</div>
          </div>
          <div className="text-center">
            <Users className="h-8 w-8 text-[#C9A24A] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#0B1220]">60,000+</div>
            <div className="text-sm text-gray-600">AI professionals in the UK</div>
          </div>
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-[#C9A24A] mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#0B1220]">25%</div>
            <div className="text-sm text-gray-600">Share of UK tech job ads now tied to AI</div>
          </div>
          </div>
          <p className="text-gray-600 text-center mt-6 text-sm">
            At those salary levels, every week of delay is tens of thousands burned on partial productivity, family friction, and competitors circling.
          </p>
        </div>

        {/* Lead Capture Gate */}
        <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#0B1220]/5 rounded-2xl p-8 my-12 border border-[#C9A24A]/20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#0B1220] mb-4">
              Get the Full AI Talent Salary Breakdown
            </h3>
            <p className="text-gray-700 mb-6">
              See exactly what xAI, OpenAI, and Anthropic are paying across all levels in London. Plus get our exclusive 2025 AI talent relocation playbook.
            </p>
            {!isSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#C9A24A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#B8913A] transition-colors whitespace-nowrap disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Get Full Report'}
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="text-green-600 text-lg font-semibold mb-2">✅ Report on its way!</div>
                <p className="text-gray-600">Check your email for the full AI salary breakdown and relocation playbook.</p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-3">
              Free report • No spam • Used by 500+ tech executives
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-[#0B1220] mt-12 mb-6">
            Piccadilly to St Paul's: London's AI Corridor
          </h2>
          
          <p className="text-gray-700 mb-6">
            In a 2-mile radius you now have:
          </p>

          <div className="bg-gray-50 rounded-xl p-6 mb-3">
            <h3 className="text-xl font-bold text-[#0B1220] mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#C9A24A]" />
              xAI – Piccadilly
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• £180k–£440k for engineers and SREs</li>
              <li>• Former Twitter office, heart of the West End</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-3">
            <h3 className="text-xl font-bold text-[#0B1220] mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#C9A24A]" />
              OpenAI – near St Paul's
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• £200k–£530k for research and engineering</li>
              <li>• Co-founder level involvement in recruiting</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-bold text-[#0B1220] mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#C9A24A]" />
              Anthropic – St Paul's area
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>• £300k–£690k for top researchers</li>
              <li>• Aggressive London build-out alongside major funding rounds</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-8">
            This is becoming London's main AI corridor. For companies hiring into it, the question is no longer "Can we afford them?" but "Can we land them fast enough?"
          </p>

          <h2 className="text-3xl font-bold text-[#0B1220] mt-12 mb-6">
            Why Traditional Relocation Fails in 2025
          </h2>

          <p className="text-gray-700 mb-6">
            Traditional corporate relocations still take 60–120 days. In the world of AI, that's an eternity.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-amber-50 border-l-4 border-[#C9A24A] p-4">
              <h4 className="font-bold text-[#0B1220] mb-2">Day 1–30</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Candidate receives multiple offers</li>
                <li>• Faster competitors promise clear timelines and family support</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-[#C9A24A] p-4">
              <h4 className="font-bold text-[#0B1220] mb-2">Day 31–60</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Temporary housing burns £15,000–£30,000</li>
                <li>• Spouse is in limbo, children's schooling uncertain</li>
                <li>• Candidate is technically "in role" but not yet fully effective</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-[#C9A24A] p-4">
              <h4 className="font-bold text-[#0B1220] mb-2">Day 61+</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• ~20% chance the candidate takes a counter-offer or another package</li>
                <li>• The team that needed them is already re-prioritising around the gap</li>
              </ul>
            </div>
          </div>

          <p className="text-gray-700 mb-8">
            By the time your process clears, that £690k hire may be emotionally checked out, or somewhere else entirely.
          </p>

          <h2 className="text-3xl font-bold text-[#0B1220] mt-12 mb-6">
            The 7-Day London Landing: How We Compress the Timeline
          </h2>

          <p className="text-gray-700 mb-6">
            We don't replace immigration or global mobility teams.
          </p>
          
          <p className="text-gray-700 mb-6">
            We focus on what happens after the visa is approved: the first 7 days in London.
          </p>

          <div className="bg-[#0B1220] text-white rounded-xl p-8 my-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="bg-[#C9A24A] text-[#0B1220] px-3 py-1 rounded font-bold min-w-[100px] text-center">Day 1–2</span>
                <div>
                  <h4 className="font-bold mb-2">Precision Planning</h4>
                  <ul className="text-white/90 space-y-1">
                    <li>• Digital consultation with our 24/7 concierge</li>
                    <li>• Detailed profile of the family: school needs, neighbourhood preferences, lifestyle</li>
                    <li>• Carefully selected list of properties close to Piccadilly, Bloomsbury, St Paul's and key AI offices</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="bg-[#C9A24A] text-[#0B1220] px-3 py-1 rounded font-bold min-w-[100px] text-center">Day 3–4</span>
                <div>
                  <h4 className="font-bold mb-2">All Decisions, No Friction</h4>
                  <ul className="text-white/90 space-y-1">
                    <li>• Virtual property tours with commute modelling and neighbourhood breakdowns</li>
                    <li>• School visits arranged (including leading independents and international schools)</li>
                    <li>• Banking and essential accounts initiated</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="bg-[#C9A24A] text-[#0B1220] px-3 py-1 rounded font-bold min-w-[100px] text-center">Day 5–6</span>
                <div>
                  <h4 className="font-bold mb-2">Lock-In and Set-Up</h4>
                  <ul className="text-white/90 space-y-1">
                    <li>• Property selected and offer agreed</li>
                    <li>• School admissions confirmed where possible</li>
                    <li>• Utilities, broadband, and essential services arranged</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <span className="bg-[#C9A24A] text-[#0B1220] px-3 py-1 rounded font-bold min-w-[100px] text-center">Day 7</span>
                <div>
                  <h4 className="font-bold mb-2">Operational in London</h4>
                  <ul className="text-white/90 space-y-1">
                    <li>• Keys in hand</li>
                    <li>• NHS registration and GP set-up supported</li>
                    <li>• Family day-to-day life working, not just "present in the city"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <p className="text-lg font-medium text-gray-700 mb-8">
            Result: your senior hire goes from in transition, to fully functional in London, in a week, not drifting in serviced apartments for months.
          </p>

          <h2 className="text-3xl font-bold text-[#0B1220] mt-12 mb-6">
            A Realistic Scenario
          </h2>

          <p className="text-gray-700 mb-4">
            A US-based AI research lead accepts a role in London:
          </p>
          
          <ul className="space-y-2 mb-6 text-gray-700">
            <li>• Two school-age children</li>
            <li>• Partner with a strong career of their own</li>
            <li>• Compensation north of £500k</li>
          </ul>

          <p className="text-gray-700 mb-6">
            With a traditional process, they face weeks of uncertainty: housing unknown, schools undecided, partner's next step unclear.
          </p>

          <p className="text-gray-700 mb-4">
            Using our London landing pipeline, the result was:
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <ul className="space-y-2 text-green-800">
              <li>• Family-fit flat in Marylebone</li>
              <li>• School places confirmed and start dates set</li>
              <li>• NHS registration and everyday logistics handled</li>
            </ul>
            <p className="text-green-900 font-medium mt-4">…in 8 days.</p>
          </div>

          <p className="text-gray-700 mb-8">
            The difference isn't just comfort, it's how quickly that hire can contribute to your roadmap and how likely they are to stay.
          </p>

          <h2 className="text-3xl font-bold text-[#0B1220] mt-12 mb-6">
            The Hidden Costs of Slow Relocation
          </h2>

          <p className="text-gray-700 mb-6">
            Beyond clear budget and time problems, slow processes also hurt:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-[#0B1220] mb-2">Competitive Position</h4>
              <p className="text-gray-700 text-sm">
                While your paperwork moves slowly, faster competitors are flying candidates over for area tours and school visits.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-[#0B1220] mb-2">Family Buy-In</h4>
              <p className="text-gray-700 text-sm">
                Spouse career gaps and unstable schooling are among the top reasons senior talent backs out, or leaves early.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-[#0B1220] mb-2">Productivity</h4>
              <p className="text-gray-700 text-sm">
                Every week in temporary accommodation is a week your £690k asset is operating at 50–70%, not 100%.
              </p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-[#0B1220] mb-2">Culture & Retention</h4>
              <p className="text-gray-700 text-sm">
                The longer the "in-between" period, the harder it is for a new leader to integrate into your London team.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0B1220] mt-12 mb-6">
            What the Winners Are Doing Differently
          </h2>

          <p className="text-gray-700 mb-6">
            The companies winning the AI talent war in London all share three key things:
          </p>

          <div className="bg-gray-50 rounded-xl p-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <span className="text-[#C9A24A] mt-1">✓</span>
                <div>
                  <h4 className="font-bold text-[#0B1220] mb-2">Speed-First Execution</h4>
                  <p className="text-gray-700">
                    They treat relocation timelines as strategically as compensation packages, 7-day landings for senior hires, not 3-months of drifting.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-[#C9A24A] mt-1">✓</span>
                <div>
                  <h4 className="font-bold text-[#0B1220] mb-2">Family-Centric Design</h4>
                  <p className="text-gray-700">
                    They don't just move a person; they move a family. That includes school paths (e.g. American School in London and leading independents), spouse career support, and neighbourhood fit.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-[#C9A24A] mt-1">✓</span>
                <div>
                  <h4 className="font-bold text-[#0B1220] mb-2">Location as Strategy</h4>
                  <p className="text-gray-700">
                    They choose properties with walking distance or easy commutes to Piccadilly, Bloomsbury, and St Paul's, because a 10-minute walk beats a 60-minute struggle with the Underground every day.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-[#0B1220] mt-12 mb-6">
            The Next 12 Months in London AI
          </h2>

          <p className="text-gray-700 mb-6">
            As we move through 2025 and into 2026, expect:
          </p>

          <ul className="space-y-4 mb-8">
            <li className="text-gray-700">
              <strong>• More global AI players announcing London offices</strong>
            </li>
            <li className="text-gray-700">
              <strong>• Salary bands at the top end nudging towards £1m for exceptional talent</strong>
            </li>
            <li className="text-gray-700">
              <strong>• Purpose-built AI campuses and dedicated R&D hubs</strong>
            </li>
            <li className="text-gray-700">
              <strong>• Direct talent pipelines from UK and European universities into London teams</strong>
            </li>
          </ul>

          <p className="text-gray-700 mb-8">
            The companies that focus on how quickly people become productive, not just how much they pay, will win.
          </p>

          <h2 className="text-3xl font-bold text-[#0B1220] mt-12 mb-6">
            Ready to Compete at London Speed?
          </h2>

          <p className="text-gray-700 mb-6">
            When AI researchers earn as much as top athletes, 60-day relocations put you at a serious disadvantage.
          </p>

          <p className="text-gray-700 mb-6">
            The Relo Network specialises in rapid executive relocations for AI and tech companies expanding to London.
          </p>

          <p className="text-gray-700 mb-8">
            We focus on one clear outcome:
          </p>

          <div className="bg-[#C9A24A]/10 border border-[#C9A24A] rounded-xl p-6 mb-8">
            <p className="text-lg font-bold text-[#0B1220] text-center">
              From offer letter to fully operational in London in 7 days, once the visa is in place.
            </p>
          </div>

          <div className="bg-[#0B1220] text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4 text-white">Book a 20-Minute London Landing Briefing</h3>
            <p className="text-lg leading-relaxed text-white/95 mb-6">
              We'll map your current relocation process, show you what a 7-day landing looks like, and outline a pilot for your next senior hire.
            </p>
            <p className="text-white/90">
              Learn more at therelonetwork.com
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#C9A24A] to-[#B8913A] rounded-xl p-8 mt-12">
          <h3 className="text-2xl font-bold mb-4 text-[#0B1220]">Ready to Win the AI Talent War?</h3>
          <p className="mb-6 text-[#0B1220]/80">
            We relocate AI researchers and engineers from Silicon Valley to London in 7 days. 
            While competitors process paperwork, your talent is already productive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/ai-talent-assessment" 
              className="bg-white text-[#0B1220] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition inline-block text-center"
            >
              Start Your 7-Day Relocation
            </Link>
            <Link 
              href="/" 
              className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition inline-block text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Author Bio */}
        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-[#0B1220]">The Relo Network Team</h4>
              <p className="text-gray-600 text-sm mt-1">
                Specialising in rapid executive relocations 
                for AI and tech companies expanding to London.
              </p>
              <Link 
                href="https://therelonetwork.com" 
                className="text-[#C9A24A] text-sm hover:underline mt-2 inline-block"
              >
                Learn more at therelonetwork.com →
              </Link>
            </div>
          </div>
        </div>

      </article>

      {/* Footer */}
      <footer className="bg-[#0B1220] text-white mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm opacity-75">
              © 2025 The Relo Network. Relocating AI talent to London in 4 days.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}