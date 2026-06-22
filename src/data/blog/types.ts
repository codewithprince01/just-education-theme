// Domain models for the Blog & Education Insights module.
// Everything here is plain, serializable data so it can cross the
// Server -> Client Component boundary without custom serialization.
// Dates are stored as ISO strings for the same reason (and to avoid
// hydration mismatches from runtime `new Date()` calls).

export type InstitutionType =
    | 'university'
    | 'college'
    | 'coaching'
    | 'school'
    | 'institute'
    | 'library'
    | 'consultant';

/** Editorial format of an article, used by the global Content Type filter. */
export type ContentType = 'article' | 'news' | 'guide' | 'ranking' | 'review';

export interface Author {
    slug: string;
    name: string;
    role: string;
    bio: string;
    avatar: string;
    expertise: string[];
    location?: string;
    social?: { twitter?: string; linkedin?: string; website?: string };
}

export interface SubCategory {
    slug: string;
    name: string;
    categorySlug: string;
}

export interface Category {
    slug: string;
    name: string;
    description: string;
    /** lucide-react icon name, resolved in the UI layer */
    icon: string;
    /** accent token used by the category explorer (mapped to classes in UI) */
    accent: 'navy' | 'orange' | 'teal' | 'blue' | 'purple' | 'green' | 'rose' | 'amber';
    subCategories: SubCategory[];
}

export interface Tag {
    slug: string;
    name: string;
}

export interface Location {
    slug: string;
    name: string;
    type: 'city' | 'state' | 'country';
    state?: string;
    country?: string;
}

export interface Institution {
    slug: string;
    name: string;
    type: InstitutionType;
    shortName?: string;
    logo?: string;
    city?: string;
    state?: string;
    country?: string;
    established?: number;
    rating?: number;
    description?: string;
}

export interface Course {
    slug: string;
    name: string;
    degree?: string;
    level?: 'undergraduate' | 'postgraduate' | 'diploma' | 'doctorate' | 'certificate';
}

export interface ExamRef {
    slug: string;
    name: string;
    type?: string;
}

export interface Scholarship {
    slug: string;
    name: string;
    type?: string;
}

export type ContentBlock =
    | { type: 'paragraph'; text: string }
    | { type: 'heading'; level: 2 | 3; id: string; text: string }
    | { type: 'list'; ordered?: boolean; items: string[] }
    | { type: 'quote'; text: string; cite?: string }
    | { type: 'image'; src: string; alt: string; caption?: string }
    | { type: 'callout'; variant: 'info' | 'tip' | 'warning' | 'success'; title?: string; text: string }
    | { type: 'keyInsight'; title?: string; text: string }
    | { type: 'timeline'; items: { title: string; text: string }[] }
    | { type: 'table'; headers: string[]; rows: string[][] }
    | { type: 'divider' };

export interface Faq {
    question: string;
    answer: string;
}

export interface Comment {
    id: string;
    author: string;
    avatar?: string;
    date: string;
    text: string;
    likes: number;
}

export interface ArticleSeo {
    metaTitle?: string;
    metaDescription?: string;
    canonical?: string;
    ogImage?: string;
    noindex?: boolean;
}

export interface GalleryImage {
    src: string;
    alt: string;
    caption?: string;
}

export interface Article {
    slug: string;
    title: string;
    subtitle?: string;
    excerpt: string;
    /** AI/GEO quick answer — a 1-2 sentence direct summary. */
    quickAnswer?: string;
    /** "What you'll learn" checklist shown in the smart hero. */
    keyTakeaways?: string[];
    content: ContentBlock[];
    coverImage: string;
    gallery?: GalleryImage[];

    // Relationships (by slug)
    authorSlug: string;
    categorySlug: string;
    subCategorySlug?: string;
    tags: string[];
    institutionSlugs?: string[];
    locationSlugs?: string[];
    courseSlugs?: string[];
    examSlugs?: string[];
    scholarshipSlugs?: string[];

    // Editorial / publishing metadata
    contentType?: ContentType;
    publishedAt: string;
    updatedAt?: string;
    readingMinutes: number;
    views: number;
    likes: number;
    rating: number;
    ratingCount?: number;
    featured?: boolean;
    editorsPick?: boolean;
    trending?: boolean;

    faqs?: Faq[];
    comments?: Comment[];
    seo?: ArticleSeo;
}

/**
 * Compact, fully-serializable projection of an article for cards and listing
 * grids. Deliberately omits heavy fields (content, gallery, comments) so it can
 * cross the Server -> Client boundary cheaply. `ResolvedArticle` is structurally
 * assignable to this type, so server components can pass either.
 */
export interface CardArticle {
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    category: { slug: string; name: string; accent: Category['accent'] };
    author: { slug: string; name: string; avatar: string };
    resolvedTags: { slug: string; name: string }[];
    tags: string[];
    subCategorySlug?: string;
    institutionSlugs?: string[];
    institutionTypes: string[];
    locationSlugs?: string[];
    /** First linked location name, shown on the card. */
    primaryLocation?: string;
    examSlugs: string[];
    contentType: ContentType;
    publishedAt: string;
    updatedAt?: string;
    readingMinutes: number;
    views: number;
    likes: number;
    /** Derived engagement proxy used by the "Most Shared" sort. */
    shares: number;
    rating: number;
    ratingCount?: number;
    trending?: boolean;
    featured?: boolean;
    editorsPick?: boolean;
}

/** Article enriched with its resolved relationships, for rendering. */
export interface ResolvedArticle extends Article {
    author: Author;
    category: Category;
    subCategory?: SubCategory;
    resolvedTags: Tag[];
    institutions: Institution[];
    locations: Location[];
    courses: Course[];
    exams: ExamRef[];
    scholarships: Scholarship[];
}
