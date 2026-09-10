import React from 'react';
import { 
  Wifi, 
  Battery, 
  Smartphone, 
  Maximize2, 
  Activity, 
  ChevronLeft, 
  Circle, 
  Menu,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { DeviceType } from '../types';

interface MobileFrameProps {
  children: React.ReactNode;
  deviceType: DeviceType;
  onDeviceChange: (type: DeviceType) => void;
  onOpenAdminDrawer: () => void;
  currentScreen: 'home' | 'checkout' | 'success';
  onNavigate: (screen: 'home' | 'checkout' | 'success') => void;
  cartCount: number;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  deviceType,
  onDeviceChange,
  onOpenAdminDrawer,
  currentScreen,
  onNavigate,
  cartCount
}) => {
  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-start p-2 sm:p-4 text-neutral-100 font-sans">
      {/* Top Outer Control Toolbar */}
      <div className="w-full max-w-md mb-2.5 flex items-center justify-between text-xs px-2 py-1.5 bg-neutral-900/90 border border-neutral-800 rounded-2xl shadow-md">
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => onDeviceChange('android')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              deviceType === 'android'
                ? 'bg-amber-400 text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Android Layout (Matches user's screenshot)"
          >
            <span>Android</span>
          </button>
          <button
            onClick={() => onDeviceChange('ios')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              deviceType === 'ios'
                ? 'bg-white text-neutral-950 shadow-xs'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="iOS Layout (iPhone 16 Pro)"
          >
            <span>iOS</span>
          </button>
          <button
            onClick={() => onDeviceChange('responsive')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
              deviceType === 'responsive'
                ? 'bg-neutral-800 text-white'
                : 'text-neutral-400 hover:text-white'
            }`}
            title="Responsive Fullscreen Mobile View"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>

        {/* View Switcher Shortcuts */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('checkout')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
              currentScreen === 'checkout'
                ? 'bg-[#0C831F] text-white shadow-xs'
                : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            Cart ({cartCount})
          </button>

          <button
            onClick={() => onNavigate('home')}
            className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-colors ${
              currentScreen === 'home'
                ? 'bg-amber-500 text-neutral-950'
                : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            Store
          </button>

          {/* Admin History Trigger */}
          <button
            id="btn-admin-toolbar-trigger"
            onClick={onOpenAdminDrawer}
            className="flex items-center gap-1 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-lg transition-all shadow-xs"
            title="Open Admin User History Tracking"
          >
            <Activity className="w-3.5 h-3.5 text-neutral-950" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Mobile Shell Device Container */}
      <div 
        id="mobile-viewport"
        className={`w-full max-w-[412px] bg-white text-neutral-900 flex flex-col relative overflow-hidden transition-all duration-300 ${
          deviceType === 'responsive'
            ? 'h-[92vh] rounded-2xl shadow-2xl border border-neutral-800'
            : deviceType === 'android'
              ? 'h-[860px] rounded-[38px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-[9px] border-neutral-800 ring-1 ring-neutral-700/50'
              : 'h-[860px] rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-[10px] border-neutral-800 ring-1 ring-neutral-700/50'
        }`}
      >
        {/* Device Status Bar */}
        {deviceType === 'android' ? (
          // Android Status Bar (Exact replica of top bar in user's screenshot: 19:00, VoLTE 4G+, 40%)
          <div className="bg-white text-neutral-900 px-5 pt-2 pb-1 flex items-center justify-between text-[12px] font-semibold select-none border-b border-neutral-100 z-30 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight">19:00</span>
              <span className="text-[10px] opacity-70">💬</span>
              <span className="text-[10px] opacity-70">📁</span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[9px] font-bold tracking-tighter opacity-80">VoLTE 4G+</span>
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-bold">40%</span>
                <div className="w-4 h-2 rounded-[2px] border border-neutral-800 flex items-center p-0.5">
                  <div className="h-full bg-neutral-800 w-2/5 rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>
        ) : deviceType === 'ios' ? (
          // iOS Status Bar with Dynamic Island
          <div className="bg-white text-neutral-900 px-6 pt-2 pb-1.5 flex items-center justify-between text-[13px] font-bold select-none z-30 shrink-0">
            <span>9:41</span>
            {/* Dynamic Island pill */}
            <div className="w-24 h-5 bg-black rounded-full mx-auto -mt-1 shadow-sm flex items-center justify-end px-2">
              <div className="w-2 h-2 rounded-full bg-neutral-900" />
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[10px] font-extrabold">5G</span>
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-neutral-900" />
            </div>
          </div>
        ) : (
          // Responsive Mode Minimal Status
          <div className="bg-white px-4 py-1 text-[11px] text-neutral-500 flex items-center justify-between border-b border-neutral-100 shrink-0">
            <span className="font-semibold text-neutral-800">19:00 • Blinkit Mobile</span>
            <span className="text-emerald-700 font-bold">● Dark Store Live</span>
          </div>
        )}

        {/* Scrollable Main Screen Container */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col">
          {children}
        </div>

        {/* Android Soft Navigation Bar (Matches user's screenshot: |||  O  <) */}
        {deviceType === 'android' && (
          <div className="h-9 bg-white border-t border-neutral-200 flex items-center justify-around px-8 select-none text-neutral-400 z-30 shrink-0">
            {/* Recent apps icon ||| */}
            <button 
              onClick={() => onNavigate('home')} 
              className="p-1 hover:text-neutral-700 transition-colors"
              title="Recent / Home"
            >
              <Menu className="w-4 h-4 stroke-[2]" />
            </button>
            {/* Home button circle O */}
            <button 
              onClick={() => onNavigate('home')} 
              className="p-1 hover:text-neutral-700 transition-colors"
              title="Home"
            >
              <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />
            </button>
            {/* Back button < */}
            <button 
              onClick={() => onNavigate(currentScreen === 'checkout' ? 'home' : 'checkout')} 
              className="p-1 hover:text-neutral-700 transition-colors"
              title="Back"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        )}

        {/* iOS Home Bar Indicator */}
        {deviceType === 'ios' && (
          <div className="h-6 bg-white flex items-center justify-center z-30 shrink-0">
            <div className="w-32 h-1 bg-neutral-300 rounded-full" />
          </div>
        )}
      </div>

      {/* Footnote Guide */}
      <div className="mt-2 text-center text-neutral-500 text-[11px] max-w-sm">
        <span>Blinkit 10-Min Quick Commerce UI • Click <strong>Admin</strong> to inspect User History & Checkout Telemetry.</span>
      </div>
    </div>
  );
};
