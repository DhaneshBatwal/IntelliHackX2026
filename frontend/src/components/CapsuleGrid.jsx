import React from 'react';
import ProductCard from './ProductCard';
import { Shirt, Bookmark, ShieldAlert, Sparkles, CloudRain, Check, AlertCircle } from 'lucide-react';

export default function CapsuleGrid({
  capsule,
  targetBudget,
  onOpenRegretShield,
  onAddToWatchlist,
  onCheckConflicts,
  onSaveBoard,
  isSaving,
  isCheckingConflicts,
  plainLanguage
}) {
  if (!capsule || !capsule.items || capsule.items.length === 0) {
    return null;
  }

  const totalPrice = capsule.estimated_total_price || capsule.items.reduce((acc, it) => acc + (it.current_price || it.estimated_price || 0), 0);
  const budgetNum = targetBudget ? parseFloat(targetBudget) : 8000;
  const isUnderBudget = totalPrice <= budgetNum;
  const difference = Math.abs(budgetNum - totalPrice);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 my-8 space-y-6">
      
      {/* Capsule Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Title & Styling Reasoning */}
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-vibe-500/20 text-vibe-300 border border-vibe-500/30 text-xs font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {capsule.occasion || 'Coordinated 3-Piece Capsule'}
              </span>
              {capsule.weather_readiness && (
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-xs font-medium flex items-center gap-1.5">
                  <CloudRain className="w-3.5 h-3.5" />
                  {capsule.weather_readiness}
                </span>
              )}
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {capsule.capsule_title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {capsule.vibe_summary}
            </p>

            {/* Color Palette Swatches */}
            {capsule.color_palette && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-slate-400 font-mono">
                  {plainLanguage ? 'Color Scheme:' : 'Palette Harmony:'}
                </span>
                <div className="flex items-center gap-1.5">
                  {capsule.color_palette.map((hex, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-white/30 shadow-sm"
                      style={{ backgroundColor: hex }}
                      title={hex}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Pricing & Capsule Action Controls */}
          <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
            
            {/* Total vs Budget Box */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left lg:text-right min-w-[200px]">
              <span className="text-xs text-slate-400 block uppercase font-mono tracking-wider">
                {plainLanguage ? 'Total Look Price' : 'Capsule Total (3 Items)'}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                ₹{Math.round(totalPrice).toLocaleString('en-IN')}
              </div>
              <div className="text-xs mt-1 flex items-center gap-1 font-medium">
                {isUnderBudget ? (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> ₹{Math.round(difference).toLocaleString('en-IN')} Under Budget
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> ₹{Math.round(difference).toLocaleString('en-IN')} Over Budget
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* Conflict Checker Trigger */}
              <button
                onClick={onCheckConflicts}
                disabled={isCheckingConflicts}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-vibe-600/30 hover:bg-vibe-600/40 border border-vibe-500/40 text-vibe-200 text-xs font-semibold shadow-lg transition-all"
              >
                <Shirt className="w-4 h-4 text-vibe-300" />
                <span>
                  {isCheckingConflicts
                    ? 'Scanning Wardrobe...'
                    : (plainLanguage ? 'Check Duplicate Clothes' : 'Wardrobe Conflict Scan')}
                </span>
              </button>

              {/* Save Board Button */}
              <button
                onClick={onSaveBoard}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold shadow-lg transition-all"
              >
                <Bookmark className="w-4 h-4 text-indigo-400" />
                <span>{isSaving ? 'Saving...' : (plainLanguage ? 'Save Look' : 'Save Board')}</span>
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* 3-Item Capsule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capsule.items.map((item, index) => (
          <ProductCard
            key={item.id || index}
            item={item}
            index={index}
            onOpenRegretShield={onOpenRegretShield}
            onAddToWatchlist={onAddToWatchlist}
            plainLanguage={plainLanguage}
          />
        ))}
      </div>

    </section>
  );
}
