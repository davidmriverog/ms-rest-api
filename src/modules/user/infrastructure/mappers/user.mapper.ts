import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IGenericMapper } from '@bomb/core/infrastructure';
import { TRowSelect } from '@bomb/core/infrastructure/persistence';

import { UserBo } from '@modules/user/domain/bo/user.bo';
import { UserCreateDto, UserUpdateDto } from '@modules/user/infrastructure/dtos/user.request';
import { UserEntity } from '@modules/user/infrastructure/data-access/entities/user.entity';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';

@Injectable()
export class UserMapper
  implements
    IGenericMapper<
      UserCreateDto | UserUpdateDto,
      UserBo,
      UserEntity,
      UserResponse
    >
{
  dtoToBo(attrs: UserCreateDto | UserUpdateDto): UserBo {
    return plainToInstance(UserBo, {
      ...attrs,
    })
  }

  boToEntity(attrs: UserBo): UserEntity {
    return plainToInstance(UserEntity, {
      ...attrs,
    });
  }

  boToResponse(attrs: UserBo): UserResponse {
    return plainToInstance(UserResponse, {
      ...attrs,
    });
  }

  entityToBo(attrs: UserEntity): UserBo {
    return plainToInstance(UserBo, {
      ...attrs,
    })
  }

  rawToEntity(attrs: TRowSelect): UserEntity {
    return plainToInstance(UserEntity, {
      ...attrs,
    })
  }
}