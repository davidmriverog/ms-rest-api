import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@bomb/database';
import { Knex } from 'knex';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async all(): Promise<UserEntity[]> {
    try {
      const results = await this.knex.table('users');

      return results.map(
        (it) =>
          <UserEntity>{
            ...it,
          },
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
