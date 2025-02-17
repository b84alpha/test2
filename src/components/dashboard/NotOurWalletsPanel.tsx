// src/components/dashboard/NotOurWalletsPanel.tsx
import React from 'react';

interface NotOurWallet {
  id: string;
  percentOfSupply: number;
  solBalance: number;
  pnl: number;
}

interface NotOurWalletsPanelProps {
  wallets: NotOurWallet[];
  enableCheckboxes: boolean;
  // If you need to track which not-our-wallets are selected, add a callback here
}

const NotOurWalletsPanel: React.FC<NotOurWalletsPanelProps> = ({
  wallets,
  enableCheckboxes,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow h-full">
      <h2 className="font-bold text-lg mb-4">Not Our Wallets</h2>
      {wallets.length === 0 ? (
        <p className="text-gray-500">No wallets available</p>
      ) : (
        <ul className="space-y-2">
          {wallets.map((wallet) => (
            <li
              key={wallet.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center space-x-2">
                {enableCheckboxes && <input type="checkbox" />}
                <div>
                  <p className="font-medium">Wallet {wallet.id}</p>
                  <p className="text-sm text-gray-600">
                    Holds: <span className="font-semibold">{wallet.percentOfSupply}%</span> of supply
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  SOL: <span className="font-semibold">{wallet.solBalance.toFixed(2)}</span>
                </p>
                <p className="text-sm">
                  PnL: <span className="font-semibold">{wallet.pnl.toFixed(2)} SOL</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotOurWalletsPanel;
