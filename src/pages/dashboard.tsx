import React, { useState } from 'react';

// Example placeholders (import your real components):
import TopIndicators from '@/components/dashboard/TopIndicators';
import WalletsPanel from '@/components/dashboard/WalletsPanel';
import NotOurWalletsPanel from '@/components/dashboard/NotOurWalletsPanel';
import TradePanel from '@/components/dashboard/TradePanel';
import OrdersPanel from '@/components/dashboard/OrdersPanel';
import QuickSellButtons from '@/components/dashboard/QuickSellButtons';

// Mock data types
interface Wallet {
  id: string;
  solBalance: number;
  tokenBalance: number;
  lastUsed: Date;
}
interface NotOurWallet {
  id: string;
  percentOfSupply: number;
  solBalance: number;
  pnl: number;
}

// Mock order type
interface Order {
  id: string;
  type: 'limit' | 'advanced';
  mode: 'buy' | 'sell';
  target: number | string; // market cap or wallet ID
  percentage: number;
}

const DashboardPage: React.FC = () => {
  // In a real app, you’d fetch data from your back end or store
  const [ourWallets] = useState<Wallet[]>([
    { id: 'W1', solBalance: 2.5, tokenBalance: 1000, lastUsed: new Date() },
    {
      id: 'W2',
      solBalance: 1.2,
      tokenBalance: 500,
      lastUsed: new Date(Date.now() - 60_000 * 30),
    },
    { id: 'W3', solBalance: 5, tokenBalance: 3000, lastUsed: new Date() },
  ]);

  const [notOurWallets] = useState<NotOurWallet[]>([
    { id: 'X1', percentOfSupply: 5, solBalance: 10, pnl: 2.5 },
    { id: 'X2', percentOfSupply: 2.5, solBalance: 4, pnl: -1.2 },
    { id: 'X3', percentOfSupply: 1.8, solBalance: 0.5, pnl: 0.1 },
  ]);

  // Track which of "our" wallets the user has selected
  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);

  // Mock lists of orders (limit/advanced) + cancellation
  const [limitOrders, setLimitOrders] = useState<Order[]>([]);
  const [advancedOrders, setAdvancedOrders] = useState<Order[]>([]);

  const handleCancelOrder = (id: string) => {
    setLimitOrders((prev) => prev.filter((o) => o.id !== id));
    setAdvancedOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="p-4 space-y-4">
      {/* TOP INDICATORS */}
      <TopIndicators
        // Pass whatever data you have; these are just placeholders
        totalSol={ourWallets.reduce((sum, w) => sum + w.solBalance, 0)}
        totalTokens={ourWallets.reduce((sum, w) => sum + w.tokenBalance, 0)}
        totalTokensInSol={12} // mock conversion
        pnl={1.2}
        marketCap={100000}
        totalVolume={250000}
        ourVolume={2200}
        buyPressure={45}
        sellPressure={30}
      />

      <div className="grid grid-cols-12 gap-4">
        {/* LEFT: OUR WALLETS PANEL */}
        <div className="col-span-3">
          <WalletsPanel wallets={ourWallets} onSelectWallets={setSelectedWallets} />
        </div>

        {/* CENTER: TRADE PANEL */}
        <div className="col-span-6">
          <TradePanel selectedWallets={selectedWallets} />
        </div>

        {/* RIGHT: NOT OUR WALLETS PANEL */}
        <div className="col-span-3">
          <NotOurWalletsPanel wallets={notOurWallets} />
        </div>
      </div>

      {/* BOTTOM: ORDERS + QUICK SELL */}
      <OrdersPanel
        limitOrders={limitOrders}
        advancedOrders={advancedOrders}
        onCancel={handleCancelOrder}
      />

      <QuickSellButtons />
    </div>
  );
};

export default DashboardPage;
