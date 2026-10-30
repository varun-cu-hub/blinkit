import React, { useEffect, useState } from 'react';
import { 
  CartItem, 
  Product, 
  DeliveryAddress, 
  DeviceType, 
  UserProfileHistory 
} from './types';
import { 
  INITIAL_PRODUCTS, 
  SAVED_ADDRESSES, 
  MOCK_USER_HISTORIES,
  CATEGORIES 
} from './data/mockData';
import { MobileFrame } from './components/MobileFrame';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { HomeFeed } from './components/HomeFeed';
import { CheckoutScreen } from './components/CheckoutScreen';
import { CartFloatingBar } from './components/CartFloatingBar';
import { PaymentDrawer } from './components/PaymentDrawer';
import { AddressDrawer } from './components/AddressDrawer';
import { AdminHistoryDrawer } from './components/AdminHistoryDrawer';
import { OrderSuccessScreen } from './components/OrderSuccessScreen';
import { LoginModal } from './components/LoginModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { ResearchDatabase } from './services/database';

export default function App() {
  // Device layout: default to 'android' matching the user's uploaded Android screenshot
  const [deviceType, setDeviceType] = useState<DeviceType>('android');

  // Screen navigation: default to 'home' to browse catalog and test search immediately
  const [currentScreen, setCurrentScreen] = useState<'home' | 'checkout' | 'success'>('home');

  // Curated catalogue: every listing has a verified, matching local image.
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart state: Preloaded with the exact items from the user's screenshot
  const [cart, setCart] = useState<CartItem[]>(() => {
    const basmati = INITIAL_PRODUCTS.find((p) => p.id === 'prod-rice-daawat-5kg' || p.id === 'prod-daawat-basmati-5kg') || INITIAL_PRODUCTS[0];
    const moong = INITIAL_PRODUCTS.find((p) => p.id === 'prod-dal-tata-moong-500g' || p.id === 'prod-tata-moong-daal-500g') || INITIAL_PRODUCTS[1];
    return [
      { product: basmati, quantity: 1 },
      { product: moong, quantity: 1 }
    ];
  });

  // Selected delivery address (Defaults to Parangi Palaya as in screenshot)
  const [selectedAddress, setSelectedAddress] = useState<DeliveryAddress>(SAVED_ADDRESSES[0]);

  // Selected payment method (Defaults to Google Pay UPI as in screenshot)
  const [selectedPayment, setSelectedPayment] = useState<string>('Google Pay UPI');

  // User History & Admin Telemetry state
  const [currentSegmentKey, setCurrentSegmentKey] = useState<string>('second-time');
  const [userHistories, setUserHistories] = useState(MOCK_USER_HISTORIES);

  // Drawers & Modals state
  const [isPaymentDrawerOpen, setIsPaymentDrawerOpen] = useState<boolean>(false);
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState<boolean>(false);
  const [isAdminDrawerOpen, setIsAdminDrawerOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  // Last order metrics for receipt & G-Sheets sync
  const [lastOrderSummary, setLastOrderSummary] = useState<{ paid: number; walletUsed: number }>({
    paid: 412,
    walletUsed: 0
  });

  // Search & Category filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Theme color state (Classic Yellow vs Dark Amber/Orange)
  const [themeColor, setThemeColor] = useState<'classic-yellow' | 'dark-yellow'>('classic-yellow');

  useEffect(() => {
    fetch('/api/admin/session', { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((result: { authenticated?: boolean }) => setIsAdminAuthenticated(Boolean(result.authenticated)))
      .catch(() => setIsAdminAuthenticated(false));
  }, []);

  const requestAdminAccess = () => {
    if (isAdminAuthenticated) {
      setIsAdminDrawerOpen(true);
      return;
    }
    setIsAdminLoginOpen(true);
  };

  // Cart helper functions
  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === productId);
      if (!existing) {
        if (delta > 0) {
          const productToAdd = products.find((p) => p.id === productId);
          if (productToAdd) {
            logTelemetry('CART_ADD', `Added ${productToAdd.name}`);
            return [...prevCart, { product: productToAdd, quantity: 1 }];
          }
        }
        return prevCart;
      }

      const newQty = existing.quantity + delta;
      if (newQty <= 0) {
        logTelemetry('CART_REMOVE', `Removed ${existing.product.name}`);
        return prevCart.filter((item) => item.product.id !== productId);
      }

      logTelemetry('CART_QTY_UPDATE', `Updated ${existing.product.name} to ${newQty}`);
      return prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      );
    });
  };

  const logTelemetry = (action: string, details: string) => {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}:${now.getSeconds() < 10 ? '0' : ''}${now.getSeconds()}`;
    setUserHistories((prev) => {
      const current = prev[currentSegmentKey];
      if (!current) return prev;
      return {
        ...prev,
        [currentSegmentKey]: {
          ...current,
          telemetryLogs: [
            { timestamp, action, details },
            ...current.telemetryLogs.slice(0, 15)
          ]
        }
      };
    });
  };

  const handleSelectUserSegment = (segmentKey: string) => {
    setCurrentSegmentKey(segmentKey);
    logTelemetry('ADMIN_SEGMENT_SWITCH', `Simulating user segment: ${segmentKey}`);
  };

  const handleLoginSuccess = (newUser: UserProfileHistory, isFirstTime: boolean) => {
    ResearchDatabase.saveUser(newUser);
    setUserHistories((prev) => ({
      ...prev,
      [newUser.userId]: newUser,
      'first-time': isFirstTime ? newUser : prev['first-time']
    }));
    setCurrentSegmentKey(isFirstTime ? 'first-time' : newUser.userId);
    setIsLoginModalOpen(false);
    logTelemetry('USER_AUTH_SUCCESS', `${newUser.name} logged in with ₹${newUser.walletBalance} wallet balance`);
  };

  const handlePlaceOrder = (walletDeducted: number = 0, finalToPay: number = 0) => {
    const rawTotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0) + 4;
    const actualPaid = finalToPay !== undefined ? finalToPay : Math.max(0, rawTotal - walletDeducted);
    const actualWalletUsed = walletDeducted;

    // Deduct from research wallet in centralized database if used
    if (actualWalletUsed > 0) {
      ResearchDatabase.deductWallet(
        currentUserHistory.userId,
        actualWalletUsed,
        `Covered checkout for ${cart.length} items`
      );

      // Decrement local state wallet balance
      setUserHistories((prev) => {
        const current = prev[currentSegmentKey];
        if (!current) return prev;
        return {
          ...prev,
          [currentSegmentKey]: {
            ...current,
            walletBalance: Math.max(0, current.walletBalance - actualWalletUsed),
            totalLifetimeOrders: current.totalLifetimeOrders + 1,
            totalLifetimeSpend: current.totalLifetimeSpend + rawTotal
          }
        };
      });
    }

    // Save to ResearchDatabase for Google Sheets export & telemetry
    ResearchDatabase.saveOrder({
      orderId: `BLK-${Math.floor(100000 + Math.random() * 900000)}`,
      userId: currentUserHistory.userId,
      userName: currentUserHistory.name,
      userPhone: currentUserHistory.phone,
      userSegment: currentUserHistory.userSegment,
      orderDate: new Date().toISOString().split('T')[0],
      orderTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'DELIVERED',
      itemCount: cart.reduce((s, i) => s + i.quantity, 0),
      itemsSummary: cart.map((i) => `${i.quantity}x ${i.product.name} (${i.product.weight})`).join(', '),
      subtotal: cart.reduce((s, i) => s + i.product.price * i.quantity, 0),
      totalOrderValue: rawTotal,
      walletDeducted: actualWalletUsed,
      amountPaid: actualPaid,
      savings: Math.max(0, cart.reduce((s, i) => s + i.product.mrp * i.quantity, 0) - cart.reduce((s, i) => s + i.product.price * i.quantity, 0)) + actualWalletUsed,
      paymentMethod: actualPaid === 0 ? 'Blinkit Research Wallet (₹500)' : selectedPayment,
      deliveryAddress: selectedAddress.fullAddress,
      instructions: 'Dont ring bell, Return plastics'
    });

    setLastOrderSummary({ paid: actualPaid, walletUsed: actualWalletUsed });
    logTelemetry(
      'ORDER_PLACED', 
      `Order placed. Total: ₹${rawTotal}, Wallet Used: ₹${actualWalletUsed}, Paid: ₹${actualPaid}`
    );
    setCurrentScreen('success');
  };

  const totalCartAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + 4; // Including handling charge
  const currentUserHistory = userHistories[currentSegmentKey] || userHistories['second-time'];

  // Search & Category filtered products for Home view
  const activeCategoryObj = CATEGORIES.find((c) => c.id === selectedCategory);

  const displayProducts = products.filter((p) => {
    // 1. Category filter (when not 'all')
    if (selectedCategory !== 'all' && activeCategoryObj && activeCategoryObj.categoryName !== 'All') {
      if (p.category.toLowerCase() !== activeCategoryObj.categoryName.toLowerCase()) {
        return false;
      }
    }

    // 2. Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      const inName = p.name.toLowerCase().includes(q);
      const inBrand = p.brand.toLowerCase().includes(q);
      const inCategory = p.category.toLowerCase().includes(q);
      const inWeight = p.weight.toLowerCase().includes(q);

      // Multi-word search (e.g., "daawat rice", "amul butter")
      const words = q.split(/\s+/).filter(Boolean);
      const allWordsMatch = words.length > 1 && words.every(
        (w) =>
          p.name.toLowerCase().includes(w) ||
          p.brand.toLowerCase().includes(w) ||
          p.category.toLowerCase().includes(w)
      );

      return inName || inBrand || inCategory || inWeight || allWordsMatch;
    }

    return true;
  });

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '' && selectedCategory !== 'all') {
      // Auto switch to all categories so search stays comprehensive across the curated range.
      setSelectedCategory('all');
    }
    if (currentScreen !== 'home') {
      setCurrentScreen('home');
    }
  };

  return (
    <>
      <MobileFrame
        deviceType={deviceType}
        onDeviceChange={setDeviceType}
        onOpenAdminDrawer={requestAdminAccess}
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
      >
        {currentScreen === 'home' && (
          <div className="flex flex-col min-h-full">
            <Header
              selectedAddress={selectedAddress}
              onOpenAddressDrawer={() => setIsAddressDrawerOpen(true)}
              onOpenAdminDrawer={requestAdminAccess}
              onOpenLogin={() => setIsLoginModalOpen(true)}
              walletBalance={currentUserHistory.walletBalance}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              themeColor={themeColor}
              onToggleTheme={() =>
                setThemeColor(themeColor === 'classic-yellow' ? 'dark-yellow' : 'classic-yellow')
              }
            />
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <HomeFeed
              products={displayProducts}
              totalProductsCount={products.length}
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onSearchSuggestionClick={(suggestion) => handleSearchChange(suggestion)}
              onOpenCheckout={() => setCurrentScreen('checkout')}
              onOpenAdminDrawer={requestAdminAccess}
            />
            <CartFloatingBar
              cart={cart}
              onOpenCheckout={() => setCurrentScreen('checkout')}
            />
          </div>
        )}

        {currentScreen === 'checkout' && (
          <CheckoutScreen
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onBack={() => setCurrentScreen('home')}
            onOpenPaymentDrawer={() => setIsPaymentDrawerOpen(true)}
            onOpenAddressDrawer={() => setIsAddressDrawerOpen(true)}
            onOpenAdminDrawer={requestAdminAccess}
            onPlaceOrder={handlePlaceOrder}
            selectedPayment={selectedPayment}
            selectedAddress={selectedAddress}
            currentUserHistory={currentUserHistory}
            currentSegmentKey={currentSegmentKey}
          />
        )}

        {currentScreen === 'success' && (
          <OrderSuccessScreen
            cart={cart}
            totalAmount={lastOrderSummary.paid}
            walletDeducted={lastOrderSummary.walletUsed}
            paymentMethod={lastOrderSummary.paid === 0 ? 'Blinkit Research Wallet' : selectedPayment}
            address={selectedAddress}
            onBackToHome={() => setCurrentScreen('home')}
            onOpenAdminDrawer={requestAdminAccess}
          />
        )}
      </MobileFrame>

      {/* Slide-over Drawers & Modals */}
      <PaymentDrawer
        isOpen={isPaymentDrawerOpen}
        onClose={() => setIsPaymentDrawerOpen(false)}
        selectedPayment={selectedPayment}
        onSelectPayment={(method) => {
          setSelectedPayment(method);
          logTelemetry('PAYMENT_METHOD_CHANGED', `Selected ${method}`);
        }}
        totalAmount={totalCartAmount}
      />

      <AddressDrawer
        isOpen={isAddressDrawerOpen}
        onClose={() => setIsAddressDrawerOpen(false)}
        selectedAddress={selectedAddress}
        onSelectAddress={(addr) => {
          setSelectedAddress(addr);
          logTelemetry('ADDRESS_CHANGED', `Changed address to ${addr.label}`);
        }}
      />

      <AdminHistoryDrawer
        isOpen={isAdminDrawerOpen && isAdminAuthenticated}
        onClose={() => setIsAdminDrawerOpen(false)}
        currentUserHistory={currentUserHistory}
        onSelectUserSegment={handleSelectUserSegment}
        currentSegmentKey={currentSegmentKey}
        cartTotal={totalCartAmount}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onAuthenticated={() => {
          setIsAdminAuthenticated(true);
          setIsAdminLoginOpen(false);
          setIsAdminDrawerOpen(true);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUserHistory}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

