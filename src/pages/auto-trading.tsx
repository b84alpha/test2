// src/pages/auto-trading.tsx

import React, { useState } from 'react';

// Type definitions for the questionnaire
type LaunchType = 'new' | 'existing';
type AccumulateMethod = 'bundle' | 'realistic' | 'mixed';

export default function AutoTradingPage() {
  // --------------------
  // Auto-trading state
  // --------------------
  const [isAutoTradingActive, setIsAutoTradingActive] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showStopConfirm, setShowStopConfirm] = useState(false);

  // --------------------
  // Questionnaire states
  // --------------------

  // 1) Launch type
  const [launchType, setLaunchType] = useState<LaunchType>('new');

  // Fields for "new" token
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDescription, setTokenDescription] = useState('');
  const [tokenImage, setTokenImage] = useState('');
  const [telegramLink, setTelegramLink] = useState('');
  const [websiteLink, setWebsiteLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');

  // Field for "existing" token
  const [tokenAddress, setTokenAddress] = useState('');

  // 2) Accumulate method
  const [accumulateMethod, setAccumulateMethod] = useState<AccumulateMethod>('mixed');

  // --- Sub-fields: BUNDLE
  const [bundlePercentOfSupply, setBundlePercentOfSupply] = useState<number>(10);
  const [bundleUntilMigration, setBundleUntilMigration] = useState(false);
  const [bundleSnipeMigration, setBundleSnipeMigration] = useState(false);

  // --- Sub-fields: REALISTIC
  const [realisticPercentOfSupply, setRealisticPercentOfSupply] = useState<number>(10);
  const [realisticUntilMigration, setRealisticUntilMigration] = useState(false);
  const [realisticNumWallets, setRealisticNumWallets] = useState('1-5');
  const [realisticDelaySeconds, setRealisticDelaySeconds] = useState('1-5');
  const [realisticAllowedPercent, setRealisticAllowedPercent] = useState<number>(5);
  const [realisticAllowedWallets, setRealisticAllowedWallets] = useState('');
  const [realisticTakeProfit, setRealisticTakeProfit] = useState(false);
  const [realisticTakeProfitMiddleEntry, setRealisticTakeProfitMiddleEntry] = useState<number>(20);
  const [realisticTakeProfitSellGoal, setRealisticTakeProfitSellGoal] = useState<number>(50);
  const [realisticMinSupply, setRealisticMinSupply] = useState<number>(10);

  // --- Sub-fields: MIXED
  const [mixedStartingPercent, setMixedStartingPercent] = useState<number>(5);
  const [mixedPercentOfSupply, setMixedPercentOfSupply] = useState<number>(10);
  const [mixedUntilMigration, setMixedUntilMigration] = useState(false);
  const [mixedNumWallets, setMixedNumWallets] = useState('1-5');
  const [mixedDelaySeconds, setMixedDelaySeconds] = useState('1-5');
  const [mixedAllowedPercent, setMixedAllowedPercent] = useState<number>(5);
  const [mixedAllowedWallets, setMixedAllowedWallets] = useState('');
  const [mixedTakeProfit, setMixedTakeProfit] = useState(false);
  const [mixedTakeProfitMiddleEntry, setMixedTakeProfitMiddleEntry] = useState<number>(20);
  const [mixedTakeProfitSellGoal, setMixedTakeProfitSellGoal] = useState<number>(50);
  const [mixedMinSupply, setMixedMinSupply] = useState<number>(10);

  // --------------------
  // Real-time monitoring (Mock data)
  // --------------------
  const [totalSolOnWallets] = useState(72.5);
  const [totalSolUsedInBuys] = useState(45.0);
  const [ourPercentOfSupply] = useState(3.8);
  const [numOtherHolders] = useState(132);
  const [othersPercentOfSupply] = useState(96.2);
  const [largeHolders] = useState([
    { address: '0xAbc123...', percent: 0.7 },
    { address: '0xDef456...', percent: 1.1 },
  ]);
  const [middleEntryPointMC] = useState(300000);
  const [ourVolume] = useState(2500);
  const [totalVolume] = useState(100000);
  const [numOthersBuys] = useState(47);
  const [numOthersSells] = useState(31);

  // --------------------
  // Handlers
  // --------------------

  // Toggle config form
  const handleClickStart = () => {
    setShowConfig(!showConfig);
  };

  // Confirm stopping
  const handleStop = () => {
    setShowStopConfirm(true);
  };
  const confirmStop = () => {
    setShowStopConfirm(false);
    setIsAutoTradingActive(false);
  };

  // Launch auto-trading after filling out config
  const handleLaunch = () => {
    // In a real app, gather these fields & start your logic
    console.log('Launching auto-trading with config...');
    setIsAutoTradingActive(true);
    setShowConfig(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Auto-Trading</h2>
      <p className="mb-4">Market-making configuration, real-time monitoring, manual override.</p>

      {/* Status + Stop/Start Buttons */}
      <div className="mb-6 flex items-center space-x-4">
        {isAutoTradingActive ? (
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded">
            Auto-Trading: Active
          </span>
        ) : (
          <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded">
            Auto-Trading: Stopped
          </span>
        )}

        {isAutoTradingActive ? (
          <button
            onClick={handleStop}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Stop MM
          </button>
        ) : (
          <button
            onClick={handleClickStart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {showConfig ? 'Close Config' : 'Start'}
          </button>
        )}
      </div>

      {/* STOP CONFIRMATION MODAL */}
      {showStopConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md">
            <p className="mb-4 text-lg font-semibold">Are you sure you want to stop market-making?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowStopConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={confirmStop}
                className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIG FORM (only if not active) */}
      {(!isAutoTradingActive && showConfig) && (
        <div className="bg-white rounded shadow p-4 mb-6">
          <h3 className="text-lg font-semibold mb-3">Market-Making Configuration</h3>

          {/* Launch Type */}
          <div className="mb-4">
            <label className="font-medium mr-4">Launch Type:</label>
            <label className="mr-4">
              <input
                type="radio"
                value="new"
                checked={launchType === 'new'}
                onChange={(e) => setLaunchType(e.target.value as LaunchType)}
              />{' '}
              New
            </label>
            <label>
              <input
                type="radio"
                value="existing"
                checked={launchType === 'existing'}
                onChange={(e) => setLaunchType(e.target.value as LaunchType)}
              />{' '}
              Existing
            </label>
          </div>

          {/* If user picks "new" */}
          {launchType === 'new' && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="border w-full p-1"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Symbol</label>
                <input
                  type="text"
                  className="border w-full p-1"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  className="border w-full p-1"
                  rows={2}
                  value={tokenDescription}
                  onChange={(e) => setTokenDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  className="border w-full p-1"
                  value={tokenImage}
                  onChange={(e) => setTokenImage(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Telegram (optional)</label>
                <input
                  type="text"
                  className="border w-full p-1"
                  value={telegramLink}
                  onChange={(e) => setTelegramLink(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Website (optional)</label>
                <input
                  type="text"
                  className="border w-full p-1"
                  value={websiteLink}
                  onChange={(e) => setWebsiteLink(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Twitter (optional)</label>
                <input
                  type="text"
                  className="border w-full p-1"
                  value={twitterLink}
                  onChange={(e) => setTwitterLink(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* If user picks "existing" */}
          {launchType === 'existing' && (
            <div className="mb-4">
              <label className="block font-medium mb-1">Token Address</label>
              <input
                type="text"
                className="border w-full p-1"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
              />
            </div>
          )}

          {/* Accumulate Method */}
          <div className="mb-4">
            <label className="font-medium mr-4">How to Accumulate Supply:</label>
            <label className="mr-4">
              <input
                type="radio"
                value="bundle"
                checked={accumulateMethod === 'bundle'}
                onChange={(e) => setAccumulateMethod(e.target.value as AccumulateMethod)}
              />{' '}
              Bundle
            </label>
            <label className="mr-4">
              <input
                type="radio"
                value="realistic"
                checked={accumulateMethod === 'realistic'}
                onChange={(e) => setAccumulateMethod(e.target.value as AccumulateMethod)}
              />{' '}
              Realistic
            </label>
            <label>
              <input
                type="radio"
                value="mixed"
                checked={accumulateMethod === 'mixed'}
                onChange={(e) => setAccumulateMethod(e.target.value as AccumulateMethod)}
              />{' '}
              Mixed
            </label>
          </div>

          {/* BUNDLE sub-fields */}
          {accumulateMethod === 'bundle' && (
            <div className="bg-gray-50 p-3 mb-4 border rounded">
              <label className="block mb-1">
                % of supply:
                <input
                  type="number"
                  className="border ml-2 w-20"
                  disabled={bundleUntilMigration}
                  value={bundlePercentOfSupply}
                  onChange={(e) => setBundlePercentOfSupply(Number(e.target.value))}
                />
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={bundleUntilMigration}
                  onChange={(e) => setBundleUntilMigration(e.target.checked)}
                />
                Until migration
              </label>
              <label className="block mb-1">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={bundleSnipeMigration}
                  onChange={(e) => setBundleSnipeMigration(e.target.checked)}
                />
                Snipe migration
              </label>
            </div>
          )}

          {/* REALISTIC sub-fields */}
          {accumulateMethod === 'realistic' && (
            <div className="bg-gray-50 p-3 mb-4 border rounded text-sm space-y-2">
              <div>
                <label className="block mb-1 font-medium">% of supply (goal):</label>
                <input
                  type="number"
                  className="border w-20"
                  disabled={realisticUntilMigration}
                  value={realisticPercentOfSupply}
                  onChange={(e) => setRealisticPercentOfSupply(Number(e.target.value))}
                />
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={realisticUntilMigration}
                    onChange={(e) => setRealisticUntilMigration(e.target.checked)}
                  />
                  Until migration
                </label>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Number of wallets in bundles? (e.g. 1-5)
                </label>
                <input
                  type="text"
                  className="border w-24"
                  value={realisticNumWallets}
                  onChange={(e) => setRealisticNumWallets(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Delay in seconds? (e.g. 1-5)
                </label>
                <input
                  type="text"
                  className="border w-24"
                  value={realisticDelaySeconds}
                  onChange={(e) => setRealisticDelaySeconds(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Allowed % of supply for others:
                </label>
                <input
                  type="number"
                  className="border w-20"
                  value={realisticAllowedPercent}
                  onChange={(e) => setRealisticAllowedPercent(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Allowed wallets:</label>
                <input
                  type="text"
                  className="border w-full"
                  placeholder="0xABC...,0x123..."
                  value={realisticAllowedWallets}
                  onChange={(e) => setRealisticAllowedWallets(e.target.value)}
                />
              </div>

              <div>
                <label className="inline-flex items-center mb-1">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={realisticTakeProfit}
                    onChange={(e) => setRealisticTakeProfit(e.target.checked)}
                  />
                  Take Profit
                </label>
                {realisticTakeProfit && (
                  <div className="ml-4 space-y-2">
                    <div>
                      <label className="block mb-1 text-sm">% from middle entry point:</label>
                      <input
                        type="number"
                        className="border w-20"
                        value={realisticTakeProfitMiddleEntry}
                        onChange={(e) =>
                          setRealisticTakeProfitMiddleEntry(Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm">
                        Sell goal (% of our total supply):
                      </label>
                      <input
                        type="number"
                        className="border w-20"
                        value={realisticTakeProfitSellGoal}
                        onChange={(e) =>
                          setRealisticTakeProfitSellGoal(Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm">Minimum % of supply to keep:</label>
                      <input
                        type="number"
                        className="border w-20"
                        value={realisticMinSupply}
                        onChange={(e) => setRealisticMinSupply(Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* MIXED sub-fields */}
          {accumulateMethod === 'mixed' && (
            <div className="bg-gray-50 p-3 mb-4 border rounded text-sm space-y-2">
              <div>
                <label className="block mb-1 font-medium">
                  Starting % of supply (sniped):
                </label>
                <input
                  type="number"
                  className="border w-20"
                  value={mixedStartingPercent}
                  onChange={(e) => setMixedStartingPercent(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  % of supply (goal):
                </label>
                <input
                  type="number"
                  className="border w-20"
                  disabled={mixedUntilMigration}
                  value={mixedPercentOfSupply}
                  onChange={(e) => setMixedPercentOfSupply(Number(e.target.value))}
                />
                <label className="inline-flex items-center ml-4">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={mixedUntilMigration}
                    onChange={(e) => setMixedUntilMigration(e.target.checked)}
                  />
                  Until migration
                </label>
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Number of wallets in bundles? (e.g. 1-5)
                </label>
                <input
                  type="text"
                  className="border w-24"
                  value={mixedNumWallets}
                  onChange={(e) => setMixedNumWallets(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Delay in seconds? (e.g. 1-5)
                </label>
                <input
                  type="text"
                  className="border w-24"
                  value={mixedDelaySeconds}
                  onChange={(e) => setMixedDelaySeconds(e.target.value)}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Allowed % of supply for others:
                </label>
                <input
                  type="number"
                  className="border w-20"
                  value={mixedAllowedPercent}
                  onChange={(e) => setMixedAllowedPercent(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Allowed wallets:</label>
                <input
                  type="text"
                  className="border w-full"
                  placeholder="0xABC...,0x123..."
                  value={mixedAllowedWallets}
                  onChange={(e) => setMixedAllowedWallets(e.target.value)}
                />
              </div>

              <div>
                <label className="inline-flex items-center mb-1">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={mixedTakeProfit}
                    onChange={(e) => setMixedTakeProfit(e.target.checked)}
                  />
                  Take Profit
                </label>
                {mixedTakeProfit && (
                  <div className="ml-4 space-y-2">
                    <div>
                      <label className="block mb-1 text-sm">% from middle entry point:</label>
                      <input
                        type="number"
                        className="border w-20"
                        value={mixedTakeProfitMiddleEntry}
                        onChange={(e) =>
                          setMixedTakeProfitMiddleEntry(Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm">
                        Sell goal (% of our total supply):
                      </label>
                      <input
                        type="number"
                        className="border w-20"
                        value={mixedTakeProfitSellGoal}
                        onChange={(e) =>
                          setMixedTakeProfitSellGoal(Number(e.target.value))
                        }
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-sm">Minimum % of supply to keep:</label>
                      <input
                        type="number"
                        className="border w-20"
                        value={mixedMinSupply}
                        onChange={(e) => setMixedMinSupply(Number(e.target.value))}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleLaunch}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Launch
          </button>
        </div>
      )}

      {/* REAL-TIME MONITORING SECTION */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg mb-3">Real-Time Monitoring</h3>
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Total SOL (on wallets)</p>
            <p>{totalSolOnWallets} SOL</p>
            <p className="font-medium mt-2">Total SOL used in buys</p>
            <p>{totalSolUsedInBuys} SOL</p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Our % of supply</p>
            <p>{ourPercentOfSupply}%</p>
            <p className="font-medium mt-2">Other holders / total %</p>
            <p>
              {numOtherHolders} holders, {othersPercentOfSupply}% total
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="font-medium">Middle entry point MC</p>
            <p>${middleEntryPointMC.toLocaleString()}</p>
            <p className="font-medium mt-2">Our Vol / Total Vol</p>
            <p>
              {ourVolume} / {totalVolume}
            </p>
          </div>
        </div>

        {/* Big holders list */}
        <div className="mb-4 text-sm">
          <p className="font-medium">Addresses &gt; 0.5% supply:</p>
          <ul className="list-disc list-inside">
            {largeHolders.map((h, i) => (
              <li key={i}>
                {h.address} – {h.percent}%
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-50 p-3 rounded text-sm">
          <p className="font-medium">Others’ Buys / Sells</p>
          <p>
            Buys: {numOthersBuys} | Sells: {numOthersSells}
          </p>
        </div>
      </div>
    </div>
  );
}
