import { examCategories } from '@/data/exams';
import ExamCategoryPage from '@/components/exams/ExamCategoryPage';
import ExamDetailPage from '@/components/exams/ExamDetailPage';

interface PageProps {
    params: Promise<{
        examSlug: string;
    }>;
}

export default async function ExamSlugPage({ params }: PageProps) {
    const { examSlug } = await params;
    const isCategory = examCategories.some((category) => category.id === examSlug);

    return isCategory ? <ExamCategoryPage /> : <ExamDetailPage />;
}
