import React, { useState } from 'react';

const QuickSellButtons: React.FC = () => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [sellPercent, setSellPercent] = useState<number>(0);

  const handleClick = (percent: number) => {
    setSellPercent(percent);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    // TODO: Insert your market-sell logic or API call here
    console.log(`Confirmed: Selling ${sellPercent}% of tokens across all wallets.`);
    setConfirmOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Quick Sell Buttons */}
      <button
        onClick={() => handleClick(25)}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
      >
        Sell 25%
      </button>
      <button
        onClick={() => handleClick(50)}
        className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
      >
        Sell 50%
      </button>
      <button
        onClick={() => handleClick(100)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
      >
        Sell 100%
      </button>

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

export default QuickSellButtons;
