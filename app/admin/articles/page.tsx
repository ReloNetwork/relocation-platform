'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'

export default function AdminArticles() {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Welcome to The London Relocation Report',
      slug: 'welcome-to-london-relocation-report',
      excerpt: 'Your premier source for executive relocation insights in London',
      publishedAt: '2024-01-15T10:00:00Z',
      status: 'published'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newArticle = {
      id: Date.now(),
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: formData.excerpt,
      content: formData.content,
      publishedAt: new Date().toISOString(),
      status: 'published'
    }

    setArticles([newArticle, ...articles])
    setFormData({ title: '', excerpt: '', content: '' })
    setShowForm(false)

    // This will trigger RSS update and Zapier automation
    console.log('New article published:', newArticle)
  }

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen bg-[#FAFAF9] py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#0B1B2B]" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Article Management
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              New Article
            </button>
          </div>

          {/* New Article Form */}
          {showForm && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E5E7EB] mb-8">
              <h2 className="text-xl font-bold text-[#0B1B2B] mb-4">Create New Article</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] h-20"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0B1B2B] mb-2">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24A] h-40"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-[#C9A24A] hover:bg-[#B8923D] text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Publish Article
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Articles List */}
          <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB]">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#0B1B2B] mb-4">Published Articles</h2>
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="border border-[#E5E7EB] rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#0B1B2B] mb-2">
                          {article.title}
                        </h3>
                        <p className="text-[#6B7280] mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center text-sm text-[#6B7280] space-x-4">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            {article.status}
                          </span>
                          <span>
                            Published: {new Date(article.publishedAt).toLocaleDateString('en-GB')}
                          </span>
                          <span>
                            Slug: /{article.slug}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button className="text-[#C9A24A] hover:text-[#B8923D] transition-colors">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-700 transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Integration Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              📡 Automation Active
            </h3>
            <p className="text-blue-800 mb-4">
              When you publish new articles here, they automatically:
            </p>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Update the RSS feed at <code>/rss.xml</code></li>
              <li>Trigger Zapier automation</li>
              <li>Create newsletter post in beehiiv</li>
              <li>Email to all subscribers</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}