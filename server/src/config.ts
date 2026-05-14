import 'dotenv/config';

export const config = {
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret',
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_PORT: parseInt(process.env.EMAIL_PORT || '587'),
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_TO: process.env.EMAIL_TO || process.env.EMAIL_USER || 'admin@uttc.com',
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  APP_URL: process.env.APP_URL || 'http://localhost:3001',
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001'),
};

if (!process.env.JWT_SECRET && config.NODE_ENV === 'production') {
  console.warn('WARNING: JWT_SECRET is not set in production. Using fallback secret.');
}
