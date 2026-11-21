import React from 'react';
import { X, AlertTriangle, CheckCircle2, TrendingDown, Sparkles, Shirt, DollarSign, ArrowRight } from 'lucide-react';

export default function ConflictAlertModal({
  isOpen,
  onClose,
  report,
  plainLanguage
}) {
  if (!isOpen || !report) return null;

  const hasConflicts = report.has_conflicts;
  const moneySaved = report.money_saved_opportunity || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-gray-200 shadow-2xl p-6 sm:p-8 space-y-6 text-gray-900">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              hasConflicts
                ? 'bg-amber-100 text-amber-700 border border-amber-300'
                : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            }`}>
              {hasConflicts ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-gray-500 font-semibold">
                  {plainLanguage ? 'Closet Overlap Check' : 'Wardrobe Conflict & Duplicate Audit'}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  hasConflicts
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                }`}>
                  {hasConflicts ? `${report.conflict_count} Overlap Warning(s)` : 'Zero Duplicates Found!'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mt-0.5">
                {hasConflicts
                  ? (plainLanguage ? 'You might already own these items!' : 'Duplicate & Aesthetic Clash Detected')
                  : (plainLanguage ? 'Your closet has no duplicate pieces for this look' : 'Seamless Capsule Synergy Verified')}
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

        {/* Potential Savings Banner */}
        {moneySaved > 0 && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block">
                  {plainLanguage ? 'Money You Can Save' : 'Duplicate Avoidance Savings'}
                </span>
                <p className="text-xs text-gray-600">
                  By styling clothes already in your closet instead of re-buying.
                </p>
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 font-mono">
              ₹{Number(moneySaved).toLocaleString('en-IN')}
            </div>
          </div>
        )}

        {/* Warnings Section */}
        {hasConflicts && report.warnings && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-gray-500 tracking-wider">
              {plainLanguage ? 'Detected Duplicate Warnings:' : 'Specific Duplicate & Clash Warnings:'}
            </h3>

            <div className="space-y-2.5">
              {report.warnings.map((warn, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      {warn.issue_type === 'duplicate' ? 'Exact Category Duplicate' : 'Aesthetic & Fabric Overlap'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      High Overlap
                    </span>
                  </div>

                  <p className="text-xs text-gray-800 leading-relaxed font-medium">
                    {warn.message}
                  </p>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
                    💡 <strong className="text-emerald-800">Recommended Swap: </strong>
                    {warn.savings_suggestion}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Synergies Section */}
        {report.synergies && report.synergies.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{plainLanguage ? 'Smart Pairings with your clothes:' : 'AI Styling Synergies with Owned Pieces:'}</span>
            </h3>

            <div className="space-y-2">
              {report.synergies.map((syn, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-800 space-y-1"
                >
                  <div className="flex items-center gap-2 text-gray-900 font-semibold">
                    <span>Owned: {syn.owned_item}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <span>Capsule: {syn.capsule_item}</span>
                  </div>
                  <p className="text-gray-600 text-[11px]">
                    {syn.pairing_tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 border border-[#FCD200] font-bold text-xs shadow-sm transition-colors"
          >
            {plainLanguage ? 'Understood, Got It' : 'Acknowledge Audit & Continue'}
          </button>
        </div>

      </div>
    </div>
  );
}
