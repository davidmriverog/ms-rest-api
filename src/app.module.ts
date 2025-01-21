import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MAIN_MODULES } from './modules/modules';
import { KnexModule } from '@bomb/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'pg',
          connection: {
            connectionString: configService.get('DATABASE_URL'),
          },
          pool: {
            min: 0,
            max: 30,
            log: (msg) => {
              Logger.log(msg, 'SQL_POOL');
            },
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
  providers: [],
})
export class AppModule {}
