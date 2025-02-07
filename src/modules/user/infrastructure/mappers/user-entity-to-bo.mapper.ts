import { Injectable } from '@nestjs/common';
import { IEntityToBoMapper } from '@bomb/core/infrastructure';

import { UserBo } from '../../domain/bo/user.bo';
import { UserEntity } from '../data-access/entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserEntityToBoMapper
  implements IEntityToBoMapper<UserEntity, UserBo>
{
  map(entity: UserEntity): UserBo {
    return plainToInstance(UserBo, {
      ...entity,
    });
  }
}