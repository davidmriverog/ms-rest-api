import { Provider } from '@nestjs/common';
import { LoggerMiddleware, RequestLoggerInterceptor } from '@bomb/metrics';

export const METRICS_PROVIDERS: Provider[] = [
  RequestLoggerInterceptor,
  LoggerMiddleware,
];
