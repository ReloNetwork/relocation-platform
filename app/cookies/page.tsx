'use client'

import Layout from '@/components/Layout'
import { Cookie, Shield, Eye, Settings, ExternalLink, CheckCircle } from 'lucide-react'

export default function CookiesPage() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9] py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-[#C9A24A] to-[#B8923D] rounded-full flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Cookie Policy
            </h1>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              How we use cookies to improve your experience on Relo Network
            </p>
            <p className="text-sm text-[#6B7280] mt-2">
              Last updated: October 1, 2024
            </p>
          </div>

          {/* Quick Summary */}
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-8 shadow-lg mb-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2">
                  Quick Summary
                </h2>
                <p className="text-[#6B7280] mb-4">
                  We use cookies to provide you with the best possible experience on our website, analyse how you use our services, and improve our platform for relocating to London.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-[#0B1B2B] mb-2">What we use cookies for:</h3>
                  <ul className="text-sm text-[#6B7280] space-y-1">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Essential website functionality
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Analytics to improve our services
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Remembering your preferences
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Measuring business performance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Cookie Types */}
          <div className="space-y-8 mb-8">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-[#0B1B2B]">Essential Cookies</h3>
              </div>
              <p className="text-[#6B7280] mb-4">
                These cookies are necessary for the website to function and cannot be switched off in our systems.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Examples:</h4>
                <ul className="text-sm text-[#6B7280] space-y-1">
                  <li>• Authentication and security</li>
                  <li>• Dashboard access tokens</li>
                  <li>• Form submission data</li>
                  <li>• Navigation preferences</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-[#0B1B2B]">Analytics Cookies</h3>
              </div>
              <p className="text-[#6B7280] mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Google Analytics:</h4>
                <ul className="text-sm text-[#6B7280] space-y-1">
                  <li>• Page views and user behaviour</li>
                  <li>• Conversion tracking for business goals</li>
                  <li>• Client dashboard access metrics</li>
                  <li>• Package type preferences</li>
                </ul>
                <div className="mt-3">
                  <p className="text-xs text-[#6B7280]">
                    <strong>Data retention:</strong> 26 months (Google Analytics default)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 rounded-xl border border-[#C9A24A]/20 p-8 mb-8">
            <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">
              Your Cookie Rights
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Browser Controls:</h4>
                <ul className="text-sm text-[#6B7280] space-y-1">
                  <li>• Block or delete cookies in browser settings</li>
                  <li>• Set preferences for cookie acceptance</li>
                  <li>• Use private/incognito browsing</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[#0B1B2B] mb-2">Opt-out Options:</h4>
                <ul className="text-sm text-[#6B7280] space-y-1">
                  <li>• Google Analytics opt-out browser add-on</li>
                  <li>• Contact us for data deletion requests</li>
                  <li>• Cookie banner preferences (when available)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Third Party Services */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 mb-8">
            <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Third-Party Services</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-[#0B1B2B]">Google Analytics</h4>
                  <a 
                    href="https://policies.google.com/privacy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#C9A24A] hover:text-[#B8923D] text-sm"
                  >
                    Privacy Policy <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm text-[#6B7280]">
                  Web analytics service that tracks website usage and user behaviour to help us improve our services.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
            <h3 className="text-xl font-bold text-[#0B1B2B] mb-4">Questions About Cookies?</h3>
            <p className="text-[#6B7280] mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-sm text-[#6B7280]">
              <p><strong>Email:</strong> hello@therelonetwork.com</p>
              <p><strong>Company:</strong> Relo Network Ltd</p>
              <p><strong>Location:</strong> London, United Kingdom</p>
            </div>
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-[#6B7280]">
                <strong>Note:</strong> This Cookie Policy may be updated from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last updated" date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}