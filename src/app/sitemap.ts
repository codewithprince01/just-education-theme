import type { MetadataRoute } from 'next';
import { categories, tags, authors, locations, institutions } from '@/data/blog';
import { getAllArticles } from '@/lib/blog/queries';
import { SITE_URL, routes, institutionRoute } from '@/lib/blog/config';

// Single sitemap covering the marketing routes + the entire blog graph.
export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date('2026-06-20T00:00:00.000Z');

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
        { url: `${SITE_URL}/exams`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE_URL}${routes.home}`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
        { url: `${SITE_URL}/blog/all`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    ];

    const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map((a) => ({
        url: `${SITE_URL}${routes.article(a.slug)}`,
        lastModified: new Date(a.updatedAt ?? a.publishedAt),
        changeFrequency: 'monthly',
        priority: a.featured ? 0.8 : 0.6,
        images: [a.coverImage],
    }));

    const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
        url: `${SITE_URL}${routes.category(c.slug)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    const tagRoutes: MetadataRoute.Sitemap = tags.map((t) => ({
        url: `${SITE_URL}${routes.tag(t.slug)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.4,
    }));

    const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
        url: `${SITE_URL}${routes.author(a.slug)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.4,
    }));

    const locationRoutes: MetadataRoute.Sitemap = locations.map((l) => ({
        url: `${SITE_URL}${routes.location(l.slug)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
    }));

    const institutionRoutes: MetadataRoute.Sitemap = institutions.map((i) => ({
        url: `${SITE_URL}${institutionRoute(i.type, i.slug)}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.5,
    }));

    return [
        ...staticRoutes,
        ...articleRoutes,
        ...categoryRoutes,
        ...tagRoutes,
        ...authorRoutes,
        ...locationRoutes,
        ...institutionRoutes,
    ];
}
