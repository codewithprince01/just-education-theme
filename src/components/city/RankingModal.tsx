import { Award, X } from 'lucide-react';
import { CollegeInCity } from '@/data/cityData';
import { getRankingsDetails } from './cityHelpers';

interface RankingModalProps {
  college: CollegeInCity;
  cityName: string;
  cityState: string;
  onClose: () => void;
}

export default function RankingModal({ college, cityName, cityState, onClose }: RankingModalProps) {
  const rankingsList = getRankingsDetails(college, cityName);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a2540]/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden z-10 animate-fade-in border border-gray-100 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0a2540] to-[#1a5276] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
          <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider mb-1">Accreditation & Rankings</div>
          <h3 className="text-xl font-bold leading-snug pr-8">{college.name}</h3>
          <p className="text-xs text-blue-200/80 mt-1">{cityName}, {cityState}</p>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {rankingsList.map((rankItem, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3 bg-gray-50 hover:bg-blue-50/30 rounded-2xl border border-gray-150 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                <Award className="text-blue-600" size={20} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-gray-800 text-sm truncate">{rankItem.agency}</h4>
                  <span className="text-[9px] bg-blue-100/70 text-blue-700 px-2 py-0.5 rounded-md font-bold uppercase shrink-0">{rankItem.year}</span>
                </div>
                <div className="text-[#0a2540] font-black text-[15px] mt-1">{rankItem.rank}</div>
                <div className="text-[11px] text-gray-400 font-semibold mt-0.5">{rankItem.category}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Verified 2026</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/10 cursor-pointer transition-all"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
