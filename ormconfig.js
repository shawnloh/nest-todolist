/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

module.exports = {
  migrationsTableName: 'db_migrations',
  migrations: ['dist/database/migrations/*{.js,.ts}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
