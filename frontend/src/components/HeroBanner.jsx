import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingDown, 
  ArrowRight, 
  ExternalLink, 
  ShoppingBag, 
  Zap, 
  Percent, 
  CheckCircle2,
  Clock,
  Tag,
  Copy,
  Check
} from 'lucide-react';
import { translations } from '../constants/translations';
import { MARKETPLACES } from '../constants/marketplaces';

export default function HeroBanner({
  currentUser,
  onOpenAuth,
  onSearchPreset,
  onCopyCoupon,
  language = 'en'
}) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 48, seconds: 14 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText("VIBESAVE10");
    setCopied(true);
    if (onCopyCoupon) onCopyCoupon("VIBESAVE10");
    setTimeout(() => setCopied(false), 2500);
  };

  const pad = (n) => String(n).padStart(2, '0');
  const t = translations[language] || translations.en;
  const userName = currentUser?.name ? currentUser.name.split(' ')[0] : t.guestUser;
  const linkedStores = currentUser?.linkedStores || {
    amazon: true,
    flipkart: true,
    myntra: true,
    croma: true
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-4 pb-2">
      <div className="relative rounded-2xl overflow-hidden border border-gray-300 shadow-md p-6 sm:p-8 bg-gradient-to-r from-[#131921] via-[#1C2633] to-[#232F3E] text-white">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Column: Personalized Greeting & Tagline */}
          <div className="space-y-3 max-w-2xl">
            
            {/* Storefront Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-[#FEBD69] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-[#FEBD69] text-[#FEBD69]" />
              <span>India's Universal Multi-Marketplace E-Commerce Hub</span>
            </div>

            {/* Title: Welcome [User Name] */}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {t.welcomeUser} <span className="text-[#FEBD69]">{userName}</span>!
            </h1>

            {/* Subtitle / Tagline: One product. Multiple shopping destinations. Better savings */}
            <p className="text-base sm:text-lg font-semibold text-gray-200 leading-snug">
              "{t.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {t.heroDealDesc}
            </p>

            {/* Connected Store Accounts Status Pills */}
            <div className="pt-1">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.connectedStores}:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {MARKETPLACES.slice(0, 6).map((store) => {
                  const isLinked = Boolean(linkedStores[store.id]);
                  return (
                    <div
                      key={store.id}
                      onClick={onOpenAuth}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium cursor-pointer transition-all ${
                        isLinked
                          ? 'bg-emerald-900/60 text-emerald-200 border-emerald-400/50'
                          : 'bg-white/10 text-gray-300 border-white/20 hover:border-white/40'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{store.shortName}</span>
                      <span className="text-[9px] opacity-80 font-mono">
                        ({isLinked ? 'Ready ✓' : '+ Link'})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Embedded Festival Deal & Coupon Strip */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold">
                <Zap className="w-3.5 h-3.5 fill-[#FEBD69]" />
                <span>Savings Festival Ends:</span>
                <span className="font-mono text-white bg-black/50 px-2 py-0.5 rounded border border-white/20">
                  {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 border border-amber-400/40 text-[#FEBD69] font-mono text-xs font-bold transition-all group"
                title="Click to copy coupon code"
              >
                <Tag className="w-3.5 h-3.5 text-[#FEBD69]" />
                <span>Coupon: <strong>VIBESAVE10</strong></span>
                {copied ? (
                  <span className="text-emerald-400 text-[10px] flex items-center gap-0.5 font-sans">
                    <Check className="w-3 h-3" /> Copied!
                  </span>
                ) : (
                  <Copy className="w-3 h-3 text-gray-300 group-hover:text-amber-300" />
                )}
              </button>
            </div>

          </div>

          {/* Right Column: AI Capsule Quick Presets Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-white/10 border border-white/20 space-y-3 shrink-0 lg:max-w-md w-full backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#FEBD69]" />
                <span>AI Vibe & Scenario Presets</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-[#FEBD69] font-bold">
                Gemini 3.8 Flash
              </span>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Curate a complete 3-piece look or setup with live prices across Amazon, Myntra, Croma & Flipkart:
            </p>

            <div className="space-y-1.5">
              <button
                onClick={() => onSearchPreset("Outfit for a monsoon wedding in Goa under ₹8,000", 8000)}
                className="w-full p-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 hover:border-amber-400/60 text-left text-xs text-white flex items-center justify-between transition-all group"
              >
                <span className="truncate">🌴 Goa Monsoon Wedding under ₹8,000</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FEBD69] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>

              <button
                onClick={() => onSearchPreset("Smart casual blazer outfit for office meetings under ₹7,000", 7000)}
                className="w-full p-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 hover:border-amber-400/60 text-left text-xs text-white flex items-center justify-between transition-all group"
              >
                <span className="truncate">💼 Tailored Smart Blazer & Chinos under ₹7,000</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FEBD69] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>

              <button
                onClick={() => onSearchPreset("Creator tech workstation desk setup under ₹35,000", 35000)}
                className="w-full p-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 hover:border-amber-400/60 text-left text-xs text-white flex items-center justify-between transition-all group"
              >
                <span className="truncate">🎧 Audio & Tech Workstation under ₹35,000</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FEBD69] group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
