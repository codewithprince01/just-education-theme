import Reveal from './Reveal';

interface SectionHeadingProps {
    eyebrow?: string;
    title: string;
    description?: string;
    align?: 'center' | 'left';
    /** Render heading as h2 (default) — page hero owns the single h1. */
    light?: boolean; // light text for dark backgrounds
}

/**
 * Consistent section title block used across the contact page. Mirrors the
 * platform's "eyebrow + extrabold navy heading + muted description" rhythm.
 */
export default function SectionHeading({
    eyebrow,
    title,
    description,
    align = 'center',
    light = false,
}: SectionHeadingProps) {
    const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
    return (
        <Reveal className={`max-w-2xl mb-12 ${alignment}`}>
            {eyebrow && (
                <span
                    className={`inline-block text-xs font-bold uppercase tracking-widest mb-3 px-3 py-1 rounded-full ${
                        light
                            ? 'bg-white/15 text-orange-200'
                            : 'bg-orange-50 text-[#F57C00]'
                    }`}
                >
                    {eyebrow}
                </span>
            )}
            <h2
                className={`text-2xl md:text-4xl font-extrabold tracking-tight ${
                    light ? 'text-white' : 'text-[#0B3C5D]'
                }`}
            >
                {title}
            </h2>
            {description && (
                <p
                    className={`mt-4 text-base leading-relaxed ${
                        light ? 'text-blue-100' : 'text-gray-600'
                    }`}
                >
                    {description}
                </p>
            )}
        </Reveal>
    );
}
