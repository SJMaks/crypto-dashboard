import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;