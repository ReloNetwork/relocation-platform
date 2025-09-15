'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/ui/components/button'
import Layout from '../../components/Layout'
import { Copy, ExternalLink, Check, Crown, Zap, Building, Users } from 'lucide-react'

interface Product {
  key: string
  name: string
  description: string
  price: string
  interval: string
  features: string[]
  originalPrice?: string
}

interface PaymentLinkData {
  success: boolean
  paymentLink: string
  id: string
  product: Product
}

export default function PaymentLinksPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [paymentLinks, setPaymentLinks] = useState<Record<string, PaymentLinkData>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [copiedLinks, setCopiedLinks] = useState<Record<string, boolean>>({})

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
    setLoading(productKey)
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
            generated_by: 'payment_links_interface',
            source: 'direct_sales'
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
      setLoading(null)
    }
  }

  const copyToClipboard = async (link: string, productKey: string) => {
    try {
      await navigator.clipboard.writeText(link)
      setCopiedLinks(prev => ({ ...prev, [productKey]: true }))
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [productKey]: false }))
      }, 2000)
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const getProductIcon = (productKey: string) => {
    if (productKey.includes('market-dominator')) return <Crown className="h-6 w-6 text-[#C9A24A]" />
    if (productKey.includes('lead-machine')) return <Zap className="h-6 w-6 text-[#C9A24A]" />
    if (productKey.includes('vip')) return <Users className="h-6 w-6 text-[#C9A24A]" />
    if (productKey.includes('directory')) return <Building className="h-6 w-6 text-[#C9A24A]" />
    return <Building className="h-6 w-6 text-[#C9A24A]" />
  }

  const groupedProducts = products.reduce((acc, product) => {
    const baseKey = product.key.replace('-annual', '')
    if (!acc[baseKey]) {
      acc[baseKey] = { monthly: null, annual: null }
    }
    if (product.key.includes('-annual')) {
      acc[baseKey].annual = product
    } else {
      acc[baseKey].monthly = product
    }
    return acc
  }, {} as Record<string, { monthly: Product | null, annual: Product | null }>)

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Payment Links for Sales & Social Media
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Generate direct payment links for all partner packages. Perfect for sales calls, social media, and direct outreach.
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-[#0B1B2B]/10">
          <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            How to Use These Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-[#0B1220] mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Sales Calls
              </h3>
              <p className="text-[#6B7280]">Send directly to prospects during or after sales calls for immediate purchase decisions.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0B1220] mb-2 flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Social Media
              </h3>
              <p className="text-[#6B7280]">Share on LinkedIn, Twitter, or other platforms to drive partner subscriptions.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#0B1220] mb-2 flex items-center gap-2">
                <Copy className="h-4 w-4" />
                Direct Outreach
              </h3>
              <p className="text-[#6B7280]">Include in emails, WhatsApp, or messaging platforms for instant sign-ups.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          {Object.entries(groupedProducts).map(([baseKey, { monthly, annual }]) => (
            <div key={baseKey} className="bg-white rounded-lg shadow-sm border border-[#0B1B2B]/10 overflow-hidden">
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3 mb-4">
                  {getProductIcon(baseKey)}
                  <h2 className="text-2xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    {monthly?.name.replace(' Partnership', '') || annual?.name.replace(' Partnership (Annual)', '')}
                  </h2>
                </div>
                <p className="text-[#6B7280] text-lg">
                  {monthly?.description || annual?.description.replace(' - Annual plan with 2 months FREE', '').replace(' - Annual plan with 10 months at founding rate + 2 months FREE', '')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 divide-x divide-[#E5E7EB]">
                {/* Monthly Option */}
                {monthly && (
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-[#0B1220]">Monthly Plan</h3>
                        {monthly.originalPrice && (
                          <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">FOUNDING RATE</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {monthly.originalPrice && (
                          <span className="text-[#9CA3AF] line-through">{monthly.originalPrice}/mo</span>
                        )}
                        <span className="text-3xl font-bold text-[#0B1220]">{monthly.price}/mo</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {monthly.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-[#6B7280]">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {paymentLinks[monthly.key] ? (
                      <div className="space-y-3">
                        <div className="p-3 bg-[#F3F4F6] rounded-md">
                          <p className="text-sm text-[#6B7280] mb-2">Payment Link:</p>
                          <p className="text-xs text-[#9CA3AF] font-mono break-all">
                            {paymentLinks[monthly.key].paymentLink}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => copyToClipboard(paymentLinks[monthly.key].paymentLink, monthly.key)}
                            size="sm"
                            className={`flex-1 ${copiedLinks[monthly.key] ? 'bg-green-600 hover:bg-green-700' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
                          >
                            {copiedLinks[monthly.key] ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            {copiedLinks[monthly.key] ? 'Copied!' : 'Copy Link'}
                          </Button>
                          <Button
                            onClick={() => window.open(paymentLinks[monthly.key].paymentLink, '_blank')}
                            size="sm"
                            variant="outline"
                            className="border-[#0B1B2B] text-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => createPaymentLink(monthly.key)}
                        disabled={loading === monthly.key}
                        className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white"
                      >
                        {loading === monthly.key ? 'Creating...' : 'Generate Payment Link'}
                      </Button>
                    )}
                  </div>
                )}

                {/* Annual Option */}
                {annual && (
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-[#0B1220]">Annual Plan</h3>
                        <span className="text-sm bg-[#C9A24A] text-white px-2 py-1 rounded">BEST VALUE</span>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {annual.originalPrice && (
                          <span className="text-[#9CA3AF] line-through text-lg">{annual.originalPrice}/year</span>
                        )}
                        <span className="text-3xl font-bold text-[#0B1220]">{annual.price}/year</span>
                      </div>
                      <p className="text-sm text-green-600 font-semibold">
                        Pay for 10 months, get 12 months service
                      </p>
                    </div>

                    <div className="space-y-2 mb-6">
                      {annual.features.filter(f => f.includes('SPECIAL') || f.includes('Save')).map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-green-600 font-medium">{feature}</span>
                        </div>
                      ))}
                      <div className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#6B7280]">All monthly features included</span>
                      </div>
                    </div>

                    {paymentLinks[annual.key] ? (
                      <div className="space-y-3">
                        <div className="p-3 bg-[#F3F4F6] rounded-md">
                          <p className="text-sm text-[#6B7280] mb-2">Payment Link:</p>
                          <p className="text-xs text-[#9CA3AF] font-mono break-all">
                            {paymentLinks[annual.key].paymentLink}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => copyToClipboard(paymentLinks[annual.key].paymentLink, annual.key)}
                            size="sm"
                            className={`flex-1 ${copiedLinks[annual.key] ? 'bg-green-600 hover:bg-green-700' : 'bg-[#0B1B2B] hover:bg-[#0B1B2B]/90'} text-white`}
                          >
                            {copiedLinks[annual.key] ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                            {copiedLinks[annual.key] ? 'Copied!' : 'Copy Link'}
                          </Button>
                          <Button
                            onClick={() => window.open(paymentLinks[annual.key].paymentLink, '_blank')}
                            size="sm"
                            variant="outline"
                            className="border-[#0B1B2B] text-[#0B1B2B] hover:bg-[#0B1B2B] hover:text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        onClick={() => createPaymentLink(annual.key)}
                        disabled={loading === annual.key}
                        className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white"
                      >
                        {loading === annual.key ? 'Creating...' : 'Generate Payment Link'}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-[#0B1B2B] text-white p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Convert Partners?</h3>
          <p className="text-white/80 mb-4">
            These payment links are optimized for maximum conversion and include detailed product information, 
            founding member pricing, and special annual offers.
          </p>
          <p className="text-sm text-[#C9A24A]">
            All links expire on September 15, 2025 • Founding member pricing automatically applied
          </p>
        </div>
      </div>
    </Layout>
  )
}