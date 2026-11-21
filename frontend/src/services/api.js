// API Client for VibeCart AI Backend

const BASE_URL = import.meta.env.VITE_API_URL || '';

async function handleResponse(response) {
  if (!response.ok) {
    let errorDetail = 'API request failed';
    try {
      const err = await response.json();
      errorDetail = err.detail || err.message || errorDetail;
    } catch {
      errorDetail = response.statusText;
    }
    throw new Error(errorDetail);
  }
  return response.json();
}

export const api = {
  // System Health
  async getHealth() {
    try {
      const res = await fetch(`${BASE_URL}/api/health`);
      return await handleResponse(res);
    } catch (e) {
      console.warn("Backend not yet reachable on /api/health:", e);
      return { status: "offline", model: "gemini-3.8-flash (local mode)" };
    }
  },

  // 1. Multimodal Vibe-to-Cart Capsule Generation
  async generateCapsule(prompt, imageBase64 = null, budget = null) {
    const res = await fetch(`${BASE_URL}/api/capsule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        image_base64: imageBase64,
        budget: budget ? parseFloat(budget) : null
      })
    });
    return handleResponse(res);
  },

  // 2. Real Shopping Search Deep Link helper
  async searchProduct(query, category = 'top') {
    const res = await fetch(`${BASE_URL}/api/search-products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category })
    });
    return handleResponse(res);
  },

  // 3. 'Who Should NOT Buy This' Regret-Shield Audit
  async auditRegretShield(itemName, category, fabric, price, scenario = '') {
    const res = await fetch(`${BASE_URL}/api/regret-shield`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item_name: itemName,
        category,
        fabric,
        price: parseFloat(price),
        scenario
      })
    });
    return handleResponse(res);
  },

  // 4. Wardrobe & Duplicate Conflict Checker
  async checkWardrobeConflicts(cartItems) {
    const res = await fetch(`${BASE_URL}/api/wardrobe-check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_items: cartItems })
    });
    return handleResponse(res);
  },

  // Wardrobe Items (Synced with Supabase)
  async getWardrobe() {
    const res = await fetch(`${BASE_URL}/api/wardrobe`);
    return handleResponse(res);
  },

  async addWardrobeItem(item) {
    const res = await fetch(`${BASE_URL}/api/wardrobe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    return handleResponse(res);
  },

  async deleteWardrobeItem(id) {
    const res = await fetch(`${BASE_URL}/api/wardrobe/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // Saved Boards
  async getSavedBoards() {
    const res = await fetch(`${BASE_URL}/api/saved-boards`);
    return handleResponse(res);
  },

  async saveBoard(board) {
    const res = await fetch(`${BASE_URL}/api/saved-boards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(board)
    });
    return handleResponse(res);
  },

  async deleteSavedBoard(id) {
    const res = await fetch(`${BASE_URL}/api/saved-boards/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // Price Watchlist & Auto-Buy
  async getPriceAlerts() {
    const res = await fetch(`${BASE_URL}/api/price-alerts`);
    return handleResponse(res);
  },

  async createPriceAlert(alert) {
    const res = await fetch(`${BASE_URL}/api/price-alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alert)
    });
    return handleResponse(res);
  },

  async toggleAutoBuy(id, autoBuyEnabled, spendCap = null) {
    const res = await fetch(`${BASE_URL}/api/price-alerts/${id}/auto-buy`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auto_buy_enabled: autoBuyEnabled,
        spend_cap: spendCap ? parseFloat(spendCap) : null
      })
    });
    return handleResponse(res);
  },

  async deletePriceAlert(id) {
    const res = await fetch(`${BASE_URL}/api/price-alerts/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  async simulateAutoBuy(alertId) {
    const res = await fetch(`${BASE_URL}/api/auto-buy/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alert_id: alertId })
    });
    return handleResponse(res);
  }
};
