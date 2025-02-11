import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@bomb/database';
import { Knex } from 'knex';
import { RestLogger } from '@bomb/logger';
import { KnexRepositoryImpl } from '@bomb/core/infrastructure/persistence';

import { UserError } from '@modules/user/domain/errors/user.error';
import { UserEntity } from '@modules/user/infrastructure/data-access/entities/user.entity';
import { UserRawToEntityMapper } from '@modules/user/infrastructure/mappers/user-raw-to-entity.mapper';
import { UserRepository } from '@modules/user/infrastructure/data-access/repositories/user.repository';

@Injectable()
export class UserRepositoryImpl extends KnexRepositoryImpl<UserEntity> implements UserRepository {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly mapper: UserRawToEntityMapper,
    private readonly logger: RestLogger,
  ) {
    super(knex, mapper, logger, UserEntity, UserError)
  }
}
