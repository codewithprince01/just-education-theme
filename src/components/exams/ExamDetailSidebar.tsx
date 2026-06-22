import { Download, HelpCircle, Info, ChevronRight, CalendarDays, Bell, Layers, ListChecks } from 'lucide-react';
import {
    jeeMainSidebarLinks,
    jeeMainCategoryPages,
    jeeMainUpcomingExams,
    jeeMainSidebarUpdates,
} from '../../data/jeeMain';

interface ExamDetailSidebarProps {
    sidebarRef?: React.RefObject<HTMLDivElement | null>;
}

// Consistent sidebar card header: orange icon chip + title with a divider below.
const CardHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
        <span className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-[#F57C00]" />
        </span>
        <h3 className="font-bold text-[#0B3C5D] text-[15px] leading-tight">{title}</h3>
    </div>
);

const ExamDetailSidebar = ({ sidebarRef }: ExamDetailSidebarProps) => {
    return (
        <aside ref={sidebarRef} className="space-y-6">
            {/* PDF Download */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-red-600 text-xs font-bold">PDF</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 leading-snug">
                        Download Free JEE Main Previous Year Papers with Solutions
                    </p>
                </div>
                <a href="#" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F57C00] hover:underline">
                    <Download className="w-4 h-4" /> Free Download
                </a>
            </div>

            {/* Get More Info */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <CardHeader icon={Info} title="Get More Info About JEE Main" />
                <div className="space-y-2.5">
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 text-gray-500 text-sm font-semibold rounded-lg hover:bg-gray-50">
                        <Download className="w-4 h-4" /> Download Sample Papers
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#F57C00] text-[#F57C00] text-sm font-semibold rounded-lg hover:bg-orange-50">
                        <HelpCircle className="w-4 h-4" /> Ask a Question
                    </button>
                    <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-300 text-gray-500 text-sm font-semibold rounded-lg hover:bg-gray-50">
                        <Info className="w-4 h-4" /> Get More Info
                    </button>
                </div>
            </div>

            {/* Upcoming exams */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <CardHeader icon={CalendarDays} title="Upcoming Exams" />
                <ul className="space-y-2">
                    {jeeMainUpcomingExams.map((exam) => (
                        <li key={exam.name} className="flex items-center justify-between text-sm">
                            <a href="#" className="font-medium text-gray-800 hover:text-[#F57C00]">{exam.name}</a>
                            <span className="text-gray-400">{exam.date}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Latest Updates */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <CardHeader icon={Bell} title="Latest Updates on JEE Main" />
                <div className="space-y-4 divide-y divide-gray-100">
                    {jeeMainSidebarUpdates.map((update) => (
                        <a key={update.title} href="#" className="flex items-start gap-3 group pt-4 first:pt-0">
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-[#F57C00] line-clamp-2">
                                    {update.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-1.5">
                                    <span className="text-blue-700">{update.author}</span> &bull; {update.date}
                                </p>
                            </div>
                            <img
                                src={update.image}
                                alt={update.title}
                                className="w-20 h-16 rounded-md object-cover flex-shrink-0"
                            />
                        </a>
                    ))}
                </div>
            </div>

            {/* Category wise exam pages */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <CardHeader icon={Layers} title="Category Wise Exam Pages" />
                <ul className="space-y-1">
                    {jeeMainCategoryPages.map((cat) => (
                        <li key={cat}>
                            <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#F57C00] py-1.5 border-b border-gray-100 last:border-0">
                                {cat}
                                <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* You can also check */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <CardHeader icon={ListChecks} title="You Can Also Check" />
                <ul className="space-y-1">
                    {jeeMainSidebarLinks.map((link) => (
                        <li key={link}>
                            <a href="#" className="flex items-center justify-between text-sm text-gray-600 hover:text-[#F57C00] py-1.5 border-b border-gray-100 last:border-0">
                                JEE Main {link}
                                <ChevronRight className="w-3.5 h-3.5" />
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default ExamDetailSidebar;
