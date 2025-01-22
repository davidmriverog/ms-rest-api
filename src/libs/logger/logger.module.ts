import { Module } from '@nestjs/common';
import { RestLogger } from './logger.service';

@Module({
  providers: [RestLogger],
  exports: [RestLogger],
})
export class RestLoggerModule {}
