import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  ChevronDown, 
  Search, 
  Mic, 
  User, 
  Activity, 
  Sparkles,
  Zap,
  X
} from 'lucide-react';
import { DeliveryAddress } from '../types';

interface HeaderProps {
  selectedAddress: DeliveryAddress;
  onOpenAddressDrawer: () => void;
  onOpenAdminDrawer: () => void;
  onOpenLogin: () => void;
  walletBalance?: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  themeColor: 'classic-yellow' | 'dark-yellow';
  onToggleTheme: () => void;
}

const SEARCH_PLACEHOLDERS = [
  'rice',
  'milk',
  'moong daal',
  'everest garam masala',
  'cycle agarbatti',
  'lays chips',
  'sunflower oil',
  'amul butter',
  'maggi noodles',
  'dettol',
  'kelloggs',
  'cadbury'
];

export const Header: React.FC<HeaderProps> = ({
  selectedAddress,
  onOpenAddressDrawer,
  onOpenAdminDrawer,
  onOpenLogin,
  walletBalance = 500,
  searchQuery,
  onSearchChange,
  themeColor,
  onToggleTheme
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const bgHeaderClass = themeColor === 'dark-yellow' 
    ? 'bg-gradient-to-b from-[#466B82] to-[#5D849A]'
    : 'bg-[#5D849A]';

  return (
    <header className={`sticky top-0 z-30 ${bgHeaderClass} px-4 pt-3 pb-3.5 shadow-sm transition-colors`}>
      {/* Top row: Brand + ETA + Location + Admin */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          {/* Brand Wordmark */}
          <div className="flex items-center">
            <span className="font-black text-xl tracking-tight text-neutral-900">
              blink<span className="text-[#2E647D]">it</span>
            </span>
          </div>

          {/* 10 MINS Delivery Badge */}
          <div className="bg-neutral-950 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Zap className="w-2.5 h-2.5 fill-amber-300" />
            <span>8-10 MINS</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Wallet / Login Button (Claims ₹500) */}
          <button
            onClick={onOpenLogin}
            className="flex items-center gap-1 bg-white/90 hover:bg-white text-emerald-900 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-xs border border-emerald-300 transition-all active:scale-95"
            title="Blinkit Research Login & ₹500 Wallet Credit"
          >
            <span>👛</span>
            <span>₹{walletBalance}</span>
          </button>

          {/* Theme Switcher (as requested: darker yellow/orange) */}
          <button
            onClick={onToggleTheme}
            className="p-1 rounded-full bg-white/30 hover:bg-white/50 text-neutral-900 text-[10px] font-bold px-1.5 transition-colors"
            title="Toggle between Classic Yellow and Dark Amber/Orange theme"
          >
            {themeColor === 'dark-yellow' ? '🎨' : '🎨'}
          </button>

          {/* Admin User History trigger */}
          <button
            onClick={onOpenAdminDrawer}
            className="flex items-center gap-1 bg-neutral-950 text-white hover:bg-neutral-800 text-[11px] font-bold px-2 py-1 rounded-full shadow-xs transition-all"
            title="Admin Database & Telemetry"
          >
            <Activity className="w-3 h-3 text-amber-400" />
            <span>DB</span>
          </button>
        </div>
      </div>

      {/* Location address row */}
      <div 
        onClick={onOpenAddressDrawer}
        className="flex items-center gap-1.5 text-xs text-neutral-900 font-bold mb-2.5 cursor-pointer select-none group"
      >
        <MapPin className="w-3.5 h-3.5 text-neutral-900 shrink-0" />
        <span className="line-clamp-1 group-hover:underline">
          {selectedAddress.label} - {selectedAddress.fullAddress}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-neutral-800 shrink-0" />
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-neutral-500">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={`Search '${SEARCH_PLACEHOLDERS[placeholderIndex]}'...`}
          className="w-full bg-white text-neutral-900 placeholder:text-neutral-400 text-xs rounded-xl pl-9 pr-14 py-2.5 shadow-sm border border-neutral-200/60 focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium transition-all"
        />
        <div className="absolute inset-y-0 right-2.5 flex items-center gap-1.5">
          {searchQuery.trim() !== '' && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onSearchChange(SEARCH_PLACEHOLDERS[placeholderIndex]);
            }}
            className="p-1 rounded-full text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
            title={`Voice search: Try "${SEARCH_PLACEHOLDERS[placeholderIndex]}"`}
          >
            <Mic className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
