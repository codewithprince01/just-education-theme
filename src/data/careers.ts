/**
 * Careers / Vacancies data layer.
 *
 * This is the single source of truth for the Careers module. The `Job` shape is
 * intentionally "admin-ready" — it carries every field an admin panel would edit
 * (slug, status, featured toggle, published/expiry dates, salary, etc.) so a CMS or
 * API can later populate the same structure without touching the UI.
 *
 * Only jobs with status `Open` or `Urgent Hiring` are exposed publicly — use the
 * `getPublicJobs()` / `getJobBySlug()` helpers rather than reading `jobs` directly.
 */

export type EmploymentType = 'Full Time' | 'Part Time' | 'Contract' | 'Internship' | 'Freelance';
export type WorkMode = 'Remote' | 'Hybrid' | 'Onsite';
export type ExperienceLevel = 'Fresher' | 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
export type JobStatus = 'Open' | 'Urgent Hiring' | 'Closed' | 'Draft';

export interface Company {
    name: string;
    about: string;
    logo: string;
    website: string;
    location: string;
}

export interface Job {
    id: string;
    slug: string;
    title: string;
    department: string;
    location: string;
    employmentType: EmploymentType;
    workMode: WorkMode;
    experienceLevel: ExperienceLevel;
    experienceRange: string;          // e.g. "3 - 5 years"
    salaryMin: number | null;         // in LPA (lakh per annum); null hides salary
    salaryMax: number | null;
    vacancyCount: number;
    postedDate: string;               // ISO date
    expiryDate: string;               // ISO date
    status: JobStatus;
    featured: boolean;
    shortDescription: string;
    overview: string;
    responsibilities: string[];
    requiredSkills: string[];
    preferredSkills: string[];
    qualifications: string[];
    experienceRequirements: string;
    benefits: string[];
    selectionProcess: string[];
}

export const company: Company = {
    name: 'Just Education',
    about: 'Just Education is a fast-growing EdTech platform helping millions of students discover the best colleges, exams and career paths across India. We are a small, product-obsessed team that ships fast, values ownership, and cares deeply about student outcomes.',
    logo: 'https://picsum.photos/seed/just-education-logo/120/120',
    website: 'https://justeducation.com',
    location: 'Bengaluru, India',
};

