import { generateAllStoreLinks, generateStoreComparison } from './marketplaces.js';

export const INITIAL_CATALOG = [
  // 1. DAILY ESSENTIALS & GROCERY
  {
    id: "prod_groc_1",
    name: "Tata Sampann Pure Unpolished Organic Toor Dal (1kg)",
    brand: "Tata Sampann",
    category: "grocery",
    categoryKey: "grocery",
    color: "Golden Yellow",
    spec: "100% Unpolished • High Protein • No Artificial Color / Polish",
    description: "Naturally dried, water-free unpolished pigeon pea dal retaining its natural nutrient value and wholesome dietary fiber.",
    current_price: 189.0,
    original_price: 240.0,
    discount_percent: 21,
    rating: 4.6,
    reviews_count: 8420,
    merchant_name: "JioMart",
    best_store_pill: "Lowest on JioMart (₹189)",
    best_store_id: "jiomart",
    thumbnail_url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.8,
    verified_fit: "100% Organic Purity",
    search_query: "tata sampann toor dal 1kg",
    wardrobe_match: "Pantry Staple: High protein essential",
    true_landed_price: {
      base_price: 189.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 189.0,
      note: "FREE delivery via JioMart Quick; zero platform surcharge."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 240,
      real_90day_avg: 195,
      actual_discount_pct: 21,
      warning: "Genuine grocery pricing; MRP matches FSSAI regulated retail pack."
    },
    return_policy: "Non-Returnable (Perishable Grocery)",
    seller_authenticity: "Authorized FMCG Distributor (Reliance Retail / JioMart)",
    pincode_speed: "In Stock • Express Delivery in 4 Hours to 560001",
    bank_offers: [
      { bank: "JioPay UPI", discountText: "₹25 Cashback on orders above ₹149", netPrice: 164.0 },
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: 179.5 }
    ],
    spec_xray: {
      red_flags: ["Cooks 5 mins slower than chemically polished dal (needs soaking)."],
      green_flags: ["Zero synthetic leather-polish oils", "Unpolished nutrient skin intact", "No added moisture weighting"],
      verdict: "High-integrity staple dal with clean lab purity tests."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Current ₹189 price is stable grocery wholesale tier."
    },
    cost_per_wear: 9,
    is_fashion: false,
    de_influencer_reasons: [
      "Takes 3-4 whistles more to cook than polished dal due to natural grain coat.",
      "Perishable staple; do not buy in bulk if you cook less than once a week.",
      "Available locally at nearby kirana without waiting for delivery slots."
    ],
    single_store_bundle_price: 240.0,
    deep_links: generateAllStoreLinks("tata sampann toor dal 1kg"),
    store_comparison: generateStoreComparison(189, "JioMart")
  },
  {
    id: "prod_groc_2",
    name: "Fortune Sunlite Refined Sunflower Oil (5L Jar)",
    brand: "Fortune / Adani Wilmar",
    category: "grocery",
    categoryKey: "grocery",
    color: "Clear Gold",
    spec: "Enriched with Vitamins A & D • Light & Low Absorbing",
    description: "Multi-stage refined sunflower oil with high smoke point, ideal for everyday Indian deep frying and light sautéing.",
    current_price: 649.0,
    original_price: 850.0,
    discount_percent: 24,
    rating: 4.5,
    reviews_count: 5310,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (Fresh)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.4,
    verified_fit: "FSSAI Grade 1",
    search_query: "fortune sunflower oil 5 litre jar",
    wardrobe_match: "Kitchen Bulk Staple",
    true_landed_price: {
      base_price: 649.0,
      delivery_fee: 0,
      platform_fee: 5,
      total: 654.0,
      note: "Amazon ₹5 handling fee added at checkout."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 850,
      real_90day_avg: 680,
      actual_discount_pct: 24,
      warning: "Genuine commodity price drop following global seed oil index."
    },
    return_policy: "Non-Returnable (Food Product)",
    seller_authenticity: "Authorized Brand Seller (Fortune Direct via Amazon)",
    pincode_speed: "In Stock • Next-Morning Delivery to 560001",
    bank_offers: [
      { bank: "SBI Credit Card", discountText: "10% Instant Discount on grocery over ₹500", netPrice: 584.0 },
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: 616.5 }
    ],
    spec_xray: {
      red_flags: ["Refined oil; cold-pressed mustard or sesame offers better micronutrients."],
      green_flags: ["High smoke point (232°C)", "Fortified with Vitamin A & D", "Zero trans fats"],
      verdict: "Reliable, neutral-taste daily cooking oil with consistent batch quality."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "5L jar price at ₹649 is currently ₹50 lower than local supermarket MRP."
    },
    cost_per_wear: 12,
    is_fashion: false,
    de_influencer_reasons: [
      "Bulky 5L jar is awkward to pour without a secondary countertop dispenser.",
      "Refined through chemical bleaching; not a cold-pressed virgin seed oil.",
      "Check expiration date upon arrival to ensure at least 6 months shelf life."
    ],
    single_store_bundle_price: 850.0,
    deep_links: generateAllStoreLinks("fortune sunflower oil 5 litre jar"),
    store_comparison: generateStoreComparison(649, "Amazon.in")
  },

  // 2. HOME & KITCHEN APPLIANCES
  {
    id: "prod_app_1",
    name: "Prestige Iris 750W 4-Jar Mixer Grinder with Overload Protector",
    brand: "Prestige",
    category: "homeKitchen",
    categoryKey: "homeKitchen",
    color: "White & Blue",
    spec: "750 Watt Heavy-Duty Copper Motor • 3 Stainless Steel Jars + 1 Juicer Jar",
    description: "Versatile Indian kitchen workhorse equipped with 3-speed rotary switch, durable nylon coupler, and safety lock for batters and dry spices.",
    current_price: 2799.0,
    original_price: 6195.0,
    discount_percent: 55,
    rating: 4.3,
    reviews_count: 34100,
    merchant_name: "Flipkart",
    best_store_pill: "Lowest on Flipkart (₹2,799)",
    best_store_id: "flipkart",
    thumbnail_url: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=700&q=80",
    regret_score: 8.9,
    verified_fit: "ISI Certified Motor",
    search_query: "prestige iris 750 watt mixer grinder",
    wardrobe_match: "Kitchen Workstation Core",
    true_landed_price: {
      base_price: 2799.0,
      delivery_fee: 49,
      platform_fee: 5,
      total: 2853.0,
      note: "Flipkart ₹49 secure packaging fee + ₹5 platform fee included."
    },
    fake_mrp_check: {
      is_inflated: true,
      declared_mrp: 6195,
      real_90day_avg: 2950,
      actual_discount_pct: 12,
      warning: "⚠️ Inflated MRP Alert! Real 90-day market price is ₹2,950, not ₹6,195. Actual savings: 12%, not 55%!"
    },
    return_policy: "7-Day Free Replacement on Defect",
    seller_authenticity: "Authorized Prestige Distributor (RetailNet on Flipkart)",
    pincode_speed: "In Stock • Delivery in 2 Days to 560001",
    bank_offers: [
      { bank: "Flipkart Axis Card", discountText: "5% Unlimited Cashback", netPrice: 2659.0 },
      { bank: "HDFC Debit Card", discountText: "₹250 Instant Discount", netPrice: 2549.0 }
    ],
    spec_xray: {
      red_flags: ["Operating noise exceeds 85 dB (loud during high-speed grinding)", "Plastic base coupler wears out in 2 years of daily hard dal grinding"],
      green_flags: ["Pure copper motor windings", "Stainless steel 304 grade jars", "Overload thermal trip button"],
      verdict: "High-value, reliable grinder for daily idli batter and chutneys if noise isn't an issue."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹2,799 is the lowest price point outside festival sales."
    },
    cost_per_wear: 8,
    is_fashion: false,
    de_influencer_reasons: [
      "Loud motor sound will disturb household sleep in morning breakfast prep.",
      "Jar lids fit very tightly initially; requires firm downward thumb pressure.",
      "Fake 55% discount tag: this product regularly sells between ₹2,800 - ₹3,100."
    ],
    single_store_bundle_price: 3499.0,
    deep_links: generateAllStoreLinks("prestige iris 750 watt mixer grinder"),
    store_comparison: generateStoreComparison(2799, "Flipkart")
  },

  // 3. MOBILES & LAPTOPS
  {
    id: "prod_tech_1",
    name: "OnePlus 12R 5G (16GB RAM, 256GB Cool Blue)",
    brand: "OnePlus",
    category: "mobilesLaptops",
    categoryKey: "mobilesLaptops",
    color: "Cool Blue",
    spec: "Snapdragon 8 Gen 2 • 1.5K 120Hz ProXDR Display • 5500mAh 100W SUPERVOOC",
    description: "Flagship-tier performance with massive dual-cell battery, aluminum frame, and hyper-responsive thermal cooling architecture.",
    current_price: 39999.0,
    original_price: 45999.0,
    discount_percent: 13,
    rating: 4.7,
    reviews_count: 9840,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (Bank ₹2,000 Off)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.6,
    verified_fit: "100% Official OnePlus Warranty",
    search_query: "oneplus 12r 5g 16gb 256gb",
    wardrobe_match: "Mobile Daily Driver",
    true_landed_price: {
      base_price: 39999.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 39999.0,
      note: "FREE Prime Delivery; 100W charger included in box."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 45999,
      real_90day_avg: 41999,
      actual_discount_pct: 13,
      warning: "Genuine brand-authorized discount with active bank coupons."
    },
    return_policy: "7-Day Replacement via Service Center",
    seller_authenticity: "Authorized Brand Seller (Appario Retail on Amazon)",
    pincode_speed: "In Stock • Next-Day Delivery to 560001",
    bank_offers: [
      { bank: "ICICI / OneCard", discountText: "Flat ₹2,000 Instant Discount", netPrice: 37999.0 },
      { bank: "HDFC Bank", discountText: "₹1,500 Instant Discount on EMI", netPrice: 38499.0 }
    ],
    spec_xray: {
      red_flags: ["Secondary 2MP macro camera is practically useless", "No official IP68 rating (IP64 splash-proof only)"],
      green_flags: ["Top-tier Snapdragon 8 Gen 2 processor", "Class-leading 5500mAh battery life", "Full 100W charger in the box"],
      verdict: "Best smartphone value in India under ₹40,000 for gaming and long battery endurance."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Net ₹37,999 with ICICI bank card is the lowest price recorded since launch."
    },
    cost_per_wear: 35,
    is_fashion: false,
    de_influencer_reasons: [
      "Curved display makes finding good tempered glass screen protectors difficult.",
      "Camera hardware lacks a dedicated telephoto zoom lens (relies on digital crop).",
      "Noticeably heavy (207g) in single-handed reading."
    ],
    single_store_bundle_price: 45999.0,
    deep_links: generateAllStoreLinks("oneplus 12r 5g 16gb 256gb"),
    store_comparison: generateStoreComparison(39999, "Amazon.in")
  },

  // 4. BEAUTY & PERSONAL CARE
  {
    id: "prod_beauty_1",
    name: "Minimalist SPF 50 PA++++ Invisible Sunscreen with Niacinamide (50g)",
    brand: "Minimalist",
    category: "beautyPersonalCare",
    categoryKey: "beautyPersonalCare",
    color: "White Matte Tube",
    spec: "Broad Spectrum UVA/UVB • 4 Effective UV Filters • Zero White Cast",
    description: "Lightweight, acne-safe daily fluid sunscreen formulated with antioxidant multivitamins and soothing Centella Asiatica for Indian weather.",
    current_price: 399.0,
    original_price: 499.0,
    discount_percent: 20,
    rating: 4.6,
    reviews_count: 14200,
    merchant_name: "Nykaa",
    best_store_pill: "Lowest on Nykaa (₹399)",
    best_store_id: "nykaa",
    thumbnail_url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.7,
    verified_fit: "Dermatologically Tested",
    search_query: "minimalist spf 50 sunscreen 50g",
    wardrobe_match: "Daily Skincare Essential",
    true_landed_price: {
      base_price: 399.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 399.0,
      note: "FREE Nykaa delivery on beauty orders over ₹299."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 499,
      real_90day_avg: 440,
      actual_discount_pct: 20,
      warning: "Authentic cosmetic pricing verified against brand D2C portal."
    },
    return_policy: "Non-Returnable (Cosmetic Hygiene)",
    seller_authenticity: "Authorized Nykaa Brand Direct",
    pincode_speed: "In Stock • Delivery in 24-48 Hours to 560001",
    bank_offers: [
      { bank: "PayTM UPI", discountText: "Flat ₹30 Cashback", netPrice: 369.0 },
      { bank: "Nykaa Reward Points", discountText: "Earn 40 Nykaa Points", netPrice: 399.0 }
    ],
    spec_xray: {
      red_flags: ["Must be reapplied every 3-4 hours if sweating profusely outdoors."],
      green_flags: ["Zero comedogenic pore-clogging waxes", "No artificial perfume or fragrance", "True non-greasy invisible finish on dark skin tones"],
      verdict: "Top-performing everyday sunscreen that doesn't pill or leave a ghostly white layer."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹399 is direct manufacturer promotional tier."
    },
    cost_per_wear: 8,
    is_fashion: false,
    de_influencer_reasons: [
      "50g tube runs out in approximately 25 days if used on neck and face daily.",
      "Not fully waterproof for extended swimming sessions without reapplication.",
      "Matte finish might feel slightly dry for naturally flaky dry winter skin."
    ],
    single_store_bundle_price: 499.0,
    deep_links: generateAllStoreLinks("minimalist spf 50 sunscreen 50g"),
    store_comparison: generateStoreComparison(399, "Nykaa")
  },

  // 5. HEALTH, FITNESS & SUPPLEMENTS
  {
    id: "prod_fit_1",
    name: "MuscleBlaze Biozyme Performance Whey Protein (1kg Rich Chocolate)",
    brand: "MuscleBlaze",
    category: "healthFitness",
    categoryKey: "healthFitness",
    color: "Black & Blue Tub",
    spec: "25g Protein per scoop • 5.51g BCAA • Enhanced Absorption Formula (EAF®)",
    description: "Clinically tested whey protein designed to lower protein digestion stomach issues by 50% through patented biozyme digestive enzymes.",
    current_price: 2299.0,
    original_price: 3499.0,
    discount_percent: 34,
    rating: 4.7,
    reviews_count: 18200,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹2,299)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.5,
    verified_fit: "Informed-Choice UK Certified",
    search_query: "muscleblaze biozyme performance whey 1kg chocolate",
    wardrobe_match: "Fitness & Nutrition Routine",
    true_landed_price: {
      base_price: 2299.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 2299.0,
      note: "FREE Express Delivery with authentic scratch code authentication."
    },
    fake_mrp_check: {
      is_inflated: true,
      declared_mrp: 3499,
      real_90day_avg: 2450,
      actual_discount_pct: 6,
      warning: "⚠️ Inflated MRP: Regularly sells between ₹2,299 and ₹2,499. Real savings is ~8%."
    },
    return_policy: "Non-Returnable (Health Supplement)",
    seller_authenticity: "Authorized Brand Seller (HealthKart Official via Amazon)",
    pincode_speed: "In Stock • Next-Day Delivery to 560001",
    bank_offers: [
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: 2184.0 },
      { bank: "HDFC Credit Card", discountText: "₹150 Instant Off", netPrice: 2149.0 }
    ],
    spec_xray: {
      red_flags: ["Contains artificial sucralose sweetener for zero sugar chocolate flavor."],
      green_flags: ["Third-party lab tested protein label accuracy", "Biozyme enzymes prevent protein bloating", "Zero amino-spiking"],
      verdict: "The most trusted made-in-India protein for digestive comfort and muscle recovery."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Current ₹2,299 pricing matches annual gym season sale low."
    },
    cost_per_wear: 74,
    is_fashion: false,
    de_influencer_reasons: [
      "Rich Chocolate flavor is on the sweeter side if you mix only with water.",
      "1kg tub contains 30 servings; lasts exactly 1 month on 1 scoop/day.",
      "Whey is unnecessary if your daily diet already hits 1.6g/kg protein through food."
    ],
    single_store_bundle_price: 3499.0,
    deep_links: generateAllStoreLinks("muscleblaze biozyme performance whey 1kg chocolate"),
    store_comparison: generateStoreComparison(2299, "Amazon.in")
  },

  // 6. HOME DECOR & FURNISHINGS
  {
    id: "prod_decor_1",
    name: "Wakefit 100% Combed Cotton 240 TC Double Bedsheet with 2 Pillow Covers",
    brand: "Wakefit",
    category: "homeDecor",
    categoryKey: "homeDecor",
    color: "Sage Green Geometric",
    spec: "100% Combed Cotton • 240 Thread Count • Mercerized Finish",
    description: "Breathable all-weather pure cotton double bedsheet with deep tuck-in borders that don't come off when tossing and turning.",
    current_price: 849.0,
    original_price: 1599.0,
    discount_percent: 47,
    rating: 4.5,
    reviews_count: 6720,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹849)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.3,
    verified_fit: "100% Breathable Cotton",
    search_query: "wakefit 100 cotton bedsheet double bed",
    wardrobe_match: "Bedroom Comfort Setup",
    true_landed_price: {
      base_price: 849.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 849.0,
      note: "FREE Prime Delivery; zero hidden shipping."
    },
    fake_mrp_check: {
      is_inflated: true,
      declared_mrp: 1599,
      real_90day_avg: 999,
      actual_discount_pct: 15,
      warning: "⚠️ Declared ₹1,599 MRP is exaggerated. Real 90-day average is ₹999."
    },
    return_policy: "10-Day Easy Return & Refund",
    seller_authenticity: "Authorized Brand Seller (Wakefit Innovations)",
    pincode_speed: "In Stock • Delivery in 24 Hours to 560001",
    bank_offers: [
      { bank: "UPI Instant", discountText: "₹50 Instant Discount on ₹799+", netPrice: 799.0 },
      { bank: "Amazon Pay ICICI", discountText: "5% Cashback", netPrice: 806.5 }
    ],
    spec_xray: {
      red_flags: ["Requires cold water wash to prevent 2% initial cotton shrinkage."],
      green_flags: ["Genuine 100% combed cotton (not synthetic micro-polyester)", "Breathable 240 TC weave", "Colorfast reactive dyes"],
      verdict: "Cool, breathable sheets engineered specifically for warm Indian climates."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹849 is ₹150 cheaper than Wakefit official website direct pricing."
    },
    cost_per_wear: 3,
    is_fashion: false,
    de_influencer_reasons: [
      "Needs proper ironing after spin drying if you dislike natural cotton wrinkles.",
      "Check your mattress thickness; fitting 10+ inch mattresses requires tight tucking.",
      "Sage color tone looks slightly more muted in artificial indoor lighting."
    ],
    single_store_bundle_price: 1599.0,
    deep_links: generateAllStoreLinks("wakefit 100 cotton bedsheet double bed"),
    store_comparison: generateStoreComparison(849, "Amazon.in")
  },

  // 7. BOOKS & STATIONERY
  {
    id: "prod_book_1",
    name: "Atomic Habits by James Clear (Hardcover Collector Edition)",
    brand: "Penguin Random House",
    category: "booksStationery",
    categoryKey: "booksStationery",
    color: "Classic White & Gold",
    spec: "Hardcover Smyth-Sewn Binding • Premium Acid-Free Cream Paper",
    description: "The definitive global bestseller on tiny behavioral changes, habit loops, and compounding productivity systems.",
    current_price: 599.0,
    original_price: 899.0,
    discount_percent: 33,
    rating: 4.8,
    reviews_count: 52100,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹599)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.9,
    verified_fit: "100% Genuine Publisher Print",
    search_query: "atomic habits james clear hardcover",
    wardrobe_match: "Mindset & Desk Library",
    true_landed_price: {
      base_price: 599.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 599.0,
      note: "FREE Delivery with verified publisher hologram."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 899,
      real_90day_avg: 649,
      actual_discount_pct: 33,
      warning: "Genuine Penguin book retail MRP; hologram protected."
    },
    return_policy: "10-Day Replacement on Damaged Book",
    seller_authenticity: "Authorized Publisher Seller (Cocoblu Retail on Amazon)",
    pincode_speed: "In Stock • Next-Morning Delivery to 560001",
    bank_offers: [
      { bank: "Amazon Pay UPI", discountText: "₹25 Cashback", netPrice: 574.0 },
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: 569.0 }
    ],
    spec_xray: {
      red_flags: ["Beware of third-party fake pirate copies with blurred font print; buy only verified seller."],
      green_flags: ["Original high-contrast crisp typography", "Sturdy hardcover spine longevity", "Includes ribbon bookmark"],
      verdict: "Essential mindset reading that repays its purchase price within 1 week of implementation."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Hardcover price at ₹599 matches the paperback price."
    },
    cost_per_wear: 2,
    is_fashion: false,
    de_influencer_reasons: [
      "Core concepts can be understood from YouTube summaries if you never read books.",
      "Hardcover edition is heavier (480g) for handheld reading during commute.",
      "Reading alone creates no change without active daily behavioral execution."
    ],
    single_store_bundle_price: 899.0,
    deep_links: generateAllStoreLinks("atomic habits james clear hardcover"),
    store_comparison: generateStoreComparison(599, "Amazon.in")
  },

  // 8. BABY & PET CARE
  {
    id: "prod_baby_1",
    name: "Pampers All-Round Protection Diaper Pants (Large, 64 Count)",
    brand: "Pampers",
    category: "babyPet",
    categoryKey: "babyPet",
    color: "Soft White & Green",
    spec: "Magic Gel Technology • 12-Hour Leakage Lock • Lotion with Aloe Vera",
    description: "Ultra-absorbent diaper pants designed to protect delicate baby skin from friction, rashes, and nighttime leakages.",
    current_price: 899.0,
    original_price: 1299.0,
    discount_percent: 31,
    rating: 4.6,
    reviews_count: 22400,
    merchant_name: "Flipkart",
    best_store_pill: "Lowest on Flipkart (₹899)",
    best_store_id: "flipkart",
    thumbnail_url: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.6,
    verified_fit: "Pediatric Dermatologist Safe",
    search_query: "pampers diaper pants large 64",
    wardrobe_match: "Baby Essential Bulk Pack",
    true_landed_price: {
      base_price: 899.0,
      delivery_fee: 0,
      platform_fee: 5,
      total: 904.0,
      note: "FREE delivery on baby care essentials."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 1299,
      real_90day_avg: 949,
      actual_discount_pct: 31,
      warning: "Genuine manufacturer retail pricing."
    },
    return_policy: "Non-Returnable (Baby Hygiene)",
    seller_authenticity: "Authorized FMCG Brand Partner (RetailNet on Flipkart)",
    pincode_speed: "In Stock • Delivery in 24 Hours to 560001",
    bank_offers: [
      { bank: "Flipkart Axis Card", discountText: "5% Unlimited Cashback", netPrice: 854.0 },
      { bank: "SBI Credit Card", discountText: "10% Instant Discount on baby care", netPrice: 809.0 }
    ],
    spec_xray: {
      red_flags: ["Must size up if your baby is in the higher 12-14kg weight bracket to avoid leg marks."],
      green_flags: ["Aloe vera anti-rash soothing barrier", "Breathable microporous air channels", "Wetness indicator stripe"],
      verdict: "Top choice for uninterrupted 8-hour nighttime baby sleep without diaper rash."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹899 for 64 count equals ₹14.04 per diaper (best bulk value)."
    },
    cost_per_wear: 14,
    is_fashion: false,
    de_influencer_reasons: [
      "Bulky pack takes up significant shelf storage space in small nurseries.",
      "Disposable diapers generate plastic landfill waste; consider cloth alternatives during daytime.",
      "Check sizing carefully; weight brackets overlap between Medium and Large."
    ],
    single_store_bundle_price: 1299.0,
    deep_links: generateAllStoreLinks("pampers diaper pants large 64"),
    store_comparison: generateStoreComparison(899, "Flipkart")
  },

  // 9. FOOTWEAR
  {
    id: "prod_foot_1",
    name: "Puma Softride Rift Lightweight Running Shoes",
    brand: "Puma",
    category: "footwear",
    categoryKey: "footwear",
    color: "Black & Cool Grey",
    spec: "Softfoam+ Cushion Insole • SOFTRIDE Midsole Foam • Breathable Engineered Mesh",
    description: "Cloud-soft daily walking and workout trainer designed for maximum shock absorption and arch comfort during Indian road walking.",
    current_price: 2199.0,
    original_price: 4999.0,
    discount_percent: 56,
    rating: 4.5,
    reviews_count: 7810,
    merchant_name: "Myntra",
    best_store_pill: "Lowest on Myntra (₹2,199)",
    best_store_id: "myntra",
    thumbnail_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.2,
    verified_fit: "96% True to Size",
    search_query: "puma softride rift running shoes",
    wardrobe_match: "Pairs with your Olive Chinos & Workout Joggers",
    true_landed_price: {
      base_price: 2199.0,
      delivery_fee: 0,
      platform_fee: 20,
      total: 2219.0,
      note: "FREE shipping on Myntra over ₹1,199; ₹20 standard convenience fee."
    },
    fake_mrp_check: {
      is_inflated: true,
      declared_mrp: 4999,
      real_90day_avg: 2499,
      actual_discount_pct: 12,
      warning: "⚠️ MRP ₹4,999 is inflated. Regular running price on Puma/Myntra is ₹2,499."
    },
    return_policy: "14-Day Free Doorstep Return & Size Exchange",
    seller_authenticity: "Authorized Brand Partner (Puma Sports India via Myntra)",
    pincode_speed: "In Stock • Delivery in 48 Hours to 560001",
    bank_offers: [
      { bank: "Kotak / ICICI Card", discountText: "Flat 10% Instant Discount on Myntra", netPrice: 1979.0 },
      { bank: "Myntra Insider", discountText: "Extra ₹200 Coupon on Checkout", netPrice: 1999.0 }
    ],
    spec_xray: {
      red_flags: ["Mesh fabric is not water-resistant; absorbs water in heavy Indian monsoons."],
      green_flags: ["Extremely plush Softfoam+ heel padding", "Featherlight under 260 grams", "Durable rubber outsole traction pods"],
      verdict: "Outstanding comfort for daily 10,000 steps and gym treadmill sessions."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹2,199 is 56% off original tag; lowest tier price."
    },
    cost_per_wear: 22,
    is_fashion: true,
    de_influencer_reasons: [
      "White foam sides get dirty quickly on unpaved Indian pedestrian sidewalks.",
      "Not designed for competitive marathon racing; lacks rigid carbon-plate support.",
      "Runs slightly narrow around toe box; broad feet need 1 size up."
    ],
    single_store_bundle_price: 3499.0,
    deep_links: generateAllStoreLinks("puma softride rift running shoes"),
    store_comparison: generateStoreComparison(2199, "Myntra")
  },

  // 10. MEN'S & WOMEN'S FASHION
  {
    id: "prod_fash_1",
    name: "Single-Breasted Notch Lapel Smart Blazer",
    brand: "Park Avenue / Blackberrys",
    category: "fashion",
    categoryKey: "fashion",
    color: "Midnight Navy",
    spec: "High-Twist Poly-Viscose Stretch • Breathable Lining",
    description: "Tailored slim-fit silhouette with comfortable stretch lining and classic horn buttons. Ideal for office formals or weekend cocktails.",
    current_price: 2899.0,
    original_price: 4999.0,
    discount_percent: 42,
    rating: 4.4,
    reviews_count: 248,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹2,899)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.1,
    verified_fit: "94% Verified Fit",
    search_query: "men navy slim fit blazer",
    wardrobe_match: "Pairs with your Olive Chinos & Black Derby Shoes",
    true_landed_price: {
      base_price: 2899.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 2899.0,
      note: "FREE delivery via Amazon; zero hidden fees."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 4999,
      real_90day_avg: 3200,
      actual_discount_pct: 42,
      warning: "Genuine end-of-season formalwear discount."
    },
    return_policy: "10-Day Easy Return & Free Size Exchange",
    seller_authenticity: "Authorized Brand Retailer (Raymond Appario)",
    pincode_speed: "In Stock • Delivery in 24-48 Hours to 560001",
    bank_offers: [
      { bank: "HDFC Card", discountText: "10% Instant Discount on formals", netPrice: 2609.0 },
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: 2754.0 }
    ],
    spec_xray: {
      red_flags: ["Viscose blend traps heat in humid coastal weather (Goa/Mumbai/Chennai) above 30°C."],
      green_flags: ["High-twist crease-resistant weave", "Comfortable dual side vents", "Reinforced horn buttons"],
      verdict: "Crisp formal drape that holds shape throughout 8-hour wedding receptions and office presentations."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Current ₹2,899 price is ₹800 below the 90-day moving average on Amazon and Flipkart."
    },
    cost_per_wear: 85,
    is_fashion: true,
    de_influencer_reasons: [
      "Viscose blend traps heat in humid coastal weather (Goa/Mumbai/Chennai) above 30°C.",
      "Dry-clean recommended; machine washing degrades lapel canvassing over time.",
      "Slim-fit cut runs tight across broader athletic shoulders; requires sizing up."
    ],
    single_store_bundle_price: 3699.0,
    deep_links: generateAllStoreLinks("men navy slim fit blazer"),
    store_comparison: generateStoreComparison(2899, "Amazon.in")
  },
  {
    id: "prod_fash_2",
    name: "Crisp Supima Cotton Oxford Button-Down Shirt",
    brand: "Brooks Brothers / Raymond",
    category: "fashion",
    categoryKey: "fashion",
    color: "Optic White",
    spec: "100% Long-Staple Supima Cotton • 80s 2-Ply",
    description: "Structured collar that stays upright beneath blazers or sweaters. Soft, durable 80s two-ply weave.",
    current_price: 1499.0,
    original_price: 2499.0,
    discount_percent: 40,
    rating: 4.4,
    reviews_count: 195,
    merchant_name: "Myntra",
    best_store_pill: "Best on Myntra (₹1,499)",
    best_store_id: "myntra",
    thumbnail_url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.3,
    verified_fit: "97% Verified Fit",
    search_query: "men white oxford cotton dress shirt slim",
    wardrobe_match: "Matches your Black Derby Shoes",
    true_landed_price: {
      base_price: 1499.0,
      delivery_fee: 0,
      platform_fee: 20,
      total: 1519.0,
      note: "FREE shipping on Myntra over ₹1,199; ₹20 platform fee."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 2499,
      real_90day_avg: 1899,
      actual_discount_pct: 40,
      warning: "Genuine Supima cotton promotion."
    },
    return_policy: "14-Day Free Doorstep Return & Exchange",
    seller_authenticity: "Authorized Brand Seller on Myntra",
    pincode_speed: "In Stock • Delivery in 48 Hours to 560001",
    bank_offers: [
      { bank: "Axis Bank Card", discountText: "10% Instant Discount", netPrice: 1349.0 },
      { bank: "Myntra Coupon", discountText: "Extra ₹150 off on first formal purchase", netPrice: 1349.0 }
    ],
    spec_xray: {
      red_flags: ["Needs proper steam ironing to remove wash wrinkles."],
      green_flags: ["Authentic long-staple 80s 2-ply Supima cotton", "Reinforced button placket", "Structured collar stay"],
      verdict: "Crisp, breathable formal essential that outperforms standard polyester blends."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "40% discount on Myntra brand day; lowest tier price."
    },
    cost_per_wear: 28,
    is_fashion: true,
    de_influencer_reasons: [
      "Heavy Oxford cotton weave is stiffer and warmer than poplin; not ideal in peak summer.",
      "White collar ring accumulates sweat marks quickly; requires pre-soak treatment.",
      "Needs proper steam ironing to remove wash wrinkles."
    ],
    single_store_bundle_price: 2199.0,
    deep_links: generateAllStoreLinks("men white oxford cotton dress shirt slim"),
    store_comparison: generateStoreComparison(1499, "Myntra")
  },

  // 11. AUDIO & GADGETS
  {
    id: "prod_aud_1",
    name: "Sony WH-1000XM5 Wireless ANC Headphones",
    brand: "Sony",
    category: "mobilesLaptops",
    categoryKey: "mobilesLaptops",
    color: "Silver Platinum",
    spec: "30-Hr Battery • Industry Leading Noise Canceling • LDAC Hi-Res",
    description: "Flagship wireless over-ear headphones with 8-microphone noise cancelling architecture and ultra-soft comfort fit.",
    current_price: 26990.0,
    original_price: 34990.0,
    discount_percent: 23,
    rating: 4.8,
    reviews_count: 1420,
    merchant_name: "Croma",
    best_store_pill: "Lowest on Croma (₹26,990)",
    best_store_id: "croma",
    thumbnail_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.7,
    verified_fit: "98% Verified Authentic",
    search_query: "sony wh 1000xm5 wireless headphones",
    wardrobe_match: "Audio Setup: Flawless pairing with your laptop",
    true_landed_price: {
      base_price: 26990.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 26990.0,
      note: "FREE same-day Croma store pickup or home delivery; zero platform fees."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 34990,
      real_90day_avg: 29990,
      actual_discount_pct: 23,
      warning: "Genuine Sony price cut with Croma bank instant cashback."
    },
    return_policy: "7-Day Replacement via Sony Service Center",
    seller_authenticity: "Authorized Sony Distributor (Tata Croma Official)",
    pincode_speed: "In Stock • Same-Day Store Pickup or 24-Hr Delivery to 560001",
    bank_offers: [
      { bank: "HDFC Credit Card", discountText: "Flat ₹2,500 Instant Discount at Croma", netPrice: 24490.0 },
      { bank: "Tata Neu Card", discountText: "5% NeuCoins Cashback", netPrice: 25640.0 }
    ],
    spec_xray: {
      red_flags: ["Ear-cups cause warm ear sweat during long Indian summer sessions without AC.", "Non-folding headband makes travel case bulky."],
      green_flags: ["Unrivaled active noise cancellation across flight and office chatter", "Super-fast 3-minute charge gives 3 hours playback", "Crystal-clear microphone beamforming"],
      verdict: "Gold standard ANC headphones for deep work, coding, and frequent flights."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Croma card offer brings this to ₹24,490 net (lowest recorded this quarter)."
    },
    cost_per_wear: 18,
    is_fashion: false,
    de_influencer_reasons: [
      "Non-folding headband design makes the travel case bulky for compact backpacks.",
      "Ear-cups cause warm ear sweat during long Indian summer sessions without AC.",
      "Overkill price if you only listen to lossy Spotify audio on standard commute."
    ],
    single_store_bundle_price: 31990.0,
    deep_links: generateAllStoreLinks("sony wh 1000xm5 wireless headphones"),
    store_comparison: generateStoreComparison(26990, "Croma", "sony wh 1000xm5 wireless headphones")
  },
  {
    id: "prod_tech_earbuds_1",
    name: "OnePlus Buds 3 TWS In-Ear Earbuds with 49dB ANC & 44h Battery",
    brand: "OnePlus",
    category: "mobilesLaptops",
    categoryKey: "mobilesLaptops",
    color: "Metallic Gray / Splendid Blue",
    spec: "Dual Drivers • 49dB Smart Adaptive ANC • LHDC 5.0 Hi-Res Audio",
    description: "Premium dual-driver wireless earbuds with deep bass, dual-mic AI call noise reduction, and ultra-fast warp charge.",
    current_price: 4999.0,
    original_price: 6499.0,
    discount_percent: 23,
    rating: 4.6,
    reviews_count: 3820,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹4,999)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.5,
    verified_fit: "96% Verified Fit",
    search_query: "oneplus buds 3 wireless earbuds",
    wardrobe_match: "Audio: Pairs seamlessly with your smartphone & laptop",
    true_landed_price: {
      base_price: 4999.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 4999.0,
      note: "FREE Prime 1-Day Delivery; zero platform surcharge."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 6499,
      real_90day_avg: 5499,
      actual_discount_pct: 23,
      warning: "Genuine consumer tech deal; verified lowest quarter price."
    },
    return_policy: "7-Day Replacement for Technical Defects",
    seller_authenticity: "Authorized OnePlus Direct Seller (Appario Retail)",
    pincode_speed: "In Stock • Prime Delivery Tomorrow by 11 AM to 560001",
    bank_offers: [
      { bank: "ICICI Credit Card", discountText: "Flat ₹500 Instant Discount", netPrice: 4499.0 },
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: 4749.0 }
    ],
    spec_xray: {
      red_flags: ["LHDC 5.0 high-res codec only works on OnePlus/Oppo phones (falls back to AAC on iPhone)."],
      green_flags: ["Dual 10.4mm woofer + 6mm tweeter produces crisp audiophile vocals", "Slide volume touch controls on earbud stem", "IP55 dust and water resistance"],
      verdict: "Best sub-₹5,000 true wireless earbuds in India with flagship sound quality."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Verified ₹4,999 promotional price beats Croma & Flipkart by ₹500."
    },
    cost_per_wear: 14,
    is_fashion: false,
    de_influencer_reasons: [
      "If you use an iPhone, you lose LHDC 5.0 high-res codec support (reverts to standard AAC).",
      "Glossy stem attracts micro-scratches without a protective silicone case sleeve.",
      "Ear-tip seal is critical: try all 3 silicone tip sizes or bass response weakens by 40%."
    ],
    single_store_bundle_price: 5999.0,
    deep_links: generateAllStoreLinks("oneplus buds 3 wireless earbuds"),
    store_comparison: generateStoreComparison(4999, "Amazon.in", "oneplus buds 3 wireless earbuds")
  },
  {
    id: "prod_tech_watch_1",
    name: "Noise ColorFit Pro 5 1.85\" AMOLED Smartwatch with BT Calling",
    brand: "Noise",
    category: "accessories",
    categoryKey: "mobilesLaptops",
    color: "Jet Black / Metal Mesh",
    spec: "1.85\" AMOLED Display • Tru Sync Bluetooth Calling • SOS Alert",
    description: "Sleek metallic smartwatch featuring ultra-bright AMOLED display, rapid Bluetooth calling, 100+ sports modes, and 7-day battery life.",
    current_price: 3499.0,
    original_price: 8999.0,
    discount_percent: 61,
    rating: 4.4,
    reviews_count: 5120,
    merchant_name: "Flipkart",
    best_store_pill: "Lowest on Flipkart (₹3,499)",
    best_store_id: "flipkart",
    thumbnail_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.2,
    verified_fit: "93% Verified Fit",
    search_query: "noise colorfit pro 5 smartwatch",
    wardrobe_match: "Accessory: Complements both smart formals and athletic gym wear",
    true_landed_price: {
      base_price: 3499.0,
      delivery_fee: 0,
      platform_fee: 5,
      total: 3504.0,
      note: "Flipkart ₹5 secure packaging fee included."
    },
    fake_mrp_check: {
      is_inflated: true,
      declared_mrp: 8999,
      real_90day_avg: 3799,
      actual_discount_pct: 12,
      warning: "Declared ₹8,999 MRP is marketing anchor. True discount against 90-day avg is ~12%."
    },
    return_policy: "7-Day Replacement for Hardware Defects",
    seller_authenticity: "Authorized Noise Retailer (Flipkart SuperComNet)",
    pincode_speed: "In Stock • 24-Hr Express Delivery to 560001",
    bank_offers: [
      { bank: "Flipkart Axis Card", discountText: "5% Unlimited Cashback", netPrice: 3324.0 },
      { bank: "SBI Cards", discountText: "Flat ₹250 Instant Off", netPrice: 3249.0 }
    ],
    spec_xray: {
      red_flags: ["Step counting algorithm counts slight false positives during bumpy two-wheeler commutes."],
      green_flags: ["Gorgeous 60Hz 1000-nit AMOLED screen readable under direct Indian sun", "Loud, clear speaker for quick wrist calling", "Functional rotary crown navigation"],
      verdict: "High-value smart wearable for daily health tracking and hands-free call convenience."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Festival Discount)",
      reason: "Current ₹3,499 matches historical festive low on Flipkart."
    },
    cost_per_wear: 10,
    is_fashion: false,
    de_influencer_reasons: [
      "Not medical grade: SpO2 and Heart Rate readings have ~5% variance vs clinical monitors.",
      "Requires proprietary magnetic charger pin; don't misplace during weekend trips.",
      "Always-On Display drains battery life from 7 days down to ~2.5 days."
    ],
    single_store_bundle_price: 4499.0,
    deep_links: generateAllStoreLinks("noise colorfit pro 5 smartwatch"),
    store_comparison: generateStoreComparison(3499, "Flipkart", "noise colorfit pro 5 smartwatch")
  },
  {
    id: "prod_fash_jeans_1",
    name: "Levi's 511 Slim Fit Mid-Rise Dark Indigo Stretch Jeans",
    brand: "Levi's",
    category: "fashion",
    categoryKey: "fashion",
    color: "Dark Indigo Stone Wash",
    spec: "98% Cotton, 2% Elastane • Levi's Flex Comfort Stretch",
    description: "The definitive modern slim fit. Cut close through the thigh and leg opening with just enough stretch for unhindered mobility.",
    current_price: 2199.0,
    original_price: 3999.0,
    discount_percent: 45,
    rating: 4.5,
    reviews_count: 2410,
    merchant_name: "Myntra",
    best_store_pill: "Lowest on Myntra (₹2,199)",
    best_store_id: "myntra",
    thumbnail_url: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.6,
    verified_fit: "98% Verified Authentic Fit",
    search_query: "levis 511 slim fit jeans dark indigo",
    wardrobe_match: "Core Foundation: Pairs effortlessly with white sneakers and tees",
    true_landed_price: {
      base_price: 2199.0,
      delivery_fee: 0,
      platform_fee: 20,
      total: 2219.0,
      note: "Myntra ₹20 convenience platform fee added at checkout."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 3999,
      real_90day_avg: 2799,
      actual_discount_pct: 45,
      warning: "Genuine Levi's brand discount for end-of-season clearance."
    },
    return_policy: "14-Day Free Size Exchange & Doorstep Return",
    seller_authenticity: "Authorized Levi Strauss India Partner (Myntra Retail)",
    pincode_speed: "In Stock • Express Delivery in 24-48 Hours to 560001",
    bank_offers: [
      { bank: "Kotak / ICICI", discountText: "10% Instant Off with Code MYNTRA10", netPrice: 1979.0 },
      { bank: "Paytm UPI", discountText: "Flat ₹50 Cashback", netPrice: 2149.0 }
    ],
    spec_xray: {
      red_flags: ["Dark indigo dye will bleed slightly on first wash; wash separately in cold water."],
      green_flags: ["Durable 11.5oz ring-spun denim that softens with each wash without sagging", "Reinforced chain-stitched hem and copper rivets", "Timeless versatile wash for all occasions"],
      verdict: "Essential wardrobe foundation piece with 3+ years expected daily wear."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹2,199 is ₹600 lower than retail mall outlets and Amazon India."
    },
    cost_per_wear: 15,
    is_fashion: true,
    de_influencer_reasons: [
      "Natural indigo dye will transfer onto light white sneakers or light car upholstery during first 3 wears.",
      "If you have thick athletic quads, size up by 1 waist inch or switch to 502 Regular Taper.",
      "Line dry inside-out; high-heat dryer cycles degrade the 2% elastane stretch fibers."
    ],
    single_store_bundle_price: 2999.0,
    deep_links: generateAllStoreLinks("levis 511 slim fit jeans dark indigo"),
    store_comparison: generateStoreComparison(2199, "Myntra", "levis 511 slim fit jeans dark indigo")
  },
  {
    id: "prod_kitchen_fryer_1",
    name: "Philips Digital Air Fryer HD9252/90 with Rapid Air Technology (4.1L)",
    brand: "Philips",
    category: "homeKitchen",
    categoryKey: "homeKitchen",
    color: "Black & Silver Accent",
    spec: "1400W • 4.1L Basket • 7 Preset Menus • 90% Less Oil",
    description: "Cooks food with up to 90% less fat using patented starfish design Rapid Air technology. Includes touch screen with 7 presets and NutriU recipe app integration.",
    current_price: 6999.0,
    original_price: 11995.0,
    discount_percent: 42,
    rating: 4.6,
    reviews_count: 6380,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹6,999)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.7,
    verified_fit: "100% Genuine Appliance",
    search_query: "philips digital air fryer hd9252",
    wardrobe_match: "Kitchen Upgrade: Healthy oil-free cooking companion",
    true_landed_price: {
      base_price: 6999.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 6999.0,
      note: "FREE Prime Heavy Delivery; 2-year comprehensive brand warranty."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 11995,
      real_90day_avg: 7999,
      actual_discount_pct: 42,
      warning: "Genuine festival deal matching Philips official promotion."
    },
    return_policy: "10-Day Replacement for Appliance Malfunction",
    seller_authenticity: "Authorized Philips India Distributor (Cloudtail / Appario)",
    pincode_speed: "In Stock • Prime Delivery Tomorrow by 2 PM to 560001",
    bank_offers: [
      { bank: "HDFC Credit Card", discountText: "Flat ₹750 Instant Discount", netPrice: 6249.0 },
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: 6649.0 }
    ],
    spec_xray: {
      red_flags: ["4.1L basket capacity feeds 2-3 people; for large joint families of 5+, choose 6.2L XXL model."],
      green_flags: ["Rapid Air starfish design circulates hot air evenly without needing to flip samosas/paneer", "Dishwasher-safe non-stick basket", "Auto-shutoff with ready sound alert"],
      verdict: "Top-rated kitchen air fryer for healthy, guilt-free crispy snacks."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Current ₹6,999 price is ₹1,000 cheaper than Croma and Vijay Sales."
    },
    cost_per_wear: 19,
    is_fashion: false,
    de_influencer_reasons: [
      "4.1L basket fits a meal for 2-3 persons. If cooking for a party, requires 2-3 separate batches.",
      "Must preheat for 3 minutes for optimal French fry crispiness (food gets soggy if packed too densely).",
      "Takes up dedicated kitchen counter footprint (approx 36 x 26 cm)."
    ],
    single_store_bundle_price: 8499.0,
    deep_links: generateAllStoreLinks("philips digital air fryer hd9252"),
    store_comparison: generateStoreComparison(6999, "Amazon.in", "philips digital air fryer hd9252")
  },
  // ADDITIONAL DEMANDED CATALOG ITEMS
  {
    id: "prod_fash_blazer_2",
    name: "Allen Solly Men's Slim Fit Textured Formal Blazer (Charcoal Grey)",
    brand: "Allen Solly",
    category: "fashion",
    categoryKey: "fashion",
    color: "Charcoal Grey",
    spec: "Poly-Viscose Structured Weave • Dual Side Vents • Contrast Lapel Stitch",
    description: "Tailored charcoal two-button blazer with structured shoulder pads, ideal for corporate presentations, dinners, and wedding parties.",
    current_price: 3499.0,
    original_price: 5999.0,
    discount_percent: 41,
    rating: 4.5,
    reviews_count: 890,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹3,499)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.4,
    verified_fit: "96% Verified Fit",
    search_query: "allen solly mens charcoal formal blazer",
    wardrobe_match: "Formals: Pairs with white shirts, dark trousers & formal derby shoes",
    true_landed_price: {
      base_price: 3499.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 3499.0,
      note: "FREE Prime 1-Day Delivery."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 5999,
      real_90day_avg: 4199,
      actual_discount_pct: 41,
      warning: "Verified genuine brand markdown."
    },
    return_policy: "10-Day Free Return & Size Exchange",
    seller_authenticity: "Authorized Allen Solly Store (Aditya Birla Fashion)",
    pincode_speed: "In Stock • Prime Delivery Tomorrow by 11 AM",
    bank_offers: [
      { bank: "HDFC Card", discountText: "10% Instant Discount on Formals", netPrice: 3149.0 }
    ],
    spec_xray: {
      red_flags: ["Slim fit cut; if wearing over thick knit sweaters, size up by 1 size."],
      green_flags: ["Crease-resistant blend holds drape for 10+ hours", "Reinforced horn buttons", "Silky breathable interior lining"],
      verdict: "Crisp formal staple for young professionals and interview presentations."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Current ₹3,499 price is ₹700 lower than retail showroom outlets."
    },
    cost_per_wear: 35,
    is_fashion: true,
    de_influencer_reasons: [
      "Dry clean recommended to preserve lapel canvassing.",
      "Check shoulder measurements against your suit size before ordering."
    ],
    single_store_bundle_price: 4499.0,
    deep_links: generateAllStoreLinks("allen solly mens charcoal formal blazer"),
    store_comparison: generateStoreComparison(3499, "Amazon.in", "allen solly mens charcoal formal blazer")
  },
  {
    id: "prod_fash_kurta_1",
    name: "Manyavar Men's Royal Silk Blend Festive Kurta Churidar Set (Maroon & Gold)",
    brand: "Manyavar",
    category: "fashion",
    categoryKey: "fashion",
    color: "Deep Maroon & Antique Gold",
    spec: "Art Silk Jacquard • Mandarin Collar • Side Pockets",
    description: "Rich jacquard woven festive kurta with matching gold churidar bottoms. Breathable interior lining designed for Indian celebrations and wedding receptions.",
    current_price: 2999.0,
    original_price: 4999.0,
    discount_percent: 40,
    rating: 4.7,
    reviews_count: 1650,
    merchant_name: "Myntra",
    best_store_pill: "Lowest on Myntra (₹2,999)",
    best_store_id: "myntra",
    thumbnail_url: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.6,
    verified_fit: "98% Verified Authentic",
    search_query: "manyavar mens silk blend festive kurta set",
    wardrobe_match: "Ethnic Wear: Pairs with mojari loafers and dupattas",
    true_landed_price: {
      base_price: 2999.0,
      delivery_fee: 0,
      platform_fee: 20,
      total: 3019.0,
      note: "Myntra ₹20 convenience fee included."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 4999,
      real_90day_avg: 3499,
      actual_discount_pct: 40,
      warning: "Genuine festival season promotion."
    },
    return_policy: "14-Day Hassle-Free Size Exchange",
    seller_authenticity: "Authorized Vedant Fashions (Manyavar Official Partner)",
    pincode_speed: "In Stock • Express Delivery in 24 Hours",
    bank_offers: [
      { bank: "Kotak Bank", discountText: "10% Instant Discount with Code WEDDING10", netPrice: 2699.0 }
    ],
    spec_xray: {
      red_flags: ["Dry clean only for the first two washes to maintain metallic zari sheen."],
      green_flags: ["High-thread-count jacquard that does not scratch skin", "Deep functional side pockets for smartphones", "Tailored traditional drape"],
      verdict: "Top-rated festive outfit for weddings, Diwali celebrations, and sangeet functions."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Festive Special)",
      reason: "₹2,999 beats offline Manyavar mall store pricing by ₹1,000."
    },
    cost_per_wear: 75,
    is_fashion: true,
    de_influencer_reasons: [
      "Festive ethnic wear: assess how many wedding occasions you have before buying.",
      "Churidar requires gentle iron on low heat setting."
    ],
    single_store_bundle_price: 3899.0,
    deep_links: generateAllStoreLinks("manyavar mens silk blend festive kurta set"),
    store_comparison: generateStoreComparison(2999, "Myntra", "manyavar mens silk blend festive kurta set")
  },
  {
    id: "prod_foot_nike_1",
    name: "Nike Air Zoom Pegasus 40 Road Running Shoes (Triple Black)",
    brand: "Nike",
    category: "footwear",
    categoryKey: "footwear",
    color: "Triple Black",
    spec: "Dual Zoom Air Units • Engineered Mesh Upper • React Foam Cushioning",
    description: "The workhorse with wings. Springy responsive stride with dual Zoom Air units and tuned single-layer mesh for breathable athletic performance.",
    current_price: 7495.0,
    original_price: 10495.0,
    discount_percent: 28,
    rating: 4.8,
    reviews_count: 3120,
    merchant_name: "Myntra",
    best_store_pill: "Lowest on Myntra (₹7,495)",
    best_store_id: "myntra",
    thumbnail_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.7,
    verified_fit: "98% Verified Authentic",
    search_query: "nike air zoom pegasus 40 running shoes",
    wardrobe_match: "Footwear: Pairs with running joggers, gym shorts & casual jeans",
    true_landed_price: {
      base_price: 7495.0,
      delivery_fee: 0,
      platform_fee: 20,
      total: 7515.0,
      note: "FREE delivery via Myntra; verified Nike authentic tag."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 10495,
      real_90day_avg: 8495,
      actual_discount_pct: 28,
      warning: "Genuine Nike India clearance discount."
    },
    return_policy: "14-Day Free Size Exchange & Return",
    seller_authenticity: "Authorized Nike India Retail Partner (Myntra Retail)",
    pincode_speed: "In Stock • Express Delivery in 24 Hours",
    bank_offers: [
      { bank: "ICICI Credit Card", discountText: "Flat ₹750 Instant Discount", netPrice: 6745.0 }
    ],
    spec_xray: {
      red_flags: ["Snug midfoot band; wide-footed runners should order a half-size up."],
      green_flags: ["Durable waffle outsole provides grip on wet monsoon roads", "React foam preserves cushioning over 800+ kilometers", "Reflective safety accents for night runs"],
      verdict: "Industry-standard marathon and daily training shoe built for high durability."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹7,495 is ₹1,500 below Nike official brand store and Amazon."
    },
    cost_per_wear: 22,
    is_fashion: false,
    de_influencer_reasons: [
      "Built for running and high-mileage road workouts; overkill if you only walk casually.",
      "Check sizing carefully: Nike running shoes run 0.5 size smaller than standard Indian formal shoes."
    ],
    single_store_bundle_price: 8995.0,
    deep_links: generateAllStoreLinks("nike air zoom pegasus 40 running shoes"),
    store_comparison: generateStoreComparison(7495, "Myntra", "nike air zoom pegasus 40 running shoes")
  },
  {
    id: "prod_foot_adidas_1",
    name: "Adidas Originals Stan Smith Classic Leather Sneakers (White & Green)",
    brand: "Adidas",
    category: "footwear",
    categoryKey: "footwear",
    color: "Cloud White / Fairway Green",
    spec: "Primegreen Recycled Leather • OrthoLite Sockliner • Perforated 3-Stripes",
    description: "The timeless minimalist silhouette that defined street fashion. Clean leather upper, perforated stripes, and cushioned insole for all-day urban wear.",
    current_price: 4599.0,
    original_price: 7999.0,
    discount_percent: 42,
    rating: 4.7,
    reviews_count: 4280,
    merchant_name: "Flipkart",
    best_store_pill: "Lowest on Flipkart (₹4,599)",
    best_store_id: "flipkart",
    thumbnail_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.6,
    verified_fit: "97% Verified Fit",
    search_query: "adidas originals stan smith white sneakers",
    wardrobe_match: "Universal Foundation: Looks immaculate with denim, chinos and shorts",
    true_landed_price: {
      base_price: 4599.0,
      delivery_fee: 0,
      platform_fee: 5,
      total: 4604.0,
      note: "Flipkart ₹5 secure packaging fee included."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 7999,
      real_90day_avg: 5499,
      actual_discount_pct: 42,
      warning: "Authentic seasonal discount on iconic heritage model."
    },
    return_policy: "10-Day Free Replacement & Return",
    seller_authenticity: "Authorized Adidas India Distributor (SuperComNet)",
    pincode_speed: "In Stock • Express Delivery in 24 Hours",
    bank_offers: [
      { bank: "Axis Bank Card", discountText: "10% Instant Discount up to ₹500", netPrice: 4099.0 }
    ],
    spec_xray: {
      red_flags: ["White toe box attracts dirt quickly during monsoon walks; wipe with damp cloth."],
      green_flags: ["Timeless aesthetic pairs with 90% of casual and smart-casual wardrobes", "Soft OrthoLite sockliner prevents heel blisters", "Durable vulcanized rubber cupsole"],
      verdict: "Essential white sneaker that anchors any modern casual look."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹4,599 price beats Myntra and Amazon India by ₹600."
    },
    cost_per_wear: 15,
    is_fashion: true,
    de_influencer_reasons: [
      "White sneakers need routine cleaning wipes to maintain crisp pristine look.",
      "Flat vulcanized sole has moderate arch support (not recommended for long distance running)."
    ],
    single_store_bundle_price: 5999.0,
    deep_links: generateAllStoreLinks("adidas originals stan smith white sneakers"),
    store_comparison: generateStoreComparison(4599, "Flipkart", "adidas originals stan smith white sneakers")
  },
  {
    id: "prod_tech_iphone_1",
    name: "Apple iPhone 15 (128GB Storage, Midnight Black with Dynamic Island)",
    brand: "Apple",
    category: "mobilesLaptops",
    categoryKey: "mobilesLaptops",
    color: "Midnight Black",
    spec: "A16 Bionic Chip • Dynamic Island • 48MP Main Camera • USB-C",
    description: "Super Retina XDR OLED display, durable color-infused glass back with aluminum frame, all-day battery life, and universal USB-C charging.",
    current_price: 64999.0,
    original_price: 79900.0,
    discount_percent: 18,
    rating: 4.8,
    reviews_count: 8940,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹64,999)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.8,
    verified_fit: "100% Genuine Apple",
    search_query: "apple iphone 15 128gb black",
    wardrobe_match: "Flagship Device: 1-tap seamless syncing across work and personal life",
    true_landed_price: {
      base_price: 64999.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 64999.0,
      note: "FREE Prime 1-Day Delivery with open-box delivery verification."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 79900,
      real_90day_avg: 68900,
      actual_discount_pct: 18,
      warning: "Genuine festival deal matching Apple official authorized price drop."
    },
    return_policy: "7-Day Replacement for Hardware Malfunctions via Apple Care",
    seller_authenticity: "Apple Authorized Reseller (Appario Retail / Amazon)",
    pincode_speed: "In Stock • Prime Delivery Tomorrow by 11 AM",
    bank_offers: [
      { bank: "HDFC Credit Card", discountText: "Flat ₹4,000 Instant Discount", netPrice: 60999.0 },
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback (₹3,250)", netPrice: 61749.0 }
    ],
    spec_xray: {
      red_flags: ["60Hz refresh rate screen (120Hz ProMotion reserved for Pro models).", "Charging brick not included in retail box (only USB-C braided cable)."],
      green_flags: ["Stunning 48MP camera takes crisp photos in low Indian indoor lighting", "Dynamic Island shows live food delivery and cab arrival status", "Industry-leading 5-year iOS software updates"],
      verdict: "Top smartphone purchase with unparalleled resale value and smooth performance."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest Festival Price)",
      reason: "₹64,999 (₹60,999 net with HDFC card) is the lowest recorded price in India."
    },
    cost_per_wear: 45,
    is_fashion: false,
    de_influencer_reasons: [
      "If upgrading from iPhone 14 or 13, the daily user experience upgrade is mostly USB-C and Dynamic Island.",
      "60Hz display is noticeably slower than 120Hz Android phones at lower prices."
    ],
    single_store_bundle_price: 72900.0,
    deep_links: generateAllStoreLinks("apple iphone 15 128gb black"),
    store_comparison: generateStoreComparison(64999, "Amazon.in", "apple iphone 15 128gb black")
  },
  {
    id: "prod_tech_macbook_1",
    name: "Apple MacBook Air 13.6\" with M2 Chip (8GB RAM, 256GB SSD Space Gray)",
    brand: "Apple",
    category: "mobilesLaptops",
    categoryKey: "mobilesLaptops",
    color: "Space Gray",
    spec: "Apple M2 8-Core CPU • 13.6\" Liquid Retina Display • 18-Hr Battery Life",
    description: "Incredibly thin fanless design with M2 silicon power. Liquid Retina screen, 1080p FaceTime HD camera, MagSafe 3 charging port, and back-lit Magic Keyboard.",
    current_price: 84990.0,
    original_price: 99900.0,
    discount_percent: 15,
    rating: 4.9,
    reviews_count: 2840,
    merchant_name: "Croma",
    best_store_pill: "Lowest on Croma (₹84,990)",
    best_store_id: "croma",
    thumbnail_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.9,
    verified_fit: "100% Genuine Apple",
    search_query: "apple macbook air m2 13.6 inch space gray",
    wardrobe_match: "Workstation: Ultra-portable 1.24kg powerhouse for developers and creators",
    true_landed_price: {
      base_price: 84990.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 84990.0,
      note: "FREE same-day Croma store pickup or 24-hr express delivery."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 99900,
      real_90day_avg: 89900,
      actual_discount_pct: 15,
      warning: "Official student & festival price tier."
    },
    return_policy: "7-Day Replacement for Hardware Faults",
    seller_authenticity: "Authorized Apple Distributor (Tata Croma Official)",
    pincode_speed: "In Stock • Same-Day Store Pickup or 24-Hr Delivery to 560001",
    bank_offers: [
      { bank: "HDFC Card", discountText: "Flat ₹5,000 Instant Card Cashback", netPrice: 79990.0 },
      { bank: "Tata Neu", discountText: "5% NeuCoins Cashback", netPrice: 80740.0 }
    ],
    spec_xray: {
      red_flags: ["8GB Unified Memory is non-upgradeable; power video editors should seek 16GB models."],
      green_flags: ["Silent zero-fan operation stays ice cold during intense multitasking", "18-hour real-world battery lasts 2 full workdays without charger", "Best-in-class keyboard and glass haptic trackpad"],
      verdict: "The absolute best value laptop in the world for coding, study, and daily productivity."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Net ₹79,990 on Croma with bank card is ₹5,000 cheaper than Apple official retail."
    },
    cost_per_wear: 38,
    is_fashion: false,
    de_influencer_reasons: [
      "256GB base storage fills up quickly if downloading large 4K video files or local ML weights.",
      "Supports only 1 external display natively without DisplayLink hubs."
    ],
    single_store_bundle_price: 94900.0,
    deep_links: generateAllStoreLinks("apple macbook air m2 13.6 inch space gray"),
    store_comparison: generateStoreComparison(84990, "Croma", "apple macbook air m2 13.6 inch space gray")
  },
  {
    id: "prod_tech_boat_1",
    name: "boAt Airdopes 141 ANC True Wireless Earbuds (32dB ANC, 42h Playtime)",
    brand: "boAt",
    category: "mobilesLaptops",
    categoryKey: "mobilesLaptops",
    color: "Gunmetal Black",
    spec: "32dB ANC • Beast Mode 50ms Low Latency • ENx Quad Mics • IPX5",
    description: "Budget audio champion with punchy boAt Signature Bass, Active Noise Cancellation for loud Indian commutes, and quick ASAP charge.",
    current_price: 1499.0,
    original_price: 5990.0,
    discount_percent: 75,
    rating: 4.3,
    reviews_count: 14890,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹1,499)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.1,
    verified_fit: "92% Verified Fit",
    search_query: "boat airdopes 141 anc wireless earbuds",
    wardrobe_match: "Daily Audio: Pocketable everyday travel audio",
    true_landed_price: {
      base_price: 1499.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 1499.0,
      note: "FREE Prime 1-Day Delivery."
    },
    fake_mrp_check: {
      is_inflated: true,
      declared_mrp: 5990,
      real_90day_avg: 1699,
      actual_discount_pct: 12,
      warning: "Declared ₹5,990 MRP is marketing anchor. Real retail discount is ~12% against 90-day avg."
    },
    return_policy: "7-Day Replacement for Sound Defects",
    seller_authenticity: "Authorized boAt Retailer (Appario Retail)",
    pincode_speed: "In Stock • Prime Delivery Tomorrow by 11 AM",
    bank_offers: [
      { bank: "Amazon Pay UPI", discountText: "Flat ₹50 Instant Cashback", netPrice: 1449.0 }
    ],
    spec_xray: {
      red_flags: ["High treble frequencies lose detail at maximum 100% volume; listen at 70-80%."],
      green_flags: ["Impressive punchy sub-bass tuned for Bollywood, EDM, and hip-hop", "ASAP charge gives 75 mins playtime in just 5 mins", "Quad mics filter background street noise effectively"],
      verdict: "Unbeatable budget TWS earbuds under ₹1,500 with functional ANC."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Current ₹1,499 price is the lowest recorded on Amazon this month."
    },
    cost_per_wear: 6,
    is_fashion: false,
    de_influencer_reasons: [
      "Plastic charging case is lightweight and scratches if carried with metal keys.",
      "Bass-heavy sound profile is not meant for neutral studio audio monitoring."
    ],
    single_store_bundle_price: 1899.0,
    deep_links: generateAllStoreLinks("boat airdopes 141 anc wireless earbuds"),
    store_comparison: generateStoreComparison(1499, "Amazon.in", "boat airdopes 141 anc wireless earbuds")
  },
  {
    id: "prod_groc_atta_1",
    name: "Aashirvaad Shudh Chakki 100% Whole Wheat Atta (10kg Value Bag)",
    brand: "Aashirvaad / ITC",
    category: "grocery",
    categoryKey: "grocery",
    color: "Golden Wheat",
    spec: "100% Whole Wheat • 0% Maida • Traditional Stone Chakki Ground",
    description: "Sourced from high-quality heavy grains across Madhya Pradesh. Absorbs more water to ensure rotis stay soft, fluffy, and fresh for hours.",
    current_price: 435.0,
    original_price: 510.0,
    discount_percent: 15,
    rating: 4.7,
    reviews_count: 12450,
    merchant_name: "JioMart",
    best_store_pill: "Lowest on JioMart (₹435)",
    best_store_id: "jiomart",
    thumbnail_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.9,
    verified_fit: "100% Pure Wheat",
    search_query: "aashirvaad whole wheat atta 10kg",
    wardrobe_match: "Kitchen Bulk Staple: Daily staple for every Indian household",
    true_landed_price: {
      base_price: 435.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 435.0,
      note: "FREE Express Delivery via JioMart Quick."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 510,
      real_90day_avg: 450,
      actual_discount_pct: 15,
      warning: "Genuine wholesale staple rate."
    },
    return_policy: "Non-Returnable (Food Grocery Item)",
    seller_authenticity: "Authorized ITC FMCG Distributor (Reliance Retail)",
    pincode_speed: "In Stock • Express Delivery in 4 Hours to 560001",
    bank_offers: [
      { bank: "JioPay UPI", discountText: "₹25 Cashback on orders above ₹399", netPrice: 410.0 }
    ],
    spec_xray: {
      red_flags: ["Heavy 10kg pack; ensure dry sealed container to prevent monsoon weevil humidity."],
      green_flags: ["Zero bleached maida blending", "Nutritious dietary fiber intact", "Consistent roti fluffiness"],
      verdict: "India's #1 trusted whole wheat flour with rigorous quality checks."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Wholesale Tier)",
      reason: "₹435 price beats local kirana retail by ₹40."
    },
    cost_per_wear: 3,
    is_fashion: false,
    de_influencer_reasons: [
      "Bulk 10kg bag: only buy if your family consumes wheat at least 4-5 times a week."
    ],
    single_store_bundle_price: 510.0,
    deep_links: generateAllStoreLinks("aashirvaad whole wheat atta 10kg"),
    store_comparison: generateStoreComparison(435, "JioMart", "aashirvaad whole wheat atta 10kg")
  },
  {
    id: "prod_groc_tea_1",
    name: "Tata Tea Gold Long-Leaf Rich Fragrant Black Tea (1kg Pouch)",
    brand: "Tata Tea",
    category: "grocery",
    categoryKey: "grocery",
    color: "Amber Black",
    spec: "85% Fine CTC Granules + 15% Gently Rolled Long Leaves",
    description: "The exquisite blend of rich, full-bodied Assam CTC tea and 15% aromatic Darjeeling long leaves for unmatched taste and morning aroma.",
    current_price: 520.0,
    original_price: 640.0,
    discount_percent: 19,
    rating: 4.6,
    reviews_count: 9810,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (Fresh)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.7,
    verified_fit: "100% Pure Assam Blend",
    search_query: "tata tea gold 1kg pouch",
    wardrobe_match: "Pantry Essential: Morning recharge chai staple",
    true_landed_price: {
      base_price: 520.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 520.0,
      note: "FREE delivery on orders over ₹499."
    },
    fake_mrp_check: {
      is_inflated: false,
      declared_mrp: 640,
      real_90day_avg: 540,
      actual_discount_pct: 19,
      warning: "Genuine grocery discount matching FMCG trade offers."
    },
    return_policy: "Non-Returnable (Beverage Item)",
    seller_authenticity: "Tata Consumer Products Official Distributor",
    pincode_speed: "In Stock • Delivery in 24 Hours",
    bank_offers: [
      { bank: "Amazon Pay ICICI", discountText: "5% Unlimited Cashback", netPrice: 494.0 }
    ],
    spec_xray: {
      red_flags: ["Requires 3-4 minutes boiling with milk to fully extract long leaf Darjeeling aroma."],
      green_flags: ["Golden liquor with unmistakable aroma", "Natural antioxidants preserved", "Dual CTC and leaf harmony"],
      verdict: "Top choice for premium Indian masala and ginger chai lovers."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Current ₹520 price is ₹60 below BigBasket and D-Mart."
    },
    cost_per_wear: 2,
    is_fashion: false,
    de_influencer_reasons: [
      "If you only drink green tea or black coffee, 1kg pouch is too large for single households."
    ],
    single_store_bundle_price: 640.0,
    deep_links: generateAllStoreLinks("tata tea gold 1kg pouch"),
    store_comparison: generateStoreComparison(520, "Amazon.in", "tata tea gold 1kg pouch")
  },
  {
    id: "prod_kitchen_kettle_1",
    name: "Pigeon by Stovekraft 1.5L Stainless Steel Electric Kettle (1500W)",
    brand: "Pigeon / Stovekraft",
    category: "homeKitchen",
    categoryKey: "homeKitchen",
    color: "Silver Metallic & Black",
    spec: "1500W Rapid Boil • 1.5L Capacity • 360° Swivel Base • Auto Cut-Off",
    description: "Boils water in under 3 minutes for tea, instant noodles, hot water therapy, and soup. Features illuminated power indicator and dry-boil safety protection.",
    current_price: 629.0,
    original_price: 1295.0,
    discount_percent: 51,
    rating: 4.3,
    reviews_count: 38400,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹629)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1544003484-3cd181d17917?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.3,
    verified_fit: "Bestseller Certified",
    search_query: "pigeon electric kettle 1.5 litre",
    wardrobe_match: "Kitchen & Hostel Essential: Instant hot water companion",
    true_landed_price: {
      base_price: 629.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 629.0,
      note: "FREE Prime 1-Day Delivery; 1-year brand warranty."
    },
    fake_mrp_check: {
      is_inflated: true,
      declared_mrp: 1295,
      real_90day_avg: 699,
      actual_discount_pct: 10,
      warning: "Declared ₹1,295 MRP is brand anchor. True festive discount is ~10% against 90-day avg."
    },
    return_policy: "7-Day Replacement for Electrical Defect",
    seller_authenticity: "Authorized Stovekraft Retailer (Cloudtail / Appario)",
    pincode_speed: "In Stock • Prime Delivery Tomorrow by 11 AM",
    bank_offers: [
      { bank: "Amazon Pay UPI", discountText: "Flat ₹25 Instant Cashback", netPrice: 604.0 }
    ],
    spec_xray: {
      red_flags: ["Outer stainless steel body gets warm when boiling; only hold by insulated plastic handle."],
      green_flags: ["Rapid 1500W heating element boils 1.5L water in 180 seconds", "Automatic cut-off when water reaches 100°C", "Easy-pour spout with integrated mesh filter"],
      verdict: "Top-selling small appliance in India for homes, offices, and college hostels."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "₹629 matches historical festive low on Amazon India."
    },
    cost_per_wear: 3,
    is_fashion: false,
    de_influencer_reasons: [
      "Exterior steel wall heats up: keep away from curious toddlers during boiling.",
      "Descaling needed once a month with vinegar in hard water regions (Bengaluru / NCR)."
    ],
    single_store_bundle_price: 799.0,
    deep_links: generateAllStoreLinks("pigeon electric kettle 1.5 litre"),
    store_comparison: generateStoreComparison(629, "Amazon.in", "pigeon electric kettle 1.5 litre")
  },
  {
    id: "prod_bag_laptop_1",
    name: "American Tourister Valex 32L Water-Resistant Laptop Backpack (Navy Blue)",
    brand: "American Tourister",
    category: "accessories",
    categoryKey: "fashion",
    color: "Navy Blue & Accent Trim",
    spec: "32L Volume • Fits Up to 15.6\" Laptop • Ergo-Padded Back • 3 Full Compartments",
    description: "Multi-compartment daily commuter and travel backpack with dedicated padded laptop sleeve, organizer pockets, side bottle holders, and rain-resistant fabric.",
    current_price: 1499.0,
    original_price: 3500.0,
    discount_percent: 57,
    rating: 4.5,
    reviews_count: 6710,
    merchant_name: "Amazon.in",
    best_store_pill: "Lowest on Amazon (₹1,499)",
    best_store_id: "amazon",
    thumbnail_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80",
    regret_score: 9.5,
    verified_fit: "96% Verified Fit",
    search_query: "american tourister laptop backpack 32l",
    wardrobe_match: "Travel Essential: Pairs with work laptop, gym kit & weekend carry-on",
    true_landed_price: {
      base_price: 1499.0,
      delivery_fee: 0,
      platform_fee: 0,
      total: 1499.0,
      note: "FREE Prime 1-Day Delivery; 1-year international manufacturer warranty."
    },
    fake_mrp_check: {
      is_inflated: true,
      declared_mrp: 3500,
      real_90day_avg: 1799,
      actual_discount_pct: 17,
      warning: "Declared ₹3,500 MRP is retail tag. Real clearance discount is ~17%."
    },
    return_policy: "10-Day Free Replacement & Return",
    seller_authenticity: "Samsonite India Official Partner (Amazon Appario)",
    pincode_speed: "In Stock • Prime Delivery Tomorrow by 11 AM",
    bank_offers: [
      { bank: "HDFC Card", discountText: "10% Instant Discount on Bags", netPrice: 1349.0 }
    ],
    spec_xray: {
      red_flags: ["Water resistant for light drizzle; heavy continuous monsoon downpours require a rain cover."],
      green_flags: ["Thick air-mesh shoulder padding prevents neck strain with heavy 5kg load", "Reinforced bartack stitching at stress points", "Dual mesh bottle holders hold 1L bottles snugly"],
      verdict: "High-durability daily commuter bag for office, college, and weekend travel."
    },
    price_cycle: {
      action: "buy_now",
      label: "Buy Now (Lowest 90-Day Price)",
      reason: "Current ₹1,499 price beats Myntra and Flipkart by ₹300."
    },
    cost_per_wear: 8,
    is_fashion: false,
    de_influencer_reasons: [
      "32L is roomy for daily work; if you only carry a 13-inch tablet and charger, consider slim 18L bags."
    ],
    single_store_bundle_price: 1999.0,
    deep_links: generateAllStoreLinks("american tourister laptop backpack 32l"),
    store_comparison: generateStoreComparison(1499, "Amazon.in", "american tourister laptop backpack 32l")
  }
];
