// src/pages/dashboard.tsx  (or /index.tsx if you prefer the root path)
import React, { useState } from 'react';

// -- Mock components. Replace with your real ones if you want more logic --
function WalletsPanel() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Our Wallets</h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Wallet 1 — 2.50 SOL / 10000 XYZ</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Wallet 2 — 1.30 SOL / 5000 XYZ</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" />
          <span>Wallet 3 — 3.10 SOL / 8000 XYZ</span>
        </label>
      </div>
    </div>
  );
}

function NotOurWalletsPanel() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Not Our Wallets</h3>
      <ul className="space-y-2">
        <li className="flex justify-between border-b pb-2">
          <span>Wallet X1 (5% supply)</span>
          <span className="text-sm text-gray-500">PnL: 2.5 SOL</span>
        </li>
        <li className="flex justify-between border-b pb-2">
          <span>Wallet X2 (2.5% supply)</span>
          <span className="text-sm text-gray-500">PnL: -1.2 SOL</span>
        </li>
      </ul>
    </div>
  );
}

function TradePanel() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Trade Execution</h3>

      {/* Toggle: Buy/Sell */}
      <div className="flex space-x-2 mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Buy
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Sell
        </button>
      </div>

      {/* Method Select */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Method</label>
        <select className="border w-full rounded px-3 py-2">
          <option value="market">Market</option>
          <option value="limit-mc">Limit (Market Cap)</option>
          <option value="limit-nowallet">Limit (Not Our Wallet)</option>
        </select>
      </div>

      {/* Example input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Amount (SOL)</label>
        <input type="number" className="border w-full rounded px-3 py-2" />
      </div>

      <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
        Execute
      </button>
    </div>
  );
}

function OrdersPanel() {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3">Orders</h3>
      <p className="text-gray-500 text-sm">No active orders right now.</p>
    </div>
  );
}

function QuickSellButtons() {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex space-x-4">
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded">
        Sell 25%
      </button>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
        Sell 50%
      </button>
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Sell 100%
      </button>
    </div>
  );
}

const DashboardPage: React.FC = () => {
  // If you have real data, manage it here. Right now, just a static UI.

  return (
    <div className="space-y-6">
      {/* TOP INDICATORS (5 cards) */}
      <div className="grid grid-cols-5 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1">Total SOL</p>
          <h2 className="text-2xl font-bold text-gray-800">12.34</h2>
        </div>
        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1">Token Balance</p>
          <h2 className="text-2xl font-bold text-gray-800">150,000 XYZ</h2>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1">Market Cap</p>
          <h2 className="text-2xl font-bold text-gray-800">$2,340,000</h2>
        </div>
        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1">Total Profit</p>
          <h2 className="text-2xl font-bold text-green-600">4.56 SOL</h2>
        </div>
        {/* Card 5 */}
        <div className="bg-yellow-100 rounded-lg shadow p-4 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-yellow-800 mb-1">Liquidity</p>
          <h2 className="text-2xl font-bold text-yellow-700">120 SOL</h2>
        </div>
      </div>

      {/* Middle row: Our Wallets (left), Trade Panel (center), Not Our Wallets (right) */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <WalletsPanel />
        </div>
        <div className="col-span-12 md:col-span-6">
          <TradePanel />
        </div>
        <div className="col-span-12 md:col-span-3">
          <NotOurWalletsPanel />
        </div>
      </div>

      {/* Bottom row: Orders + QuickSell */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8">
          <OrdersPanel />
        </div>
        <div className="col-span-12 md:col-span-4">
          <QuickSellButtons />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
