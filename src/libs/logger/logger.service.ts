import { ConsoleLogger, Injectable } from '@nestjs/common';

import { createLogger, transports, format } from 'winston';
import LokiTransport from 'winston-loki';

@Injectable()
export class RestLogger extends ConsoleLogger {
  private tracker: string;

  public lokiLogger;

  constructor() {
    super();

    this.lokiLogger = createLogger({
      transports: [
        new LokiTransport({
          host: process.env.LOKI_URL,
        }),
        new transports.Console({
          format: format.combine(
            format.colorize({ all: true }),
            format.timestamp({
              format: 'DD-MM-YYYY HH:mm:ss.SSS',
            }),
            // format.align(),
            format.printf(
              (info) => `${info.timestamp}${info.message}`,
            ),
          ),
        }),
      ],
    });
  }

  override log(message): void {
    const contextMsg = `[${this.getTracker()}] ${message}`;

    this.lokiLogger.info({
      message: contextMsg,
      level: 'info',
      labels: {
        job: 'applications',
      },
    });
  }

  getTracker() {
    return this.tracker;
  }

  setTracker(tracker: string): void {
    this.tracker = tracker;
  }
}
