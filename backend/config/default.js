const dotenv = require('dotenv-safe');

dotenv.config();

module.exports = {
  environment: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 5000,
    saltWorkFactor: Number(process.env.SALT_GEN) || 10,
    clientURL: process.env.UI_URL || 'http://localhost:3000',
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
  emailConfig: {
    user: process.env.EMAIL_USER || 'agricore-erp',
    password: process.env.EMAIL_PASS || 'J6sfS7tqQuxfVfS7bWTtX',
  },
};
