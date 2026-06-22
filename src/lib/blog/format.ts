// Pure formatting helpers. No runtime clock is used at module scope so
// output is deterministic across server and client renders.

/** Format an ISO date string as e.g. "12 Jun 2026". */
export function formatDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    });
}

/** Compact view/like counts: 1234 -> "1.2K", 1500000 -> "1.5M". */
export function formatCount(n: number): string {
    if (n < 1000) return String(n);
    if (n < 1_000_000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
    return `${(n / 1_000_000).toFixed(1)}M`;
}

/**
 * Relative time vs. a reference instant. The reference is passed in (default
 * matches the app's "today", 2026-06-20) so output is stable in SSR.
 */
export function timeAgo(iso: string, now: number = Date.parse('2026-06-20T12:00:00.000Z')): string {
    const diff = now - new Date(iso).getTime();
    const day = 86_400_000;
    const days = Math.floor(diff / day);
    if (days <= 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} week${days < 14 ? '' : 's'} ago`;
    if (days < 365) return `${Math.floor(days / 30)} month${days < 60 ? '' : 's'} ago`;
    return `${Math.floor(days / 365)} year${days < 730 ? '' : 's'} ago`;
}

/** Estimate reading time from a word count at ~225 wpm. */
export function readingTimeFromWords(words: number): number {
    return Math.max(1, Math.round(words / 225));
}

/** Turn arbitrary text into a URL-safe slug (used for TOC anchors etc.). */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

/** Title-case a slug for display when no name is available. */
export function humanizeSlug(slug: string): string {
    return slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}
