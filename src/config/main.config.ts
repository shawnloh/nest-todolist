import { registerAs } from '@nestjs/config';

export default registerAs('main', () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    APP_TOKEN: process.env.APP_TOKEN,
    APP_PORT: parseInt(process.env.APP_PORT, 10),
  };
});