export const jobs: Job[] = [
    {
        id: 'job-1',
        slug: 'software-engineer',
        title: 'Software Engineer',
        department: 'Engineering',
        location: 'Bengaluru, India',
        employmentType: 'Full Time',
        workMode: 'Hybrid',
        experienceLevel: 'Mid-Level',
        experienceRange: '2 - 4 years',
        salaryMin: 12,
        salaryMax: 22,
        vacancyCount: 3,
        postedDate: '2026-06-10',
        expiryDate: '2026-07-31',
        status: 'Open',
        featured: true,
        shortDescription: 'Build and scale the products that help millions of students make better education decisions.',
        overview: 'As a Software Engineer at Just Education, you will work across our web platform — from student-facing experiences to internal tooling. You will own features end to end, collaborate closely with design and product, and help shape an engineering culture that values clean, maintainable code and fast iteration.',
        responsibilities: [
            'Design, build and ship features across the stack using React, Next.js and Node.js.',
            'Collaborate with product and design to turn ideas into well-scoped, shippable work.',
            'Write clean, tested and well-documented code, and review the work of your peers.',
            'Improve performance, accessibility and reliability of the platform.',
            'Participate in on-call rotation and help triage and resolve production issues.',
        ],
        requiredSkills: ['JavaScript / TypeScript', 'React', 'Next.js', 'REST APIs', 'Git'],
        preferredSkills: ['Node.js', 'PostgreSQL', 'AWS', 'CI/CD', 'Testing (Jest / Playwright)'],
        qualifications: [
            "Bachelor's degree in Computer Science or related field, or equivalent practical experience.",
            'Strong fundamentals in data structures, algorithms and web architecture.',
        ],
        experienceRequirements: '2 - 4 years of professional experience building production web applications, ideally with a modern JavaScript framework. Experience shipping features in a fast-paced product team is highly valued.',
        benefits: ['Health Insurance', 'Paid Leave', 'Performance Bonuses', 'Flexible Hours', 'Learning Budget', 'Latest Hardware'],
        selectionProcess: ['Application Review', 'HR Screening', 'Technical Round', 'System Design Round', 'Final Interview', 'Offer Letter'],
    },
    {
        id: 'job-2',
        slug: 'senior-react-developer',
        title: 'Senior React Developer',
        department: 'Engineering',
        location: 'Remote (India)',
        employmentType: 'Full Time',
        workMode: 'Remote',
        experienceLevel: 'Senior',
        experienceRange: '5 - 8 years',
        salaryMin: 28,
        salaryMax: 45,
        vacancyCount: 1,
        postedDate: '2026-06-14',
        expiryDate: '2026-07-25',
        status: 'Urgent Hiring',
        featured: true,
        shortDescription: 'Lead front-end architecture and mentor a team building delightful, high-performance interfaces.',
        overview: 'We are looking for a Senior React Developer to take ownership of our front-end architecture. You will set patterns, raise the quality bar, and mentor other engineers while still shipping meaningful product work yourself.',
        responsibilities: [
            'Own and evolve the front-end architecture, design system and component library.',
            'Lead complex features from technical design through to production.',
            'Mentor mid and junior engineers through pairing and code review.',
            'Champion performance, accessibility and developer-experience improvements.',
            'Partner with product and design to shape the roadmap.',
        ],
        requiredSkills: ['React', 'Next.js', 'TypeScript', 'State Management', 'Performance Optimization', 'Design Systems'],
        preferredSkills: ['Server Components', 'GraphQL', 'Testing', 'Accessibility (a11y)', 'Animation'],
        qualifications: [
            "Bachelor's degree in a technical field or equivalent experience.",
            'Proven track record of shipping and maintaining large React applications.',
        ],
        experienceRequirements: '5 - 8 years of front-end engineering experience with deep React expertise, including at least 2 years in a senior or lead capacity.',
        benefits: ['Health Insurance', 'Fully Remote', 'Paid Leave', 'Performance Bonuses', 'Learning Budget', 'Home Office Stipend'],
        selectionProcess: ['Application Review', 'HR Screening', 'Technical Round', 'Architecture Discussion', 'Final Interview', 'Offer Letter'],
    },
    {
        id: 'job-3',
        slug: 'hr-manager',
        title: 'HR Manager',
        department: 'Human Resources',
        location: 'Bengaluru, India',
        employmentType: 'Full Time',
        workMode: 'Onsite',
        experienceLevel: 'Senior',
        experienceRange: '6 - 10 years',
        salaryMin: 14,
        salaryMax: 24,
        vacancyCount: 1,
        postedDate: '2026-06-05',
        expiryDate: '2026-07-15',
        status: 'Open',
        featured: false,
        shortDescription: 'Own the people function end to end — hiring, culture, and employee experience.',
        overview: 'As HR Manager you will build and run the people function at Just Education. From talent acquisition to culture and policy, you will make sure we attract great people and create an environment where they do their best work.',
        responsibilities: [
            'Own the full-cycle recruitment process across departments.',
            'Design and run onboarding, performance and engagement programs.',
            'Shape and maintain a healthy, inclusive company culture.',
            'Develop HR policies and ensure compliance with labour regulations.',
            'Act as a trusted partner to leadership on all people matters.',
        ],
        requiredSkills: ['Talent Acquisition', 'Employee Relations', 'HR Operations', 'Stakeholder Management', 'Communication'],
        preferredSkills: ['HRMS Tools', 'Compensation & Benefits', 'L&D', 'Employer Branding'],
        qualifications: [
            "Bachelor's or Master's degree in HR, Business or related field.",
            'Strong understanding of Indian labour laws and HR best practices.',
        ],
        experienceRequirements: '6 - 10 years of progressive HR experience, including hands-on recruitment and at least 2 years managing the HR function in a growing company.',
        benefits: ['Health Insurance', 'Paid Leave', 'Performance Bonuses', 'Flexible Hours', 'Learning Budget'],
        selectionProcess: ['Application Review', 'HR Screening', 'Panel Interview', 'Leadership Round', 'Offer Letter'],
    },
    {
        id: 'job-4',
        slug: 'product-designer',
        title: 'Product Designer',
        department: 'Design',
        location: 'Remote (India)',
        employmentType: 'Full Time',
        workMode: 'Remote',
        experienceLevel: 'Mid-Level',
        experienceRange: '3 - 6 years',
        salaryMin: 16,
        salaryMax: 28,
        vacancyCount: 2,
        postedDate: '2026-06-12',
        expiryDate: '2026-07-28',
        status: 'Open',
        featured: true,
        shortDescription: 'Craft intuitive, accessible experiences that guide students through big life decisions.',
        overview: 'We are hiring a Product Designer to own end-to-end design for key student journeys. You will research, prototype, and ship interfaces that are both beautiful and genuinely useful.',
        responsibilities: [
            'Own design for major product areas from research to high-fidelity UI.',
            'Run user research and turn insights into design decisions.',
            'Maintain and extend our design system in close partnership with engineering.',
            'Prototype and validate ideas quickly.',
        ],
        requiredSkills: ['Figma', 'Interaction Design', 'Design Systems', 'User Research', 'Prototyping'],
        preferredSkills: ['Motion Design', 'Accessibility', 'HTML/CSS basics', 'Usability Testing'],
        qualifications: [
            'A strong portfolio demonstrating end-to-end product design work.',
            'Degree in Design, HCI or equivalent practical experience.',
        ],
        experienceRequirements: '3 - 6 years designing digital products, ideally consumer-facing, with shipped work you can talk through.',
        benefits: ['Health Insurance', 'Fully Remote', 'Paid Leave', 'Learning Budget', 'Home Office Stipend'],
        selectionProcess: ['Application Review', 'Portfolio Review', 'Design Challenge', 'Final Interview', 'Offer Letter'],
    },
    {
        id: 'job-5',
        slug: 'marketing-intern',
        title: 'Marketing Intern',
        department: 'Marketing',
        location: 'Bengaluru, India',
        employmentType: 'Internship',
        workMode: 'Hybrid',
        experienceLevel: 'Fresher',
        experienceRange: '0 - 1 years',
        salaryMin: null,
        salaryMax: null,
        vacancyCount: 4,
        postedDate: '2026-06-16',
        expiryDate: '2026-07-20',
        status: 'Open',
        featured: false,
        shortDescription: 'Kick-start your marketing career with hands-on work across content, social and campaigns.',
        overview: 'This 6-month internship is a chance to learn modern marketing from the ground up. You will work alongside the marketing team on real campaigns and own meaningful slices of work.',
        responsibilities: [
            'Support content creation across blog, social and email.',
            'Help plan and run marketing campaigns.',
            'Track and report on key marketing metrics.',
            'Research trends and competitor activity.',
        ],
        requiredSkills: ['Writing', 'Social Media', 'Creativity', 'Communication'],
        preferredSkills: ['Canva', 'SEO basics', 'Analytics', 'Video Editing'],
        qualifications: [
            'Pursuing or recently completed a degree in Marketing, Communications or related field.',
        ],
        experienceRequirements: 'No prior professional experience required — we are looking for curiosity, initiative and strong communication.',
        benefits: ['Stipend', 'Mentorship', 'Flexible Hours', 'Certificate', 'PPO Opportunity'],
        selectionProcess: ['Application Review', 'HR Screening', 'Task Round', 'Final Interview', 'Offer Letter'],
    },
    {
        id: 'job-6',
        slug: 'content-writer-contract',
        title: 'Content Writer (Contract)',
        department: 'Content',
        location: 'Remote (India)',
        employmentType: 'Contract',
        workMode: 'Remote',
        experienceLevel: 'Junior',
        experienceRange: '1 - 3 years',
        salaryMin: 6,
        salaryMax: 10,
        vacancyCount: 2,
        postedDate: '2026-06-09',
        expiryDate: '2026-07-18',
        status: 'Open',
        featured: false,
        shortDescription: 'Write clear, helpful, SEO-friendly content that helps students find the right path.',
        overview: 'We are looking for a contract Content Writer to produce high-quality education content — exam guides, college overviews and career articles — that ranks well and genuinely helps students.',
        responsibilities: [
            'Research and write accurate, engaging education content.',
            'Optimise content for search without sacrificing readability.',
            'Collaborate with subject experts and editors.',
            'Keep existing content fresh and up to date.',
        ],
        requiredSkills: ['Writing', 'SEO', 'Research', 'Editing'],
        preferredSkills: ['Education domain knowledge', 'CMS experience', 'Keyword research tools'],
        qualifications: [
            'A portfolio of published writing, ideally in education or a related domain.',
        ],
        experienceRequirements: '1 - 3 years of content writing experience with samples that demonstrate clarity and SEO awareness.',
        benefits: ['Remote', 'Flexible Hours', 'Performance Bonuses'],
        selectionProcess: ['Application Review', 'Writing Test', 'Interview', 'Offer Letter'],
    },
    {
        // Closed — used to verify it is filtered out of public views.
        id: 'job-7',
        slug: 'data-analyst',
        title: 'Data Analyst',
        department: 'Engineering',
        location: 'Bengaluru, India',
        employmentType: 'Full Time',
        workMode: 'Onsite',
        experienceLevel: 'Mid-Level',
        experienceRange: '2 - 5 years',
        salaryMin: 12,
        salaryMax: 20,
        vacancyCount: 1,
        postedDate: '2026-05-01',
        expiryDate: '2026-06-01',
        status: 'Closed',
        featured: false,
        shortDescription: 'Turn raw product data into insights that drive decisions.',
        overview: 'This role is currently closed.',
        responsibilities: ['Analyse product and marketing data.'],
        requiredSkills: ['SQL', 'Python', 'Data Visualization'],
        preferredSkills: ['dbt', 'BigQuery'],
        qualifications: ["Bachelor's degree in a quantitative field."],
        experienceRequirements: '2 - 5 years in analytics.',
        benefits: ['Health Insurance', 'Paid Leave'],
        selectionProcess: ['Application Review', 'Technical Round', 'Final Interview'],
    },
];

