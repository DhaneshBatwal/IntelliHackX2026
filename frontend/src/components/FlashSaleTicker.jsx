import React, { useState, useEffect } from 'react';
import { Zap, Clock, Tag, Copy, Check, Sparkles, ChevronRight } from 'lucide-react';

export default function FlashSaleTicker({ onApplyCoupon, onCopyCode }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 48,
    seconds: 14
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText("VIBESAVE10");
    setCopied(true);
    if (onCopyCode) onCopyCode("VIBESAVE10");
    setTimeout(() => setCopied(false), 2500);
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-3 pb-1">
      <div className="relative rounded-xl overflow-hidden bg-[#FFF8E7] border border-[#FCD200] p-3 sm:p-3.5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 text-gray-900">
        
        {/* Left: Ticker Title & Countdown */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FEBD69] text-gray-950 flex items-center justify-center font-black shrink-0 shadow-sm">
            <Zap className="w-4 h-4 fill-gray-950" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-extrabold text-gray-900 text-xs sm:text-sm tracking-tight flex items-center gap-1.5">
              <span>Great Indian Savings Festival</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#CC0C39] text-white font-mono font-bold uppercase">
                Live Deals
              </span>
            </span>

            {/* Countdown Clock */}
            <div className="flex items-center gap-1 font-mono text-xs font-black text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-300 shadow-xs">
              <Clock className="w-3 h-3 text-[#B12704]" />
              <span>Ends in: {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s</span>
            </div>
          </div>
        </div>

        {/* Center: Offer Details */}
        <div className="text-center md:text-left text-xs text-gray-700 hidden xl:block font-medium">
          Multi-store split routing unlocks up to <strong className="text-emerald-800 font-bold">42% real savings</strong> across Amazon, Myntra & Flipkart!
        </div>

        {/* Right: Coupon Code Action */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-gray-600 hidden sm:inline">Use code:</span>
          
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#FEBD69] text-gray-900 font-mono text-xs font-bold hover:bg-amber-50 transition-all active:scale-95 group shadow-xs"
            title="Click to copy coupon code"
          >
            <Tag className="w-3 h-3 text-[#B45309]" />
            <span>VIBESAVE10</span>
            {copied ? (
              <span className="text-emerald-700 flex items-center gap-0.5 text-[10px]">
                <Check className="w-3 h-3" /> Copied!
              </span>
            ) : (
              <Copy className="w-3 h-3 text-gray-400 group-hover:text-gray-900" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
