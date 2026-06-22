import type { Metadata } from 'next';
import type { Author, Faq, ResolvedArticle } from '@/data/blog/types';
import {
    absoluteUrl,
    BLOG_NAME,
    DEFAULT_OG_IMAGE,
    ORG_LOGO,
    routes,
    SITE_NAME,
    SITE_URL,
} from './config';

export interface Crumb {
    name: string;
    url?: string;
}

// ----------------------------------------------------------------------------
// JSON-LD structured data builders
// ----------------------------------------------------------------------------
export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: ORG_LOGO,
        sameAs: [
            'https://www.facebook.com/justeducation',
            'https://twitter.com/justeducation',
            'https://www.instagram.com/justeducation',
        ],
    };
}

export function blogSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: BLOG_NAME,
        url: absoluteUrl(routes.home),
        publisher: { '@type': 'Organization', name: SITE_NAME, logo: ORG_LOGO },
    };
}

export function breadcrumbSchema(items: Crumb[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url ? absoluteUrl(item.url) : undefined,
        })),
    };
}

export function authorSchema(author: Author) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        image: author.avatar,
        url: absoluteUrl(routes.author(author.slug)),
        knowsAbout: author.expertise,
    };
}

export function faqSchema(faqs: Faq[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
    };
}

export function articleSchema(article: ResolvedArticle) {
    const url = absoluteUrl(routes.article(article.slug));
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.excerpt,
        image: [article.coverImage],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt ?? article.publishedAt,
        author: {
            '@type': 'Person',
            name: article.author.name,
            url: absoluteUrl(routes.author(article.author.slug)),
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: { '@type': 'ImageObject', url: ORG_LOGO },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        articleSection: article.category.name,
        keywords: article.resolvedTags.map((t) => t.name).join(', '),
        wordCount: article.content.reduce(
            (n, b) => n + ('text' in b ? b.text.split(/\s+/).length : 0),
            0,
        ),
        timeRequired: `PT${article.readingMinutes}M`,
        aggregateRating: article.ratingCount
            ? {
                  '@type': 'AggregateRating',
                  ratingValue: article.rating,
                  ratingCount: article.ratingCount,
                  bestRating: 5,
              }
            : undefined,
    };
}

// ----------------------------------------------------------------------------
// Metadata builders (App Router generateMetadata)
// ----------------------------------------------------------------------------
export function buildArticleMetadata(article: ResolvedArticle): Metadata {
    const url = routes.article(article.slug);
    const title = article.seo?.metaTitle ?? `${article.title} | ${BLOG_NAME}`;
    const description = article.seo?.metaDescription ?? article.excerpt;
    const image = article.seo?.ogImage ?? article.coverImage;
    return {
        title,
        description,
        keywords: article.resolvedTags.map((t) => t.name),
        authors: [{ name: article.author.name, url: absoluteUrl(routes.author(article.author.slug)) }],
        alternates: { canonical: article.seo?.canonical ?? absoluteUrl(url) },
        robots: article.seo?.noindex ? { index: false, follow: true } : undefined,
        openGraph: {
            type: 'article',
            title,
            description,
            url: absoluteUrl(url),
            siteName: SITE_NAME,
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt ?? article.publishedAt,
            authors: [article.author.name],
            section: article.category.name,
            tags: article.resolvedTags.map((t) => t.name),
            images: [{ url: image, width: 1200, height: 675, alt: article.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

export interface ArchiveMetaInput {
    title: string;
    description: string;
    path: string;
    image?: string;
}

export function buildArchiveMetadata({ title, description, path, image }: ArchiveMetaInput): Metadata {
    const fullTitle = `${title} | ${BLOG_NAME}`;
    const og = image ?? DEFAULT_OG_IMAGE;
    return {
        title: fullTitle,
        description,
        alternates: { canonical: absoluteUrl(path) },
        openGraph: {
            type: 'website',
            title: fullTitle,
            description,
            url: absoluteUrl(path),
            siteName: SITE_NAME,
            images: [{ url: og, width: 1200, height: 630, alt: title }],
        },
        twitter: { card: 'summary_large_image', title: fullTitle, description, images: [og] },
    };
}
