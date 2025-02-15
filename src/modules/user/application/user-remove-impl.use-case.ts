import { Inject, Injectable } from '@nestjs/common';
import { UserRemoveUseCase } from '@modules/user/domain/use-cases/user-remove.use-case';
import { UserPort } from '@modules/user/domain/ports/user.port';

@Injectable()
export class UserRemoveUseCaseImpl implements UserRemoveUseCase {
  constructor(
    @Inject(UserPort)
    private readonly userPort: UserPort,
  ) {}

  async exec(id: number): Promise<boolean> {
    try {
      return await this.userPort.remove(id);
    } catch (e) {
      throw e;
    }
  }
}