import { useState, useEffect, useCallback } from 'react';

const COINS_IDS = 'bitcoin,ethereum,cardano,binancecoin,solana,ripple,dogecoin,polkadot,avalanche-2,shiba-inu';
const BASE_URL = 'https://api.coingecko.com/api/v3';

const useCryptoData = () => {
  const [marketData, setMarketData] = useState(null);
  const [topCoins, setTopCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);
    try {
      // Fetch top 10 coins by market cap with sparkline
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&ids=${COINS_IDS}&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h`
      );
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();
      setMarketData(data);
      setTopCoins(data);
    } catch (err) {
      console.error('Error fetching crypto data:', err);
      setError('Falha ao carregar dados da API. Tentando novamente...');
      // Optionally set fallback data or just keep previous
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // 30 seconds
    return () => clearInterval(interval);
  }, [fetchData]);

  const refetch = () => {
    setLoading(true);
    fetchData();
  };

  return { marketData, topCoins, loading, error, refetch };
};

export default useCryptoData;
