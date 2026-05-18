import React, { useState } from 'react';
import useCryptoData from './hooks/useCryptoData';
import Card from './components/Card';
import Chart from './components/Chart';
import Table from './components/Table';
import SearchBar from './components/SearchBar';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

function App() {
  const { topCoins, marketData, loading, error, refetch } = useCryptoData();
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [searchTerm, setSearchTerm] = useState('');

  const selectedCoinData = marketData?.find(coin => coin.id === selectedCoin);
  const chartData = selectedCoinData?.sparkline_in_7d?.price || [];

  const handleCoinSelect = (coinId) => {
    setSelectedCoin(coinId);
  };

  const filteredCoins = topCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              Crypto Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Dados em tempo real via CoinGecko</p>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>

        {/* Cards Grid */}
        {loading && !marketData ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center">
            <p className="text-red-400">{error}</p>
            <button onClick={refetch} className="mt-2 px-4 py-1 bg-red-800 rounded">Tentar novamente</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {marketData?.slice(0, 5).map((coin) => (
                <Card
                  key={coin.id}
                  coin={coin}
                  onClick={() => handleCoinSelect(coin.id)}
                  isSelected={selectedCoin === coin.id}
                />
              ))}
            </div>

            {/* Chart Section */}
            <div className="mb-8">
              <Chart data={chartData} coinName={selectedCoinData?.name || selectedCoin} />
            </div>

            {/* Ranking Table */}
            <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  Top 10 Market Cap
                </h2>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </div>
              <Table coins={filteredCoins} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
