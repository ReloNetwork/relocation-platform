'use client'

import React from 'react'
import Layout from '../../components/Layout'
import UnifiedAssistant from '../../components/UnifiedAssistant'

export default function AskReloPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Ask Relo
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Get instant answers about relocating to London. Our AI assistant provides expert guidance on housing, schools, visas, and more.
            </p>
          </div>

          <UnifiedAssistant />
        </div>
      </div>
    </Layout>
  )
}