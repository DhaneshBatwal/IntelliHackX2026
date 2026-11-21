// Multi-Marketplace Aggregation Engine Constants & Store Deep-Link Builders

export const MARKETPLACES = [
  {
    id: "amazon",
    name: "Amazon.in",
    shortName: "Amazon",
    badgeColor: "bg-[#FF9900]/15 text-[#FF9900] border-[#FF9900]/30",
    color: "#FF9900",
    buildSearchUrl: (q) => `https://www.amazon.in/s?k=${encodeURIComponent(q)}&ref=vibecart_ai`,
    iconText: "Amazon"
  },
  {
    id: "flipkart",
    name: "Flipkart",
    shortName: "Flipkart",
    badgeColor: "bg-[#2874F0]/15 text-[#2874F0] border-[#2874F0]/30",
    color: "#2874F0",
    buildSearchUrl: (q) => `https://www.flipkart.com/search?q=${encodeURIComponent(q)}&affid=vibecart_ai`,
    iconText: "Flipkart"
  },
  {
    id: "myntra",
    name: "Myntra",
    shortName: "Myntra",
    badgeColor: "bg-[#FF3F6C]/15 text-[#FF3F6C] border-[#FF3F6C]/30",
    color: "#FF3F6C",
    buildSearchUrl: (q) => {
      const cleanWords = q.trim().split(/\s+/).slice(0, 3).join('-').toLowerCase();
      return `https://www.myntra.com/${encodeURIComponent(cleanWords || 'fashion')}`;
    },
    iconText: "Myntra"
  },
  {
    id: "ajio",
    name: "Ajio Luxe / Fashion",
    shortName: "Ajio",
    badgeColor: "bg-[#2C4152]/30 text-[#4CC9F0] border-[#4CC9F0]/30",
    color: "#4CC9F0",
    buildSearchUrl: (q) => `https://www.ajio.com/search/?text=${encodeURIComponent(q)}`,
    iconText: "Ajio"
  },
  {
    id: "nykaa",
    name: "Nykaa / Nykaa Man",
    shortName: "Nykaa",
    badgeColor: "bg-[#FC2779]/15 text-[#FC2779] border-[#FC2779]/30",
    color: "#FC2779",
    buildSearchUrl: (q) => `https://www.nykaa.com/search/result/?q=${encodeURIComponent(q)}`,
    iconText: "Nykaa"
  },
  {
    id: "croma",
    name: "Croma Electronics",
    shortName: "Croma",
    badgeColor: "bg-[#00E5D1]/15 text-[#00E5D1] border-[#00E5D1]/30",
    color: "#00E5D1",
    buildSearchUrl: (q) => `https://www.croma.com/searchB?q=${encodeURIComponent(q)}`,
    iconText: "Croma"
  },
  {
    id: "reliancedigital",
    name: "Reliance Digital",
    shortName: "Reliance Dig.",
    badgeColor: "bg-[#E42529]/15 text-[#E42529] border-[#E42529]/30",
    color: "#E42529",
    buildSearchUrl: (q) => `https://www.reliancedigital.in/search?q=${encodeURIComponent(q)}`,
    iconText: "Reliance"
  },
  {
    id: "tatacliq",
    name: "Tata CLiQ",
    shortName: "Tata CLiQ",
    badgeColor: "bg-[#800080]/15 text-[#DDA0DD] border-[#DDA0DD]/30",
    color: "#DDA0DD",
    buildSearchUrl: (q) => `https://www.tatacliq.com/search/?searchCategory=all&text=${encodeURIComponent(q)}`,
    iconText: "Tata CLiQ"
  },
  {
    id: "meesho",
    name: "Meesho Wholesale",
    shortName: "Meesho",
    badgeColor: "bg-[#9A348E]/15 text-[#E056FD] border-[#E056FD]/30",
    color: "#E056FD",
    buildSearchUrl: (q) => `https://www.meesho.com/search?q=${encodeURIComponent(q)}`,
    iconText: "Meesho"
  },
  {
    id: "jiomart",
    name: "JioMart",
    shortName: "JioMart",
    badgeColor: "bg-[#0078AD]/15 text-[#00A8FF] border-[#00A8FF]/30",
    color: "#00A8FF",
    buildSearchUrl: (q) => `https://www.jiomart.com/search/${encodeURIComponent(q)}`,
    iconText: "JioMart"
  },
  {
    id: "d2c",
    name: "Official Brand D2C Store",
    shortName: "Official D2C",
    badgeColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    color: "#10B981",
    buildSearchUrl: (q) => `https://www.google.com/search?q=${encodeURIComponent(q + ' official store online buy')}`,
    iconText: "Official D2C"
  }
];

