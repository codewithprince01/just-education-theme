import type { CardArticle } from '@/data/blog/types';
import SectionHeading from './SectionHeading';
import ArticleCard from './ArticleCard';

interface CategorySectionProps {
    title: string;
    subtitle?: string;
    icon?: React.ReactNode;
    href: string;
    articles: CardArticle[];
    /** when true the first card spans larger (feature layout) */
    feature?: boolean;
    className?: string;
}

// Themed homepage section: heading + a responsive grid of article cards.
// Used for Educational News, Study Abroad, Scholarships, Admissions, etc.
export default function CategorySection({
    title,
    subtitle,
    icon,
    href,
    articles,
    feature = false,
    className = '',
}: CategorySectionProps) {
    if (articles.length === 0) return null;

    if (feature) {
        const [lead, ...rest] = articles;
        return (
            <section className={className}>
                <SectionHeading title={title} subtitle={subtitle} icon={icon} href={href} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <ArticleCard article={lead} />
                    <div className="grid gap-4">
                        {rest.slice(0, 3).map((a) => (
                            <ArticleCard key={a.slug} article={a} variant="horizontal" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={className}>
            <SectionHeading title={title} subtitle={subtitle} icon={icon} href={href} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.slice(0, 3).map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                ))}
            </div>
        </section>
    );
}
