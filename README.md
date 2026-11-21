# VibeCart AI ⚡
> **Full-Stack Multimodal AI Shopping Assistant & Buyer's Regret Shield**

VibeCart AI transforms how modern shoppers discover and purchase fashion. Instead of typing rigid keywords, users express an aesthetic, occasion, or weather condition (e.g., *"Outfit for a monsoon wedding in Goa under ₹8,000"*), or upload inspiration photos. Powered by **Google Gemini API (`gemini-3.8-flash`)**, VibeCart AI curates a synchronized 3-item capsule collection with verified deep-link buy buttons (**Amazon.in, Flipkart, Myntra**), provides an AI **'Who Should NOT Buy This' Regret-Shield** with durability-backed Cost-Per-Use (CPU) calculators, cross-references an owned wardrobe in **Supabase** to prevent duplicate purchases, and executes guardrailed 1-tap auto-buy order simulations.

---

## 🌟 Core Features

### 1. Vibe-to-Cart Multimodal Discovery Hub
- **Scenario-Based Search**: Natural language input designed for real-world scenarios (e.g. Goa monsoon weddings, Indiranagar tech mixers, humid gallery openings).
- **Vision Inspiration**: Drag-and-drop outfit photos analyzed via Gemini Multimodal Vision to harmonize colors, fabrics, and silhouettes.
- **Curated 3-Item Capsule**: Generates a coordinated Top, Bottom, and Footwear/Accessory set tailored strictly within the target budget.

### 2. Real Shopping Links & Live Images (Amazon, Flipkart, Myntra)
- **SerpApi Google Shopping Engine**: Pulls real product thumbnails, live market pricing, merchant names, and ratings when `SERPAPI_KEY` is present.
- **Resilient Fallback Engine**: If no SerpApi key is supplied, automatically falls back to curated high-resolution catalog items.
- **Working Deep-Link Buy Buttons**: Direct, 1-click deep links for:
  - **Amazon India**: `https://www.amazon.in/s?k=...`
  - **Flipkart**: `https://www.flipkart.com/search?q=...`
  - **Myntra**: `https://www.myntra.com/...`

### 3. 'Who Should NOT Buy This' Regret-Shield™
- **Honest AI Review Auditor**: Unfiltered dealbreakers (e.g. linen creasing in transit, water sensitivity, stiffness).
- **Sizing Caveats**: Alerts on brand cuts, torso fit, and shrinkage risks.
- **Interactive Cost-Per-Use (CPU) Calculator**: Dynamic sliders for wear frequency and lifespan that calculate real Cost-Per-Wear in ₹.

### 4. Wardrobe / Duplicate Conflict Checker
- **'My Owned Items' Drawer**: Synced with Supabase PostgreSQL and pre-seeded with 5 essentials:
  1. *Navy Linen Shirt*
  2. *White Chunky Sneakers*
  3. *Black Leather Derby Shoes*
  4. *Olive Relaxed Chinos*
  5. *Minimalist Silver Mesh Watch*
- **Conflict Scan**: Warns before purchase if the user is buying an aesthetic duplicate or clashing piece.
- **Money-Saving Synergy Advice**: Calculates exact ₹ savings by swapping an owned item into the look.

### 5. Guardrailed 1-Tap Auto-Buy & Price Watchlist
- **Supabase Tracking**: Stores `saved_boards`, `owned_wardrobe`, and `price_alerts`.
- **Spend-Cap Guardrail**: Prevents impulse budget overrun. If target price exceeds your spend cap, auto-buy is safely locked.
- **1-Tap Simulated Purchase**: Executes a verified test order with an instant order reference code (`VIBE-BUY-...`) and celebration confetti.

