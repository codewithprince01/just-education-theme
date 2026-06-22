// JSON-LD structured-data builders for the Contact page. Kept separate so the
// server page stays declarative and the schema is easy to audit.
import {
    CONTACT_SITE_NAME,
    CONTACT_SITE_URL,
    CONTACT_PATH,
    contactFaqs,
    contactBreadcrumbs,
    offices,
    departmentDirectory,
    socialLinks,
    contactSeo,
} from '@/data/contactConfig';

const abs = (path: string) => (path.startsWith('http') ? path : `${CONTACT_SITE_URL}${path}`);

export function organizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: CONTACT_SITE_NAME,
        url: CONTACT_SITE_URL,
        logo: `${CONTACT_SITE_URL}/next.svg`,
        sameAs: socialLinks.map((s) => s.href),
        contactPoint: departmentDirectory.map((d) => ({
            '@type': 'ContactPoint',
            contactType: d.name,
            email: d.email,
            telephone: d.phone,
            areaServed: 'IN',
            availableLanguage: ['en', 'hi'],
        })),
        address: offices.map((o) => ({
            '@type': 'PostalAddress',
            name: o.name,
            streetAddress: o.address,
            addressLocality: o.city,
            addressCountry: 'IN',
        })),
    };
}

export function contactPageSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: contactSeo.title,
        description: contactSeo.description,
        url: abs(CONTACT_PATH),
        isPartOf: { '@type': 'WebSite', name: CONTACT_SITE_NAME, url: CONTACT_SITE_URL },
    };
}

export function faqSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: contactFaqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
    };
}

export function breadcrumbSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: contactBreadcrumbs.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: c.url ? abs(c.url) : undefined,
        })),
    };
}
