import { Injectable } from '@nestjs/common';
import { IRawToEntityMapper } from '@bomb/core/infrastructure';
import { plainToInstance } from 'class-transformer';

import { UserEntity } from '../data-access/entities/user.entity';

@Injectable()
export class UserRawToEntityMapper implements IRawToEntityMapper<UserEntity> {
  map(raw: any): UserEntity {
    return plainToInstance(UserEntity, {
      ...raw,
    })
  }
}