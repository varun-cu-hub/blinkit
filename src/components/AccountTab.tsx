import React, { useState } from 'react';
import { 
  ShoppingBag, 
  MapPin, 
  FileText, 
  Gift, 
  HelpCircle, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  Wallet as WalletIcon, 
  User, 
  Phone, 
  CheckCircle2, 
  Plus, 
  X,
  ExternalLink,
  CreditCard,
  Clock,
  RotateCcw
} from 'lucide-react';
import { UserProfileHistory, DeliveryAddress, PastOrder } from '../types';

interface AccountTabProps {
  user: UserProfileHistory;
  walletBalance: number;
  savedAddresses: DeliveryAddress[];
  onOpenLogin: () => void;
  onLogout: () => void;
  onSelectAddress?: (address: DeliveryAddress) => void;
  onReorder?: () => void;
}

export const AccountTab: React.FC<AccountTabProps> = ({
  user,
  walletBalance,
  savedAddresses,
  onOpenLogin,
  onLogout,
  onSelectAddress,
  onReorder
}) => {
  const [activeModal, setActiveModal] = useState<
    'orders' | 'addresses' | 'prescriptions' | 'giftcards' | 'faqs' | 'privacy' | 'logoutConfirm' | null
  >(null);

  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const [prescriptions, setPrescriptions] = useState([
    { id: 'rx-01', doctor: 'Dr. A. K. Mehta (MBBS, MD)', date: '04 Sep 2026', clinic: 'Max Care Health', status: 'Verified' },
    { id: 'rx-02', doctor: 'Dr. Priya S. (Pediatrician)', date: '18 Aug 2026', clinic: 'Apollo Clinic HSR', status: 'Verified' }
  ]);

  const faqs = [
    {
      q: 'How does 10-minute delivery work?',
      a: 'We operate localized dark stores situated within 1.5 - 2 km of your location. Our packers assemble items in under 2.5 minutes, and local delivery partners reach your doorstep in 6-8 minutes.'
    },
    {
      q: 'How does my Wallet balance work?',
      a: 'Your Wallet balance can be used automatically at checkout for orders up to ₹500. If your cart total is below or equal to your wallet balance, you pay ₹0. Any remaining amount can be paid via UPI, card, or cash.'
    },
    {
      q: 'How do I return plastic bags and packaging to the delivery rider?',
      a: 'Simply select "Return plastic bag to rider" at checkout. When your order arrives, hand your clean plastic bags and containers back to the partner for our recycling initiative.'
    },
    {
      q: 'Can I cancel or modify my order after placing it?',
      a: 'Because orders are packed within 2 minutes of placement, modifications cannot be made once packing starts. If an item is missing or damaged, tap Help in My Orders for an instant refund.'
    }
  ];

  return (
    <div className="flex flex-col min-h-full bg-[#FAF9FD] text-neutral-900 pb-24">
      {/* Top Header */}
      <div className="bg-white px-5 pt-4 pb-4 border-b border-neutral-100 shadow-2xs">
        <h1 className="text-lg font-black text-neutral-900 tracking-tight">My Account</h1>
      </div>

      {/* User Phone Number & Profile Card */}
      <div className="bg-white mx-3 mt-3 rounded-2xl p-4 border border-neutral-100 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#5D849A]/20 border border-[#5D849A]/60 flex items-center justify-center text-neutral-900 font-extrabold text-base shadow-2xs">
              <User className="w-6 h-6 text-neutral-800" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-extrabold text-neutral-900 leading-tight">
                  {user.name || 'Varun Adhitya'}
                </h2>
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5" /> Verified
                </span>
              </div>
              {/* Phone Number Display */}
              <div className="flex items-center gap-1 text-xs text-neutral-600 font-semibold mt-0.5">
                <Phone className="w-3 h-3 text-neutral-400" />
                <span>{user.phone || '+91 99123 45678'}</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                {user.email || 'varunadhitya9@gmail.com'}
              </p>
            </div>
          </div>
          <button 
            onClick={onOpenLogin}
            className="text-xs font-bold text-[#2E647D] hover:text-emerald-800 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 transition-colors"
          >
            Switch
          </button>
        </div>
      </div>

      {/* Wallet Banner Card (Blinkit Yellow & Green Color Scheme) */}
      <div className="mx-3 mt-3 bg-gradient-to-br from-[#FCFBF7] via-[#F3F7F9] to-[#E2EDF1] rounded-2xl p-4 border border-[#5D849A]/40 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#5D849A] text-neutral-950 flex items-center justify-center font-bold shadow-2xs">
              <WalletIcon className="w-5 h-5 text-neutral-900" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-neutral-800 tracking-wide uppercase">Wallet</span>
                <span className="bg-[#2E647D] text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded-sm">
                  Active
                </span>
              </div>
              <div className="text-xl font-black text-neutral-950 mt-0.5">
                ₹{walletBalance}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-block bg-[#2E647D] text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-xs">
              Auto-Applied
            </span>
            <p className="text-[10px] text-neutral-500 font-medium mt-1">
              Zero-fee instant checkout
            </p>
          </div>
        </div>
      </div>

      {/* Menu Options matching user's attached image */}
      <div className="mx-3 mt-3 bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden divide-y divide-neutral-100">
        {/* 1. My Orders */}
        <button
          id="tab-menu-my-orders"
          onClick={() => setActiveModal('orders')}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center group-hover:bg-[#5D849A]/20 transition-colors">
              <ShoppingBag className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <span className="text-sm font-semibold text-neutral-900 block leading-tight">
                My Orders
              </span>
              <span className="text-[11px] text-neutral-400">
                View past receipts & reorder
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 2. Saved Addresses */}
        <button
          id="tab-menu-saved-addresses"
          onClick={() => setActiveModal('addresses')}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center group-hover:bg-[#5D849A]/20 transition-colors">
              <MapPin className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <span className="text-sm font-semibold text-neutral-900 block leading-tight">
                Saved Addresses
              </span>
              <span className="text-[11px] text-neutral-400">
                {savedAddresses.length} saved locations (Home, Work)
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 3. My Prescriptions */}
        <button
          id="tab-menu-my-prescriptions"
          onClick={() => setActiveModal('prescriptions')}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center group-hover:bg-[#5D849A]/20 transition-colors">
              <FileText className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <span className="text-sm font-semibold text-neutral-900 block leading-tight">
                My Prescriptions
              </span>
              <span className="text-[11px] text-neutral-400">
                {prescriptions.length} medical records verified
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 4. E-Gift Cards */}
        <button
          id="tab-menu-egift-cards"
          onClick={() => setActiveModal('giftcards')}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center group-hover:bg-[#5D849A]/20 transition-colors">
              <Gift className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <span className="text-sm font-semibold text-neutral-900 block leading-tight">
                E-Gift Cards
              </span>
              <span className="text-[11px] text-neutral-400">
                Buy, redeem vouchers & send gifts
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 5. FAQ's */}
        <button
          id="tab-menu-faqs"
          onClick={() => setActiveModal('faqs')}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center group-hover:bg-[#5D849A]/20 transition-colors">
              <HelpCircle className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <span className="text-sm font-semibold text-neutral-900 block leading-tight">
                FAQ's
              </span>
              <span className="text-[11px] text-neutral-400">
                10-min delivery, returns & FAQs
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 6. Account Privacy */}
        <button
          id="tab-menu-account-privacy"
          onClick={() => setActiveModal('privacy')}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center group-hover:bg-[#5D849A]/20 transition-colors">
              <ShieldCheck className="w-4 h-4 text-neutral-700" />
            </div>
            <div>
              <span className="text-sm font-semibold text-neutral-900 block leading-tight">
                Account Privacy
              </span>
              <span className="text-[11px] text-neutral-400">
                Data preferences & permissions
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 7. Log Out */}
        <button
          id="tab-menu-log-out"
          onClick={() => setActiveModal('logoutConfirm')}
          className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-rose-50/50 transition-colors group text-rose-600"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
              <LogOut className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <span className="text-sm font-semibold text-rose-600 block leading-tight">
                Log Out
              </span>
              <span className="text-[11px] text-neutral-400">
                Sign out of {user.phone || '+91 99123 45678'}
              </span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* App Version Stamp */}
      <div className="mt-6 text-center text-[11px] text-neutral-400">
        <span>Blinkit 10-Min Delivery • v12.4.8 (India)</span>
      </div>

      {/* ============ INTERACTIVE MODALS ============ */}

      {/* My Orders Modal */}
      {activeModal === 'orders' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#2E647D]" />
                <h3 className="text-base font-extrabold text-neutral-900">My Orders</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto py-3 space-y-3 flex-1">
              {user.pastOrders && user.pastOrders.length > 0 ? (
                user.pastOrders.map((order) => (
                  <div key={order.orderId} className="border border-neutral-200 rounded-2xl p-3.5 bg-neutral-50/50">
                    <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
                      <span>Order #{order.orderId}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-neutral-900 mt-1">
                      ₹{order.totalAmount}
                    </div>
                    <div className="text-xs text-neutral-600 mt-1 space-y-0.5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.quantity}x {item.name} ({item.weight})</span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-500">
                      <span>Delivered in {order.deliveryTimeMinutes} mins by {order.deliveryPartnerName}</span>
                      <button 
                        onClick={() => {
                          setActiveModal(null);
                          if (onReorder) onReorder();
                        }}
                        className="font-bold text-[#2E647D] hover:underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Reorder
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-neutral-400 text-xs">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 text-neutral-300" />
                  No previous orders found. Place an order to see it here!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Saved Addresses Modal */}
      {activeModal === 'addresses' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#2E647D]" />
                <h3 className="text-base font-extrabold text-neutral-900">Saved Addresses</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto py-3 space-y-2.5 flex-1">
              {savedAddresses.map((addr) => (
                <div 
                  key={addr.id} 
                  onClick={() => {
                    if (onSelectAddress) onSelectAddress(addr);
                    setActiveModal(null);
                  }}
                  className="p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50/70 hover:bg-emerald-50/50 hover:border-emerald-300 cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-neutral-800 bg-white px-2 py-0.5 rounded-md border border-neutral-200">
                      {addr.tag}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700">● 8 mins delivery hub</span>
                  </div>
                  <div className="text-xs font-bold text-neutral-900 mt-1.5">{addr.flatNumber}</div>
                  <div className="text-xs text-neutral-500 mt-0.5">{addr.fullAddress}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* My Prescriptions Modal */}
      {activeModal === 'prescriptions' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#2E647D]" />
                <h3 className="text-base font-extrabold text-neutral-900">My Prescriptions</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto py-3 space-y-3 flex-1">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-neutral-900">{rx.doctor}</span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[10px]">
                      {rx.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">{rx.clinic}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">Uploaded on {rx.date}</div>
                </div>
              ))}
              <button 
                onClick={() => alert('Camera / file picker for doctor prescription')}
                className="w-full py-3 rounded-2xl bg-[#2E647D] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Upload New Prescription
              </button>
            </div>
          </div>
        </div>
      )}

      {/* E-Gift Cards Modal */}
      {activeModal === 'giftcards' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#2E647D]" />
                <h3 className="text-base font-extrabold text-neutral-900">E-Gift Cards</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-neutral-950 font-bold">
                <span className="text-xs uppercase tracking-wider block opacity-80">Active Gift Card Balance</span>
                <span className="text-2xl font-black">₹0.00</span>
                <p className="text-[11px] mt-1 font-medium">Blinkit E-Gift Cards can be redeemed for any grocery or electronics purchase.</p>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Enter 16-digit voucher code"
                  className="flex-1 bg-neutral-100 text-xs px-3.5 py-2.5 rounded-xl border border-neutral-200 outline-none"
                />
                <button 
                  onClick={() => alert('Voucher applied!')}
                  className="bg-[#2E647D] text-white px-4 py-2 rounded-xl text-xs font-bold"
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ's Modal */}
      {activeModal === 'faqs' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2E647D]" />
                <h3 className="text-base font-extrabold text-neutral-900">Frequently Asked Questions</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-y-auto py-3 space-y-2.5 flex-1">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-neutral-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setFaqExpanded(faqExpanded === idx ? null : idx)}
                    className="w-full p-3 text-left font-bold text-xs text-neutral-900 bg-neutral-50 flex items-center justify-between"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${faqExpanded === idx ? 'rotate-90' : ''}`} />
                  </button>
                  {faqExpanded === idx && (
                    <div className="p-3 text-xs text-neutral-600 bg-white border-t border-neutral-100 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Account Privacy Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#2E647D]" />
                <h3 className="text-base font-extrabold text-neutral-900">Account Privacy & Security</h3>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs text-neutral-600">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">Encrypted Payment Credentials</span>
                <p className="text-[11px] leading-relaxed">All UPI and wallet sessions comply with RBI guidelines and tokenized security protocols.</p>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                <span className="font-bold text-neutral-900 block mb-1">Location Data Access</span>
                <p className="text-[11px] leading-relaxed">Precision GPS is utilized strictly during active delivery dispatch to optimize the 8-10 minute transit route.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {activeModal === 'logoutConfirm' && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-in zoom-in-95 duration-150 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-3">
              <LogOut className="w-6 h-6 text-rose-600" />
            </div>
            <h3 className="text-base font-extrabold text-neutral-900">Are you sure you want to log out?</h3>
            <p className="text-xs text-neutral-500 mt-1">
              You will be signed out from phone number {user.phone || '+91 99123 45678'}.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <button 
                onClick={() => setActiveModal(null)}
                className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold rounded-xl text-xs transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setActiveModal(null);
                  onLogout();
                }}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
