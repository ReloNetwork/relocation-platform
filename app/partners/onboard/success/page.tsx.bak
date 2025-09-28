'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Award, Shield, Star, TrendingUp, Users, Phone, Mail } from 'lucide-react'
import { Button } from '@/ui/components/button'
import Layout from '../../../../components/Layout'

export default function PartnerOnboardingSuccessPage() {
  const searchParams = useSearchParams()
  const partnerId = searchParams?.get('partnerId') || ''
  const status = searchParams?.get('status') || 'pending'
  const score = parseInt(searchParams?.get('score') || '0')

  const getStatusInfo = (approvalStatus: string, qualityScore: number) => {
    if (approvalStatus === 'approved') {
      return {
        title: 'Application Approved!',
        subtitle: 'Welcome to the Relo Network',
        icon: CheckCircle,
        color: 'text-[#16A34A]',
        bgColor: 'bg-[#16A34A]',
        message: 'Your business is now live in our directory and visible to clients.',
        nextSteps: [
          'Your profile is live and visible to relevant clients',
          'You\'ll start receiving qualified leads within 24-48 hours',
          'Access your partner dashboard to manage your profile',
          'Complete any additional profile enhancements'
        ]
      }
    } else {
      return {
        title: 'Application Under Review',
        subtitle: 'Thank you for your submission',
        icon: Award,
        color: 'text-[#C9A24A]',
        bgColor: 'bg-[#C9A24A]',
        message: 'Our team is reviewing your application. This typically takes 24-48 hours.',
        nextSteps: [
          'Our partnership team will review your credentials',
          'You\'ll receive an email update within 24-48 hours',
          'We may contact you for additional documentation',
          'Upon approval, your profile will go live immediately'
        ]
      }
    }
  }

  const statusInfo = getStatusInfo(status, score)
  const StatusIcon = statusInfo.icon

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#16A34A]'
    if (score >= 60) return 'text-[#C9A24A]'
    return 'text-[#DC2626]'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Acceptable'
    return 'Needs Improvement'
  }

  return (
    <Layout className="bg-[#FAFAF9]">
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${statusInfo.bgColor} rounded-full mb-6`}>
              <StatusIcon className="h-10 w-10 text-white" />
            </div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-[#0B1220] mb-4">
              {statusInfo.title}
            </h1>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              {statusInfo.message}
            </p>
          </div>

          {/* Application Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB] mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6 text-center">
              Application Summary
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-[#C9A24A]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Partner ID</h3>
                <p className="text-[#6B7280] font-mono text-sm">{partnerId}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-[#C9A24A]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Quality Score</h3>
                <p className={`text-2xl font-bold ${getScoreColor(score)}`}>
                  {score}/100
                </p>
                <p className="text-sm text-[#6B7280]">{getScoreLabel(score)}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-[#C9A24A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className={`h-8 w-8 ${statusInfo.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Status</h3>
                <p className={`font-semibold ${statusInfo.color}`}>
                  {status === 'approved' ? 'Approved' : 'Under Review'}
                </p>
              </div>
            </div>

            <div className="bg-[#FAFAF9] rounded-lg p-6">
              <h3 className="text-lg font-semibold text-[#0B1220] mb-4">Automated Assessment Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-[#0B1220]">Categorization:</span>
                  <span className="text-[#6B7280] ml-2">Automated</span>
                </div>
                <div>
                  <span className="font-medium text-[#0B1220]">Access Tiers:</span>
                  <span className="text-[#6B7280] ml-2">Assigned based on location</span>
                </div>
                <div>
                  <span className="font-medium text-[#0B1220]">Verification:</span>
                  <span className="text-[#6B7280] ml-2">{score >= 70 ? 'Passed' : 'Manual review required'}</span>
                </div>
                <div>
                  <span className="font-medium text-[#0B1220]">Directory Visibility:</span>
                  <span className="text-[#6B7280] ml-2">{status === 'approved' ? 'Live' : 'Pending approval'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB] mb-12">
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#0B1220] mb-8 text-center">
              What Happens Next
            </h2>
            
            <div className="space-y-6">
              {statusInfo.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-[#C9A24A] rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-[#6B7280]">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Benefits */}
          <div className="bg-gradient-to-r from-[#C9A24A]/10 to-[#B8923D]/10 border border-[#C9A24A]/20 rounded-2xl p-8 mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6 text-center">
              Your Partner Network Benefits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Qualified Leads</h3>
                <p className="text-[#6B7280]">Pre-screened clients with established budgets and immediate requirements</p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Quality Network</h3>
                <p className="text-[#6B7280]">Join London's most exclusive service provider network with rigorous vetting</p>
              </div>
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-[#C9A24A] mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-[#0B1220] mb-2">Business Growth</h3>
                <p className="text-[#6B7280]">Access high-value clients and grow your business with premium referrals</p>
              </div>
            </div>
          </div>

          {/* Quality Score Breakdown */}
          {score > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#E5E7EB] mb-12">
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#0B1220] mb-6 text-center">
                Quality Assessment Breakdown
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Business Information Completeness</span>
                  <span className="font-semibold text-[#0B1220]">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#C9A24A] h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Professional Credentials</span>
                  <span className="font-semibold text-[#0B1220]">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#C9A24A] h-2 rounded-full" style={{ width: `${Math.min(score * 0.8, 100)}%` }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Business Scope & Capacity</span>
                  <span className="font-semibold text-[#0B1220]">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-[#C9A24A] h-2 rounded-full" style={{ width: `${Math.min(score * 0.9, 100)}%` }}></div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-[#FAFAF9] rounded-lg">
                <p className="text-sm text-[#6B7280]">
                  <strong>Note:</strong> Quality scores are calculated based on profile completeness, professional verification, 
                  and business scope. Scores above 70 qualify for automatic approval.
                </p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
              <Phone className="h-8 w-8 text-[#C9A24A] mb-4" />
              <h3 className="font-semibold text-[#0B1220] mb-2">Partnership Support</h3>
              <p className="text-[#6B7280] mb-2">Questions about your application or need help getting started?</p>
              <p className="font-semibold text-[#0B1220]">+44 20 7946 0958</p>
              <p className="text-sm text-[#6B7280]">Mon-Fri: 9AM-6PM GMT</p>
            </div>
            
            <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
              <Mail className="h-8 w-8 text-[#C9A24A] mb-4" />
              <h3 className="font-semibold text-[#0B1220] mb-2">Email Support</h3>
              <p className="text-[#6B7280] mb-2">For detailed inquiries or documentation requests:</p>
              <p className="font-semibold text-[#0B1220]">partnerships@therelonetwork.com</p>
              <p className="text-sm text-[#6B7280]">Response within 4 hours</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center mt-12">
            {status === 'approved' ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-md text-lg font-semibold"
                  onClick={() => window.location.href = '/partners/dashboard'}
                >
                  Access Partner Dashboard
                </Button>
                <Button 
                  className="border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-white px-8 py-3 rounded-md text-lg font-semibold"
                  onClick={() => window.location.href = '/directory'}
                >
                  View Your Directory Listing
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-md text-lg font-semibold"
                onClick={() => window.location.href = '/partners'}
              >
                Return to Partners Portal
              </Button>
            )}
          </div>

        </div>
      </div>
    </Layout>
  )
}