import { institutions } from '@/data/blog';
import InstitutionArchive, { institutionMetadata } from '@/components/blog/InstitutionArchive';

// The /institute archive also covers libraries and study-abroad consultants.
const ALLOWED = ['institute', 'library', 'consultant'] as const;
const CFG = { eyebrow: 'Institute', segment: 'institute' };

export const dynamicParams = false;

export function generateStaticParams() {
    return institutions
        .filter((i) => (ALLOWED as readonly string[]).includes(i.type))
        .map((i) => ({ slug: i.slug }));
}

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params, searchParams }: Props) {
    const { slug } = await params;
    return institutionMetadata({ slug, allowed: [...ALLOWED], eyebrow: CFG.eyebrow, segment: CFG.segment, sp: await searchParams });
}

export default async function Page({ params, searchParams }: Props) {
    const { slug } = await params;
    return <InstitutionArchive slug={slug} allowed={[...ALLOWED]} eyebrow={CFG.eyebrow} segment={CFG.segment} sp={await searchParams} />;
}
