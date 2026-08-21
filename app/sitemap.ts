import type { MetadataRoute } from 'next';
import { articleUrl, editorialArticles } from '@/lib/editorial-articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.therelonetwork.com';
  const coreRoutes = [
    '',
    '/move',
    '/live',
    '/discover',
    '/network',
    '/journal',
    '/about',
    '/ask-relo',
    '/london-landing-list',
    '/executive-intake',
    '/newsletter',
    '/partner-application',
    '/contact',
  ].map((path, index) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: index === 0 ? ('daily' as const) : ('weekly' as const),
    priority: index === 0 ? 1 : path === '/london-landing-list' ? 0.9 : 0.8,
  }));

  const articleRoutes = editorialArticles.map((article) => ({
    url: `${base}${articleUrl(article.slug)}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...coreRoutes, ...articleRoutes];
}
