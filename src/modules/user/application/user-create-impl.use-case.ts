import { Inject, Injectable } from '@nestjs/common';

import { UserBo } from '@modules/user/domain/bo/user.bo';
import { UserPort } from '@modules/user/domain/ports/user.port';
import { UserCreateUseCase } from '@modules/user/domain/use-cases/user-create.use-case';
import { UserCreateDto } from '@modules/user/infrastructure/dtos/user.request';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserMapper } from '@modules/user/infrastructure/mappers/user.mapper';

@Injectable()
export class UserCreateUseCaseImpl implements UserCreateUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    private readonly mapper: UserMapper,
  ) {}

  async exec(dto: UserCreateDto): Promise<UserResponse> {
    try {
      const bo: UserBo = this.mapper.dtoToBo(dto);

      const result: UserBo = await this.userPort.create(bo);

      return this.mapper.boToResponse(result);
    } catch (e) {
      throw e;
    }
  }
}