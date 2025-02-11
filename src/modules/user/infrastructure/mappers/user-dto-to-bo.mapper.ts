import { Injectable } from '@nestjs/common';
import { IDtoToBoMapper } from '@bomb/core/infrastructure';
import { plainToInstance } from 'class-transformer';

import { UserBo } from '../../domain/bo/user.bo';
import { UserCreateDto, UserUpdateDto } from '@modules/user/infrastructure/dtos/user.request';

@Injectable()
export class UserDtoToBoMapper
  implements IDtoToBoMapper<UserCreateDto | UserUpdateDto, UserBo>
{
  map(dto: UserCreateDto | UserUpdateDto): UserBo {
    return plainToInstance(UserBo, {
      ...dto,
    });
  }
}