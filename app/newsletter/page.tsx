import Link from 'next/link';
import Layout from '@/components/Layout';
import BriefSignup from '@/components/editorial/BriefSignup';
import EditorialPartnershipBand from '@/components/editorial/EditorialPartnershipBand';
import { articleUrl, editorialArticles } from '@/lib/editorial-articles';

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
              Clear neighbourhood notes, practical moving advice and useful
              London ideas for people making the city home.
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
                <Link href={articleUrl(article.slug)}>
                  Read the briefing <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <EditorialPartnershipBand
          partnership={{
            eyebrow: 'ONE PARTNER PER EDITION',
            title: 'THE LONDON BRIEF, SUPPORTED WITH CARE.',
            text: 'A relevant partner may support an edition of The London Brief. The editorial subject, conclusions and recommendations remain ours.',
            formats: [
              'Lead issue partner',
              'Useful expert contribution',
              'Tracked campaign report',
            ],
          }}
        />
      </main>
    </Layout>
  );
}
