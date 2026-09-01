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
      'Mayfair rewards careful street-by-street selection. This briefing sets out the questions that matter before a viewing list is assembled.',
    sections: [
      {
        heading: 'Begin with the week, not the postcode',
        body: [
          'Mayfair can place work, dining, galleries and parks within a compact area, but convenience depends on the exact address. Map the journeys that happen every week, including the office, school, airport and regular appointments, before choosing a search radius.',
          'A polished listing cannot show evening noise, servicing activity or how a route feels in poor weather. Return to a preferred street at different times and walk the journeys that will shape daily life.',
        ],
      },
      {
        heading: 'Treat the building as part of the decision',
        body: [
          'Two homes on the same street can offer very different experiences. Ask about management, lift reliability, porter coverage, deliveries, planned works, cooling and what is included in the service charge or rent.',
          'For a rental, confirm the inventory, deposit arrangements, break terms and responsibility for maintenance in writing. Independent legal advice may be appropriate before making a substantial commitment.',
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
      'A practical neighbourhood briefing for families and professionals considering the area.',
    category: 'Neighbourhoods',
    subject: 'homes-areas',
    publishedAt: '2026-08-26T09:00:00.000Z',
    standfirst:
      'Marylebone combines a central address with a neighbourhood rhythm. The useful question is whether its particular trade-offs match your routine.',
    sections: [
      {
        heading: 'Test the daily geography',
        body: [
          'Marylebone covers several distinct pockets. A home near the high street, a major station or the park edge will produce a different daily pattern, even when the postcode looks similar.',
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
          'If two options remain close, prefer the one that reduces recurring friction. The small journey repeated every day matters more than an occasional amenity.',
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
      'Canary Wharf is more than a commute calculation. Evaluate the home, waterside connections and weekend routine as one system.',
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
          'Newer buildings may offer concierge services, shared spaces and cooling, but management quality and charges vary. Ask what is operational today, what requires booking and what may change during the tenancy.',
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
          'For older students, subject sequencing and qualification plans deserve particular attention. Ask each school to explain how prior work would map into its programme.',
        ],
      },
      {
        heading: 'Ask schools directly',
        body: [
          'Availability, admissions requirements and deadlines change. Treat school websites and admissions offices as the authoritative source, and record the date of every answer.',
          'Ask about year placement, assessment, references, learning support, transport and what happens if the family’s move date changes. Do not commit to a home based on assumed admission.',
        ],
      },
      {
        heading: 'Plan the household logistics',
        body: [
          'Model the school journey at realistic times and consider who will handle it during travel or busy work periods. A manageable routine can be more valuable than a marginal difference in distance.',
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
      'A relocation search is a decision under time pressure. A disciplined brief is more useful than trying to predict the market from headlines.',
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
        heading: 'Protect the execution window',
        body: [
          'Prepare identification, references and proof of funds before the search becomes urgent. Confirm what due diligence is required and who can approve an offer while travelling.',
          'Before signing, verify the parties, property, deposit arrangements, inventory and contract terms. Market commentary is general information, not financial, legal or property advice.',
        ],
      },
    ],
  },
];

export const articleUrl = (slug: string) => `/newsletter/${slug}`;
