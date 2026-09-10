import { ResearchOrderRecord, UserProfileHistory, WalletTransaction } from '../types';
import { MOCK_USER_HISTORIES } from '../data/mockData';

const STORAGE_KEYS = {
  ORDERS: 'blinkit_research_orders_v1',
  USERS: 'blinkit_research_users_v1',
  WALLET_TXS: 'blinkit_research_wallet_txs_v1',
  TELEMETRY: 'blinkit_research_telemetry_v1',
};

// Initial Seed Orders
const SEED_ORDERS: ResearchOrderRecord[] = [
  {
    orderId: 'BLK-672901',
    userId: 'usr_hsr_8821',
    userName: 'Varun Adhitya',
    userPhone: '+91 98765 43210',
    userSegment: 'Second Time Checkout',
    orderDate: '2026-09-03',
    orderTime: '19:42',
    itemsSummary: 'Daawat Basmati Rice 5kg (1x), Tata Salt 1kg (1x), Plastic Bag (1x)',
    itemCount: 3,
    subtotal: 396,
    walletDeducted: 250,
    amountPaid: 162,
    totalOrderValue: 412,
    savings: 45,
    paymentMethod: 'Google Pay UPI',
    deliveryAddress: 'message 1641, ground floor Parangi Palaya, HSR Sector 2, Bengaluru',
    instructions: 'Dont ring the bell, Return plastics',
    status: 'DELIVERED'
  },
  {
    orderId: 'BLK-551290',
    userId: 'usr_vip_9981',
    userName: 'Priya Sharma',
    userPhone: '+91 98450 11223',
    userSegment: 'VIP Power Buyer',
    orderDate: '2026-09-05',
    orderTime: '08:15',
    itemsSummary: 'Amul Gold Milk 1L (2x), Tata Moong Daal 1kg (2x)',
    itemCount: 4,
    subtotal: 870,
    walletDeducted: 0,
    amountPaid: 890,
    totalOrderValue: 890,
    savings: 110,
    paymentMethod: 'Google Pay UPI',
    deliveryAddress: 'Tower B, 4th Floor, Salarpuria Softzone, Bellandur, Bengaluru',
    instructions: 'Dont ring the bell, Leave with guard',
    status: 'DELIVERED'
  }
];

const SEED_WALLET_TXS: WalletTransaction[] = [
  {
    id: 'tx_w_101',
    userId: 'usr_new_1042',
    timestamp: '2026-09-08 19:02:12',
    date: '2026-09-08',
    time: '19:02',
    type: 'CREDIT',
    amount: 500,
    description: 'First-time Login Research Grant Credit',
    balanceAfter: 500
  },
  {
    id: 'tx_w_102',
    userId: 'usr_hsr_8821',
    timestamp: '2026-09-03 19:40:00',
    date: '2026-09-03',
    time: '19:40',
    type: 'CREDIT',
    amount: 500,
    description: 'First-time Login Research Grant Credit',
    balanceAfter: 500
  },
  {
    id: 'tx_w_103',
    userId: 'usr_hsr_8821',
    timestamp: '2026-09-03 19:42:10',
    date: '2026-09-03',
    time: '19:42',
    type: 'DEBIT',
    amount: 250,
    description: 'Redeemed on Order #BLK-672901',
    balanceAfter: 250
  }
];

