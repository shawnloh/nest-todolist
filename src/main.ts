import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { loggerTransportsConfig } from './config/logger.config';
import * as exphbs from 'express-handlebars';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      handleExceptions: true,
      exitOnError: false,
      transports: loggerTransportsConfig,
    }),
  });
  const configService = app.get(ConfigService);

  app.use(cookieParser(configService.get('APP_TOKEN')));

  app.use(
    expressSession({
      secret: configService.get('APP_TOKEN'),
      name: 'sp-id',
      resave: false,
      cookie: {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: configService.get('NODE_ENV') === 'development' ? false : true,
      },
      saveUninitialized: false,
      // store:
    }),
  );

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
  await app.listen(3000);
}
bootstrap();
