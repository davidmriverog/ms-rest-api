import { Controller, Get } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from '@bomb/database';

@Controller('users')
export class UserController {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  @Get()
  async allUsers() {
    const users = await this.knex.table('users');
    return { users };
  }
}
