import React from 'react';
import { Product, CartItem } from '../types';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/mockData';
import { ArrowRight, Leaf, Search, X, PackageOpen, Sparkles } from 'lucide-react';

interface HomeFeedProps {
  products: Product[];
  totalProductsCount: number;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onSearchSuggestionClick: (suggestion: string) => void;
  onOpenCheckout: () => void;
  onOpenAdminDrawer: () => void;
}

const POPULAR_SEARCH_SUGGESTIONS = [
  'Basmati Rice',
  'Amul Milk',
  'Moong Daal',
  'Aashirvaad Atta',
  "Lay's Chips",
  'Maggi Noodles',
  'Dettol',
  'Cadbury Dairy Milk',
  'Sunflower Oil',
  'Haldiram Bhujia'
];

export const HomeFeed: React.FC<HomeFeedProps> = ({
  products,
  totalProductsCount,
  cart,
  onUpdateQuantity,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onSearchSuggestionClick,
  onOpenCheckout
}) => {
  const getQuantityInCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const isSearchActive = searchQuery.trim() !== '';
  const currentCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);
  const currentCategoryTitle = currentCategoryObj ? currentCategoryObj.name : 'All Items';

  return (
    <div className="space-y-4 pb-24 p-3.5 bg-[#F5F6F8] min-h-[500px]">
      {/* Promotional Banner (shown when not searching) */}
      {!isSearchActive && (
        <>
          <div 
            onClick={onOpenCheckout}
            className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-300 rounded-2xl p-4 shadow-xs border border-amber-300/80 cursor-pointer relative overflow-hidden group"
          >
            <div className="relative z-10 max-w-[70%]">
              <span className="bg-neutral-900 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Instant Delivery Store
              </span>
              <h2 className="text-base font-black text-neutral-900 mt-1.5 leading-tight">
                Authentic Indian Brands & Groceries
              </h2>
              <p className="text-xs text-neutral-800 font-medium mt-1">
                Over 360+ verified items delivered in 8-10 minutes
              </p>
              <div className="inline-flex items-center gap-1 bg-[#0C831F] text-white text-xs font-bold px-3 py-1.5 rounded-xl mt-2.5 shadow-xs">
                <span>View Cart & Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Decorative Graphic */}
            <div className="absolute -right-2 -bottom-2 w-28 h-28 opacity-90 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
              <div className="w-20 h-24 bg-white/90 backdrop-blur-xs rounded-xl shadow-lg border border-amber-200 p-2 flex flex-col justify-between rotate-6">
                <span className="text-[10px] font-bold text-neutral-900">Delivery in</span>
                <span className="text-sm font-black text-[#0C831F]">8 MINS</span>
                <div className="w-full bg-emerald-100 rounded-full h-1.5">
                  <div className="bg-[#0C831F] h-1.5 rounded-full w-4/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Eco Dry Plastics Feature Banner */}
          <div className="bg-[#EBF7EE] border border-[#CDEED5] rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#144A29]">
                  Return dry plastics initiative
                </h4>
                <p className="text-[11px] text-emerald-800">
                  Collect and return dry plastics in your order for recycling
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-white/80 px-2 py-0.5 rounded-full border border-emerald-200">
              Eco-Blink
            </span>
          </div>
        </>
      )}

      {/* Search Header Info (Active search mode) */}
      {isSearchActive && (
        <div className="bg-white rounded-2xl p-3.5 border border-neutral-200/80 shadow-xs flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Search className="w-4 h-4" />
            </div>
            <div className="truncate">
              <div className="text-xs text-neutral-500 font-medium">Search results for</div>
              <div className="text-sm font-black text-neutral-900 truncate">
                "{searchQuery}"
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-full">
              {products.length} {products.length === 1 ? 'item' : 'items'}
            </span>
            <button
              onClick={onClearSearch}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Section Subheader when not searching */}
      {!isSearchActive && (
        <div className="flex items-center justify-between pt-1">
          <div>
            <h2 className="text-sm font-extrabold text-neutral-900 tracking-tight flex items-center gap-1.5">
              <span>{currentCategoryTitle}</span>
              <span className="text-xs font-medium text-neutral-400">
                ({products.length} items)
              </span>
            </h2>
            <p className="text-[11px] text-neutral-500">Delivered directly from HSR Sector 2 Dark Store</p>
          </div>

          <button
            onClick={onOpenCheckout}
            className="text-xs font-bold text-[#0C831F] hover:underline flex items-center gap-0.5"
          >
            <span>Go to Cart</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Empty State: No results found */}
      {products.length === 0 && (
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-xs text-center flex flex-col items-center justify-center my-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <PackageOpen className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-black text-neutral-900 mb-1">
            No products found for "{searchQuery}"
          </h3>
          <p className="text-xs text-neutral-500 max-w-[260px] mx-auto mb-4">
            We couldn't find an exact match in this catalog. Try searching for other Indian grocery essentials:
          </p>

          {/* Suggested Quick Searches */}
          <div className="flex flex-wrap gap-1.5 justify-center max-w-[320px] mb-4">
            {POPULAR_SEARCH_SUGGESTIONS.map((item) => (
              <button
                key={item}
                onClick={() => onSearchSuggestionClick(item)}
                className="text-xs bg-neutral-100 hover:bg-emerald-50 hover:text-emerald-800 text-neutral-700 px-2.5 py-1 rounded-full font-medium transition-colors border border-neutral-200"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClearSearch}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Clear Search & Show All
            </button>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => onSelectCategory('all')}
                className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold transition-all"
              >
                View All Categories
              </button>
            )}
          </div>
        </div>
      )}

      {/* Product Grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={getQuantityInCart(product.id)}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      )}
    </div>
  );
};
