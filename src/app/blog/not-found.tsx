import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';
import { routes } from '@/lib/blog/config';

export default function BlogNotFound() {
    return (
        <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-50 text-[#F57C00] flex items-center justify-center mb-5">
                    <Compass className="w-8 h-8" />
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-[#F57C00]">404</p>
                <h1 className="text-3xl font-black text-[#0B3C5D] mt-2">We couldn’t find that page</h1>
                <p className="text-gray-500 mt-3">
                    The article or page you’re looking for may have moved or no longer exists.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mt-7">
                    <Link href={routes.home} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F57C00] hover:bg-[#E67300] text-white font-bold rounded-lg text-sm transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Insights
                    </Link>
                    <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg text-sm hover:border-[#F57C00] transition-colors">
                        Go to homepage
                    </Link>
                </div>
            </div>
        </div>
    );
}
