'use client'

import React from 'react'
import Layout from '../components/Layout'
import DynamicHeroBackground from '../components/DynamicHeroBackground'
import ProfessionalPartnerBanner from '../components/ProfessionalPartnerBanner'

export default function HomePage() {
  return (
    <Layout className="bg-[#FAFAF9] text-[#0B1220] overflow-x-hidden" showFooter={false}>
      <DynamicHeroBackground className="min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-32 sm:pt-16">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Relocate to <span className="text-[#C9A24A]">London</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Effortlessly.
          </h2>
          <p className="text-xl text-white mb-12 max-w-3xl mx-auto">
            Your concierge for executive relocations to London.
          </p>
        </div>
      </DynamicHeroBackground>
      
      <ProfessionalPartnerBanner />
      
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#0B1B2B] mb-4">
            How it works
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Executive relocation simplified into three clear phases
          </p>
        </div>
      </div>
    </Layout>
  )
}