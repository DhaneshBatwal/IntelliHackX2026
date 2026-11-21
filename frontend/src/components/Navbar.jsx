import React, { useState, useRef } from 'react';
import { 
  Search, 
  Mic, 
  Camera, 
  ShoppingBag, 
  Shirt, 
  Bookmark, 
  User, 
  Languages, 
  Sparkles, 
  X, 
  ChevronDown,
  Layers,
  Clock,
  TrendingDown,
  Users,
  Flame,
  Check,
  MapPin,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { translations, INDIAN_LANGUAGES } from '../constants/translations';

const TRENDING_SEARCHES = [
  "Tata Sampann Toor Dal",
  "Wireless Earbuds",
  "Mixer Grinder 750W",
  "Sunscreen SPF 50",
  "Running Shoes",
  "Cotton Bedsheet",
  "OnePlus 12R 5G",
  "Whey Protein"
];

export default function Navbar({
  language = 'en',
  onSelectLanguage,
  currentUser,
  onOpenAuth,
  cartCount = 0,
  cartTotal = 0,
  totalSaved = 14850,
  onOpenCart,
  wardrobeCount = 0,
  onOpenWardrobe,
  futureBuyCount = 0,
  onOpenFutureBuy,
  onOpenRewards,
  onOpenAboutUs,
  onOpenGroupBoards,
  onOpenVoiceModal,
  onSearch,
  activeCategory = 'all',
  onSelectCategory,
  activeSection = 'home',
  onSelectSection,
  currentPincode = "560001",
  currentCity = "Bengaluru",
  onOpenPincodeModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || 'all');
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [uploadedImageBase64, setUploadedImageBase64] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const fileInputRef = useRef(null);

  const t = translations[language] || translations.en;
  const currentLangObj = INDIAN_LANGUAGES.find(l => l.code === language) || INDIAN_LANGUAGES[0];

  const handleImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImagePreview(e.target.result);
      setUploadedImageBase64(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim() && !uploadedImageBase64) return;
    onSearch(searchQuery.trim(), uploadedImageBase64, selectedCategory);
  };

  const handleTrendingClick = (query) => {
    setSearchQuery(query);
    onSearch(query, null, selectedCategory);
  };

  const clearImage = (e) => {
    e?.stopPropagation();
    setUploadedImagePreview(null);
    setUploadedImageBase64(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#131921] text-white border-b border-gray-800 shadow-md">
      
      {/* ROW 0: Top Announcement & Delivery Location Strip */}
      <div className="w-full bg-[#0F1111] border-b border-gray-800 py-1 px-3 sm:px-6 text-[11px] text-gray-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              🇮🇳 <strong className="text-white">Great Indian Savings Festival</strong> • 12+ Stores Live Price Match • Guaranteed True Landed Price
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Interactive Delivery Location Button */}
            <button
              onClick={onOpenPincodeModal}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/15 text-gray-200 hover:text-white transition-colors border border-white/15 group"
              title="Click to change PIN Code / Metro City"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FEBD69] group-hover:scale-110 transition-transform" />
              <span>Deliver to <strong className="text-white font-mono">{currentCity} ({currentPincode})</strong></span>
              <span className="text-[10px] text-[#FEBD69] underline ml-0.5 font-bold">Change</span>
            </button>
          </div>

        </div>
      </div>

      {/* ROW 1: Brand Logo, Quick Nav Links, Pan-India Language Dropdown, User Profile & Cart */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2.5 pb-2 flex items-center justify-between gap-3 border-b border-white/5">
        
        {/* Left: Brand Logo & Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <button 
            onClick={() => onSelectSection('home')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-rose-500 to-vibe-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
              V
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                  VibeCart<span className="text-amber-400">.in</span>
                </span>
                <span className="hidden md:inline px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30">
                  Universal AI
                </span>
              </div>
              <span className="hidden lg:block text-[10px] font-mono text-slate-400 leading-none">
                {t.tagline}
              </span>
            </div>
          </button>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-300">
            <button
              onClick={() => onSelectSection('home')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeSection === 'home' ? 'text-amber-300 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {t.home}
            </button>
            <button
              onClick={() => onSelectSection('about')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeSection === 'about' ? 'text-amber-300 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'
              }`}
            >
              {t.aboutUs}
            </button>
            <button
              onClick={() => onSelectSection('futurebuy')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                activeSection === 'futurebuy' ? 'text-amber-300 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.futureBuy}</span>
              {futureBuyCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px]">
                  {futureBuyCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onSelectSection('rewards')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                activeSection === 'rewards' ? 'text-amber-300 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.smartSavingsLeaderboard}</span>
            </button>
            <button
              onClick={() => onSelectSection('groupboards')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                activeSection === 'groupboards' ? 'text-amber-300 bg-white/10 font-bold' : 'hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-rose-400" />
              <span>{t.groupBoards}</span>
            </button>
          </nav>
        </div>

        {/* Right: Language Dropdown, Total Saved, Wardrobe, Profile & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Pan-India Multilingual Dropdown (10 Indian Languages) */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-200 transition-all shadow-sm"
              title="Select Indian Language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-amber-300">{currentLangObj.nativeName}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-60 p-2 rounded-2xl bg-darkbg-900 border border-amber-500/30 shadow-2xl z-50 animate-fade-in divide-y divide-white/5 text-left">
                <div className="px-2 py-1 text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                  Select Language / भाषा चुनें
                </div>
                <div className="py-1 max-h-64 overflow-y-auto scrollbar-none space-y-0.5">
                  {INDIAN_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onSelectLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                        language === lang.code
                          ? 'bg-amber-500/20 text-amber-300 font-bold'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">{lang.nativeName}</span>
                        <span className="text-[10px] text-slate-400">{lang.name} • {lang.region}</span>
                      </div>
                      {language === lang.code && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Real Total ₹ Saved Pill */}
          <button
            onClick={onOpenRewards}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 text-xs font-black transition-all shadow-emerald-500/10 shadow"
            title="Total verified ₹ saved via cross-store comparisons and Split-Cart"
          >
            <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono">₹{totalSaved.toLocaleString('en-IN')} Saved</span>
          </button>

          {/* My Wardrobe Trigger */}
          <button
            onClick={onOpenWardrobe}
            title={t.myWardrobe}
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 hover:text-white transition-all font-semibold"
          >
            <Shirt className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{t.myWardrobe}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
              {wardrobeCount}
            </span>
          </button>

          {/* User Profile / Auth Button */}
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-all font-medium"
          >
            <div className="w-5 h-5 rounded-full bg-amber-500/30 text-amber-300 flex items-center justify-center font-bold text-[10px]">
              {currentUser?.name ? currentUser.name[0].toUpperCase() : <User className="w-3 h-3" />}
            </div>
            <span className="hidden sm:inline max-w-[90px] truncate">
              {currentUser?.name ? currentUser.name.split(' ')[0] : t.loginSignUp}
            </span>
          </button>

          {/* Universal Cart Drawer Button */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all shrink-0 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">{t.cart}</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-black text-amber-400 text-[10px] font-black">
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden lg:inline font-mono text-[11px] font-black border-l border-black/20 pl-1.5">
                ₹{Math.round(cartTotal).toLocaleString('en-IN')}
              </span>
            )}
          </button>

        </div>

      </div>

      {/* ROW 2: CRITICAL FIX — ALWAYS-VISIBLE DEDICATED STICKY SEARCH BAR */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        
        {/* Amazon-Style High-Contrast E-Commerce Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`relative flex items-center bg-white rounded-xl shadow-xl overflow-hidden transition-all ${
            isDragOver
              ? 'ring-4 ring-amber-400'
              : 'border border-amber-400/80 focus-within:ring-4 focus-within:ring-amber-400/30'
          }`}
        >
          {/* Category Dropdown */}
          <div className="flex items-center bg-slate-100 hover:bg-slate-200 border-r border-slate-300 px-3 text-xs text-slate-800 shrink-0 transition-colors">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                onSelectCategory(e.target.value);
              }}
              className="bg-transparent text-slate-900 font-bold text-xs py-3 pr-2 focus:outline-none cursor-pointer"
            >
              <option value="all" className="bg-white text-slate-900">{t.catAll}</option>
              <option value="grocery" className="bg-white text-slate-900">{t.catDailyGrocery}</option>
              <option value="mobilesLaptops" className="bg-white text-slate-900">{t.catMobilesLaptops}</option>
              <option value="fashion" className="bg-white text-slate-900">{t.catFashion}</option>
              <option value="footwear" className="bg-white text-slate-900">{t.catFootwear}</option>
              <option value="homeKitchen" className="bg-white text-slate-900">{t.catHomeKitchen}</option>
              <option value="beautyPersonalCare" className="bg-white text-slate-900">{t.catBeautyPersonalCare}</option>
              <option value="healthFitness" className="bg-white text-slate-900">{t.catHealthFitness}</option>
              <option value="homeDecor" className="bg-white text-slate-900">{t.catHomeDecor}</option>
              <option value="booksStationery" className="bg-white text-slate-900">{t.catBooksStationery}</option>
              <option value="babyPet" className="bg-white text-slate-900">{t.catBabyPet}</option>
              <option value="under999" className="bg-white text-slate-900">{t.catUnder999}</option>
            </select>
          </div>

          {/* Attached Image Thumbnail Chip */}
          {uploadedImagePreview && (
            <div className="flex items-center gap-1.5 ml-2 py-1 px-2 rounded-lg bg-amber-100 border border-amber-300 text-xs text-amber-900 shrink-0">
              <img
                src={uploadedImagePreview}
                alt="Visual query"
                className="w-6 h-6 rounded object-cover"
              />
              <span className="hidden sm:inline font-bold">Photo Match</span>
              <button
                type="button"
                onClick={clearImage}
                className="hover:text-black p-0.5"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Text Input with Instant Clear & Live Auto-Suggestions Dropdown */}
          <div className="relative flex-1 flex items-center min-w-0">
            <input
              type="text"
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Amazon, Flipkart, Myntra, Croma, Ajio & D2C (e.g. Blazer, Earbuds, Shoes...)"
              className="w-full bg-transparent px-3 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-500 font-medium focus:outline-none min-w-0"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="p-1 mr-1 text-slate-400 hover:text-slate-700 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors"
                title="Clear input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Live Auto-Suggestions Box */}
            {isSearchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xl z-50 animate-fade-in text-left space-y-3">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block mb-1.5 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    Popular & Trending Searches
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {TRENDING_SEARCHES.map((query) => (
                      <button
                        key={query}
                        type="button"
                        onMouseDown={() => handleTrendingClick(query)}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 hover:text-amber-900 border border-slate-200 hover:border-amber-400 text-xs transition-colors flex items-center gap-1 font-semibold"
                      >
                        <Search className="w-3 h-3 text-slate-400" />
                        <span>{query}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>💡 Press <strong className="text-slate-900">Enter</strong> to compare across 12+ stores</span>
                  <span className="text-emerald-600 font-bold font-mono">100% Free True Landed Price Audit</span>
                </div>
              </div>
            )}
          </div>

          {/* Multilingual Voice Assistant Button */}
          <button
            type="button"
            onClick={onOpenVoiceModal}
            title={`Voice Search in ${currentLangObj.nativeName} (${currentLangObj.locale})`}
            className="p-2.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition-all shrink-0"
          >
            <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          </button>

          {/* Drag-and-Drop / Upload Camera Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Upload product or moodboard photo for visual search"
            className="p-2.5 text-slate-500 hover:text-amber-600 hover:bg-slate-100 transition-all shrink-0"
          >
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleImageFile(e.target.files[0])}
            className="hidden"
          />

          {/* Prominent Amazon-Style Golden Search Button */}
          <button
            type="submit"
            className="px-6 sm:px-8 py-3 bg-[#FEBD69] hover:bg-[#F3A847] active:bg-[#E5973A] text-slate-950 font-black text-xs sm:text-sm shrink-0 transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            title="Search Amazon, Flipkart, Myntra, Ajio, Nykaa, Croma, Reliance Digital, Tata CLiQ, Meesho & D2C"
          >
            <Search className="w-4 h-4 text-slate-950 stroke-[3]" />
            <span className="hidden sm:inline font-bold">Search</span>
          </button>
        </form>

      </div>

    </header>
  );
}
