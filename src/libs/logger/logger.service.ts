import { ConsoleLogger, Injectable } from '@nestjs/common';

import { createLogger, transports, format } from 'winston';

@Injectable()
export class RestLogger extends ConsoleLogger {
  private tracker: string;

  public lokiLogger;

  public asyncOptions: any = {
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize({ all: true }),
          format.cli(),
          format.splat(),
          format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss',
          }),
          format.printf((info) => {
            return `[${info.timestamp}] - ${info.level}: ${info.message}`;
          }),
        ),
      }),
    ],
  };

  constructor() {
    super();

    this.lokiLogger = createLogger({
      level: 'info',
      format: format.combine(
        format.colorize({ all: true }),
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss.SSS',
        }),
        // format.align(),
        format.printf(
          (info) => `[${info.timestamp}] ${info.level}: ${info.message}`,
        ),
      ),
      transports: [new transports.Console()],
    });
  }

  override log(message): void {
    const contextMsg = `[${this.getTracker()}] - ${message}`;

    this.lokiLogger.info(contextMsg);
  }

  getTracker() {
    return this.tracker;
  }

  setTracker(tracker: string): void {
    this.tracker = tracker;
  }
}
