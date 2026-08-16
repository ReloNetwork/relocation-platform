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
            <p className="eyebrow">LONDON, INTELLIGENTLY ANSWERED</p>
            <h1>ASK THE CITY.</h1>
            <i />
            <p>
              From comparing neighbourhoods to planning the practical sequence
              of a move, Ask Relo turns your context into a clearer next
              decision.
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
                'Neighbourhoods, commute and lifestyle trade-offs.',
              ],
              ['02', 'PLAN', 'Schools, housing and your move sequence.'],
              [
                '03',
                'CONNECT',
                'Understand when a vetted human specialist is useful.',
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
          Ask Relo provides decision support and general information. Property,
          legal, tax, immigration, school and financial decisions should be
          verified with the appropriate qualified professional.
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
