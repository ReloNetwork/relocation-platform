'use client'

import Layout from '../components/Layout'
import { HomeSEO } from '../components/SEO/PageSEO'

export default function HomePage() {
  return (
    <HomeSEO>
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
    </HomeSEO>
  )
}