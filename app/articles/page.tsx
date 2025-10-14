'use client'

import Layout from '@/components/Layout'
import Link from 'next/link'

// Sample articles - in production these would come from a database
const articles = [
  {
    id: 1,
    title: 'Welcome to The London Relocation Report',
    slug: 'welcome-to-london-relocation-report',
    excerpt: 'Your premier source for executive relocation insights in London',
    publishedAt: '2024-01-15T10:00:00Z',
    author: 'Calistar Ankrah',
    readingTime: '3 min read'
  }
]

export default function Articles() {
  return (
    <Layout>
      <div className="min-h-screen bg-[#FAFAF9]">
        {/* Hero Section */}
        <div className="bg-[#0B1B2B] text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              The London Relocation Report
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Executive relocation insights, market intelligence, and expert guidance for high-net-worth professionals relocating to London
            </p>
          </div>
        </div>

        {/* Articles List */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white rounded-xl p-8 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-[#0B1B2B] mb-2 hover:text-[#C9A24A] transition-colors">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>
                    <p className="text-[#6B7280] mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-[#6B7280] space-x-4">
                      <span>By {article.author}</span>
                      <span>•</span>
                      <span>{new Date(article.publishedAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}</span>
                      <span>•</span>
                      <span>{article.readingTime}</span>
                    </div>
                  </div>
                </div>
                <Link 
                  href={`/articles/${article.slug}`}
                  className="inline-flex items-center text-[#C9A24A] hover:text-[#B8923D] transition-colors font-medium"
                >
                  Read Article →
                </Link>
              </article>
            ))}
          </div>

          {/* Empty State */}
          {articles.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-[#0B1B2B] mb-4">No Articles Yet</h3>
              <p className="text-[#6B7280] mb-8">
                Check back soon for executive relocation insights and market intelligence.
              </p>
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="bg-[#0B1B2B] text-white rounded-xl p-8 text-center mt-12">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Never Miss an Update
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to The London Relocation Report for weekly insights, market updates, and exclusive executive relocation intelligence.
            </p>
            <Link 
              href="/newsletter" 
              className="inline-block bg-[#C9A24A] hover:bg-[#B8923D] text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Subscribe Now
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}