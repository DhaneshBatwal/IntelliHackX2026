import React from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Coins, 
  Sparkles, 
  Store, 
  CheckCircle2, 
  Layers, 
  TrendingDown, 
  Award,
  Globe2
} from 'lucide-react';
import { translations } from '../constants/translations';
import { MARKETPLACES } from '../constants/marketplaces';

export default function AboutUs({ language = 'en' }) {
  const t = translations[language] || translations.en;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-10 animate-fade-in text-gray-900">
      
      {/* Hero Header */}
      <div className="p-8 sm:p-12 rounded-2xl border border-gray-200 text-center space-y-4 max-w-4xl mx-auto bg-white shadow-sm">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>About VibeCart AI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          "{t.aboutUsMission}"
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          {t.aboutUsStory}
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1 */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            {t.pillar1Title}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.pillar1Desc}
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            {t.pillar2Title}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.pillar2Desc}
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-2xl bg-white border border-gray-200 space-y-3 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            {t.pillar3Title}
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            {t.pillar3Desc}
          </p>
        </div>

      </div>

      {/* Marketplaces Covered Banner */}
      <div className="p-8 rounded-2xl bg-white border border-gray-200 space-y-6 shadow-sm">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-extrabold text-gray-900">
            Aggregating 12+ Major Marketplaces Across India
          </h3>
          <p className="text-xs text-gray-600">
            One clean search queries all these shopping destinations in parallel:
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {MARKETPLACES.map((m) => (
            <div
              key={m.id}
              className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-center flex flex-col items-center justify-center gap-1 group hover:border-amber-400 transition-all hover:bg-white hover:shadow-sm"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shadow-sm"
                style={{ backgroundColor: `${m.color}20`, color: m.color }}
              >
                {m.shortName[0]}
              </div>
              <span className="text-xs font-bold text-gray-900 mt-1">
                {m.shortName}
              </span>
              <span className="text-[9px] text-gray-500 font-mono">
                Verified Direct
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
