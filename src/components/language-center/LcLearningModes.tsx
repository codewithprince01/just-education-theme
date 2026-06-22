import type { IconCard } from '@/data/languageCenterData';
import SectionHeading from '@/components/testimonials/SectionHeading';
import IconFeatureGrid from './IconFeatureGrid';

interface LcLearningModesProps {
  modes: IconCard[];
}

export default function LcLearningModes({ modes }: LcLearningModesProps) {
  return (
    <section className="py-10 scroll-mt-24" id="learning-modes">
      <SectionHeading
        eyebrow="Learning Modes"
        title="Learn Your Way"
        description="Flexible formats designed around your lifestyle and goals."
      />
      <IconFeatureGrid items={modes} accent="blue" />
    </section>
  );
}
