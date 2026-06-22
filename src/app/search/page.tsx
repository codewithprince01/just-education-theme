import { Metadata } from 'next';
import SearchPageClient from '@/app/search/SearchPageClient';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    loc?: string;
  }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q, loc } = await searchParams;
  const queryPart = q ? `"${q}"` : 'Colleges & Universities';
  const locPart = loc ? ` in ${loc}` : '';
  return {
    title: `Search Results for ${queryPart}${locPart} | JustEducation`,
    description: `Find the best institutions matching your search for ${queryPart}${locPart} on JustEducation.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  return (
    <SearchPageClient 
      initialQ={resolvedSearchParams.q || ''} 
      initialLoc={resolvedSearchParams.loc || ''} 
    />
  );
}
