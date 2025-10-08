'use client';

import { useState } from 'react';
import { CheckCircle, Download, Users, TrendingUp, DollarSign, Clock } from 'lucide-react';

export default function BlueprintPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/blueprint/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'youtube-landing-page'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to download blueprint');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B1B2B] to-[#1e3a5f] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-2xl w-full text-center shadow-xl">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Check Your Email!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Your complete 30-page Platform Blueprint has been sent to your inbox. 
            Check your email (including spam folder) for the download link.
          </p>
          
          <div className="bg-[#FAFAF9] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-[#0B1B2B] mb-3">What's Next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <p className="text-gray-700">Download the blueprint and read through the complete roadmap</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <p className="text-gray-700">Subscribe to my YouTube channel for weekly implementation videos</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <p className="text-gray-700">Join the early access list for my complete course launching soon</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youtube.com/@your-channel" 
              target="_blank"
              className="px-6 py-3 bg-[#C9A24A] hover:bg-[#B8923D] text-white font-semibold rounded-lg transition-colors"
            >
              Subscribe on YouTube
            </a>
            <a
              href="/"
              className="px-6 py-3 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white font-semibold rounded-lg transition-colors"
            >
              Explore Relo Network
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1B2B] to-[#1e3a5f] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#C9A24A] text-white rounded-full text-sm font-semibold mb-4">
            FREE BLUEPRINT • VALUE £97
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            From Concept to <span className="text-[#C9A24A]">£180K</span>:<br />
            The Executive's Platform Blueprint
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-4xl mx-auto">
            The exact 30-page roadmap I used to build a Fortune 500-serving platform in 8 weeks without coding. 
            Complete with tools, templates, and transparent revenue breakdowns.
          </p>
          
          {/* Social Proof */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C9A24A]">£180K+</div>
              <div className="text-white/80 text-sm">Annual Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C9A24A]">2,500+</div>
              <div className="text-white/80 text-sm">Executive Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C9A24A]">25+</div>
              <div className="text-white/80 text-sm">Premium Partners</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#C9A24A]">8 Weeks</div>
              <div className="text-white/80 text-sm">Concept to Revenue</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Benefits */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">
              What's Inside the Blueprint:
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">8-Week Implementation Timeline</h3>
                  <p className="text-white/80">Daily checklists and milestones to go from concept to first revenue in 8 weeks</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Technology Stack Breakdown</h3>
                  <p className="text-white/80">Complete tool guide costing £200/month vs £50K+ traditional development</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Multi-Stream Revenue Model</h3>
                  <p className="text-white/80">Partnership strategies generating £8K+ monthly recurring revenue</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Premium Market Research</h3>
                  <p className="text-white/80">The P.R.E.M.I.U.M. framework for identifying £500K+ market opportunities</p>
                </div>
              </div>
            </div>
            
            {/* Additional Benefits */}
            <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-white mb-4">BONUS: Complete Template Library</h3>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
                  Partnership outreach email templates (6 proven templates)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
                  Business model canvas and financial projections
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
                  Customer interview scripts and market research guides
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#C9A24A]" />
                  Real Stripe dashboard screenshots with revenue breakdown
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Download Form */}
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <div className="text-center mb-6">
              <Download className="w-12 h-12 text-[#C9A24A] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2">
                Download Your Free Blueprint
              </h2>
              <p className="text-gray-600">
                Enter your email to get instant access to the complete 30-page guide
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A24A] focus:border-transparent"
                  placeholder="your.email@company.com"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-[#C9A24A] hover:bg-[#B8923D] disabled:bg-gray-400 text-white font-semibold rounded-lg hover:scale-105 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {isSubmitting ? 'Sending Blueprint...' : 'Get My Free Blueprint Now'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">• Instant download • No spam ever • Unsubscribe anytime</p>
                <p>Join 2,500+ executives building premium platforms</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Social Proof */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            Why This Blueprint Works
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#C9A24A] mb-2">Real Results</div>
              <p className="text-white/80">Not theory - actual £180K revenue with transparent proof</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#C9A24A] mb-2">Premium Focus</div>
              <p className="text-white/80">Target Fortune 500 executives, not competing on price</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-[#C9A24A] mb-2">No-Code Approach</div>
              <p className="text-white/80">Build without coding using modern tools and frameworks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}