### 6. Accessibility & Plain-Language Modes
- **Sleek Dark Mode**: Translucent glassmorphism, glowing micro-accents, and smooth transitions.
- **High-Contrast Toggle**: Crisp high-contrast borders and solid backdrops.
- **Plain-Language Toggle**: Replaces confusing fashion jargon with straightforward, friendly terms.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React icons, Canvas Confetti.
- **Backend**: Python 3.11, FastAPI, Uvicorn, Pydantic, HTTPX.
- **AI Engine**: Google Gemini API (`gemini-3.8-flash`, configurable via `GEMINI_MODEL`).
- **Database & Auth**: Supabase PostgreSQL (`owned_wardrobe`, `saved_boards`, `price_alerts`) with Row Level Security (RLS) & local stateful fallback.
- **Shopping Data**: SerpApi Google Shopping API with deep-link fallback to Amazon India, Flipkart, and Myntra.

---

## 🚀 Quickstart Guide

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.10+) or `uv`

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update with your keys:
- `GEMINI_API_KEY`: Get from [Google AI Studio](https://aistudio.google.com/)
- `GEMINI_MODEL`: `gemini-3.8-flash` (or `gemini-2.0-flash` / `gemini-1.5-flash`)
- `SERPAPI_KEY`: (Optional) for live Google Shopping results
- `SUPABASE_URL` and `SUPABASE_ANON_KEY`: From your Supabase project dashboard

### 3. Supabase Database Setup
Execute the SQL statements inside `supabase_schema.sql` in your Supabase SQL Editor:
- Creates `owned_wardrobe`, `saved_boards`, and `price_alerts` tables.
- Sets up Row Level Security (RLS) policies.
- Seeds the 5 starter wardrobe essentials.

### 4. Running the Backend (FastAPI)
```bash
# Run using the configured virtual environment:
backend\.venv\Scripts\uvicorn.exe main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload
```
API Documentation will be accessible at: `http://localhost:8000/docs`

### 5. Running the Frontend (Vite + React)
```bash
# In a new terminal window:
npm run dev --prefix frontend
```
Open your browser at: `http://localhost:5173`

---

## 📁 Repository Structure
```
├── supabase_schema.sql         # Supabase PostgreSQL schema & starter seed data
├── .env.example                # Template for Gemini, SerpApi, and Supabase credentials
├── README.md                   # Complete application guide
├── backend/
│   ├── .venv/                  # Python 3.11 virtual environment
│   ├── requirements.txt        # Backend dependencies
│   ├── config.py               # Settings & environment variables loader
│   ├── main.py                 # FastAPI application & API endpoints
│   ├── gemini_service.py       # Multimodal Gemini API & Regret-Shield auditor
│   ├── shopping_service.py     # SerpApi & Amazon/Flipkart/Myntra deep-links
│   ├── wardrobe_service.py     # Conflict detection & duplicate avoidance engine
│   ├── supabase_service.py     # Supabase PostgREST client & stateful store
│   └── test_direct.py          # Comprehensive test verification script
└── frontend/
    ├── package.json            # Frontend npm scripts & dependencies
    ├── vite.config.js          # Vite config with API reverse proxy
    ├── tailwind.config.js      # Tailwind styling & glassmorphic color themes
    ├── index.html              # HTML5 entry point
    └── src/
        ├── App.jsx             # Main dashboard & modal state coordinator
        ├── main.jsx            # React root mount
        ├── index.css           # Custom glassmorphism & accessibility styles
        ├── components/
        │   ├── Navbar.jsx              # Brand header, counters, accessibility toggles
        │   ├── VibeSearch.jsx          # Multimodal scenario & image uploader
        │   ├── CapsuleGrid.jsx         # 3-item capsule presentation & budget meter
        │   ├── ProductCard.jsx         # Deep links (Amazon, Flipkart, Myntra) & badges
        │   ├── RegretShieldModal.jsx   # 'Who Should NOT Buy This' dealbreakers modal
        │   ├── CostPerUseCalculator.jsx# Dynamic wear frequency & CPU calculator
        │   ├── WardrobeDrawer.jsx      # 'My Owned Items' digital closet
        │   ├── ConflictAlertModal.jsx  # Duplicate & clash warnings report
        │   ├── PriceWatchlistModal.jsx # Guardrailed 1-tap auto-buy & spend caps
        │   └── SavedBoardsDrawer.jsx   # Curated boards archive
        └── services/
            ├── api.js          # Backend API fetch client
            └── supabase.js     # Supabase client connector
```