/* ------------------------------------------------------------------ */
/*  Filter option constants (drive the listing filter UI)             */
/* ------------------------------------------------------------------ */

export const employmentTypes: EmploymentType[] = ['Full Time', 'Part Time', 'Contract', 'Internship', 'Freelance'];
export const workModes: WorkMode[] = ['Remote', 'Hybrid', 'Onsite'];
export const experienceLevels: ExperienceLevel[] = ['Fresher', 'Junior', 'Mid-Level', 'Senior', 'Lead'];

/* ------------------------------------------------------------------ */
/*  Helpers — always go through these so status rules stay enforced   */
/* ------------------------------------------------------------------ */

// Only Open / Urgent Hiring jobs are public.
export const isPublic = (job: Job): boolean => job.status === 'Open' || job.status === 'Urgent Hiring';

export const getPublicJobs = (): Job[] =>
    jobs.filter(isPublic).sort((a, b) => +new Date(b.postedDate) - +new Date(a.postedDate));

export const getFeaturedJobs = (): Job[] => getPublicJobs().filter((j) => j.featured);

export const getJobBySlug = (slug: string): Job | undefined =>
    jobs.find((j) => j.slug === slug && isPublic(j));

export const getRelatedJobs = (job: Job, limit = 3): Job[] =>
    getPublicJobs()
        .filter((j) => j.slug !== job.slug && (j.department === job.department || j.workMode === job.workMode))
        .slice(0, limit);

