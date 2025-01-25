import { Module } from '@nestjs/common';
import { RestLoggerModule } from '@bomb/logger';
import { ConfigModule } from '@nestjs/config';

import { UserController } from './infrastructure/controllers/user.controller';
import { USER_PROVIDERS } from './infrastructure/providers';

@Module({
  imports: [RestLoggerModule, ConfigModule],
  controllers: [UserController],
  providers: [...USER_PROVIDERS],
  exports: [...USER_PROVIDERS],
})
export class UserModule {}
