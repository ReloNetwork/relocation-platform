import Link from 'next/link'
import Layout from '@/components/Layout'
import { editorialArticles } from '@/lib/editorial-articles'
import { absoluteUrl } from '@/lib/site-url'

export default function JournalArticle({ slug }: { slug: string }) {
  const article = editorialArticles.find((entry) => entry.slug === slug)
  if (!article) return null

  const published = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'Europe/London' }).format(new Date(article.publishedAt))
  const canonical = absoluteUrl(`/newsletter/${article.slug}`)
  const schema = {
    '@context': 'https://schema.org', '@type': 'Article', headline: article.title,
    description: article.excerpt, datePublished: article.publishedAt, dateModified: article.publishedAt,
    author: { '@type': 'Organization', name: 'The Relo Network editorial team' },
    publisher: { '@type': 'Organization', name: 'The Relo Network' }, mainEntityOfPage: canonical,
  }

  return <Layout><main className="bg-[#f4f0e7] text-[#14291f]"><article>
    <header className="border-b border-[#d8d0c2] px-5 pb-14 pt-24 sm:pt-32"><div className="mx-auto max-w-4xl">
      <Link className="text-xs font-semibold tracking-[0.18em] text-[#725449]" href="/newsletter">← THE LONDON BRIEF</Link>
      <p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-[#725449]">{article.category}</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] sm:text-7xl">{article.title}</h1>
      <p className="mt-7 max-w-2xl text-xl leading-8 text-[#4f5b53]">{article.standfirst}</p>
      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#667068]"><span>The Relo Network editorial team</span><span>Published {published}</span><span>Independent editorial</span></div>
    </div></header>
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
      {article.sections.map((section) => <section className="mb-12" key={section.heading}><h2 className="font-serif text-3xl">{section.heading}</h2>{section.body.map((paragraph) => <p className="mt-5 text-lg leading-8 text-[#465149]" key={paragraph}>{paragraph}</p>)}</section>)}
      <aside className="mt-16 border-y border-[#d8d0c2] py-8 text-sm leading-6 text-[#606b63]">This briefing is general information, reviewed on {published}. Verify availability, terms and regulated advice with the relevant provider. Commercial relationships do not determine our recommendations. Read our <Link className="underline" href="/editorial-policy">editorial standard</Link>.</aside>
    </div>
  </article></main><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></Layout>
}
