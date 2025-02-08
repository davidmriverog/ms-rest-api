import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IBoToResponseMapper } from '@bomb/core/infrastructure';

import { UserBo } from '../../domain/bo/user.bo';
import { UserResponse } from '../dtos/user.reponse';

@Injectable()
export class UserBoToResponseMapper
  implements IBoToResponseMapper<UserBo, UserResponse>
{
  map(bo: UserBo): UserResponse {
    return plainToInstance(UserResponse, {
      ...bo,
    })
  }
}