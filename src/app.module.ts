import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggingInterceptor } from './shared/interceptors/logging.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';
import { UserModule } from './user/user.module';
import mainConfig from './config/main.config';
import databaseConfig from './config/database.config';
import { databaseConfigInterface } from './config/interfaces/database.interface';

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
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
})
export class AppModule {}
