import React, { useState, useEffect } from 'react';
import { 
  Shirt, 
  Sparkles, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShoppingBag, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Repeat,
  Zap,
  Info,
  Clock,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  FileText
} from 'lucide-react';
import { translations } from '../constants/translations';

const AI_SMART_SUGGESTIONS = [
  {
    id: "sug_1",
    missingPiece: "Textured Navy Blazer",
    category: "Outerwear",
    reason: "Your wardrobe has Navy Linen Shirt and Olive Chinos, but lacks a structured layer for formal dinners and networking.",
    recommendedPrice: "₹2,899",
    query: "men navy casual blazer"
  },
  {
    id: "sug_2",
    missingPiece: "Studio Monitor Headphones",
    category: "Tech Gear",
    reason: "Complete your workstation desk setup with balanced audio monitoring compatible with your laptop.",
    recommendedPrice: "₹4,999",
    query: "wireless studio headphones"
  },
  {
    id: "sug_3",
    missingPiece: "Minimalist Leather Cardholder",
    category: "Accessories",
    reason: "Harmonizes with your Black Leather Derby Shoes to replace bulky wallets.",
    recommendedPrice: "₹899",
    query: "men leather cardholder slim"
  }
];

const INITIAL_TRACKER_ITEMS = [
  {
    id: "trk_1",
    name: "Ajio Pure Linen Slim Shirt",
    store: "Ajio",
    purchaseDate: "Nov 15, 2025",
    price: 1899,
    daysLeftToReturn: 4,
    warrantyMonths: 0,
    status: "return_active",
    returnUrl: "https://www.ajio.com/my-account/orders"
  },
  {
    id: "trk_2",
    name: "Sony WH-1000XM5 Wireless Headphones",
    store: "Amazon.in",
    purchaseDate: "Oct 10, 2025",
    price: 24990,
    daysLeftToReturn: 0,
    warrantyMonths: 12,
    monthsLeftWarranty: 11,
    status: "warranty_active",
    serviceUrl: "https://web.sony-asia.com/in/sign-in/"
  },
  {
    id: "trk_3",
    name: "Prestige Iris Plus 750W Mixer Grinder",
    store: "Flipkart",
    purchaseDate: "Sept 05, 2025",
    price: 2999,
    daysLeftToReturn: 0,
    warrantyMonths: 24,
    monthsLeftWarranty: 21,
    status: "warranty_active",
    serviceUrl: "https://www.prestigesmartkitchen.com/service-centers"
  }
];

