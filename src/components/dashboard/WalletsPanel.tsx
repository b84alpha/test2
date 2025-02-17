// src/components/dashboard/WalletsPanel.tsx
import React, { useState, useEffect } from 'react';

/** Helper to abbreviate large token amounts, e.g. 10000 => "10k" */
function abbreviateTokens(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'b';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'm';
  if (num >= 1_000) return (num / 1_000).toFixed(2) + 'k';
  return num.toString();
}

interface Wallet {
  id: string;
  solBalance: number;
  tokenBalance: number;
  lastUsed?: Date; // if not used, can be undefined
}

interface WalletsPanelProps {
  wallets: Wallet[];
  onSelectWallets: (selectedIds: string[]) => void;
}

const WalletsPanel: React.FC<WalletsPanelProps> = ({ wallets, onSelectWallets }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'sol' | 'tokens' | 'time'>('time');

  // min/max filters for SOL
  const [minSol, setMinSol] = useState<number>(0);
  const [maxSol, setMaxSol] = useState<number>(999999);

  // min/max filters for tokens
  const [minTokens, setMinTokens] = useState<number>(0);
  const [maxTokens, setMaxTokens] = useState<number>(999999999);

  // Filter & sort
  const filtered = wallets
    .filter((w) => w.solBalance >= minSol && w.solBalance <= maxSol)
    .filter((w) => w.tokenBalance >= minTokens && w.tokenBalance <= maxTokens)
    .sort((a, b) => {
      switch (sortBy) {
        case 'sol':
          return b.solBalance - a.solBalance;
        case 'tokens':
          return b.tokenBalance - a.tokenBalance;
        case 'time': {
          const tA = a.lastUsed ? a.lastUsed.getTime() : 0;
          const tB = b.lastUsed ? b.lastUsed.getTime() : 0;
          return tB - tA;
        }
        default:
          return 0;
      }
    });

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (filtered.every((w) => selected.includes(w.id))) {
      setSelected([]);
    } else {
      setSelected(filtered.map((w) => w.id));
    }
  };

  // Notify parent when selection changes
  useEffect(() => {
    onSelectWallets(selected);
  }, [selected, onSelectWallets]);

  return (
    <div className="bg-white p-4 rounded shadow h-full text-sm">
      <h2 className="font-bold mb-3 text-base">Our Wallets</h2>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div>
          <label className="block text-xs font-medium">Min SOL:</label>
          <input
            type="number"
            value={minSol}
            onChange={(e) => setMinSol(Number(e.target.value))}
            className="border px-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium">Max SOL:</label>
          <input
            type="number"
            value={maxSol}
            onChange={(e) => setMaxSol(Number(e.target.value))}
            className="border px-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium">Min Tokens:</label>
          <input
            type="number"
            value={minTokens}
            onChange={(e) => setMinTokens(Number(e.target.value))}
            className="border px-2 w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium">Max Tokens:</label>
          <input
            type="number"
            value={maxTokens}
            onChange={(e) => setMaxTokens(Number(e.target.value))}
            className="border px-2 w-full text-sm"
          />
        </div>
      </div>

      {/* Sort */}
      <div className="mb-2">
        <label className="font-medium mr-2 text-sm">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="border rounded px-2 text-sm"
        >
          <option value="time">Last Used</option>
          <option value="sol">SOL Balance</option>
          <option value="tokens">Token Balance</option>
        </select>
      </div>

      {/* Select all */}
      <div className="mb-2">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onChange={toggleSelectAll}
            checked={filtered.length > 0 && filtered.every((w) => selected.includes(w.id))}
          />
          <span className="ml-2">Select All (filtered)</span>
        </label>
      </div>

      {/* Table-like wallet rows */}
      <div className="mt-2 space-y-1">
        {filtered.map((w) => {
          const sol = w.solBalance.toFixed(1);
          const tokens = abbreviateTokens(w.tokenBalance);
          const lastUsed = w.lastUsed ? w.lastUsed.toLocaleTimeString() : 'N/A';
          return (
            <label
              key={w.id}
              className="flex items-center justify-between border-b py-1 cursor-pointer text-sm"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selected.includes(w.id)}
                  onChange={() => toggleSelect(w.id)}
                />
                <span className="font-medium">Wallet {w.id}</span>
              </div>
              <div className="flex space-x-4 text-gray-700 text-xs">
                <span>{sol} SOL</span>
                <span>{tokens} tokens</span>
                <span className="text-gray-500">last: {lastUsed}</span>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default WalletsPanel;
