// components/dashboard/OrdersPanel.tsx
import React from 'react';

interface Order {
  id: string;
  type: 'limit' | 'advanced';
  mode: 'buy' | 'sell';
  target: number; // e.g. market cap or holder
  percentage: number;
}

interface OrdersPanelProps {
  limitOrders: Order[];
  advancedOrders: Order[];
  onCancel: (id: string) => void;
}

const OrdersPanel: React.FC<OrdersPanelProps> = ({ limitOrders, advancedOrders, onCancel }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {/* Limit Orders */}
      <div className="bg-white p-4 rounded shadow">
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

      {/* Advanced Orders */}
      <div className="bg-white p-4 rounded shadow">
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
    </div>
  );
};

export default OrdersPanel;
