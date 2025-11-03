'use client'

import { useParams } from 'next/navigation'
import { getProfessionalPartnerArticles } from '@/lib/professional-partners'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Star, Building } from 'lucide-react'
import { Button } from '@/ui/components/button'
import { Badge } from '@/ui/components/badge'

export default function ArticlePage() {
  const params = useParams()
  const slug = params.slug as string
  
  // Get all partner articles
  const allArticles = getProfessionalPartnerArticles()
  const article = allArticles.find(a => a.slug === slug)
  
  if (!article) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#0B1B2B] mb-4">Article Not Found</h1>
            <p className="text-lg text-[#6B7280] mb-8">The article you're looking for doesn't exist.</p>
            <Link href="/newsletter">
              <Button className="bg-[#C9A24A] hover:bg-[#B8923D] text-white">
                Back to Newsletter
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
  
  return (
    <Layout>
      <div className="bg-gradient-to-br from-white to-[#FAFAF9] min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B1B2B] via-[#0B1B2B]/95 to-[#0B1B2B] py-16">
          <div className="max-w-4xl mx-auto px-4">
            <Link href="/newsletter">
              <Button 
                variant="ghost" 
                className="text-white hover:text-[#C9A24A] mb-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Newsletter
              </Button>
            </Link>
            
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="outline" className="bg-[#C9A24A]/10 border-[#C9A24A]/30 text-[#C9A24A]">
                Professional Partner Insight
              </Badge>
              {article.featured && (
                <Badge className="bg-[#C9A24A] text-white">
                  <Star className="w-3 h-3 mr-1" />
                  Featured
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              {article.title}
            </h1>
            
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                <span>{article.partnerName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.publishedDate).toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-[#6B7280] leading-relaxed mb-8">
                {article.excerpt}
              </p>
              
              <div className="bg-[#FAFAF9] rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-[#0B1B2B] mb-4">About {article.partnerName}</h2>
                <p className="text-[#6B7280] mb-4">
                  As a Relo Network Professional Partner, {article.partnerName} provides specialized services 
                  in {article.partnerCategory.toLowerCase()} to support executive relocations to London.
                </p>
                <p className="text-sm text-[#6B7280]">
                  <strong>Category:</strong> {article.partnerCategory}
                </p>
              </div>
              
              {/* Article content placeholder */}
              <div className="space-y-6">
                <p className="text-[#6B7280] leading-relaxed">
                  This is a preview of the full article content. The complete article will be available soon 
                  with detailed insights and expert guidance from {article.partnerName}.
                </p>
                
                <div className="border-l-4 border-[#C9A24A] pl-6 my-8">
                  <p className="text-[#6B7280] italic">
                    "Excellence in {article.partnerCategory.toLowerCase()} is fundamental to successful 
                    executive relocations. Our expertise ensures a seamless transition for professionals 
                    moving to London."
                  </p>
                  <p className="text-sm text-[#6B7280] mt-2">
                    — {article.partnerName} Team
                  </p>
                </div>
                
                <h3 className="text-xl font-bold text-[#0B1B2B] mt-8">Key Takeaways</h3>
                <ul className="list-disc list-inside space-y-2 text-[#6B7280]">
                  <li>Expert insights from leading {article.partnerCategory.toLowerCase()} professionals</li>
                  <li>Practical guidance for London relocations</li>
                  <li>Industry best practices and recommendations</li>
                  <li>Exclusive tips from {article.partnerName}</li>
                </ul>
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-12 p-8 bg-gradient-to-br from-[#FAFAF9] to-white rounded-xl border border-[#C9A24A]/20">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">
                Ready to Start Your London Journey?
              </h3>
              <p className="text-[#6B7280] mb-6">
                Get personalized guidance from our network of professional partners.
              </p>
              <div className="flex gap-4">
                <Link href="/executive-intake">
                  <Button className="bg-[#C9A24A] hover:bg-[#B8923D] text-white">
                    Book Your 72-Hour Audit
                  </Button>
                </Link>
                <Link href="/directory">
                  <Button variant="outline" className="border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A]/10">
                    Explore Partners
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}