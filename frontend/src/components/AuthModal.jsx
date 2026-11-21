import React, { useState } from 'react';
import { X, User, Mail, Lock, Phone, CreditCard, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { translations } from '../constants/translations';
import { MARKETPLACES } from '../constants/marketplaces';

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  onAuthSuccess,
  language = 'en'
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [phoneUPI, setPhoneUPI] = useState(currentUser?.phoneUPI || '');
  const [linkedStores, setLinkedStores] = useState(currentUser?.linkedStores || {
    amazon: true,
    flipkart: true,
    myntra: true,
    croma: true,
    ajio: false,
    nykaa: false,
    tatacliq: false,
    reliancedigital: false
  });

  const t = translations[language] || translations.en;

  if (!isOpen) return null;

  const toggleStore = (storeId) => {
    setLinkedStores(prev => ({
      ...prev,
      [storeId]: !prev[storeId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;

    const userData = {
      name: name.trim(),
      email: email.trim(),
      phoneUPI: phoneUPI.trim() || 'shopper@upi',
      isAuthenticated: true,
      vibeCoins: (currentUser?.vibeCoins || 0) + (isSignUp ? 500 : 0),
      linkedStores
    };

    onAuthSuccess(userData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl border border-gray-300 shadow-2xl p-6 sm:p-8 space-y-6 text-gray-900">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEBD69] text-gray-950 flex items-center justify-center font-bold shadow-sm">
              <User className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-amber-800 font-bold tracking-wider">
                  VibeCart Universal Shopper ID
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold">
                  256-Bit Encrypted
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {isSignUp ? t.signUpTitle : t.signInTitle}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              {t.fullName}
            </label>
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 p-2.5 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-400">
              <User className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Dhanesh Sharma"
                className="w-full bg-transparent text-gray-900 text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              {t.email}
            </label>
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 p-2.5 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-400">
              <Mail className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-transparent text-gray-900 text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              {t.password}
            </label>
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 p-2.5 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-400">
              <Lock className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-transparent text-gray-900 text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1">
              {t.phoneUPI}
            </label>
            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-300 p-2.5 focus-within:border-amber-500 focus-within:ring-1 focus-within:ring-amber-400">
              <Phone className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
              <input
                type="text"
                value={phoneUPI}
                onChange={(e) => setPhoneUPI(e.target.value)}
                placeholder="+91 98765 43210 or yourname@okhdfcbank"
                className="w-full bg-transparent text-gray-900 text-xs sm:text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Connected Store Accounts Selector */}
          <div className="pt-2 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.connectedStores}</span>
              </span>
              <span className="text-[10px] text-gray-500">
                1-Click Multi-Store Checkout
              </span>
            </div>
            <p className="text-[11px] text-gray-600">
              {t.connectStoresDesc}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {MARKETPLACES.slice(0, 8).map((store) => {
                const isLinked = Boolean(linkedStores[store.id]);
                return (
                  <button
                    key={store.id}
                    type="button"
                    onClick={() => toggleStore(store.id)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isLinked
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-gray-900 truncate">
                        {store.shortName}
                      </span>
                      {isLinked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                    </div>
                    <span className={`text-[9px] font-mono mt-1 ${isLinked ? 'text-emerald-700 font-bold' : 'text-gray-500'}`}>
                      {isLinked ? t.verifiedReady : t.notLinked}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 font-bold border border-[#FCD200] text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-gray-900" />
              <span>{isSignUp ? t.submitSignUp : t.submitSignIn}</span>
            </button>
          </div>

          {/* Switch Sign in / Sign Up toggle */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-amber-700 hover:text-amber-900 underline underline-offset-4 transition-colors font-medium"
            >
              {isSignUp ? t.toggleToSignIn : t.toggleToSignUp}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
