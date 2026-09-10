import { Product, DeliveryAddress, UserProfileHistory } from '../types';
import { ALL_CATEGORY_PRODUCTS } from './categories';

export const INITIAL_PRODUCTS: Product[] = ALL_CATEGORY_PRODUCTS;

export interface CategoryItem {
  id: string;
  name: string;
  categoryName: string;
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', name: 'All', categoryName: 'All' },
  { id: 'atta-rice-dal', name: 'Atta, Rice & Dal', categoryName: 'Atta, Rice & Dal' },
  { id: 'oil-ghee-masala', name: 'Oil, Ghee & Masala', categoryName: 'Oil, Ghee & Masala' },
  { id: 'dairy-bread-eggs', name: 'Dairy, Bread & Eggs', categoryName: 'Dairy, Bread & Eggs' },
  { id: 'vegetables-fruits', name: 'Vegetables & Fruits', categoryName: 'Vegetables & Fruits' },
  { id: 'chicken-meat-fish', name: 'Chicken, Meat & Fish', categoryName: 'Chicken, Meat & Fish' },
  { id: 'sauces-spreads', name: 'Sauces & Spreads', categoryName: 'Sauces & Spreads' },
  { id: 'chips-namkeen', name: 'Chips & Namkeen', categoryName: 'Chips & Namkeen' },
  { id: 'sweets-chocolates', name: 'Sweets & Chocolates', categoryName: 'Sweets & Chocolates' },
  { id: 'instant-food', name: 'Instant Food', categoryName: 'Instant Food' },
  { id: 'tea-coffee', name: 'Tea & Coffee', categoryName: 'Tea, Coffee & Milk Drinks' },
  { id: 'drinks-juices', name: 'Drinks & Juices', categoryName: 'Drinks & Juices' },
  { id: 'bakery-biscuits', name: 'Bakery & Biscuits', categoryName: 'Bakery & Biscuits' },
  { id: 'bath-body', name: 'Bath & Body', categoryName: 'Bath & Body' },
  { id: 'beauty-cosmetics', name: 'Beauty & Cosmetics', categoryName: 'Beauty & Cosmetics' },
  { id: 'skin-face', name: 'Skin & Face', categoryName: 'Skin & Face' },
  { id: 'health-pharma', name: 'Health & Pharma', categoryName: 'Health & Pharma' },
  { id: 'baby-care', name: 'Baby Care', categoryName: 'Baby Care' },
  { id: 'paan-corner', name: 'Paan Corner', categoryName: 'Paan Corner' },
  { id: 'cleaners-repellents', name: 'Cleaners & Repellents', categoryName: 'Cleaners & Repellents' },
  { id: 'kitchenware', name: 'Kitchenware', categoryName: 'Kitchenware & Appliances' },
  { id: 'home-lifestyle', name: 'Home & Lifestyle', categoryName: 'Home & Lifestyle' },
  { id: 'stationery-games', name: 'Stationery & Games', categoryName: 'Stationery & Games' },
  { id: 'dryfruits-cereals', name: 'Dry Fruits & Cereals', categoryName: 'Dry Fruits & Cereals' },
  { id: 'rakhi-gifts', name: 'Rakhi Gifts', categoryName: 'Rakhi Gifts' }
];

export const SAVED_ADDRESSES: DeliveryAddress[] = [
  {
    id: 'addr-1',
    type: 'Home',
    label: 'Home',
    fullAddress: 'message 1641, ground floor Parangi Palaya, 24th Main, Sector 2, HSR Layout',
    landmark: 'Opposite Nilgiris Supermarket',
    pincode: '560102',
    isDefault: true
  },
  {
    id: 'addr-2',
    type: 'Work',
    label: 'Office - Tech Park',
    fullAddress: 'Tower B, 4th Floor, Salarpuria Softzone, Bellandur Outer Ring Road',
    landmark: 'Near Central Mall',
    pincode: '560103',
    isDefault: false
  }
];

