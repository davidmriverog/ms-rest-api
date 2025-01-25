import { Inject, Injectable } from '@nestjs/common';

import { UserPort } from '../../domain/ports/user.port';
import { UserBo } from '../../domain/bo/user.bo';
import { UserMapper } from '../mappers/user.mapper';
import { UserRepository } from '../data-access/repositories/user.repository';

@Injectable()
export class UserAdapter implements UserPort {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) {}

  async all(): Promise<UserBo[]> {
    try {
      const result = await this.userRepository.all();

      return result.map((item) => this.userMapper.mapEntityToBo(item));
    } catch (e) {
      console.log(e);
    }
  }
}