export default function WardrobeBuilder({
  wardrobeItems = [],
  onAddItem,
  onDeleteItem,
  onIncrementWear,
  onSearchSuggested,
  language = 'en'
}) {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' | 'tracker'
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('top');
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [cost, setCost] = useState('2499');
  const [wears, setWears] = useState('1');
  const [justIncrementedId, setJustIncrementedId] = useState(null);

  // Return & Warranty Tracker State
  const [trackerItems, setTrackerItems] = useState(() => {
    try {
      const saved = localStorage.getItem('vibecart_warranty_tracker');
      return saved ? JSON.parse(saved) : INITIAL_TRACKER_ITEMS;
    } catch (e) {
      return INITIAL_TRACKER_ITEMS;
    }
  });

  useEffect(() => {
    localStorage.setItem('vibecart_warranty_tracker', JSON.stringify(trackerItems));
  }, [trackerItems]);

  const [newTrkName, setNewTrkName] = useState('');
  const [newTrkStore, setNewTrkStore] = useState('Amazon.in');
  const [newTrkPrice, setNewTrkPrice] = useState('');
  const [newTrkReturnDays, setNewTrkReturnDays] = useState('7');
  const [newTrkWarrantyMonths, setNewTrkWarrantyMonths] = useState('12');
  const [showAddTrkForm, setShowAddTrkForm] = useState(false);

  const t = translations[language] || translations.en;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddItem({
      name: name.trim(),
      category,
      color: color.trim() || 'Neutral',
      brand: brand.trim() || 'Custom',
      estimated_cost: parseFloat(cost) || 1999,
      wears_count: parseInt(wears, 10) || 1,
      image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
    });

    setName('');
    setColor('');
    setBrand('');
    setCost('2499');
    setWears('1');
    setShowAddForm(false);
  };

  const handleWearClick = (itemId) => {
    setJustIncrementedId(itemId);
    if (onIncrementWear) {
      onIncrementWear(itemId);
    }
    setTimeout(() => setJustIncrementedId(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-darkbg-800 to-indigo-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>{t.wardrobeBuilderTitle}</span>
            </span>
            <span className="text-xs text-slate-400">Synced with Supabase DB</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Smart Wardrobe & Gear Inventory
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {t.wardrobeBuilderSubtitle}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddForm ? "Cancel" : t.addOwnedItem}</span>
        </button>
      </div>

      {/* Section Sub-Tabs: Inventory ROI vs Return & Warranty Tracker */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'inventory'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
          }`}
        >
          <Shirt className="w-4 h-4" />
          <span>Digital Inventory & ROI Meter ({wardrobeItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
            activeTab === 'tracker'
              ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Unified Return & Warranty Tracker ({trackerItems.length})</span>
          <span className="px-1.5 py-0.2 rounded bg-rose-500 text-white text-[10px] font-mono font-bold animate-pulse">
            1 Return Expiring
          </span>
        </button>
      </div>

      {/* Add Form (Wardrobe) */}
      {activeTab === 'inventory' && showAddForm && (
        <form onSubmit={handleCreate} className="p-6 rounded-3xl glass-panel border border-white/15 space-y-4 max-w-2xl mx-auto animate-fade-in">
          <h3 className="font-bold text-white text-sm">Add Owned Item to Inventory</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Item Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Navy Linen Shirt or Sony XM5"
                className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="top">Top / Shirt</option>
                <option value="bottom">Bottom / Trousers</option>
                <option value="outerwear">Blazer / Jacket</option>
                <option value="footwear">Footwear / Shoes</option>
                <option value="accessory">Watch / Accessory</option>
                <option value="electronics">Electronics / Audio</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Color / Finish</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Navy Blue"
                className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Uniqlo / Sony"
                className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Purchase Price (₹)</label>
              <input
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Initial Wears</label>
              <input
                type="number"
                value={wears}
                onChange={(e) => setWears(e.target.value)}
                className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Save to Supabase Digital Closet
          </button>
        </form>
      )}

      {/* Main Grid: Owned Items with ROI Meter + AI Missing Essentials */}
      {activeTab === 'inventory' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Columns: User's Owned Items with Cost-Per-Wear ROI Meter */}
          <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Shirt className="w-4 h-4 text-amber-400" />
                <span>Owned Items ({wardrobeItems.length}) • Live Cost-Per-Wear ROI</span>
              </h3>
              <span className="text-xs text-emerald-400 font-mono">Supabase Realtime</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wardrobeItems.map((item) => {
                const cost = item.estimated_cost || 2499;
                const wearsCount = item.wears_count || 10;
                const cpw = Math.round(cost / Math.max(1, wearsCount));

                // ROI Tier
                let roiClass = "text-emerald-400 bg-emerald-500/15 border-emerald-500/30";
                let roiText = t.roiTierGreat;
                if (cpw >= 150 && cpw <= 350) {
                  roiClass = "text-amber-400 bg-amber-500/15 border-amber-500/30";
                  roiText = t.roiTierGood;
                } else if (cpw > 350) {
                  roiClass = "text-rose-400 bg-rose-500/15 border-rose-500/30";
                  roiText = t.roiTierLow;
                }

                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 flex flex-col justify-between transition-all group space-y-3"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image_url || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl border border-white/10 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-white/10 text-amber-300 font-bold">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-white truncate mt-1">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          {item.color} • {item.brand || "Custom"}
                        </p>
                      </div>

                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1.5 rounded-lg opacity-40 group-hover:opacity-100 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-all shrink-0"
                        title="Remove from inventory"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Cost-Per-Wear ROI Meter */}
                    <div className="p-2.5 rounded-xl bg-darkbg-800/90 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Cost-Per-Wear:</span>
                        <span className="font-extrabold text-white font-mono text-sm">
                          ₹{cpw} <span className="text-[10px] text-slate-400 font-normal">/wear</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${roiClass}`}>
                          {roiText}
                        </span>

                        {/* +1 Wear Button */}
                        <button
                          onClick={() => handleWearClick(item.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1 border border-amber-500/30 transition-all active:scale-95"
                          title="Increment wear count by 1"
                        >
                          <Repeat className="w-3 h-3 text-amber-400" />
                          <span>{t.addWearButton} ({wearsCount})</span>
                        </button>
                      </div>

                      {justIncrementedId === item.id && (
                        <p className="text-[10px] text-emerald-400 font-semibold animate-fade-in">
                          ✓ {t.wearIncremented}
                        </p>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: AI Missing Essentials Suggestions */}
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{t.aiGapSuggestions}</span>
              </h3>
              <span className="text-xs text-amber-300 font-bold">Recommended</span>
            </div>

            <p className="text-xs text-slate-400">
              Based on your owned items in Supabase, adding these missing essentials will multiply your outfit combinations without redundancy:
            </p>

            <div className="space-y-3 pt-1">
              {AI_SMART_SUGGESTIONS.map((sug) => (
                <div
                  key={sug.id}
                  className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/20 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {sug.missingPiece}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      ~{sug.recommendedPrice}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {sug.reason}
                  </p>
                  <button
                    onClick={() => onSearchSuggested(sug.query)}
                    className="w-full py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>{t.findAcrossStores}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: UNIFIED RETURN & WARRANTY COUNTDOWN TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-6 animate-fade-in">
          
          {/* Tracker Stat Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl glass-panel border border-amber-500/30 bg-amber-500/10 space-y-1">
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Active Return Windows
              </span>
              <div className="text-2xl font-black text-white font-mono">
                {trackerItems.filter(i => i.daysLeftToReturn > 0).length} Orders
              </div>
              <p className="text-[11px] text-amber-200">
                1 window expires in 4 days (Ajio Pure Linen Shirt)
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-500/10 space-y-1">
              <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Brand Warranties Active
              </span>
              <div className="text-2xl font-black text-white font-mono">
                {trackerItems.filter(i => (i.monthsLeftWarranty || 0) > 0).length} Devices
              </div>
              <p className="text-[11px] text-emerald-200">
                Sony India (11 mos left), Prestige Motor (21 mos left)
              </p>
            </div>

            <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-white/5 space-y-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
                  Total Tracked Value
                </span>
                <div className="text-2xl font-black text-white font-mono">
                  ₹{trackerItems.reduce((acc, i) => acc + (i.price || 0), 0).toLocaleString('en-IN')}
                </div>
              </div>
              <button
                onClick={() => setShowAddTrkForm(!showAddTrkForm)}
                className="mt-2 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddTrkForm ? 'Close Form' : '+ Add Order / Warranty'}</span>
              </button>
            </div>
          </div>

          {/* Add Tracker Form */}
          {showAddTrkForm && (
            <div className="p-6 rounded-3xl glass-panel border border-amber-500/30 space-y-4 max-w-xl mx-auto bg-darkbg-900/90 animate-fade-in">
              <h4 className="font-bold text-white text-sm">Add New Purchase to Return & Warranty Tracker</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Product Title</label>
                  <input
                    type="text"
                    value={newTrkName}
                    onChange={(e) => setNewTrkName(e.target.value)}
                    placeholder="e.g. OnePlus 12R or Mixer Grinder"
                    className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Store / Marketplace</label>
                  <select
                    value={newTrkStore}
                    onChange={(e) => setNewTrkStore(e.target.value)}
                    className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2 text-white"
                  >
                    <option value="Amazon.in">Amazon.in</option>
                    <option value="Flipkart">Flipkart</option>
                    <option value="Myntra">Myntra</option>
                    <option value="Ajio">Ajio</option>
                    <option value="Croma">Croma</option>
                    <option value="Reliance Digital">Reliance Digital</option>
                    <option value="Official Brand D2C">Official Brand D2C</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    value={newTrkPrice}
                    onChange={(e) => setNewTrkPrice(e.target.value)}
                    placeholder="2499"
                    className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Return Window (Days)</label>
                  <input
                    type="number"
                    value={newTrkReturnDays}
                    onChange={(e) => setNewTrkReturnDays(e.target.value)}
                    className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Manufacturer Warranty (Months)</label>
                  <input
                    type="number"
                    value={newTrkWarrantyMonths}
                    onChange={(e) => setNewTrkWarrantyMonths(e.target.value)}
                    className="w-full bg-darkbg-800 border border-white/10 rounded-xl p-2 text-white"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  if (!newTrkName.trim()) return;
                  const item = {
                    id: `trk_${Date.now()}`,
                    name: newTrkName.trim(),
                    store: newTrkStore,
                    purchaseDate: "Today",
                    price: parseFloat(newTrkPrice) || 2999,
                    daysLeftToReturn: parseInt(newTrkReturnDays, 10) || 7,
                    warrantyMonths: parseInt(newTrkWarrantyMonths, 10) || 12,
                    monthsLeftWarranty: parseInt(newTrkWarrantyMonths, 10) || 12,
                    status: "active",
                    returnUrl: "https://amazon.in/gp/css/order-history"
                  };
                  setTrackerItems(prev => [item, ...prev]);
                  setNewTrkName('');
                  setNewTrkPrice('');
                  setShowAddTrkForm(false);
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Track Return Deadline & Warranty
              </button>
            </div>
          )}

          {/* List of Tracked Orders */}
          <div className="space-y-4">
            {trackerItems.map((item) => (
              <div 
                key={item.id}
                className="p-5 rounded-2xl glass-panel border border-white/10 bg-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-all"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-amber-300 font-bold">
                      {item.store}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Purchased {item.purchaseDate}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">
                      ₹{item.price?.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-white text-base">
                    {item.name}
                  </h4>

                  {/* Return Window & Warranty Badges */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {item.daysLeftToReturn > 0 ? (
                      <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center gap-1.5 animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.daysLeftToReturn} Days Left to Return</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-white/5 text-slate-400 text-[11px] font-medium">
                        Return Window Closed (Safe Keeper)
                      </span>
                    )}

                    {item.monthsLeftWarranty > 0 && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{item.monthsLeftWarranty} Months Brand Warranty Remaining</span>
                      </span>
                    )}

                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 text-[11px] flex items-center gap-1">
                      <FileText className="w-3 h-3 text-amber-400" />
                      Invoice Synced
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-start md:self-auto">
                  {item.daysLeftToReturn > 0 && (
                    <a
                      href={item.returnUrl || "https://amazon.in"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/40 text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <span>Initiate Return</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {item.serviceUrl && (
                    <a
                      href={item.serviceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 text-xs font-bold flex items-center gap-1 transition-all"
                    >
                      <span>Brand Support</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <button
                    onClick={() => {
                      setTrackerItems(prev => prev.filter(i => i.id !== item.id));
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-white/10 transition-colors"
                    title="Remove from tracker"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
