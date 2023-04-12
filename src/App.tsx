import React, { useEffect, useState } from "react";
import axios from "axios";

interface TickerData {
  ticker: any;
  high: string;
  low: string;
  vol: string;
  last: string;
  buy: string;
  sell: string;
  open: string;
  date: number;
}

interface CryptoData {
  [key: string]: {
    buy: string;
  };
}

const App = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData>({});

  // Função global para buscar dados da API e atualizar o estado de cryptoData correspondente
  const fetchCryptoData = async (asset: string) => {
    try {
      const response = await axios.get<TickerData>(`https://www.mercadobitcoin.net/api/${asset}/ticker/`);
      console.log("feito");
      // Atualiza os dados da criptomoeda correspondente no estado do componente
      setCryptoData((prevData) => ({
        ...prevData,
        [asset]: {
          buy: response.data.ticker.buy,
        },
      }));
    } catch (error) {
      console.error(`Erro ao buscar dados da API de ${asset}:`, error);
    }
  };

  useEffect(() => {
    // Função de busca dos dados da API e atualização do estado
    const fetchData = async () => {
      // Chama a função de busca dos dados da API e atualiza o estado da cryptoData
      await fetchCryptoData("BTC");
      await fetchCryptoData("ETH");
      await fetchCryptoData("MATIC");
      await fetchCryptoData("ADA");
      await fetchCryptoData("SOL");
      await fetchCryptoData("DOT");
      await fetchCryptoData("AVAX");
      await fetchCryptoData("USDC");
      await fetchCryptoData("USDT");
    };

    // Chama a função de busca dos dados da API para atualizar o estado na montagem do componente
    fetchData();

    // Define o intervalo de busca de dados (a cada 50 segundos)
    const interval = setInterval(fetchData, 50000);

    // Função de limpeza do intervalo ao desmontar o componente
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      {cryptoData.BTC && <h3>Valor de Compra BTC: {cryptoData.BTC.buy}</h3>}
      {cryptoData.ETH && <h3>Valor de Compra ETH: {cryptoData.ETH.buy}</h3>}
      {cryptoData.MATIC && <h3>Valor de Compra MATIC: {cryptoData.MATIC.buy}</h3>}
      {cryptoData.ADA && <h3>Valor de Compra CARDANO: {cryptoData.ADA.buy}</h3>}
      {cryptoData.SOL && <h3>Valor de Compra SOLANA: {cryptoData.SOL.buy}</h3>}
      {cryptoData.DOT && <h3>Valor de Compra POLKADOT: {cryptoData.DOT.buy}</h3>}
      {cryptoData.AVAX && <h3>Valor de Compra AVALANCHE: {cryptoData.AVAX.buy}</h3>}
      {cryptoData.USDC && <h3>Valor de Compra USDC: {cryptoData.USDC.buy}</h3>}
      {cryptoData.USDT && <h3>Valor de Compra USDT: {cryptoData.USDT.buy}</h3>}
    </div>
  );
};

export default App;
