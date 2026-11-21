import React from 'react';
import { CheckCircle2, AlertTriangle, Info, Sparkles, Tag, X } from 'lucide-react';

export default function ToastNotification({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
        let borderClass = "border-emerald-500/40 bg-emerald-950/80 text-emerald-200";

        if (toast.type === 'warning') {
          icon = <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
          borderClass = "border-amber-500/40 bg-amber-950/80 text-amber-200";
        } else if (toast.type === 'coupon') {
          icon = <Tag className="w-4 h-4 text-rose-400 shrink-0" />;
          borderClass = "border-rose-500/40 bg-rose-950/80 text-rose-200";
        } else if (toast.type === 'info') {
          icon = <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />;
          borderClass = "border-cyan-500/40 bg-cyan-950/80 text-cyan-200";
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slide-in ${borderClass}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {icon}
              <div className="text-xs font-semibold leading-snug">
                {toast.message}
              </div>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
