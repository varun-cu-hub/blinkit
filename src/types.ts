export interface Product {
  id: string;
  name: string;
  brand: string;
  weight: string;
  price: number;
  mrp: number;
  discountPercentage?: number;
  image: string;
  category: string;
  deliveryTime: string; // e.g. "8 MINS"
  inStock: boolean;
  unit: string;
  description?: string;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryInstruction {
  returnPlastics: boolean;
  voiceNoteUrl?: string;
  voiceNoteDuration?: number;
  dontRingBell: boolean;
  avoidCalling: boolean;
  leaveAtDoor: boolean;
  leaveWithGuard: boolean;
}

export interface DeliveryAddress {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  label: string;
  fullAddress: string;
  landmark: string;
  pincode: string;
  isDefault: boolean;
}

export interface PastOrder {
  id: string;
  orderNumber: string;
  date: string;
  time: string;
  items: {
    name: string;
    quantity: number;
    price: number;
    weight: string;
    image: string;
  }[];
  totalAmount: number;
  savings: number;
  deliveryTimeMinutes: number;
  deliveryPartnerName: string;
  status: 'DELIVERED' | 'CANCELLED' | 'IN_TRANSIT';
  paymentMethod: string;
  address: string;
  plasticsReturnedCount?: number;
  deliveryInstructionUsed?: string;
}

export interface UserProfileHistory {
  userId: string;
  name: string;
  phone: string;
  email: string;
  accountAgeDays: number;
  userSegment: 'First Time User' | 'Second Time Checkout' | 'Frequent Shopper' | 'VIP Power Buyer';
  walletBalance: number;
  walletCreditsClaimed: boolean;
  totalLifetimeOrders: number;
  totalLifetimeSpend: number;
  totalLifetimeSavings: number;
  averageOrderValue: number;
  reorderIntervalDays: number;
  preferredPaymentMethod: string;
  preferredDeliveryTime: string;
  plasticsRecycledTotal: number;
  pastOrders: PastOrder[];
  telemetryLogs: {
    timestamp: string;
    action: string;
    details: string;
  }[];
}

export interface WalletTransaction {
  id: string;
  userId: string;
  timestamp: string;
  date: string;
  time: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  description: string;
  balanceAfter: number;
}

export interface ResearchOrderRecord {
  orderId: string;
  userId: string;
  userName: string;
  userPhone: string;
  userSegment: string;
  orderDate: string;
  orderTime: string;
  itemsSummary: string;
  itemCount: number;
  subtotal: number;
  walletDeducted: number;
  amountPaid: number;
  totalOrderValue: number;
  savings: number;
  paymentMethod: string;
  deliveryAddress: string;
  instructions: string;
  status: string;
}

export type DeviceType = 'android' | 'ios' | 'responsive';

