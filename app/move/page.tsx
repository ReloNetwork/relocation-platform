import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import AskReloBand from '@/components/editorial/AskReloBand'

export const metadata = {
  title: 'Move to London | The Relo Network',
  description:
    'A guided London relocation journey, shaped around your home, family, work and arrival.',
}

const programme = [
  {
    number: '01',
    title: 'Frame the move',
    text: 'Share your timing, household, budget, work pattern and the decisions already on your mind.',
  },
  {
    number: '02',
    title: 'Set the priorities',
    text: 'We turn a long list of possibilities into a clear brief for homes, schools, commutes and daily life.',
  },
  {
    number: '03',
    title: 'Build the plan',
    text: 'After review, we recommend the right level of support and agree scope and cost before paid work begins.',
  },
  {
    number: '04',
    title: 'Make London work',
    text: 'Where we are the right fit, we coordinate the people and practical details that bring the move together.',
  },
]

export default function MovePage() {
  return (
    <Layout>
      <main>
        <section className="move-hero">
          <span className="vertical-label">MOVE</span>
          <div className="move-hero__copy">
            <p className="eyebrow">THE RELOCATION JOURNEY</p>
            <h1>
              MOVE WELL.
              <br />
              LAND READY.
            </h1>
            <p>
              London relocation is not one decision. It is a chain of choices
              about home, school, work, timing and the life you want to build.
              We help you put them in the right order.
            </p>
            <div className="move-hero__actions">
              <Link className="button button--gold" href="/executive-intake">
                START YOUR MOVE
              </Link>
              <Link className="button button--ink" href="/ask-relo">
                ASK A FIRST QUESTION
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
            <h2>A MOVE WITH A CLEAR SEQUENCE.</h2>
            <p>
              Start with the private brief. It gives us enough context to tell
              you whether a focused review, a call or fuller relocation support
              is the sensible next step.
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
            <span>02 / CHOOSE YOUR ENTRY POINT</span>
            <h2>START WHERE YOU ARE.</h2>
          </div>
          <article>
            <span>READY TO PLAN</span>
            <h3>Send the relocation brief</h3>
            <p>
              Best when your move is active and you want a human review of the
              whole picture.
            </p>
            <Link href="/executive-intake">Start Your Move →</Link>
          </article>
          <article>
            <span>ONE QUESTION FIRST</span>
            <h3>Ask Relo</h3>
            <p>
              Compare areas, untangle priorities or find the next question to
              ask before you commit.
            </p>
            <Link href="/ask-relo">Ask a question →</Link>
          </article>
          <article>
            <span>STILL EXPLORING</span>
            <h3>Read The London Brief</h3>
            <p>
              Use the Journal and neighbourhood briefings to build your London
              picture at your own pace.
            </p>
            <Link href="/journal">Explore the Journal →</Link>
          </article>
        </section>

        <section className="move-commitment">
          <p className="eyebrow">A PRIVATE, QUALIFICATION-FIRST START</p>
          <h2>NO CHECKOUT. NO GENERIC PACKAGE. YOUR BRIEF COMES FIRST.</h2>
          <p>
            We review your situation before suggesting paid support. If we are
            not the right fit, we will still point you towards a sensible next
            step where we can.
          </p>
          <Link className="button button--gold" href="/executive-intake">
            BEGIN THE BRIEF
          </Link>
        </section>

        <AskReloBand
          compact
          placeholder="Ask Relo what to plan first for your London move"
        />
      </main>
    </Layout>
  )
}
