import React, { useState } from 'react';
import { X, Bell, Shield, Zap, ExternalLink, Trash2, CheckCircle, AlertTriangle, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PriceWatchlistModal({
  isOpen,
  onClose,
  alerts,
  onToggleAutoBuy,
  onDeleteAlert,
  onSimulateAutoBuy,
  plainLanguage
}) {
  const [activeSpendCapInputs, setActiveSpendCapInputs] = useState({});
  const [simulatingId, setSimulatingId] = useState(null);
  const [simulationResult, setSimulationResult] = useState(null);

  if (!isOpen) return null;

  const handleSimulate = async (alert) => {
    setSimulatingId(alert.id);
    setSimulationResult(null);

    try {
      const res = await onSimulateAutoBuy(alert.id);
      setSimulationResult(res);

      if (res && res.success) {
        // Trigger celebratory confetti animation
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch (e) {
          console.log("Confetti trigger:", e);
        }
      }
    } catch (e) {
      setSimulationResult({
        success: false,
        error: e.message || "Simulation failed"
      });
    } finally {
      setSimulatingId(null);
    }
  };

  const handleSpendCapChange = (id, val) => {
    setActiveSpendCapInputs(prev => ({ ...prev, [id]: val }));
  };

  const saveSpendCap = (alert) => {
    const val = activeSpendCapInputs[alert.id] || alert.spend_cap;
    onToggleAutoBuy(alert.id, alert.auto_buy_enabled, parseFloat(val));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 sm:p-8 space-y-6 text-gray-900">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FEBD69] text-gray-950 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-gray-500 font-bold tracking-wider">
                  {plainLanguage ? 'Price Drop Watchlist' : 'Supabase Price Watchlist & Auto-Buy'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold">
                  {alerts.length} Items Watched
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                Guardrailed 1-Tap Auto-Buy Engine
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guardrail Safety Explainer */}
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
          <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="text-xs text-blue-900 space-y-1">
            <p className="font-semibold text-gray-900">
              {plainLanguage ? 'Protected Auto-Buy with Budget Cap' : 'Smart Spend-Cap Guardrail Active'}
            </p>
            <p className="text-gray-600 leading-relaxed">
              {plainLanguage
                ? 'When a price drops to your target, 1-tap auto-buy will only order if the price is strictly beneath your Spend Cap limit.'
                : 'Auto-Buy triggers prevent accidental bank drain by enforcing a strict per-item spend cap before simulated order authorization.'}
            </p>
          </div>
        </div>

        {/* Simulation Feedback Alert */}
        {simulationResult && (
          <div className={`p-4 rounded-xl border animate-fade-in ${
            simulationResult.success
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2.5">
                {simulationResult.success ? (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider">
                    {simulationResult.success ? 'Auto-Buy Order Placed!' : 'Guardrail Protection Blocked Order'}
                  </h4>
                  <p className="text-xs mt-1">
                    {simulationResult.message || simulationResult.error}
                  </p>
                  {simulationResult.order_ref && (
                    <p className="text-[11px] font-mono mt-1 opacity-90">
                      Transaction Ref: <strong>{simulationResult.order_ref}</strong> • Paid: ₹{simulationResult.executed_price}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSimulationResult(null)}
                className="text-xs opacity-60 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-xs">
              No price alerts set yet. Click "Watch Price & Set Auto-Buy" on any product card!
            </div>
          ) : (
            alerts.map((alert) => {
              const target = Number(alert.target_price);
              const current = Number(alert.current_price);
              const spendCap = Number(activeSpendCapInputs[alert.id] !== undefined ? activeSpendCapInputs[alert.id] : alert.spend_cap || 8000);
              const isOverCap = target > spendCap;

              return (
                <div
                  key={alert.id}
                  className="p-4 sm:p-5 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all space-y-4"
                >
                  {/* Item Headline */}
                  <div className="flex items-center gap-3">
                    <img
                      src={alert.image_url || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"}
                      alt={alert.product_title}
                      className="w-14 h-14 object-cover rounded-lg border border-gray-200 shrink-0 bg-white"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-gray-200 text-gray-800">
                          {alert.store_platform || 'Amazon'}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          alert.status === 'auto_ordered'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {alert.status === 'auto_ordered' ? 'Auto-Ordered ✓' : 'Watching Price Drop'}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm truncate mt-1">
                        {alert.product_title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs mt-0.5">
                        <span className="text-gray-500">Current: <strong className="text-gray-900">₹{current.toLocaleString('en-IN')}</strong></span>
                        <span className="text-blue-700">Target: <strong className="text-blue-900 font-mono">₹{target.toLocaleString('en-IN')}</strong></span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteAlert(alert.id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors shrink-0"
                      title="Remove price alert"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Guardrail Controls Section */}
                  <div className="p-3 rounded-lg bg-white border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    
                    {/* 1-Tap Auto-Buy Toggle */}
                    <div className="flex items-center gap-3">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={Boolean(alert.auto_buy_enabled)}
                          onChange={(e) => onToggleAutoBuy(alert.id, e.target.checked, spendCap)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                      <div>
                        <span className="font-semibold text-gray-900 block">
                          {plainLanguage ? '1-Tap Auto-Buy Approval' : '1-Tap Auto-Buy Approval'}
                        </span>
                        <span className="text-[10px] text-gray-500">
                          {alert.auto_buy_enabled ? 'Auto-orders when target hit' : 'Only notify me'}
                        </span>
                      </div>
                    </div>

                    {/* Spend Cap Config */}
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-[11px]">Spend Cap:</span>
                      <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-2 py-1">
                        <span className="text-gray-500 text-[11px] mr-1">₹</span>
                        <input
                          type="number"
                          value={spendCap}
                          onChange={(e) => handleSpendCapChange(alert.id, e.target.value)}
                          onBlur={() => saveSpendCap(alert)}
                          className="w-20 bg-transparent text-gray-900 font-mono text-xs focus:outline-none"
                          step="500"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Warning if Target > Spend Cap */}
                  {isOverCap && (
                    <div className="text-[11px] text-rose-800 bg-rose-50 border border-rose-200 p-2 rounded-lg flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-600" />
                      <span>Safety Lock: Target price exceeds your spend cap! Auto-buy will be blocked.</span>
                    </div>
                  )}

                  {/* Simulate 1-Tap Trigger Button */}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <a
                      href={alert.product_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 underline underline-offset-4 font-semibold"
                    >
                      <span>Open Store Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      onClick={() => handleSimulate(alert)}
                      disabled={simulatingId === alert.id || !alert.auto_buy_enabled}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 border border-[#FCD200] font-bold text-xs shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {simulatingId === alert.id ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Simulating...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3.5 h-3.5 text-gray-900" />
                          <span>Simulate 1-Tap Buy</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
