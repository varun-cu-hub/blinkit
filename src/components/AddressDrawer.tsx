import React from 'react';
import { X, Home, Briefcase, MapPin, CheckCircle2, Plus } from 'lucide-react';
import { DeliveryAddress } from '../types';
import { SAVED_ADDRESSES } from '../data/mockData';

interface AddressDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedAddress: DeliveryAddress;
  onSelectAddress: (address: DeliveryAddress) => void;
}

export const AddressDrawer: React.FC<AddressDrawerProps> = ({
  isOpen,
  onClose,
  selectedAddress,
  onSelectAddress
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        id="address-drawer"
        className="w-full max-w-md bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-900 border-t border-neutral-200 animate-in slide-in-from-bottom duration-200"
      >
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-neutral-900">Choose Delivery Address</h3>
            <p className="text-xs text-neutral-500">Deliver in 8-10 minutes</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
          {SAVED_ADDRESSES.map((addr) => {
            const isSelected = selectedAddress.id === addr.id;
            return (
              <div
                key={addr.id}
                onClick={() => {
                  onSelectAddress(addr);
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected 
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-xs' 
                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    {addr.type === 'Home' ? (
                      <Home className="w-5 h-5 text-amber-700" />
                    ) : (
                      <Briefcase className="w-5 h-5 text-amber-700" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-neutral-900">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-700 font-medium line-clamp-2 mt-0.5">
                      {addr.fullAddress}
                    </p>
                    <p className="text-[11px] text-neutral-500 mt-0.5">
                      Landmark: {addr.landmark} • {addr.pincode}
                    </p>
                  </div>
                </div>

                <div className="mt-1">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-neutral-300'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </div>
            );
          })}

          <button 
            onClick={() => {
              alert('New address form: Geolocation fetched current coordinates (Parangi Palaya, HSR Sector 2, Bengaluru). Address saved!');
              onClose();
            }}
            className="w-full py-3 px-4 border border-dashed border-emerald-600 rounded-2xl text-emerald-700 font-semibold text-xs flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Delivery Address</span>
          </button>
        </div>
      </div>
    </div>
  );
};
