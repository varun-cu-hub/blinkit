import React from 'react';
import { ShoppingBag, ChevronRight, Clock } from 'lucide-react';
import { CartItem } from '../types';

interface CartFloatingBarProps {
  cart: CartItem[];
  onOpenCheckout: () => void;
}

export const CartFloatingBar: React.FC<CartFloatingBarProps> = ({
  cart,
  onOpenCheckout
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 px-3 max-w-md mx-auto animate-in slide-in-from-bottom duration-200">
      <div 
        id="floating-cart-bar"
        onClick={onOpenCheckout}
        className="bg-[#0C831F] text-white rounded-2xl p-3 shadow-xl flex items-center justify-between cursor-pointer hover:bg-[#0A701A] active:scale-[0.99] transition-all border border-emerald-500"
      >
        {/* Item thumbnails & Count */}
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2 overflow-hidden">
            {cart.slice(0, 3).map((item) => (
              <img
                key={item.product.id}
                src={item.product.image}
                alt={item.product.name}
                referrerPolicy="no-referrer"
                className="inline-block w-8 h-8 rounded-full ring-2 ring-emerald-700 bg-white object-contain p-0.5"
              />
            ))}
          </div>

          <div>
            <div className="text-xs font-bold leading-tight">
              {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-200">
              <Clock className="w-2.5 h-2.5" />
              <span>Delivery in 8-10 MINS</span>
            </div>
          </div>
        </div>

        {/* Total & View Cart CTA */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-xs font-bold block">₹{totalAmount}</span>
            <span className="text-[9px] text-emerald-200">Plus taxes</span>
          </div>

          <div className="flex items-center gap-0.5 bg-white/15 px-3 py-1.5 rounded-xl font-bold text-xs backdrop-blur-2xs">
            <span>View Cart</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
