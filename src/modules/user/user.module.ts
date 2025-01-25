import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
})
export class UserModule {}
