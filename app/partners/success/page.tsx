import Layout from '../../../components/Layout'
import { CheckCircle } from 'lucide-react'

export default function PartnershipSuccess() {
  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Partnership Confirmed
            </h1>
            <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
              Thank you for joining the Relo Network partner program. We'll be in touch within 24 hours to begin your onboarding process.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border border-[#0B1B2B]/10 mb-8">
            <h2 className="text-2xl font-semibold text-[#0B1B2B] mb-4">What happens next?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div>
                <div className="w-10 h-10 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Partnership Setup</h3>
                <p className="text-[#6B7280] text-sm">Our team will contact you within 24 hours to begin the partnership setup process.</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Profile Creation</h3>
                <p className="text-[#6B7280] text-sm">We'll work with you to create your partner profile and positioning within the network.</p>
              </div>
              <div>
                <div className="w-10 h-10 bg-[#C9A24A] text-white rounded-full flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h3 className="font-semibold text-[#0B1B2B] mb-2">Go Live</h3>
                <p className="text-[#6B7280] text-sm">Your partnership will be activated and you'll begin receiving referrals according to your tier.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#C9A24A]/5 border border-[#C9A24A]/20 rounded-lg p-6">
            <h3 className="font-semibold text-[#0B1B2B] mb-2">Questions?</h3>
            <p className="text-[#6B7280] mb-4">Our partnership team is here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:partners@relo-network.com" className="text-[#C9A24A] font-medium">
                partners@relo-network.com
              </a>
              <span className="text-[#6B7280] hidden sm:inline">•</span>
              <a href="tel:+442079460960" className="text-[#C9A24A] font-medium">
                +44-20-7946-0960
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}