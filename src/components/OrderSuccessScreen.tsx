import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft, 
  Package, 
  Bike, 
  Store,
  Sparkles,
  Volume2
} from 'lucide-react';
import { CartItem, DeliveryAddress } from '../types';

interface OrderSuccessScreenProps {
  cart: CartItem[];
  totalAmount: number;
  walletDeducted?: number;
  paymentMethod: string;
  address: DeliveryAddress;
  onBackToHome: () => void;
  onOpenAdminDrawer: () => void;
}

export const OrderSuccessScreen: React.FC<OrderSuccessScreenProps> = ({
  cart,
  totalAmount,
  walletDeducted = 0,
  paymentMethod,
  address,
  onBackToHome,
  onOpenAdminDrawer
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState<number>(8 * 60 + 34); // 8m 34s
  const [currentStep, setCurrentStep] = useState<number>(2); // 1: Packed, 2: Rider on way, 3: Arrived

  useEffect(() => {
    // Trigger celebratory confetti on mount
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className="flex flex-col min-h-full bg-[#F5F6F8] text-neutral-900 pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBackToHome}
            className="p-1 -ml-1 text-neutral-800 hover:bg-neutral-100 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-sm font-bold text-neutral-900">Live Order Tracking</h1>
            <p className="text-[11px] text-neutral-500 font-mono">Order #BLK-918234</p>
          </div>
        </div>

        <button
          onClick={onOpenAdminDrawer}
          className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300"
        >
          Admin Logs
        </button>
      </div>

      <div className="p-4 space-y-3.5 max-w-lg mx-auto w-full">
        {/* ETA Hero Card */}
        <div className="bg-gradient-to-br from-[#0C831F] to-[#085C15] text-white rounded-3xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>Arriving in</span>
              </div>
              <div className="text-3xl font-black tracking-tight mt-1">
                {minutes} MINS {seconds < 10 ? `0${seconds}` : seconds}S
              </div>
              <p className="text-xs text-emerald-100 mt-1">
                Order placed at 19:01 • Dark store packing completed
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center">
              <Bike className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-medium text-emerald-100">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
              Packed at Dark Store
            </span>
            <span className="text-amber-300 font-bold font-mono">OTP: 4819</span>
          </div>
        </div>

        {/* Live Delivery Route Simulation Card */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-900">Rider Partner</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              ON ELECTRIC SCOOTER
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl border border-neutral-200">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-amber-400 font-bold text-neutral-900 flex items-center justify-center text-sm shadow-xs border-2 border-white">
                RK
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs text-neutral-900">Ramesh Kumar</h4>
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-1 rounded font-bold">4.9 ★</span>
                </div>
                <p className="text-[11px] text-neutral-500">2,400+ 10-min deliveries</p>
              </div>
            </div>

            <button 
              onClick={() => alert('Calling delivery partner: Ramesh Kumar (+91 98451 00921)...')}
              className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
              title="Call rider"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          {/* Route Map Card */}
          <div className="relative h-32 rounded-xl bg-slate-100 border border-neutral-200 overflow-hidden flex items-center justify-center">
            {/* Stylized road grid representation */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/2 left-6 right-6 h-1 bg-emerald-300 -translate-y-1/2 dashed rounded" />
            
            {/* Store Pin */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-neutral-800 text-white flex items-center justify-center text-xs shadow-md">
                <Store className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-neutral-600 mt-1">Dark Store</span>
            </div>

            {/* Rider moving */}
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center animate-pulse">
              <div className="w-8 h-8 rounded-full bg-[#0C831F] text-white flex items-center justify-center text-xs shadow-lg border-2 border-white ring-2 ring-emerald-400">
                <Bike className="w-4 h-4" />
              </div>
              <span className="text-[9px] font-bold text-emerald-800 bg-white/90 px-1 rounded mt-1 shadow-2xs">
                700m away
              </span>
            </div>

            {/* Destination Pin */}
            <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs shadow-md">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-neutral-600 mt-1">Parangi Palaya</span>
            </div>
          </div>
        </div>

        {/* Delivery Details Card */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200 space-y-2.5 text-xs">
          <div className="font-bold text-neutral-900 pb-1 border-b border-neutral-100 flex items-center justify-between">
            <span>Delivery Instructions Passed to Rider</span>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              Ack by Rider
            </span>
          </div>

          <div className="space-y-1.5 text-neutral-700">
            <div className="flex items-center gap-2">
              <span className="text-emerald-700">✓</span>
              <span><strong>Return plastics:</strong> Rider carrying dry recyclable bag collection unit</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-700">✓</span>
              <span><strong>Don't ring bell:</strong> Rider notified to knock gently or leave at door</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="line-clamp-1">{address.fullAddress}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-neutral-200 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-900">
            <span>Items in this Order ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
            <span className="text-emerald-700 font-extrabold">
              {totalAmount === 0 ? 'Paid via Wallet (₹0)' : `Paid ₹${totalAmount}`}
            </span>
          </div>

          {walletDeducted > 0 && (
            <div className="p-2.5 bg-[#FFFBEB] border border-[#F8CB46] rounded-xl flex items-center justify-between text-xs font-bold text-neutral-900">
              <div className="flex items-center gap-1.5">
                <span>👛</span>
                <span>Paid via Wallet</span>
              </div>
              <span className="text-[#0C831F] font-black">-₹{walletDeducted}</span>
            </div>
          )}

          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-white border border-neutral-100 p-0.5 shrink-0 overflow-hidden flex items-center justify-center">
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
                  <span className="text-neutral-800 line-clamp-1">
                    {item.quantity}x {item.product.name}
                  </span>
                </div>
                <span className="font-semibold text-neutral-900 shrink-0">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home Button */}
        <button
          onClick={onBackToHome}
          className="w-full py-3.5 bg-neutral-900 text-white font-bold text-sm rounded-2xl hover:bg-neutral-800 active:scale-[0.99] transition-all shadow-md"
        >
          Shop More Grocery Items
        </button>
      </div>
    </div>
  );
};
