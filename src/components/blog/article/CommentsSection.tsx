'use client';

import { useMemo, useState } from 'react';
import { MessageCircle, ThumbsUp, Send } from 'lucide-react';
import type { Comment } from '@/data/blog/types';
import { formatDate } from '@/lib/blog/format';

interface CommentsSectionProps {
    slug: string;
    initialComments: Comment[];
}

type SortMode = 'newest' | 'popular';

// Comments are client-side only in this frontend build: new comments and likes
// live in component state (ready to swap for a real API later).
export default function CommentsSection({ initialComments }: CommentsSectionProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [liked, setLiked] = useState<Record<string, boolean>>({});
    const [sort, setSort] = useState<SortMode>('newest');

    const sortedComments = useMemo(() => {
        const arr = [...comments];
        if (sort === 'popular') {
            return arr.sort((a, b) => (b.likes + (liked[b.id] ? 1 : 0)) - (a.likes + (liked[a.id] ? 1 : 0)));
        }
        return arr.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    }, [comments, sort, liked]);

    function addComment(e: React.FormEvent) {
        e.preventDefault();
        if (!text.trim()) return;
        const comment: Comment = {
            id: `local-${comments.length + 1}-${text.length}`,
            author: name.trim() || 'Guest',
            date: '2026-06-20T12:00:00.000Z',
            text: text.trim(),
            likes: 0,
        };
        setComments((c) => [comment, ...c]);
        setName('');
        setText('');
    }

    function like(id: string) {
        setLiked((l) => ({ ...l, [id]: !l[id] }));
    }

    return (
        <section className="bg-white rounded-xl border border-gray-200 shadow-md p-6">
            <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="flex items-center gap-2 text-xl font-extrabold text-[#0B3C5D]">
                    <MessageCircle className="w-5 h-5 text-[#F57C00]" /> Comments
                    <span className="text-sm font-semibold text-gray-400">({comments.length})</span>
                </h2>
                <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-0.5">
                    {(['newest', 'popular'] as SortMode[]).map((m) => (
                        <button
                            key={m}
                            onClick={() => setSort(m)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${sort === m ? 'bg-white text-[#0B3C5D] shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                        >
                            {m === 'newest' ? 'Newest' : 'Top'}
                        </button>
                    ))}
                </div>
            </div>

            {/* New comment form */}
            <form onSubmit={addComment} className="mb-6 space-y-3">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name (optional)"
                    aria-label="Your name"
                    className="w-full sm:w-64 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#F57C00]"
                />
                <div className="flex gap-3 items-start">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Share your thoughts…"
                        aria-label="Comment"
                        rows={3}
                        className="flex-1 px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-[#F57C00] resize-y"
                    />
                </div>
                <button
                    type="submit"
                    disabled={!text.trim()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F57C00] hover:bg-[#E67300] disabled:opacity-50 text-white font-bold rounded-lg text-sm transition-colors"
                >
                    <Send className="w-4 h-4" /> Post comment
                </button>
            </form>

            {/* Comment list */}
            <ul className="space-y-5">
                {sortedComments.map((c) => (
                    <li key={c.id} className="flex gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#0B3C5D] text-white flex items-center justify-center font-bold flex-shrink-0">
                            {c.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 text-sm">{c.author}</span>
                                <span className="text-xs text-gray-400">{formatDate(c.date)}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{c.text}</p>
                            <button
                                onClick={() => like(c.id)}
                                className={`inline-flex items-center gap-1.5 text-xs mt-2 font-semibold ${liked[c.id] ? 'text-[#F57C00]' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                <ThumbsUp className={`w-3.5 h-3.5 ${liked[c.id] ? 'fill-[#F57C00] text-[#F57C00]' : ''}`} />
                                {c.likes + (liked[c.id] ? 1 : 0)}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}
