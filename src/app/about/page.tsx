import type { Metadata } from 'next';
import AboutPage from '@/components/about/AboutPage';

const SITE_URL = 'https://justeducation.com';
const PAGE_URL = `${SITE_URL}/about`;

const title = 'About JustEducation | India\'s Trusted Education Discovery Platform';
const description =
    'JustEducation is a comprehensive education information and discovery platform helping students find colleges, universities, schools, courses, entrance exams, scholarships, and admissions across India.';

export const metadata: Metadata = {
    title,
    description,
    keywords: [
        'Colleges in India', 'Universities in India', 'Courses in India', 'Educational Institutions',
        'College Search', 'Course Search', 'Education Portal', 'Education Information Platform',
        'Entrance Exams', 'Scholarships', 'Admissions', 'Career Guidance', 'Educational Resources',
        'Schools in India', 'Coaching Institutes',
    ],
    alternates: { canonical: PAGE_URL },
    openGraph: {
        title: 'About JustEducation — India\'s Trusted Education Discovery Platform',
        description:
            'Discover colleges, universities, schools, courses, entrance exams, scholarships, and admissions through structured and reliable information on JustEducation.',
        type: 'website',
        url: PAGE_URL,
        siteName: 'Just Education',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'About JustEducation — India\'s Trusted Education Discovery Platform',
        description,
    },
};

// JSON-LD: AboutPage + the publishing Organization, with platform scale surfaced
// as quantitative data so search engines can read the credibility signals.
const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: title,
    description,
    url: PAGE_URL,
    isPartOf: { '@type': 'WebSite', name: 'Just Education', url: SITE_URL },
    mainEntity: {
        '@type': 'Organization',
        name: 'Just Education',
        url: SITE_URL,
        description,
        slogan: 'India\'s Trusted Education Discovery Platform',
        areaServed: { '@type': 'Country', name: 'India' },
        knowsAbout: [
            'Colleges in India', 'Universities in India', 'Schools in India', 'Courses',
            'Entrance Exams', 'Scholarships', 'Admissions', 'Career Guidance', 'Coaching Institutes',
        ],
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: PAGE_URL },
    ],
};

export default function Page() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <AboutPage />
        </>
    );
}