export const MOCK_USER_HISTORIES: Record<string, UserProfileHistory> = {
  'second-time': {
    userId: 'usr_hsr_8821',
    name: 'Varun Adhitya',
    phone: '+91 98765 43210',
    email: 'varunadhitya9@gmail.com',
    accountAgeDays: 14,
    userSegment: 'Second Time Checkout',
    walletBalance: 250,
    walletCreditsClaimed: true,
    totalLifetimeOrders: 1,
    totalLifetimeSpend: 412,
    totalLifetimeSavings: 45,
    averageOrderValue: 412,
    reorderIntervalDays: 6.5,
    preferredPaymentMethod: 'Google Pay UPI',
    preferredDeliveryTime: 'Evening (7:00 PM - 9:00 PM)',
    plasticsRecycledTotal: 1,
    pastOrders: [
      {
        id: 'ord-1001',
        orderNumber: 'BLK-672901',
        date: '3 Sep 2026',
        time: '19:42',
        status: 'DELIVERED',
        totalAmount: 412,
        savings: 45,
        deliveryTimeMinutes: 9,
        deliveryPartnerName: 'Ramesh Kumar (4.9 ★)',
        paymentMethod: 'Google Pay UPI',
        address: 'message 1641, ground floor Parangi Palaya, 2...',
        plasticsReturnedCount: 1,
        deliveryInstructionUsed: 'Dont ring the bell',
        items: [
          {
            name: 'Daawat Rozana Super Basmati Rice',
            quantity: 1,
            price: 368,
            weight: '5 Kg',
            image: '/products/daawat_basmati.jpg'
          },
          {
            name: 'Tata Salt Vacuum Evaporated',
            quantity: 1,
            price: 28,
            weight: '1 Kg',
            image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400&auto=format&fit=crop&q=80'
          },
          {
            name: 'Plastic collection bag',
            quantity: 1,
            price: 0,
            weight: 'Returnable',
            image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?w=400&auto=format&fit=crop&q=80'
          }
        ]
      }
    ],
    telemetryLogs: [
      { timestamp: '19:00:15', action: 'SESSION_START', details: 'User opened app via mobile notification' },
      { timestamp: '19:00:22', action: 'CART_RESUME', details: 'Resumed cart: Daawat Basmati Rice (5kg) & Moong Daal' },
      { timestamp: '19:00:28', action: 'ECO_PERK_VIEW', details: 'Return dry plastics banner viewed' },
      { timestamp: '19:00:35', action: 'INSTRUCTION_SELECT', details: 'Toggled: Return plastics & Record instruction' },
      { timestamp: '19:00:41', action: 'CHECKOUT_STAGE', details: 'Entered Checkout - Second Time Checkout funnel' },
      { timestamp: '19:00:48', action: 'PAYMENT_DEFAULT', details: 'Defaulted to Google Pay UPI (preferred from Order #1)' }
    ]
  },
  'first-time': {
    userId: 'usr_new_1042',
    name: 'New Researcher',
    phone: '+91 99123 45678',
    email: 'researcher@example.com',
    accountAgeDays: 1,
    userSegment: 'First Time User',
    walletBalance: 500,
    walletCreditsClaimed: true,
    totalLifetimeOrders: 0,
    totalLifetimeSpend: 0,
    totalLifetimeSavings: 0,
    averageOrderValue: 0,
    reorderIntervalDays: 0,
    preferredPaymentMethod: 'Blinkit Research Wallet (₹500)',
    preferredDeliveryTime: 'Afternoon',
    plasticsRecycledTotal: 0,
    pastOrders: [],
    telemetryLogs: [
      { timestamp: '19:02:10', action: 'FIRST_LOGIN', details: 'First-time researcher login detected (+91 99123 45678)' },
      { timestamp: '19:02:12', action: 'WALLET_CREDITED', details: 'Research Grant of ₹500 credited to Blinkit Wallet' },
      { timestamp: '19:02:25', action: 'NEW_USER_OFFER', details: 'Applied: FREE DELIVERY (Saved ₹16)' }
    ]
  },
  'vip-shopper': {
    userId: 'usr_vip_9981',
    name: 'Priya Sharma',
    phone: '+91 98450 11223',
    email: 'priya.s@example.com',
    accountAgeDays: 92,
    userSegment: 'VIP Power Buyer',
    walletBalance: 120,
    walletCreditsClaimed: true,
    totalLifetimeOrders: 18,
    totalLifetimeSpend: 14250,
    totalLifetimeSavings: 1820,
    averageOrderValue: 791,
    reorderIntervalDays: 3.2,
    preferredPaymentMethod: 'Google Pay UPI',
    preferredDeliveryTime: 'Morning (8:00 AM - 10:00 AM)',
    plasticsRecycledTotal: 14,
    pastOrders: [
      {
        id: 'ord-881',
        orderNumber: 'BLK-551290',
        date: '5 Sep 2026',
        time: '08:15',
        status: 'DELIVERED',
        totalAmount: 890,
        savings: 110,
        deliveryTimeMinutes: 7,
        deliveryPartnerName: 'Santosh Y. (5.0 ★)',
        paymentMethod: 'Google Pay UPI',
        address: 'message 1641, ground floor Parangi Palaya...',
        plasticsReturnedCount: 2,
        deliveryInstructionUsed: 'Dont ring the bell, Leave with guard',
        items: [
          { name: 'Amul Gold Milk', quantity: 2, price: 68, weight: '1 L', image: '/products/amul_milk.jpg' },
          { name: 'Tata Sampann Moong Daal', quantity: 2, price: 196, weight: '1 Kg', image: '/products/moong_daal.jpg' }
        ]
      }
    ],
    telemetryLogs: [
      { timestamp: '18:55:00', action: 'HIGH_FREQUENCY_BUYER', details: '18th order in 90 days. Top 5% Dark Store customer.' }
    ]
  }
};
