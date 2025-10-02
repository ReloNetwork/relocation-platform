'use client'

import Layout from '../../components/Layout'
import { Users, Globe, Award, Shield, Heart, Target, Zap, Building } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Relo Network - London\'s Elite Relocation Network Story',
  description: 'Discover the story behind London\'s most exclusive relocation network. Founded in 2024, connecting high-net-worth clients with vetted luxury service providers. Our mission, values, and team.',
  keywords: 'Relo Network about, London relocation company story, luxury relocation network history, executive relocation team, high-net-worth relocation specialists, premium relocation company London, vetted service providers',
  authors: [{ name: 'Relo Network', url: 'https://therelonetwork.com' }],
  creator: 'Relo Network',
  publisher: 'Relo Network',
  metadataBase: new URL('https://therelonetwork.com'),
  alternates: {
    canonical: '/about',
    languages: {
      'en-GB': '/about',
      'x-default': '/about'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://therelonetwork.com/about',
    siteName: 'Relo Network',
    title: 'About Relo Network | London\'s Elite Relocation Network',
    description: 'Founded in 2024, Relo Network connects high-net-worth clients with London\'s most exclusive vetted service providers. Discover our mission and team.',
    images: [
      {
        url: '/images/og-about-company.jpg',
        width: 1200,
        height: 630,
        alt: 'About Relo Network - London Elite Relocation Company Story'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ReloNetwork',
    creator: '@ReloNetwork',
    title: 'About Relo Network | Elite London Relocation Network',
    description: 'Discover the story behind London\'s most exclusive relocation network, connecting high-value clients with vetted luxury service providers.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const StatCard = ({ icon: Icon, number, label, description }: { 
  icon: any, 
  number: string, 
  label: string, 
  description: string 
}) => (
  <div className="text-center p-6">
    <Icon className="h-8 w-8 text-[#C9A24A] mx-auto mb-3" />
    <div className="text-3xl font-bold text-[#0B1B2B] mb-2">{number}</div>
    <div className="text-[#0B1B2B] font-medium mb-1">{label}</div>
    <div className="text-[#6B7280] text-sm">{description}</div>
  </div>
)

const ValueCard = ({ icon: Icon, title, description }: {
  icon: any,
  title: string,
  description: string
}) => (
  <div className="bg-white rounded-lg p-6 border border-[#0B1B2B]/10 shadow-sm">
    <Icon className="h-8 w-8 text-[#C9A24A] mb-4" />
    <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">{title}</h3>
    <p className="text-[#6B7280]">{description}</p>
  </div>
)

export default function AboutPage() {
  return (
    <Layout className="bg-[#FAFAF9]" showFooter={true}>
      {/* Hero Section */}
      <div className="bg-[#0B1B2B] text-white">
        <div className="max-w-6xl mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              About <span className="text-[#C9A24A]">Relo Network</span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-12">
              London's most exclusive relocation network, connecting high-value clients with vetted luxury service providers since 2024.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <StatCard 
                icon={Users} 
                number="150+" 
                label="Vetted Partners" 
                description="Across all categories"
              />
              <StatCard 
                icon={Globe} 
                number="47" 
                label="Countries" 
                description="Global reach"
              />
              <StatCard 
                icon={Building} 
                number="£2.3M+" 
                label="Revenue Generated" 
                description="For our partners"
              />
              <StatCard 
                icon={Award} 
                number="96%" 
                label="Satisfaction Rate" 
                description="Client happiness"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#0B1B2B] mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Our Mission
              </h2>
              <p className="text-lg text-[#6B7280] mb-6 leading-relaxed">
                Relo Network was founded with a simple mission: to revolutionize luxury relocations to London by connecting discerning clients with the finest service providers in the city.
              </p>
              <p className="text-lg text-[#6B7280] mb-6 leading-relaxed">
                We believe that moving to a new city should be exciting, not stressful. That's why we've created an exclusive network of vetted professionals who understand the unique needs of high-value relocations.
              </p>
              <p className="text-lg text-[#6B7280] leading-relaxed">
                Through our AI-powered platform and human expertise, we ensure every relocation is seamless, luxurious, and perfectly tailored to our clients' needs.
              </p>
            </div>
            <div className="relative">
              <div className="bg-[#C9A24A] rounded-lg p-8 text-white">
                <blockquote className="text-lg italic mb-4">
                  "Relo Network has set the gold standard for luxury relocations in London. Their commitment to excellence and attention to detail is unmatched."
                </blockquote>
                <cite className="text-sm opacity-90">
                  — Marcus Wellington-Smith, Director, London Relocation Council
                </cite>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-[#FAFAF9]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Our Values
            </h2>
            <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={Shield}
              title="Trust & Integrity"
              description="Every partner in our network is thoroughly vetted and verified to ensure the highest standards of service and professionalism."
            />
            <ValueCard 
              icon={Heart}
              title="Client-Centric"
              description="We put our clients' needs first, ensuring every aspect of their relocation is handled with care and attention to detail."
            />
            <ValueCard 
              icon={Award}
              title="Excellence"
              description="We maintain the highest standards in everything we do, from partner selection to service delivery and client satisfaction."
            />
            <ValueCard 
              icon={Zap}
              title="Innovation"
              description="Our AI-powered platform combined with human expertise delivers faster, smarter, and more personalized relocation solutions."
            />
            <ValueCard 
              icon={Globe}
              title="Global Perspective"
              description="With clients from 47 countries, we understand the unique challenges of international relocations to London."
            />
            <ValueCard 
              icon={Target}
              title="Results-Driven"
              description="We measure our success by our clients' satisfaction and our partners' growth, ensuring mutual success for all."
            />
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0B1B2B] mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Our Story
            </h2>
          </div>

          <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">The Beginning</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Founded in early 2024, Relo Network emerged from the recognition that London's luxury relocation market lacked a truly comprehensive, technology-driven solution. Our founders, experienced in both luxury services and technology, saw an opportunity to bridge this gap.
                </p>
              </div>
              <div className="bg-[#FAFAF9] rounded-lg p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C9A24A]">January 2024</div>
                  <div className="text-[#0B1B2B] font-medium">Network Launch</div>
                  <div className="text-[#6B7280] text-sm mt-2">Started with 15 founding partners</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Rapid Growth</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Within months, our unique approach attracted London's finest service providers and most discerning clients. Our AI-powered matching system and rigorous vetting process quickly established us as the premium choice for luxury relocations.
                </p>
              </div>
              <div className="lg:order-1 bg-[#FAFAF9] rounded-lg p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C9A24A]">150+</div>
                  <div className="text-[#0B1B2B] font-medium">Verified Partners</div>
                  <div className="text-[#6B7280] text-sm mt-2">Across all service categories</div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">Today & Beyond</h3>
                <p className="text-[#6B7280] leading-relaxed">
                  Today, Relo Network is London's most exclusive relocation platform, having generated over £2.3M in verified revenue for our partners while maintaining a 96% client satisfaction rate. We continue to innovate and expand our services to meet the evolving needs of luxury relocations.
                </p>
              </div>
              <div className="bg-[#FAFAF9] rounded-lg p-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C9A24A]">£2.3M+</div>
                  <div className="text-[#0B1B2B] font-medium">Partner Revenue</div>
                  <div className="text-[#6B7280] text-sm mt-2">Generated since launch</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#C9A24A] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
            Ready to Experience the Relo Network Difference?
          </h3>
          <p className="text-lg mb-8 text-white/90">
            Join thousands who've trusted us with their London relocation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/concierge"
              className="inline-flex items-center justify-center h-12 px-8 bg-white text-[#C9A24A] hover:bg-gray-100 rounded-md hover:scale-105 shadow-lg hover:shadow-xl transition-all font-medium"
            >
              Explore Our Services
            </a>
            <a 
              href="/partners"
              className="inline-flex items-center justify-center h-12 px-8 border-2 border-white text-white hover:bg-white hover:text-[#C9A24A] rounded-md hover:scale-105 transition-all font-medium"
            >
              Become a Partner
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}