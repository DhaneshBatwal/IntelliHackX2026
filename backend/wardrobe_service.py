import logging
from typing import List, Dict, Any

logger = logging.getLogger("vibecart.wardrobe")

# Pre-seeded starter wardrobe items as requested by user
INITIAL_STARTER_WARDROBE = [
    {
        "id": "starter_1",
        "name": "Navy Linen Shirt",
        "category": "top",
        "color": "Navy Blue",
        "brand": "FabIndia / M&S",
        "style_tags": ["casual", "breathable", "smart-casual", "monsoon-friendly"],
        "estimated_cost": 1999.0,
        "wears_count": 14,
        "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "starter_2",
        "name": "White Chunky Sneakers",
        "category": "footwear",
        "color": "Clean White",
        "brand": "Puma / Adidas",
        "style_tags": ["streetwear", "casual", "versatile", "daily"],
        "estimated_cost": 3499.0,
        "wears_count": 28,
        "image_url": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "starter_3",
        "name": "Black Leather Derby Shoes",
        "category": "footwear",
        "color": "Classic Black",
        "brand": "Clarks / Woodland",
        "style_tags": ["formal", "wedding", "leather", "evening"],
        "estimated_cost": 4299.0,
        "wears_count": 8,
        "image_url": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "starter_4",
        "name": "Olive Relaxed Chinos",
        "category": "bottom",
        "color": "Olive Green",
        "brand": "Uniqlo",
        "style_tags": ["smart-casual", "neutral", "tapered", "all-season"],
        "estimated_cost": 2490.0,
        "wears_count": 21,
        "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "starter_5",
        "name": "Minimalist Silver Mesh Watch",
        "category": "accessory",
        "color": "Silver Metallic",
        "brand": "Titan Edge / Fossil",
        "style_tags": ["minimal", "formal", "metallic", "timeless"],
        "estimated_cost": 5495.0,
        "wears_count": 45,
        "image_url": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"
    }
]

def check_wardrobe_conflicts(cart_items: List[Dict[str, Any]], owned_items: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Evaluates proposed cart/capsule items against the user's owned wardrobe.
    Detects duplicate aesthetic roles, functional overlaps, and suggests pairings.
    """
    warnings = []
    synergies = []
    money_saved_potential = 0.0

    for cart_item in cart_items:
        cart_name = cart_item.get("name", "").lower()
        cart_category = cart_item.get("category", "").lower()
        cart_color = cart_item.get("color", "").lower()
        cart_price = float(cart_item.get("current_price") or cart_item.get("estimated_price", 0))

        for owned in owned_items:
            owned_name = owned.get("name", "").lower()
            owned_category = owned.get("category", "").lower()
            owned_color = owned.get("color", "").lower()

            # 1. Direct or High-Overlap Duplicates
            is_same_category = cart_category == owned_category
            color_overlap = any(c in cart_color or c in cart_name for c in owned_color.split()) or any(c in owned_color for c in cart_color.split())
            
            # Check for Sneaker overlap
            if ("sneaker" in cart_name and "sneaker" in owned_name) or ("shoe" in cart_name and "shoe" in owned_name and is_same_category):
                if color_overlap or "white" in cart_name and "white" in owned_name:
                    warnings.append({
                        "severity": "high",
                        "issue_type": "duplicate",
                        "candidate_item": cart_item.get("name"),
                        "conflicting_owned_item": owned.get("name"),
                        "message": f"You already own '{owned.get('name')}' with {owned.get('wears_count', 0)} wears in your wardrobe. Adding another {owned_color} footwear is redundant.",
                        "savings_suggestion": f"Skip this footwear and save ₹{cart_price:,.0f} by styling your existing pair."
                    })
                    money_saved_potential += cart_price
                    continue

            # Check for Linen / Shirt overlap
            if "linen" in cart_name and "linen" in owned_name and is_same_category:
                warnings.append({
                    "severity": "medium",
                    "issue_type": "redundant_fabric",
                    "candidate_item": cart_item.get("name"),
                    "conflicting_owned_item": owned.get("name"),
                    "message": f"You already have a '{owned.get('name')}' in breathable linen. This item shares 80% aesthetic and climate overlap.",
                    "savings_suggestion": f"Wear your owned linen shirt with new trousers instead of purchasing a whole new top."
                })
                money_saved_potential += (cart_price * 0.5)
                continue

            # Check for Formal Footwear overlap (Derby / Oxford / Loafer)
            if any(f in cart_name for f in ["derby", "oxford", "monk", "formal shoe"]) and "derby" in owned_name:
                warnings.append({
                    "severity": "high",
                    "issue_type": "duplicate_formal",
                    "candidate_item": cart_item.get("name"),
                    "conflicting_owned_item": owned.get("name"),
                    "message": f"Your owned '{owned.get('name')}' already fulfills formal events and wedding receptions.",
                    "savings_suggestion": f"Pair your existing black derbys to save ₹{cart_price:,.0f}."
                })
                money_saved_potential += cart_price
                continue

            # 2. Synergies and positive styling pairings
            if "chino" in owned_name and cart_category == "top":
                synergies.append({
                    "owned_item": owned.get("name"),
                    "capsule_item": cart_item.get("name"),
                    "pairing_tip": f"Your owned '{owned.get('name')}' will pair naturally with '{cart_item.get('name')}', anchoring the outfit without spending on new bottoms."
                })
            elif "watch" in owned_name and cart_category in ["top", "outerwear"]:
                synergies.append({
                    "owned_item": owned.get("name"),
                    "capsule_item": cart_item.get("name"),
                    "pairing_tip": f"Accentuate '{cart_item.get('name')}' by wearing your '{owned.get('name')}' for a polished metallic contrast."
                })

    # Deduplicate synergies
    unique_synergies = []
    seen_syn = set()
    for s in synergies:
        key = (s["owned_item"], s["capsule_item"])
        if key not in seen_syn:
            seen_syn.add(key)
            unique_synergies.append(s)

    return {
        "has_conflicts": len(warnings) > 0,
        "conflict_count": len(warnings),
        "money_saved_opportunity": round(money_saved_potential, 2),
        "warnings": warnings,
        "synergies": unique_synergies[:3]
    }
