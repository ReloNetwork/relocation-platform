import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.therelonetwork.com';
  return [
    '',
    '/move',
    '/live',
    '/discover',
    '/network',
    '/journal',
    '/about',
    '/ask-relo',
    '/london-landing-list',
  ].map((path, index) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? ('daily' as const) : ('weekly' as const),
    priority: index === 0 ? 1 : path === '/london-landing-list' ? 0.9 : 0.8,
  }));
}
