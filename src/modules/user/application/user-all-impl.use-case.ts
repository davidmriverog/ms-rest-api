import { Inject, Injectable } from '@nestjs/common';

import { UserBo } from '@modules/user/domain/bo/user.bo';
import { UserPort } from '@modules/user/domain/ports/user.port';
import { UserAllUseCase } from '@modules/user/domain/use-cases/user-all.use-case';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserMapper } from '@modules/user/infrastructure/mappers/user.mapper';

@Injectable()
export class UserAllUseCaseCaseImpl implements UserAllUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    private readonly mapper: UserMapper,
  ) {}

  async exec(): Promise<UserResponse[]> {
    try {
      const result: UserBo[] = await this.userPort.all();

      return result.map((it) => this.mapper.boToResponse(it))
    } catch (e) {
      throw e;
    }
  }
}
