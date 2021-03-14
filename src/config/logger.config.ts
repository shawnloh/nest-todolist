import { utilities } from 'nest-winston';
import * as path from 'path';
import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';

export const loggerTransportsConfig = () => [
  new winstonDailyRotateFile({
    filename: '%DATE%-access.log',
    datePattern: 'YYYY-MM-DD',
    frequency: '24h',
    dirname: path.resolve(__dirname, '..', '..', 'logs', 'access'),
    level: 'info',
    maxSize: '5mb',
    json: true,
    zippedArchive: true,
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint(),
      winston.format.json(),
    ),
  }),
  new winstonDailyRotateFile({
    filename: '%DATE%-error.log',
    datePattern: 'YYYY-MM-DD',
    frequency: '24h',
    maxSize: '5mb',
    json: true,
    handleExceptions: true,
    zippedArchive: true,
    dirname: path.resolve(__dirname, '..', '..', 'logs', 'errors'),
    level: 'error',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.prettyPrint(),
      winston.format.json(),
    ),
  }),
  new winston.transports.Console({
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      utilities.format.nestLike(),
    ),
  }),
];
