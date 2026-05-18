import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ data, coinName }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6 h-80 flex items-center justify-center">
        <p className="text-gray-500">Dados de gráfico não disponíveis para {coinName}</p>
      </div>
    );
  }

  const chartData = data.map((price, index) => ({
    day: index + 1,
    price: price,
  }));

  const minPrice = Math.min(...data);
  const maxPrice = Math.max(...data);
  const isUpward = data[data.length - 1] > data[0];

  return (
    <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-4 animate-fade-in">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-semibold">{coinName} - Tendência de 7 dias</h3>
          <p className="text-sm text-gray-400">
            Variação no período:{' '}
            <span className={isUpward ? 'text-emerald-400' : 'text-red-400'}>
              {((data[data.length - 1] - data[0]) / data[0] * 100).toFixed(2)}%
            </span>
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="day"
            tick={{ fill: '#9CA3AF' }}
            tickLine={{ stroke: '#4B5563' }}
            label={{ value: 'Dia (últimos 7)', position: 'insideBottomRight', offset: -5, fill: '#9CA3AF' }}
          />
          <YAxis
            domain={[minPrice * 0.95, maxPrice * 1.05]}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            tick={{ fill: '#9CA3AF' }}
            tickLine={{ stroke: '#4B5563' }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#F9FAFB' }}
            formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Preço']}
            labelFormatter={(label) => `Dia ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke={isUpward ? '#10B981' : '#EF4444'}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: isUpward ? '#10B981' : '#EF4444' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
