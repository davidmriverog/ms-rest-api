import { Inject, Injectable } from '@nestjs/common';
import { UserBo } from '../domain/bo/user.bo';

import { UserPort } from '../domain/ports/user.port';
import { AllUserUseCase } from '../domain/use-cases/all-user.use-case';

@Injectable()
export class AllUserUseCaseImpl implements AllUserUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
  ) {}

  async exec(): Promise<UserBo[]> {
    return await this.userPort.all();
  }
}
