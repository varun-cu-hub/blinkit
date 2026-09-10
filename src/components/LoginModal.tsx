import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Gift, 
  Wallet, 
  CheckCircle2, 
  UserCheck 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProfileHistory } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfileHistory;
  onLoginSuccess: (user: UserProfileHistory, isFirstTime: boolean) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess
}) => {
  const [phone, setPhone] = useState<string>('');
  const [step, setStep] = useState<'phone' | 'otp' | 'welcome-bonus'>('phone');
  const [otp, setOtp] = useState<string>('4821');
  const [isFirstTimeSelected, setIsFirstTimeSelected] = useState<boolean>(false);
  const [loggedInName, setLoggedInName] = useState<string>('');

  if (!isOpen) return null;

  const handleSendOtp = () => {
    if (phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep('otp');
  };

  const handleVerifyOtp = (isFirstTime: boolean, name: string, userPhone: string) => {
    const newUser: UserProfileHistory = {
      userId: isFirstTime ? `usr_res_${Math.floor(1000 + Math.random() * 9000)}` : 'usr_hsr_8821',
      name: name || 'Researcher',
      phone: userPhone.startsWith('+91') ? userPhone : `+91 ${userPhone}`,
      email: `${name.toLowerCase().replace(/\s+/g, '')}@research.blinkit.app`,
      accountAgeDays: isFirstTime ? 1 : 14,
      userSegment: isFirstTime ? 'First Time User' : 'Second Time Checkout',
      walletBalance: isFirstTime ? 500 : 250,
      walletCreditsClaimed: true,
      totalLifetimeOrders: isFirstTime ? 0 : 1,
      totalLifetimeSpend: isFirstTime ? 0 : 412,
      totalLifetimeSavings: isFirstTime ? 0 : 45,
      averageOrderValue: isFirstTime ? 0 : 412,
      reorderIntervalDays: isFirstTime ? 0 : 6.5,
      preferredPaymentMethod: isFirstTime ? 'Blinkit Research Wallet (₹500)' : 'Google Pay UPI',
      preferredDeliveryTime: 'Evening (7:00 PM - 9:00 PM)',
      plasticsRecycledTotal: isFirstTime ? 0 : 1,
      pastOrders: [],
      telemetryLogs: [
        {
          timestamp: new Date().toLocaleTimeString(),
          action: isFirstTime ? 'FIRST_TIME_LOGIN' : 'USER_LOGIN',
          details: `User logged in via OTP. Wallet balance: ₹${isFirstTime ? 500 : 250}`
        }
      ]
    };

    if (isFirstTime) {
      setIsFirstTimeSelected(true);
      setLoggedInName(name || 'Researcher');
      setStep('welcome-bonus');
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onLoginSuccess(newUser, true);
      }, 1800);
    } else {
      onLoginSuccess(newUser, false);
      onClose();
    }
  };

  const handleQuickLogin = (type: 'first-time' | 'second-time' | 'vip') => {
    if (type === 'first-time') {
      handleVerifyOtp(true, 'New Researcher', '9912345678');
    } else if (type === 'second-time') {
      handleVerifyOtp(false, 'Varun Adhitya', '9876543210');
    } else {
      handleVerifyOtp(false, 'Priya Sharma', '9845011223');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        id="login-modal"
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-900 border border-neutral-200"
      >
        {/* Header Branding */}
        <div className="bg-[#F8CB46] p-4 flex items-center justify-between border-b border-amber-300">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tight text-neutral-900">
              blink<span className="text-[#0C831F]">it</span>
            </span>
            <span className="bg-[#0C831F] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Wallet
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-amber-400/80 text-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {step === 'welcome-bonus' ? (
            <div className="text-center py-6 space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-md">
                <Gift className="w-8 h-8 animate-bounce text-[#0C831F]" />
              </div>
              <h3 className="text-xl font-black text-neutral-900">
                ₹500 Added to Wallet!
              </h3>
              <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                Welcome to Blinkit, <strong>{loggedInName}</strong>! Your <strong>Wallet</strong> now has <strong>₹500</strong> credit ready to place orders up to ₹500.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#FFFBEB] border border-[#F8CB46] text-neutral-900 text-xs font-bold px-4 py-2 rounded-xl shadow-xs">
                <Wallet className="w-4 h-4 text-[#0C831F]" />
                <span>Wallet Balance: ₹500</span>
              </div>
            </div>
          ) : step === 'phone' ? (
            <>
              {/* ₹500 First Time Login Wallet Perk Card */}
              <div className="bg-gradient-to-r from-[#FFFBEB] via-[#FFF9E6] to-[#FEF3C7] border border-[#F8CB46] rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F8CB46] text-neutral-950 flex items-center justify-center shrink-0 shadow-xs font-bold">
                  <Wallet className="w-6 h-6 text-neutral-900" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-neutral-900 uppercase tracking-tight">
                      First-Time Login Bonus
                    </span>
                    <span className="text-[10px] bg-[#0C831F] text-white font-extrabold px-1.5 py-0.2 rounded-sm">
                      ₹500 IN WALLET
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-700 leading-snug mt-0.5">
                    Login for the first time to get <strong>₹500</strong> in your Wallet to place orders up to ₹500!
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-neutral-900">
                  India's last minute app
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Log in or sign up with your 10-digit mobile number
                </p>
              </div>

              {/* Mobile Input */}
              <div className="space-y-2">
                <div className="flex items-center border-2 border-neutral-200 focus-within:border-emerald-600 rounded-xl overflow-hidden transition-colors">
                  <div className="px-3 py-3 bg-neutral-50 text-xs font-bold text-neutral-700 border-r border-neutral-200 flex items-center gap-1">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit mobile number"
                    className="flex-1 px-3 py-3 text-sm font-semibold text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleSendOtp}
                  className="w-full py-3 bg-[#0C831F] hover:bg-[#0A701A] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Researcher Accounts (For 1-tap testing as requested) */}
              <div className="pt-2 border-t border-neutral-100">
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                  ⚡ Quick Test Login Accounts:
                </span>
                <div className="space-y-1.5">
                  <button
                    onClick={() => handleQuickLogin('first-time')}
                    className="w-full p-2.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-left flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                        1
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-950">
                          First-Time User (Claims ₹500 in Wallet)
                        </div>
                        <div className="text-[10px] text-emerald-700">
                          +91 99123 45678 • New Account
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                      +₹500
                    </span>
                  </button>

                  <button
                    onClick={() => handleQuickLogin('second-time')}
                    className="w-full p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-left flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold">
                        2
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          Varun Adhitya (Second Time Checkout)
                        </div>
                        <div className="text-[10px] text-neutral-600">
                          +91 98765 43210 • Balance: ₹250
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                      Screenshot Match
                    </span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            // OTP verification step
            <div className="space-y-3">
              <div>
                <h3 className="text-base font-extrabold text-neutral-900">
                  Verify OTP
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Enter 4-digit code sent to +91 {phone || '9912345678'}
                </p>
              </div>

              <div className="flex justify-center gap-2.5 py-2">
                {['4', '8', '2', '1'].map((digit, idx) => (
                  <div 
                    key={idx} 
                    className="w-12 h-12 rounded-xl border-2 border-emerald-600 bg-emerald-50 text-neutral-900 font-black text-lg flex items-center justify-center shadow-xs"
                  >
                    {digit}
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-center text-neutral-500">
                OTP auto-filled for quick research testing
              </p>

              <button
                onClick={() => handleVerifyOtp(true, 'Researcher User', phone || '9912345678')}
                className="w-full py-3 bg-[#0C831F] hover:bg-[#0A701A] text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <span>Verify & Claim ₹500 Credit</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setStep('phone')}
                className="w-full py-1 text-xs text-neutral-500 hover:text-neutral-800 font-semibold"
              >
                Edit Mobile Number
              </button>
            </div>
          )}

          {/* Privacy Note */}
          <div className="pt-2 flex items-center justify-center gap-1 text-[10px] text-neutral-400">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
            <span>Secure research login • Sandbox data isolated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
