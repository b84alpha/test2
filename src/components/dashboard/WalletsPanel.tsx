// components/dashboard/WalletsPanel.tsx
import React, { useState } from 'react';

interface Wallet {
  id: string;
  solBalance: number;
  tokenBalance: number;
  lastUsed: Date;
  // Add anything else you need
}

interface WalletsPanelProps {
  wallets: Wallet[];
  onSelectWallets: (selectedIds: string[]) => void; 
}

const WalletsPanel: React.FC<WalletsPanelProps> = ({ wallets, onSelectWallets }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'sol' | 'tokens' | 'time'>('sol');
  const [minSol, setMinSol] = useState<number>(0);
  // etc. for other filters

  // Sort & filter logic
  const filteredWallets = wallets
    .filter((w) => w.solBalance >= minSol)
    .sort((a, b) => {
      switch (sortBy) {
        case 'sol':
          return b.solBalance - a.solBalance;
        case 'tokens':
          return b.tokenBalance - a.tokenBalance;
        case 'time':
          return b.lastUsed.getTime() - a.lastUsed.getTime();
        default:
          return 0;
      }
    });

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleSelectAll = () => {
    // If all filtered wallets are already selected, deselect them
    if (filteredWallets.every((w) => selected.includes(w.id))) {
      setSelected([]);
    } else {
      setSelected(filteredWallets.map((w) => w.id));
    }
  };

  // Fire callback whenever selected changes
  React.useEffect(() => {
    onSelectWallets(selected);
  }, [selected, onSelectWallets]);

  return (
    <div className="bg-white p-4 rounded shadow h-full">
      <h2 className="font-bold mb-4">Our Wallets</h2>
      {/* Filters */}
      <div className="space-y-2 mb-4">
        <label>Min SOL:
          <input
            type="number"
            value={minSol}
            onChange={(e) => setMinSol(Number(e.target.value))}
            className="ml-2 border px-2"
          />
        </label>
        {/* Add more filters if needed (tokens, date range, etc.) */}
      </div>

      {/* Sorting */}
      <div className="mb-4">
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
          <option value="sol">SOL Balance</option>
          <option value="tokens">Token Balance</option>
          <option value="time">Last Used</option>
        </select>
      </div>

      {/* Select all */}
      <div className="mb-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            onChange={toggleSelectAll}
            checked={
              filteredWallets.length > 0 &&
              filteredWallets.every((w) => selected.includes(w.id))
            }
          />
          <span className="ml-2">Select All (filtered)</span>
        </label>
      </div>

      {/* Wallet list */}
      <ul className="space-y-1">
        {filteredWallets.map((wallet) => (
          <li key={wallet.id} className="flex items-center justify-between">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={selected.includes(wallet.id)}
                onChange={() => toggleSelect(wallet.id)}
              />
              <span className="ml-2">
                Wallet {wallet.id} — {wallet.solBalance.toFixed(2)} SOL / {wallet.tokenBalance} tokens
              </span>
            </label>
            <span className="text-sm text-gray-500">
              last used: {wallet.lastUsed.toLocaleTimeString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletsPanel;
