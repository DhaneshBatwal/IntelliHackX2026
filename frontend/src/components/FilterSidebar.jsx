import React from 'react';
import { Filter, RotateCcw, Check, ShieldCheck, Tag, DollarSign, Store, Zap } from 'lucide-react';
import { translations } from '../constants/translations';
import { MARKETPLACES } from '../constants/marketplaces';

export default function FilterSidebar({
  selectedPriceRange,
  onSelectPriceRange,
  selectedStores,
  onToggleStore,
  minRegretScore,
  onSelectMinRegretScore,
  verifiedSellerOnly,
  onToggleVerifiedSeller,
  inStockOnly,
  onToggleInStock,
  buyNowCycleOnly,
  onToggleBuyNowCycle,
  onResetFilters,
  language = 'en',
  isMobileOpen = false,
  onCloseMobile
}) {
  const t = translations[language] || translations.en;

  const PRICE_OPTIONS = [
    { id: 'all', labelKey: 'allPrices' },
    { id: 'under1000', labelKey: 'under1000' },
    { id: '1000to3000', labelKey: 'from1000to3000' },
    { id: '3000to10000', labelKey: 'from3000to10000' },
    { id: 'above10000', labelKey: 'above10000' },
  ];

  const content = (
    <div className="space-y-6 text-xs text-gray-800">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
          <Filter className="w-4 h-4 text-amber-600" />
          <span>{t.filterTitle}</span>
        </div>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-amber-600 transition-colors font-medium"
          title="Reset all filters"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{t.clearFilters}</span>
        </button>
      </div>

      {/* 1. Price Range */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-amber-600" />
          <span>{t.priceRange}</span>
        </h4>
        <div className="space-y-1.5">
          {PRICE_OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900 group"
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === opt.id}
                onChange={() => onSelectPriceRange(opt.id)}
                className="accent-amber-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span className={`text-xs ${selectedPriceRange === opt.id ? 'text-amber-700 font-bold' : ''}`}>
                {t[opt.labelKey]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. All Marketplaces Filter (Multi-select) */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <Store className="w-3.5 h-3.5 text-amber-600" />
          <span>{t.marketplaces}</span>
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 scrollbar-none">
          {MARKETPLACES.map((store) => {
            const isChecked = selectedStores.includes(store.id);
            return (
              <label
                key={store.id}
                className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleStore(store.id)}
                  className="accent-amber-500 rounded w-3.5 h-3.5 cursor-pointer"
                />
                <span className={`text-xs ${isChecked ? 'text-gray-900 font-bold' : ''}`}>
                  {store.name}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Authenticity & Trust Filters */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-gray-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>{t.authenticityTrust}</span>
        </h4>
        <div className="space-y-2">
          
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900">
            <input
              type="checkbox"
              checked={verifiedSellerOnly}
              onChange={(e) => onToggleVerifiedSeller(e.target.checked)}
              className="accent-emerald-600 rounded w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-xs">{t.verifiedSellerOnly}</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStock(e.target.checked)}
              className="accent-emerald-600 rounded w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-xs">{t.inStockOnly}</span>
          </label>

          {/* Buy Now Cycle Deals Only */}
          <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-gray-900">
            <input
              type="checkbox"
              checked={buyNowCycleOnly}
              onChange={(e) => onToggleBuyNowCycle(e.target.checked)}
              className="accent-amber-500 rounded w-3.5 h-3.5 cursor-pointer"
            />
            <span className="text-xs flex items-center gap-1 text-amber-700 font-bold">
              <Zap className="w-3 h-3 text-amber-600 fill-amber-600" />
              <span>{t.buyNowCycleOnly}</span>
            </span>
          </label>

          {/* Min Regret-Shield Score */}
          <div className="pt-1 space-y-1">
            <span className="text-[11px] text-gray-600 block">{t.minRegretScore}:</span>
            <select
              value={minRegretScore}
              onChange={(e) => onSelectMinRegretScore(Number(e.target.value))}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-xs text-gray-800 focus:outline-none focus:border-amber-500 shadow-sm"
            >
              <option value="0">All Ratings</option>
              <option value="8.0">80%+ (High Confidence)</option>
              <option value="9.0">90%+ (Exceptional Fit)</option>
            </select>
          </div>

        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 p-5 rounded-xl bg-white border border-gray-200 shadow-sm h-fit sticky top-24">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-72 max-w-[80vw] h-full bg-white border-r border-gray-200 p-5 overflow-y-auto shadow-2xl">
            <div className="flex justify-end mb-2">
              <button
                onClick={onCloseMobile}
                className="p-1 text-gray-500 hover:text-gray-900 font-bold text-xs"
              >
                ✕ Close
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
