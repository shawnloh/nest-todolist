/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  migrationsTableName: 'db_migrations',
  logging: process.env.DB_LOG || true,
  logger: process.env.DB_LOG_TYPE || 'advanced-console',
  migrations: ['dist/database/migrations/*{.js,.ts}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
