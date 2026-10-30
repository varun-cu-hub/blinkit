import React from 'react';
import { Plus, Minus, Clock } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onUpdateQuantity: (productId: string, delta: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onUpdateQuantity
}) => {
  return (
    <div className="bg-white rounded-2xl p-2.5 border border-neutral-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative">
      {/* 8 MINS Tag */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <div className="flex items-center gap-1 bg-white/95 backdrop-blur-xs text-[9px] font-extrabold text-neutral-800 px-1.5 py-0.5 rounded-md border border-neutral-200 shadow-2xs">
          <Clock className="w-2.5 h-2.5 text-emerald-600" />
          <span>{product.deliveryTime}</span>
        </div>
      </div>

      {/* Discount Tag */}
      {product.discountPercentage ? (
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="bg-blue-600 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shadow-2xs">
            {product.discountPercentage}% OFF
          </span>
        </div>
      ) : null}

      {/* Product Image */}
      <div className="w-full h-32 rounded-xl bg-neutral-50/80 p-2 flex items-center justify-center overflow-hidden mb-2">
        <img 
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-200"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/products/grocery_fallback.jpg';
          }}
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
            {product.brand}
          </span>
          <h3 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-tight mt-0.5 min-h-[32px]">
            {product.name}
          </h3>
          <p className="text-[11px] text-neutral-500 font-medium mt-1">
            {product.weight}
          </p>
        </div>

        {/* Pricing & Add Stepper */}
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-neutral-100">
          <div>
            <div className="text-xs font-black text-neutral-900">
              ₹{product.price}
            </div>
            {product.mrp > product.price && (
              <div className="text-[10px] text-neutral-400 line-through">
                ₹{product.mrp}
              </div>
            )}
          </div>

          {/* Blinkit ADD / Stepper Button */}
          {quantityInCart === 0 ? (
            <button
              onClick={() => onUpdateQuantity(product.id, 1)}
              className="px-3.5 py-1.5 bg-emerald-50 text-[#2E647D] hover:bg-[#2E647D] hover:text-white border border-[#2E647D] rounded-lg text-xs font-bold transition-colors shadow-2xs active:scale-95"
            >
              ADD
            </button>
          ) : (
            <div className="flex items-center bg-[#2E647D] text-white rounded-lg shadow-xs overflow-hidden h-7">
              <button
                onClick={() => onUpdateQuantity(product.id, -1)}
                className="px-2 h-full flex items-center justify-center hover:bg-[#1D4052] active:bg-[#10242C] transition-colors"
              >
                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
              <span className="px-1.5 text-xs font-bold min-w-[18px] text-center">
                {quantityInCart}
              </span>
              <button
                onClick={() => onUpdateQuantity(product.id, 1)}
                className="px-2 h-full flex items-center justify-center hover:bg-[#1D4052] active:bg-[#10242C] transition-colors"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
