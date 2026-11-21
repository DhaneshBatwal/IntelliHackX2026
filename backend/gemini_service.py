import json
import logging
import re
import httpx
from typing import Optional, Dict, Any, List
from config import GEMINI_API_KEY, GEMINI_MODEL

logger = logging.getLogger("vibecart.gemini")

GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models"

CAPSULE_SYSTEM_PROMPT = """You are VibeCart AI, an elite fashion curator and buyer's remorse auditor.
Your job is to analyze the user's natural language scenario (and/or uploaded aesthetic inspiration photo) and curate a cohesive 3-item capsule collection.
CRITICAL RULE: If the user specifically mentions a clothing piece (e.g. 'blazer', 'hoodie', 'leather jacket', 'boots', 'kurta', 'dress'), Item 1 MUST BE THAT EXACT PIECE.
The remaining 2 items must be cohesive, stylish coordinating pieces that complete the outfit.
Keep the total estimated price strictly within the user's target budget in Indian Rupees (₹).

For every item:
1. Name: Clear, stylish product name.
2. Category: Must be one of ['top', 'bottom', 'footwear', 'outerwear', 'accessory'].
3. Color: Aesthetic color name (e.g. 'Midnight Navy', 'Raw Ecru', 'Sage Green').
4. Fabric & Material: Specific blend (e.g. 'High-Twist Wool-Blend', 'Breathable Pure Linen').
5. Description: 1-2 sentences on why it fits the aesthetic and scenario.
6. Style Role: e.g. 'Hero Statement Piece', 'Versatile Foundation', 'Functional Accent'.
7. Estimated Price: Realistic price in INR (₹) that fits within the budget.
8. Search Query: Concise 3-4 keyword query for Indian e-commerce (e.g. 'men casual blazer navy').
9. Aesthetic Tags: 2-3 tags (e.g. ['smart-casual', 'tailored', 'workwear']).

Respond strictly with valid JSON conforming to this schema:
{
  "capsule_title": "String",
  "vibe_summary": "String",
  "occasion": "String",
  "weather_readiness": "String",
  "estimated_total_price": 0,
  "color_palette": ["#Hex1", "#Hex2", "#Hex3"],
  "items": [
    {
      "id": "item_1",
      "name": "String",
      "category": "outerwear",
      "color": "String",
      "fabric": "String",
      "description": "String",
      "style_role": "Hero Statement Piece",
      "estimated_price": 0,
      "search_query": "String",
      "aesthetic_tags": ["String", "String"]
    }
  ]
}
"""

REGRET_SHIELD_SYSTEM_PROMPT = """You are the 'Regret-Shield' AI Review Auditor for VibeCart AI.
Your mission is to protect shoppers from buyer's remorse, fast-fashion regret, and wardrobe waste.
Be brutally honest, objective, and realistic.

Given a product name, category, fabric, and scenario:
1. Identify 3 critical 'Who Should NOT Buy This' dealbreakers (e.g. 'Wrinkles rapidly upon sitting; needs frequent steaming', 'Dry-clean only; high maintenance cost').
2. Sizing and Fit Caveats: Warning on brand cuts (e.g. 'Runs slim in torso; size up for broad chests').
3. Expected Lifespan: Number of realistic wears before shape loss or pilling (e.g. 50 wears).
4. Durability Score: Score from 1.0 to 10.0.
5. Maintenance Level: 'Low', 'Medium', or 'High'.
6. Verdict: 'Safe Buy', 'Proceed with Caution', or 'High Regret Risk'.
7. Cost-Per-Use Advice: Guidance on how to maximize value.

Respond strictly in valid JSON:
{
  "dealbreakers": ["String", "String", "String"],
  "sizing_warning": "String",
  "expected_lifespan_wears": 50,
  "durability_score": 8.5,
  "maintenance_level": "Medium",
  "verdict": "Safe Buy",
  "cost_per_use_advice": "String"
}
"""

