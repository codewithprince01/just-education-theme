'use client';

import { useEffect, useState } from 'react';
import { UserPlus, Check } from 'lucide-react';

// Follow an author (frontend only) — persists to localStorage.
export default function FollowButton({ authorSlug, authorName }: { authorSlug: string; authorName: string }) {
    const [following, setFollowing] = useState(false);

    useEffect(() => {
        try {
            const list: string[] = JSON.parse(localStorage.getItem('je-following') || '[]');
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFollowing(list.includes(authorSlug));
        } catch { /* ignore */ }
    }, [authorSlug]);

    function toggle() {
        setFollowing((v) => {
            const next = !v;
            try {
                const list: string[] = JSON.parse(localStorage.getItem('je-following') || '[]');
                const updated = next ? [...new Set([...list, authorSlug])] : list.filter((s) => s !== authorSlug);
                localStorage.setItem('je-following', JSON.stringify(updated));
            } catch { /* ignore */ }
            return next;
        });
    }

    return (
        <button
            onClick={toggle}
            aria-pressed={following}
            aria-label={following ? `Following ${authorName}` : `Follow ${authorName}`}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                following
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-[#F57C00] hover:bg-[#E67300] text-white'
            }`}
        >
            {following ? <><Check className="w-4 h-4" /> Following</> : <><UserPlus className="w-4 h-4" /> Follow</>}
        </button>
    );
}
