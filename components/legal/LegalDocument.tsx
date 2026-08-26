import Layout from '@/components/Layout'

type LegalSection = { title: string; paragraphs?: string[]; bullets?: string[] }

export default function LegalDocument({ eyebrow, title, summary, updated, sections }: {
  eyebrow: string; title: string; summary: string; updated: string; sections: LegalSection[]
}) {
  return (
    <Layout>
      <main className="legal-document">
        <header className="legal-document__header">
          <span className="brief-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{summary}</p>
          <small>Last updated {updated}</small>
        </header>
        <div className="legal-document__body">
          {sections.map((section, index) => (
            <section key={section.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </div>
            </section>
          ))}
        </div>
      </main>
    </Layout>
  )
}
