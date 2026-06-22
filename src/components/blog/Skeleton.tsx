// Pure-CSS skeleton loaders used as Suspense/loading fallbacks.
export function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-200" />
            <div className="p-5 space-y-3">
                <div className="h-3 w-20 bg-gray-200 rounded-full" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="flex items-center gap-2 pt-3">
                    <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
}

export function SkeletonArticle() {
    return (
        <div className="animate-pulse max-w-3xl mx-auto space-y-4 py-10">
            <div className="h-3 w-24 bg-gray-200 rounded-full" />
            <div className="h-8 w-full bg-gray-200 rounded" />
            <div className="h-8 w-2/3 bg-gray-200 rounded" />
            <div className="h-64 w-full bg-gray-200 rounded-xl my-6" />
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded" />
            ))}
        </div>
    );
}
