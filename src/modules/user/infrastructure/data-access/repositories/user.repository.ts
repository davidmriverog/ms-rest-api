import { IRepository } from '@bomb/core/infrastructure/persistence';

import { UserEntity } from '../entities/user.entity';

export interface UserRepository extends IRepository<UserEntity> {
  // here method persistence
}

export const UserRepository = Symbol('UserRepository');
