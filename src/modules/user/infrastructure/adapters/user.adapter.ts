import { RestLogger } from '@bomb/logger';
import { Inject, Injectable } from '@nestjs/common';
import { BaseAdapter } from '@bomb/core/infrastructure';

import { UserPort } from '../../domain/ports/user.port';
import { UserBo } from '../../domain/bo/user.bo';
import { UserRepository } from '../data-access/repositories/user.repository';
import { UserEntity } from '../data-access/entities/user.entity';
import { UserMapper } from '@modules/user/infrastructure/mappers/user.mapper';

@Injectable()
export class UserAdapter extends BaseAdapter<UserBo, UserEntity> implements UserPort {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly mapper: UserMapper,
    private readonly logger: RestLogger,
  ) {
    super(userRepository, mapper, logger)
  }

  // Override method implements.
}
