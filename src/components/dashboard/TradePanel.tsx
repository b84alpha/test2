// src/components/dashboard/TradePanel.tsx
import React, { useState, useEffect } from 'react';

type TradeMode = 'buy' | 'sell';
type TradeMethod = 'market' | 'limit-mc' | 'limit-nowallet';
type ExecutionMode = 'bundle' | 'realistic' | null;

interface TradePanelProps {
  selectedWallets: string[];
  onSettingsChange: (mode: TradeMode, method: TradeMethod) => void;
}

const TradePanel: React.FC<TradePanelProps> = ({ selectedWallets, onSettingsChange }) => {
  const [mode, setMode] = useState<TradeMode>('buy');
  const [method, setMethod] = useState<TradeMethod>('market');

  const [solAmount, setSolAmount] = useState<number>(0);
  const [capAmount, setCapAmount] = useState<number>(0);
  const [selectedHolderId, setSelectedHolderId] = useState('');
  const [percentage, setPercentage] = useState<number>(100);

  // Radio for execution mode
  const [executionMode, setExecutionMode] = useState<ExecutionMode>(null);
  const [delay, setDelay] = useState<number>(3);
  const [bundleSize, setBundleSize] = useState<number>(2);

  useEffect(() => {
    // Whenever mode or method changes, notify parent
    onSettingsChange(mode, method);
  }, [mode, method, onSettingsChange]);

  const handleExecute = () => {
    const payload = {
      mode,
      method,
      selectedWallets,
      solAmount,
      capAmount,
      selectedHolderId,
      percentage,
      executionMode,
      delay,
      bundleSize,
    };
    console.log('Trade Execution:', payload);
    // Call backend or dispatch a Redux action, etc.
  };

  return (
    <div className="bg-white p-4 rounded shadow h-full">
      {/* Toggle Buy/Sell */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${mode === 'buy' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('buy')}
        >
          Buy
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('sell')}
        >
          Sell
        </button>
      </div>

      {/* Trade Method */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as TradeMethod)}
          className="border rounded px-2 py-1"
        >
          <option value="market">Market</option>
          <option value="limit-mc">Limit (Market Cap)</option>
          <option value="limit-nowallet">Limit (Not Our Wallet)</option>
        </select>
      </div>

      {/* Conditional fields */}
      {method === 'market' && (
        <div className="mb-4">
          {mode === 'buy' ? (
            <div>
              <label className="block mb-1">How much SOL (or % per wallet)?</label>
              <input
                type="number"
                className="border ml-0 w-full"
                value={solAmount}
                onChange={(e) => setSolAmount(Number(e.target.value))}
              />
            </div>
          ) : (
            <div>
              <label className="block mb-1">Percentage to sell?</label>
              <input
                type="number"
                className="border w-full"
                value={percentage}
                onChange={(e) => setPercentage(Number(e.target.value))}
              />
            </div>
          )}
        </div>
      )}

      {method === 'limit-mc' && (
        <div className="mb-4">
          <label className="block mb-1">Target Market Cap:</label>
          <input
            type="number"
            className="border w-full"
            value={capAmount}
            onChange={(e) => setCapAmount(Number(e.target.value))}
          />
          <br />
          <label className="block mt-2">
            {mode === 'buy' ? 'Buy' : 'Sell'} how much (as % of each wallet)?
          </label>
          <input
            type="number"
            className="border w-full"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
          />
        </div>
      )}

      {method === 'limit-nowallet' && (
        <div className="mb-4">
          <label className="block mb-1">Select top holder wallet to watch:</label>
          <input
            type="text"
            className="border p-1 w-full"
            placeholder="Wallet ID or choose from a list..."
            value={selectedHolderId}
            onChange={(e) => setSelectedHolderId(e.target.value)}
          />
          <label className="block mt-2">
            {mode === 'buy' ? 'Buy' : 'Sell'} how much (as % of each wallet)?
          </label>
          <input
            type="number"
            className="border w-full"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
          />
        </div>
      )}

      {/* Execution Mode (radio) */}
      <div className="mb-4">
        <p className="font-medium mb-1">Execution Mode</p>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            name="execMode"
            value="bundle"
            checked={executionMode === 'bundle'}
            onChange={() => setExecutionMode('bundle')}
          />
          <span className="ml-2">Bundle</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="execMode"
            value="realistic"
            checked={executionMode === 'realistic'}
            onChange={() => setExecutionMode('realistic')}
          />
          <span className="ml-2">Realistic</span>
        </label>
      </div>

      {/* Realistic details */}
      {executionMode === 'realistic' && (
        <div className="mb-4 flex space-x-4">
          <div>
            <label className="block mb-1 font-medium">Delay (s):</label>
            <input
              type="number"
              className="border w-16"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Bundle size:</label>
            <input
              type="number"
              className="border w-16"
              value={bundleSize}
              onChange={(e) => setBundleSize(Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {/* Execute */}
      <button
        onClick={handleExecute}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Execute
      </button>
    </div>
  );
};

export default TradePanel;
