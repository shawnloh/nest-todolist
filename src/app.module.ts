import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as passport from 'passport';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UserModule } from './user/user.module';
import mainConfig from './config/main.config';
import databaseConfig from './config/database.config';
import { databaseConfigInterface } from './config/interfaces/database.interface';
import { AuthModule } from './auth/auth.module';
import { CSRFMiddleware } from './shared/middlewares/csrf.middleware';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as csurf from 'csurf';
import { mainConfigInterface } from './config/interfaces/main.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [mainConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dbConfig = configService.get<databaseConfigInterface>('database');
        return Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
          type: dbConfig.TYPE,
          host: dbConfig.HOST,
          port: dbConfig.PORT,
          username: dbConfig.USERNAME,
          password: dbConfig.PASSWORD,
          database: dbConfig.DATABASE,
          logging: dbConfig.LOGGING,
          logger: dbConfig.LOGGER,
        });
      },
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    const config = this.configService.get<mainConfigInterface>('main');

    consumer
      .apply(
        cookieParser(config.APP_TOKEN),
        csurf({
          cookie: {
            signed: true,
            secure: config.NODE_ENV === 'development' ? false : true,
            sameSite: 'strict',
            httpOnly: true,
          },
        }),
        expressSession({
          secret: config.APP_TOKEN,
          name: 'sp-id',
          resave: false,
          cookie: {
            httpOnly: true,
            signed: true,
            maxAge: 1000 * 60 * 60 * 24,
            secure: config.NODE_ENV === 'development' ? false : true,
            sameSite: 'strict',
          },
          saveUninitialized: false,
          // store:
        }),
        passport.initialize(),
        passport.session(),
        CSRFMiddleware,
      )
      .forRoutes('*');
  }
}
