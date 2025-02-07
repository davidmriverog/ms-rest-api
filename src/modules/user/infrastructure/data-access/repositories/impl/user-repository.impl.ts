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
      const findList: any[] = await this.knex.select('*').from('users');

      return findList.map((it) => this.userMapper.rawToEntity(it));
    } catch (e) {
      this.logger.log(e.message);
      throw e;
    }
  }

  async findById(id: number): Promise<UserEntity> {
    try {
      const findFirst: any = await this.knex
        .select('*')
        .from('users')
        .where('id', id)
        .first();

      if (!findFirst) throw new Error('No record found');

      return this.userMapper.rawToEntity(findFirst);
    } catch (e) {
      this.logger.log(e.message);
      throw e;
    }
  }
}
