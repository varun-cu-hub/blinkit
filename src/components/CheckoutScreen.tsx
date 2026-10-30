import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  Share2, 
  Plus, 
  Minus, 
  Mic, 
  BellOff, 
  Home, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  ShieldAlert, 
  PhoneOff, 
  DoorClosed, 
  Sparkles, 
  Activity, 
  ShoppingBag,
  Volume2,
  Trash2,
  Package
} from 'lucide-react';
import { CartItem, DeliveryAddress, DeliveryInstruction, UserProfileHistory } from '../types';

interface CheckoutScreenProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onBack: () => void;
  onOpenPaymentDrawer: () => void;
  onOpenAddressDrawer: () => void;
  onOpenAdminDrawer: () => void;
  onPlaceOrder: (walletUsed: number, finalToPay: number) => void;
  selectedPayment: string;
  selectedAddress: DeliveryAddress;
  currentUserHistory: UserProfileHistory;
  currentSegmentKey: string;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cart,
  onUpdateQuantity,
  onBack,
  onOpenPaymentDrawer,
  onOpenAddressDrawer,
  onOpenAdminDrawer,
  onPlaceOrder,
  selectedPayment,
  selectedAddress,
  currentUserHistory,
  currentSegmentKey
}) => {
  // Delivery instructions state
  const [returnPlastics, setReturnPlastics] = useState<boolean>(true);
  const [dontRingBell, setDontRingBell] = useState<boolean>(true);
  const [avoidCalling, setAvoidCalling] = useState<boolean>(false);
  const [leaveAtDoor, setLeaveAtDoor] = useState<boolean>(false);
  
  // Wallet usage state
  const [useWalletCredit, setUseWalletCredit] = useState<boolean>(currentUserHistory.walletBalance > 0);

  // Voice note state
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasRecordedVoice, setHasRecordedVoice] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const recordIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Bill details collapse state
  const [showBillDetails, setShowBillDetails] = useState<boolean>(true);

  // Tip delivery partner state
  const [selectedTip, setSelectedTip] = useState<number | null>(null);

  // Voice note press handlers
  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingSeconds(0);
    recordIntervalRef.current = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 15) {
          handleStopRecording();
          return 15;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    if (recordIntervalRef.current) {
      clearInterval(recordIntervalRef.current);
    }
    setIsRecording(false);
    setHasRecordedVoice(true);
  };

  // Calculations
  const itemTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemMrpTotal = cart.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0);
  const productSavings = Math.max(0, itemMrpTotal - itemTotal);
  
  // Fixed charges as per screenshot
  const deliveryFee = 0; // Free delivery
  const deliverySavings = 16; // ₹16 savings through free delivery
  const handlingCharge = 4; // Handling charge
  const tipAmount = selectedTip || 0;

  const rawGrandTotal = itemTotal + handlingCharge + tipAmount;
  
  // Wallet deduction calculation (Allowing orders up to ₹500 for research purposes)
  const walletAvailable = currentUserHistory.walletBalance || 0;
  const walletDeducted = useWalletCredit ? Math.min(walletAvailable, rawGrandTotal) : 0;
  const finalToPay = Math.max(0, rawGrandTotal - walletDeducted);
  const totalSavings = productSavings + deliverySavings + walletDeducted;


  return (
    <div className="flex flex-col min-h-full bg-[#FAF9FD] text-neutral-900 pb-28">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-neutral-100 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            id="btn-checkout-back"
            onClick={onBack}
            className="p-1 -ml-1 text-neutral-800 hover:text-neutral-600 rounded-full hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base font-bold text-neutral-900 tracking-tight">Checkout</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Admin User History Quick Trigger */}
          <button
            id="btn-admin-telemetry-badge"
            onClick={onOpenAdminDrawer}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-[11px] font-bold border border-amber-300 shadow-xs transition-all animate-pulse"
            title="Open Admin User History & Checkout Telemetry"
          >
            <Activity className="w-3.5 h-3.5 text-amber-700" />
            <span>Admin</span>
          </button>

          {/* Share Cart Button (Matches screenshot with green icon and text) */}
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Blinkit Cart',
                  text: 'Check out my cart on Blinkit! Delivery in 8 mins.',
                  url: window.location.href,
                }).catch(() => {});
              } else {
                navigator.clipboard?.writeText(window.location.href);
                alert('Cart link copied to clipboard!');
              }
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#2E647D] hover:text-[#1D4052] px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#2E647D]" />
              <Share2 className="w-2.5 h-2.5 absolute -top-1 -right-1 text-[#2E647D]" />
            </div>
            <span>Share</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-4 space-y-3.5 max-w-lg mx-auto w-full">
        {/* Your Total Savings Banner (Exact blue card matching screenshot) */}
        <div 
          id="savings-banner"
          className="bg-[#F0F3F7] border border-[#E4DDCF] rounded-2xl p-3.5 flex items-center justify-between"
        >
          <div>
            <div className="text-sm font-bold text-[#334960]">
              Your total savings
            </div>
            <div className="text-xs text-[#405B7C] font-medium mt-0.5">
              Includes ₹{deliverySavings} savings through free delivery
            </div>
          </div>
          <div className="text-xl font-extrabold text-[#334960] tracking-tight">
            ₹{totalSavings > 0 ? totalSavings : 29}
          </div>
        </div>

        {/* Wallet Perk Card (App UI & Colour Scheme) */}
        {currentUserHistory.walletBalance > 0 && (
          <div className="bg-gradient-to-r from-[#FCFBF7] via-[#F3F7F9] to-[#E2EDF1] border border-[#5D849A] rounded-2xl p-3.5 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#5D849A] text-neutral-950 flex items-center justify-center shrink-0 font-bold shadow-2xs">
                <span className="text-base">👛</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-neutral-900 uppercase tracking-tight">
                    Wallet
                  </span>
                  <span className="text-[10px] font-extrabold bg-[#2E647D] text-white px-1.5 py-0.2 rounded-sm">
                    ₹{currentUserHistory.walletBalance} AVAILABLE
                  </span>
                </div>
                <p className="text-[11px] text-neutral-700 leading-snug mt-0.5">
                  {rawGrandTotal <= currentUserHistory.walletBalance 
                    ? `Fully covers this ₹${rawGrandTotal} order!`
                    : `Applies ₹${walletDeducted} off. Remaining ₹${finalToPay} via ${selectedPayment}.`
                  }
                </p>
              </div>
            </div>

            <button
              onClick={() => setUseWalletCredit(!useWalletCredit)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                useWalletCredit 
                  ? 'bg-[#2E647D] text-white shadow-xs'
                  : 'bg-white border border-[#5D849A] text-neutral-900 hover:bg-[#FCFBF7]'
              }`}
            >
              {useWalletCredit ? 'Applied ✓' : 'Apply'}
            </button>
          </div>
        )}

        {/* Product Items List (White card with clean spacing) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-100 space-y-4">
          {cart.map((item) => (
            <div 
              key={item.product.id}
              className="flex items-center justify-between gap-3 pb-3.5 border-b border-neutral-100 last:border-0 last:pb-0"
            >
              {/* Product Thumbnail */}
              <div className="w-14 h-14 rounded-xl bg-neutral-50 p-1 border border-neutral-100 shrink-0 flex items-center justify-center overflow-hidden">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/products/grocery_fallback.jpg';
                  }}
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0 pr-1">
                <h3 className="text-xs font-bold text-neutral-900 leading-snug line-clamp-2">
                  {item.product.name}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  {item.product.weight}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs font-bold text-neutral-900">
                    Rs {item.product.price}
                  </span>
                  {item.product.mrp > item.product.price && (
                    <span className="text-[11px] text-neutral-400 line-through">
                      Rs {item.product.mrp}
                    </span>
                  )}
                </div>
              </div>

              {/* Blinkit Signature Green Stepper Button (+ 1 - as shown in screenshot) */}
              <div className="flex items-center bg-[#2E647D] text-white rounded-lg shadow-xs overflow-hidden h-7 shrink-0">
                <button
                  onClick={() => onUpdateQuantity(item.product.id, 1)}
                  className="px-2 h-full flex items-center justify-center hover:bg-[#1D4052] active:bg-[#10242C] transition-colors"
                  title="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="px-2 text-xs font-bold min-w-[20px] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => onUpdateQuantity(item.product.id, -1)}
                  className="px-2 h-full flex items-center justify-center hover:bg-[#1D4052] active:bg-[#10242C] transition-colors"
                  title="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>
          ))}

          {/* Plastic Collection Bag Card (matches the 3rd row in screenshot) */}
          <div className="p-3 bg-neutral-50/70 border border-neutral-200/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Paper bag graphic with Blinkit print */}
                <div className="w-7 h-8 bg-[#806F54] rounded-sm relative flex flex-col items-center justify-center shadow-xs">
                  <div className="w-4 h-2 border-t-2 border-l-2 border-r-2 border-amber-900 rounded-t-sm -mt-2 mb-1" />
                  <span className="text-[6px] font-black text-amber-950 tracking-tighter">blinkit</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-neutral-900">Plastic collection bag</h4>
                <p className="text-[11px] text-neutral-500 font-medium">Returnable</p>
                <p className="text-xs font-bold text-neutral-900 mt-0.5">Rs 0</p>
              </div>
            </div>

            <div className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              FREE
            </div>
          </div>
        </div>

        {/* Mascot Banner: Return dry plastics collected in this order (Exact match from screenshot) */}
        <div 
          id="mascot-plastics-banner"
          className="bg-[#EFF6F0] border border-[#BAD6BF] rounded-2xl p-3 flex items-center gap-3"
        >
          {/* Mascot character avatar */}
          <div className="w-11 h-11 rounded-full bg-amber-300 flex items-center justify-center relative shrink-0 overflow-hidden shadow-xs border-2 border-amber-400">
            {/* Cute winking cat/mascot expression */}
            <div className="relative w-8 h-8 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 -mt-1">
                {/* Left eye: winking */}
                <span className="text-[10px] font-black text-neutral-900">^</span>
                {/* Right eye: big anime pupil */}
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-950 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-white -mt-0.5 -ml-0.5" />
                </div>
              </div>
              {/* Cute open mouth */}
              <div className="w-2 h-1.5 bg-rose-500 rounded-b-full mt-0.5" />
              {/* Heart sparkle badge */}
              <div className="absolute -top-1 -right-1 text-amber-600 text-[9px] font-bold">✨</div>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-xs font-bold text-[#183440] leading-snug">
              Return dry plastics collected in this order
            </p>
            <p className="text-[10px] text-emerald-700 mt-0.5">
              Give back clean dry bags to your delivery partner for recycling.
            </p>
          </div>
        </div>

        {/* Delivery Instructions Section (Exact cards matching screenshot) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-100 space-y-2.5">
          <h3 className="text-xs font-bold text-neutral-900">Delivery instructions</h3>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Card 1: Return plastics */}
            <div 
              onClick={() => setReturnPlastics(!returnPlastics)}
              className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all cursor-pointer select-none ${
                returnPlastics 
                  ? 'border-[#639CAF] bg-[#EFF6F0] ring-1 ring-[#639CAF]/20'
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-neutral-900 leading-tight">
                  Return plastics
                </span>
                <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                  returnPlastics ? 'border-[#2E647D] bg-[#2E647D] text-white' : 'border-neutral-300'
                }`}>
                  {returnPlastics && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              {/* Handing bag illustration */}
              <div className="h-10 w-full bg-emerald-50/60 rounded-lg flex items-center justify-center overflow-hidden my-1">
                <div className="flex items-center justify-center text-base">
                  🤝🛍️
                </div>
              </div>

              <span className="text-[9px] text-emerald-800 font-semibold text-center mt-0.5">
                Eco Partner
              </span>
            </div>

            {/* Card 2: Record voice note */}
            <div 
              onMouseDown={handleStartRecording}
              onMouseUp={handleStopRecording}
              onTouchStart={handleStartRecording}
              onTouchEnd={handleStopRecording}
              className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all cursor-pointer select-none ${
                isRecording 
                  ? 'border-rose-500 bg-rose-50 animate-pulse ring-1 ring-rose-400' 
                  : hasRecordedVoice 
                    ? 'border-emerald-600 bg-emerald-50' 
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center gap-1 text-neutral-900">
                <Mic className={`w-3.5 h-3.5 ${isRecording ? 'text-rose-600 animate-bounce' : hasRecordedVoice ? 'text-emerald-700' : 'text-neutral-700'}`} />
                <span className="text-[11px] font-bold">
                  {isRecording ? `00:${recordingSeconds < 10 ? '0' : ''}${recordingSeconds}` : 'Record'}
                </span>
              </div>

              <div className="my-auto py-2 flex flex-col items-center justify-center text-center">
                {hasRecordedVoice && !isRecording ? (
                  <div className="flex items-center gap-1 text-emerald-800">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-[10px] font-bold">Voice Saved</span>
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600">
                    <Mic className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <p className="text-[9px] text-neutral-500 text-center leading-tight">
                {isRecording ? 'Release to save' : hasRecordedVoice ? 'Hold to re-record' : 'Press here and hold'}
              </p>
            </div>

            {/* Card 3: Don't ring the bell */}
            <div 
              onClick={() => setDontRingBell(!dontRingBell)}
              className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all cursor-pointer select-none ${
                dontRingBell 
                  ? 'border-neutral-900 bg-neutral-50/80 shadow-2xs' 
                  : 'border-neutral-200 bg-white hover:border-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <BellOff className="w-3.5 h-3.5 text-neutral-700" />
                <div className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                  dontRingBell ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-300'
                }`}>
                  {dontRingBell && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>

              <div className="my-auto py-1 text-center">
                <span className="text-lg">🔕</span>
              </div>

              <p className="text-[10px] font-bold text-neutral-800 leading-tight">
                Dont ring the bell
              </p>
            </div>
          </div>

          {/* Secondary Quick Toggles */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setLeaveAtDoor(!leaveAtDoor)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border flex items-center gap-1 transition-all ${
                leaveAtDoor ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 bg-neutral-50 text-neutral-700'
              }`}
            >
              <DoorClosed className="w-3 h-3" />
              <span>Leave at door</span>
            </button>
            <button
              onClick={() => setAvoidCalling(!avoidCalling)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold border flex items-center gap-1 transition-all ${
                avoidCalling ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 bg-neutral-50 text-neutral-700'
              }`}
            >
              <PhoneOff className="w-3 h-3" />
              <span>Avoid calling</span>
            </button>
          </div>
        </div>

        {/* Delivering to Home Card (Exact match from screenshot) */}
        <div 
          id="address-card"
          className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-100 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100/90 border border-amber-300 flex items-center justify-center shrink-0">
              <Home className="w-5 h-5 text-amber-700 fill-amber-700/20" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-neutral-900">
                Delivering to {selectedAddress.label}
              </h4>
              <p className="text-xs text-neutral-500 font-medium line-clamp-1 max-w-[220px]">
                {selectedAddress.fullAddress}
              </p>
            </div>
          </div>

          <button 
            id="btn-change-address"
            onClick={onOpenAddressDrawer}
            className="text-xs font-bold text-[#2E647D] hover:text-[#1D4052] hover:underline px-2 py-1"
          >
            Change
          </button>
        </div>

        {/* Bill Details Breakdown (Collapsible) */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-100 space-y-3">
          <div 
            onClick={() => setShowBillDetails(!showBillDetails)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <h3 className="text-xs font-bold text-neutral-900">Bill Details</h3>
            <div className="flex items-center gap-1 text-neutral-500 text-xs font-medium">
              <span>₹{finalToPay}</span>
              {showBillDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </div>

          {showBillDetails && (
            <div className="space-y-2 pt-2 border-t border-neutral-100 text-xs text-neutral-600 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span>Item Total</span>
                <div className="flex items-center gap-1.5">
                  {productSavings > 0 && (
                    <span className="text-neutral-400 line-through text-[11px]">₹{itemMrpTotal}</span>
                  )}
                  <span className="font-semibold text-neutral-900">₹{itemTotal}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Delivery fee</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 rounded font-semibold">FREE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-400 line-through text-[11px]">₹16</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span>Handling charge</span>
                </div>
                <span className="font-semibold text-neutral-900">₹{handlingCharge}</span>
              </div>

              {/* Delivery Partner Tip Chips */}
              <div className="pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-neutral-700">Tip your delivery partner</span>
                  {selectedTip && (
                    <button 
                      onClick={() => setSelectedTip(null)}
                      className="text-[10px] text-rose-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {[10, 20, 30, 50].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setSelectedTip(selectedTip === amount ? null : amount)}
                      className={`flex-1 py-1 rounded-lg text-xs font-bold border transition-all ${
                        selectedTip === amount 
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800' 
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      ₹{amount}
                    </button>
                  ))}
                </div>
              </div>

              {walletDeducted > 0 && (
                <div className="flex items-center justify-between text-neutral-900 font-bold bg-[#FCFBF7] p-2.5 rounded-xl border border-[#5D849A]">
                  <div className="flex items-center gap-1.5">
                    <span>👛</span>
                    <span>Wallet</span>
                  </div>
                  <span className="text-[#2E647D] font-black">-₹{walletDeducted}</span>
                </div>
              )}

              {/* Grand Total */}
              <div className="pt-2.5 border-t border-neutral-200 flex items-center justify-between text-sm font-bold text-neutral-900">
                <span>To Pay</span>
                <div className="flex items-center gap-2">
                  {walletDeducted > 0 && (
                    <span className="text-xs text-neutral-400 line-through font-normal">
                      ₹{rawGrandTotal}
                    </span>
                  )}
                  <span className={finalToPay === 0 ? 'text-emerald-700 font-extrabold' : ''}>
                    ₹{finalToPay}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cancellation policy note */}
        <div className="bg-white rounded-2xl p-3 shadow-xs border border-neutral-100 flex items-start gap-2.5 text-neutral-600 text-[11px] leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
          <p>
            <span className="font-bold text-neutral-900">Review your order and address details</span> to avoid cancellations. Orders cannot be modified once packed at the local dark store.
          </p>
        </div>

        {/* Dynamic checkout footer label */}
        <div className="text-center pt-2 pb-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-200/80 text-neutral-600 text-xs font-semibold">
            <span>
              {currentUserHistory.userSegment === 'First Time User'
                ? 'First-Time Research Order'
                : currentUserHistory.userSegment === 'Second Time Checkout'
                ? 'Second time check out'
                : currentUserHistory.userSegment}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span className="text-[11px] text-neutral-500 font-mono">
              Wallet: ₹{currentUserHistory.walletBalance}
            </span>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar (Exact replica of screenshot bottom bar) */}
      <div 
        id="checkout-bottom-bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 p-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] max-w-lg mx-auto"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Left: Pay Using selector */}
          <div 
            id="btn-select-payment"
            onClick={finalToPay > 0 ? onOpenPaymentDrawer : undefined}
            className={`cursor-pointer group flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-neutral-100 transition-colors ${
              finalToPay === 0 ? 'bg-emerald-50/70 border border-emerald-200' : ''
            }`}
          >
            <div className="w-6 h-6 rounded-md bg-white border border-neutral-200 flex items-center justify-center text-[10px] font-bold shadow-2xs">
              {finalToPay === 0 ? '👛' : <span className="text-blue-600">G</span>}
            </div>
            <div>
              <div className="flex items-center gap-1 text-[9px] font-extrabold text-neutral-500 tracking-wider uppercase">
                <span>PAY USING</span>
                {finalToPay > 0 && (
                  <ChevronUp className="w-2.5 h-2.5 stroke-[3] text-neutral-700 group-hover:-translate-y-0.5 transition-transform" />
                )}
              </div>
              <div className="text-xs font-bold text-neutral-900 line-clamp-1">
                {finalToPay === 0 ? 'Wallet (₹0 to pay)' : selectedPayment}
              </div>
            </div>
          </div>

          {/* Right: Blinkit signature combined green button */}
          <button
            id="btn-place-order"
            onClick={() => onPlaceOrder(walletDeducted, finalToPay)}
            className="flex-1 max-w-[240px] h-12 bg-[#2E647D] hover:bg-[#255166] active:bg-[#183440] text-white rounded-xl flex items-center justify-between px-4 shadow-md transition-all active:scale-[0.99]"
          >
            {/* Left part of button: Price & TOTAL label */}
            <div className="text-left flex flex-col justify-center">
              <span className="text-sm font-black leading-tight tracking-tight">
                ₹{finalToPay}
              </span>
              <span className="text-[8px] font-bold text-emerald-200 uppercase tracking-widest">
                {finalToPay === 0 ? 'WALLET' : 'TOTAL'}
              </span>
            </div>

            {/* Right part of button: Place order label & play triangle */}
            <div className="flex items-center gap-1 font-bold text-sm">
              <span>Place order</span>
              <span className="text-xs">▶</span>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};
