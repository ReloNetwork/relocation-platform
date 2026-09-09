import Link from 'next/link';
import Layout from '@/components/Layout';
import ArticleSubscriptionPrompt from '@/components/editorial/ArticleSubscriptionPrompt';
import { editorialArticles } from '@/lib/editorial-articles';
import { absoluteUrl } from '@/lib/site-url';

export default function JournalArticle({ slug }: { slug: string }) {
  const article = editorialArticles.find((entry) => entry.slug === slug);
  if (!article) return null;

  const published = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'long',
    timeZone: 'Europe/London',
  }).format(new Date(article.publishedAt));
  const canonical = absoluteUrl(`/newsletter/${article.slug}`);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'The Relo Network editorial team',
    },
    publisher: { '@type': 'Organization', name: 'The Relo Network' },
    mainEntityOfPage: canonical,
  };

  return (
    <Layout>
      <main className="bg-[#f7f4ed] text-[#142e50]">
        <article>
          <header className="border-b border-[#ddd8cc] px-5 pb-14 pt-24 sm:pt-32">
            <div className="mx-auto max-w-4xl">
              <Link
                className="text-xs font-semibold tracking-[0.18em] text-[#be8431]"
                href="/journal"
              >
                ← JOURNAL
              </Link>
              {article.sponsor ? (
                <p className="journal-article__sponsor">
                  {article.sponsor.label} with{' '}
                  {article.sponsor.href ? (
                    <a href={article.sponsor.href} rel="sponsored">
                      {article.sponsor.name}
                    </a>
                  ) : (
                    article.sponsor.name
                  )}
                </p>
              ) : null}
              <p className="mt-12 text-xs font-semibold uppercase tracking-[0.22em] text-[#be8431]">
                {article.category}
              </p>
              <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] sm:text-7xl">
                {article.title}
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-[#52585d]">
                {article.standfirst}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#666]">
                <span>The Relo Network editorial team</span>
                <span>Published {published}</span>
                <span>
                  {article.sponsor
                    ? 'Paid partnership labelled above'
                    : 'Written independently'}
                </span>
              </div>
            </div>
          </header>
          <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
            {article.sections.map((section) => (
              <section className="mb-12" key={section.heading}>
                <h2 className="font-serif text-3xl">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p
                    className="mt-5 text-lg leading-8 text-[#52585d]"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
            <aside className="mt-16 border-y border-[#ddd8cc] py-8 text-sm leading-6 text-[#666]">
              This guide gives general information and was reviewed on {published}.
              Check current availability, terms and regulated advice with the
              relevant provider. Paid partnerships do not decide our
              recommendations. Read{' '}
              <Link className="underline" href="/editorial-policy">
                how we publish
              </Link>
              .
            </aside>
          </div>
          <section className="journal-article__next" aria-label="Next steps">
            <div>
              <span>PLANNING A LONDON MOVE?</span>
              <h2>Turn your questions into a clear brief.</h2>
              <p>
                Tell us about your timing, household and priorities. A person
                will review the whole picture before any paid support is
                proposed.
              </p>
              <Link href="/executive-intake">
                Start your move <span aria-hidden="true">→</span>
              </Link>
            </div>
            <aside>
              <span>FOR PARTNERS</span>
              <h3>Sponsor a useful relocation guide.</h3>
              <p>
                Selected businesses can sponsor a guide or series. Every paid
                article is labelled, and The Relo Network chooses the final wording.
              </p>
              <Link href="/partner-application">
                Explore a partnership <span aria-hidden="true">↗</span>
              </Link>
            </aside>
          </section>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ArticleSubscriptionPrompt
        slug={article.slug}
        enabled={Boolean(
          process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID
        )}
      />
    </Layout>
  );
}
