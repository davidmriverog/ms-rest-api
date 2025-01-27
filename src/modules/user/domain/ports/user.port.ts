import { UserBo } from '../bo/user.bo';

export interface UserPort {
  all(): Promise<UserBo[]>;
  findById(id: number): Promise<UserBo>;
}

export const UserPort = Symbol('UserPort');
