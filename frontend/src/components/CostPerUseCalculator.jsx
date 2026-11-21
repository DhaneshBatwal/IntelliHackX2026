import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingDown, Clock, ShieldCheck } from 'lucide-react';

export default function CostPerUseCalculator({ initialPrice = 2499, defaultLifespan = 18, plainLanguage }) {
  const [price, setPrice] = useState(initialPrice);
  const [wearsPerMonth, setWearsPerMonth] = useState(3);
  const [lifespanMonths, setLifespanMonths] = useState(defaultLifespan);

  const totalWears = Math.max(1, wearsPerMonth * lifespanMonths);
  const costPerUse = (price / totalWears).toFixed(1);

  // Classification
  let badgeColor = "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
  let verdictText = "High-Value Long-Term Investment";
  if (costPerUse > 150) {
    badgeColor = "bg-rose-500/20 text-rose-300 border-rose-500/30";
    verdictText = "High Cost-Per-Wear / Occasion Piece";
  } else if (costPerUse > 60) {
    badgeColor = "bg-amber-500/20 text-amber-300 border-amber-500/30";
    verdictText = "Balanced Everyday Purchase";
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/80 border border-white/10 space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-vibe-500/20 text-vibe-300">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-white text-xs sm:text-sm">
              {plainLanguage ? 'Cost Per Wear Calculator' : 'Cost-Per-Use (CPU) Durability Model'}
            </h4>
            <p className="text-[11px] text-slate-400">
              {plainLanguage ? 'See how cheap this gets the more you wear it.' : 'Measures actual value based on wear frequency & fabric durability.'}
            </p>
          </div>
        </div>

        {/* Live Calculated Metric */}
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-extrabold text-vibe-300">
            ₹{costPerUse}<span className="text-xs text-slate-400 font-normal"> / wear</span>
          </div>
          <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold border ${badgeColor}`}>
            {verdictText}
          </span>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-3 pt-1">
        
        {/* Wears Per Month */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-300">
            <span>{plainLanguage ? 'How often will you wear this?' : 'Wear Frequency:'}</span>
            <span className="font-bold text-white font-mono">{wearsPerMonth} times / month</span>
          </div>
          <input
            type="range"
            min="1"
            max="15"
            value={wearsPerMonth}
            onChange={(e) => setWearsPerMonth(Number(e.target.value))}
            className="w-full accent-vibe-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>

        {/* Durability Lifespan */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-300">
            <span>{plainLanguage ? 'How many months will it last?' : 'Durability Lifespan:'}</span>
            <span className="font-bold text-white font-mono">{lifespanMonths} months (~{Math.round(lifespanMonths/12 * 10)/10} yrs)</span>
          </div>
          <input
            type="range"
            min="3"
            max="48"
            value={lifespanMonths}
            onChange={(e) => setLifespanMonths(Number(e.target.value))}
            className="w-full accent-vibe-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
          />
        </div>

      </div>

      {/* Summary Note */}
      <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-vibe-400" />
          <span>Expected Total Wears: <strong className="text-slate-200">{totalWears} times</strong></span>
        </span>
        <span className="text-emerald-400 font-medium">
          ₹{Math.round(price)} total purchase
        </span>
      </div>

    </div>
  );
}
