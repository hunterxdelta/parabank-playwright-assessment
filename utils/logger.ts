import * as fs from 'fs';
import * as path from 'path';
import * as winston from 'winston';
import { ENV } from '../config/env';

const logsDir = 'logs';

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const logFormat = winston.format.printf(({ timestamp, level, message, stack }) => {
  return stack
    ? `[${timestamp}] ${level}: ${message}\n${stack}`
    : `[${timestamp}] ${level}: ${message}`;
});

export const logger = winston.createLogger({
  level: ENV.LOG_LEVEL,

  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    logFormat
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({
          format: 'HH:mm:ss',
        }),
        logFormat
      ),
    }),

    new winston.transports.File({
      filename: path.join(logsDir, 'test-run.log'),
      options: {
        flags: 'a',
      },
    }),

    new winston.transports.File({
      filename: path.join(logsDir, 'errors.log'),
      level: 'error',
      options: {
        flags: 'a',
      },
    }),
  ],
});