import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { institutionTypes } from '@/data/cityData';
import CategoryPageClient from '@/components/category/CategoryPageClient';

interface PageProps {
  params: Promise<{ type: string }>;
}

export async function generateStaticParams() {
  return institutionTypes.map((t) => ({ type: t.value }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params;
  const meta = institutionTypes.find((t) => t.value === type.toUpperCase());
  if (!meta) return { title: 'Category | JustEducation' };
  return {
    title: `${meta.label} in India – Fees, Ratings & Reviews | JustEducation`,
    description: `Explore top ${meta.label.toLowerCase()} across India. Filter by city, compare fees, ratings, placements and more.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { type } = await params;
  const upper = type.toUpperCase();

  if (!institutionTypes.find((t) => t.value === upper)) notFound();

  return <CategoryPageClient categoryType={upper} />;
}
