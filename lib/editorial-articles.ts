export type EditorialArticle = {
  slug: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
}

export const editorialArticles: EditorialArticle[] = [
  {
    slug: 'mayfair-guide',
    title: 'Mayfair: a resident’s guide',
    excerpt: 'Homes, private clubs, culture and the quieter rhythms behind London’s most recognised address.',
    category: 'Neighbourhoods',
    publishedAt: '2025-01-06T09:00:00.000Z',
  },
  {
    slug: 'marylebone-guide',
    title: 'Marylebone: village life, central London',
    excerpt: 'A practical neighbourhood briefing for families and professionals considering the area.',
    category: 'Neighbourhoods',
    publishedAt: '2025-01-05T09:00:00.000Z',
  },
  {
    slug: 'canary-wharf-guide',
    title: 'Canary Wharf beyond the working week',
    excerpt: 'What the district offers when the office closes, from new homes to schools and waterside life.',
    category: 'Neighbourhoods',
    publishedAt: '2025-01-04T09:00:00.000Z',
  },
  {
    slug: 'american-school-london-guide',
    title: 'Planning an American curriculum move',
    excerpt: 'Questions for families managing admissions, timing and continuity when relocating to London.',
    category: 'Education',
    publishedAt: '2025-01-03T09:00:00.000Z',
  },
  {
    slug: 'london-property-trends-2025',
    title: 'Reading London’s property market',
    excerpt: 'A relocation-focused view of timing, supply and decision-making in the capital.',
    category: 'Property',
    publishedAt: '2025-01-02T09:00:00.000Z',
  },
]

export const articleUrl = (slug: string) => `/newsletter/${slug}`
