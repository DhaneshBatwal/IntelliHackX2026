import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  ShoppingBag, 
  ArrowRight, 
  MapPin, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  Clock, 
  Lock,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  splitBundles = [],
  subtotal = 0,
  splitSavings = 0,
  currentPincode = "560001",
  currentCity = "Bengaluru",
  currentUser,
  onOrderSuccess
}) {
  const [step, setStep] = useState('review'); // 'review' | 'payment' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'upi' | 'card' | 'cod'
  const [appliedBankDiscount, setAppliedBankDiscount] = useState(true);
  const [orderId, setOrderId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const bankDiscountAmount = appliedBankDiscount ? Math.min(1000, Math.round(subtotal * 0.1)) : 0;
  const finalPayable = Math.max(0, subtotal - bankDiscountAmount);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedId = `VC-IN-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsProcessing(false);
      setStep('success');

      try {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 }
        });
      } catch (e) {
        console.log(e);
      }

      if (onOrderSuccess) {
        onOrderSuccess({
          orderId: generatedId,
          total: finalPayable,
          savings: splitSavings + bankDiscountAmount
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-gray-200 p-5 sm:p-7 bg-white shadow-2xl my-auto space-y-5 text-gray-900">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FEBD69] text-gray-950 flex items-center justify-center font-black shadow-sm">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base sm:text-lg flex items-center gap-2">
                <span>Universal Multi-Store Checkout</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                  1-Tap Split Pay
                </span>
              </h3>
              <p className="text-xs text-gray-500">
                Single checkout • Automatic multi-store routing across {splitBundles.length} platforms
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: REVIEW DISPATCH ROUTE & ADDRESS */}
        {step === 'review' && (
          <div className="space-y-4 animate-fade-in">
            {/* Delivery Address Pill */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                    <span>Delivering to {currentUser?.name || "Dhanesh"}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-mono font-semibold">
                      {currentPincode}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-600">
                    #42, 4th Cross, Indiranagar, {currentCity}, Karnataka
                  </p>
                </div>
              </div>
              <span className="text-emerald-700 font-bold text-[10px] shrink-0">
                Verified Address ✓
              </span>
            </div>

            {/* Smart Store Dispatch Bundles */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Intelligent Split-Store Dispatch Routing ({splitBundles.length} Hubs)
              </span>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {splitBundles.map((bundle) => (
                  <div 
                    key={bundle.storeId}
                    className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: bundle.color }}
                      />
                      <div className="min-w-0">
                        <span className="font-bold text-gray-900 block truncate">
                          {bundle.storeName} Dispatch Hub
                        </span>
                        <span className="text-[10px] text-gray-500 block truncate">
                          {bundle.items.map(i => i.live_title || i.name).join(', ')}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-gray-900 block">
                        ₹{Math.round(bundle.subtotal).toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold block">
                        FREE Delivery
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price & Savings Summary */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Combined Cart Value:</span>
                <span className="font-mono text-gray-900">₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
              </div>
              {splitSavings > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Multi-Store Split-Route Savings:</span>
                  <span className="font-mono">-₹{Math.round(splitSavings).toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Consolidated Delivery Surcharge:</span>
                <span className="font-bold">₹0 (Waived)</span>
              </div>
              <div className="border-t border-emerald-200 pt-2 flex justify-between font-extrabold text-sm text-gray-900">
                <span>Final Payable:</span>
                <span className="font-mono text-emerald-700 text-base">₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setStep('payment')}
              className="w-full py-3 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 border border-[#FCD200] font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Continue to Payment & Instant Bank Discounts</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: PAYMENT & BANK OFFERS */}
        {step === 'payment' && (
          <div className="space-y-4 animate-fade-in">
            {/* Bank Offer Banner */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs flex items-center justify-between gap-3 text-amber-900">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>HDFC & SBI Card 10% Instant Discount</strong> auto-applied! You save extra <strong>₹{bankDiscountAmount.toLocaleString('en-IN')}</strong>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAppliedBankDiscount(!appliedBankDiscount)}
                className="text-[11px] underline text-amber-800 font-bold shrink-0"
              >
                {appliedBankDiscount ? "Remove" : "Apply"}
              </button>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Select 1-Tap Payment Mode
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* UPI Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-400 text-gray-900'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <QrCode className="w-5 h-5 text-amber-600" />
                    {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </div>
                  <span className="text-xs font-bold block text-gray-900">Instant UPI</span>
                  <span className="text-[10px] text-gray-500">GPay, PhonePe, Paytm</span>
                </button>

                {/* Credit / Debit Card Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-400 text-gray-900'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </div>
                  <span className="text-xs font-bold block text-gray-900">Cards & EMI</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">10% Instant Off</span>
                </button>

                {/* Cash on Delivery Option */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-amber-50 border-amber-500 shadow-sm ring-2 ring-amber-400 text-gray-900'
                      : 'bg-white border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <Truck className="w-5 h-5 text-blue-600" />
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-amber-600" />}
                  </div>
                  <span className="text-xs font-bold block text-gray-900">Cash on Delivery</span>
                  <span className="text-[10px] text-gray-500">Pay upon inspection</span>
                </button>
              </div>
            </div>

            {/* Total Payable Summary */}
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items):</span>
                <span>₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
              </div>
              {bankDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>HDFC/SBI 10% Instant Card Discount:</span>
                  <span>-₹{bankDiscountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Unified Delivery & Insurance:</span>
                <span className="text-emerald-700 font-bold">FREE</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-black text-sm text-gray-900">
                <span>Total Amount to Pay:</span>
                <span className="text-emerald-700 text-lg font-bold">₹{Math.round(finalPayable).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep('review')}
                className="py-3 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold border border-gray-300"
              >
                Back
              </button>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePlaceOrder}
                className="flex-1 py-3 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] active:bg-[#F0B800] text-gray-900 border border-[#FCD200] font-black text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                <Lock className="w-4 h-4" />
                <span>
                  {isProcessing ? "Authorizing 1-Tap Unified Payment..." : `Place Order • ₹${Math.round(finalPayable).toLocaleString('en-IN')}`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMED & LIVE TRACKER */}
        {step === 'success' && (
          <div className="space-y-5 animate-fade-in py-2">
            
            {/* Success Hero */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-300 shadow-sm animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl sm:text-2xl font-black text-gray-900">
                Order Placed Successfully!
              </h4>
              <p className="text-xs text-gray-600">
                Order ID: <strong className="text-amber-700 font-mono">{orderId}</strong> • Digital invoice synced to your account
              </p>
            </div>

            {/* Live Multi-Store Dispatch Tracker */}
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-gray-200 pb-2.5">
                <span className="font-bold text-gray-900 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>Live Multi-Marketplace Dispatch Timeline</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">
                  Express Delivery
                </span>
              </div>

              <div className="space-y-3">
                {splitBundles.map((bundle, idx) => (
                  <div key={bundle.storeId} className="p-3 rounded-lg bg-white border border-gray-200 text-xs space-y-2 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span 
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: bundle.color }}
                        />
                        <span className="font-bold text-gray-900">{bundle.storeName} Package</span>
                      </div>
                      <span className="text-[10px] text-gray-600 font-mono">
                        Tracking: {bundle.shortName.toUpperCase()}-IN-{Math.floor(100000 + Math.random() * 900000)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
                      <span className="text-emerald-700 font-bold">● Order Confirmed</span>
                      <span>→</span>
                      <span className="text-emerald-700 font-bold">● Packed</span>
                      <span>→</span>
                      <span className="text-amber-700 animate-pulse font-bold">● Dispatched</span>
                      <span>→</span>
                      <span>Delivery Tomorrow by 4 PM</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  alert(`Downloading Tax Invoice for ${orderId} (GST 18% Compliant)`);
                }}
                className="py-2.5 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-gray-300"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Download Tax Invoice (PDF)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-lg bg-[#FFD814] hover:bg-[#F7CA00] text-gray-900 text-xs font-bold transition-colors text-center border border-[#FCD200]"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
