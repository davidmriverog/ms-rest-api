import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@bomb/database';
import { Knex } from 'knex';
import { RestLogger } from '@bomb/logger';

import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';
import { UserMapper } from '../../../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly userMapper: UserMapper,
    private readonly logger: RestLogger,
  ) {}

  async all(): Promise<UserEntity[]> {
    try {
      const queryRunner = await this.knex.select('*').from('users');

      return queryRunner.map((it) => this.userMapper.rawToEntity(it));
    } catch (e) {
      this.logger.log(e.message);
      throw e;
    }
  }

  async findById(id: number): Promise<UserEntity> {
    try {
      const queryRunner = await this.knex
        .select('*')
        .from('users')
        .where('id', id)
        .first();

      if (!queryRunner) throw new Error('No record found');

      return this.userMapper.rawToEntity(queryRunner);
    } catch (e) {
      this.logger.log(e.message);
      throw e;
    }
  }
}
