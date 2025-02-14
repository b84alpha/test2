// components/dashboard/TradePanel.tsx
import React, { useState } from 'react';

type TradeMode = 'buy' | 'sell';
type TradeMethod = 'market' | 'limit-mc' | 'limit-nowallet';

interface TradePanelProps {
  selectedWallets: string[]; 
}

const TradePanel: React.FC<TradePanelProps> = ({ selectedWallets }) => {
  const [mode, setMode] = useState<TradeMode>('buy');
  const [method, setMethod] = useState<TradeMethod>('market');
  const [solAmount, setSolAmount] = useState<number>(0);       // for Market
  const [capAmount, setCapAmount] = useState<number>(0);       // for Limit MC
  const [selectedHolderId, setSelectedHolderId] = useState(''); // for Limit by not-our-wallet
  const [percentage, setPercentage] = useState<number>(100);   // for buy or sell portion
  const [bundle, setBundle] = useState<boolean>(false);
  const [realistic, setRealistic] = useState<boolean>(false);
  const [delay, setDelay] = useState<number>(3);
  const [bundleSize, setBundleSize] = useState<number>(2);

  const handleExecute = () => {
    // read current state, build transaction request 
    // pass it to the backend. 
    console.log({
      mode,
      method,
      selectedWallets,
      solAmount,
      capAmount,
      selectedHolderId,
      percentage,
      bundle,
      realistic,
      delay,
      bundleSize,
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow h-full">
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

      {/* Conditionally Render Fields based on trade method */}
      {method === 'market' && (
        <div className="mb-4">
          {mode === 'buy' ? (
            <div>
              <label>
                How much SOL (or % of each wallet) to buy?
                <input
                  type="number"
                  className="border ml-2"
                  value={solAmount}
                  onChange={(e) => setSolAmount(Number(e.target.value))}
                />
              </label>
              {/* Or a % approach—could be a radio button for "fixed SOL" or "percentage" */}
            </div>
          ) : (
            <div>
              <label>
                Percentage to sell?
                <input
                  type="number"
                  className="border ml-2"
                  value={percentage}
                  onChange={(e) => setPercentage(Number(e.target.value))}
                />
              </label>
            </div>
          )}
        </div>
      )}

      {method === 'limit-mc' && (
        <div className="mb-4">
          <label>
            Target Market Cap:
            <input
              type="number"
              className="border ml-2"
              value={capAmount}
              onChange={(e) => setCapAmount(Number(e.target.value))}
            />
          </label>
          <br />
          <label>
            {mode === 'buy' ? 'Buy' : 'Sell'} how much (as % of each wallet)?
            <input
              type="number"
              className="border ml-2"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      {method === 'limit-nowallet' && (
        <div className="mb-4">
          <label className="block mb-2">Select top holder wallet to watch:</label>
          <input
            type="text"
            className="border p-1 w-full"
            placeholder="Wallet ID or choose from a list..."
            value={selectedHolderId}
            onChange={(e) => setSelectedHolderId(e.target.value)}
          />
          <br />
          <label>
            {mode === 'buy' ? 'Buy' : 'Sell'} how much (as % of each wallet)?
            <input
              type="number"
              className="border ml-2"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      {/* Bundle or Realistic */}
      <div className="mb-4">
        <label className="inline-flex items-center mr-4">
          <input
            type="checkbox"
            checked={bundle}
            onChange={(e) => setBundle(e.target.checked)}
          />
          <span className="ml-2">Bundle</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={realistic}
            onChange={(e) => setRealistic(e.target.checked)}
          />
          <span className="ml-2">Realistic</span>
        </label>
      </div>
      {realistic && (
        <div className="mb-4 space-x-4">
          <label>
            Delay (s):
            <input
              type="number"
              className="border ml-2 w-16"
              value={delay}
              onChange={(e) => setDelay(Number(e.target.value))}
            />
          </label>
          <label>
            Bundle size:
            <input
              type="number"
              className="border ml-2 w-16"
              value={bundleSize}
              onChange={(e) => setBundleSize(Number(e.target.value))}
            />
          </label>
        </div>
      )}

      {/* Execute Button */}
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
