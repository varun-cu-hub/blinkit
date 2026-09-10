import React from 'react';
import { X, CheckCircle2, Shield } from 'lucide-react';

interface PaymentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPayment: string;
  onSelectPayment: (method: string) => void;
  totalAmount: number;
}

export const PaymentDrawer: React.FC<PaymentDrawerProps> = ({
  isOpen,
  onClose,
  selectedPayment,
  onSelectPayment,
  totalAmount
}) => {
  if (!isOpen) return null;

  const paymentOptions = [
    {
      id: 'Google Pay UPI',
      name: 'Google Pay UPI',
      subtitle: 'Instant refund supported',
      badge: 'RECOMMENDED',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center font-bold text-xs text-blue-600 shadow-xs">
          <span className="text-blue-500">G</span><span className="text-red-500">P</span><span className="text-amber-500">a</span><span className="text-green-500">y</span>
        </div>
      )
    },
    {
      id: 'PhonePe UPI',
      name: 'PhonePe UPI',
      subtitle: 'Fast UPI payments',
      badge: '',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-[#5f259f] text-white flex items-center justify-center font-bold text-xs shadow-xs">
          पे
        </div>
      )
    },
    {
      id: 'Paytm UPI',
      name: 'Paytm UPI & Wallet',
      subtitle: 'Pay via UPI PIN',
      badge: '',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-[#002e6e] text-[#00baf2] flex items-center justify-center font-bold text-[10px] shadow-xs">
          Paytm
        </div>
      )
    },
    {
      id: 'CRED UPI',
      name: 'CRED UPI',
      subtitle: 'Claim cashback coins',
      badge: 'CASHBACK',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-bold text-xs shadow-xs">
          C
        </div>
      )
    },
    {
      id: 'Credit / Debit Card',
      name: 'Credit or Debit Card',
      subtitle: 'Visa, MasterCard, RuPay',
      badge: '',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-neutral-100 border border-neutral-300 text-neutral-700 flex items-center justify-center font-bold text-xs">
          💳
        </div>
      )
    },
    {
      id: 'Cash on Delivery',
      name: 'Cash on Delivery',
      subtitle: 'Pay via cash or UPI at door',
      badge: '',
      icon: (
        <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 flex items-center justify-center font-bold text-xs">
          💵
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        id="payment-drawer"
        className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-900 border-t border-neutral-200 animate-in slide-in-from-bottom duration-200"
      >
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-neutral-900">Select Payment Method</h3>
            <p className="text-xs text-neutral-500">Amount to pay: <span className="font-bold text-neutral-900">₹{totalAmount}</span></p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {paymentOptions.map((opt) => {
            const isSelected = selectedPayment === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => {
                  onSelectPayment(opt.id);
                  onClose();
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected 
                    ? 'border-emerald-600 bg-emerald-50/50 shadow-xs' 
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {opt.icon}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-neutral-900">{opt.name}</span>
                      {opt.badge && (
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wider ${
                          opt.badge === 'RECOMMENDED' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {opt.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500">{opt.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-neutral-300 bg-white'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-center gap-2 text-xs text-neutral-500">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Safe & Secure Payments • Instant UPI refund</span>
        </div>
      </div>
    </div>
  );
};
