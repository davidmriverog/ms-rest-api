import { Inject, Injectable } from '@nestjs/common';

import { UserBo } from '@modules/user/domain/bo/user.bo';
import { UserPort } from '@modules/user/domain/ports/user.port';
import { UserCreateUseCase } from '@modules/user/domain/use-cases/user-create.use-case';
import { UserCreateDto } from '@modules/user/infrastructure/dtos/user.request';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserBoToResponseMapper } from '@modules/user/infrastructure/mappers/user-bo-to-response.mapper';
import { UserDtoToBoMapper } from '@modules/user/infrastructure/mappers/user-dto-to-bo.mapper';

@Injectable()
export class UserCreateUseCaseImpl implements UserCreateUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    private readonly mapper: UserBoToResponseMapper,
    private readonly dtoMapper: UserDtoToBoMapper,
  ) {}

  async exec(dto: UserCreateDto): Promise<UserResponse> {
    try {
      const bo: UserBo = this.dtoMapper.map(dto);

      const result: UserBo = await this.userPort.create(bo);

      return this.mapper.map(result);
    } catch (e) {
      throw e;
    }
  }
}