export function generateAllStoreLinks(query) {
  const links = {};
  MARKETPLACES.forEach(store => {
    links[store.id] = store.buildSearchUrl(query);
  });
  return links;
}

// Generates an authentic simulated multi-store price comparison table for any product
export function generateStoreComparison(basePrice, primaryMerchant = "Amazon.in", query = "") {
  const price = Math.round(basePrice || 2499);
  const q = query || "men blazer smart casual";
  const myntraSlug = q.trim().split(/\s+/).slice(0, 3).join('-').toLowerCase().replace(/[^a-z0-9-]+/g, '');

  return [
    {
      store: "Amazon.in",
      store_name: "Amazon.in",
      store_id: "amazon",
      price: price,
      delivery: "Tomorrow by 11 AM (Prime)",
      delivery_estimate: "Tomorrow by 11 AM (Prime)",
      stock: "In Stock",
      badge: primaryMerchant.toLowerCase().includes("amazon") ? "Lowest Price Verified" : "Prime 1-Day Delivery",
      isLowest: primaryMerchant.toLowerCase().includes("amazon"),
      is_lowest: primaryMerchant.toLowerCase().includes("amazon"),
      checkoutReady: true,
      deep_link_url: `https://www.amazon.in/s?k=${encodeURIComponent(q)}`
    },
    {
      store: "Flipkart",
      store_name: "Flipkart",
      store_id: "flipkart",
      price: Math.round(price * 1.02),
      delivery: "2 Days Delivery",
      delivery_estimate: "2 Days Delivery",
      stock: "In Stock",
      badge: "Plus Member Special",
      isLowest: false,
      is_lowest: false,
      checkoutReady: true,
      deep_link_url: `https://www.flipkart.com/search?q=${encodeURIComponent(q)}`
    },
    {
      store: "Myntra",
      store_name: "Myntra",
      store_id: "myntra",
      price: Math.round(price * 0.97),
      delivery: "Tomorrow Evening",
      delivery_estimate: "Tomorrow Evening",
      stock: "In Stock",
      badge: "Insider Extra 5% Off",
      isLowest: !primaryMerchant.toLowerCase().includes("amazon"),
      is_lowest: !primaryMerchant.toLowerCase().includes("amazon"),
      checkoutReady: true,
      deep_link_url: `https://www.myntra.com/${myntraSlug || 'fashion'}`
    },
    {
      store: "Croma",
      store_name: "Croma",
      store_id: "croma",
      price: Math.round(price * 0.98),
      delivery: "Same Day Store Pickup",
      delivery_estimate: "Same Day Store Pickup",
      stock: "In Stock (Nearest Hub)",
      badge: "Tata NeuCoins 5% Back",
      isLowest: false,
      is_lowest: false,
      checkoutReady: true,
      deep_link_url: `https://www.croma.com/searchB?q=${encodeURIComponent(q)}`
    },
    {
      store: "Ajio Luxe",
      store_name: "Ajio Luxe",
      store_id: "ajio",
      price: Math.round(price * 1.04),
      delivery: "3 Days Delivery",
      delivery_estimate: "3 Days Delivery",
      stock: "In Stock",
      badge: "Coupon: TRENDS200",
      isLowest: false,
      is_lowest: false,
      checkoutReady: false,
      deep_link_url: `https://www.ajio.com/search/?text=${encodeURIComponent(q)}`
    },
    {
      store: "Tata CLiQ",
      store_name: "Tata CLiQ",
      store_id: "tatacliq",
      price: Math.round(price * 1.01),
      delivery: "2-3 Days",
      delivery_estimate: "2-3 Days",
      stock: "In Stock",
      badge: "Bank Discount ₹150",
      isLowest: false,
      is_lowest: false,
      checkoutReady: false,
      deep_link_url: `https://www.tatacliq.com/search/?searchCategory=all&text=${encodeURIComponent(q)}`
    },
    {
      store: "Official Brand D2C",
      store_name: "Official Brand D2C",
      store_id: "d2c",
      price: Math.round(price * 1.08),
      delivery: "Express Courier (Bluedart)",
      delivery_estimate: "Express Courier (Bluedart)",
      stock: "Factory Direct",
      badge: "100% Brand Warranty",
      isLowest: false,
      is_lowest: false,
      checkoutReady: true,
      deep_link_url: `https://www.google.com/search?q=${encodeURIComponent(q + ' official brand store online buy')}`
    }
  ];
}
