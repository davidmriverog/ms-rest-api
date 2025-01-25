import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@bomb/database';
import { Knex } from 'knex';
import { RestLogger } from '@bomb/logger';
import { ConfigService } from '@nestjs/config';

const Pool = require('pg-pool');

import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';
import { UserMapper } from '../../../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly userMapper: UserMapper,
    private readonly logger: RestLogger,
    private readonly configService: ConfigService,
  ) {}

  async all(): Promise<UserEntity[]> {
    const pool = new Pool({
      connectionString: this.configService.get('DATABASE_URL'),
    });

    const connection = await pool.connect();

    try {
      const queryRunner = await this.knex
        .select('*')
        .from('users')
        .connection(connection);

      return queryRunner.map((it) => this.userMapper.rawToEntity(it));
    } catch (e) {
      this.logger.log(e.message);
      throw e;
    } finally {
      connection.release();
    }
  }
}
