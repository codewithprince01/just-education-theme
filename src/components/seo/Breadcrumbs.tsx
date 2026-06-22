import Link from 'next/link';

interface BreadcrumbItem {
    name: string;
    url?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    // Use on dark/hero backgrounds — renders the breadcrumb text in white.
    light?: boolean;
}

const Breadcrumbs = ({ items, light = false }: BreadcrumbsProps) => {
    if (!items || items.length === 0) return null;

    // Generate Schema.org BreadcrumbList
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url ? `https://justeducation.com${item.url}` : undefined
        }))
    };

    return (
        <>
            {/* Embed Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            {/* Visible breadcrumb navigation */}
            <nav aria-label="Breadcrumb" className={`breadcrumbs py-3 text-sm ${light ? 'text-white/80' : 'text-gray-600'}`}>
                <ol className="flex items-center space-x-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <span className={`mx-2 ${light ? 'text-white/50' : 'text-gray-400'}`}>›</span>
                            )}
                            {index === items.length - 1 ? (
                                <span className={`font-semibold ${light ? 'text-white' : 'text-gray-950'}`} aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                item.url ? (
                                    <Link
                                        href={item.url}
                                        className={`transition-colors ${light ? 'text-white/80 hover:text-white' : 'hover:text-blue-600'}`}
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span className={light ? 'text-white/70' : 'text-gray-500'}>{item.name}</span>
                                )
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
};

export default Breadcrumbs;
