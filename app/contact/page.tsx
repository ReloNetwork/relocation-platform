import Link from 'next/link'
import Layout from '@/components/Layout'

export const metadata = {
  title: 'Contact The Relo Network',
  description: 'Choose the right way to contact The Relo Network about a London move, editorial partnership or general question.',
}

const routes = [
  {
    number: '01',
    title: 'I am moving to London',
    text: 'Tell us when you are moving, who is coming and what support you need. We review every brief before suggesting a call or paid service.',
    action: 'Start your private brief',
    href: '/executive-intake',
  },
  {
    number: '02',
    title: 'I want to partner with you',
    text: 'Share your business, audience and campaign goal. If there is a good fit, we will recommend a clear placement and price.',
    action: 'Send a partner enquiry',
    href: '/partner-application',
  },
  {
    number: '03',
    title: 'I have another question',
    text: 'For press, existing clients and general questions, email us directly. Please do not include passport numbers, payment details or sensitive records.',
    action: 'Email hello@therelonetwork.com',
    href: 'mailto:hello@therelonetwork.com',
  },
]

export default function ContactPage() {
  return (
    <Layout>
      <main className="bg-[#f4f0e7] text-[#14291f]">
        <section className="border-b border-[#d8d0c2] px-5 pb-16 pt-28 sm:pt-36">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-semibold tracking-[0.22em] text-[#725449]">CONTACT</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] sm:text-7xl">LET&apos;S TALK ABOUT YOUR LONDON PLANS.</h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[#4f5b53]">Choose the route that fits. You will reach the right form without repeating your story.</p>
          </div>
        </section>
        <section className="mx-auto grid max-w-5xl gap-px bg-[#d8d0c2] px-5 py-16 sm:grid-cols-3 sm:px-0">
          {routes.map((route) => (
            <article className="flex min-h-80 flex-col bg-[#f4f0e7] p-7" key={route.number}>
              <span className="text-xs font-semibold tracking-[0.18em] text-[#725449]">{route.number}</span>
              <h2 className="mt-8 font-serif text-3xl">{route.title}</h2>
              <p className="mt-5 flex-1 leading-7 text-[#536057]">{route.text}</p>
              <Link className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] underline underline-offset-4" href={route.href}>{route.action}</Link>
            </article>
          ))}
        </section>
        <section className="border-t border-[#d8d0c2] px-5 py-12 text-center text-sm leading-6 text-[#606b63]">
          The Relo Network is not an emergency service. If someone is in immediate danger, contact the appropriate emergency service.
        </section>
      </main>
    </Layout>
  )
}