export const departments = (): string[] => Array.from(new Set(getPublicJobs().map((j) => j.department))).sort();
export const locations = (): string[] => Array.from(new Set(getPublicJobs().map((j) => j.location))).sort();

// "₹12 - ₹22 LPA" / "₹6 LPA" / null when undisclosed
export const formatSalary = (job: Job): string | null => {
    if (job.salaryMin == null && job.salaryMax == null) return null;
    if (job.salaryMin != null && job.salaryMax != null) return `₹${job.salaryMin} - ₹${job.salaryMax} LPA`;
    return `₹${job.salaryMin ?? job.salaryMax} LPA`;
};

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "Jun 10, 2026" — built from the ISO parts so it is timezone-independent and
// renders identically on the server and the client (no hydration mismatch).
export const formatDate = (iso: string): string => {
    const [y, m, d] = iso.split('-').map(Number);
    return `${MONTHS_SHORT[m - 1]} ${d}, ${y}`;
};

// "Posted 3 days ago" style relative label (today is treated as 2026-06-20 in demo data).
export const postedAgo = (iso: string): string => {
    const days = Math.floor((Date.now() - +new Date(iso)) / 86_400_000);
    if (days <= 0) return 'Posted today';
    if (days === 1) return 'Posted 1 day ago';
    if (days < 30) return `Posted ${days} days ago`;
    const months = Math.floor(days / 30);
    return months === 1 ? 'Posted 1 month ago' : `Posted ${months} months ago`;
};

/* ------------------------------------------------------------------ */
/*  SEO content for the listing page                                  */
/* ------------------------------------------------------------------ */

export const careersFaqs = [
    {
        question: 'How do I apply for a job at Just Education?',
        answer: 'Open any job from the careers listing, review the role, and fill in the application form at the bottom of the job detail page. You can attach your resume and we will get back to you if there is a fit.',
    },
    {
        question: 'Do you offer remote roles?',
        answer: 'Yes. Many of our roles are fully remote within India, and others are hybrid or onsite from our Bengaluru office. Each job clearly lists its work mode.',
    },
    {
        question: 'What does the hiring process look like?',
        answer: 'Most roles follow an application review, an HR screening, one or more technical or task rounds, and a final interview before an offer. The exact steps are listed on every job detail page.',
    },
    {
        question: 'Do you hire freshers and interns?',
        answer: 'Absolutely. We regularly open internships and entry-level roles. Filter the listing by the "Internship" employment type or the "Fresher" experience level to find them.',
    },
];
