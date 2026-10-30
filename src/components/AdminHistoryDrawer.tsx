import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Clock, 
  ShoppingBag, 
  TrendingUp, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  Repeat, 
  Activity, 
  ChevronRight,
  Award,
  Sparkles,
  Info,
  Download,
  FileSpreadsheet,
  Copy,
  Table,
  BarChart3,
  Wallet,
  Check
} from 'lucide-react';
import { UserProfileHistory, ResearchOrderRecord, WalletTransaction } from '../types';
import { ResearchDatabase } from '../services/database';

interface AdminHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserHistory: UserProfileHistory;
  onSelectUserSegment: (segmentKey: string) => void;
  currentSegmentKey: string;
  cartTotal: number;
}

export const AdminHistoryDrawer: React.FC<AdminHistoryDrawerProps> = ({
  isOpen,
  onClose,
  currentUserHistory,
  onSelectUserSegment,
  currentSegmentKey,
  cartTotal
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'database' | 'analytics' | 'orders' | 'telemetry'>('database');
  const [dbTable, setDbTable] = useState<'orders' | 'users' | 'wallet_transactions'>('orders');
  const [copiedState, setCopiedState] = useState<boolean>(false);
  const [orders, setOrders] = useState<ResearchOrderRecord[]>([]);
  const [walletTxs, setWalletTxs] = useState<WalletTransaction[]>([]);
  const [analytics, setAnalytics] = useState(ResearchDatabase.getAnalytics());

  useEffect(() => {
    if (isOpen) {
      setOrders(ResearchDatabase.getOrders());
      setWalletTxs(ResearchDatabase.getWalletTransactions());
      setAnalytics(ResearchDatabase.getAnalytics());
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const handleExportCSV = (table: 'orders' | 'users' | 'wallet_transactions') => {
    ResearchDatabase.exportToGoogleSheetsCSV(table);
  };

  const handleCopyTSV = async (table: 'orders' | 'users' | 'wallet_transactions') => {
    const success = await ResearchDatabase.copyToClipboardForGSheets(table);
    if (success) {
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        id="admin-history-drawer"
        className="w-full max-w-md max-h-[92vh] bg-white rounded-t-3xl shadow-2xl flex flex-col overflow-hidden text-neutral-900 border-t border-neutral-200"
      >
        {/* Header */}
        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-bold flex items-center justify-center text-xs shadow-sm">
              ADM
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm tracking-tight text-white">Admin Intelligence & Database</h3>
                <span className="bg-emerald-400/20 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-medium">
                  G-Sheets Ready
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">Research Tracking • ₹500 Grants • Export Suite</p>
            </div>
          </div>
          <button 
            id="btn-close-admin-drawer"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Segment Switcher for Testing/Demo */}
        <div className="px-4 py-2 bg-neutral-100 border-b border-neutral-200 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">Simulate Segment:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectUserSegment('first-time')}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                currentSegmentKey === 'first-time'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              1st Time (₹500)
            </button>
            <button
              onClick={() => onSelectUserSegment('second-time')}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1 ${
                currentSegmentKey === 'second-time'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              <span>2nd Time</span>
            </button>
            <button
              onClick={() => onSelectUserSegment('vip-shopper')}
              className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                currentSegmentKey === 'vip-shopper'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-300'
              }`}
            >
              VIP Power
            </button>
          </div>
        </div>

        {/* User Profile Quick Banner */}
        <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-amber-400/30 border border-amber-300 flex items-center justify-center text-amber-900 font-bold text-xs">
              {currentUserHistory.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-neutral-900">{currentUserHistory.name}</span>
                <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold border border-amber-300">
                  {currentUserHistory.userSegment}
                </span>
              </div>
              <p className="text-[10px] text-neutral-600 font-mono">
                {currentUserHistory.phone} • Wallet: <strong className="text-emerald-700">₹{currentUserHistory.walletBalance}</strong>
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-neutral-500">Active Cart</div>
            <div className="font-bold text-sm text-emerald-700">₹{cartTotal}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 bg-white px-2">
          <button
            onClick={() => setActiveTab('database')}
            className={`flex-1 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'database'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>G-Sheets DB</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'analytics'
                ? 'border-emerald-600 text-emerald-700 font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            User Metrics
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 text-xs font-semibold border-b-2 transition-colors flex items-center justify-center gap-1 ${
              activeTab === 'orders'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            <span>Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex-1 py-2 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'telemetry'
                ? 'border-neutral-900 text-neutral-900'
                : 'border-transparent text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Live Logs
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* DATABASE & G-SHEETS TAB */}
          {activeTab === 'database' && (
            <div className="space-y-3.5">
              {/* Export to Google Sheets Banner */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-neutral-900 text-xs">
                        Export Database to Google Sheets
                      </div>
                      <div className="text-[10px] text-emerald-800">
                        Compatible with Google Sheets & Excel
                      </div>
                    </div>
                  </div>
                  {copiedState && (
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-full animate-in fade-in">
                      Copied to Clipboard!
                    </span>
                  )}
                </div>

                {/* Export Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => handleExportCSV(dbTable)}
                    className="py-2 px-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV for G-Sheets</span>
                  </button>

                  <button
                    onClick={() => handleCopyTSV(dbTable)}
                    className="py-2 px-2.5 bg-white hover:bg-neutral-50 text-neutral-800 border border-emerald-300 font-bold text-[11px] rounded-xl flex items-center justify-center gap-1.5 shadow-2xs transition-all"
                  >
                    {copiedState ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedState ? 'Copied!' : 'Copy for G-Sheets Paste'}</span>
                  </button>
                </div>

                <p className="text-[10px] text-emerald-800 leading-tight">
                  💡 <strong>How to use in Google Sheets:</strong> Click "Copy for G-Sheets Paste", open any Google Sheet, and press <kbd className="bg-white px-1 py-0.5 rounded border border-emerald-300 font-mono text-[9px]">Ctrl+V</kbd>! Or download the CSV and click <em>File &gt; Import</em>.
                </p>
              </div>

              {/* Database Table Switcher */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
                  <button
                    onClick={() => setDbTable('orders')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      dbTable === 'orders' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                    }`}
                  >
                    Orders ({orders.length})
                  </button>
                  <button
                    onClick={() => setDbTable('users')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      dbTable === 'users' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                    }`}
                  >
                    Users ({analytics.registeredUsersCount})
                  </button>
                  <button
                    onClick={() => setDbTable('wallet_transactions')}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      dbTable === 'wallet_transactions' ? 'bg-white text-neutral-900 shadow-2xs' : 'text-neutral-600'
                    }`}
                  >
                    Wallet Ledger ({walletTxs.length})
                  </button>
                </div>
              </div>

              {/* Live Table Render */}
              <div className="border border-neutral-200 rounded-xl overflow-hidden shadow-2xs bg-white">
                <div className="overflow-x-auto max-h-60">
                  {dbTable === 'orders' && (
                    <table className="w-full text-left text-[11px] whitespace-nowrap">
                      <thead className="bg-neutral-100 text-neutral-700 font-bold border-b border-neutral-200">
                        <tr>
                          <th className="p-2">Order ID</th>
                          <th className="p-2">Customer</th>
                          <th className="p-2">Date</th>
                          <th className="p-2">Items</th>
                          <th className="p-2">Wallet Used</th>
                          <th className="p-2">Paid</th>
                          <th className="p-2">Total</th>
                          <th className="p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {orders.map((o) => (
                          <tr key={o.orderId} className="hover:bg-neutral-50 font-mono">
                            <td className="p-2 font-bold text-neutral-900">{o.orderId}</td>
                            <td className="p-2 font-sans font-medium text-neutral-800">{o.userName}</td>
                            <td className="p-2 text-neutral-500">{o.orderDate}</td>
                            <td className="p-2 font-sans text-neutral-600 max-w-[120px] truncate" title={o.itemsSummary}>
                              {o.itemsSummary}
                            </td>
                            <td className="p-2 text-emerald-700 font-bold">₹{o.walletDeducted || 0}</td>
                            <td className="p-2 text-neutral-800 font-semibold">₹{o.amountPaid}</td>
                            <td className="p-2 text-neutral-900 font-bold">₹{o.totalOrderValue}</td>
                            <td className="p-2">
                              <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold font-sans">
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {dbTable === 'wallet_transactions' && (
                    <table className="w-full text-left text-[11px] whitespace-nowrap">
                      <thead className="bg-neutral-100 text-neutral-700 font-bold border-b border-neutral-200">
                        <tr>
                          <th className="p-2">Tx ID</th>
                          <th className="p-2">Date/Time</th>
                          <th className="p-2">Type</th>
                          <th className="p-2">Amount</th>
                          <th className="p-2">Description</th>
                          <th className="p-2">Balance After</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {walletTxs.map((t) => (
                          <tr key={t.id} className="hover:bg-neutral-50 font-mono">
                            <td className="p-2 font-bold text-neutral-900">{t.id}</td>
                            <td className="p-2 text-neutral-500">{t.date} {t.time}</td>
                            <td className="p-2">
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-sans ${
                                t.type === 'CREDIT' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {t.type}
                              </span>
                            </td>
                            <td className="p-2 font-bold text-neutral-900">
                              {t.type === 'CREDIT' ? '+' : '-'}₹{t.amount}
                            </td>
                            <td className="p-2 font-sans text-neutral-600">{t.description}</td>
                            <td className="p-2 text-emerald-700 font-bold">₹{t.balanceAfter}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}

                  {dbTable === 'users' && (
                    <table className="w-full text-left text-[11px] whitespace-nowrap">
                      <thead className="bg-neutral-100 text-neutral-700 font-bold border-b border-neutral-200">
                        <tr>
                          <th className="p-2">User ID</th>
                          <th className="p-2">Name</th>
                          <th className="p-2">Phone</th>
                          <th className="p-2">Segment</th>
                          <th className="p-2">Wallet</th>
                          <th className="p-2">Total Orders</th>
                          <th className="p-2">Spend</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {Object.values(ResearchDatabase.getUsers()).map((u) => (
                          <tr key={u.userId} className="hover:bg-neutral-50 font-mono">
                            <td className="p-2 font-bold text-neutral-900">{u.userId}</td>
                            <td className="p-2 font-sans font-medium text-neutral-800">{u.name}</td>
                            <td className="p-2 text-neutral-600">{u.phone}</td>
                            <td className="p-2 font-sans">
                              <span className="text-[9px] bg-neutral-100 text-neutral-800 px-1.5 py-0.5 rounded font-semibold">
                                {u.userSegment}
                              </span>
                            </td>
                            <td className="p-2 text-emerald-700 font-bold">₹{u.walletBalance}</td>
                            <td className="p-2 text-neutral-700 font-bold">{u.totalLifetimeOrders}</td>
                            <td className="p-2 text-neutral-900 font-bold">₹{u.totalLifetimeSpend}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab === 'analytics' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    Total Research GMV
                  </div>
                  <div className="text-xl font-black text-emerald-950 mt-1">
                    ₹{analytics.gmv}
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">
                    From {analytics.totalOrders} recorded orders
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                    Wallet Grants Issued
                  </div>
                  <div className="text-xl font-black text-amber-950 mt-1">
                    ₹{analytics.totalWalletCreditsIssued}
                  </div>
                  <div className="text-[10px] text-amber-700 mt-0.5">
                    ₹500 per new researcher
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                    Wallet Credits Redeemed
                  </div>
                  <div className="text-xl font-black text-blue-950 mt-1">
                    ₹{analytics.totalWalletRedeemed}
                  </div>
                  <div className="text-[10px] text-blue-700 mt-0.5">
                    ₹{analytics.walletRemainingInSystem} unredeemed balance
                  </div>
                </div>

                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                  <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">
                    Average Order Value
                  </div>
                  <div className="text-xl font-black text-purple-950 mt-1">
                    ₹{analytics.avgOrderValue}
                  </div>
                  <div className="text-[10px] text-purple-700 mt-0.5">
                    Per research checkout
                  </div>
                </div>
              </div>

              {/* Indian Grocery Category Breakdown */}
              <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2">
                <div className="font-bold text-xs text-neutral-900">
                  Popular Indian Household Categories
                </div>
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[10px] font-medium text-neutral-700 mb-0.5">
                      <span>Atta, Rice, Oil & Dals (Daawat, Tata Sampann)</span>
                      <span>42% of volume</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#2E647D] h-full rounded-full w-[42%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-medium text-neutral-700 mb-0.5">
                      <span>Masalas & Spices (Everest, Catch, Haldi)</span>
                      <span>24% of volume</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full w-[24%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-medium text-neutral-700 mb-0.5">
                      <span>Dairy & Bread (Amul Milk & Butter)</span>
                      <span>18% of volume</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full w-[18%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] font-medium text-neutral-700 mb-0.5">
                      <span>Pooja Needs & Agarbatti (Cycle Pure, Camphor)</span>
                      <span>16% of volume</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full w-[16%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-3">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                    <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[11px] font-medium">Completed Orders</span>
                  </div>
                  <div className="text-lg font-bold text-neutral-900">
                    {currentUserHistory.totalLifetimeOrders}
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    {currentUserHistory.totalLifetimeOrders === 1 
                      ? '1st order completed 6 days ago' 
                      : `${currentUserHistory.totalLifetimeOrders} orders in history`}
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-medium">Lifetime Spend</span>
                  </div>
                  <div className="text-lg font-bold text-neutral-900">
                    ₹{currentUserHistory.totalLifetimeSpend}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    Saved ₹{currentUserHistory.totalLifetimeSavings} overall
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                    <Wallet className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] font-medium">Research Wallet</span>
                  </div>
                  <div className="text-lg font-bold text-emerald-700">
                    ₹{currentUserHistory.walletBalance}
                  </div>
                  <div className="text-[10px] text-neutral-500">Available research balance</div>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <div className="flex items-center gap-1.5 text-neutral-500 mb-1">
                    <CreditCard className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-[11px] font-medium">Default Payment</span>
                  </div>
                  <div className="text-xs font-bold text-neutral-900 truncate">
                    {currentUserHistory.preferredPaymentMethod}
                  </div>
                  <div className="text-[10px] text-neutral-500">Pre-selected at checkout</div>
                </div>
              </div>

              {/* Delivery Preferences Stored */}
              <div className="p-3 border border-neutral-200 rounded-xl space-y-2">
                <div className="font-semibold text-neutral-800 text-xs flex items-center justify-between">
                  <span>Retained User Preferences</span>
                  <span className="text-[10px] text-emerald-600 font-mono">Active</span>
                </div>
                <div className="space-y-1.5 text-[11px] text-neutral-600">
                  <div className="flex items-center justify-between">
                    <span>Default Address:</span>
                    <span className="font-medium text-neutral-900">Parangi Palaya, Ground Floor</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Instructions Preset:</span>
                    <span className="font-medium text-neutral-900">"Dont ring the bell" + Return plastics</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Plastic bags recycled:</span>
                    <span className="font-bold text-emerald-700">{currentUserHistory.plasticsRecycledTotal} returned</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-8 text-neutral-400">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p className="font-medium">No previous orders yet</p>
                  <p className="text-[11px] text-neutral-500">New researchers can place orders up to ₹500.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.orderId} className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-neutral-900">{order.orderId}</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded">
                          {order.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-500">{order.orderDate} • {order.orderTime}</span>
                    </div>

                    <div className="text-[11px] text-neutral-700 bg-white p-2 rounded border border-neutral-200">
                      <div className="font-semibold text-neutral-900 mb-0.5">Customer: {order.userName} ({order.userPhone})</div>
                      <div>{order.itemsSummary}</div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-semibold">Wallet Used: ₹{order.walletDeducted || 0}</span>
                      <span className="font-bold text-neutral-900 text-xs">Total Value: ₹{order.totalOrderValue}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="space-y-2">
              <div className="font-bold text-neutral-800 text-xs flex items-center justify-between">
                <span>Real-Time Event Stream</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
                  Streaming
                </span>
              </div>
              <div className="space-y-1.5 font-mono text-[10px]">
                {currentUserHistory.telemetryLogs.map((log, idx) => (
                  <div key={idx} className="p-2 bg-neutral-50 border border-neutral-200 rounded flex items-start gap-2">
                    <span className="text-neutral-400 shrink-0">{log.timestamp}</span>
                    <div>
                      <span className="font-bold text-neutral-800">{log.action}: </span>
                      <span className="text-neutral-600">{log.details}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-600">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Research Database Active & Synced</span>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
