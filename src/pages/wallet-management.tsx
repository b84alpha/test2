import React, { useState } from 'react';

/** Mock helper to generate random addresses/keys */
function generateAddress(): string {
  return '0x' + Math.floor(Math.random() * 1e16).toString(16).padEnd(14, '0');
}
function generatePrivateKey(): string {
  return 'priv_key_' + Math.random().toString(36).substring(2, 10);
}

// Types
interface WalletData {
  address: string;
  privateKey: string;
  balanceSol: number;   // For demonstration
  balanceToken: number; // For demonstration
  isPapa?: boolean;
}

const WalletManagementPage: React.FC = () => {
  // Papa wallet (only 1 allowed)
  const [papaWallet, setPapaWallet] = useState<WalletData | null>(null);

  // Child wallets
  const [childWallets, setChildWallets] = useState<WalletData[]>([]);

  // Track which child wallets are selected
  const [selectedChildAddresses, setSelectedChildAddresses] = useState<string[]>([]);

  // ---- 1) CREATE PAPA WALLET ----
  const handleCreatePapaWallet = () => {
    if (papaWallet) return; // Already created
    const newPapa: WalletData = {
      address: generateAddress(),
      privateKey: generatePrivateKey(),
      balanceSol: Number((Math.random() * 2).toFixed(2)),     // mock
      balanceToken: Math.floor(Math.random() * 1000),         // mock
      isPapa: true,
    };
    setPapaWallet(newPapa);
  };

  // ---- REFRESH BALANCE (mock) ----
  const handleRefreshBalance = (addr: string) => {
    const newSol = Number((Math.random() * 5).toFixed(2));
    const newToken = Math.floor(Math.random() * 5000);

    if (papaWallet && papaWallet.address === addr) {
      setPapaWallet({ ...papaWallet, balanceSol: newSol, balanceToken: newToken });
    } else {
      setChildWallets((prev) =>
        prev.map((w) =>
          w.address === addr
            ? { ...w, balanceSol: newSol, balanceToken: newToken }
            : w
        )
      );
    }
  };
  const handleRefreshAll = () => {
    if (papaWallet) handleRefreshBalance(papaWallet.address);
    childWallets.forEach((w) => handleRefreshBalance(w.address));
  };

  // ---- SELECT / DESELECT CHILD WALLETS ----
  const toggleChildSelection = (addr: string) => {
    setSelectedChildAddresses((prev) =>
      prev.includes(addr) ? prev.filter((a) => a !== addr) : [...prev, addr]
    );
  };

  const handleSelectAllChildWallets = () => {
    // If all are selected, unselect them all
    if (selectedChildAddresses.length === childWallets.length) {
      setSelectedChildAddresses([]);
    } else {
      // select them all
      setSelectedChildAddresses(childWallets.map((w) => w.address));
    }
  };

  // ---- 2) ADD WALLETS (MODAL) ----
  const [showAddWalletsModal, setShowAddWalletsModal] = useState(false);
  const [numWalletsToCreate, setNumWalletsToCreate] = useState(1);

  const handleAddWallets = () => {
    // Create up to 150
    if (numWalletsToCreate > 150) {
      alert('Max 150 wallets allowed.');
      return;
    }
    const newWallets: WalletData[] = [];
    for (let i = 0; i < numWalletsToCreate; i++) {
      newWallets.push({
        address: generateAddress(),
        privateKey: generatePrivateKey(),
        balanceSol: 0,
        balanceToken: 0,
      });
    }
    setChildWallets((prev) => [...prev, ...newWallets]);
    setShowAddWalletsModal(false);
  };

  // ---- 3) TRANSFER PANEL ----
  // Transfer from:
  const [transferFrom, setTransferFrom] = useState<'papa' | 'selectedChildren'>('papa');

  // Transfer to:
  const [transferTo, setTransferTo] = useState<'papa' | 'anotherAddress' | 'selectedChildren'>(
    'anotherAddress'
  );

  // If user chooses "selectedChildren" for Transfer To => same or random?
  const [distributionMode, setDistributionMode] = useState<'same' | 'random'>('same');

  // Destination address (if user picks "anotherAddress")
  const [destinationAddress, setDestinationAddress] = useState('');

  // Transfer type & percent
  const [transferType, setTransferType] = useState<'sol' | 'token'>('sol');
  const [transferPercent, setTransferPercent] = useState<number>(10); // e.g. 10% by default

  const handleTransfer = () => {
    // A mock demonstration of how you might interpret the panel:
    console.log('Transfer triggered with data:', {
      from: transferFrom,
      to: transferTo,
      distributionMode,
      destinationAddress,
      transferType,
      percent: transferPercent,
      selectedChildAddresses,
    });
    alert('Transfer triggered (mock). Check console for details.');
  };

  // ---- 4) CSV DOWNLOAD of Child Wallets ----
  const handleDownloadCSV = () => {
    if (childWallets.length === 0) {
      alert('No child wallets to download.');
      return;
    }
    // Simple CSV: address,privateKey,balanceSol,balanceToken
    let csvContent = 'data:text/csv;charset=utf-8,Address,PrivateKey,SOL,Tokens\n';
    childWallets.forEach((w) => {
      csvContent += `${w.address},${w.privateKey},${w.balanceSol},${w.balanceToken}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'child_wallets.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ---- 5) Upload Wallets (placeholder) ----
  const handleUploadWallets = () => {
    alert('Upload wallets not yet implemented. Future backend logic goes here.');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">Wallet Management</h2>
      <p className="mb-6">Papa Wallet, wallet distribution, fund draining.</p>

      {/* PAPA WALLET SECTION */}
      <div className="bg-white rounded shadow p-4 mb-6 flex items-center justify-between">
        {papaWallet ? (
          <>
            <div>
              <p className="font-semibold">Papa Wallet</p>
              <div className="text-sm text-gray-700">
                <span className="mr-4">Addr: {papaWallet.address}</span>
                <span className="mr-4">Key: {papaWallet.privateKey}</span>
                <span>
                  Bal: {papaWallet.balanceSol} SOL / {papaWallet.balanceToken} tokens
                </span>
              </div>
            </div>
            <button
              onClick={() => handleRefreshBalance(papaWallet.address)}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 text-sm"
            >
              Refresh
            </button>
          </>
        ) : (
          <button
            onClick={handleCreatePapaWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Create Papa Wallet
          </button>
        )}
      </div>

      {/* CHILD WALLETS SECTION */}
      <div className="bg-white rounded shadow p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Child Wallets</h3>
          <div className="space-x-2">
            <button
              onClick={handleDownloadCSV}
              className="bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded"
            >
              Download CSV
            </button>
            <button
              onClick={handleUploadWallets}
              className="bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded"
            >
              Upload Wallets
            </button>
            <button
              onClick={() => setShowAddWalletsModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
            >
              Add wallets
            </button>
            <button
              onClick={handleRefreshAll}
              className="bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded"
            >
              Refresh All
            </button>
          </div>
        </div>

        {/* If no child wallets */}
        {childWallets.length === 0 ? (
          <p className="text-sm text-gray-500">No child wallets yet.</p>
        ) : (
          <div className="overflow-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        onChange={handleSelectAllChildWallets}
                        checked={selectedChildAddresses.length === childWallets.length}
                      />
                      <span className="ml-1">Select All</span>
                    </label>
                  </th>
                  <th className="p-2 text-left">Address</th>
                  <th className="p-2 text-left">Private Key</th>
                  <th className="p-2 text-left">Balance</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {childWallets.map((w) => {
                  const isSelected = selectedChildAddresses.includes(w.address);
                  return (
                    <tr key={w.address} className="border-b">
                      <td className="p-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleChildSelection(w.address)}
                        />
                      </td>
                      <td className="p-2">{w.address}</td>
                      <td className="p-2">{w.privateKey}</td>
                      <td className="p-2">
                        {w.balanceSol} SOL / {w.balanceToken} tokens
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => handleRefreshBalance(w.address)}
                          className="bg-gray-200 text-xs px-2 py-1 rounded hover:bg-gray-300"
                        >
                          Refresh
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* TRANSFER PANEL */}
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg mb-3">Transfer Panel</h3>

        {/* FROM */}
        <div className="mb-4 flex items-center space-x-4">
          <div>
            <p className="font-medium text-sm mb-1">Transfer From:</p>
            <label className="inline-flex items-center mr-3 text-sm">
              <input
                type="radio"
                name="from"
                value="papa"
                checked={transferFrom === 'papa'}
                onChange={() => setTransferFrom('papa')}
              />
              <span className="ml-1">Papa Wallet</span>
            </label>
            <label className="inline-flex items-center text-sm">
              <input
                type="radio"
                name="from"
                value="selectedChildren"
                checked={transferFrom === 'selectedChildren'}
                onChange={() => setTransferFrom('selectedChildren')}
                disabled={childWallets.length === 0}
              />
              <span className="ml-1">Selected Child Wallets</span>
            </label>
          </div>
        </div>

        {/* TO */}
        <div className="mb-4 flex items-center space-x-4">
          <div>
            <p className="font-medium text-sm mb-1">Transfer To:</p>
            <label className="inline-flex items-center mr-3 text-sm">
              <input
                type="radio"
                name="to"
                value="papa"
                checked={transferTo === 'papa'}
                onChange={() => setTransferTo('papa')}
                disabled={!papaWallet}
              />
              <span className="ml-1">Papa Wallet</span>
            </label>
            <label className="inline-flex items-center mr-3 text-sm">
              <input
                type="radio"
                name="to"
                value="anotherAddress"
                checked={transferTo === 'anotherAddress'}
                onChange={() => setTransferTo('anotherAddress')}
              />
              <span className="ml-1">Another Address</span>
            </label>
            <label className="inline-flex items-center text-sm">
              <input
                type="radio"
                name="to"
                value="selectedChildren"
                checked={transferTo === 'selectedChildren'}
                onChange={() => setTransferTo('selectedChildren')}
              />
              <span className="ml-1">Selected Child Wallets</span>
            </label>
          </div>

          {/* If user picks "anotherAddress" */}
          {transferTo === 'anotherAddress' && (
            <div>
              <p className="text-sm font-medium mb-1">Destination Address:</p>
              <input
                type="text"
                className="border px-2 py-1 text-sm"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                placeholder="0x123..."
              />
            </div>
          )}

          {/* If user picks "selectedChildren" => same or random? */}
          {transferTo === 'selectedChildren' && (
            <div>
              <p className="text-sm font-medium mb-1">Distribution Mode:</p>
              <label className="inline-flex items-center mr-3 text-sm">
                <input
                  type="radio"
                  name="distMode"
                  value="same"
                  checked={distributionMode === 'same'}
                  onChange={() => setDistributionMode('same')}
                />
                <span className="ml-1">Same Amount</span>
              </label>
              <label className="inline-flex items-center text-sm">
                <input
                  type="radio"
                  name="distMode"
                  value="random"
                  checked={distributionMode === 'random'}
                  onChange={() => setDistributionMode('random')}
                />
                <span className="ml-1">Random Amount</span>
              </label>
            </div>
          )}
        </div>

        {/* Transfer type & amount (%) */}
        <div className="mb-4 flex items-center space-x-4">
          <div>
            <p className="font-medium text-sm mb-1">Transfer Type:</p>
            <select
              value={transferType}
              onChange={(e) => setTransferType(e.target.value as 'sol' | 'token')}
              className="border text-sm px-2 py-1"
            >
              <option value="sol">SOL</option>
              <option value="token">Token</option>
            </select>
          </div>
          <div>
            <p className="font-medium text-sm mb-1">Amount (%):</p>
            <input
              type="number"
              className="border w-16 text-sm px-2 py-1"
              value={transferPercent}
              onChange={(e) => setTransferPercent(Number(e.target.value))}
              min={1}
              max={100}
            />
          </div>
        </div>

        <button
          onClick={handleTransfer}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm"
        >
          Transfer
        </button>
      </div>

      {/* MODAL: Add Wallets */}
      {showAddWalletsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-72">
            <h4 className="text-lg font-semibold mb-4">Add Wallets</h4>
            <label className="block mb-2 text-sm">
              Number of wallets (max 150):
              <input
                type="number"
                className="border w-full mt-1 px-2 py-1 text-sm"
                value={numWalletsToCreate}
                onChange={(e) => setNumWalletsToCreate(Number(e.target.value))}
              />
            </label>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setShowAddWalletsModal(false)}
                className="bg-gray-300 text-sm px-3 py-1 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWallets}
                className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletManagementPage;
