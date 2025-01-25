import dotenv from 'dotenv-safe';

dotenv.config();

export default {
  environment: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(String(process.env.PORT)) || 5000,
    saltWorkFactor: Number(String(process.env.SALT_GEN)) || 10,
    clientURL: String(process.env.UI_URL) || 'http://localhost:3000',
  },
  dbConfig: {
    url: process.env.DATABASE_URL || '',
  },
  session: {
    secret: process.env.SECRET || 'secret',
  },
  jwt: {
    accessTokenSecret:
      process.env.ACCESS_TOKEN_SECRET || 'fVfISS7bJfS7tZ6suxqQW',
    refreshTokenSecret:
      process.env.REFRESH_TOKEN_SECRET || 'J6sfS7tqQuxfVfS7bWTtX',
  },
  email: {
    user: process.env.SENDER_EMAIL || 'agricore-erp',
    password: process.env.SENDER_PASSWORD || 'J6sfS7tqQuxfVfS7bWTtX',
  },
};
