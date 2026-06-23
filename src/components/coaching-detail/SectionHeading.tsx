interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'left',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-2 mb-8 ${alignClass}`}>
      {badge && (
        <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 w-fit">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a2540] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-base md:text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
