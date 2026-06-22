import Link from 'next/link';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    message?: string;
    actionLabel?: string;
    actionHref?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

// Friendly empty state for zero-result searches and filters.
export default function EmptyState({
    title = 'No articles found',
    message = 'Try adjusting your search or filters to find what you’re looking for.',
    actionLabel = 'Clear filters',
    actionHref,
    onAction,
    icon,
}: EmptyStateProps) {
    return (
        <div className="text-center py-16 px-6 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="w-14 h-14 mx-auto rounded-full bg-orange-50 text-[#F57C00] flex items-center justify-center mb-4">
                {icon ?? <SearchX className="w-7 h-7" />}
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">{message}</p>
            {actionHref ? (
                <Link
                    href={actionHref}
                    className="inline-block mt-5 px-5 py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg text-sm transition-colors"
                >
                    {actionLabel}
                </Link>
            ) : onAction ? (
                <button
                    onClick={onAction}
                    className="mt-5 px-5 py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg text-sm transition-colors"
                >
                    {actionLabel}
                </button>
            ) : null}
        </div>
    );
}
