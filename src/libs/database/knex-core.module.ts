import {
  DynamicModule,
  Global,
  Inject,
  Module,
  OnApplicationShutdown,
  Provider,
  Type,
} from '@nestjs/common';
import {
  KnexModuleAsyncOptions,
  KnexModuleOptions,
  KnexOptionsFactory,
} from './interfaces';
import { getConnectionToken, handleRetry } from './common/knex.utils';
import { KNEX_MODULE_OPTIONS } from './knex.constants';
import { knex, Knex } from 'knex';
import knexStringcase from 'knex-stringcase';

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
        return this.createConnectionFactory(options, logger);
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
    return lastValueFrom(
      defer(async () => {
        return knex({
          ...options.config,
          log: {
            error: (msg) => {
              logger.log(msg.sql);
            },
            debug: (msg) => {
              // logger.log(`SQL ${msg.sql} - ${JSON.stringify(msg.bindings)}`);
            },
            enableColors: true,
          },
          debug: true,
          ...knexStringcase(),
        }).on('query', async (query) => {
          let msg = `SQL: ${query.sql}`;

          if (query.bindings!==undefined) {
            msg += ` ${JSON.stringify(query.bindings)}`;
          }

          logger.log(msg);
        })
      }).pipe(handleRetry(options.retryAttempts, options.retryDelay)),
    );
  }
}
