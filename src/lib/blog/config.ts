// Central configuration for the Blog & Education Insights module.

export const SITE_URL = 'https://justeducation.com';
export const BLOG_BASE = '/blog';
export const SITE_NAME = 'Just Education';
export const BLOG_NAME = 'Just Education Insights';
export const BLOG_TAGLINE =
    'Premium education insights — universities, exams, scholarships, study abroad and careers.';
export const ORG_LOGO = `${SITE_URL}/next.svg`;
export const DEFAULT_OG_IMAGE =
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=630&fit=crop';

export const PAGE_SIZE = 9;

/** Absolute URL helper for canonical / OG / schema fields. */
export function absoluteUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Route builders keep URL shape in one place. */
export const routes = {
    home: BLOG_BASE,
    article: (slug: string) => `${BLOG_BASE}/${slug}`,
    category: (slug: string) => `${BLOG_BASE}/category/${slug}`,
    // Tags live at the clean /blog/<slug> path; the /blog/[slug] route
    // dispatches article-first, then tag.
    tag: (slug: string) => `${BLOG_BASE}/${slug}`,
    location: (slug: string) => `${BLOG_BASE}/location/${slug}`,
    university: (slug: string) => `${BLOG_BASE}/university/${slug}`,
    college: (slug: string) => `${BLOG_BASE}/college/${slug}`,
    coaching: (slug: string) => `${BLOG_BASE}/coaching/${slug}`,
    school: (slug: string) => `${BLOG_BASE}/school/${slug}`,
    institute: (slug: string) => `${BLOG_BASE}/institute/${slug}`,
    author: (slug: string) => `${BLOG_BASE}/author/${slug}`,
};

/** Map an institution type to its public route segment. */
export function institutionRoute(type: string, slug: string): string {
    switch (type) {
        case 'university':
            return routes.university(slug);
        case 'college':
            return routes.college(slug);
        case 'coaching':
            return routes.coaching(slug);
        case 'school':
            return routes.school(slug);
        default:
            // institutes, libraries and consultants share the /institute archive
            return routes.institute(slug);
    }
}
