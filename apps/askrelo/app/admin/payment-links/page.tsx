'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'
import { Copy, ExternalLink, Plus, Check } from 'lucide-react'

interface Product {
  key: string
  name: string
  description: string
  price: string
  interval: string
  features: string[]
  originalPrice?: string
}

interface PaymentLink {
  success: boolean
  paymentLink: string
  id: string
  product: Product
}

export default function PaymentLinksPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [paymentLinks, setPaymentLinks] = useState<Record<string, PaymentLink>>({})
  const [loading, setLoading] = useState(false)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/payment-links/create')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const createPaymentLink = async (productKey: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/payment-links/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productKey,
          customData: {
            generated_at: new Date().toISOString(),
            generated_by: 'admin_interface'
          }
        }),
      })

      const data = await response.json()
      if (data.success) {
        setPaymentLinks(prev => ({
          ...prev,
          [productKey]: data
        }))
      } else {
        alert('Failed to create payment link: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Failed to create payment link:', error)
      alert('Failed to create payment link')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (link: string, productKey: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedLink(productKey)
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const openLink = (link: string) => {
    window.open(link, '_blank')
  }

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              Payment Links Generator
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Generate shareable payment links for all Relo Network products with enhanced branding and customization.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product.key} className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB]">
                
                {/* Product Header */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220]">
                      {product.name}
                    </h2>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#C9A24A]">
                        {product.price}
                        <span className="text-sm text-[#6B7280] ml-1">/{product.interval}</span>
                      </div>
                      {product.originalPrice && (
                        <div className="text-sm text-[#6B7280] line-through">
                          Was {product.originalPrice}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-[#6B7280] mb-4">{product.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[#0B1220] mb-3">Features:</h3>
                  <ul className="space-y-2">
                    {product.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-[#6B7280]">
                        <span className="text-[#C9A24A] mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                    {product.features.length > 4 && (
                      <li className="text-sm text-[#6B7280] italic">
                        +{product.features.length - 4} more features...
                      </li>
                    )}
                  </ul>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  {!paymentLinks[product.key] ? (
                    <Button
                      onClick={() => createPaymentLink(product.key)}
                      disabled={loading}
                      className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white py-3 rounded-lg font-semibold flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading ? 'Generating...' : 'Generate Payment Link'}
                    </Button>
                  ) : (
                    <>
                      {/* Generated Link Display */}
                      <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-3">
                        <div className="text-xs text-[#6B7280] mb-1">Generated Payment Link:</div>
                        <div className="text-sm text-[#0B1220] font-mono break-all">
                          {paymentLinks[product.key].paymentLink}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          onClick={() => copyToClipboard(paymentLinks[product.key].paymentLink, product.key)}
                          className="flex-1 bg-[#6B7280] hover:bg-[#4B5563] text-white py-2 rounded-lg font-semibold flex items-center justify-center"
                        >
                          {copiedLink === product.key ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 mr-2" />
                              Copy Link
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => openLink(paymentLinks[product.key].paymentLink)}
                          className="flex-1 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white py-2 rounded-lg font-semibold flex items-center justify-center"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>

                      {/* Regenerate */}
                      <Button
                        onClick={() => {
                          setPaymentLinks(prev => {
                            const newLinks = { ...prev }
                            delete newLinks[product.key]
                            return newLinks
                          })
                        }}
                        className="w-full text-[#6B7280] hover:text-[#0B1220] py-2 text-sm"
                      >
                        Generate New Link
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Usage Instructions */}
          <div className="mt-12 bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 border border-[#C9A24A]/20 rounded-2xl p-8">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6">
              How to Use Payment Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-[#0B1220] mb-2">📧 Email Marketing</h3>
                <p className="text-[#6B7280]">Include in newsletters, promotional emails, or direct client outreach for easy one-click purchasing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1220] mb-2">📱 Social Media</h3>
                <p className="text-[#6B7280]">Share on LinkedIn, Twitter, or other platforms to drive subscriptions from social traffic.</p>
              </div>
              <div>
                <h3 className="font-semibold text-[#0B1220] mb-2">💬 Direct Sales</h3>
                <p className="text-[#6B7280]">Send directly to prospects via WhatsApp, Slack, or any messaging platform for instant purchases.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}