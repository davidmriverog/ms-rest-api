import { Inject, Injectable } from '@nestjs/common';

import { UserBo } from '@modules/user/domain/bo/user.bo';
import { UserPort } from '@modules/user/domain/ports/user.port';
import { UserAllUseCase } from '@modules/user/domain/use-cases/user-all.use-case';
import { UserBoToResponseMapper } from '@modules/user/infrastructure/mappers/user-bo-to-response.mapper';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';

@Injectable()
export class UserAllUseCaseCaseImpl implements UserAllUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    private readonly mapper: UserBoToResponseMapper,
  ) {}

  async exec(): Promise<UserResponse[]> {
    try {
      const result: UserBo[] = await this.userPort.all();

      return result.map((it) => this.mapper.map(it))
    } catch (e) {
      throw e;
    }
  }
}
