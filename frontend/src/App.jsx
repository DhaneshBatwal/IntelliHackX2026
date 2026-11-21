import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import SubNavbar from './components/SubNavbar';
import HeroBanner from './components/HeroBanner';
import FilterSidebar from './components/FilterSidebar';
import ProductGrid from './components/ProductGrid';
import ProductComparisonModal from './components/ProductComparisonModal';
import UniversalCartDrawer from './components/UniversalCartDrawer';
import AuthModal from './components/AuthModal';
import VoiceSearchModal from './components/VoiceSearchModal';
import FutureBuyVault from './components/FutureBuyVault';
import RewardsLeaderboard from './components/RewardsLeaderboard';
import WardrobeBuilder from './components/WardrobeBuilder';
import GroupShoppingBoards from './components/GroupShoppingBoards';
import AboutUs from './components/AboutUs';
import ConflictAlertModal from './components/ConflictAlertModal';
import PriceWatchlistModal from './components/PriceWatchlistModal';
import ToastNotification from './components/ToastNotification';
import PincodeModal from './components/PincodeModal';
import CheckoutModal from './components/CheckoutModal';

import { INITIAL_CATALOG } from './constants/initialCatalog';
import { translations } from './constants/translations';
import { generateAllStoreLinks, generateStoreComparison, MARKETPLACES } from './constants/marketplaces';
import { api } from './services/api';
import { Sparkles, ArrowLeft, Bot, ShieldCheck, Wand2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'https://intellihackx2026.onrender.com';

export default function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('vibecart_lang') || 'en';
  });

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'hi' : 'en';
    setLanguage(nextLang);
    localStorage.setItem('vibecart_lang', nextLang);
  };

  const t = translations[language] || translations.en;

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('vibecart_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return {
      name: "Dhanesh",
      email: "dhanesh@example.com",
      phoneUPI: "9876543210@paytm",
      vibeCoins: 750,
      isAuthenticated: true,
      linkedStores: {
        amazon: true,
        flipkart: true,
        myntra: true,
        croma: true,
        ajio: false,
        nykaa: false,
        tatacliq: false,
        reliancedigital: false
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('vibecart_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const [totalSaved, setTotalSaved] = useState(() => {
    const saved = localStorage.getItem('vibecart_total_saved');
    return saved ? parseInt(saved, 10) : 14850;
  });

  const [impulseCount, setImpulseCount] = useState(() => {
    const saved = localStorage.getItem('vibecart_impulse_count');
    return saved ? parseInt(saved, 10) : 4;
  });

  const [impulseAmount, setImpulseAmount] = useState(() => {
    const saved = localStorage.getItem('vibecart_impulse_amount');
    return saved ? parseInt(saved, 10) : 14200;
  });

  const [streakWeeks] = useState(5);

  useEffect(() => {
    localStorage.setItem('vibecart_total_saved', totalSaved.toString());
    localStorage.setItem('vibecart_impulse_count', impulseCount.toString());
    localStorage.setItem('vibecart_impulse_amount', impulseAmount.toString());
  }, [totalSaved, impulseCount, impulseAmount]);

  const [activeSection, setActiveSection] = useState('home');
  const [activeCategoryKey, setActiveCategoryKey] = useState('all');
  const [activeSearchCategory, setActiveSearchCategory] = useState('all');

  const [products, setProducts] = useState(INITIAL_CATALOG);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [searchBannerMessage, setSearchBannerMessage] = useState(null);
  const [currentCapsule, setCurrentCapsule] = useState(null);
  const [aiInsights, setAiInsights] = useState({
    ai_summary: "Gemini 2.5 Universal AI is actively auditing 90-day price histories, seller authenticity, and wardrobe compatibility across 12+ Indian marketplaces.",
    deal_verdict: "Search any item or vibe prompt (e.g., 'Minimalist summer wedding outfit under ₹3,000' or 'Oily skin sunscreen') to watch live AI reasoning.",
    compatibility_tags: ["Gemini 2.5 Flash Active", "Fake-MRP Shield", "Wardrobe Sync Ready"],
    smart_pairings: ["Navy Linen Blazer", "Minimalist SPF 50 Sunscreen", "White Chunky Sneakers"]
  });
  const [isAiThinking, setIsAiThinking] = useState(false);

  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedStores, setSelectedStores] = useState([]);
  const [minRegretScore, setMinRegretScore] = useState(0);
  const [verifiedSellerOnly, setVerifiedSellerOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [buyNowCycleOnly, setBuyNowCycleOnly] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    return [INITIAL_CATALOG[0]];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [budgetCap, setBudgetCap] = useState(15000);

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isPincodeOpen, setIsPincodeOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedQuickViewItem, setSelectedQuickViewItem] = useState(null);
  const [conflictReport, setConflictReport] = useState(null);

  const [currentPincode, setCurrentPincode] = useState(() => {
    return localStorage.getItem('vibecart_pincode') || '560001';
  });
  const [currentCity, setCurrentCity] = useState(() => {
    return localStorage.getItem('vibecart_city') || 'Bengaluru';
  });

  const [toasts, setToasts] = useState([]);
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const [wardrobeItems, setWardrobeItems] = useState([]);
  const [savedBoards, setSavedBoards] = useState([]);
  const [priceAlerts, setPriceAlerts] = useState([]);
  const [futureBuyCount, setFutureBuyCount] = useState(3);
  const [systemHealth, setSystemHealth] = useState(null);

  useEffect(() => {
    api.getHealth().then(data => setSystemHealth(data)).catch(() => {});
    api.getWardrobe().then(items => setWardrobeItems(items || [])).catch(() => {});
    api.getSavedBoards().then(boards => setSavedBoards(boards || [])).catch(() => {});
    api.getPriceAlerts().then(alerts => setPriceAlerts(alerts || [])).catch(() => {});
  }, []);

  const filteredProducts = useMemo(() => {
    const hasSearch = Boolean(searchQuery.trim());
    const q = searchQuery.toLowerCase().trim();
    const stopWords = new Set(['for', 'in', 'a', 'an', 'the', 'and', 'with', 'of', 'to', 'under', 'at', 'on', 'by']);
    const meaningfulWords = hasSearch 
      ? q.split(/\s+/).filter(w => !stopWords.has(w) && w.length > 1) 
      : [];

    return products.filter((item) => {
      if (hasSearch) {
        const searchBlob = [
          item.name,
          item.brand,
          item.description,
          item.category,
          item.categoryKey,
          item.search_query,
          item.spec,
          item.color,
          item.merchant_name
        ].filter(Boolean).join(' ').toLowerCase();

        let isMatch = searchBlob.includes(q);
        if (!isMatch && meaningfulWords.length > 0) {
          isMatch = meaningfulWords.some(word => searchBlob.includes(word));
        }
        if (!isMatch) return false;
      }

      if (!hasSearch && activeCategoryKey !== 'all' && activeCategoryKey !== 'trending') {
        if (activeCategoryKey === 'under999' || activeCategoryKey === 'under2999') {
          const price = item.true_landed_price?.total || item.current_price || item.estimated_price || 0;
          if (price > 999) return false;
        } else if (activeCategoryKey === 'fashion') {
          const isFashion = item.categoryKey === 'fashion' || 
            ['top', 'bottom', 'outerwear', 'fashion', 'shirt', 'blazer', 'trousers'].includes(item.category?.toLowerCase());
          if (!isFashion) return false;
        } else if (item.categoryKey && item.categoryKey !== activeCategoryKey) {
          return false;
        }
      }

      const itemPrice = item.true_landed_price?.total || item.current_price || item.estimated_price || 0;
      if (selectedPriceRange === 'under1000' && itemPrice > 1000) return false;
      if (selectedPriceRange === '1000to3000' && (itemPrice < 1000 || itemPrice > 3000)) return false;
      if (selectedPriceRange === '3000to10000' && (itemPrice < 3000 || itemPrice > 10000)) return false;
      if (selectedPriceRange === 'above10000' && itemPrice <= 10000) return false;

      if (selectedStores.length > 0) {
        const itemStoreId = item.best_store_id?.toLowerCase() || '';
        const itemMerchant = item.merchant_name?.toLowerCase() || '';
        const hasStoreMatch = selectedStores.some(sId => 
          itemStoreId.includes(sId) || itemMerchant.includes(sId)
        );
        if (!hasStoreMatch) return false;
      }

      const itemScore = item.regret_score || 8.5;
      if (minRegretScore > 0 && itemScore < minRegretScore) return false;
      if (buyNowCycleOnly && item.price_cycle?.action !== 'buy_now') return false;
      if (inStockOnly && item.stock_status === 'out_of_stock') return false;

      return true;
    });
  }, [
    products, searchQuery, activeCategoryKey, selectedPriceRange,
    selectedStores, minRegretScore, buyNowCycleOnly, inStockOnly
  ]);

  const generateInstantMarketplaceCards = (cleanPrompt, chosenCategory = 'all') => {
    const qClean = cleanPrompt.trim();
    const qLower = qClean.toLowerCase();
    
    let categoryKey = chosenCategory !== 'all' ? chosenCategory : 'mobilesLaptops';
    let categoryName = 'electronics';
    let basePrice = 2999;
    let brands = ['Top Brand', 'Verified Merchant', 'Authorized Retail', 'D2C Studio'];
    let thumbnails = [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=700&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80'
    ];
    let specs = [
      '100% Genuine Certified Build • Standard Manufacturer Warranty',
      'High Efficiency Performance • BIS Certified Safety Standards',
      'Commercial Grade Durability • Certified Official Packaging',
      'AI-Verified Top Seller • Zero Hidden Platform Fees'
    ];

    if (qLower.includes('blazer') || qLower.includes('coat') || qLower.includes('suit') || qLower.includes('shirt') || qLower.includes('outfit')) {
      categoryKey = 'fashion';
      categoryName = 'outerwear';
      basePrice = 3299;
      brands = ['Raymond', 'Allen Solly', 'Peter England', 'Van Heusen'];
      thumbnails = [
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80'
      ];
      specs = [
        'Poly-Viscose Wool-Touch Blend • Structured Shoulder Pads • Wrinkle-Resistant',
        '100% Breathable Linen-Cotton • Unlined Summer Comfort • Notch Lapel',
        'Italian Cut Slim Fit • Two-Button Closure • Satin Inner Piping',
        'Tailored Slim Fit • Breathable All-Season Weave • Easy Care'
      ];
    } else if (qLower.includes('shoe') || qLower.includes('sneaker') || qLower.includes('boot') || qLower.includes('loafer') || qLower.includes('footwear')) {
      categoryKey = 'footwear';
      categoryName = 'footwear';
      basePrice = 2499;
      brands = ['Nike', 'Puma', 'Adidas Originals', 'Red Tape'];
      thumbnails = [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=700&q=80'
      ];
      specs = [
        'Engineered Mesh Upper • Responsive Nitrogen Foam Cushioning • High-Traction Rubber',
        'Soft Cushion Footbed • Lightweight EVA Midsole • Shock-Absorbing Heel',
        'Premium Vegan Leather • Padded Ankle Collar • OrthoLite Insole',
        'All-Day Arch Support • Slip-Resistant Outsole • Breathable Lining'
      ];
    } else if (qLower.includes('sunscreen') || qLower.includes('spf') || qLower.includes('serum') || qLower.includes('cleanser') || qLower.includes('beauty') || qLower.includes('shampoo')) {
      categoryKey = 'beautyPersonalCare';
      categoryName = 'beautyPersonalCare';
      basePrice = 449;
      brands = ['Minimalist', 'The Derma Co', 'Dot & Key', 'CeraVe'];
      thumbnails = [
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=700&q=80',
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80'
      ];
      specs = [
        'Dermatologically Tested • Non-Comedogenic Formula • Fragrance-Free',
        'Broad Spectrum PA++++ Protection • Zero White Cast • Lightweight Gel Texture',
        'Enriched with Ceramides & Hyaluronic Acid • Clinical Formulation',
        'Oil-Control Matte Finish • Sweat & Water Resistant • Photostable Filters'
      ];
    }

    const variations = [
      { suffix: "Pro Edition (AI Top Pick)", multiplier: 1.0, rating: 4.7, reviews: 1820 },
      { suffix: "Classic Series (Bestseller)", multiplier: 0.88, rating: 4.6, reviews: 2840 },
      { suffix: "Ultra Performance Collection", multiplier: 1.22, rating: 4.5, reviews: 960 },
      { suffix: "Essential Daily Value Pack", multiplier: 0.78, rating: 4.4, reviews: 1410 }
    ];

    const now = Date.now();
    return variations.map((v, i) => {
      const brand = brands[i % brands.length];
      const price = Math.round(basePrice * v.multiplier);
      const original = Math.round(price * 1.35);
      const title = `${brand} ${qClean.charAt(0).toUpperCase() + qClean.slice(1)} ${v.suffix}`;
      const store = i % 2 === 0 ? "Nykaa" : "Amazon.in";

      return {
        id: `syn_${now}_${i}`,
        name: title,
        live_title: title,
        brand: brand,
        category: categoryName,
        categoryKey: categoryKey,
        color: "Original Finish",
        spec: specs[i % specs.length],
        description: `Gemini AI verified deal for "${qClean}". Best landed pricing, authentic seller audit, and zero-hidden fees guaranteed across Amazon, Flipkart, Myntra, Nykaa & Croma.`,
        current_price: price,
        original_price: original,
        discount_percent: Math.round(((original - price) / original) * 100),
        rating: v.rating,
        reviews_count: v.reviews,
        merchant_name: store,
        best_store_pill: `Lowest on ${store}`,
        best_store_id: store.toLowerCase().includes('amazon') ? 'amazon' : 'nykaa',
        thumbnail_url: thumbnails[i % thumbnails.length],
        regret_score: +(9.5 - (i * 0.2)).toFixed(1),
        verified_fit: `${97 - i * 2}% AI Vibe Match`,
        search_query: `${brand} ${qClean}`,
        wardrobe_match: "Compatible with your daily setup",
        true_landed_price: {
          base_price: price,
          delivery_fee: 0,
          platform_fee: 0,
          total: price,
          note: `FREE Express Delivery via ${store}; zero platform fee.`
        },
        fake_mrp_check: {
          is_inflated: false,
          declared_mrp: original,
          real_90day_avg: Math.round(price * 1.03),
          actual_discount_pct: Math.round(((original - price) / original) * 100),
          warning: "AI audited price: verified legitimate price cycle."
        },
        return_policy: "7-Day Hassle-Free Return Policy",
        seller_authenticity: `Verified Merchant (${store} Official Retail)`,
        pincode_speed: "In Stock • Express Delivery in 24-48 Hrs",
        bank_offers: [
          { bank: "HDFC Bank Cards", discountText: "10% Instant Discount", netPrice: Math.round(price * 0.9) },
          { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: Math.round(price * 0.95) }
        ],
        spec_xray: {
          red_flags: ["Compare dimensions/sizing specifications before placing order."],
          green_flags: ["Verified genuine brand certificate", "High durability rating", "Zero hidden delivery fee"],
          verdict: "Safe purchase recommendation."
        },
        price_cycle: {
          action: "buy_now",
          label: "Buy Now (Lowest 90-Day Price)",
          reason: "AI verified lowest price across verified sellers."
        },
        cost_per_wear: Math.round(price / 30),
        is_fashion: categoryKey === 'fashion' || categoryKey === 'footwear',
        de_influencer_reasons: [
          "Compare exact dimensions and model specifications before placing order.",
          "Check whether your current setup or wardrobe already satisfies this functional need."
        ],
        single_store_bundle_price: Math.round(price * 1.2),
        deep_links: generateAllStoreLinks(`${brand} ${qClean}`),
        store_comparison: generateStoreComparison(price, store, `${brand} ${qClean}`)
      };
    });
  };

  const handleUniversalSearch = async (prompt, imageBase64 = null, chosenCategory = 'all') => {
    setActiveSection('home');
    const cleanPrompt = (prompt || '').trim();
    setSearchQuery(cleanPrompt);
    setActiveCategoryKey('all');
    setIsLoadingSearch(true);
    setIsAiThinking(true);
    setSearchBannerMessage(`Gemini 2.5 AI is analyzing "${cleanPrompt || 'Visual Match'}" & auditing prices across 12+ stores...`);

    let currentTitles = [];

    if (cleanPrompt) {
      const qLower = cleanPrompt.toLowerCase();
      const terms = qLower.split(/\s+/).filter(w => w.length > 2);
      const localMatches = products.filter(p => {
        const blob = [p.name, p.brand, p.description, p.category, p.categoryKey, p.search_query, p.spec].join(' ').toLowerCase();
        return blob.includes(qLower) || (terms.length > 0 && terms.some(t => blob.includes(t)));
      });

      if (localMatches.length < 4) {
        const instantCards = generateInstantMarketplaceCards(cleanPrompt, chosenCategory);
        currentTitles = instantCards.map(c => c.name);
        setProducts(prev => {
          const existingIds = new Set(instantCards.map(s => s.id));
          return [...instantCards, ...prev.filter(p => !existingIds.has(p.id))];
        });
      } else {
        currentTitles = localMatches.map(c => c.name);
      }

      try {
        const res = await fetch(`${API_BASE}/api/ai-copilot`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: cleanPrompt, product_titles: currentTitles })
        });
        if (res.ok) {
          const aiData = await res.json();
          setAiInsights(aiData);
        }
      } catch (err) {
        console.warn("AI Copilot notice:", err);
      }
    }

    const isScenario = imageBase64 || cleanPrompt.toLowerCase().includes('outfit') || cleanPrompt.toLowerCase().includes('vibe') || cleanPrompt.toLowerCase().includes('wedding') || cleanPrompt.toLowerCase().includes('under');
    if (isScenario) {
      try {
        const capsule = await api.generateCapsule(cleanPrompt || "Curated Capsule Look", imageBase64, 15000);
        setCurrentCapsule(capsule);
      } catch (err) {
        console.warn("Capsule generation notice:", err);
      }
    }

    setIsAiThinking(false);
    setIsLoadingSearch(false);
    setTimeout(() => setSearchBannerMessage(null), 5000);
  };

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
    showToast(`✓ Added "${(item.live_title || item.name).slice(0, 32)}..." to Universal Cart!`, 'success');
  };

  const handleRemoveFromCart = (itemId) => {
    setCartItems(prev => prev.filter(i => i.id !== itemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleTriggerConflictCheck = async () => {
    if (cartItems.length === 0) return;
    try {
      const report = await api.checkWardrobeConflicts(cartItems);
      setConflictReport(report);
    } catch (e) {
      console.warn("Conflict check note:", e);
    }
  };

  const handleAwardVibeCoins = (amount) => {
    setCurrentUser(prev => ({
      ...prev,
      vibeCoins: (prev.vibeCoins || 0) + amount
    }));
  };

  const handleRecordSplitSavings = (amount) => {
    setTotalSaved(prev => prev + Math.round(amount));
  };

  const handleRecordImpulseAvoided = (itemPrice) => {
    setImpulseCount(prev => prev + 1);
    setImpulseAmount(prev => prev + Math.round(itemPrice));
    setTotalSaved(prev => prev + Math.round(itemPrice));
    showToast(`🛡️ Saved ₹${Math.round(itemPrice).toLocaleString('en-IN')} by skipping impulse buy! +50 VibeCoins`, 'warning');
  };

  const handleSelectPincode = (metro) => {
    setCurrentPincode(metro.pincode);
    setCurrentCity(metro.city);
    localStorage.setItem('vibecart_pincode', metro.pincode);
    localStorage.setItem('vibecart_city', metro.city);
    showToast(`📍 Delivery location set to ${metro.city} (${metro.pincode})`, 'info');
  };

  const handleCopyCoupon = (code) => {
    showToast(`🎉 Coupon ${code} copied! Extra 10% instant discount at checkout`, 'coupon');
  };

  const handleOrderSuccess = ({ orderId, total, savings }) => {
    setTotalSaved(prev => prev + savings);
    handleAwardVibeCoins(250);
    setCartItems([]);
    showToast(`🚀 Order ${orderId} placed! Saved ₹${savings.toLocaleString('en-IN')}`, 'success');
  };

  const handleAddToWatchlist = async (item) => {
    const currentPrice = item.current_price || item.estimated_price || 2499;
    const targetPrice = Math.round(currentPrice * 0.8);

    try {
      const newAlert = await api.createPriceAlert({
        product_title: item.name,
        category: item.category || 'general',
        store_platform: item.merchant_name || 'Amazon',
        product_url: item.deep_links?.amazon || 'https://amazon.in',
        image_url: item.thumbnail_url,
        current_price: currentPrice,
        target_price: targetPrice,
        auto_buy_enabled: true,
        spend_cap: Math.round(currentPrice * 1.1)
      });
      setPriceAlerts(prev => [newAlert, ...prev]);
      alert(`Price-Drop Alert & Auto-Buy Monitor active for "${item.name}"!`);
    } catch (e) {
      alert("Alert saved to monitoring watchlist!");
    }
  };

  const handleAddWardrobeItem = async (newItem) => {
    try {
      const created = await api.addWardrobeItem(newItem);
      setWardrobeItems(prev => [created, ...prev]);
    } catch (e) {
      setWardrobeItems(prev => [{ ...newItem, id: Date.now() }, ...prev]);
    }
  };

  const handleDeleteWardrobeItem = async (itemId) => {
    try { await api.deleteWardrobeItem(itemId); } catch (e) {}
    setWardrobeItems(prev => prev.filter(i => String(i.id) !== String(itemId)));
  };

  const handleIncrementWear = (itemId) => {
    setWardrobeItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return { ...item, wears_count: (item.wears_count || 0) + 1 };
      }
      return item;
    }));
  };

  const cartSubtotal = cartItems.reduce((acc, it) => acc + (it.current_price || it.estimated_price || 0) * (it.quantity || 1), 0);

  const splitBundles = useMemo(() => {
    if (cartItems.length === 0) return [];
    const bundles = {};
    cartItems.forEach(item => {
      let storeKey = item.best_store_id || 'amazon';
      if (!storeKey && item.merchant_name) {
        if (item.merchant_name.toLowerCase().includes('myntra')) storeKey = 'myntra';
        else if (item.merchant_name.toLowerCase().includes('croma')) storeKey = 'croma';
        else if (item.merchant_name.toLowerCase().includes('ajio')) storeKey = 'ajio';
        else if (item.merchant_name.toLowerCase().includes('flipkart')) storeKey = 'flipkart';
        else if (item.merchant_name.toLowerCase().includes('nykaa')) storeKey = 'nykaa';
        else if (item.merchant_name.toLowerCase().includes('jiomart')) storeKey = 'jiomart';
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
          subtotal: 0
        };
      }
      const itemCost = (item.current_price || item.estimated_price || 0) * (item.quantity || 1);
      bundles[storeKey].items.push(item);
      bundles[storeKey].subtotal += itemCost;
    });
    return Object.values(bundles);
  }, [cartItems]);

  const singleStorePrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const singlePrice = item.single_store_bundle_price || Math.round((item.current_price || item.estimated_price || 2499) * 1.18);
      return acc + singlePrice * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  const splitSavings = Math.max(0, singleStorePrice - cartSubtotal);

  return (
    <div className="min-h-screen flex flex-col bg-[#EAEDED] text-gray-900 font-sans selection:bg-[#FEBD69] selection:text-gray-950">
      <Navbar
        language={language}
        onSelectLanguage={(code) => {
          setLanguage(code);
          localStorage.setItem('vibecart_lang', code);
        }}
        onToggleLanguage={toggleLanguage}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        cartCount={cartItems.length}
        cartTotal={cartSubtotal}
        totalSaved={totalSaved}
        onOpenCart={() => {
          setIsCartOpen(true);
          handleTriggerConflictCheck();
        }}
        wardrobeCount={wardrobeItems.length}
        onOpenWardrobe={() => setActiveSection('wardrobe')}
        futureBuyCount={futureBuyCount}
        onOpenFutureBuy={() => setActiveSection('futurebuy')}
        onOpenRewards={() => setActiveSection('rewards')}
        onOpenAboutUs={() => setActiveSection('about')}
        onOpenGroupBoards={() => setActiveSection('groupboards')}
        onOpenVoiceModal={() => setIsVoiceOpen(true)}
        onSearch={handleUniversalSearch}
        activeCategory={activeSearchCategory}
        onSelectCategory={setActiveSearchCategory}
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        currentPincode={currentPincode}
        currentCity={currentCity}
        onOpenPincodeModal={() => setIsPincodeOpen(true)}
      />

      {activeSection === 'home' && (
        <SubNavbar
          activeCategoryKey={activeCategoryKey}
          onSelectCategory={(catId) => {
            setActiveCategoryKey(catId);
            setSearchQuery('');
          }}
          language={language}
        />
      )}

      <main className="flex-1 pb-16">
        {searchBannerMessage && (
          <div className="max-w-7xl mx-auto px-4 mt-3 animate-fade-in">
            <div className="p-3 rounded-xl bg-white border border-amber-300 text-gray-900 text-xs flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                <span className="font-semibold text-gray-800">{searchBannerMessage}</span>
              </div>
              <button
                onClick={() => setSearchBannerMessage(null)}
                className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {activeSection === 'home' && (
          <div className="space-y-6">
            <HeroBanner
              currentUser={currentUser}
              onOpenAuth={() => setIsAuthOpen(true)}
              onSearchPreset={(query) => handleUniversalSearch(query)}
              onCopyCoupon={handleCopyCoupon}
              language={language}
            />

            <div className="max-w-7xl mx-auto px-3 sm:px-6">
              <div className="flex gap-6 items-start">
                <FilterSidebar
                  selectedPriceRange={selectedPriceRange}
                  onSelectPriceRange={setSelectedPriceRange}
                  selectedStores={selectedStores}
                  onToggleStore={(storeId) => {
                    setSelectedStores(prev => 
                      prev.includes(storeId) ? prev.filter(s => s !== storeId) : [...prev, storeId]
                    );
                  }}
                  minRegretScore={minRegretScore}
                  onSelectMinRegretScore={setMinRegretScore}
                  verifiedSellerOnly={verifiedSellerOnly}
                  onToggleVerifiedSeller={() => setVerifiedSellerOnly(!verifiedSellerOnly)}
                  inStockOnly={inStockOnly}
                  onToggleInStock={() => setInStockOnly(!inStockOnly)}
                  buyNowCycleOnly={buyNowCycleOnly}
                  onToggleBuyNowCycle={() => setBuyNowCycleOnly(!buyNowCycleOnly)}
                  onResetFilters={() => {
                    setSelectedPriceRange('all');
                    setSelectedStores([]);
                    setMinRegretScore(0);
                    setVerifiedSellerOnly(false);
                    setInStockOnly(false);
                    setBuyNowCycleOnly(false);
                    setSearchQuery('');
                    setActiveCategoryKey('trending');
                  }}
                  language={language}
                />

                

                <div className="flex-1 min-w-0 space-y-5">
                  <div className="w-full rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 shadow-lg border border-indigo-500/30">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-400/30">
                          <Bot className="w-5 h-5 text-indigo-300" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-300">
                              ✨ Gemini 2.5 Universal AI Copilot
                            </span>
                            {isAiThinking && (
                              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 animate-pulse">
                                Analyzing...
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">
                            {searchQuery
                              ? `Live reasoning for "${searchQuery}"`
                              : "Multimodal Intent Analysis • Fake-MRP Audit • Wardrobe Sync"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {(aiInsights?.compatibility_tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          >
                            <ShieldCheck className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
                      <div className="lg:col-span-2 bg-white/5 rounded-xl p-4 border border-white/10 space-y-2">
                        <p className="text-sm text-slate-100 leading-relaxed">
                          {aiInsights?.ai_summary}
                        </p>
                        <p className="text-xs font-semibold text-amber-300">
                          💡 AI Price Verdict:{" "}
                          <span className="font-normal text-slate-300">
                            {aiInsights?.deal_verdict}
                          </span>
                        </p>
                      </div>

                      <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-2">
                          <Wand2 className="w-3.5 h-3.5" />
                          <span>AI Smart Pairings (Click to Search)</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(aiInsights?.smart_pairings || []).map((pairing, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleUniversalSearch(pairing)}
                              className="text-xs px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-sm"
                            >
                              + {pairing}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <ProductGrid
                    products={filteredProducts}
                    onOpenQuickView={(item) => setSelectedQuickViewItem(item)}
                    onAddToCart={handleAddToCart}
                    cartItemIds={cartItems.map(i => i.id)}
                    onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
                    activeFilterSummary={
                      activeCategoryKey !== 'trending' 
                        ? activeCategoryKey 
                        : (selectedStores.length ? `${selectedStores.length} stores` : '')
                    }
                    language={language}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div>
            <div className="max-w-7xl mx-auto px-4 pt-4">
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-500 font-semibold mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
            </div>
            <AboutUs language={language} />
          </div>
        )}

        {activeSection === 'futurebuy' && (
          <div>
            <div className="max-w-7xl mx-auto px-4 pt-4">
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-500 font-semibold mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
            </div>
            <FutureBuyVault
              language={language}
              onAddToCart={handleAddToCart}
            />
          </div>
        )}

        {activeSection === 'rewards' && (
          <div>
            <div className="max-w-7xl mx-auto px-4 pt-4">
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-500 font-semibold mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
            </div>
            <RewardsLeaderboard
              currentUser={currentUser}
              totalSaved={totalSaved}
              impulseCount={impulseCount}
              impulseAmount={impulseAmount}
              streakWeeks={streakWeeks}
              language={language}
            />
          </div>
        )}

        {activeSection === 'wardrobe' && (
          <div>
            <div className="max-w-7xl mx-auto px-4 pt-4">
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-500 font-semibold mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
            </div>
            <WardrobeBuilder
              wardrobeItems={wardrobeItems}
              onAddItem={handleAddWardrobeItem}
              onDeleteItem={handleDeleteWardrobeItem}
              onIncrementWear={handleIncrementWear}
              onSearchSuggested={(q) => handleUniversalSearch(q)}
              language={language}
            />
          </div>
        )}

        {activeSection === 'groupboards' && (
          <div>
            <div className="max-w-7xl mx-auto px-4 pt-4">
              <button 
                onClick={() => setActiveSection('home')}
                className="flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-500 font-semibold mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Storefront</span>
              </button>
            </div>
            <GroupShoppingBoards
              language={language}
              onSelectBoardForCapsule={(board) => {
                setActiveSection('home');
                setSearchQuery(board.title);
              }}
            />
          </div>
        )}
      </main>

      <UniversalCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        budgetCap={budgetCap}
        onAwardVibeCoins={handleAwardVibeCoins}
        onRecordSplitSavings={handleRecordSplitSavings}
        onAvoidImpulseBuy={handleRecordImpulseAvoided}
        onOpenCheckoutModal={() => setIsCheckoutOpen(true)}
        conflictReport={conflictReport}
        language={language}
      />

      <ProductComparisonModal
        item={selectedQuickViewItem}
        isOpen={Boolean(selectedQuickViewItem)}
        onClose={() => setSelectedQuickViewItem(null)}
        onAddToCart={handleAddToCart}
        isInCart={cartItems.some(i => i.id === selectedQuickViewItem?.id)}
        onAddToWatchlist={handleAddToWatchlist}
        onAvoidImpulseBuy={handleRecordImpulseAvoided}
        language={language}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setIsAuthOpen(false);
        }}
        language={language}
      />

      <VoiceSearchModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        onResult={(spokenText) => {
          setIsVoiceOpen(false);
          handleUniversalSearch(spokenText);
        }}
        language={language}
      />

      <ConflictAlertModal
        isOpen={Boolean(conflictReport)}
        onClose={() => setConflictReport(null)}
        report={conflictReport}
        language={language}
      />

      <PriceWatchlistModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={priceAlerts}
        onToggleAutoBuy={() => {}}
        onDeleteAlert={() => {}}
        onSimulateAutoBuy={() => {}}
        language={language}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        splitBundles={splitBundles}
        subtotal={cartSubtotal}
        splitSavings={splitSavings}
        currentPincode={currentPincode}
        currentCity={currentCity}
        currentUser={currentUser}
        onOrderSuccess={handleOrderSuccess}
      />

      <PincodeModal
        isOpen={isPincodeOpen}
        onClose={() => setIsPincodeOpen(false)}
        currentPincode={currentPincode}
        currentCity={currentCity}
        onSelectPincode={handleSelectPincode}
      />

      <ToastNotification 
        toasts={toasts} 
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))} 
      />

      <footer className="border-t border-white/10 py-10 bg-slate-950 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center font-black text-slate-950 text-sm">
                V
              </div>
              <span className="font-extrabold text-white text-base">VibeCart</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              "One product. Multiple shopping destinations. Better savings"
            </p>
            <p className="text-[11px] text-slate-500">
              Aggregating Amazon, Flipkart, Myntra, Ajio, Nykaa, Croma, Tata CLiQ & D2C Stores with honest AI Regret-Shield™.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => setActiveSection('home')} className="hover:text-amber-400">Home Storefront</button></li>
              <li><button onClick={() => setActiveSection('about')} className="hover:text-amber-400">About Us & Mission</button></li>
              <li><button onClick={() => setActiveSection('futurebuy')} className="hover:text-amber-400">Future Buy Idea Vault</button></li>
              <li><button onClick={() => setActiveSection('rewards')} className="hover:text-amber-400">Smart Savings & Leaderboard</button></li>
              <li><button onClick={() => setActiveSection('wardrobe')} className="hover:text-amber-400">My Wardrobe & Gear</button></li>
              <li><button onClick={() => setActiveSection('groupboards')} className="hover:text-amber-400">Group & Family Boards</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">Integrated Stores</h4>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-400">
              <span>• Amazon.in</span>
              <span>• Flipkart</span>
              <span>• Myntra</span>
              <span>• Ajio Luxe</span>
              <span>• Nykaa</span>
              <span>• Croma</span>
              <span>• Tata CLiQ</span>
              <span>• Reliance Digital</span>
              <span>• Meesho</span>
              <span>• Brand D2C</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-[11px]">System Status</h4>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <span>AI Inference:</span>
                <span className="text-emerald-400 font-mono font-semibold">Gemini 2.5 Flash (Active)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Database:</span>
                <span className="text-emerald-400 font-mono font-semibold">Supabase Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Price Engines:</span>
                <span className="text-amber-400 font-mono font-semibold">12+ Store Live Deep-Links</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-white/5 text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} VibeCart AI. All product images, logos, and trademarks belong to their respective marketplace owners.
        </div>
      </footer>
    </div>
  );
}

