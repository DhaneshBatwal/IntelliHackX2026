import React from 'react';
import { Filter, RotateCcw, Tag, Store, ShieldCheck, Zap, Star, X } from 'lucide-react';

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under1000', label: 'Under ₹1,000' },
  { id: '1000to3000', label: '₹1,000 – ₹3,000' },
  { id: '3000to10000', label: '₹3,000 – ₹10,000' },
  { id: 'above10000', label: 'Above ₹10,000' }
];

const STORES_LIST = [
  { id: 'amazon', name: 'Amazon.in' },
  { id: 'flipkart', name: 'Flipkart' },
  { id: 'myntra', name: 'Myntra' },
  { id: 'ajio', name: 'Ajio Luxe / Fashion' },
  { id: 'nykaa', name: 'Nykaa / Nykaa Man' },
  { id: 'croma', name: 'Croma Electronics' },
  { id: 'reliancedigital', name: 'Reliance Digital' },
  { id: 'tatacliq', name: 'Tata CLiQ' },
  { id: 'meesho', name: 'Meesho Wholesale' }
];

export default function FilterSidebar({
  isMobileOpen = false,
  onCloseMobile,
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
  onResetFilters
}) {
  const sidebarContent = (
    <div className="w-64 shrink-0 bg-white rounded-2xl p-5 shadow-sm border border-gray-200 text-gray-800 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2 font-bold text-sm text-gray-900">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Smart Filters</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetFilters}
            title="Reset Filters"
            className="text-xs flex items-center gap-1 text-gray-500 hover:text-amber-600 font-medium transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {isMobileOpen && onCloseMobile && (
            <button onClick={onCloseMobile} className="md:hidden text-gray-500 hover:text-gray-800">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
          <Tag className="w-3.5 h-3.5 text-amber-500" />
          <span>Price Range</span>
        </div>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-gray-950 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="priceRange"
                checked={selectedPriceRange === range.id}
                onChange={() => onSelectPriceRange(range.id)}
                className="w-4 h-4 accent-amber-500 cursor-pointer"
              />
              <span className={selectedPriceRange === range.id ? 'font-semibold text-gray-900' : ''}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Marketplaces */}
      <div className="space-y-2.5 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
          <Store className="w-3.5 h-3.5 text-amber-500" />
          <span>Marketplaces</span>
        </div>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {STORES_LIST.map((store) => (
            <label
              key={store.id}
              className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-gray-950 cursor-pointer select-none"
            >
              <input
                type="checkbox"
                checked={selectedStores.includes(store.id)}
                onChange={() => onToggleStore(store.id)}
                className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
              />
              <span>{store.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* AI Regret-Shield & Deal Quality */}
      <div className="space-y-2.5 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Trust & Deals</span>
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-gray-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={verifiedSellerOnly}
              onChange={onToggleVerifiedSeller}
              className="w-4 h-4 rounded accent-emerald-600 cursor-pointer"
            />
            <span>Verified Sellers Only</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-gray-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={onToggleInStock}
              className="w-4 h-4 rounded accent-emerald-600 cursor-pointer"
            />
            <span>In Stock & Fast Delivery</span>
          </label>

          <label className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-gray-950 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={buyNowCycleOnly}
              onChange={onToggleBuyNowCycle}
              className="w-4 h-4 rounded accent-amber-500 cursor-pointer"
            />
            <span className="inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Buy Now Cycle Deals
            </span>
          </label>
        </div>
      </div>

      {/* Minimum AI Regret-Shield Score */}
      <div className="space-y-2 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700">
          <Star className="w-3.5 h-3.5 text-amber-500" />
          <span>Min AI Score</span>
        </div>
        <select
          value={minRegretScore}
          onChange={(e) => onSelectMinRegretScore(Number(e.target.value))}
          className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-amber-500"
        >
          <option value={0}>All AI Scores</option>
          <option value={8}>8.0+ Safe Buy</option>
          <option value={8.5}>8.5+ High Durability</option>
          <option value={9}>9.0+ Top Rated Only</option>
        </select>
      </div>
    </div>
  );

  if (isMobileOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 flex justify-start md:hidden">
        <div className="bg-white h-full overflow-y-auto p-4">{sidebarContent}</div>
      </div>
    );
  }

  return <div className="hidden md:block">{sidebarContent}</div>;
}
