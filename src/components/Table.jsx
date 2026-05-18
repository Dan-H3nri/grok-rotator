import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const Table = ({ coins }) => {
  if (!coins || coins.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhuma criptomoeda encontrada.
      </div>
    );
  }

  const formatNumber = (num) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-3 px-2">#</th>
            <th className="text-left py-3 px-2">Moeda</th>
            <th className="text-right py-3 px-2">Preço</th>
            <th className="text-right py-3 px-2">24h %</th>
            <th className="text-right py-3 px-2">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => {
            const priceChange = coin.price_change_percentage_24h || 0;
            const isPositive = priceChange >= 0;
            return (
              <tr key={coin.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="py-3 px-2 font-mono">{index + 1}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <div>
                      <p className="font-medium">{coin.name}</p>
                      <p className="text-xs text-gray-400 uppercase">{coin.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2 text-right font-mono">
                  {formatNumber(coin.current_price)}
                </td>
                <td className={`py-3 px-2 text-right flex items-center justify-end gap-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(priceChange).toFixed(2)}%
                </td>
                <td className="py-3 px-2 text-right font-mono">
                  {formatNumber(coin.market_cap)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
