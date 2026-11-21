import React, { useState } from 'react';
import { 
  Clock, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  Sparkles, 
  Calendar, 
  IndianRupee, 
  CheckCircle2, 
  TrendingDown, 
  ExternalLink,
  Target
} from 'lucide-react';
import { translations } from '../constants/translations';

const DEFAULT_FUTURE_IDEAS = [
  {
    id: "fb_1",
    title: "Apple MacBook Pro 16\" M4 Max",
    category: "Electronics",
    targetPrice: 289900,
    currentMarketLow: 319900,
    timeline: "Diwali 2027 Goal",
    notes: "Primary setup upgrade for high-throughput AI and 4K video editing workflow.",
    image_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
    status: "monitoring"
  },
  {
    id: "fb_2",
    title: "Handcrafted Silk Bandhgala Wedding Suit",
    category: "Fashion",
    targetPrice: 22000,
    currentMarketLow: 28500,
    timeline: "Sibling's Winter Wedding 2027",
    notes: "Deep royal blue with gold thread button detail. Monitor Manyavar & FabIndia end-of-season sales.",
    image_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80",
    status: "monitoring"
  },
  {
    id: "fb_3",
    title: "Sony A7 IV Full-Frame Mirrorless Camera",
    category: "Creator Gear",
    targetPrice: 175000,
    currentMarketLow: 198000,
    timeline: "Mid 2027 Photography Milestone",
    notes: "Wait for Croma / Reliance festival bank cashback offers.",
    image_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=700&q=80",
    status: "monitoring"
  }
];

export default function FutureBuyVault({
  onAddToCart,
  language = 'en'
}) {
  const [ideas, setIdeas] = useState(DEFAULT_FUTURE_IDEAS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTargetPrice, setNewTargetPrice] = useState('');
  const [newTimeline, setNewTimeline] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newCategory, setNewCategory] = useState('Tech');

  const t = translations[language] || translations.en;

  const handleAddIdea = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newEntry = {
      id: "fb_" + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      targetPrice: parseFloat(newTargetPrice) || 5000,
      currentMarketLow: Math.round((parseFloat(newTargetPrice) || 5000) * 1.15),
      timeline: newTimeline.trim() || "Planned for Next Year",
      notes: newNotes.trim() || "Personal long-term purchase milestone.",
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
      status: "monitoring"
    };

    setIdeas(prev => [newEntry, ...prev]);
    setNewTitle('');
    setNewTargetPrice('');
    setNewTimeline('');
    setNewNotes('');
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setIdeas(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6 animate-fade-in text-gray-900">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-blue-200">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>Personal Long-Term Vault</span>
            </span>
            <span className="text-xs text-gray-500">Autonomous Price Drop Tracker Active</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            {t.futureBuyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
            {t.futureBuyDesc}
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-3 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 shrink-0 self-start md:self-auto border border-[#FCD200]"
        >
          <Plus className="w-4 h-4 text-gray-900" />
          <span>{showAddForm ? "Cancel" : t.addFutureIdea}</span>
        </button>
      </div>

      {/* Add New Future Goal Form */}
      {showAddForm && (
        <form onSubmit={handleAddIdea} className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-4 max-w-2xl mx-auto animate-fade-in">
          <h3 className="font-bold text-gray-900 text-base">Plan a Long-Term Purchase</h3>
          
          <div>
            <label className="text-xs text-gray-600 block mb-1">Product Title / Dream Item</label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Apple MacBook Pro 16 M4 Max or Handcrafted Sherwani"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-600 block mb-1">Category</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
              >
                <option value="Tech">Tech & Computing</option>
                <option value="Fashion">Fashion & Formals</option>
                <option value="Audio">Audio & Entertainment</option>
                <option value="Home">Home & Living</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-gray-600 block mb-1">{t.targetPriceLabel} (₹)</label>
              <input
                type="number"
                required
                value={newTargetPrice}
                onChange={(e) => setNewTargetPrice(e.target.value)}
                placeholder="e.g., 280000"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-600 block mb-1">{t.plannedTimeline}</label>
              <input
                type="text"
                value={newTimeline}
                onChange={(e) => setNewTimeline(e.target.value)}
                placeholder="e.g., Diwali 2027 or Q3 Setup"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-600 block mb-1">{t.notesLabel}</label>
            <textarea
              rows={2}
              value={newNotes}
              onChange={(e) => setNewNotes(e.target.value)}
              placeholder="Why are you planning this purchase? Any specific specs or sale events you want to target?"
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-bold text-xs transition-colors border border-[#FCD200]"
          >
            Save to Idea Vault & Start Cross-Store Price Watch
          </button>
        </form>
      )}

      {/* Vault Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas.map((idea) => {
          const savingsNeeded = idea.currentMarketLow - idea.targetPrice;
          return (
            <div
              key={idea.id}
              className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between space-y-4 relative group hover:shadow-md transition-shadow"
            >
              <div>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <img
                    src={idea.image_url}
                    alt={idea.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-gray-900/80 backdrop-blur-md text-white text-[10px] font-bold">
                      {idea.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-mono border border-emerald-300 font-bold">
                      Auto-Tracking
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-blue-700 font-bold mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{idea.timeline}</span>
                </div>

                <h3 className="font-bold text-gray-900 text-base line-clamp-1">
                  {idea.title}
                </h3>

                <p className="text-xs text-gray-600 mt-1 line-clamp-2 italic">
                  "{idea.notes}"
                </p>

                {/* Pricing Target & Current Status */}
                <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Target Price:</span>
                    <span className="font-bold text-emerald-700 font-mono text-sm">
                      ₹{idea.targetPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500">Current Market Low:</span>
                    <span className="font-mono text-gray-700 font-semibold">
                      ₹{idea.currentMarketLow.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {savingsNeeded > 0 && (
                    <div className="text-[10px] text-amber-800 flex items-center gap-1 pt-1 border-t border-gray-200 font-medium">
                      <Target className="w-3 h-3 text-amber-600" />
                      <span>Waiting for ₹{savingsNeeded.toLocaleString('en-IN')} price dip across stores</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between border-t border-gray-200 text-xs">
                <button
                  onClick={() => handleDelete(idea.id)}
                  className="text-gray-400 hover:text-rose-600 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>

                <button
                  onClick={() => onAddToCart({
                    name: idea.title,
                    current_price: idea.targetPrice,
                    category: idea.category.toLowerCase(),
                    thumbnail_url: idea.image_url,
                    merchant_name: "Vault Verified Store"
                  })}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-bold border border-[#FCD200] flex items-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-gray-900" />
                  <span>Move to Cart</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
