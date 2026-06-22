import type { IconCard } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';
import IconFeatureGrid from './IconFeatureGrid';

interface LcHighlightsProps {
  highlights: IconCard[];
}

export default function LcHighlights({ highlights }: LcHighlightsProps) {
  return (
    <section className="py-10 scroll-mt-24" id="highlights">
      <SectionHeading
        eyebrow="Key Highlights"
        title="What Makes Us Different"
        description="Everything you need for a confident, certified language journey."
      />
      <IconFeatureGrid items={highlights} accent="orange" variant="tile" />
    </section>
  );
}
