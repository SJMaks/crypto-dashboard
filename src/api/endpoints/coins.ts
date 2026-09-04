import client from "../client";
import type { Coin, CoinDetails, GetCoinsParams } from "../types/coinTypes";

export const getCoins = (params: GetCoinsParams): Promise<Coin[]> => {
  return client.get('/coins/markets', { params }).then(res => res.data);
};
export const getCoinsByIds = (ids: string[]): Promise<Coin[]> => {
  return client.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: ids.join(','),
      price_change_percentage: '24h',
    }
  }).then(res => res.data);
};

export const getCoinById = (id: string): Promise<CoinDetails> => {
  return client.get(`/coins/${id}`).then(res => res.data);
};

export const getCoinChartData = (id: string, days: number): Promise<{ prices: [number, number][] }> => {
  return client.get(`/coins/${id}/market_chart`, {
    params: { vs_currency: 'usd', days }
  }).then(res => res.data);
};