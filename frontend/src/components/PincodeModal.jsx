import React, { useState } from 'react';
import { MapPin, X, Check, Building2, Sparkles, Navigation } from 'lucide-react';

const POPULAR_METROS = [
  { city: "Bengaluru", pincode: "560001", state: "Karnataka", speed: "Same-Day Delivery (4 Hours)" },
  { city: "Mumbai", pincode: "400001", state: "Maharashtra", speed: "Next-Day Delivery by 11 AM" },
  { city: "Delhi NCR", pincode: "110001", state: "Delhi", speed: "Same-Day Delivery (6 Hours)" },
  { city: "Hyderabad", pincode: "500001", state: "Telangana", speed: "Next-Day Delivery" },
  { city: "Chennai", pincode: "600001", state: "Tamil Nadu", speed: "Next-Day Delivery" },
  { city: "Kolkata", pincode: "700001", state: "West Bengal", speed: "1-2 Days Delivery" },
  { city: "Pune", pincode: "411001", state: "Maharashtra", speed: "Same-Day Delivery (5 Hours)" },
];

export default function PincodeModal({
  isOpen,
  onClose,
  currentPincode = "560001",
  currentCity = "Bengaluru",
  onSelectPincode
}) {
  const [customPincode, setCustomPincode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleApplyCustom = (e) => {
    e.preventDefault();
    const clean = customPincode.trim();
    if (!/^\d{6}$/.test(clean)) {
      setErrorMsg("Please enter a valid 6-digit Indian PIN code.");
      return;
    }
    setErrorMsg('');
    onSelectPincode({
      pincode: clean,
      city: `Pincode ${clean}`,
      speed: "Express Dispatch within 24-48 Hours"
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-gray-200 p-6 space-y-5 bg-white shadow-2xl text-gray-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base">Select Delivery Location</h3>
              <p className="text-xs text-gray-500">Updates live store delivery timelines & inventory</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Custom Pincode Input */}
        <form onSubmit={handleApplyCustom} className="space-y-2">
          <label className="text-xs font-semibold text-gray-700 block">Enter 6-Digit Indian PIN Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              maxLength={6}
              value={customPincode}
              onChange={(e) => { setCustomPincode(e.target.value.replace(/\D/g, '')); setErrorMsg(''); }}
              placeholder="e.g. 560001, 110001"
              className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3.5 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 font-bold text-xs transition-colors border border-[#FCD200] shrink-0"
            >
              Apply
            </button>
          </div>
          {errorMsg && <p className="text-[11px] text-rose-600">{errorMsg}</p>}
        </form>

        {/* Major Delivery Hubs */}
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
            Popular Metro Delivery Hubs
          </span>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            {POPULAR_METROS.map((metro) => {
              const isSelected = currentPincode === metro.pincode;
              return (
                <button
                  key={metro.pincode}
                  onClick={() => {
                    onSelectPincode(metro);
                    onClose();
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all group ${
                    isSelected
                      ? 'bg-amber-50 border-amber-400 text-gray-900 shadow-xs'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-950'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className={`w-4 h-4 ${isSelected ? 'text-amber-600' : 'text-gray-400'}`} />
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span>{metro.city}</span>
                        <span className="text-[10px] font-mono text-gray-500 font-normal">({metro.pincode})</span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        ✓ {metro.speed}
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
