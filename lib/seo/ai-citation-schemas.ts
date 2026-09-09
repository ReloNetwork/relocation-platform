/**
 * Compatibility boundary for a retired guide. New public editorial pages use
 * explicit Article schema and do not publish inferred claims or testimonials.
 */
export function getAICitationSchemas() {
  return []
}

export function getCommunityEngagementSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Relo Network',
  }
}
