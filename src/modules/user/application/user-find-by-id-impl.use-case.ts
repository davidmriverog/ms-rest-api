import { Inject, Injectable } from '@nestjs/common';

import { UserBo } from '@modules/user/domain/bo/user.bo';
import { UserPort } from '@modules/user/domain/ports/user.port';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserFindByIdUseCase } from '@modules/user/domain/use-cases/user-find-by-id.use-case';
import { UserBoToResponseMapper } from '@modules/user/infrastructure/mappers/user-bo-to-response.mapper';

@Injectable()
export class UserFindByIdUseCaseImpl implements UserFindByIdUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    private readonly mapper: UserBoToResponseMapper,
  ) {}

  async exec(id: number): Promise<UserResponse> {
    try {
      const result: UserBo = await this.userPort.findById(id)

      return this.mapper.map(result)
    } catch (e) {
      throw e;
    }
  }
}
