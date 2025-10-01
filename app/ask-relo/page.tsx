'use client'

import React, { useState } from 'react'
import Layout from '../../components/Layout'
import UnifiedAssistant from '../../components/UnifiedAssistant'
import { Sparkles, Globe, Settings, Eye } from 'lucide-react'

export default function AskReloPage() {
  const [isWhiteLabel, setIsWhiteLabel] = useState(false)

  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* White-label Demo Toggle */}
          <div className="mb-8">
            <div className="bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0B1B2B]">White-Label Demo</h3>
                    <p className="text-sm text-[#6B7280]">Experience Ask Relo as it would appear on AskRelo.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className={`${!isWhiteLabel ? 'text-[#0B1B2B] font-medium' : 'text-[#6B7280]'}`}>Relo Network</span>
                    <button
                      onClick={() => setIsWhiteLabel(!isWhiteLabel)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        isWhiteLabel ? 'bg-[#C9A24A]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                        isWhiteLabel ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                    <span className={`${isWhiteLabel ? 'text-[#0B1B2B] font-medium' : 'text-[#6B7280]'}`}>AskRelo.com</span>
                  </div>
                  {isWhiteLabel && (
                    <div className="flex items-center gap-1 bg-[#C9A24A]/10 text-[#C9A24A] px-3 py-1 rounded-full text-xs font-medium">
                      <Eye className="w-3 h-3" />
                      White-Label View
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            {isWhiteLabel ? (
              <>
                {/* White-Label Version */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-2" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                      AskRelo
                    </h1>
                    <div className="text-sm text-blue-600 font-medium">askrelo.com</div>
                  </div>
                </div>
                <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-6">
                  Your personal AI relocation consultant. Get expert guidance for moving anywhere in the world, 24/7.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-blue-800 text-sm">
                    <strong>White-Label Solution:</strong> This is how Ask Relo appears as a standalone service. 
                    Perfect for corporate partnerships or independent deployment.
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Standard Relo Network Version */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Ask Relo
                </h1>
                <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-6">
                  Get instant answers about relocating to London. Our AI assistant provides expert guidance on housing, schools, visas, and more.
                </p>
                <div className="bg-[#C9A24A]/10 border border-[#C9A24A]/30 rounded-lg p-4 max-w-2xl mx-auto">
                  <p className="text-[#B8923D] text-sm">
                    <strong>Relo Network Integration:</strong> Part of the comprehensive Relo Network platform. 
                    Seamlessly connects with our full relocation services.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Features showcase for white-label */}
          {isWhiteLabel && (
            <div className="mb-12">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-blue-200 p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Global Coverage</h3>
                  <p className="text-sm text-gray-600">Relocation assistance for any destination worldwide</p>
                </div>
                <div className="bg-white rounded-lg border border-blue-200 p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fully Customizable</h3>
                  <p className="text-sm text-gray-600">Branded to match your company's identity</p>
                </div>
                <div className="bg-white rounded-lg border border-blue-200 p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
                  <p className="text-sm text-gray-600">Advanced AI trained on relocation expertise</p>
                </div>
              </div>
            </div>
          )}

          <UnifiedAssistant variant="embedded" />

          {/* White-label demo notice */}
          {isWhiteLabel && (
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Ready to Launch Your White-Label Solution?</h3>
                <p className="text-blue-700 text-sm mb-4">
                  This demo shows how Ask Relo can be fully customized for your domain. 
                  Get your own branded AI relocation assistant in days, not months.
                </p>
                <div className="flex justify-center gap-4">
                  <button 
                    onClick={() => window.open('/contact', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Request Demo
                  </button>
                  <button 
                    onClick={() => window.open('/pricing', '_blank')}
                    className="bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Pricing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}