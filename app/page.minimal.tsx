'use client'

import React from 'react'
import Layout from '../components/Layout'

export default function HomePage() {
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220]">
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Relocate to <span className="text-[#C9A24A]">London</span><br />
            <span className="text-4xl font-light text-[#6B7280]">Effortlessly.</span>
          </h1>
          <p className="text-2xl text-[#0B1B2B] mb-4">
            London's most exclusive relocation network since 2024.
          </p>
          <p className="text-xl text-[#6B7280] mb-8">
            AI-powered guidance, 200+ vetted partners, and white-glove service for discerning professionals.
          </p>
          
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4">Start Executive Intake — £1,500</h2>
            <p className="text-lg text-[#6B7280] mb-6">60-min strategy call, bespoke shortlist, 3 warm intros, 30-day execution window</p>
            
            <button className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-12 py-4 rounded-lg text-lg font-semibold">
              Start Executive Intake — £1,500
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}