import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Top Education Cities in India 2026 - Find Colleges by Location | JustEducation",
    description: "Explore India's top student cities and educational hubs. Compare colleges, universities, and localities in Pune, Bangalore, Delhi NCR, Mumbai, Chennai, and more.",
};

export default function CityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
