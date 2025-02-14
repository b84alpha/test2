// components/dashboard/TopIndicators.tsx
import React from 'react';

interface TopIndicatorsProps {
  totalSol: number;
  totalTokens: number;
  totalTokensInSol?: number; // or in USD
  pnl: number;
  marketCap: number;
  totalVolume: number;
  ourVolume: number;
  buyPressure: number; // or # of buyers
  sellPressure: number; // or # of sellers
}

const TopIndicators: React.FC<TopIndicatorsProps> = (props) => {
  const {
    totalSol,
    totalTokens,
    totalTokensInSol,
    pnl,
    marketCap,
    totalVolume,
    ourVolume,
    buyPressure,
    sellPressure,
  } = props;

  return (
    <div className="grid grid-cols-5 gap-4">
      {/* Card 1: TS */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">TS</h2>
        <p>SOL: {totalSol.toFixed(2)}</p>
        <p>Tokens: {totalTokens.toLocaleString()}</p>
        {totalTokensInSol && (
          <p>(≈ {totalTokensInSol.toFixed(2)} SOL or USD)</p>
        )}
      </div>

      {/* Card 2: PnL */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">PnL</h2>
        <p>{pnl.toFixed(2)} SOL</p>
      </div>

      {/* Card 3: Current MC */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">Market Cap</h2>
        <p>{marketCap.toLocaleString()} USD</p>
      </div>

      {/* Card 4: Volume */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">Volume</h2>
        <p>Total: {totalVolume.toLocaleString()}</p>
        <p>Ours: {ourVolume.toLocaleString()}</p>
      </div>

      {/* Card 5: Buy/Sell Pressure */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold">Buy/Sell (5m)</h2>
        <p>Buy: {buyPressure}</p>
        <p>Sell: {sellPressure}</p>
      </div>
    </div>
  );
};

export default TopIndicators;
