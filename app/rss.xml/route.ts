import { NextResponse } from 'next/server'

// This will be populated with actual articles from your database/CMS
const articles = [
  {
    id: 1,
    title: 'Welcome to The London Relocation Report',
    slug: 'welcome-to-london-relocation-report',
    excerpt: 'Your premier source for executive relocation insights in London',
    content: 'Welcome to The London Relocation Report, your premier source for executive relocation insights, market intelligence, and expert guidance for high-net-worth professionals relocating to London.',
    publishedAt: '2024-01-15T10:00:00Z',
    author: 'Calistar Ankrah'
  }
  // More articles will be added here from your CMS
]

export async function GET() {
  const baseUrl = 'https://therelonetwork.com'
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The London Relocation Report</title>
    <description>Executive relocation insights and market intelligence for high-net-worth professionals relocating to London</description>
    <link>${baseUrl}</link>
    <language>en-US</language>
    <managingEditor>hello@therelonetwork.com (Calistar Ankrah)</managingEditor>
    <webMaster>hello@therelonetwork.com (Calistar Ankrah)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    
    ${articles.map(article => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <description><![CDATA[${article.excerpt}]]></description>
      <link>${baseUrl}/articles/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/articles/${article.slug}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
      <author>hello@therelonetwork.com (${article.author})</author>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
    </item>
    `).join('')}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  })
}