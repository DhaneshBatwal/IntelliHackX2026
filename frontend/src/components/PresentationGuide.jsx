import React, { useState } from 'react';
import { 
  Sparkles, 
  HelpCircle, 
  Search, 
  ShieldAlert, 
  Clock, 
  ShoppingBag, 
  CreditCard, 
  Languages, 
  ChevronUp, 
  ChevronDown, 
  X,
  Play
} from 'lucide-react';

export default function PresentationGuide({
  onTriggerSearch,
  onOpenCart,
  onOpenQuickViewFirst,
  onOpenCheckout,
  onToggleLanguage,
  onSwitchLocation
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-40 max-w-sm">
      {isOpen ? (
        <div className="rounded-2xl border border-gray-300 p-4 bg-white/95 shadow-2xl space-y-3 animate-fade-in backdrop-blur-xl text-gray-900">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FEBD69] text-gray-950 flex items-center justify-center font-black text-xs">
                🎯
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-xs">Hackathon Demo Mode</h4>
                <p className="text-[10px] text-gray-500">1-click demo shortcuts for judges</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Demo Buttons */}
          <div className="space-y-1.5 text-xs">
            <button
              onClick={() => onTriggerSearch('blazer')}
              className="w-full p-2 rounded-xl bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 text-left flex items-center justify-between transition-colors group"
            >
              <span className="flex items-center gap-2 text-gray-800 group-hover:text-amber-900 font-semibold">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                <span>1. Search 'Blazer' across 12 stores</span>
              </span>
              <Play className="w-3 h-3 text-gray-400 group-hover:text-amber-600" />
            </button>

            <button
              onClick={onOpenQuickViewFirst}
              className="w-full p-2 rounded-xl bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 text-left flex items-center justify-between transition-colors group"
            >
              <span className="flex items-center gap-2 text-gray-800 group-hover:text-amber-900 font-semibold">
                <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Show Bank Offer Stacker & Spec X-Ray</span>
              </span>
              <Play className="w-3 h-3 text-gray-400 group-hover:text-amber-600" />
            </button>

            <button
              onClick={onOpenCart}
              className="w-full p-2 rounded-xl bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 text-left flex items-center justify-between transition-colors group"
            >
              <span className="flex items-center gap-2 text-gray-800 group-hover:text-amber-900 font-semibold">
                <Clock className="w-3.5 h-3.5 text-rose-600" />
                <span>3. Demo 24h Impulse Cool-Off Lock</span>
              </span>
              <Play className="w-3 h-3 text-gray-400 group-hover:text-amber-600" />
            </button>

            <button
              onClick={onOpenCheckout}
              className="w-full p-2 rounded-xl bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 text-left flex items-center justify-between transition-colors group"
            >
              <span className="flex items-center gap-2 text-gray-800 group-hover:text-amber-900 font-semibold">
                <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                <span>4. Simulate 1-Tap Split Checkout</span>
              </span>
              <Play className="w-3 h-3 text-gray-400 group-hover:text-amber-600" />
            </button>

            <button
              onClick={onToggleLanguage}
              className="w-full p-2 rounded-xl bg-gray-50 hover:bg-amber-50 border border-gray-200 hover:border-amber-300 text-left flex items-center justify-between transition-colors group"
            >
              <span className="flex items-center gap-2 text-gray-800 group-hover:text-amber-900 font-semibold">
                <Languages className="w-3.5 h-3.5 text-indigo-600" />
                <span>5. Switch Language (English / हिंदी)</span>
              </span>
              <Play className="w-3 h-3 text-gray-400 group-hover:text-amber-600" />
            </button>
          </div>

          <p className="text-[10px] text-gray-500 text-center font-mono pt-1">
            Tip: You can hide or reopen this guide anytime.
          </p>

        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white hover:bg-gray-50 border border-gray-300 text-gray-900 text-xs font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span>🎯 Hackathon Presentation Shortcuts</span>
          <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
        </button>
      )}
    </div>
  );
}