async def call_gemini_api(prompt: str, system_prompt: str, image_base64: Optional[str] = None, mime_type: str = "image/jpeg") -> Optional[Dict[str, Any]]:
    """Calls the Google Gemini API with smart cascade across configured models."""
    if not GEMINI_API_KEY:
        logger.warning("No GEMINI_API_KEY found. Falling back to local AI heuristic generator.")
        return None

    # Priority order: Configured model first, then known fast stable models
    models_to_try = [
        GEMINI_MODEL,  # 'gemini-3.8-flash'
        "gemini-3-flash-preview",
        "gemini-3.1-flash-lite-preview",
        "gemini-flash-latest"
    ]
    # Deduplicate while preserving order
    seen = set()
    models_to_try = [m for m in models_to_try if not (m in seen or seen.add(m))]

    parts: List[Dict[str, Any]] = []
    if image_base64:
        clean_base64 = image_base64.split(",")[-1] if "," in image_base64 else image_base64
        parts.append({
            "inlineData": {
                "mimeType": mime_type,
                "data": clean_base64
            }
        })
    parts.append({"text": prompt})

    payload = {
        "systemInstruction": {
            "parts": [{"text": system_prompt}]
        },
        "contents": [
            {
                "role": "user",
                "parts": parts
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "temperature": 0.3
        }
    }

    # Use a 15-second timeout per model to prevent long hangs on high-demand preview models
    async with httpx.AsyncClient(timeout=15.0) as client:
        for model in models_to_try:
            url = f"{GEMINI_BASE_URL}/{model}:generateContent?key={GEMINI_API_KEY}"
            try:
                res = await client.post(url, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        text_content = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                        parsed = json.loads(text_content)
                        logger.info(f"Successfully generated response using model '{model}'")
                        return parsed
                elif res.status_code == 503:
                    logger.warning(f"Model '{model}' is under high demand (503). Trying fallback model...")
                else:
                    logger.warning(f"Model '{model}' returned status {res.status_code}: {res.text[:120]}")
            except httpx.TimeoutException:
                logger.warning(f"Model '{model}' timed out. Cascading to next model...")
            except Exception as e:
                logger.error(f"Error calling model '{model}': {e}")

    return None

def get_contextual_fallback_capsule(prompt: str, budget: Optional[float] = None) -> Dict[str, Any]:
    """
    Intelligent prompt-aware fallback generator.
    Parses user's exact query keywords and creates a tightly tailored 3-item capsule.
    """
    raw_prompt = prompt.strip()
    lp = raw_prompt.lower()
    total_budget = float(budget or 8000.0)

    # 1. BLAZER / SUIT / FORMAL JACKET
    if any(k in lp for k in ['blazer', 'suit', 'tuxedo', 'coat', 'jacket', 'formal wear']):
        item1_price = round(total_budget * 0.45)
        item2_price = round(total_budget * 0.30)
        item3_price = round(total_budget * 0.25)
        return {
            "capsule_title": "Tailored Smart-Casual Blazer Capsule",
            "vibe_summary": f"Polished, versatile tailoring built around a structured modern blazer. Designed for effortless transitions between corporate meetings, networking dinners, and elevated casual wear.",
            "occasion": "Smart Casual / Office / Evening Dinner",
            "weather_readiness": "All-Season Breathable Layering",
            "estimated_total_price": total_budget,
            "color_palette": ["#1E293B", "#F8FAFC", "#475569"],
            "items": [
                {
                    "id": "capsule_item_1",
                    "name": "Single-Breasted Notch Lapel Smart Blazer",
                    "category": "outerwear",
                    "color": "Navy Blue / Charcoal",
                    "fabric": "Structured Poly-Viscose Blend with Stretch",
                    "description": "Tailored silhouette with subtle shoulder padding and breathable interior lining. Pairs effortlessly over tees or dress shirts.",
                    "style_role": "Hero Tailored Statement",
                    "estimated_price": item1_price,
                    "search_query": "men slim fit casual blazer navy",
                    "aesthetic_tags": ["tailored", "smart-casual", "versatile"]
                },
                {
                    "id": "capsule_item_2",
                    "name": "Flat-Front Slim Tapered Stretch Trousers",
                    "category": "bottom",
                    "color": "Light Slate Grey / Khaki",
                    "fabric": "Cotton-Elastane Twill",
                    "description": "Clean front crease with 2-way stretch for all-day comfort while maintaining sharp leg drape.",
                    "style_role": "Grounded Tailored Anchor",
                    "estimated_price": item2_price,
                    "search_query": "men slim fit stretch formal trousers grey",
                    "aesthetic_tags": ["minimalist", "stretch", "workwear"]
                },
                {
                    "id": "capsule_item_3",
                    "name": "Crisp Supima Cotton Oxford Dress Shirt",
                    "category": "top",
                    "color": "Optic White",
                    "fabric": "100% Long-Staple Supima Cotton",
                    "description": "Subtle button-down collar that stays upright beneath the blazer lapels without curling.",
                    "style_role": "Refined Base Layer",
                    "estimated_price": item3_price,
                    "search_query": "men white oxford cotton dress shirt slim",
                    "aesthetic_tags": ["classic", "breathable", "clean"]
                }
            ]
        }

    # 2. WEDDING / MONSOON / GOA / ETHNIC
    if any(k in lp for k in ['wedding', 'goa', 'monsoon', 'ethnic', 'kurta', 'sherwani', 'festive', 'sangeet']):
        item1_price = round(total_budget * 0.40)
        item2_price = round(total_budget * 0.32)
        item3_price = round(total_budget * 0.28)
        return {
            "capsule_title": "Goa Coastal Sangeet & Monsoon Wedding Capsule",
            "vibe_summary": "Tailored for tropical humidity and sudden rains: lightweight breathable linens, splash-resistant tapered bottoms, and water-repellent leather footwear.",
            "occasion": "Destination Wedding / Tropical Evening",
            "weather_readiness": "Monsoon & Humidity Resistant (Quick-dry open weave)",
            "estimated_total_price": total_budget,
            "color_palette": ["#5A7265", "#E8D8C8", "#2C3E50"],
            "items": [
                {
                    "id": "capsule_item_1",
                    "name": "Sage Green Embroidered Linen-Cotton Nehru Kurta",
                    "category": "top",
                    "color": "Sage Green",
                    "fabric": "70% Breathable Linen, 30% Long-Staple Cotton",
                    "description": "Mandarin collar festive kurta with subtle tonal embroidery. Doesn't cling in humid coastal air.",
                    "style_role": "Hero Festive Statement",
                    "estimated_price": item1_price,
                    "search_query": "men sage green linen kurta",
                    "aesthetic_tags": ["coastal-wedding", "breathable", "modern-ethnic"]
                },
                {
                    "id": "capsule_item_2",
                    "name": "Ecru Pleated Tapered Linen Trousers",
                    "category": "bottom",
                    "color": "Raw Ecru / Cream",
                    "fabric": "High-Twist Pure Linen",
                    "description": "Front pleats with an ankle-cropped taper that prevents puddle splashes during sudden downpours.",
                    "style_role": "Neutral Anchor",
                    "estimated_price": item2_price,
                    "search_query": "men cream linen trousers tapered",
                    "aesthetic_tags": ["old-money", "tailored", "tropical"]
                },
                {
                    "id": "capsule_item_3",
                    "name": "Water-Resistant Tan Woven Leather Mojari Loafers",
                    "category": "footwear",
                    "color": "Cognac Tan",
                    "fabric": "Treated Leather with Anti-Skid Rubber Sole",
                    "description": "Traditional artisanal upper with modern rubber grip soles to prevent slipping on wet stone or wet grass.",
                    "style_role": "Artisanal Footwear",
                    "estimated_price": item3_price,
                    "search_query": "men tan leather ethnic mojari shoes",
                    "aesthetic_tags": ["handcrafted", "slip-resistant", "sangeet-ready"]
                }
            ]
        }

    # 3. HOODIE / STREETWEAR / TECH / CASUAL / BRUNCH
    if any(k in lp for k in ['hoodie', 'streetwear', 'tech', 'bangalore', 'bengaluru', 'casual', 'brunch', 'sneaker', 'oversized']):
        item1_price = round(total_budget * 0.35)
        item2_price = round(total_budget * 0.40)
        item3_price = round(total_budget * 0.25)
        return {
            "capsule_title": "Urban Tech-Brunch Streetwear Capsule",
            "vibe_summary": "Architectural proportions, heavyweight structured cotton, and utilitarian fabrics for an effortless city weekend.",
            "occasion": "Smart Streetwear / Creative Workspace / Weekend Cafe",
            "weather_readiness": "All-Day Breathable Comfort",
            "estimated_total_price": total_budget,
            "color_palette": ["#18181B", "#71717A", "#E4E4E7"],
            "items": [
                {
                    "id": "capsule_item_1",
                    "name": "Boxy Oversized Heavyweight French Terry Hoodie",
                    "category": "top",
                    "color": "Washed Charcoal",
                    "fabric": "400 GSM 100% Organic Cotton Terry",
                    "description": "Structured drop-shoulder cut with double-layer hood that maintains its shape without flopping.",
                    "style_role": "Hero Streetwear Foundation",
                    "estimated_price": item1_price,
                    "search_query": "men heavyweight oversized black hoodie",
                    "aesthetic_tags": ["streetwear", "heavyweight", "minimalist"]
                },
                {
                    "id": "capsule_item_2",
                    "name": "Relaxed Straight-Fit Ripstop Cargo Pants",
                    "category": "bottom",
                    "color": "Muted Olive Slate",
                    "fabric": "Ripstop Cotton-Nylon Blend",
                    "description": "Deep pocket architecture with toggle hems to alternate between wide-leg and tapered cuffs.",
                    "style_role": "Utilitarian Anchor",
                    "estimated_price": item2_price,
                    "search_query": "men relaxed ripstop cargo pants olive",
                    "aesthetic_tags": ["gorpcore", "durable", "utilitarian"]
                },
                {
                    "id": "capsule_item_3",
                    "name": "Minimalist Low-Top Chunky Leather Court Sneakers",
                    "category": "footwear",
                    "color": "Clean White & Grey",
                    "fabric": "Full-Grain Leather with Ortholite Cushioning",
                    "description": "Padded collar and anti-fatigue cupsole for 15,000+ steps across city pavements.",
                    "style_role": "Clean Everyday Anchor",
                    "estimated_price": item3_price,
                    "search_query": "men white leather court sneakers",
                    "aesthetic_tags": ["court", "cushioned", "daily"]
                }
            ]
        }

    # 4. DYNAMIC KEYWORD-MATCHED FALLBACK
    # If the user searches for any other item (e.g. 'linen shirt', 'bomber jacket', 'denim', etc.)
    # Extract the main words to build an exact match!
    clean_keyword = re.sub(r'[^\w\s]', '', raw_prompt).strip()
    words = [w for w in clean_keyword.split() if w.lower() not in ['under', 'rs', 'inr', 'for', 'a', 'an', 'the', 'outfit', 'under8000', 'under7000', '8000', '7000', '5000', '10000']]
    target_item_name = " ".join(words).title() if words else "Curated Item"

    item1_price = round(total_budget * 0.45)
    item2_price = round(total_budget * 0.35)
    item3_price = round(total_budget * 0.20)

    return {
        "capsule_title": f"Curated Capsule: {target_item_name}",
        "vibe_summary": f"A specialized 3-item capsule centered on {target_item_name}, matched with balanced foundation trousers and styling accents.",
        "occasion": "Versatile All-Day Wear",
        "weather_readiness": "Comfortable Temperature-Adapting Weave",
        "estimated_total_price": total_budget,
        "color_palette": ["#1E293B", "#94A3B8", "#F1F5F9"],
        "items": [
            {
                "id": "capsule_item_1",
                "name": f"Premium {target_item_name}",
                "category": "top" if any(t in lp for t in ['shirt', 'tee', 'tshirt', 'top', 'polo', 'hoodie']) else "outerwear",
                "color": "Muted Navy / Charcoal",
                "fabric": "High-Density Breathable Weave",
                "description": f"Hero garment tailored for {raw_prompt}. Features clean lines, reinforced seams, and premium handfeel.",
                "style_role": "Hero Focal Piece",
                "estimated_price": item1_price,
                "search_query": f"men {clean_keyword[:30]}",
                "aesthetic_tags": ["hero-piece", "versatile", "quality-cut"]
            },
            {
                "id": "capsule_item_2",
                "name": "Tailored Relaxed-Fit Chino Trousers",
                "category": "bottom",
                "color": "Raw Ecru / Khaki",
                "fabric": "Stretch Cotton Twill",
                "description": "Versatile trousers engineered to balance the silhouette and complement the hero piece.",
                "style_role": "Harmonizing Foundation",
                "estimated_price": item2_price,
                "search_query": "men tailored relaxed chinos khaki",
                "aesthetic_tags": ["foundation", "comfortable", "all-season"]
            },
            {
                "id": "capsule_item_3",
                "name": "Minimalist Nubuck Leather Casual Shoes",
                "category": "footwear",
                "color": "Espresso Brown / White",
                "fabric": "Water-Resistant Nubuck with Rubber Sole",
                "description": "Comfort-first footwear providing grounded aesthetic contrast.",
                "style_role": "Polished Accent",
                "estimated_price": item3_price,
                "search_query": "men casual leather sneakers brown",
                "aesthetic_tags": ["footwear", "comfort", "classic"]
            }
        ]
    }

def get_contextual_fallback_regret_shield(item_name: str, category: str, fabric: str, price: float) -> Dict[str, Any]:
    """Generates an honest, critical regret-shield review audit."""
    lower_name = (item_name + " " + fabric).lower()
    
    dealbreakers = []
    if "blazer" in lower_name or "suit" in lower_name:
        dealbreakers.append("Cannot be tossed in standard washing machines; strictly requires professional dry cleaning.")
        dealbreakers.append("Structured shoulder padding can feel constricting if worn during active physical movement.")
        dealbreakers.append("Armpit and back sweat marks can show quickly in hot non-AC environments if worn over short sleeves.")
        sizing = "Structured shoulder seams have zero give. Measure your shoulder width carefully or size up for athletic builds."
        lifespan = 80
        durability = 9.0
        maint = "High"
        advice = "A timeless wardrobe anchor. Hang on wide contoured wooden hangers to preserve shoulder structure."
    elif "linen" in lower_name:
        dealbreakers.append("Wrinkles within 30 minutes of sitting down in a car or flight; needs dedicated steam ironing.")
        dealbreakers.append("If you prefer crisp, rigid clothing, the relaxed rumpled drape will frustrate you.")
        dealbreakers.append("Prone to shrinkage if tumble dried on high heat (strictly cold wash & line dry).")
        sizing = "True to size, but has ZERO stretch. If you have broad shoulders or a thick back, go 1 size up."
        lifespan = 60
        durability = 8.4
        maint = "Medium"
        advice = "Wear 1-2 times a week across spring/summer/monsoon. Cost-per-wear drops below ₹45 after 1 year."
    elif "leather" in lower_name or "shoe" in lower_name or "loafer" in lower_name or "sneaker" in lower_name:
        dealbreakers.append("Requires a 3-5 day break-in period around the heel counter to avoid blisters.")
        dealbreakers.append("Not suitable for continuous water submersion; needs leather balm after monsoon puddles.")
        dealbreakers.append("Cannot be machine cleaned or left out in scorching direct sun.")
        sizing = "Snug across the instep for the first few wears as leather molds to your foot. Wear with thin socks initially."
        lifespan = 85
        durability = 9.1
        maint = "Medium"
        advice = "Pair with shoe trees between wears to absorb moisture and double sole longevity."
    else:
        dealbreakers.append("Dark dyed natural fabrics can bleed on light upholstery in the first 2 washes.")
        dealbreakers.append("High-speed spin drying will stretch the neckline ribbing over time.")
        dealbreakers.append("May feel too lightweight for winter climates without thermal layering.")
        sizing = "Standard Indian / Asian regular fit. If between sizes, choose the larger size."
        lifespan = 50
        durability = 7.8
        maint = "Low"
        advice = "Gentle cold cycle wash inside out preserves original color depth."

    cpu = round(price / max(lifespan, 1), 2)
    
    return {
        "dealbreakers": dealbreakers,
        "sizing_warning": sizing,
        "expected_lifespan_wears": lifespan,
        "durability_score": durability,
        "maintenance_level": maint,
        "verdict": "Safe Buy" if durability >= 8.0 else "Proceed with Caution",
        "cost_per_use_advice": f"Calculated Cost-Per-Use: ~₹{cpu}/wear over {lifespan} expected wears. {advice}"
    }

async def generate_vibe_capsule(prompt: str, image_base64: Optional[str] = None, budget: Optional[float] = None) -> Dict[str, Any]:
    """Generates the full 3-item capsule using Gemini or smart contextual fallback."""
    full_prompt = f"User Request: {prompt}\nTarget Budget: {f'₹{budget}' if budget else 'Under ₹8,000 INR'}"
    
    try:
        data = await call_gemini_api(full_prompt, CAPSULE_SYSTEM_PROMPT, image_base64)
        if data and "items" in data and len(data["items"]) >= 3:
            return data
    except Exception as e:
        logger.error(f"Failed to parse Gemini response: {e}")
        
    return get_contextual_fallback_capsule(prompt, budget)

async def audit_regret_shield(item_name: str, category: str, fabric: str, price: float, scenario: str = "") -> Dict[str, Any]:
    """Audits an item for potential buyer's remorse using Gemini or fallback."""
    prompt = f"Product: {item_name}\nCategory: {category}\nFabric: {fabric}\nPrice: ₹{price}\nIntended Scenario: {scenario}"
    
    try:
        data = await call_gemini_api(prompt, REGRET_SHIELD_SYSTEM_PROMPT)
        if data and "dealbreakers" in data:
            return data
    except Exception as e:
        logger.error(f"Failed to parse Gemini regret-shield response: {e}")
        
    return get_contextual_fallback_regret_shield(item_name, category, fabric, price)
