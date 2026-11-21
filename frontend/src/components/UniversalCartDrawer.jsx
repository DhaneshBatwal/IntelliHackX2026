import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Bookmark, 
  IndianRupee,
  ShieldAlert,
  ArrowRight,
  Layers,
  Store,
  Tag,
  Check,
  TrendingDown,
  Percent,
  Clock,
  Lock,
  Unlock,
  ShieldCheck,
  HeartCrack
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { translations } from '../constants/translations';
import { MARKETPLACES } from '../constants/marketplaces';

export default function UniversalCartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onRemoveItem,
  onClearCart,
  budgetCap = 15000,
  onSaveAsBoard,
  onAwardVibeCoins,
  onRecordSplitSavings,
  onAvoidImpulseBuy,
  onOpenCheckoutModal,
  conflictReport,
  language = 'en'
}) {
  const [isCompletedPurchase, setIsCompletedPurchase] = useState(false);
  const [activeTab, setActiveTab] = useState('split'); // 'split' | 'all'
  // 24-Hour Impulse Cool-Off State (Map of item ID -> locked timestamp)
  const [coolOffLocks, setCoolOffLocks] = useState(() => {
    try {
      const saved = localStorage.getItem('vibecart_cooloff_locks');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [lastAvoidedItem, setLastAvoidedItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('vibecart_cooloff_locks', JSON.stringify(coolOffLocks));
  }, [coolOffLocks]);

  const t = translations[language] || translations.en;

  if (!isOpen) return null;

  const toggleCoolOffLock = (itemId) => {
    setCoolOffLocks(prev => {
      const next = { ...prev };
      if (next[itemId]) {
        delete next[itemId];
      } else {
        // Lock for 24 hours from now
        next[itemId] = Date.now() + 24 * 60 * 60 * 1000;
      }
      return next;
    });
  };

  const handleSkipImpulseBuy = (item) => {
    const itemCost = (item.current_price || item.estimated_price || 0) * (item.quantity || 1);
    // Remove lock
    setCoolOffLocks(prev => {
      const next = { ...prev };
      delete next[item.id];
      return next;
    });
    // Remove item from cart
    onRemoveItem(item.id);
    // Record avoided impulse buy
    if (onAvoidImpulseBuy) {
      onAvoidImpulseBuy(itemCost);
    }
    if (onAwardVibeCoins) {
      onAwardVibeCoins(50);
    }
    setLastAvoidedItem({
      name: item.live_title || item.name,
      savedAmount: itemCost
    });
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => setLastAvoidedItem(null), 6000);
  };

  const subtotal = cartItems.reduce((acc, it) => acc + (it.current_price || it.estimated_price || 0) * (it.quantity || 1), 0);
  const isUnderBudget = subtotal <= budgetCap;
  const difference = Math.abs(budgetCap - subtotal);

  // Multi-Store Split-Cart Optimizer Calculation
  const splitBundles = useMemo(() => {
    if (cartItems.length === 0) return [];

    const bundles = {};

    cartItems.forEach(item => {
      // Determine optimal store: use best_store_id or merchant_name
      let storeKey = item.best_store_id || 'amazon';
      if (!storeKey && item.merchant_name) {
        if (item.merchant_name.toLowerCase().includes('myntra')) storeKey = 'myntra';
        else if (item.merchant_name.toLowerCase().includes('croma')) storeKey = 'croma';
        else if (item.merchant_name.toLowerCase().includes('ajio')) storeKey = 'ajio';
        else if (item.merchant_name.toLowerCase().includes('flipkart')) storeKey = 'flipkart';
        else if (item.merchant_name.toLowerCase().includes('nykaa')) storeKey = 'nykaa';
        else if (item.merchant_name.toLowerCase().includes('reliance')) storeKey = 'reliancedigital';
        else storeKey = 'amazon';
      }

      if (!bundles[storeKey]) {
        const storeMeta = MARKETPLACES.find(m => m.id === storeKey) || {
          name: storeKey.toUpperCase(),
          shortName: storeKey,
          color: '#F59E0B'
        };
        bundles[storeKey] = {
          storeId: storeKey,
          storeName: storeMeta.name,
          shortName: storeMeta.shortName,
          color: storeMeta.color,
          items: [],
          subtotal: 0,
          shippingUnlocked: false,
          perk: ''
        };
      }

      const itemCost = (item.current_price || item.estimated_price || 0) * (item.quantity || 1);
      bundles[storeKey].items.push(item);
      bundles[storeKey].subtotal += itemCost;
    });

    // Calculate free shipping & perks per store bundle
    Object.values(bundles).forEach(bundle => {
      if (bundle.subtotal >= 1199) {
        bundle.shippingUnlocked = true;
        bundle.perk = 'Free Delivery & Verified Lowest Tier Unlocked';
      } else {
        bundle.perk = 'Optimal Category Pricing';
      }
    });

    return Object.values(bundles);
  }, [cartItems]);

  // Single-Store vs Split-Store Savings Calculation
  const singleStorePrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const singlePrice = item.single_store_bundle_price || Math.round((item.current_price || item.estimated_price || 2499) * 1.18);
      return acc + singlePrice * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const splitSavings = Math.max(0, singleStorePrice - subtotal);

  const getBundleStoreUrl = (bundle) => {
    const firstItem = bundle.items[0];
    if (firstItem?.direct_buy_url) return firstItem.direct_buy_url;
    if (firstItem?.deep_links?.[bundle.storeId]) return firstItem.deep_links[bundle.storeId];
    const q = firstItem?.search_query || firstItem?.name || "deals";
    const storeObj = MARKETPLACES.find(m => m.id === bundle.storeId);
    return storeObj ? storeObj.buildSearchUrl(q) : `https://www.amazon.in/s?k=${encodeURIComponent(q)}`;
  };

  const getItemStoreUrl = (item) => {
    if (item.direct_buy_url) return item.direct_buy_url;
    const storeId = item.best_store_id || 'amazon';
    if (item.deep_links?.[storeId]) return item.deep_links[storeId];
    if (item.deep_links?.amazon) return item.deep_links.amazon;
    const q = item.search_query || item.name || "deals";
    const storeObj = MARKETPLACES.find(m => m.id === storeId);
    return storeObj ? storeObj.buildSearchUrl(q) : `https://www.amazon.in/s?k=${encodeURIComponent(q)}`;
  };

  const handleMarkPurchased = () => {
    setIsCompletedPurchase(true);
    if (onAwardVibeCoins) onAwardVibeCoins(250);
    if (onRecordSplitSavings && splitSavings > 0) {
      onRecordSplitSavings(splitSavings);
    }
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between p-5 sm:p-6 overflow-hidden text-gray-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-base sm:text-lg flex items-center gap-1.5">
                <span>{t.cartDrawerTitle}</span>
              </h2>
              <p className="text-xs text-gray-500">
                {cartItems.length} items across {splitBundles.length} optimal marketplaces
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher: Smart Split-Cart Optimizer vs All Items */}
        <div className="flex items-center gap-2 pt-3 border-b border-gray-200 pb-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('split')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'split'
                ? 'bg-[#FEBD69] text-gray-950 font-bold shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Split-Cart Optimizer ({splitBundles.length} Stores)</span>
          </button>

          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'all'
                ? 'bg-[#FEBD69] text-gray-950 font-bold shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>All Items ({cartItems.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-1">
          
          {/* Celebration banner when an impulse buy was avoided */}
          {lastAvoidedItem && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between gap-3 animate-fade-in shadow-lg shadow-emerald-500/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-extrabold text-white text-xs">
                    🎉 Impulse Buy Successfully Prevented!
                  </div>
                  <p className="text-[11px] text-emerald-200">
                    Saved <strong className="text-white font-mono">₹{lastAvoidedItem.savedAmount.toLocaleString('en-IN')}</strong> by skipping "{lastAvoidedItem.name.slice(0, 30)}...". +50 VibeCoins awarded!
                  </p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 shrink-0">
                Disciplined
              </span>
            </div>
          )}

          {/* Smart Split-Cart Optimizer Savings Highlight */}
          {cartItems.length > 0 && splitSavings > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-darkbg-800 to-emerald-950/40 border border-emerald-500/40 space-y-2.5 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <span>{t.splitSavingsHeadline}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">
                  Optimized
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">{t.singlePlatformCost}:</span>
                  <span className="font-extrabold text-slate-300 line-through text-sm">
                    ₹{Math.round(singleStorePrice).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
                  <span className="text-[10px] text-emerald-300 block">{t.splitOptimizedCost}:</span>
                  <span className="font-extrabold text-emerald-400 text-sm">
                    ₹{Math.round(subtotal).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-emerald-200 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  You save <strong className="text-white">₹{Math.round(splitSavings).toLocaleString('en-IN')}</strong> by routing fashion to Myntra/Ajio and electronics to Croma/Amazon!
                </span>
              </p>
            </div>
          )}

          {/* Budget Cap Progress Meter */}
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-400">{t.budgetMeter}</span>
              <span className={`font-mono ${isUnderBudget ? 'text-emerald-400' : 'text-amber-400'}`}>
                ₹{Math.round(subtotal).toLocaleString('en-IN')} / ₹{Math.round(budgetCap).toLocaleString('en-IN')}
              </span>
            </div>

            <div className="w-full bg-darkbg-800 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${isUnderBudget ? 'bg-emerald-500' : 'bg-amber-500'}`}
                style={{ width: `${Math.min(100, (subtotal / Math.max(1, budgetCap)) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              {isUnderBudget ? (
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ₹{Math.round(difference).toLocaleString('en-IN')} {t.underBudget}
                </span>
              ) : (
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> ₹{Math.round(difference).toLocaleString('en-IN')} {t.overBudget}
                </span>
              )}
            </p>
          </div>

          {/* Duplicate Conflict Alert in Cart */}
          {conflictReport && conflictReport.has_conflicts && (
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-300">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>{t.conflictWarning}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                {conflictReport.warnings?.[0]?.message || t.conflictAdvice}
              </p>
            </div>
          )}

          {/* TAB 1: Smart Split-Cart Multi-Store Checkout Bundler */}
          {activeTab === 'split' && (
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="py-16 text-center text-slate-500 text-xs space-y-2">
                  <ShoppingBag className="w-10 h-10 mx-auto opacity-30 text-slate-400" />
                  <p>{t.emptyCart}</p>
                </div>
              ) : (
                splitBundles.map((bundle) => (
                  <div 
                    key={bundle.storeId}
                    className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 shadow-sm"
                  >
                    {/* Bundle Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: bundle.color }}
                        />
                        <h4 className="font-extrabold text-gray-900 text-sm">
                          {bundle.storeName}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 font-mono">
                          {bundle.items.length} items
                        </span>
                      </div>

                      <span className="font-extrabold text-gray-900 font-mono text-sm">
                        ₹{Math.round(bundle.subtotal).toLocaleString('en-IN')}
                      </span>
                    </div>

                    {/* Bundle Items */}
                    <div className="space-y-2">
                      {bundle.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between text-xs py-1">
                          <span className="text-gray-700 truncate max-w-[240px]">
                            {item.live_title || item.name}
                          </span>
                          <span className="font-mono text-gray-500 font-semibold">
                            ₹{Math.round(item.current_price || item.estimated_price || 0).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bundle Action */}
                    <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-emerald-700 font-bold">
                        ✓ {bundle.perk}
                      </span>

                      <a
                        href={getBundleStoreUrl(bundle)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 border border-[#FCD200] text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <span>{t.checkoutOn} {bundle.shortName}</span>
                        <ExternalLink className="w-3 h-3 text-gray-900" />
                      </a>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: All Items List with 24h Cool-Off Lock & Remove Option */}
          {activeTab === 'all' && (
            <div className="space-y-3">
              {cartItems.map((item, index) => {
                const price = (item.current_price || item.estimated_price || 0) * (item.quantity || 1);
                const isLocked = Boolean(coolOffLocks[item.id]);

                return (
                  <div
                    key={item.id || index}
                    className={`p-3.5 rounded-xl border transition-all space-y-2.5 ${
                      isLocked 
                        ? 'bg-amber-50 border-amber-300 shadow-inner' 
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.thumbnail_url || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-mono text-gray-500 uppercase font-bold">
                          {item.merchant_name || item.best_store_pill || 'Verified Store'}
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 truncate">
                          {item.live_title || item.name}
                        </h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-mono font-extrabold text-gray-900">
                            ₹{Math.round(price).toLocaleString('en-IN')}
                          </span>
                          <a
                            href={getItemStoreUrl(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] text-blue-600 hover:text-blue-800 flex items-center gap-0.5 underline font-semibold"
                          >
                            <span>Direct Store</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all shrink-0"
                        title="Remove from cart"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* 24-Hour Impulse Cool-Off Lock Row */}
                    <div className="pt-2 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
                      {isLocked ? (
                        <>
                          <div className="flex items-center gap-1.5 text-amber-800 text-[11px] font-bold">
                            <Lock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            <span>Cool-Off Active: 23h 54m to rethink</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSkipImpulseBuy(item)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[10px] font-bold border border-emerald-300 transition-colors flex items-center gap-1"
                              title="Skip this item to protect savings and avoid regret"
                            >
                              <HeartCrack className="w-3 h-3 text-emerald-600" />
                              <span>I Thought It Over & Will Skip</span>
                            </button>

                            <button
                              onClick={() => toggleCoolOffLock(item.id)}
                              className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-[10px] transition-colors"
                              title="Unlock to buy now"
                            >
                              Unlock
                            </button>
                          </div>
                        </>
                      ) : (
                        <button
                          onClick={() => toggleCoolOffLock(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-semibold flex items-center gap-1.5 transition-colors border border-amber-200"
                          title="Freeze this purchase for 24h to prevent buyer remorse"
                        >
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Activate 24h Impulse Cool-Off</span>
                        </button>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

        {/* Footer & Checkout Action Bar */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 pt-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">Split-Optimized Total:</span>
              <span className="text-2xl font-black text-gray-900 font-mono">
                ₹{Math.round(subtotal).toLocaleString('en-IN')}
              </span>
            </div>

            {/* 1-Tap Universal Multi-Store Checkout */}
            <button
              onClick={() => {
                onClose();
                if (onOpenCheckoutModal) onOpenCheckoutModal();
              }}
              className="w-full py-3 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 border border-[#FCD200] font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 fill-gray-900" />
              <span>Proceed to Multi-Store Checkout • ₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mark Purchased to Record Savings */}
            <button
              onClick={handleMarkPurchased}
              className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <Check className="w-4 h-4 text-emerald-200" />
              <span>Record Purchase & Verified ₹ Savings</span>
            </button>

            {/* Save Board Button */}
            <button
              onClick={onSaveAsBoard}
              className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-gray-300"
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-600" />
              <span>Save As Curated Board</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
