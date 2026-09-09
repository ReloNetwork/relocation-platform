import { NextResponse } from 'next/server'
import { articleUrl, editorialArticles } from '@/lib/editorial-articles'
import { SITE_URL } from '@/lib/site-url'

const baseUrl = SITE_URL

function escapeXml(value: string) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character] as string)
}

export async function GET() {
  const items = editorialArticles.map((article) => {
    const url = `${baseUrl}${articleUrl(article.slug)}`
    return `<item>
      <title>${escapeXml(article.title)}</title>
      <description>${escapeXml(article.excerpt)}</description>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate>
    </item>`
  }).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The London Brief by The Relo Network</title>
    <description>Neighbourhood intelligence and relocation guidance for people making London home.</description>
    <link>${baseUrl}/journal</link>
    <language>en-GB</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
