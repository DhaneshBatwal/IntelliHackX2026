import React, { useState } from 'react';
import { X, Shirt, Plus, Trash2, Check, Sparkles, AlertCircle, ShoppingBag, Layers } from 'lucide-react';

export default function WardrobeDrawer({
  isOpen,
  onClose,
  wardrobeItems,
  onAddItem,
  onDeleteItem,
  onRunConflictCheck,
  isChecking,
  plainLanguage
}) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('top');
  const [newItemColor, setNewItemColor] = useState('');
  const [newItemBrand, setNewItemBrand] = useState('');
  const [newItemCost, setNewItemCost] = useState('');
  const [newItemWears, setNewItemWears] = useState('5');

  if (!isOpen) return null;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newItemName.trim() || !newItemColor.trim()) return;

    onAddItem({
      name: newItemName.trim(),
      category: newItemCategory,
      color: newItemColor.trim(),
      brand: newItemBrand.trim() || 'Custom',
      estimated_cost: parseFloat(newItemCost) || 0,
      wears_count: parseInt(newItemWears, 10) || 0,
      image_url: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      style_tags: ['custom', newItemCategory]
    });

    setNewItemName('');
    setNewItemColor('');
    setNewItemBrand('');
    setNewItemCost('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between p-6 overflow-hidden text-gray-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FEBD69] text-gray-950 flex items-center justify-center font-bold">
              <Shirt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-gray-900 text-lg">
                {plainLanguage ? 'My Owned Clothes' : 'My Owned Wardrobe'}
              </h2>
              <p className="text-xs text-gray-500">
                {wardrobeItems.length} items synced with Supabase DB
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-1">
          
          {/* Quick Notice */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              {plainLanguage
                ? 'These are clothes you already have. Before you buy anything new, we check if you already own something similar.'
                : 'VibeCart AI cross-references this digital closet before checkout to flag redundant duplicates or color clashes.'}
            </span>
          </div>

          {/* Toggle Add Form Button */}
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full py-2.5 px-4 rounded-xl border border-dashed border-gray-300 hover:border-amber-500 bg-gray-50 hover:bg-amber-50/50 text-gray-700 hover:text-gray-950 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4 text-amber-600" />
              <span>{plainLanguage ? '+ Add an item you own' : '+ Add Owned Item to Closet'}</span>
            </button>
          ) : (
            <form onSubmit={handleCreate} className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                <span>Add Item to Wardrobe</span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="text-[11px] text-gray-600 block mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navy Linen Shirt"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Category</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="top">Top / Shirt</option>
                    <option value="bottom">Bottom / Pants</option>
                    <option value="footwear">Footwear / Shoes</option>
                    <option value="outerwear">Jacket / Layer</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Color</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Navy Blue"
                    value={newItemColor}
                    onChange={(e) => setNewItemColor(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Brand (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Uniqlo / M&S"
                    value={newItemBrand}
                    onChange={(e) => setNewItemBrand(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-gray-600 block mb-1">Wears Count</label>
                  <input
                    type="number"
                    value={newItemWears}
                    onChange={(e) => setNewItemWears(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs text-gray-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-bold text-xs transition-colors border border-[#FCD200]"
              >
                Save Item to Supabase
              </button>
            </form>
          )}

          {/* Owned items card list */}
          <div className="space-y-2.5">
            {wardrobeItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all group"
              >
                <img
                  src={item.image_url || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.2 rounded bg-gray-200 text-gray-700">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-gray-500">{item.color}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 truncate mt-0.5">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span>{item.brand || 'Owned'}</span>
                    <span>•</span>
                    <span className="text-emerald-700 font-semibold">{item.wears_count || 0} logged wears</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteItem(item.id)}
                  title="Remove from wardrobe"
                  className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-all shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 pt-4 space-y-2">
          <button
            onClick={onRunConflictCheck}
            disabled={isChecking}
            className="w-full py-3 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 border border-[#FCD200] font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <Layers className="w-4 h-4" />
            <span>
              {isChecking
                ? 'Auditing against current look...'
                : (plainLanguage ? 'Scan for Duplicate Clothes' : 'Run AI Wardrobe Conflict Scan')}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
