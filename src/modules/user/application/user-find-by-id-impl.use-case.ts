import { Inject, Injectable } from '@nestjs/common';
import { UserFindByIdUseCase } from '../domain/use-cases/user-find-by-id.use-case';
import { UserBo } from '../domain/bo/user.bo';
import { UserPort } from '../domain/ports/user.port';

@Injectable()
export class UserFindByIdUseCaseImpl implements UserFindByIdUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
  ) {}

  async exec(id: number): Promise<UserBo> {
    return await this.userPort.findById(id);
  }
}
