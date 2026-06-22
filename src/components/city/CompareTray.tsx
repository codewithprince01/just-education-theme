import { X } from 'lucide-react';

interface CompareTrayProps {
  count: number;
  onCompareNow: () => void;
  onClear: () => void;
}

export default function CompareTray({ count, onCompareNow, onClear }: CompareTrayProps) {
  if (count === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0a2540] text-white px-6 py-4 rounded-2xl shadow-2xl border border-blue-900/50 flex items-center gap-6 animate-slide-up max-w-[90vw] md:max-w-xl">
      <div className="flex items-center gap-2.5">
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black">
          {count}
        </div>
        <span className="text-xs md:text-sm font-semibold">
          Institution{count > 1 ? 's' : ''} selected to compare
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onCompareNow}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/10 cursor-pointer"
        >
          Compare Now
        </button>
        <button
          onClick={onClear}
          className="p-2 bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-xl transition-colors cursor-pointer"
          title="Clear selection"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
