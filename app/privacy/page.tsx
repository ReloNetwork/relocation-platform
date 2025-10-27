'use client'

import React from 'react'
import Layout from '../../components/Layout'
import { Shield, Eye, Lock, Users, Mail, FileText } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <Layout className="bg-[#FAFAF9]" showFooter={false}>
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#0B1B2B]/10 border border-[#0B1B2B]/20 rounded-full px-4 py-2 mb-6">
            <Shield className="h-4 w-4 text-[#0B1B2B] mr-2" />
            <span className="text-[#0B1B2B] text-sm font-medium">Privacy & Data Protection</span>
          </div>
          <h1 className="text-5xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Privacy Policy
          </h1>
          <p className="text-xl text-[#6B7280]">
            How Relo Network protects and manages your personal information
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E5E7EB] space-y-8">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6">Our Commitment to Privacy</h2>
            <p className="text-[#6B7280] mb-4">
              At Relo Network Ltd, we are committed to protecting your privacy and handling your personal 
              information with care. This Privacy Policy explains how we collect, use, share, and protect 
              your information when you use our relocation services.
            </p>
            <div className="bg-[#C9A24A]/10 rounded-lg p-6">
              <p className="text-[#0B1B2B]">
                <strong>Key Principle:</strong> We only collect information necessary to provide exceptional 
                relocation services and will never sell your personal data to third parties.
              </p>
            </div>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6 text-[#C9A24A]" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Personal Information</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Name, email address, and phone number</li>
                  <li>• Employment details and relocation timeline</li>
                  <li>• Family information (when relevant to setup audit or full relocation)</li>
                  <li>• Area preferences and lifestyle requirements</li>
                  <li>• Property viewing history and feedback</li>
                  <li>• Communication history and service satisfaction data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Technical Information</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Website usage data and analytics</li>
                  <li>• Device information and browser type</li>
                  <li>• Audit form completion and interaction data</li>
                  <li>• 72-Hour Setup Audit progress tracking</li>
                  <li>• Partner network connection history</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Users className="w-6 h-6 text-[#C9A24A]" />
              How We Use Your Information
            </h2>
            
            <div className="space-y-4">
              <div className="bg-[#F8F9FA] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Service Delivery</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Conducting comprehensive 72-Hour Setup Audits</li>
                  <li>• Providing area fit analysis and property shortlists</li>
                  <li>• Connecting you with vetted service partners via warm introductions</li>
                  <li>• Managing Executive Relocation packages and milestone delivery</li>
                  <li>• Facilitating corporate relocation programs for HR teams</li>
                </ul>
              </div>

              <div className="bg-[#F8F9FA] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-4">Communication</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Scheduling strategy calls and audit deliverables</li>
                  <li>• Providing milestone updates and service confirmations</li>
                  <li>• Facilitating partner introductions and connections</li>
                  <li>• Sharing audit reports and relocation insights</li>
                  <li>• Processing feedback for service improvements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Protection */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-[#C9A24A]" />
              Data Protection & Security
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Security Measures</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• Industry-standard encryption for data transmission</li>
                  <li>• Secure cloud storage with regular backups</li>
                  <li>• Limited access controls for team members</li>
                  <li>• Regular security audits and updates</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Data Retention</h3>
                <p className="text-[#6B7280] mb-3">
                  We retain your personal information only as long as necessary to provide services 
                  and comply with legal requirements:
                </p>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• 72-Hour Setup Audit: 12 months for credit application and follow-up</li>
                  <li>• Executive Relocation packages: Duration of service plus 3 years</li>
                  <li>• Corporate programs: As per contractual agreements</li>
                  <li>• Marketing consent: Until withdrawn</li>
                  <li>• Legal requirements: As mandated by law</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Sharing Information */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6">Sharing Your Information</h2>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Service Partners</h3>
              <p className="text-[#6B7280] mb-3">
                We share relevant information with vetted partners to facilitate your 72-Hour Setup Audit and relocation services:
              </p>
              <ul className="space-y-2 text-[#6B7280]">
                <li>• Estate agents: Area preferences and property shortlist requirements</li>
                <li>• Schools: Family details for admissions guidance and school visits</li>
                <li>• Legal advisors: Tenancy requirements for rider review</li>
                <li>• Service providers: Specific requirements for viewing routes and logistics</li>
                <li>• Financial advisors: Employment context for mortgage and investment analysis</li>
              </ul>
              <p className="text-[#6B7280] text-sm mt-3">
                <strong>All partners sign confidentiality agreements and adhere to strict data protection standards.</strong>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Legal Requirements</h3>
              <p className="text-[#6B7280]">
                We may disclose information when required by law, court order, or to protect our 
                rights and the safety of our clients and team members.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#C9A24A]" />
              Your Privacy Rights
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#F8F9FA] rounded-lg p-6">
                <h3 className="font-semibold text-[#0B1B2B] mb-3">Access & Control</h3>
                <ul className="space-y-2 text-[#6B7280] text-sm">
                  <li>• Request copies of your personal data</li>
                  <li>• Update or correct your information</li>
                  <li>• Delete your account and data</li>
                  <li>• Withdraw marketing consent</li>
                </ul>
              </div>
              
              <div className="bg-[#F8F9FA] rounded-lg p-6">
                <h3 className="font-semibold text-[#0B1B2B] mb-3">Data Portability</h3>
                <ul className="space-y-2 text-[#6B7280] text-sm">
                  <li>• Export your data in standard formats</li>
                  <li>• Transfer data to other services</li>
                  <li>• Restrict processing of your data</li>
                  <li>• Object to automated decision-making</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cookies & Analytics */}
          <section>
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6">Cookies & Website Analytics</h2>
            
            <div className="space-y-4">
              <p className="text-[#6B7280]">
                We use cookies and similar technologies to improve your website experience and understand 
                how our services are used.
              </p>
              
              <div className="bg-[#F8F9FA] rounded-lg p-6">
                <h3 className="text-lg font-semibold text-[#0B1B2B] mb-3">Cookie Types</h3>
                <ul className="space-y-2 text-[#6B7280]">
                  <li>• <strong>Essential:</strong> Required for website functionality</li>
                  <li>• <strong>Analytics:</strong> Help us understand usage patterns</li>
                  <li>• <strong>Preferences:</strong> Remember your settings and choices</li>
                  <li>• <strong>Marketing:</strong> Personalize content (with consent)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="border-t border-[#E5E7EB] pt-8">
            <h2 className="text-2xl font-bold text-[#0B1B2B] mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#C9A24A]" />
              Privacy Questions?
            </h2>
            <div className="bg-[#C9A24A]/10 rounded-lg p-6">
              <p className="text-[#0B1B2B] mb-4">
                If you have questions about this Privacy Policy or want to exercise your rights:
              </p>
              <div className="space-y-2 text-[#6B7280]">
                <div><strong>Privacy Officer:</strong> hello@therelonetwork.com</div>
                <div><strong>Phone:</strong> +44 20 3105 9566</div>
                <div><strong>Address:</strong> Relo Network Ltd, London, United Kingdom</div>
              </div>
              <p className="text-[#6B7280] text-sm mt-4">
                We will respond to privacy requests within 30 days and provide clear information 
                about any actions taken.
              </p>
            </div>
          </section>
          
          <div className="text-center pt-8 border-t border-[#E5E7EB]">
            <p className="text-[#6B7280] text-sm">
              This Privacy Policy was last updated: {new Date().toLocaleDateString('en-GB', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
            <div className="mt-4 text-[#6B7280]/60 text-sm">
              © 2024 Relo Network Ltd. All rights reserved. London, United Kingdom.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}