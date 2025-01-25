import { UserBo } from '../bo/user.bo';

export interface AllUserUseCase {
  exec(): Promise<UserBo[]>;
}

export const AllUserUseCase = Symbol('AllUserUseCase');
