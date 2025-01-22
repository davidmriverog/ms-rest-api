import { Module } from '@nestjs/common';
import { METRICS_PROVIDERS } from './providers/metrics.provider';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { RestLoggerModule } from '../logger/logger.module';

@Module({
  imports: [PrometheusModule.register(), RestLoggerModule],
  providers: [...METRICS_PROVIDERS],
  exports: [...METRICS_PROVIDERS],
})
export class MetricsModule {}
