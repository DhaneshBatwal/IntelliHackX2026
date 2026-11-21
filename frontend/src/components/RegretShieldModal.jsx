import React, { useEffect, useState } from 'react';
import { X, ShieldAlert, AlertTriangle, CheckCircle, Sparkles, ExternalLink, Activity, Info, Loader2 } from 'lucide-react';
import CostPerUseCalculator from './CostPerUseCalculator';
import { api } from '../services/api';

export default function RegretShieldModal({ item, isOpen, onClose, plainLanguage }) {
  const [auditData, setAuditData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !item) return;

    let isMounted = true;
    setIsLoading(true);

    api.auditRegretShield(
      item.live_title || item.name,
      item.category || 'top',
      item.fabric || 'Cotton-Linen Blend',
      item.current_price || item.estimated_price || 2499,
      item.description || ''
    )
      .then((data) => {
        if (isMounted) {
          setAuditData(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error("Regret shield error:", err);
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const price = item.current_price || item.estimated_price || 2499;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 sm:p-8 space-y-6 text-gray-900">
        
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-gray-500 tracking-wider font-semibold">
                  {plainLanguage ? 'Honest Buying Warnings' : 'AI Review Auditor • Regret-Shield™'}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200">
                  {auditData?.verdict || 'Audited'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                Who Should NOT Buy This?
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

        {/* Product Headline Banner */}
        <div className="flex items-center gap-4 p-3.5 rounded-xl bg-gray-50 border border-gray-200">
          <img
            src={item.thumbnail_url || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80"}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-lg border border-gray-200 bg-white"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-sm truncate">
              {item.live_title || item.name}
            </h3>
            <p className="text-xs text-gray-500">
              Fabric: <span className="text-gray-800 font-medium">{item.fabric || 'Structured Blend'}</span>
            </p>
            <p className="text-xs font-mono text-gray-900 font-black mt-0.5">
              ₹{Number(price).toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Loading State or Audit Content */}
        {isLoading ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            <p className="text-sm text-gray-600 font-medium">
              Simulating wear durability & analyzing return rate dealbreakers...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Dealbreakers List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-mono uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>{plainLanguage ? '3 Reasons to skip this item:' : 'Critical Purchase Dealbreakers:'}</span>
              </h4>
              
              <div className="space-y-2">
                {(auditData?.dealbreakers || [
                  "If you dislike wrinkling, pure linen fibers crease quickly after sitting.",
                  "Requires careful cold wash and steam ironing; cannot be tumble-dried.",
                  "Zero elastane stretch around the chest and back seam."
                ]).map((warning, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{warning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sizing & Maintenance Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Sizing Warning */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold">
                  <Info className="w-3.5 h-3.5 text-amber-600" />
                  <span>{plainLanguage ? 'Size & Fit Warning' : 'Sizing & Cut Caveats'}</span>
                </div>
                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {auditData?.sizing_warning || "Runs slightly fitted in the shoulders. Size up if between sizes or broad-framed."}
                </p>
              </div>

              {/* Durability & Maintenance */}
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-blue-800 font-bold">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span>{plainLanguage ? 'Durability Rating' : 'Fabric Durability Score'}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-extrabold text-gray-900">
                    {auditData?.durability_score || 8.5}<span className="text-xs text-gray-500"> / 10</span>
                  </span>
                  <span className="text-xs text-gray-500">
                    Maintenance: <strong className="text-gray-800">{auditData?.maintenance_level || 'Medium'}</strong>
                  </span>
                </div>
              </div>

            </div>

            {/* Cost-Per-Use Interactive Calculator */}
            <div>
              <CostPerUseCalculator
                initialPrice={price}
                defaultLifespan={Math.round((auditData?.expected_lifespan_wears || 50) / 3)}
                plainLanguage={plainLanguage}
              />
            </div>

            {/* Advice note */}
            {auditData?.cost_per_use_advice && (
              <p className="text-xs text-gray-700 italic bg-amber-50/50 p-3 rounded-lg border border-amber-200">
                💡 <strong className="text-gray-900 not-italic font-bold">AI Auditor Tip: </strong> 
                {auditData.cost_per_use_advice}
              </p>
            )}

          </div>
        )}

        {/* Modal Footer Actions */}
        <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors border border-gray-300"
          >
            Close Audit
          </button>

          {item.deep_links?.amazon && (
            <a
              href={item.deep_links.amazon}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-xs font-bold transition-all border border-[#FCD200]"
            >
              <span>{plainLanguage ? 'Proceed Anyway (Amazon.in)' : 'Accept Risks & Open Store'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

      </div>
    </div>
  );
}
