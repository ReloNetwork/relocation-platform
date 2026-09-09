import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import AskReloBand from '@/components/editorial/AskReloBand';

export const metadata = {
  title: 'Move to London',
  description:
    'A clear way to plan your London move, from choosing an area to settling in.',
};

const programme = [
  {
    number: '01',
    title: 'Tell us about your move',
    text: 'Share your timing, household, budget, work needs and the questions already on your mind.',
  },
  {
    number: '02',
    title: 'Choose what matters most',
    text: 'We help you focus on the homes, schools, journeys and daily routines that matter to you.',
  },
  {
    number: '03',
    title: 'Agree the right help',
    text: 'After reading your brief, we explain how we can help and agree the work and price before anything is paid.',
  },
  {
    number: '04',
    title: 'Put the move into action',
    text: 'If we are the right fit, we help organise the people and practical tasks needed for your move.',
  },
];

export default function MovePage() {
  return (
    <Layout>
      <main>
        <section className="move-hero">
          <span className="vertical-label">MOVE</span>
          <div className="move-hero__copy">
            <p className="eyebrow">PLAN YOUR LONDON MOVE</p>
            <h1>
              MOVE TO LONDON
              <br />
              WITH A CLEAR PLAN.
            </h1>
            <p>
              A London move involves choices about your home, school, work,
              timing and daily life. We help you decide what matters and what
              to do first.
            </p>
            <div className="move-hero__actions">
              <Link className="button button--gold" href="/executive-intake">
                TELL US ABOUT YOUR MOVE
              </Link>
              <Link className="button button--ink" href="/ask-relo">
                ASK RELO
              </Link>
            </div>
          </div>
          <div className="move-hero__image">
            <Image
              src="/images/editorial/london-street-hero.webp"
              alt="A residential London street"
              fill
              priority
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <span>YOUR LONDON / CONSIDERED</span>
          </div>
        </section>

        <section className="move-programme">
          <header>
            <span>01</span>
            <h2>HOW IT WORKS.</h2>
            <p>
              Start with a few details about your move. We will tell you whether
              a call, a focused review or more complete support would be useful.
            </p>
          </header>
          <div className="move-programme__grid">
            {programme.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="move-entry-points">
          <div>
            <span>02 / CHOOSE HOW TO START</span>
            <h2>START IN THE WAY THAT SUITS YOU.</h2>
          </div>
          <article>
            <span>READY TO PLAN</span>
            <h3>Tell us about your move</h3>
            <p>
              Best when your move is active and you want a person to review the
              full picture.
            </p>
            <Link href="/executive-intake">Start Your Move →</Link>
          </article>
          <article>
            <span>ONE QUESTION FIRST</span>
            <h3>Ask Relo</h3>
            <p>
              Compare areas, sort out your priorities or work out what to ask
              next.
            </p>
            <Link href="/ask-relo">Ask a question →</Link>
          </article>
          <article>
            <span>STILL EXPLORING</span>
            <h3>Read our London guides</h3>
            <p>
              Use the Journal and The London Brief to learn about the city at
              your own pace.
            </p>
            <Link href="/journal">Explore the Journal →</Link>
          </article>
        </section>

        <section className="move-commitment">
          <p className="eyebrow">TELL US WHAT YOU NEED FIRST</p>
          <h2>YOU DO NOT PAY BEFORE WE UNDERSTAND YOUR MOVE.</h2>
          <p>
            We read your details before suggesting paid help. If we are not the
            right fit, we will still try to point you in a useful direction.
          </p>
          <Link className="button button--gold" href="/executive-intake">
            TELL US ABOUT YOUR MOVE
          </Link>
        </section>

        <AskReloBand
          compact
          placeholder="Ask Relo what to plan first for your London move"
        />
      </main>
    </Layout>
  );
}
