import { UserBo } from '../bo/user.bo';

export interface UserFindByIdUseCase {
  exec(id: number): Promise<UserBo>;
}

export const UserFindByIdUseCase = Symbol('UserFindByIdUseCase');
