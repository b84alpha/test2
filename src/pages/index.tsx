// src/pages/index.tsx
import React, { useState } from 'react';
import WalletsPanel from '@/components/dashboard/WalletsPanel';
import NotOurWalletsPanel from '@/components/dashboard/NotOurWalletsPanel';
import TradePanel from '@/components/dashboard/TradePanel';
import OrdersPanel from '@/components/dashboard/OrdersPanel';
import TopIndicators from '@/components/dashboard/TopIndicators';

type TradeMode = 'buy' | 'sell';
type TradeMethod = 'market' | 'limit-mc' | 'limit-nowallet';

interface Wallet {
  id: string;
  solBalance: number;
  tokenBalance: number;
  lastUsed?: Date;
}

export default function DashboardPage() {
  // Mock data for demonstration
  const [ourWallets] = useState<Wallet[]>([
    { id: 'W1', solBalance: 2.5, tokenBalance: 1000, lastUsed: new Date() },
    { id: 'W2', solBalance: 1.3, tokenBalance: 500, lastUsed: new Date(Date.now() - 600000) },
    { id: 'W3', solBalance: 5.0, tokenBalance: 2500, lastUsed: new Date(Date.now() - 3600000) },
  ]);

  const [selectedWallets, setSelectedWallets] = useState<string[]>([]);

  const [notOurWallets] = useState([
    { id: 'X1', percentOfSupply: 5, solBalance: 10, pnl: 2.5 },
    { id: 'X2', percentOfSupply: 2.5, solBalance: 4, pnl: -1.2 },
    { id: 'X3', percentOfSupply: 1.8, solBalance: 0.5, pnl: 0.1 },
  ]);

  // Orders
  const [limitOrders, setLimitOrders] = useState([]);
  const [advancedOrders, setAdvancedOrders] = useState([]);
  const handleCancelOrder = (id: string) => {
    setLimitOrders((prev) => prev.filter((o) => o.id !== id));
    setAdvancedOrders((prev) => prev.filter((o) => o.id !== id));
  };

  // We'll track the trade mode & method from the TradePanel
  const [tradeMode, setTradeMode] = useState<TradeMode>('buy');
  const [tradeMethod, setTradeMethod] = useState<TradeMethod>('market');

  // Callback from TradePanel:
  const handleTradeSettingsChange = (mode: TradeMode, method: TradeMethod) => {
    setTradeMode(mode);
    setTradeMethod(method);
  };

  return (
    <div className="space-y-6">
      {/* TOP INDICATORS */}
      <TopIndicators
        totalSol={ourWallets.reduce((sum, w) => sum + w.solBalance, 0)}
        totalTokens={ourWallets.reduce((sum, w) => sum + w.tokenBalance, 0)}
        totalTokensInSol={15.2}
        pnl={3.14}
        marketCap={250000}
        totalVolume={100000}
        ourVolume={2200}
        buyPressure={45}
        sellPressure={30}
      />

      {/* MIDDLE ROW: 4 (Wallets) | 3 (Trade) | 5 (Not Our Wallets) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Our Wallets: col-span-4 */}
        <div className="col-span-4">
          <WalletsPanel wallets={ourWallets} onSelectWallets={setSelectedWallets} />
        </div>

        {/* Trade Panel: col-span-3 */}
        <div className="col-span-3">
          <TradePanel
            selectedWallets={selectedWallets}
            onSettingsChange={handleTradeSettingsChange}
          />
        </div>

        {/* Not Our Wallets: col-span-5 */}
        <div className="col-span-5">
          <NotOurWalletsPanel
            wallets={notOurWallets}
            enableCheckboxes={tradeMode === 'buy' && tradeMethod === 'limit-nowallet'}
          />
        </div>
      </div>

      {/* BOTTOM: Orders Panel (3 columns inside) */}
      <OrdersPanel
        limitOrders={limitOrders}
        advancedOrders={advancedOrders}
        onCancel={handleCancelOrder}
      />
    </div>
  );
}
