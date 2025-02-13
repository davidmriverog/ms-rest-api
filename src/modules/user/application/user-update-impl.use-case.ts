import { Inject, Injectable } from '@nestjs/common';

import { UserBo } from '@modules/user/domain/bo/user.bo';
import { UserPort } from '@modules/user/domain/ports/user.port';
import { UserUpdateUseCase } from '@modules/user/domain/use-cases/user-update.use-case';
import { UserUpdateDto } from '@modules/user/infrastructure/dtos/user.request';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserMapper } from '@modules/user/infrastructure/mappers/user.mapper';

@Injectable()
export class UserUpdateUseCaseImpl implements UserUpdateUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    private readonly mapper: UserMapper,
  ) {}

  async exec(id: number, dto: UserUpdateDto): Promise<UserResponse> {
    try {
      const bo: UserBo = this.mapper.dtoToBo(dto)

      const result: UserBo = await this.userPort.update(id, bo)

      return this.mapper.boToResponse(result);
    } catch (e) {
      throw e;
    }
  }

}