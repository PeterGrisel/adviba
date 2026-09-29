import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site';

// AI-crawlers bewust toegestaan: we willen genoemd worden in ChatGPT,
// Perplexity, Claude en Google AI-antwoorden (GEO).
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/api/' },
      { userAgent: aiBots, allow: '/', disallow: '/api/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
