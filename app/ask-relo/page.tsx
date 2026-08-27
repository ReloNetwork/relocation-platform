'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Layout from '@/components/Layout';
import UnifiedAssistant from '@/components/UnifiedAssistant';
function AskReloContent() {
  const question = useSearchParams().get('q') || '';
  return (
    <Layout>
      <main>
        <section className="editorial-hero">
          <span className="vertical-label">ASK RELO</span>
          <div>
            <p className="eyebrow">ASK RELO BETA</p>
            <h1>ASK THE CITY.</h1>
            <i />
            <p>
              Ask about neighbourhoods, schools, housing or the order of your
              move. You can ask three questions for free.
            </p>
          </div>
          <div style={{ minHeight: 560 }}>
            <UnifiedAssistant variant="embedded" initialQuestion={question} />
          </div>
        </section>
        <section className="programme">
          <h2>USE IT TO</h2>
          <div>
            {[
              [
                '01',
                'COMPARE',
                'Compare neighbourhoods, commutes and everyday life.',
              ],
              ['02', 'PLAN', 'Put schools, housing and practical tasks in the right order.'],
              [
                '03',
                'CONNECT',
                'Know when your question needs a qualified professional or human adviser.',
              ],
            ].map(([n, t, p]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </article>
            ))}
          </div>
        </section>
        <p
          style={{
            maxWidth: 850,
            margin: '50px auto',
            padding: '0 25px',
            lineHeight: 1.7,
            color: '#666',
          }}
        >
          Ask Relo gives general information and can make mistakes. Check legal,
          tax, immigration, school, financial and property decisions with the
          relevant official source or qualified professional.
        </p>
      </main>
    </Layout>
  );
}

export default function AskReloPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: 700 }} />}>
      <AskReloContent />
    </Suspense>
  );
}
