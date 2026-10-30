import { Product, DeliveryAddress, UserProfileHistory } from '../types';
/** A concise catalogue in which every listing has its own verified local image. */
const LEGACY_PRODUCT_CATALOG: Product[] = [
  { id: 'prod-atta-aashirvaad-5kg', name: 'Aashirvaad Shudh Chakki Atta', brand: 'Aashirvaad', weight: '5 Kg', price: 255, mrp: 290, discountPercentage: 12, image: '/products/aashirvaad_atta.jpg', category: 'Atta, Rice & Dal', deliveryTime: '8 MINS', inStock: true, unit: 'pack', tag: 'Bestseller' },
  { id: 'prod-rice-daawat-5kg', name: 'Daawat Rozana Basmati Rice', brand: 'Daawat', weight: '5 Kg', price: 368, mrp: 440, discountPercentage: 16, image: '/products/daawat_basmati.jpg', category: 'Atta, Rice & Dal', deliveryTime: '8 MINS', inStock: true, unit: 'pack', tag: 'Popular' },
  { id: 'prod-dal-tata-moong-500g', name: 'Tata Sampann Moong Daal', brand: 'Tata Sampann', weight: '500 g', price: 98, mrp: 115, discountPercentage: 15, image: '/products/moong_daal.jpg', category: 'Atta, Rice & Dal', deliveryTime: '9 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-oil-fortune-sunflower-1l', name: 'Fortune Sunflower Oil', brand: 'Fortune', weight: '1 L', price: 145, mrp: 170, discountPercentage: 15, image: '/products/fortune_oil.jpg', category: 'Oil, Ghee & Masala', deliveryTime: '7 MINS', inStock: true, unit: 'bottle', tag: 'Staple' },
  { id: 'prod-spice-everest-chilli-100g', name: 'Everest Kashmiri Red Chilli Powder', brand: 'Everest', weight: '100 g', price: 48, mrp: 56, discountPercentage: 14, image: '/products/everest_chilli.jpg', category: 'Oil, Ghee & Masala', deliveryTime: '7 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-spice-catch-turmeric-200g', name: 'Catch Turmeric Powder', brand: 'Catch', weight: '200 g', price: 58, mrp: 68, discountPercentage: 15, image: '/products/catch_turmeric.jpg', category: 'Oil, Ghee & Masala', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-paste-dabur-ginger-garlic-200g', name: 'Dabur Ginger Garlic Paste', brand: 'Dabur', weight: '200 g', price: 50, mrp: 60, discountPercentage: 17, image: '/products/dabur_ginger_garlic.jpg', category: 'Oil, Ghee & Masala', deliveryTime: '7 MINS', inStock: true, unit: 'jar' },
  { id: 'prod-milk-amul-gold-1l', name: 'Amul Gold Full Cream Milk', brand: 'Amul', weight: '1 L', price: 68, mrp: 70, image: '/products/amul_milk.jpg', category: 'Dairy, Bread & Eggs', deliveryTime: '8 MINS', inStock: true, unit: 'pack', tag: 'Daily Essential' },
  { id: 'prod-butter-amul-100g', name: 'Amul Pasteurised Butter', brand: 'Amul', weight: '100 g', price: 58, mrp: 62, discountPercentage: 6, image: '/products/amul_butter.jpg', category: 'Dairy, Bread & Eggs', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-onion-fresh-1kg', name: 'Fresh Red Onions', brand: 'Farm Fresh', weight: '1 Kg', price: 35, mrp: 45, discountPercentage: 22, image: '/products/fresh_onions.jpg', category: 'Vegetables & Fruits', deliveryTime: '7 MINS', inStock: true, unit: 'pack', tag: 'Fresh Today' },
  { id: 'prod-coriander-fresh-100g', name: 'Fresh Coriander', brand: 'Farm Fresh', weight: '100 g', price: 15, mrp: 20, discountPercentage: 25, image: '/products/fresh_coriander.jpg', category: 'Vegetables & Fruits', deliveryTime: '9 MINS', inStock: true, unit: 'bunch' },
  { id: 'prod-chips-lays-magic-90g', name: "Lay's India's Magic Masala", brand: "Lay's", weight: '90 g', price: 40, mrp: 40, image: '/products/lays_chips.jpg', category: 'Chips & Namkeen', deliveryTime: '8 MINS', inStock: true, unit: 'pack', tag: 'Top Snack' },
  { id: 'prod-namkeen-haldiram-bhujia-400g', name: "Haldiram's Aloo Bhujia", brand: "Haldiram's", weight: '400 g', price: 115, mrp: 125, discountPercentage: 8, image: '/products/haldirams_bhujia.jpg', category: 'Chips & Namkeen', deliveryTime: '9 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-noodles-maggi-280g', name: 'Maggi 2-Minute Masala Noodles', brand: 'Maggi', weight: '280 g', price: 60, mrp: 60, image: '/products/maggi_noodles.jpg', category: 'Instant Food', deliveryTime: '8 MINS', inStock: true, unit: 'pack', tag: 'Quick Meal' },
  { id: 'prod-cola-coca-cola-300ml', name: 'Coca-Cola Soft Drink', brand: 'Coca-Cola', weight: '300 ml', price: 40, mrp: 40, image: '/products/coca_cola.jpg', category: 'Drinks & Juices', deliveryTime: '8 MINS', inStock: true, unit: 'bottle', tag: 'Chilled' },
  { id: 'prod-biscuit-parle-g-800g', name: 'Parle-G Glucose Biscuits', brand: 'Parle', weight: '800 g', price: 90, mrp: 100, discountPercentage: 10, image: '/products/parle_g_biscuits.jpg', category: 'Bakery & Biscuits', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-eno-fruit-salt-100g', name: 'ENO Fruit Salt', brand: 'ENO', weight: '100 g Bottle', price: 145, mrp: 160, discountPercentage: 9, image: '/products/eno_fruit_salt.jpg', category: 'Health & Pharma', deliveryTime: '9 MINS', inStock: true, unit: 'bottle' },
  { id: 'prod-vim-dishwash-500ml', name: 'Vim Lemon Dishwash Gel', brand: 'Vim', weight: '500 ml', price: 105, mrp: 120, discountPercentage: 12, image: '/products/vim_dishwash.jpg', category: 'Cleaners & Repellents', deliveryTime: '10 MINS', inStock: true, unit: 'bottle' },
  { id: 'prod-surf-matic-1l', name: 'Surf Excel Matic Liquid Detergent', brand: 'Surf Excel', weight: '1 L', price: 230, mrp: 260, discountPercentage: 12, image: '/products/surf_excel_matic.jpg', category: 'Cleaners & Repellents', deliveryTime: '11 MINS', inStock: true, unit: 'bottle' },
  { id: 'prod-cycle-agarbatti-150', name: 'Cycle Pure Agarbatti', brand: 'Cycle Pure', weight: '150 sticks', price: 75, mrp: 85, discountPercentage: 12, image: '/products/cycle_agarbatti.jpg', category: 'Home & Lifestyle', deliveryTime: '10 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-mangaldeep-camphor-50g', name: 'Mangaldeep Pure Camphor', brand: 'Mangaldeep', weight: '50 g', price: 65, mrp: 75, discountPercentage: 13, image: '/products/mangaldeep_camphor.jpg', category: 'Home & Lifestyle', deliveryTime: '11 MINS', inStock: true, unit: 'pack' }
];

/**
 * The visible range deliberately uses only images that match the displayed
 * item. Brand claims are omitted unless the source image visibly confirms it.
 */
export const INITIAL_PRODUCTS: Product[] = [
  { id: 'prod-whole-wheat-1kg', name: 'Whole Wheat Grains', brand: 'Pantry Staples', weight: '1 Kg', price: 72, mrp: 80, discountPercentage: 10, image: '/products/aashirvaad_atta.jpg', category: 'Atta, Rice & Dal', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-rice-daawat-5kg', name: 'Basmati Rice', brand: 'Pantry Staples', weight: '1 Kg', price: 110, mrp: 125, discountPercentage: 12, image: '/products/daawat_basmati.jpg', category: 'Atta, Rice & Dal', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-dal-tata-moong-500g', name: 'Split Yellow Moong Daal', brand: 'Pantry Staples', weight: '500 g', price: 98, mrp: 115, discountPercentage: 15, image: '/products/moong-daal-v2.png', category: 'Atta, Rice & Dal', deliveryTime: '9 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-cooking-oil-500ml', name: 'Cold-Pressed Cooking Oil', brand: 'Pantry Staples', weight: '500 ml', price: 185, mrp: 210, discountPercentage: 12, image: '/products/fortune_oil.jpg', category: 'Oil, Ghee & Masala', deliveryTime: '7 MINS', inStock: true, unit: 'bottle' },
  { id: 'prod-whole-spices-100g', name: 'Whole Spice Selection', brand: 'Kitchen Staples', weight: '100 g', price: 75, mrp: 85, discountPercentage: 12, image: '/products/everest_chilli.jpg', category: 'Oil, Ghee & Masala', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-mixed-spice-blend-100g', name: 'Mixed Spice Blend', brand: 'Kitchen Staples', weight: '100 g', price: 65, mrp: 75, discountPercentage: 13, image: '/products/catch_turmeric.jpg', category: 'Oil, Ghee & Masala', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-paste-ginger-garlic-200g', name: 'Fresh Ginger Garlic Paste', brand: 'Kitchen Staples', weight: '200 g', price: 50, mrp: 60, discountPercentage: 17, image: '/products/ginger-garlic-paste-v2.png', category: 'Oil, Ghee & Masala', deliveryTime: '7 MINS', inStock: true, unit: 'jar' },
  { id: 'prod-fresh-whole-milk-1l', name: 'Fresh Whole Milk', brand: 'Dairy Essentials', weight: '1 L', price: 68, mrp: 72, image: '/products/amul_milk.jpg', category: 'Dairy, Bread & Eggs', deliveryTime: '8 MINS', inStock: true, unit: 'bottle' },
  { id: 'prod-salted-butter-100g', name: 'Salted Butter', brand: 'Dairy Essentials', weight: '100 g', price: 58, mrp: 65, discountPercentage: 10, image: '/products/amul_butter.jpg', category: 'Dairy, Bread & Eggs', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-onion-fresh-1kg', name: 'Fresh Red Onions', brand: 'Farm Fresh', weight: '1 Kg', price: 35, mrp: 45, discountPercentage: 22, image: '/products/fresh_onions.jpg', category: 'Vegetables & Fruits', deliveryTime: '7 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-coriander-fresh-100g', name: 'Fresh Coriander', brand: 'Farm Fresh', weight: '100 g', price: 15, mrp: 20, discountPercentage: 25, image: '/products/fresh-coriander-v2.png', category: 'Vegetables & Fruits', deliveryTime: '9 MINS', inStock: true, unit: 'bunch' },
  { id: 'prod-cheetos-baked-puffs-85g', name: 'Cheetos Baked Puffs', brand: 'Cheetos', weight: '85 g', price: 45, mrp: 50, discountPercentage: 10, image: '/products/lays_chips.jpg', category: 'Chips & Namkeen', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-potato-chips-100g', name: 'Salted Potato Chips', brand: 'Snack Pantry', weight: '100 g', price: 55, mrp: 60, image: '/products/haldirams_bhujia.jpg', category: 'Chips & Namkeen', deliveryTime: '9 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-instant-noodles-280g', name: 'Instant Masala Noodles', brand: 'Meal Essentials', weight: '280 g', price: 60, mrp: 65, discountPercentage: 8, image: '/products/maggi_noodles.jpg', category: 'Instant Food', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-cola-coca-cola-300ml', name: 'Coca-Cola Original Taste', brand: 'Coca-Cola', weight: '300 ml', price: 40, mrp: 40, image: '/products/coca_cola.jpg', category: 'Drinks & Juices', deliveryTime: '8 MINS', inStock: true, unit: 'can' },
  { id: 'prod-nabisco-glucose-biscuits-200g', name: 'Nabisco Glucose Biscuits', brand: 'Nabisco', weight: '200 g', price: 35, mrp: 40, discountPercentage: 12, image: '/products/parle_g_biscuits.jpg', category: 'Bakery & Biscuits', deliveryTime: '8 MINS', inStock: true, unit: 'pack' },
  { id: 'prod-incense-sticks-150', name: 'Colourful Incense Sticks', brand: 'Home Essentials', weight: '150 sticks', price: 75, mrp: 85, discountPercentage: 12, image: '/products/cycle_agarbatti.jpg', category: 'Home & Lifestyle', deliveryTime: '10 MINS', inStock: true, unit: 'pack' }
];

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
  { id: 'chips-namkeen', name: 'Chips & Namkeen', categoryName: 'Chips & Namkeen' },
  { id: 'instant-food', name: 'Instant Food', categoryName: 'Instant Food' },
  { id: 'drinks-juices', name: 'Drinks & Juices', categoryName: 'Drinks & Juices' },
  { id: 'bakery-biscuits', name: 'Bakery & Biscuits', categoryName: 'Bakery & Biscuits' },
  { id: 'home-lifestyle', name: 'Home & Lifestyle', categoryName: 'Home & Lifestyle' }
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
