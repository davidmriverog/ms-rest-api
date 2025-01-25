import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MAIN_MODULES } from './modules/modules';
import { KnexModule } from '@bomb/database';
import {
  LoggerMiddleware,
  MetricsModule,
  RequestLoggerInterceptor,
} from '@bomb/metrics';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RestLoggerModule } from '@bomb/logger';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MetricsModule,
    RestLoggerModule,
    KnexModule.forRootAsync({
      imports: [RestLoggerModule],
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'pg',
          connection: {
            connectionString: configService.get('DATABASE_URL'),
          },
          pool: {
            min: 2,
            max: 12,
          },
          acquireConnectionTimeout: 10000,
          debug: true,
        },
        retryAttempts: 3,
        retryDelay: 2000,
      }),
      inject: [ConfigService],
    }),
    ...MAIN_MODULES,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
