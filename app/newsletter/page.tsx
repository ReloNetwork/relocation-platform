import Link from 'next/link'
import Layout from '@/components/Layout'
import BriefSignup from '@/components/editorial/BriefSignup'
import { articleUrl, editorialArticles } from '@/lib/editorial-articles'

export default function NewsletterPage() {
  return (
    <Layout>
      <main>
        <section className="brief-hero">
          <span className="vertical-label">JOURNAL</span>
          <div>
            <span className="brief-eyebrow">THE LONDON BRIEF</span>
            <h1>A CITY WORTH READING.</h1>
            <p>
              Clear neighbourhood notes, practical moving advice and useful London ideas for people making the city home.
            </p>
          </div>
          <BriefSignup
            enabled={Boolean(
              process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID
            )}
          />
        </section>

        <section className="brief-archive">
          <div className="brief-archive__heading">
            <span>01</span>
            <h2>READ THE LATEST</h2>
          </div>
          <div className="brief-archive__grid">
            {editorialArticles.map((article) => (
              <article key={article.slug}>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link href={articleUrl(article.slug)}>Read the briefing <span aria-hidden="true">↗</span></Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  )
}
