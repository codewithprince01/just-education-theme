import type { ReactNode } from 'react';

/**
 * Inline, on-brand SVG illustrations for the storytelling About page. Kept as
 * code (not external assets / Lottie) so they're crisp, themeable, zero-request,
 * and fast to load. Selected by string key via <Illustration name="..." />.
 */

const NAVY = '#0B3C5D';
const NAVY2 = '#126094';
const ORANGE = '#F57C00';
const ORANGE_L = '#FDBA74';
const BLUE_L = '#BFDBFE';

// Soft card/panel used as a base in several scenes.
const Panel = ({ x, y, w, h, fill = '#fff', stroke = '#E5E7EB', rx = 10, opacity = 1 }:
    { x: number; y: number; w: number; h: number; fill?: string; stroke?: string; rx?: number; opacity?: number }) => (
    <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} opacity={opacity} />
);

const Scattered = () => (
    // A student amid scattered, chaotic info fragments resolving into order.
    <svg viewBox="0 0 480 360" fill="none" className="w-full h-auto" role="img" aria-label="Scattered information becoming structured">
        <defs>
            <linearGradient id="sc-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#EFF6FF" />
                <stop offset="1" stopColor="#FFF7ED" />
            </linearGradient>
        </defs>
        <rect width="480" height="360" rx="24" fill="url(#sc-bg)" />
        {/* chaotic fragments (left) */}
        <g opacity="0.9">
            <Panel x={28} y={48} w={90} h={20} rx={6} stroke="#FBCFE8" fill="#fff" />
            <Panel x={40} y={92} w={70} h={16} rx={6} stroke="#FECACA" />
            <rect x={150} y={36} width={60} height={40} rx="8" transform="rotate(-12 180 56)" fill="#fff" stroke="#FED7AA" />
            <rect x={66} y={132} width={54} height={36} rx="8" transform="rotate(9 93 150)" fill="#fff" stroke="#BFDBFE" />
            <circle cx={44} cy={196} r="12" fill={ORANGE_L} opacity="0.7" />
            <rect x={120} y={188} width={60} height={18} rx="6" transform="rotate(-6 150 197)" fill="#fff" stroke="#E5E7EB" />
        </g>
        {/* central student */}
        <g transform="translate(228 150)">
            <circle cx="0" cy="0" r="58" fill={NAVY} />
            <circle cx="0" cy="-14" r="16" fill="#fff" />
            <path d="M-26 30 C-26 2 26 2 26 30 Z" fill="#fff" />
            <rect x="-22" y="-44" width="44" height="12" rx="2" fill={ORANGE} />
            <path d="M0 -52 L26 -44 L0 -36 L-26 -44 Z" fill={ORANGE} />
        </g>
        {/* structured rows (right) */}
        <g>
            <Panel x={320} y={70} w={128} h={56} stroke="#DBEAFE" />
            <rect x={336} y={86} width={24} height={24} rx="6" fill={BLUE_L} />
            <rect x={372} y={88} width={64} height={8} rx="4" fill="#CBD5E1" />
            <rect x={372} y={104} width={44} height={8} rx="4" fill="#E2E8F0" />
            <Panel x={320} y={146} w={128} h={56} stroke="#FFEDD5" />
            <rect x={336} y={162} width={24} height={24} rx="6" fill={ORANGE_L} />
            <rect x={372} y={164} width={64} height={8} rx="4" fill="#CBD5E1" />
            <rect x={372} y={180} width={44} height={8} rx="4" fill="#E2E8F0" />
            <Panel x={320} y={222} w={128} h={56} stroke="#DBEAFE" />
            <rect x={336} y={238} width={24} height={24} rx="6" fill={BLUE_L} />
            <rect x={372} y={240} width={64} height={8} rx="4" fill="#CBD5E1" />
            <rect x={372} y={256} width={44} height={8} rx="4" fill="#E2E8F0" />
        </g>
        {/* flow arrow */}
        <path d="M296 165 C306 165 308 174 318 174" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" strokeDasharray="2 8" />
    </svg>
);

const Verified = () => (
    <svg viewBox="0 0 420 320" fill="none" className="w-full h-auto" role="img" aria-label="Verified information">
        <rect width="420" height="320" rx="24" fill="#EFF6FF" />
        <circle cx="210" cy="150" r="92" fill="#fff" stroke="#DBEAFE" />
        <path d="M210 70 L268 92 V150 C268 196 240 224 210 236 C180 224 152 196 152 150 V92 Z" fill={NAVY} />
        <path d="M188 152 l16 16 l30 -34" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="96" cy="74" r="12" fill={ORANGE} />
        <circle cx="334" cy="232" r="10" fill={ORANGE_L} />
        <rect x="300" y="70" width="44" height="12" rx="6" fill="#BFDBFE" />
        <rect x="70" y="232" width="56" height="12" rx="6" fill="#BFDBFE" />
    </svg>
);

