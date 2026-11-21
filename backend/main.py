import logging
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from config import (
    GEMINI_API_KEY,
    GEMINI_MODEL,
    SERPAPI_KEY,
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    PORT,
    HOST
)
from gemini_service import generate_vibe_capsule, audit_regret_shield
from shopping_service import enrich_capsule_collection, enrich_item_with_shopping_data
from wardrobe_service import check_wardrobe_conflicts
import supabase_service

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("vibecart.main")

app = FastAPI(
    title="VibeCart AI API",
    description="Multimodal Fashion Discovery, Regret Shield Auditor & Wardrobe Conflict Checker",
    version="1.0.0"
)

# Enable CORS for local Vite and production clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Request Models ---

class CapsuleRequest(BaseModel):
    prompt: str = Field(..., description="Natural language scenario or aesthetic prompt")
    image_base64: Optional[str] = Field(None, description="Optional base64 encoded inspiration image")
    budget: Optional[float] = Field(None, description="Target budget limit in INR")

class RegretShieldRequest(BaseModel):
    item_name: str
    category: str = "top"
    fabric: str = "Linen-Cotton Blend"
    price: float = 2499.0
    scenario: Optional[str] = ""

class WardrobeCheckRequest(BaseModel):
    cart_items: List[Dict[str, Any]]

class WardrobeItemCreate(BaseModel):
    name: str
    category: str
    color: str
    brand: Optional[str] = "Unspecified"
    style_tags: Optional[List[str]] = []
    estimated_cost: Optional[float] = 0.0
    wears_count: Optional[int] = 0
    image_url: Optional[str] = None

class SavedBoardCreate(BaseModel):
    title: str
    scenario_prompt: str
    vibe_summary: Optional[str] = ""
    total_price: float
    items: List[Dict[str, Any]]
    aesthetic_tags: Optional[List[str]] = []

class PriceAlertCreate(BaseModel):
    product_title: str
    category: Optional[str] = "top"
    store_platform: str = "Amazon"
    product_url: str
    image_url: Optional[str] = None
    current_price: float
    target_price: float
    auto_buy_enabled: Optional[bool] = False
    spend_cap: Optional[float] = 8000.0

class AutoBuyToggleRequest(BaseModel):
    auto_buy_enabled: bool
    spend_cap: Optional[float] = None

class SimulateAutoBuyRequest(BaseModel):
    alert_id: str

# --- Endpoints ---

@app.get("/api/health")
async def health_check():
    """Health status and configuration inspection endpoint."""
    return {
        "status": "online",
        "service": "VibeCart AI Backend",
        "gemini": {
            "model": GEMINI_MODEL,
            "api_key_configured": bool(GEMINI_API_KEY)
        },
        "serpapi": {
            "configured": bool(SERPAPI_KEY)
        },
        "supabase": {
            "configured": supabase_service.is_supabase_configured(),
            "url": SUPABASE_URL if SUPABASE_URL else "local_mock_mode"
        }
    }

@app.post("/api/capsule")
async def create_vibe_capsule(payload: CapsuleRequest):
    """
    1. Vibe-to-Cart Multimodal Discovery Hub
    Takes a natural scenario prompt and/or image, queries Gemini API,
    and enriches each item with live shopping links & thumbnails.
    """
    if not payload.prompt.strip() and not payload.image_base64:
        raise HTTPException(status_code=400, detail="Prompt or image inspiration is required.")

    logger.info(f"Generating capsule for scenario: '{payload.prompt[:60]}...'")
    raw_capsule = await generate_vibe_capsule(
        prompt=payload.prompt,
        image_base64=payload.image_base64,
        budget=payload.budget
    )
    
    # Enrich with live shopping thumbnails, real prices, and deep links (Amazon, Flipkart, Myntra)
    enriched_capsule = await enrich_capsule_collection(raw_capsule)
    return enriched_capsule

@app.post("/api/search-products")
async def search_single_product(query: str = Body(..., embed=True), category: str = Body("top", embed=True)):
    """Fetches live market shopping cards with deep links for an arbitrary query."""
    dummy_item = {
        "name": query,
        "search_query": query,
        "category": category,
        "estimated_price": 2499.0
    }
    enriched = await enrich_item_with_shopping_data(dummy_item)
    return enriched

