import dotenv from 'dotenv'
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';

const development = {
  port: process.env.PORT || 3000,
  log: true,
  secret: process.env.SECRET || '@QEGTUI'
};

const config = { development };

export default config[NODE_ENV];
