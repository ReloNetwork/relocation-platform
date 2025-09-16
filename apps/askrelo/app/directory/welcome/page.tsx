'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Shield, Star, Crown, Search, Phone, Mail, Users, Clock, Target } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../components/Layout'

export default function DirectoryWelcomePage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams?.get('session_id')
  const signupId = searchParams?.get('signup_id')
  const tier = searchParams?.get('tier') || 'free'

  const getTierInfo = (tierType: string) => {
    switch (tierType) {
      case 'premium':
        return {
          name: 'Premium Access',
          price: '£47/month',
          icon: Star,
          color: 'text-[#C9A24A]',
          features: [
            'Direct contact details for all partners',
            'Partner reviews and ratings',
            'Advanced search and filtering',
            'Partner comparison tools',
            'Email support included',
            'Monthly market insights'
          ]
        }
      case 'vip':
        return {
          name: 'VIP Concierge',
          price: '£147/month',
          icon: Crown,
          color: 'text-[#C9A24A]',
          features: [
            'Personal partner matching service',
            'Introduction facilitation',
            'Dedicated account manager',
            'Priority phone support',
            'Custom partner shortlisting',
            'Quarterly strategy reviews'
          ]
        }
      default:
        return {
          name: 'Essential Access',
          price: 'Free',
          icon: Shield,
          color: 'text-[#C9A24A]',
          features: [
            'Basic partner directory access',
            'Partner business names and categories',
            'Service area coverage information',
            'Contact request forms',
            'Limited filtering options',
            'Community support'
          ]
        }
    }
  }

  const tierInfo = getTierInfo(tier)
  const TierIcon = tierInfo.icon

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#16A34A] rounded-full mb-6">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              Welcome to the Directory!
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              Your {tierInfo.name} is now active. You're connected to London's most comprehensive network of vetted service providers.
            </p>
          </div>

          {/* Tier Confirmation */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 border border-[#C9A24A]/20 rounded-2xl p-8 mb-12">
            <div className="text-center">
              <TierIcon className={`h-12 w-12 ${tierInfo.color} mx-auto mb-4`} />
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-4">
                {tierInfo.name} Activated
              </h2>
              <p className="text-[#6B7280] mb-4">
                {tier !== 'free' && sessionId ? 
                  `Your subscription (${tierInfo.price}) has been confirmed and billing is now active.` :
                  `Your ${tierInfo.name} provides immediate access to our partner directory.`
                }
              </p>
              {signupId && (
                <p className="text-sm text-[#6B7280]">
                  Access ID: {signupId}
                </p>
              )}
              {sessionId && (
                <p className="text-sm text-[#6B7280]">
                  Payment Reference: {sessionId}
                </p>
              )}
            </div>
          </div>

          {/* Your Access Features */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB] mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0B1220] mb-8 text-center">
              Your Directory Access
            </h2>
            
            <div className="space-y-4 mb-8">
              {tierInfo.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-[#16A34A] mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-[#6B7280]">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-md text-lg font-semibold hover:scale-105 transition-all shadow-lg"
                onClick={() => window.location.href = '/directory'}
              >
                <Search className="h-5 w-5 mr-2" />
                Access Directory Now
              </Button>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB] mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0B1220] mb-8 text-center">
              What Happens Next
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Immediate Directory Access</h3>
                  <p className="text-[#6B7280]">Start browsing our comprehensive directory of 200+ vetted service providers across all London areas.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Account Setup (2 hours)</h3>
                  <p className="text-[#6B7280]">You'll receive login credentials and a personalised welcome guide via email within 2 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Partner Recommendations (24 hours)</h3>
                  <p className="text-[#6B7280]">Our team will identify and recommend relevant partners based on your specific requirements and location preferences.</p>
                </div>
              </div>
              
              {tier === 'vip' && (
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    4
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0B1220] mb-2">VIP Onboarding Call (24 hours)</h3>
                    <p className="text-[#6B7280]">Your dedicated account manager will contact you to discuss your specific needs and create a custom partner shortlist.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Directory Benefits Reminder */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 border border-[#C9A24A]/20 rounded-2xl p-8 mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6 text-center">
              Why Choose Our Directory
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">200+ Vetted Partners</h3>
                <p className="text-[#6B7280]">Rigorously vetted service providers across all specialties and London areas</p>
              </div>
              <div className="text-center">
                <Target className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">96.4% Satisfaction</h3>
                <p className="text-[#6B7280]">Verified client ratings and continuous quality monitoring</p>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Instant Connection</h3>
                <p className="text-[#6B7280]">Connect with the right partners immediately - no waiting or delays</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm text-center">
              <Search className="h-8 w-8 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold text-[#0B1220] mb-3">Start Searching</h3>
              <p className="text-[#6B7280] mb-4 text-sm">Browse partners by category, location, or specific service needs.</p>
              <Button 
                className="w-full bg-[#C9A24A] hover:bg-[#B8923D] text-white rounded-md"
                onClick={() => window.location.href = '/directory'}
              >
                Browse Directory
              </Button>
            </div>
            
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm text-center">
              <Mail className="h-8 w-8 text-[#C9A24A] mx-auto mb-4" />
              <h3 className="font-semibold text-[#0B1220] mb-3">Get Recommendations</h3>
              <p className="text-[#6B7280] mb-4 text-sm">Receive personalised partner recommendations based on your requirements.</p>
              <Button 
                className="w-full border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white rounded-md"
                onClick={() => window.location.href = 'mailto:directory@therelonetwork.com?subject=Partner Recommendations Request'}
              >
                Request Recommendations
              </Button>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
              <Phone className="h-8 w-8 text-[#C9A24A] mb-4" />
              <h3 className="font-semibold text-[#0B1220] mb-2">Directory Support</h3>
              <p className="text-[#6B7280] mb-2">Questions about your access or need help finding partners?</p>
              <p className="font-semibold text-[#0B1220]">+44 20 7946 0958</p>
              <p className="text-sm text-[#6B7280]">24/7 support available</p>
            </div>
            
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
              <Mail className="h-8 w-8 text-[#C9A24A] mb-4" />
              <h3 className="font-semibold text-[#0B1220] mb-2">Email Support</h3>
              <p className="text-[#6B7280] mb-2">For detailed inquiries or technical support:</p>
              <p className="font-semibold text-[#0B1220]">directory@therelonetwork.com</p>
              <p className="text-sm text-[#6B7280]">Response within 2 hours</p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}