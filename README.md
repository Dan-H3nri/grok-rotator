# Crypto Dashboard

Um dashboard de criptomoedas moderno e responsivo construído com React, Tailwind CSS, Vite e a API CoinGecko.

## Funcionalidades

- **Cards de Preço**: Exibe BTC, ETH, SOL, BNB, ADA com preço atual, variação 24h, volume e market cap.
- **Gráfico Interativo**: Gráfico de linha com histórico de 7 dias (sparkline) para cada moeda. Atualiza ao clicar no card.
- **Atualização Automática**: Os dados são atualizados a cada 30 segundos sem recarregar a página.
- **Tabela de Ranking**: Top 10 criptomoedas por market cap com busca em tempo real.
- **Design Dark Mode**: Estilo moderno escuro com gradientes, animações suaves e responsividade.
- **Indicadores de Loading/Erro**: Spinner de carregamento e mensagem de erro amigável com retry automático.

## Tecnologias Utilizadas

- [React](https://reactjs.org/) - Biblioteca UI
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Estilização
- [Recharts](https://recharts.org/) - Gráficos
- [Lucide React](https://lucide.dev/) - Ícones
- [CoinGecko API](https://www.coingecko.com/en/api) - Dados de criptomoedas (gratuito, sem chave)

## Como Executar

1. Clone o repositório ou extraia os arquivos.
2. Navegue até a pasta do projeto:
   ```bash
   cd crypto-dashboard
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
5. Abra o link exibido no terminal (geralmente http://localhost:5173).

## Estrutura de Pastas

```
crypto-dashboard/
├── src/
│   ├── components/
│   │   ├── Card.jsx
│   │   ├── Chart.jsx
│   │   ├── Table.jsx
│   │   └── SearchBar.jsx
│   ├── hooks/
│   │   └── useCryptoData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── README.md
```

## Notas

- A API CoinGecko possui limite de rate. Em caso de muitas requisições, pode ocorrer demora ou erro. O app possui retry automático.
- O gráfico utiliza os dados de sparkline fornecidos pela API (últimos 7 dias).
- O dark mode é padrão e não possui toggle, conforme requisito.

## Requisitos Atendidos

- ✅ Projeto Vite + React
- ✅ Tailwind CSS configurado com dark mode e fonte Inter
- ✅ Componentes separados: Card, Chart, Table, SearchBar
- ✅ Cards com preço, variação, volume, market cap
- ✅ Gráfico interativo com Recharts (atualiza ao clicar no card)
- ✅ Atualização automática a cada 30s
- ✅ Tabela de ranking (top 10) com busca por nome/símbolo
- ✅ Loading spinner e tratamento de erro com retry
- ✅ API CoinGecko sem chave
- ✅ Responsivo e moderno

---
Desenvolvido por [Seu Nome] para demonstração de habilidades.
