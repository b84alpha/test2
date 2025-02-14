// src/pages/index.tsx
import React from 'react';

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Top Stats */}
      <div className="grid grid-cols-5 gap-6">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1">Total SOL</p>
          <h2 className="text-2xl font-bold text-gray-800">12.34</h2>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1">Token Balance</p>
          <h2 className="text-2xl font-bold text-gray-800">150,000 XYZ</h2>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1">Market Cap</p>
          <h2 className="text-2xl font-bold text-gray-800">$2,340,000</h2>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 mb-1">Total Profit</p>
          <h2 className="text-2xl font-bold text-green-600">4.56 SOL</h2>
        </div>

        {/* Card 5 */}
        <div className="bg-yellow-100 rounded-lg shadow p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-yellow-800 mb-1">Liquidity Available</p>
          <h2 className="text-2xl font-bold text-yellow-700">120 SOL</h2>
        </div>
      </div>

      {/* Main Row: Wallets + Trade Execution */}
      <div className="grid grid-cols-12 gap-6">
        {/* Wallets */}
        <div className="col-span-12 md:col-span-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Wallets</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Wallet 1 – 2.50 / 10000 XYZ</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Wallet 2 – 1.30 / 5000 XYZ</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" />
                <span>Wallet 3 – 3.10 / 8000 XYZ</span>
              </label>
              {/* Add more wallets... */}
            </div>
          </div>
        </div>

        {/* Trade Execution */}
        <div className="col-span-12 md:col-span-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Trade Execution</h3>
            
            {/* Buttons (Top 10 / All >10k) */}
            <div className="mb-4 flex space-x-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Top 10 Holders
              </button>
              <button className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500">
                All &gt;10k Tokens
              </button>
            </div>

            {/* Trade Method / Amount Row */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-medium mb-1">Trade Method</label>
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring">
                  <option value="market">Market Order</option>
                  <option value="limit">Limit Order</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Trade Amount (SOL)</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
                />
              </div>
            </div>

            {/* Market Cap Row */}
            <div className="mb-4">
              <label className="block font-medium mb-1">Market Cap for Limit Order</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
              />
            </div>

            {/* Execute button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Set Limit Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