export class ResearchDatabase {
  private static load<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) {
        localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
      }
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private static save<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Database write error', e);
    }
  }

  public static getOrders(): ResearchOrderRecord[] {
    return this.load<ResearchOrderRecord[]>(STORAGE_KEYS.ORDERS, SEED_ORDERS);
  }

  public static addOrder(order: ResearchOrderRecord): void {
    const orders = this.getOrders();
    orders.unshift(order);
    this.save(STORAGE_KEYS.ORDERS, orders);
  }

  public static getWalletTransactions(): WalletTransaction[] {
    return this.load<WalletTransaction[]>(STORAGE_KEYS.WALLET_TXS, SEED_WALLET_TXS);
  }

  public static addWalletTransaction(tx: WalletTransaction): void {
    const txs = this.getWalletTransactions();
    txs.unshift(tx);
    this.save(STORAGE_KEYS.WALLET_TXS, txs);
  }

  public static getUsers(): Record<string, UserProfileHistory> {
    return this.load<Record<string, UserProfileHistory>>(STORAGE_KEYS.USERS, MOCK_USER_HISTORIES);
  }

  public static updateUser(userId: string, updated: Partial<UserProfileHistory>): void {
    const users = this.getUsers();
    for (const key in users) {
      if (users[key].userId === userId) {
        users[key] = { ...users[key], ...updated };
        break;
      }
    }
    this.save(STORAGE_KEYS.USERS, users);
  }

  public static saveUser(user: UserProfileHistory): void {
    const users = this.getUsers();
    users[user.userId] = user;
    this.save(STORAGE_KEYS.USERS, users);
  }

  public static saveOrder(order: ResearchOrderRecord): void {
    this.addOrder(order);
  }

  public static deductWallet(userId: string, amount: number, description: string): boolean {
    const users = this.getUsers();
    let targetKey: string | null = null;
    for (const key in users) {
      if (users[key].userId === userId) {
        targetKey = key;
        break;
      }
    }
    if (!targetKey) return false;
    const currentBalance = users[targetKey].walletBalance || 0;
    const newBalance = Math.max(0, currentBalance - amount);
    users[targetKey].walletBalance = newBalance;
    this.save(STORAGE_KEYS.USERS, users);

    const now = new Date();
    this.addWalletTransaction({
      id: `tx_w_${Date.now()}`,
      userId,
      timestamp: now.toISOString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      type: 'DEBIT',
      amount,
      description,
      balanceAfter: newBalance
    });
    return true;
  }

  public static creditWallet(userId: string, amount: number, description: string): boolean {
    const users = this.getUsers();
    let targetKey: string | null = null;
    for (const key in users) {
      if (users[key].userId === userId) {
        targetKey = key;
        break;
      }
    }
    if (!targetKey) return false;
    const currentBalance = users[targetKey].walletBalance || 0;
    const newBalance = currentBalance + amount;
    users[targetKey].walletBalance = newBalance;
    this.save(STORAGE_KEYS.USERS, users);

    const now = new Date();
    this.addWalletTransaction({
      id: `tx_w_${Date.now()}`,
      userId,
      timestamp: now.toISOString(),
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString(),
      type: 'CREDIT',
      amount,
      description,
      balanceAfter: newBalance
    });
    return true;
  }

  // Analytics Computation
  public static getAnalytics() {
    const orders = this.getOrders();
    const txs = this.getWalletTransactions();
    const users = this.getUsers();

    const totalOrders = orders.length;
    const gmv = orders.reduce((sum, o) => sum + o.totalOrderValue, 0);
    const totalSavingsGiven = orders.reduce((sum, o) => sum + o.savings, 0);
    const totalWalletRedeemed = orders.reduce((sum, o) => sum + (o.walletDeducted || 0), 0);
    const totalWalletCreditsIssued = txs
      .filter((t) => t.type === 'CREDIT')
      .reduce((sum, t) => sum + t.amount, 0);
    const avgOrderValue = totalOrders > 0 ? Math.round(gmv / totalOrders) : 0;

    return {
      totalOrders,
      gmv,
      totalSavingsGiven,
      totalWalletCreditsIssued,
      totalWalletRedeemed,
      avgOrderValue,
      registeredUsersCount: Object.keys(users).length,
      walletRemainingInSystem: totalWalletCreditsIssued - totalWalletRedeemed
    };
  }

  // Google Sheets Export Utilities
  public static exportToGoogleSheetsCSV(type: 'orders' | 'users' | 'wallet_transactions'): void {
    let headers: string[] = [];
    let rows: (string | number)[][] = [];
    let filename = `blinkit_research_${type}_gsheets.csv`;

    if (type === 'orders') {
      const orders = this.getOrders();
      headers = [
        'Order ID',
        'User ID',
        'Customer Name',
        'Phone',
        'User Segment',
        'Date',
        'Time',
        'Item Count',
        'Items Summary',
        'Subtotal (Rs)',
        'Wallet Deducted (Rs)',
        'Cash/UPI Paid (Rs)',
        'Total Order Value (Rs)',
        'Savings (Rs)',
        'Payment Method',
        'Delivery Address',
        'Instructions',
        'Status'
      ];
      rows = orders.map((o) => [
        o.orderId,
        o.userId,
        o.userName,
        o.userPhone,
        o.userSegment,
        o.orderDate,
        o.orderTime,
        o.itemCount,
        `"${o.itemsSummary.replace(/"/g, '""')}"`,
        o.subtotal,
        o.walletDeducted,
        o.amountPaid,
        o.totalOrderValue,
        o.savings,
        o.paymentMethod,
        `"${o.deliveryAddress.replace(/"/g, '""')}"`,
        `"${o.instructions.replace(/"/g, '""')}"`,
        o.status
      ]);
    } else if (type === 'wallet_transactions') {
      const txs = this.getWalletTransactions();
      headers = [
        'Tx ID',
        'User ID',
        'Date',
        'Time',
        'Type (CREDIT/DEBIT)',
        'Amount (Rs)',
        'Description',
        'Balance After (Rs)'
      ];
      rows = txs.map((t) => [
        t.id,
        t.userId,
        t.date,
        t.time,
        t.type,
        t.amount,
        `"${t.description.replace(/"/g, '""')}"`,
        t.balanceAfter
      ]);
    } else if (type === 'users') {
      const usersObj = this.getUsers();
      headers = [
        'User ID',
        'Name',
        'Phone',
        'Email',
        'Account Age (Days)',
        'Segment',
        'Wallet Balance (Rs)',
        'First-Time Grant Claimed',
        'Total Orders',
        'Total Spend (Rs)',
        'Total Savings (Rs)',
        'Average Order Value (Rs)',
        'Preferred Payment'
      ];
      rows = Object.values(usersObj).map((u) => [
        u.userId,
        u.name,
        u.phone,
        u.email,
        u.accountAgeDays,
        u.userSegment,
        u.walletBalance,
        u.walletCreditsClaimed ? 'YES' : 'NO',
        u.totalLifetimeOrders,
        u.totalLifetimeSpend,
        u.totalLifetimeSavings,
        u.averageOrderValue,
        u.preferredPaymentMethod
      ]);
    }

    const csvContent =
      '\uFEFF' +
      headers.join(',') +
      '\n' +
      rows.map((r) => r.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public static async copyToClipboardForGSheets(type: 'orders' | 'users' | 'wallet_transactions'): Promise<boolean> {
    let tsv = '';
    try {
      if (type === 'orders') {
        const orders = this.getOrders();
        tsv = [
          ['Order ID', 'Customer Name', 'Phone', 'Date', 'Time', 'Items', 'Wallet Used', 'Paid', 'Total (Rs)', 'Status'].join('\t'),
          ...orders.map((o) =>
            [
              o.orderId,
              o.userName,
              o.userPhone,
              o.orderDate,
              o.orderTime,
              o.itemsSummary,
              o.walletDeducted,
              o.amountPaid,
              o.totalOrderValue,
              o.status
            ].join('\t')
          )
        ].join('\n');
      } else if (type === 'wallet_transactions') {
        const txs = this.getWalletTransactions();
        tsv = [
          ['Tx ID', 'User ID', 'Date', 'Type', 'Amount (Rs)', 'Description', 'Balance After'].join('\t'),
          ...txs.map((t) => [t.id, t.userId, t.date, t.type, t.amount, t.description, t.balanceAfter].join('\t'))
        ].join('\n');
      } else {
        const usersObj = this.getUsers();
        tsv = [
          ['User ID', 'Name', 'Phone', 'Segment', 'Wallet Balance (Rs)', 'Total Orders', 'Total Spend (Rs)'].join('\t'),
          ...Object.values(usersObj).map((u) => [u.userId, u.name, u.phone, u.userSegment, u.walletBalance, u.totalLifetimeOrders, u.totalLifetimeSpend].join('\t'))
        ].join('\n');
      }

      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(tsv);
        return true;
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = tsv;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        return successful;
      } catch {
        return false;
      }
    }
  }
}
