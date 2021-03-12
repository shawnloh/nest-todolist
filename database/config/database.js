import { config } from 'dotenv';
config();

export const development = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  database: process.env.DB_DATABASE || 'test_database',
  dialect: process.env.DB_DIALECT || 'mysql',
};
export const test = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  database: process.env.DB_DATABASE || 'test_database',
  dialect: process.env.DB_DIALECT || 'mysql',
};
export const production = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  database: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
};
