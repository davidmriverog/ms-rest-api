import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { USER_PROVIDERS } from './infrastructure/providers';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...USER_PROVIDERS],
  exports: [...USER_PROVIDERS],
})
export class UserModule {}
