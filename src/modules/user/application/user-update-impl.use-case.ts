import { Inject, Injectable } from '@nestjs/common';
import { UserUpdateUseCase } from '@modules/user/domain/use-cases/user-update.use-case';
import { UserUpdateDto } from '@modules/user/infrastructure/dtos/user.request';
import { UserResponse } from '@modules/user/infrastructure/dtos/user.reponse';
import { UserPort } from '@modules/user/domain/ports/user.port';
import { UserBoToResponseMapper } from '@modules/user/infrastructure/mappers/user-bo-to-response.mapper';
import { UserDtoToBoMapper } from '@modules/user/infrastructure/mappers/user-dto-to-bo.mapper';
import { UserBo } from '@modules/user/domain/bo/user.bo';

@Injectable()
export class UserUpdateUseCaseImpl implements UserUpdateUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
    private readonly mapper: UserBoToResponseMapper,
    private readonly dtoMapper: UserDtoToBoMapper,
  ) {}

  async exec(id: number, dto: UserUpdateDto): Promise<UserResponse> {
    try {
      const bo: UserBo = this.dtoMapper.map(dto);

      const result: UserBo = await this.userPort.update(id, bo)

      return this.mapper.map(result);
    } catch (e) {
      throw e;
    }
  }

}