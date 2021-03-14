import { registerAs } from '@nestjs/config';
export default registerAs('database', () => {
  return {
    TYPE: process.env.DB_TYPE,
    HOST: process.env.DB_HOST,
    PORT: parseInt(process.env.DB_PORT, 10),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_DATABASE,
    LOGGING: process.env.DB_LOG || true,
    LOGGER: process.env.DB_LOG_TYPE || 'advanced-console',
  };
});
