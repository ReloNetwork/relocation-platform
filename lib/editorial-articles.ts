import type { ArticleSubjectId } from '@/lib/editorial-subjects';

export type EditorialArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  subject: ArticleSubjectId;
  publishedAt: string;
  standfirst: string;
  sections: Array<{ heading: string; body: string[] }>;
  sponsor?: {
    name: string;
    label: 'Sponsored' | 'Paid partnership' | 'Advertisement feature';
    href?: string;
  };
};

export const editorialArticles: EditorialArticle[] = [
  {
    slug: 'mayfair-guide',
    title: 'Mayfair: a resident’s guide',
    excerpt:
      'Homes, private clubs, culture and the quieter rhythms behind London’s most recognised address.',
    category: 'Neighbourhoods',
    subject: 'homes-areas',
    publishedAt: '2026-08-26T09:00:00.000Z',
    standfirst:
      'Mayfair can feel very different from one street to the next. These are the questions to ask before you book viewings.',
    sections: [
      {
        heading: 'Begin with the week, not the postcode',
        body: [
          'Mayfair can put work, restaurants, galleries and parks close together, but the exact address matters. Map the journeys you make every week, including the office, school, airport and regular appointments, before choosing where to look.',
          'A polished listing cannot show evening noise, servicing activity or how a route feels in poor weather. Return to a preferred street at different times and walk the journeys that will shape daily life.',
        ],
      },
      {
        heading: 'Treat the building as part of the decision',
        body: [
          'Two homes on the same street can offer very different experiences. Ask about management, lift reliability, porter coverage, deliveries, planned works, cooling and what is included in the service charge or rent.',
          'For a rental, get the inventory, deposit arrangements, break terms and responsibility for repairs in writing. Consider independent legal advice before making a large commitment.',
        ],
      },
      {
        heading: 'Build a comparable shortlist',
        body: [
          'Use the same scorecard for every property: commute, natural light, storage, noise, building service, outdoor space, flexibility and total monthly cost. This prevents an impressive first viewing from outweighing the practical details.',
          'The right result is not the best-known address. It is the home whose location, building and terms remain workable after the first month.',
        ],
      },
    ],
  },
  {
    slug: 'marylebone-guide',
    title: 'Marylebone: village life, central London',
    excerpt:
      'A practical guide for families and professionals considering the area.',
    category: 'Neighbourhoods',
    subject: 'homes-areas',
    publishedAt: '2026-08-26T09:00:00.000Z',
    standfirst:
      'Marylebone feels local while keeping you close to central London. The question is whether it works for your daily routine.',
    sections: [
      {
        heading: 'Test the daily geography',
        body: [
          'Marylebone has several distinct pockets. Life near the high street, a major station or the edge of the park will feel different, even when the postcode looks similar.',
          'Plot work and school journeys at the times you will actually make them. Include the walk to transport, not only the time shown on a route planner.',
        ],
      },
      {
        heading: 'Look beyond the first impression',
        body: [
          'Period conversions, mansion blocks and newer developments differ in layout, sound insulation, lifts, storage and building management. Ask for the practical details early so that unsuitable homes do not consume the viewing schedule.',
          'Visit the immediate street in the morning and evening. Deliveries, traffic and hospitality can change how a seemingly quiet address feels.',
        ],
      },
      {
        heading: 'Choose for the whole household',
        body: [
          'A successful relocation balances the office commute with groceries, healthcare, exercise, social life and school logistics. Give each household member a small number of non-negotiables and score the shortlist together.',
          'If two homes are close, choose the one that makes everyday life easier. A short journey you make every day often matters more than a feature you rarely use.',
        ],
      },
    ],
  },
  {
    slug: 'canary-wharf-guide',
    title: 'Canary Wharf beyond the working week',
    excerpt:
      'What the district offers when the office closes, from new homes to schools and waterside life.',
    category: 'Neighbourhoods',
    subject: 'homes-areas',
    publishedAt: '2026-08-26T09:00:00.000Z',
    standfirst:
      'Canary Wharf is about more than the journey to work. Consider the home, transport and your weekend routine together.',
    sections: [
      {
        heading: 'Separate access from commute time',
        body: [
          'A short journey on paper can still involve a long walk, a busy interchange or limited late-night alternatives. Test the complete door-to-door route and identify a second option for disruption days.',
          'If work involves frequent travel, compare airport access at the hours you are most likely to fly rather than relying on a single headline time.',
        ],
      },
      {
        heading: 'Compare developments carefully',
        body: [
          'Newer buildings may offer a concierge, shared spaces and air conditioning, but service and charges vary. Ask what is available now, what needs to be booked and what may change during the tenancy.',
          'Check aspect, construction nearby, mobile reception, broadband options, parcel handling and guest arrangements. These details often matter more than a long amenities list.',
        ],
      },
      {
        heading: 'Run a weekend test',
        body: [
          'Spend part of a Saturday or Sunday following the routine you expect to keep: coffee, exercise, groceries, childcare and meeting friends. This reveals whether the area supports life beyond the working week.',
          'Compare that experience with one alternative neighbourhood before deciding. A move should solve for the household, not only for proximity to one office.',
        ],
      },
    ],
  },
  {
    slug: 'american-school-london-guide',
    title: 'Planning an American curriculum move',
    excerpt:
      'Questions for families managing admissions, timing and continuity when relocating to London.',
    category: 'Education',
    subject: 'schools-family',
    publishedAt: '2026-08-26T09:00:00.000Z',
    standfirst:
      'School planning should begin with the child’s learning path and the family’s timing, not with a list of supposedly prestigious names.',
    sections: [
      {
        heading: 'Document the current learning path',
        body: [
          'Collect recent reports, curriculum details, subjects, support plans and intended graduation route. Admissions teams need a clear picture of where a child is now and what continuity means for them.',
          'For older students, pay close attention to subject choices and exam plans. Ask each school how your child’s previous work will fit its curriculum.',
        ],
      },
      {
        heading: 'Ask schools directly',
        body: [
          'Availability, admissions requirements and deadlines change. Treat school websites and admissions offices as the authoritative source, and record the date of every answer.',
          'Ask which year your child would join, what assessments and references are needed, what learning support is available, how transport works and what happens if your move date changes. Do not choose a home until you know the school place is confirmed.',
        ],
      },
      {
        heading: 'Plan the household logistics',
        body: [
          'Test the school journey at the time you would actually make it. Think about who will handle it during work trips or busy weeks. An easy routine may matter more than a slightly shorter distance.',
          'Keep a parallel housing shortlist until the school position is clear. Where education, immigration or legal questions arise, use an appropriately qualified adviser.',
        ],
      },
    ],
  },
  {
    slug: 'london-property-trends-2025',
    title: 'Reading London’s property market',
    excerpt:
      'A relocation-focused view of timing, supply and decision-making in the capital.',
    category: 'Property',
    subject: 'homes-areas',
    publishedAt: '2026-08-26T09:00:00.000Z',
    standfirst:
      'A London home search often happens under time pressure. A clear list of needs is more useful than trying to predict the market from headlines.',
    sections: [
      {
        heading: 'Define the decision before reading the market',
        body: [
          'Separate requirements from preferences: move date, commute, bedrooms, school geography, accessibility, pet needs, furnishing and contract flexibility. Set a total monthly cost range rather than focusing only on the advertised rent.',
          'Decide in advance which points can move and which cannot. This makes new listings easier to evaluate and reduces reactive decisions.',
        ],
      },
      {
        heading: 'Use current evidence',
        body: [
          'Availability and asking terms can change quickly and vary street by street. Compare live listings, recent viewing feedback and the terms landlords will actually accept, with the date of each observation recorded.',
          'A portal asking price is not the same as an agreed transaction. Avoid presenting a small or selective sample as a market-wide trend.',
        ],
      },
      {
        heading: 'Be ready when the right home appears',
        body: [
          'Prepare identification, references and proof of funds before the search becomes urgent. Confirm what due diligence is required and who can approve an offer while travelling.',
          'Before signing, verify the parties, property, deposit arrangements, inventory and contract terms. Market commentary is general information, not financial, legal or property advice.',
        ],
      },
    ],
  },
];

export const articleUrl = (slug: string) => `/newsletter/${slug}`;