@app.post("/api/regret-shield")
async def get_regret_shield_audit(payload: RegretShieldRequest):
    """
    3. 'Who Should NOT Buy This' Regret-Shield
    Evaluates honest dealbreakers, sizing caveats, and cost-per-use economics.
    """
    audit = await audit_regret_shield(
        item_name=payload.item_name,
        category=payload.category,
        fabric=payload.fabric,
        price=payload.price,
        scenario=payload.scenario or ""
    )
    return audit

@app.post("/api/wardrobe-check")
async def evaluate_wardrobe_conflicts(payload: WardrobeCheckRequest):
    """
    4. Wardrobe / Duplicate Conflict Checker
    Evaluates cart against owned items and flags duplicates or clashes.
    """
    owned_items = await supabase_service.get_wardrobe_items()
    conflict_report = check_wardrobe_conflicts(
        cart_items=payload.cart_items,
        owned_items=owned_items
    )
    return conflict_report

# --- Wardrobe Sync Endpoints ---

@app.get("/api/wardrobe")
async def list_wardrobe():
    """Returns user's owned wardrobe items (pre-seeded with 5 essentials)."""
    return await supabase_service.get_wardrobe_items()

@app.post("/api/wardrobe")
async def create_wardrobe_item(payload: WardrobeItemCreate):
    """Adds a new owned item to the wardrobe."""
    return await supabase_service.add_wardrobe_item(payload.dict())

@app.delete("/api/wardrobe/{item_id}")
async def remove_wardrobe_item(item_id: str):
    """Removes an item from the wardrobe."""
    success = await supabase_service.delete_wardrobe_item(item_id)
    return {"success": success, "item_id": item_id}

# --- Saved Boards Endpoints ---

@app.get("/api/saved-boards")
async def list_saved_boards():
    """Lists saved capsule boards from Supabase."""
    return await supabase_service.get_saved_boards()

@app.post("/api/saved-boards")
async def save_capsule_board(payload: SavedBoardCreate):
    """Saves a 3-item capsule board to Supabase."""
    return await supabase_service.save_board(payload.dict())

@app.delete("/api/saved-boards/{board_id}")
async def remove_saved_board(board_id: str):
    """Deletes a saved board."""
    success = await supabase_service.delete_saved_board(board_id)
    return {"success": success, "board_id": board_id}

# --- Price Watchlist & Auto-Buy Endpoints ---

@app.get("/api/price-alerts")
async def list_price_alerts():
    """Lists price watch alerts."""
    return await supabase_service.get_price_alerts()

@app.post("/api/price-alerts")
async def add_price_alert(payload: PriceAlertCreate):
    """Adds a product to the price drop watchlist."""
    return await supabase_service.create_price_alert(payload.dict())

@app.patch("/api/price-alerts/{alert_id}/auto-buy")
async def toggle_alert_auto_buy(alert_id: str, payload: AutoBuyToggleRequest):
    """Toggles 1-tap auto-buy with spend cap guardrail."""
    updated = await supabase_service.toggle_auto_buy(
        alert_id=alert_id,
        auto_buy_enabled=payload.auto_buy_enabled,
        spend_cap=payload.spend_cap
    )
    if not updated:
        raise HTTPException(status_code=404, detail="Price alert not found")
    return updated

@app.delete("/api/price-alerts/{alert_id}")
async def remove_price_alert(alert_id: str):
    """Deletes a price alert."""
    success = await supabase_service.delete_price_alert(alert_id)
    return {"success": success, "alert_id": alert_id}

@app.post("/api/auto-buy/simulate")
async def simulate_auto_buy(payload: SimulateAutoBuyRequest):
    """
    Executes a simulated 1-tap auto buy order.
    Enforces spend-cap guardrail and creates verified mock transaction.
    """
    result = await supabase_service.simulate_auto_buy_execution(payload.alert_id)
    return result

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=HOST, port=PORT, reload=True)
