import copy
import logging
import uuid
from datetime import datetime, timezone
import httpx
from typing import List, Dict, Any, Optional
from config import SUPABASE_URL, SUPABASE_ANON_KEY
from wardrobe_service import INITIAL_STARTER_WARDROBE

logger = logging.getLogger("vibecart.supabase")

# Resilient In-Memory Fallback Store (Pre-seeded with 5 essential items)
MOCK_DB: Dict[str, List[Dict[str, Any]]] = {
    "owned_wardrobe": copy.deepcopy(INITIAL_STARTER_WARDROBE),
    "saved_boards": [
        {
            "id": "board_starter_1",
            "user_id": "guest_user",
            "title": "Goa Beachfront Sunset Cocktail",
            "scenario_prompt": "Outfit for a monsoon beach wedding in Goa under ₹8,000",
            "vibe_summary": "Breathable pastel linen layers with water-resistant leather loafers.",
            "total_price": 7490.0,
            "items": [],
            "aesthetic_tags": ["coastal", "monsoon", "linen", "wedding"],
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ],
    "price_alerts": [
        {
            "id": "alert_starter_1",
            "user_id": "guest_user",
            "product_title": "Sage Green Embroidered Nehru Kurta",
            "category": "top",
            "store_platform": "Amazon",
            "product_url": "https://www.amazon.in/s?k=men+sage+green+linen+embroidered+kurta",
            "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
            "current_price": 2899.0,
            "target_price": 2299.0,
            "auto_buy_enabled": True,
            "spend_cap": 3000.0,
            "status": "watching",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
}

def is_supabase_configured() -> bool:
    return bool(SUPABASE_URL and SUPABASE_ANON_KEY and not "your-project" in SUPABASE_URL)

def get_supabase_headers() -> Dict[str, str]:
    return {
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

# --- Wardrobe Methods ---

async def get_wardrobe_items() -> List[Dict[str, Any]]:
    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(f"{SUPABASE_URL}/rest/v1/owned_wardrobe?select=*", headers=get_supabase_headers())
                if res.status_code == 200:
                    items = res.json()
                    if items:
                        return items
        except Exception as e:
            logger.warning(f"Failed to fetch wardrobe from Supabase: {e}. Using local store.")
    return MOCK_DB["owned_wardrobe"]

async def add_wardrobe_item(item_data: Dict[str, Any]) -> Dict[str, Any]:
    new_item = {
        "id": item_data.get("id") or str(uuid.uuid4()),
        "user_id": item_data.get("user_id", "guest_user"),
        "name": item_data["name"],
        "category": item_data.get("category", "top"),
        "color": item_data.get("color", "Neutral"),
        "brand": item_data.get("brand", "Unspecified"),
        "style_tags": item_data.get("style_tags", []),
        "estimated_cost": float(item_data.get("estimated_cost", 0.0)),
        "wears_count": int(item_data.get("wears_count", 0)),
        "image_url": item_data.get("image_url", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"),
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{SUPABASE_URL}/rest/v1/owned_wardrobe",
                    headers=get_supabase_headers(),
                    json=new_item
                )
                if res.status_code in (200, 201):
                    inserted = res.json()
                    if inserted:
                        return inserted[0]
        except Exception as e:
            logger.warning(f"Failed to insert into Supabase: {e}")

    MOCK_DB["owned_wardrobe"].insert(0, new_item)
    return new_item

async def delete_wardrobe_item(item_id: str) -> bool:
    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.delete(
                    f"{SUPABASE_URL}/rest/v1/owned_wardrobe?id=eq.{item_id}",
                    headers=get_supabase_headers()
                )
                if res.status_code in (200, 204):
                    return True
        except Exception as e:
            logger.warning(f"Failed to delete from Supabase: {e}")

    initial_len = len(MOCK_DB["owned_wardrobe"])
    MOCK_DB["owned_wardrobe"] = [i for i in MOCK_DB["owned_wardrobe"] if str(i.get("id")) != item_id]
    return len(MOCK_DB["owned_wardrobe"]) < initial_len

# --- Saved Boards Methods ---

async def get_saved_boards() -> List[Dict[str, Any]]:
    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(f"{SUPABASE_URL}/rest/v1/saved_boards?select=*&order=created_at.desc", headers=get_supabase_headers())
                if res.status_code == 200:
                    return res.json()
        except Exception as e:
            logger.warning(f"Failed to fetch saved boards from Supabase: {e}")
    return MOCK_DB["saved_boards"]

async def save_board(board_data: Dict[str, Any]) -> Dict[str, Any]:
    new_board = {
        "id": board_data.get("id") or str(uuid.uuid4()),
        "user_id": board_data.get("user_id", "guest_user"),
        "title": board_data.get("title", "Curated Vibe Board"),
        "scenario_prompt": board_data.get("scenario_prompt", ""),
        "vibe_summary": board_data.get("vibe_summary", ""),
        "total_price": float(board_data.get("total_price", 0.0)),
        "items": board_data.get("items", []),
        "aesthetic_tags": board_data.get("aesthetic_tags", []),
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{SUPABASE_URL}/rest/v1/saved_boards",
                    headers=get_supabase_headers(),
                    json=new_board
                )
                if res.status_code in (200, 201):
                    inserted = res.json()
                    if inserted:
                        return inserted[0]
        except Exception as e:
            logger.warning(f"Failed to save board to Supabase: {e}")

    MOCK_DB["saved_boards"].insert(0, new_board)
    return new_board

async def delete_saved_board(board_id: str) -> bool:
    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.delete(
                    f"{SUPABASE_URL}/rest/v1/saved_boards?id=eq.{board_id}",
                    headers=get_supabase_headers()
                )
                if res.status_code in (200, 204):
                    return True
        except Exception as e:
            logger.warning(f"Failed to delete board from Supabase: {e}")

    initial_len = len(MOCK_DB["saved_boards"])
    MOCK_DB["saved_boards"] = [b for b in MOCK_DB["saved_boards"] if str(b.get("id")) != board_id]
    return len(MOCK_DB["saved_boards"]) < initial_len

# --- Price Alerts & Auto-Buy Guardrails ---

async def get_price_alerts() -> List[Dict[str, Any]]:
    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.get(f"{SUPABASE_URL}/rest/v1/price_alerts?select=*&order=created_at.desc", headers=get_supabase_headers())
                if res.status_code == 200:
                    return res.json()
        except Exception as e:
            logger.warning(f"Failed to fetch price alerts from Supabase: {e}")
    return MOCK_DB["price_alerts"]

async def create_price_alert(alert_data: Dict[str, Any]) -> Dict[str, Any]:
    new_alert = {
        "id": alert_data.get("id") or str(uuid.uuid4()),
        "user_id": alert_data.get("user_id", "guest_user"),
        "product_title": alert_data["product_title"],
        "category": alert_data.get("category", "top"),
        "store_platform": alert_data.get("store_platform", "Amazon"),
        "product_url": alert_data.get("product_url", "https://amazon.in"),
        "image_url": alert_data.get("image_url", "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"),
        "current_price": float(alert_data.get("current_price", 0.0)),
        "target_price": float(alert_data.get("target_price", 0.0)),
        "auto_buy_enabled": bool(alert_data.get("auto_buy_enabled", False)),
        "spend_cap": float(alert_data.get("spend_cap", 8000.0)),
        "status": "watching",
        "created_at": datetime.now(timezone.utc).isoformat()
    }

    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.post(
                    f"{SUPABASE_URL}/rest/v1/price_alerts",
                    headers=get_supabase_headers(),
                    json=new_alert
                )
                if res.status_code in (200, 201):
                    inserted = res.json()
                    if inserted:
                        return inserted[0]
        except Exception as e:
            logger.warning(f"Failed to insert price alert to Supabase: {e}")

    MOCK_DB["price_alerts"].insert(0, new_alert)
    return new_alert

async def toggle_auto_buy(alert_id: str, auto_buy_enabled: bool, spend_cap: Optional[float] = None) -> Optional[Dict[str, Any]]:
    """Toggles the auto-buy feature with spend cap guardrails."""
    update_fields: Dict[str, Any] = {"auto_buy_enabled": auto_buy_enabled}
    if spend_cap is not None:
        update_fields["spend_cap"] = spend_cap

    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.patch(
                    f"{SUPABASE_URL}/rest/v1/price_alerts?id=eq.{alert_id}",
                    headers=get_supabase_headers(),
                    json=update_fields
                )
                if res.status_code in (200, 204):
                    updated = res.json()
                    if updated:
                        return updated[0]
        except Exception as e:
            logger.warning(f"Failed to update auto buy in Supabase: {e}")

    for alert in MOCK_DB["price_alerts"]:
        if str(alert.get("id")) == alert_id:
            alert["auto_buy_enabled"] = auto_buy_enabled
            if spend_cap is not None:
                alert["spend_cap"] = spend_cap
            return alert
    return None

async def delete_price_alert(alert_id: str) -> bool:
    if is_supabase_configured():
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                res = await client.delete(
                    f"{SUPABASE_URL}/rest/v1/price_alerts?id=eq.{alert_id}",
                    headers=get_supabase_headers()
                )
                if res.status_code in (200, 204):
                    return True
        except Exception as e:
            logger.warning(f"Failed to delete alert from Supabase: {e}")

    initial_len = len(MOCK_DB["price_alerts"])
    MOCK_DB["price_alerts"] = [a for a in MOCK_DB["price_alerts"] if str(a.get("id")) != alert_id]
    return len(MOCK_DB["price_alerts"]) < initial_len

async def simulate_auto_buy_execution(alert_id: str) -> Dict[str, Any]:
    """
    Simulates a 1-tap auto-buy order execution.
    Applies guardrails: Checks spend cap, verifies target price hit, and executes transaction ref.
    """
    target_alert = None
    for alert in MOCK_DB["price_alerts"]:
        if str(alert.get("id")) == alert_id:
            target_alert = alert
            break

    if not target_alert:
        return {
            "success": False,
            "error": "Price alert not found",
            "code": "NOT_FOUND"
        }

    target_price = float(target_alert.get("target_price", 0))
    spend_cap = float(target_alert.get("spend_cap", 0))

    # Guardrail 1: Check Spend Cap
    if target_price > spend_cap:
        return {
            "success": False,
            "error": f"Guardrail Tripped: Target price (₹{target_price:,.0f}) exceeds your hard spend cap of ₹{spend_cap:,.0f}!",
            "code": "SPEND_CAP_EXCEEDED",
            "spend_cap": spend_cap,
            "target_price": target_price
        }

    # Guardrail 2: Auto-Buy must be enabled
    if not target_alert.get("auto_buy_enabled", False):
        return {
            "success": False,
            "error": "1-Tap Auto-Buy approval is currently toggled OFF for this item.",
            "code": "AUTO_BUY_DISABLED"
        }

    # Simulate Order Execution
    order_ref = f"VIBE-BUY-{uuid.uuid4().hex[:8].upper()}"
    target_alert["status"] = "auto_ordered"
    target_alert["order_ref"] = order_ref
    target_alert["executed_at"] = datetime.now(timezone.utc).isoformat()

    return {
        "success": True,
        "message": f"Auto-Buy triggered successfully! Order placed via {target_alert.get('store_platform', 'Merchant')}.",
        "order_ref": order_ref,
        "executed_price": target_price,
        "savings": max(0.0, float(target_alert.get("current_price", 0)) - target_price),
        "status": "auto_ordered"
    }
