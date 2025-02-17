// src/components/dashboard/OrdersPanel.tsx
import React, { useState } from 'react';

interface Order {
  id: string;
  type: 'limit' | 'advanced';
  mode: 'buy' | 'sell';
  target: number | string;
  percentage: number;
}

interface OrdersPanelProps {
  limitOrders: Order[];
  advancedOrders: Order[];
  onCancel: (id: string) => void;
}

const OrdersPanel: React.FC<OrdersPanelProps> = ({
  limitOrders,
  advancedOrders,
  onCancel,
}) => {
  // For the quick-sell confirmation
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [sellPercent, setSellPercent] = useState<number>(0);

  const handleClick = (percent: number) => {
    setSellPercent(percent);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    console.log(`Confirmed: Selling ${sellPercent}% of tokens across all wallets.`);
    setConfirmOpen(false);
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left Column: Limit Orders */}
      <div className="col-span-4 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Limit Orders</h2>
        {limitOrders.map((o) => (
          <div key={o.id} className="flex justify-between mb-2 border-b pb-1">
            <div>
              <p>{o.mode.toUpperCase()} @ {o.target}</p>
              <p>{o.percentage}% of wallets</p>
            </div>
            <button onClick={() => onCancel(o.id)} className="text-red-500">X</button>
          </div>
        ))}
      </div>

      {/* Middle Column: Circle Sell Buttons (vertical) */}
      <div className="col-span-4 flex items-center justify-center">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleClick(25)}
            className="w-12 h-12 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white text-sm"
          >
            25%
          </button>
          <button
            onClick={() => handleClick(50)}
            className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-sm"
          >
            50%
          </button>
          <button
            onClick={() => handleClick(100)}
            className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm"
          >
            100%
          </button>
        </div>
      </div>

      {/* Right Column: Advanced Orders */}
      <div className="col-span-4 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Advanced Orders</h2>
        {advancedOrders.map((o) => (
          <div key={o.id} className="flex justify-between mb-2 border-b pb-1">
            <div>
              <p>{o.mode.toUpperCase()} on holder: {o.target}</p>
              <p>{o.percentage}% of wallets</p>
            </div>
            <button onClick={() => onCancel(o.id)} className="text-red-500">X</button>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="mb-4">
              Are you sure you want to sell <strong>{sellPercent}%</strong> of your tokens?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleConfirm}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPanel;
