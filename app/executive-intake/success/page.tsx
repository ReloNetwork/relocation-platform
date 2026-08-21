'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Mail } from 'lucide-react'
import Layout from '@/components/Layout'

type IntakeReceipt = {
  name?: string
  email?: string
  referenceId?: string
}

export default function ExecutiveIntakeSuccessPage() {
  const [receipt, setReceipt] = useState<IntakeReceipt>({})
  const calendarLink = process.env.NEXT_PUBLIC_CAL_COM_EMBED_ID

  useEffect(() => {
    const saved = sessionStorage.getItem('executive_intake_data')
    if (!saved) return

    try {
      setReceipt(JSON.parse(saved))
    } catch (error) {
      console.error('Unable to read executive intake receipt', error)
    }
  }, [])

  const bookingUrl = calendarLink
    ? `https://cal.com/${calendarLink}?name=${encodeURIComponent(receipt.name || '')}&email=${encodeURIComponent(receipt.email || '')}`
    : null

  return (
    <Layout className="bg-[#FAFAF9] min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <section className="bg-white border border-[#E5E7EB] p-8 md:p-14">
          <div className="w-16 h-16 bg-[#C9A24A] rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <p className="text-xs tracking-[0.2em] text-[#C9A24A] mb-4">
            PRIVATE RELOCATION BRIEF
          </p>
          <h1
            className="text-4xl md:text-6xl text-[#0B1B2B] mb-6"
            style={{ fontFamily: 'Playfair Display, Georgia, serif' }}
          >
            YOUR BRIEF IS WITH US.
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mb-8">
            We will review the timing, household needs and level of support
            required, then reply within one business day with the most
            appropriate next step.
          </p>

          {receipt.referenceId && (
            <div className="bg-[#FAFAF9] border-l-4 border-[#C9A24A] p-5 mb-8">
              <p className="text-sm text-[#6B7280]">Your reference</p>
              <p className="text-xl font-semibold text-[#0B1B2B]">
                {receipt.referenceId}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="border-t border-[#E5E7EB] pt-5">
              <Clock className="w-5 h-5 text-[#C9A24A] mb-3" />
              <h2 className="font-semibold text-[#0B1B2B] mb-2">
                Human review first
              </h2>
              <p className="text-sm text-[#6B7280]">
                No service has started and no payment has been taken.
              </p>
            </div>
            <div className="border-t border-[#E5E7EB] pt-5">
              <Mail className="w-5 h-5 text-[#C9A24A] mb-3" />
              <h2 className="font-semibold text-[#0B1B2B] mb-2">
                A considered recommendation
              </h2>
              <p className="text-sm text-[#6B7280]">
                We will recommend a briefing, audit or full engagement only
                when it is the right fit.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {bookingUrl && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#C9A24A] text-white px-6 py-3 font-semibold inline-flex items-center justify-center gap-2"
              >
                Request a private briefing
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
            <Link
              href="/journal"
              className="border border-[#0B1B2B] text-[#0B1B2B] px-6 py-3 font-semibold inline-flex items-center justify-center"
            >
              Read The London Brief
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  )
}
