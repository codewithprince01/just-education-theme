import { institutions } from '@/data/blog';
import InstitutionArchive, { institutionMetadata } from '@/components/blog/InstitutionArchive';

const CFG = { allowed: ['college'] as const, eyebrow: 'College', segment: 'college' };

export const dynamicParams = false;

export function generateStaticParams() {
    return institutions.filter((i) => i.type === 'college').map((i) => ({ slug: i.slug }));
}

type Props = {
    params: Promise<{ slug: string }>;
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params, searchParams }: Props) {
    const { slug } = await params;
    return institutionMetadata({ slug, allowed: [...CFG.allowed], eyebrow: CFG.eyebrow, segment: CFG.segment, sp: await searchParams });
}

export default async function Page({ params, searchParams }: Props) {
    const { slug } = await params;
    return <InstitutionArchive slug={slug} allowed={[...CFG.allowed]} eyebrow={CFG.eyebrow} segment={CFG.segment} sp={await searchParams} />;
}
