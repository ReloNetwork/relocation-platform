import Link from 'next/link';
import Layout from '@/components/Layout';
import BriefSignup from '@/components/editorial/BriefSignup';
import EditorialPartnershipBand from '@/components/editorial/EditorialPartnershipBand';
import EditorialSubjectNav from '@/components/editorial/EditorialSubjectNav';
import { articleUrl, editorialArticles } from '@/lib/editorial-articles';
import { isEditorialSubjectId } from '@/lib/editorial-subjects';

export default function NewsletterPage({
  searchParams,
}: {
  searchParams?: { subject?: string | string[] };
}) {
  const requestedSubject = Array.isArray(searchParams?.subject)
    ? searchParams?.subject[0]
    : searchParams?.subject;
  const activeSubject = isEditorialSubjectId(requestedSubject)
    ? requestedSubject
    : 'all';
  const visibleArticles = editorialArticles.filter(
    (article) => activeSubject === 'all' || article.subject === activeSubject
  );

  return (
    <Layout>
      <main>
        <section className="brief-hero">
          <span className="vertical-label">JOURNAL</span>
          <div>
            <span className="brief-eyebrow">THE LONDON BRIEF</span>
            <h1>LONDON, MADE CLEARER.</h1>
            <p>
              Neighbourhood guides, moving advice and useful London ideas for
              people making the city home.
            </p>
          </div>
          <BriefSignup
            enabled={Boolean(
              process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID
            )}
          />
        </section>

        <EditorialSubjectNav
          activeSubject={activeSubject}
          basePath="/newsletter"
        />

        <section className="brief-archive">
          <div className="brief-archive__heading">
            <span>01</span>
            <h2>LATEST LONDON GUIDES</h2>
          </div>
          <div className="brief-archive__grid">
            {visibleArticles.length === 0 ? (
              <article className="brief-archive__empty">
                <span>COMING SOON</span>
                <h3>We are working on the first guide.</h3>
                <p>
                  Join The London Brief to hear when it is ready.
                </p>
              </article>
            ) : null}
            {visibleArticles.map((article) => (
              <article key={article.slug}>
                <span>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <Link href={articleUrl(article.slug)}>
                  Read the guide <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <EditorialPartnershipBand
          partnership={{
            eyebrow: 'SPONSOR THE LONDON BRIEF',
            title: 'ONE CLEAR PARTNER MESSAGE PER EDITION.',
            text: 'One relevant business may sponsor an edition of The London Brief. The partner message is clearly labelled and kept separate from our articles and recommendations.',
            formats: [
              'One partner message',
              'One tracked link',
              'Results after the email is sent',
            ],
          }}
        />
      </main>
    </Layout>
  );
}
