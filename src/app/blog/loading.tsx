import { SkeletonGrid } from '@/components/blog/Skeleton';

// Route-level loading fallback (Suspense) for the blog segment.
export default function BlogLoading() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-gradient-to-br from-[#0B3C5D] to-[#126094] py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="h-3 w-40 bg-white/20 rounded-full animate-pulse" />
                    <div className="h-9 w-2/3 bg-white/20 rounded-lg mt-4 animate-pulse" />
                    <div className="h-4 w-1/2 bg-white/10 rounded mt-4 animate-pulse" />
                </div>
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10">
                <SkeletonGrid count={9} />
            </div>
        </div>
    );
}
