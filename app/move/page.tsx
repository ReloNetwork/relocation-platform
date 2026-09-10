import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';

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
    title: 'Shape the right plan',
    text: 'We turn your brief into a clear recommendation, with the right support, sequence and specialists for your move.',
  },
  {
    number: '04',
    title: 'Move forward with confidence',
    text: 'We help coordinate the people and practical details that turn your plan into a well-managed move.',
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
              Start with a few details about your move. We identify what matters
              most and shape the clearest route from first decision to settled life.
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
          <p className="eyebrow">BUILT AROUND YOUR PRIORITIES</p>
          <h2>LET US UNDERSTAND YOUR MOVE.</h2>
          <p>
            The better we understand your priorities, pressures and ambitions,
            the more precisely we can solve what stands between you and a
            confident life in London.
          </p>
          <Link className="button button--gold" href="/executive-intake">
            TELL US ABOUT YOUR MOVE
          </Link>
        </section>
      </main>
    </Layout>
  );
}
