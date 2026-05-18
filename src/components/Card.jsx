import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Card = ({ coin, onClick, isSelected }) => {
  const priceChange = coin.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  const formatNumber = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatVolume = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  return (
    <div
      onClick={onClick}
      className={`bg-gray-900 rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 border ${
        isSelected ? 'border-emerald-500 shadow-lg shadow-emerald-500/20' : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={coin.image} alt={coin.name} className="w-8 h-8" />
          <div>
            <h3 className="font-semibold">{coin.symbol.toUpperCase()}</h3>
            <p className="text-xs text-gray-400">{coin.name}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(priceChange).toFixed(2)}%
        </div>
      </div>
      <div className="mt-3">
        <p className="text-2xl font-bold">{formatNumber(coin.current_price)}</p>
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-400">
          <div>
            <span>Volume 24h</span>
            <p className="text-gray-300">{formatVolume(coin.total_volume)}</p>
          </div>
          <div>
            <span>Market Cap</span>
            <p className="text-gray-300">{formatNumber(coin.market_cap)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
