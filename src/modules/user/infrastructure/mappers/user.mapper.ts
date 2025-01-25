import { Injectable } from '@nestjs/common';
import { UserBo } from '../../domain/bo/user.bo';
import { UserEntity } from '../data-access/entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserMapper {
  mapEntityToBo(entity: UserEntity): UserBo {
    return plainToInstance(UserBo, {
      ...entity,
    });
  }
}
