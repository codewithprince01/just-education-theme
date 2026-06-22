import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JobDetailClient from '@/components/careers/JobDetailClient';
import { getJobBySlug, getRelatedJobs, getPublicJobs, company, formatSalary, type Job } from '@/data/careers';

interface PageProps {
    params: Promise<{ jobSlug: string }>;
}

// Pre-render a static page for every public job.
export function generateStaticParams() {
    return getPublicJobs().map((job) => ({ jobSlug: job.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { jobSlug } = await params;
    const job = getJobBySlug(jobSlug);
    if (!job) return { title: 'Job Not Found | JustEducation Careers' };

    const salary = formatSalary(job);
    const title = `${job.title} — ${job.employmentType}, ${job.workMode} | ${company.name} Careers`;
    const description = `${job.shortDescription} ${job.experienceRange} experience.${salary ? ` Salary ${salary}.` : ''} Apply now at ${company.name}.`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `https://justeducation.com/careers/${job.slug}`,
            siteName: company.name,
        },
        twitter: { card: 'summary_large_image', title, description },
    };
}

// Map our employment type to schema.org's enum.
const SCHEMA_EMPLOYMENT: Record<string, string> = {
    'Full Time': 'FULL_TIME',
    'Part Time': 'PART_TIME',
    Contract: 'CONTRACTOR',
    Internship: 'INTERN',
    Freelance: 'CONTRACTOR',
};

const jobPostingSchema = (job: Job) => {
    const annual = (lpa: number) => lpa * 100_000; // LPA → INR/year
    const schema: Record<string, unknown> = {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: job.title,
        description: job.overview,
        datePosted: job.postedDate,
        validThrough: job.expiryDate,
        employmentType: SCHEMA_EMPLOYMENT[job.employmentType],
        hiringOrganization: {
            '@type': 'Organization',
            name: company.name,
            sameAs: company.website,
            logo: company.logo,
        },
        jobLocation: {
            '@type': 'Place',
            address: { '@type': 'PostalAddress', addressLocality: job.location, addressCountry: 'IN' },
        },
        industry: job.department,
        totalJobOpenings: job.vacancyCount,
    };
    if (job.workMode === 'Remote') schema.jobLocationType = 'TELECOMMUTE';
    if (job.salaryMin != null) {
        schema.baseSalary = {
            '@type': 'MonetaryAmount',
            currency: 'INR',
            value: {
                '@type': 'QuantitativeValue',
                minValue: annual(job.salaryMin),
                maxValue: annual(job.salaryMax ?? job.salaryMin),
                unitText: 'YEAR',
            },
        };
    }
    return schema;
};

export default async function JobDetailPage({ params }: PageProps) {
    const { jobSlug } = await params;
    const job = getJobBySlug(jobSlug);
    if (!job) notFound();

    const related = getRelatedJobs(job);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema(job)) }} />
            <JobDetailClient job={job} related={related} company={company} />
        </>
    );
}
