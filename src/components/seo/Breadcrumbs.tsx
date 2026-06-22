import Link from 'next/link';

interface BreadcrumbItem {
    name: string;
    url?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
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
            <nav aria-label="Breadcrumb" className="breadcrumbs py-3 text-sm text-gray-600">
                <ol className="flex items-center space-x-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <span className="mx-2 text-gray-400">›</span>
                            )}
                            {index === items.length - 1 ? (
                                <span className="font-semibold text-gray-950" aria-current="page">
                                    {item.name}
                                </span>
                            ) : (
                                item.url ? (
                                    <Link
                                        href={item.url}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span className="text-gray-500">{item.name}</span>
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
