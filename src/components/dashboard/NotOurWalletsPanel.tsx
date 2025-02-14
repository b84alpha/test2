import React, { useEffect, useState } from 'react';

interface NotOurWallet {
  id: string;
  percentOfSupply: number;
  solBalance: number;
  pnl: number; // in SOL, for example
}

interface NotOurWalletsPanelProps {
  wallets: NotOurWallet[];
}

const NotOurWalletsPanel: React.FC<NotOurWalletsPanelProps> = ({ wallets }) => {
  const [filteredWallets, setFilteredWallets] = useState<NotOurWallet[]>([]);

  useEffect(() => {
    // Sort wallets by percentOfSupply descending
    const sorted = [...wallets].sort((a, b) => b.percentOfSupply - a.percentOfSupply);
    setFilteredWallets(sorted);
  }, [wallets]);

  return (
    <div className="bg-white p-4 rounded shadow h-full">
      <h2 className="font-bold text-lg mb-4">Not Our Wallets</h2>

      {filteredWallets.length === 0 ? (
        <p className="text-gray-500">No wallets available</p>
      ) : (
        <ul className="space-y-2">
          {filteredWallets.map((wallet) => (
            <li key={wallet.id} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">Wallet {wallet.id}</p>
                <p className="text-sm text-gray-600">
                  Holds: <span className="font-semibold">{wallet.percentOfSupply}%</span> of supply
                </p>
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
