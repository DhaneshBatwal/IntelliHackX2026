import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Sparkles, SlidersHorizontal, ArrowUpDown, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { translations } from '../constants/translations';

export default function ProductGrid({
  products,
  onOpenQuickView,
  onAddToCart,
  cartItemIds = [],
  onOpenMobileFilters,
  activeFilterSummary = '',
  language = 'en'
}) {
  const [sortBy, setSortBy] = useState('relevance');
  const [hideSponsored, setHideSponsored] = useState(true);
  const t = translations[language] || translations.en;

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'priceLow') {
      const priceA = a.true_landed_price?.total || a.current_price || a.estimated_price || 0;
      const priceB = b.true_landed_price?.total || b.current_price || b.estimated_price || 0;
      return priceA - priceB;
    }
    if (sortBy === 'priceHigh') {
      const priceA = a.true_landed_price?.total || a.current_price || a.estimated_price || 0;
      const priceB = b.true_landed_price?.total || b.current_price || b.estimated_price || 0;
      return priceB - priceA;
    }
    if (sortBy === 'score') {
      return (b.regret_score || 8.5) - (a.regret_score || 8.5);
    }
    if (sortBy === 'costPerUse') {
      return (a.cost_per_wear || 50) - (b.cost_per_wear || 50);
    }
    if (sortBy === 'rating') {
      return (b.rating || 4.0) - (a.rating || 4.0);
    }
    return 0; // relevance
  });

  return (
    <div className="flex-1 min-w-0 space-y-4">
      
      {/* Top Bar: Results Count, Zero-Ad Clutter Switch & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-xl border border-gray-200 text-xs bg-white shadow-sm">
        
        <div className="flex items-center gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={onOpenMobileFilters}
            className="flex lg:hidden items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-800 font-bold text-xs border border-gray-300 active:scale-95"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-700" />
            <span>Filters</span>
          </button>

          <div>
            <span className="font-bold text-gray-900 text-sm">
              {products.length} {t.resultsCount || "Products"}
            </span>
            {activeFilterSummary && (
              <span className="text-gray-500 ml-2 text-xs hidden sm:inline">
                in <strong className="text-gray-800">{activeFilterSummary}</strong>
              </span>
            )}
          </div>
        </div>

        {/* Right Controls: Zero-Ads Toggle + Sort Dropdown */}
        <div className="flex flex-wrap items-center gap-3 self-end sm:self-auto">
          
          {/* Zero Sponsored Ad Clutter Toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1.5 rounded-lg border border-emerald-200 text-emerald-800 transition-colors">
            <input
              type="checkbox"
              checked={hideSponsored}
              onChange={(e) => setHideSponsored(e.target.checked)}
              className="accent-emerald-600 rounded w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{t.zeroAdsToggle}</span>
            </span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-gray-600 text-xs hidden md:flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-500" />
              <span>{t.sortBy}:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 font-semibold focus:outline-none focus:border-amber-500 cursor-pointer shadow-sm"
            >
              <option value="relevance">{t.sortRelevance || "Best Match"}</option>
              <option value="priceLow">True Landed Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="score">Highest Regret-Shield™ Trust</option>
              <option value="costPerUse">Best Cost-Per-Use Value</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>

        </div>

      </div>

      {/* 4-Column Product Grid (2 columns on mobile) */}
      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl p-8 space-y-3 bg-white border border-gray-200 shadow-sm">
          <p className="text-base font-bold text-gray-900">
            No products match your active filters.
          </p>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Try adjusting your price range, clearing store filters, or searching an everyday essential like "Toor Dal", "Mixer Grinder", "Blazer", or "Earbuds".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {sortedProducts.map((item, index) => (
            <ProductCard
              key={item.id || index}
              item={item}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={onAddToCart}
              isInCart={cartItemIds.includes(item.id)}
              language={language}
            />
          ))}
        </div>
      )}

    </div>
  );
}
