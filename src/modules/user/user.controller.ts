import { Controller, Get, Logger } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from '@bomb/database';

@Controller('users')
export class UserController {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  @Get()
  async allUsers() {
    try {
      const users = await this.knex.table('users');
      return { users };
    } catch (e) {
      Logger.error(e);
    } finally {
      Logger.log('User List Successfully.');
    }
  }
}