const Updates = () => (
    <svg viewBox="0 0 420 320" fill="none" className="w-full h-auto" role="img" aria-label="Regularly updated information">
        <rect width="420" height="320" rx="24" fill="#FFF7ED" />
        <circle cx="210" cy="160" r="86" fill="#fff" stroke="#FFEDD5" />
        <path d="M210 100 a60 60 0 1 1 -52 30" stroke={ORANGE} strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M210 86 l4 28 l-26 -10 Z" fill={ORANGE} />
        <text x="210" y="172" textAnchor="middle" fontSize="40" fontWeight="800" fill={NAVY}>↻</text>
        <rect x="70" y="80" width="40" height="10" rx="5" fill="#FDBA74" />
        <rect x="316" y="226" width="40" height="10" rx="5" fill="#FDBA74" />
        <circle cx="92" cy="232" r="9" fill={NAVY2} />
    </svg>
);

const Compare = () => (
    <svg viewBox="0 0 420 320" fill="none" className="w-full h-auto" role="img" aria-label="Easy comparisons">
        <rect width="420" height="320" rx="24" fill="#ECFEFF" />
        <Panel x={70} y={70} w={130} h={180} rx={16} stroke="#A5F3FC" />
        <Panel x={220} y={70} w={130} h={180} rx={16} stroke="#BFDBFE" />
        <rect x="90" y="92" width="90" height="40" rx="8" fill={NAVY} />
        <rect x="240" y="92" width="90" height="40" rx="8" fill={NAVY2} />
        <rect x="90" y="150" width="70" height="9" rx="4" fill="#CBD5E1" />
        <rect x="90" y="170" width="50" height="9" rx="4" fill="#E2E8F0" />
        <rect x="240" y="150" width="70" height="9" rx="4" fill="#CBD5E1" />
        <rect x="240" y="170" width="50" height="9" rx="4" fill="#E2E8F0" />
        <circle cx="135" cy="214" r="13" fill={ORANGE} />
        <path d="M129 214 l5 5 l9 -10" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="285" cy="214" r="13" fill="#CBD5E1" />
        <path d="M210 120 v80" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 5" />
    </svg>
);

const Student = () => (
    <svg viewBox="0 0 420 320" fill="none" className="w-full h-auto" role="img" aria-label="Student-first experience">
        <rect width="420" height="320" rx="24" fill="#FEF2F2" />
        <circle cx="210" cy="150" r="84" fill="#fff" stroke="#FBCFE8" />
        <g transform="translate(210 150)">
            <circle cx="0" cy="-18" r="26" fill={NAVY} />
            <path d="M-44 52 C-44 4 44 4 44 52 Z" fill={NAVY2} />
            <rect x="-36" y="-58" width="72" height="14" rx="3" fill={ORANGE} />
            <path d="M0 -70 L40 -58 L0 -46 L-40 -58 Z" fill={ORANGE} />
        </g>
        <path d="M150 96 c-6 -14 -28 -14 -28 2 c0 14 28 26 28 26 s28 -12 28 -26 c0 -16 -22 -16 -28 -2Z" fill="#FB7185" opacity="0.85" />
        <circle cx="318" cy="206" r="11" fill={ORANGE_L} />
        <rect x="300" y="84" width="40" height="10" rx="5" fill="#FBCFE8" />
    </svg>
);

const Vision = () => (
    <svg viewBox="0 0 480 300" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
            <radialGradient id="vz" cx="50%" cy="40%" r="70%">
                <stop offset="0" stopColor="#126094" />
                <stop offset="1" stopColor="#08243A" />
            </radialGradient>
        </defs>
        <rect width="480" height="300" fill="url(#vz)" />
        {Array.from({ length: 7 }).map((_, i) => (
            <circle key={i} cx={40 + i * 70} cy={150} r={120 - i * 4} fill="none" stroke="#ffffff" strokeOpacity="0.05" />
        ))}
        <circle cx="380" cy="70" r="46" fill={ORANGE} opacity="0.18" />
        <circle cx="90" cy="230" r="60" fill="#3B82F6" opacity="0.18" />
    </svg>
);

const Contact = () => (
    <svg viewBox="0 0 420 320" fill="none" className="w-full h-auto" role="img" aria-label="We are here to help">
        <rect width="420" height="320" rx="24" fill="#fff" fillOpacity="0.06" />
        <circle cx="210" cy="150" r="96" fill="#ffffff" fillOpacity="0.08" />
        <rect x="132" y="120" width="156" height="100" rx="16" fill="#fff" />
        <path d="M132 136 L210 184 L288 136" stroke={NAVY} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="300" cy="104" r="22" fill={ORANGE} />
        <path d="M291 104 l7 7 l12 -14" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="112" cy="220" r="12" fill={ORANGE_L} />
        <circle cx="320" cy="232" r="9" fill={BLUE_L} />
    </svg>
);

const REGISTRY: Record<string, () => ReactNode> = {
    scattered: Scattered,
    verified: Verified,
    updates: Updates,
    compare: Compare,
    student: Student,
    vision: Vision,
    contact: Contact,
};

const Illustration = ({ name, className = '' }: { name: string; className?: string }) => {
    const Art = REGISTRY[name] ?? Scattered;
    return <div className={className}><Art /></div>;
};

export default Illustration;
