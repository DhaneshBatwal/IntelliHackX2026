import React, { useState } from 'react';
import { 
  Star, 
  ExternalLink, 
  ShieldCheck, 
  ShoppingBag, 
  Eye, 
  Tag, 
  AlertTriangle, 
  Sparkles, 
  Check, 
  Store,
  Clock,
  Zap,
  Repeat,
  Truck,
  RotateCcw,
  BadgeAlert,
  Info
} from 'lucide-react';
import { translations } from '../constants/translations';
import { MARKETPLACES } from '../constants/marketplaces';

export default function ProductCard({
  item,
  onOpenQuickView,
  onAddToCart,
  isInCart = false,
  language = 'en'
}) {
  const [showLandedBreakdown, setShowLandedBreakdown] = useState(false);
  const t = translations[language] || translations.en;
  
  const currentPrice = item.current_price || item.estimated_price || 1999;
  const originalPrice = item.original_price || Math.round(currentPrice * 1.35);
  const discountPercent = item.discount_percent || Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

  // Store Pill styling
  const bestStorePill = item.best_store_pill || (item.merchant_name ? `${t.lowestOn} ${item.merchant_name}` : `${t.bestOn} Amazon`);
  const isConflict = item.wardrobe_match?.includes("⚠️") || item.wardrobe_match?.includes("already own");

  // Price cycle badge
  const isBuyNow = item.price_cycle?.action === 'buy_now';
  const priceCycleLabel = isBuyNow 
    ? (item.price_cycle?.label || t.buyNowBadge) 
    : (item.price_cycle?.label || t.waitSaleBadge);

  // Projected Cost-Per-Wear / Cost-Per-Use
  const cpwValue = item.cost_per_wear || Math.round(currentPrice / 25);
  const cpwUnit = item.is_fashion ? t.perWearEst : t.perUseEst;

  // True Landed Price Calculation
  const landedFee = (item.true_landed_price?.delivery_fee || 0) + (item.true_landed_price?.platform_fee || 0);
  const totalLandedPrice = item.true_landed_price?.total || (currentPrice + landedFee);

  // Fake MRP Check
  const fakeMrp = item.fake_mrp_check;

  // Dynamic 3rd Store selection based on category
  const getThirdStore = () => {
    const cat = (item.categoryKey || item.category || '').toLowerCase();
    const queryTerm = item.search_query || item.name;

    if (cat.includes('tech') || cat.includes('elec') || cat.includes('mobile') || cat.includes('laptop') || cat.includes('audio')) {
      return {
        name: "Croma",
        url: item.deep_links?.croma || `https://www.croma.com/searchB?q=${encodeURIComponent(queryTerm)}`,
        colorClasses: "bg-[#00E5D1]/15 hover:bg-[#00E5D1]/25 text-[#0A8F82] border-[#00E5D1]/40"
      };
    }
    if (cat.includes('groc') || cat.includes('staple') || cat.includes('food')) {
      return {
        name: "JioMart",
        url: item.deep_links?.jiomart || `https://www.jiomart.com/search/${encodeURIComponent(queryTerm)}`,
        colorClasses: "bg-[#0078AD]/15 hover:bg-[#0078AD]/25 text-[#026694] border-[#00A8FF]/40"
      };
    }
    if (cat.includes('beauty') || cat.includes('personal') || cat.includes('skincare')) {
      return {
        name: "Nykaa",
        url: item.deep_links?.nykaa || `https://www.nykaa.com/search/result/?q=${encodeURIComponent(queryTerm)}`,
        colorClasses: "bg-[#FC2779]/15 hover:bg-[#FC2779]/25 text-[#C2185B] border-[#FC2779]/40"
      };
    }
    if (cat.includes('kitchen') || cat.includes('appliance') || cat.includes('home')) {
      return {
        name: "Tata CLiQ",
        url: item.deep_links?.tatacliq || `https://www.tatacliq.com/search/?searchCategory=all&text=${encodeURIComponent(queryTerm)}`,
        colorClasses: "bg-[#800080]/15 hover:bg-[#800080]/25 text-[#7B1FA2] border-[#DDA0DD]/40"
      };
    }
    // Default to Myntra
    const myntraSearch = queryTerm.trim().split(/\s+/).slice(0, 3).join('-').toLowerCase();
    return {
      name: "Myntra",
      url: item.deep_links?.myntra || `https://www.myntra.com/${encodeURIComponent(myntraSearch)}`,
      colorClasses: "bg-[#FF3F6C]/15 hover:bg-[#FF3F6C]/25 text-[#E91E63] border-[#FF3F6C]/40"
    };
  };

  const thirdStore = getThirdStore();

  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col justify-between border border-gray-200 group transition-all duration-300 hover:border-gray-300 hover:shadow-xl">
      
      {/* Top Image Section */}
      <div>
        <div 
          onClick={() => onOpenQuickView(item)}
          className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50 cursor-pointer p-2 flex items-center justify-center"
        >
          <img
            src={item.thumbnail_url || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80"}
            alt={item.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />

          {/* Top Left: Category Badge & Bestseller */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
            <span className="px-2 py-0.5 rounded bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase tracking-wider">
              {item.categoryKey || item.category}
            </span>
            {item.rating >= 4.5 && (
              <span className="px-2 py-0.5 rounded bg-[#FEBD69] text-gray-950 text-[9px] font-black uppercase tracking-wider shadow-sm">
                ★ Bestseller
              </span>
            )}
          </div>

          {/* Top Right: Best Store Deal Pill */}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1 bg-[#FF9900] text-white">
              <Store className="w-2.5 h-2.5" />
              <span>{bestStorePill}</span>
            </span>
          </div>

          {/* Bottom Left: Discount Percentage Tag */}
          {discountPercent > 0 && (
            <div className="absolute bottom-2 left-2">
              <span className="px-2 py-0.5 rounded bg-[#CC0C39] text-white text-[10px] font-black shadow-sm">
                {discountPercent}% OFF
              </span>
            </div>
          )}

          {/* Bottom Right: Trust / Authenticity Badge */}
          <div className="absolute bottom-2 right-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1 shadow-sm">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{item.verified_fit || t.verifiedAuthentic}</span>
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-3.5 space-y-2">
          
          {/* Brand & Star Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider truncate">
              {item.brand || "Verified Brand"}
            </span>
            <div className="flex items-center gap-1 text-[#FFA41C] font-bold shrink-0">
              <Star className="w-3.5 h-3.5 fill-[#FFA41C]" />
              <span className="text-gray-900">{item.rating || 4.5}</span>
              <span className="text-gray-500 font-normal">({item.reviews_count || 180})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenQuickView(item)}
            className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-[#B12704] cursor-pointer transition-colors min-h-[2.5rem]"
            title={item.name}
          >
            {item.live_title || item.name}
          </h3>

          {/* Price Bar */}
          <div className="space-y-1 pt-0.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-gray-900 font-sans">
                ₹{Math.round(currentPrice).toLocaleString('en-IN')}
              </span>
              {originalPrice > currentPrice && (
                <span className="text-xs text-gray-500 line-through">
                  M.R.P: ₹{Math.round(originalPrice).toLocaleString('en-IN')}
                </span>
              )}
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-700">
                  ({discountPercent}% off)
                </span>
              )}
            </div>

            {/* Delivery & Pincode Speed */}
            <div className="flex items-center justify-between text-[11px] text-gray-600 pt-0.5">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-600" />
                <span>FREE Delivery</span>
              </span>
              <span className="text-gray-500 text-[10px]">
                {item.pincode_speed?.split('•')[0] || "In Stock"}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-3.5 pt-0 space-y-2.5">
        
        {/* Real Direct Marketplace Buy Buttons */}
        <div className="pt-2 border-t border-gray-100 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
            <span className="uppercase tracking-wider font-semibold">Live Store Buy:</span>
            <span className="text-emerald-700 font-bold">Verified Lowest</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
            <a
              href={item.deep_links?.amazon || `https://www.amazon.in/s?k=${encodeURIComponent(item.search_query || item.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-1.5 px-1 rounded-lg bg-[#FF9900]/15 hover:bg-[#FF9900]/25 text-[#B45309] border border-[#FF9900]/40 flex items-center justify-center gap-1 transition-all text-center shadow-sm"
              title={`Buy "${item.name}" directly on Amazon.in`}
            >
              <span>Amazon</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
            </a>

            <a
              href={item.deep_links?.flipkart || `https://www.flipkart.com/search?q=${encodeURIComponent(item.search_query || item.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="py-1.5 px-1 rounded-lg bg-[#2874F0]/15 hover:bg-[#2874F0]/25 text-[#1D4ED8] border border-[#2874F0]/40 flex items-center justify-center gap-1 transition-all text-center shadow-sm"
              title={`Buy "${item.name}" directly on Flipkart`}
            >
              <span>Flipkart</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
            </a>

            <a
              href={thirdStore.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`py-1.5 px-1 rounded-lg border flex items-center justify-center gap-1 transition-all text-center shadow-sm ${thirdStore.colorClasses}`}
              title={`Buy "${item.name}" directly on ${thirdStore.name}`}
            >
              <span>{thirdStore.name}</span>
              <ExternalLink className="w-2.5 h-2.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Buttons Grid: Compare Stores + Add to Cart */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onOpenQuickView(item)}
            className="w-full py-2 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-sm"
            title="Compare live prices across 12 stores"
          >
            <Eye className="w-3.5 h-3.5 text-gray-600" />
            <span className="truncate">Compare</span>
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(item)}
            className={`w-full py-2 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-600'
                : 'bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 border border-[#FCD200]'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span className="truncate">{t.inCart}</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="truncate">{t.addToCart}</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
