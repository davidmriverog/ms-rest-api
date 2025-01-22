import {
  Global,
  Module,
  DynamicModule,
  Provider,
  Type,
  OnApplicationShutdown,
  Inject,
  Logger,
} from '@nestjs/common';
import {
  KnexModuleAsyncOptions,
  KnexModuleOptions,
  KnexOptionsFactory,
} from './interfaces';
import { getConnectionToken, handleRetry } from './common/knex.utils';
import { KNEX_MODULE_OPTIONS } from './knex.constants';
import { knex, Knex } from 'knex';
import { ModuleRef } from '@nestjs/core';
import { defer, lastValueFrom } from 'rxjs';
import { RestLogger } from '../logger';

@Global()
@Module({})
export class KnexCoreModule implements OnApplicationShutdown {
  constructor(
    @Inject(KNEX_MODULE_OPTIONS)
    private readonly options: KnexModuleOptions,
    private readonly moduleRef: ModuleRef,
    private readonly logger: RestLogger,
  ) {}

  public static forRootAsync(
    options: KnexModuleAsyncOptions,
    connection: string,
  ): DynamicModule {
    const connectionProvider: Provider = {
      provide: getConnectionToken(connection),
      useFactory: async (options: KnexModuleOptions, logger: RestLogger) => {
        return await this.createConnectionFactory(options, logger);
      },
      inject: [KNEX_MODULE_OPTIONS, RestLogger],
    };

    return {
      module: KnexCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), connectionProvider],
      exports: [connectionProvider],
    };
  }

  async onApplicationShutdown(): Promise<any> {
    const connection = this.moduleRef.get<Knex>(
      getConnectionToken(this.options) as Type<Knex>,
    );
    // connection && (await connection.destroy());

    if (connection) {
      await connection.destroy();
    }
  }

  public static createAsyncProviders(
    options: KnexModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  public static createAsyncOptionsProvider(
    options: KnexModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: KNEX_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [options.useClass || options.useExisting];

    return {
      provide: KNEX_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: KnexOptionsFactory,
      ): Promise<KnexModuleOptions> => {
        return optionsFactory.createKnexOptions();
      },
      inject,
    };
  }

  private static async createConnectionFactory(
    options: KnexModuleOptions,
    logger: RestLogger,
  ): Promise<Knex> {
    const debugCallback = (msg) => {
      logger.log(msg.sql);
    };

    return lastValueFrom(
      defer(async () => {
        return knex({
          ...options.config,
          log: {
            debug: debugCallback,
            error: (msg) => {
              logger.error(msg.sql);
            },
            enableColors: true,
          },
        });
      }).pipe(handleRetry(options.retryAttempts, options.retryDelay)),
    );
  }
}
