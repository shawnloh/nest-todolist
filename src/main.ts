import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { loggerTransportsConfig } from './config/logger.config';
import * as exphbs from 'express-handlebars';
import { resolve } from 'path';
import { mainConfigInterface } from './config/interfaces/main.interface';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      handleExceptions: true,
      exitOnError: false,
      transports: loggerTransportsConfig(),
    }),
  });

  const configService = app.get(ConfigService);
  const config = configService.get<mainConfigInterface>('main');
  const viewsPath = resolve(__dirname, '..', 'views');
  app.setBaseViewsDir(viewsPath);
  app.engine(
    'hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: 'main',
      layoutsDir: resolve(viewsPath, 'layouts'),
      partialsDir: resolve(viewsPath, 'partials'),
    }),
  );
  app.setViewEngine('hbs');
  await app.listen(config.APP_PORT);
}
bootstrap();
