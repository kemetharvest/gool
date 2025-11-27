import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  apiPollInterval: parseInt(process.env.API_POLL_INTERVAL || '5000', 10),
  footballApiKey: process.env.FOOTBALL_API_KEY || 'test_key',
  footballApiBaseUrl: process.env.FOOTBALL_API_BASE_URL || 'https://api.example.com',
};
