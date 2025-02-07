import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@bomb/database';
import { Knex } from 'knex';
import { RestLogger } from '@bomb/logger';

import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';
import { KnexRepositoryImpl } from '@bomb/core/infrastructure/persistence';
import { UserRawToEntityMapper } from '../../../mappers/user-raw-to-entity.mapper';

@Injectable()
export class UserRepositoryImpl extends KnexRepositoryImpl<UserEntity> implements UserRepository {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly mapper: UserRawToEntityMapper,
    private readonly logger: RestLogger,
  ) {
    super(knex, mapper, logger, UserEntity)
  }
}
